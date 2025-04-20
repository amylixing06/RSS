#!/bin/bash

# 打印当前的package.json
echo "当前package.json内容:"
cat package.json

# 确保React版本是18.x
echo "修改package.json中的React版本..."
sed -i 's/"react": "\^19"/"react": "^18.2.0"/g' package.json
sed -i 's/"react-dom": "\^19"/"react-dom": "^18.2.0"/g' package.json
sed -i 's/"@types\/react": "\^19"/"@types\/react": "^18"/g' package.json
sed -i 's/"@types\/react-dom": "\^19"/"@types\/react-dom": "^18"/g' package.json

# 打印修改后的package.json
echo "修改后的package.json内容:"
cat package.json

# 使用--legacy-peer-deps安装依赖
echo "安装依赖..."
npm install --legacy-peer-deps

# 构建项目
echo "构建项目..."
npm run build

echo "构建完成!" 