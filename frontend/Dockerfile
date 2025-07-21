# --- ステージ1: 依存関係のインストール ---
FROM node:20-alpine AS deps
WORKDIR /app
# package.jsonをfrontendディレクトリからコピー
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install --omit=dev


# --- ステージ2: アプリケーションのビルド ---
FROM node:20-alpine AS builder
WORKDIR /app
# package.jsonをfrontendディレクトリからコピー
COPY frontend/package.json frontend/package-lock.json ./
# すべての依存関係をインストール
RUN npm install
# frontendディレクトリ全体をコピー
COPY frontend/ .
# ビルドコマンドを実行
RUN npm run build


# --- ステージ3: プロダクション実行 ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001
COPY --from=deps /app/node_modules ./node_modules
# ビルド成果物はfrontendディレクトリを基準にしているので、パスは変わらない
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
EXPOSE 3001
CMD ["node", "./build/server/index.js"]