# LangGPT提示词生成器 - 安装和使用指南

## 系统要求

- Node.js (版本 14.0.0 或更高)
- npm (通常随Node.js一起安装)

## 安装步骤

1. **克隆仓库**

```bash
git clone https://github.com/yourusername/langgpt-prompt-generator.git
cd langgpt-prompt-generator
```

2. **安装依赖**

```bash
npm install
```

## 快速开始

我们提供了一个简单的启动脚本，可以轻松运行各种功能：

```bash
# 使脚本可执行
chmod +x start.sh

# 显示帮助信息
./start.sh help

# 启动交互式提示词生成器
./start.sh generate

# 启动API服务器（默认端口3000）
./start.sh serve

# 在指定端口启动API服务器
./start.sh serve 4000
```

## 手动使用方法

如果您不使用启动脚本，也可以直接使用Node.js运行：

### 命令行使用

```bash
# 启动交互式提示词生成器
node index.js generate

# 启动API服务器
node index.js serve

# 在指定端口启动API服务器
node index.js serve -p 4000
```

### API使用

1. 首先启动服务器：

```bash
node index.js serve
```

2. 然后可以通过HTTP请求使用API：

```javascript
// 使用fetch (在浏览器或Node.js环境中)
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

3. 或者使用curl：

```bash
curl -X POST http://localhost:3000/generate-prompt \
  -H "Content-Type: application/json" \
  -d '{
    "promptType": "代码生成器",
    "language": "Python",
    "description": "创建一个函数，计算斐波那契数列直到第n项。",
    "constraints": "使用递归,添加记忆化以提高效率"
  }'
```

## 运行示例

我们提供了几个示例来演示如何使用：

```bash
# 运行命令行示例
bash examples/cli-usage-zh.sh

# 运行API调用示例（先启动服务器）
node index.js serve
# 在另一个终端
node examples/example-zh.js
```

## 故障排除

如果您遇到问题：

1. **依赖问题**
   ```bash
   # 重新安装依赖
   rm -rf node_modules
   npm install
   ```

2. **端口冲突**
   ```bash
   # 在不同端口运行
   node index.js serve -p 4000
   ```

3. **权限问题**
   ```bash
   # 确保脚本可执行
   chmod +x start.sh
   ```

## 支持

如有问题，请提交GitHub Issue。 