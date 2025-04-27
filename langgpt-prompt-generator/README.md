# LangGPT 提示词生成器

一个基于LangGPT框架的命令行工具和API服务，用于为编程任务生成结构化提示词。

## 功能特点

- 为不同的编程任务生成结构化提示词
- 支持多种编程语言
- 提供交互式命令行界面
- 提供REST API接口，便于与其他工具集成
- 支持自定义约束条件和需求

## 安装方法

```bash
# 通过npm安装
npm install -g langgpt-prompt-generator

# 或者克隆仓库
git clone https://github.com/krystal1110/LangGptTool.git
cd LangGptTool/langgpt-prompt-generator

# 安装依赖
npm install
```

## 命令行使用

```bash
# 启动交互式提示词生成器
node index.js generate

# 启动API服务器
node index.js serve

# 在指定端口启动API服务器
node index.js serve -p 4000
```

## API使用方法

### 启动服务器

```bash
node index.js serve
```

### 通过API生成提示词

```javascript
// 使用fetch
fetch('http://localhost:3000/generate-prompt', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    promptType: '代码生成器',
    language: 'JavaScript',
    description: '创建一个函数，可以按照指定属性对对象数组进行排序',
    constraints: '必须处理空值,支持升序和降序排序'
  })
})
.then(response => response.json())
.then(data => console.log(data.prompt));
```

### 可用的提示词类型

1. **代码生成器** - 用于创建新代码
2. **代码解释器** - 用于解释现有代码
3. **代码审查员** - 用于审查代码并提供反馈
4. **Bug修复** - 用于识别和修复代码中的问题
5. **重构助手** - 用于改进现有代码
6. **自定义** - 用于自定义编程任务

## 扩展模板

您可以通过向`templates`目录添加新文件来创建自己的模板。每个模板应导出一个遵循LangGPT格式的`base`字符串。

## 使用示例

我们提供了两个使用示例：

1. 命令行示例：`examples/cli-usage-zh.sh`
2. API调用示例：`examples/example-zh.js`

运行示例：

```bash
# 运行API调用示例（先启动服务器）
node index.js serve
# 在另一个终端
node examples/example-zh.js

# 运行命令行示例
bash examples/cli-usage-zh.sh
```

## 关于LangGPT

LangGPT是一个为大型语言模型创建结构化提示词的框架。它提供了一种标准化格式，使提示词更加有效、可重用和易于维护。

有关LangGPT的更多信息，请访问[官方仓库](https://github.com/langgptai/LangGPT)。

## 许可证

Apache 2.0 