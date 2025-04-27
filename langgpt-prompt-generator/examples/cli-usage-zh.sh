#!/bin/bash

# 本地开发使用
cd "$(dirname "$0")/.." || exit

# 运行提示词生成器
echo "运行提示词生成器..."
node index.js generate

# 运行服务器
echo "启动服务器..."
node index.js serve &
SERVER_PID=$!

# 给服务器一点启动时间
sleep 2

# 使用curl测试API
echo "测试API..."
curl -X POST http://localhost:3000/generate-prompt \
  -H "Content-Type: application/json" \
  -d '{
    "promptType": "代码生成器",
    "language": "Python",
    "description": "创建一个函数，计算斐波那契数列直到第n项。",
    "constraints": "使用递归,添加记忆化以提高效率"
  }'

# 终止服务器
echo "停止服务器..."
kill $SERVER_PID 