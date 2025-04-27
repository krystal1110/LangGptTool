const fetch = require('node-fetch');

/**
 * LangGPT提示词生成器API示例
 * 
 * 使用方法:
 * 1. 先启动服务器: node index.js serve
 * 2. 然后在另一个终端运行此文件: node examples/example-zh.js
 */

// 使用LangGPT提示词生成器API的示例
async function 生成提示词() {
  try {
    const response = await fetch('http://localhost:3000/generate-prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        promptType: '代码生成器',
        language: 'JavaScript',
        description: '创建一个工具函数，可以深度合并两个对象，正确处理数组和嵌套对象。',
        constraints: '必须处理循环引用,应保留原始对象,支持ES6特性'
      })
    });

    const data = await response.json();
    console.log('生成的提示词:');
    console.log(data.prompt);
  } catch (error) {
    console.error('生成提示词时出错:', error);
  }
}

// 为不同任务生成提示词的示例
async function 生成多个提示词() {
  const tasks = [
    {
      promptType: 'Bug修复',
      language: 'JavaScript',
      description: '修复这个在处理小数时有时会产生NaN的函数: function add(a, b) { return a + b; }',
      constraints: '使用原生JavaScript,不使用外部库'
    },
    {
      promptType: '代码审查员',
      language: 'Python',
      description: '审查这个逐行读取大文件的函数: \n\ndef process_large_file(file_path):\n    with open(file_path, "r") as file:\n        lines = file.readlines()\n        for line in lines:\n            process_line(line)\n',
      constraints: '关注性能问题,考虑内存使用'
    }
  ];

  for (const task of tasks) {
    try {
      const response = await fetch('http://localhost:3000/generate-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      });

      const data = await response.json();
      console.log(`\n\n--- 为${task.language}生成的${task.promptType}提示词 ---\n`);
      console.log(data.prompt);
    } catch (error) {
      console.error(`生成${task.promptType}提示词时出错:`, error);
    }
  }
}

// 运行示例
生成提示词()
  .then(() => 生成多个提示词())
  .catch(console.error); 