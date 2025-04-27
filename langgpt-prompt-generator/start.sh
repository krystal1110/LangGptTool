#!/bin/bash

# LangGPT提示词生成器启动脚本

# 显示帮助信息
show_help() {
    echo "LangGPT提示词生成器 - 使用说明"
    echo ""
    echo "用法: bash start.sh [选项]"
    echo ""
    echo "选项:"
    echo "  generate    启动交互式提示词生成器"
    echo "  serve       启动API服务器 (默认端口: 3000)"
    echo "  serve 端口   在指定端口启动API服务器"
    echo "  help        显示此帮助信息"
    echo ""
    echo "示例:"
    echo "  bash start.sh generate     # 启动交互式提示词生成器"
    echo "  bash start.sh serve        # 在默认端口3000启动API服务器"
    echo "  bash start.sh serve 4000   # 在端口4000启动API服务器"
}

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "错误: 未找到Node.js"
    echo "请先安装Node.js: https://nodejs.org/"
    exit 1
fi

# 如果未安装依赖，自动安装
if [ ! -d "node_modules" ]; then
    echo "正在安装依赖..."
    npm install
fi

# 处理命令行参数
case "$1" in
    generate)
        echo "启动提示词生成器..."
        node index.js generate
        ;;
    serve)
        PORT=${2:-3000}
        echo "启动API服务器 (端口: $PORT)..."
        node index.js serve -p $PORT
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        show_help
        ;;
esac 