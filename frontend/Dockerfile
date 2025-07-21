# --- ステージ1: 依存関係のインストール ---
# 本番で必要な依存関係だけをインストールする
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# `--omit=dev` で devDependencies を除外
RUN npm install --omit=dev


# --- ステージ2: アプリケーションのビルド ---
# 開発依存関係も含めてインストールし、ビルドを実行する
FROM node:20-alpine AS builder
WORKDIR /app
# package.jsonをコピー
COPY package.json package-lock.json ./
# すべての依存関係をインストール
RUN npm install
# ソースコードをコピー
COPY . .
# ビルドコマンドを実行
RUN npm run build


# --- ステージ3: プロダクション実行 ---
# 最終的な実行イメージを作成する
FROM node:20-alpine AS runner
WORKDIR /app

# 環境変数を設定
ENV NODE_ENV=production
# コンテナ内部でリッスンするポート
ENV PORT=3001

# ステージ1から本番用のnode_modulesをコピー
COPY --from=deps /app/node_modules ./node_modules

# ステージ2からビルドされた成果物をコピー
# `react-router build` は `build` ディレクトリに成果物を出力します
COPY --from=builder /app/build ./build

# package.jsonをコピー (react-router-serveが内部で参照する可能性があるため)
COPY --from=builder /app/package.json ./package.json

# 公開するポート
EXPOSE 3001

# ★★★ サーバーの起動コマンド ★★★
# `react-router-serve` を使うのではなく、ビルドされたサーバーファイルを直接nodeで実行する
CMD ["node", "./build/server/index.js"]