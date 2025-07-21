# --- ビルドステージ ---
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# 依存関係をインストール
COPY package*.json ./
RUN npm install

# ソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# --- プロダクションステージ ---
FROM node:20-alpine

WORKDIR /usr/src/app

# ビルドステージからビルド済みファイルとnode_modulesをコピー
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# ポートを公開
EXPOSE 3000

# アプリケーションを実行
CMD ["node", "dist/main"]