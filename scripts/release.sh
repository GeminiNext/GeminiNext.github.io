#!/bin/bash

# --- 站点发布自动化脚本 ---

# 1. 确保在 dev 分支
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "dev" ]; then
  echo "❌ 错误：必须在 dev 分支下运行发布脚本。当前分支为: $CURRENT_BRANCH"
  exit 1
fi

# 2. 检查是否有未提交的代码
if [ -z "$(git status --porcelain)" ]; then
  echo "⚠️ 提示：没有检测到任何更改，跳过提交。"
else
  # 提示输入 Commit Message
  echo "📝 请输入本次更新的说明 (Commit Message):"
  read -r COMMIT_MSG
  
  if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="chore: automated release $(date +'%Y-%m-%d %H:%M:%S')"
  fi

  # 执行提交
  git add .
  git commit -m "$COMMIT_MSG"
  echo "✅ 代码已提交: $COMMIT_MSG"
fi

# 3. 推送 dev 分支到远程
echo "🚀 正在推送 dev 分支到远程..."
git push origin dev

# 4. 使用 GitHub CLI 创建并合并 PR
echo "🔗 正在通过 GitHub CLI 将 dev 合并到 main..."

# 创建 PR (如果已经存在则会报错，这里忽略错误继续)
gh pr create --base main --head dev --title "Release: $COMMIT_MSG" --body "Automated release from dev branch" 2>/dev/null

# 立即合并 PR
# --merge: 使用常规合并
# --delete-branch=false: 保留远程 dev 分支
gh pr merge dev --merge --delete-branch=false --admin

echo "🎉 发布指令已下达！GitHub Actions 正在后台打包部署..."
echo "🔗 你可以在这里查看进度: https://github.com/$(git remote get-url origin | sed 's/.*github.com[:\/]//;s/\.git$//')/actions"
