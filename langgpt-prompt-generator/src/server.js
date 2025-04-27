const express = require('express');
const promptGenerator = require('./promptGenerator');
const chalk = require('chalk');

function start(port) {
  const app = express();
  app.use(express.json());

  // Enable CORS
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  // Root endpoint with simple instructions
  app.get('/', (req, res) => {
    res.send(`
      <h1>LangGPT 提示词生成器 API</h1>
      <p>向 /generate-prompt 发送 POST 请求，使用以下JSON结构：</p>
      <pre>
      {
        "promptType": "代码生成器", // 或其他支持的类型
        "language": "JavaScript",
        "description": "在这里描述您的需求",
        "constraints": "可选的,约束条件,用逗号分隔"
      }
      </pre>
    `);
  });

  // Generate prompt endpoint
  app.post('/generate-prompt', (req, res) => {
    try {
      const { promptType, language, description, constraints } = req.body;
      
      if (!promptType || !language || !description) {
        return res.status(400).json({
          error: '缺少必填字段。请提供promptType、language和description。'
        });
      }

      const prompt = promptGenerator.generate({
        promptType,
        language,
        description,
        constraints
      });

      res.json({ prompt });
    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  });

  // Start the server
  app.listen(port, () => {
    console.log(chalk.green(`LangGPT 提示词生成器服务器运行在端口 ${port}`));
    console.log(chalk.blue(`访问API：http://localhost:${port}`));
  });
}

module.exports = {
  start
}; 