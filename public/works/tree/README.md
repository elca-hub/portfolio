# TREE

## What is TREE?

高校では、チームで何かしらのプロダクトを開発する授業がありました。
そこで私は、メンバー3名と共に、 **在校していた高校の図書館の蔵書を管理するシステム** を構築することにしました。

基本的に以下の機能を実装しました。

- 蔵書検索機能
  - あいまい検索、げんみつ検索、タグ検索の3種類から選べる
    - あいまい検索：いわゆるキーワード検索
    - げんみつ検索：検索対象をLIKE句を用いて検索
    - タグ検索：ユーザがその本につけたタグから検索
  - 本、著者、出版社を検索することができる
- キャンペーン機能
  - 図書館で何かしらのイベントや告知をする際に使用
  - 関連本などを紐づけることができる
- 司書向け機能
  - 蔵書登録
    - 一冊ずつ登録するモードと、csvファイルから登録するモードがある
  - ヘルスチェック
    - 後述するいくつかのサービスが正しく機能しているかのチェック
      - 特にElasticsearchとMySQL側でデータの整合性を担保しなくてはいけないため、その辺のチェックは充実
  - その他、キャンペーンやタグの管理

## 担当

リーダー / バックエンド

## 技術スタック

### 共通

- [Docker](https://www.docker.com/) -> 仮想環境構築ツール

### サーバ(ディレクトリ名 : app)

- [npm](https://www.npmjs.com/) -> パッケージ管理ツール
  - expressやsequelize、jsonwebtoken、log4jsなど
- [node.js](https://nodejs.org/ja/) -> サーバサイドのjavascript実行環境
  - [typescript](https://www.typescriptlang.org/) -> javascriptに静的型付けやオブジェクト指向を付け加えたプログラム言語
  - [express](https://expressjs.com/ja/) -> フレームワーク
  - [ejs](https://ejs.co/) -> テンプレートエンジン
  - [Sequelize](https://sequelize.org/) -> ORM
  - [MongoDB](https://www.mongodb.com/) -> インメモリで動作するNoSQL(ドキュメント指向データベース)。テストで使用
  - [Jest](https://jestjs.io/) -> JavaScriptのテスティングフレームワークの一種
  - [ドメイン駆動設計](https://ja.wikipedia.org/wiki/%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E9%A7%86%E5%8B%95%E8%A8%AD%E8%A8%88) -> 設計手法

### DB(ディレクトリ名 : db)

- [mysql](https://www.mysql.com/jp/) -> DBMS

### 検索エンジン(ディレクトリ名 : elasticsearch)

- [Elasticsearch](https://www.elastic.co/jp/) -> オープンソースの検索エンジン

※ [リポジトリ](https://github.com/booksearch-hotate/hotate-server/blob/main/DOC/use-tech.md)から引用しました

## 画面

### 検索フォーム

![あいまい検索の例](/works/tree/aimai.png)

### 管理画面

![管理画面一覧](/works/tree/management.png)

### 本詳細画面

![本詳細画面](/works/tree/book-details.png)
