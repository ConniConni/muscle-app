# ベースイメージとして、軽量なNode.js環境を選択
FROM node:20-alpine

# アプリケーションの作業ディレクトリを作成
WORKDIR /app

# 必要な依存関係（本番用）をインストールする
# package.jsonとlockファイルをコピー
COPY frontend/package.json frontend/package-lock.json ./
# devDependenciesを除いてインストール
RUN npm install --omit=dev

# ローカルでビルドした `build` ディレクトリをコピー
COPY frontend/build ./build

# package.jsonもコピー（起動スクリプトが参照するため）
COPY frontend/package.json ./

# 環境変数を設定
ENV NODE_ENV=production
ENV PORT=3001

# ポートを公開
EXPOSE 3001

# サーバーを起動
CMD ["node", "./build/server/index.js"]

# # --- ステージ1: 依存関係のインストール (本番用) ---
# FROM node:20-alpine AS production-deps
# WORKDIR /usr/src/app
# # backend/package.json をコピー
# COPY backend/package.json backend/package-lock.json ./
# RUN npm install --omit=dev


# # --- ステージ2: ビルドステージ ---
# FROM node:20-alpine AS builder
# WORKDIR /usr/src/app
# # backend/package.json をコピー
# COPY backend/package.json backend/package-lock.json ./
# # 開発依存関係も含めてインストール
# RUN npm install
# # backend ディレクトリ全体をコピー
# COPY backend/ .
# # (もしあれば) ルートの tsconfig.json もコピー
# # NestJSではプロジェクトごとにtsconfigを持つことが多いですが、念のため
# COPY tsconfig.json ./
# # アプリケーションをビルド
# RUN npm run build


# # --- ステージ3: プロダクションステージ (最終的な実行イメージ) ---
# FROM node:20-alpine
# WORKDIR /usr/src/app

# ENV NODE_ENV=production

# # ステージ1 (production-deps) から本番用の node_modules をコピー
# COPY --from=production-deps /usr/src/app/node_modules ./node_modules
# # ステージ2 (builder) からビルド済みの dist ディレクトリをコピー
# COPY --from=builder /usr/src/app/dist ./dist

# # ポートを公開
# EXPOSE 3000

# # アプリケーションを実行
# CMD ["node", "dist/main"]