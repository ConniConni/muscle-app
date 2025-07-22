<div id="top"></div>

## 使用技術一覧

<!-- シールド一覧 -->
<!-- 該当するプロジェクトの中から任意のものを選ぶ-->
<!-- <p style="display: inline"> -->
  <!-- バックエンドのフレームワーク一覧 -->
  <!-- <img src="https://img.shields.io/badge/-Django-092E20.svg?logo=django&style=for-the-badge"> -->
  <!-- バックエンドの言語一覧 -->
  <!-- <img src="https://img.shields.io/badge/-Python-F2C63C.svg?logo=python&style=for-the-badge"> -->
<!-- </p> -->

工事中

## 目次

1. [プロジェクトについて](#プロジェクトについて)
2. [環境](#環境)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [開発環境構築](#開発環境構築)

<!-- READMEの作成方法のドキュメントのリンク -->
<br />
<div align="right">
    <a href="READMEの作成方法のリンク"><strong>【工事中】READMEの作成方法 »</strong></a>
</div>
<br />
<!-- プロジェクト名を記載 -->

## プロジェクト名

muscle-app

<!-- プロジェクトについて -->

## プロジェクトについて

筋トレ記録を管理する Web アプリケーション

<!-- プロジェクトの概要を記載 -->

  <p align="left">
    <br />
    <!-- プロジェクト詳細にBacklogのWikiのリンク -->
    <a href="Backlogのwikiリンク"><strong>【工事中】プロジェクト詳細 »</strong></a>
    <br />
    <br />

<p align="right">(<a href="#top">トップへ</a>)</p>

## 環境

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| 言語・フレームワーク | バージョン |
| -------------------- | ---------- |
| TypeScript           | xx.xx.x    |

<p align="right">(<a href="#top">トップへ</a>)</p>

## ディレクトリ構成

<!-- Treeコマンドを使ってディレクトリ構成を記載 -->

❯ tree -a
.
工事中

<p align="right">(<a href="#top">トップへ</a>)</p>

## 開発環境構築

<!-- コンテナの作成方法、パッケージのインストール方法など、開発環境構築に必要な情報を記載 -->

工事中

## 本番環境(起動)

### EC2 を起動

AWS マネジメントコンソールから ES2 を起動する

### SSH 接続

`ssh -i muscle-app-key.pem ec2-user@<EC2のグローバルIP>`

### プロジェクトのルートに移動し EC2 内で最新のコミットを取り込む

`cd muscle-app`
`git pull origin develop`

### db サーバ起動

`cd db`
`docker compose build up -d`

### backend をビルド

`cd ../`
`cd backend`
`npm run build`

### backend を起動

`npm run start`

### frontend をビルド

`cd ../`
`cd frontend`
`npm run build`

### frontend を起動

`which node` # node のフルパスを取得
`sudo <取得したnodeのフルパス> server.js`

## 本番環境(停止)

### frontend を停止

ctrl + c
※SSH が落ちてしまった場合は`sudo kill <プロセスID>`

### backend を停止

ctrl + c
※SSH が落ちてしまった場合は`sudo kill <プロセスID>`

### DB サーバを停止

db ディレクトリに移動し、
`docker compose down`

### SSH から抜ける

`exit`

### EC ２を停止

AWS マネジメントコンソールから EC2 を停止する
※次回起動時にグローバル IP が変わるので注意
