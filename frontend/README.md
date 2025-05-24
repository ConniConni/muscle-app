# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.

## メモ

## テーブル定義を変更する手順と注意事項

1. 以下のファイルを編集
   .muscle_app/backend/prisma/schema.prisma

編集は以下に沿って行う

- Model：単数形のパスカルケース(PascalCase)
  ※ただし、テーブルは複数形のスネークケース(snake_case)で記述するため @@map("")を追加
- column：キャメルケース(camelCase)
  ※ただし、テーブルのカラムはスネークケース(snake_case)で記述するため @map("")を追加
- 接続する側のモデル/接続される側のモデル の 両方のモデルにリレーションを定義する必要がある
  ※参考：https://zenn.dev/tsucchiiinoko/articles/f222dbbfa23325

2. 編集後はフォーマットを整えるため、以下を実行

- エラーがあれば教えてくれるので修正

```cmd
npx prisma format
```

3. マイグレーションファイルを作成

```cmd
npx prisma migrate dev --name <修正内容を記述>
```

4. prisma client も再生成

```cmd
npx prisma format
```
