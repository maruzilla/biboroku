__
Node.jsと Expressで 基本的な Webアプリを作る方法

Node.jsとExpressを使用して基本的なWebアプリを作成する手順は、以下の通りです。2026年現在でも、この構成はJavaScriptでのバックエンド開発における標準的な手法の一つです。 

1. プロジェクトの準備
まず、プロジェクト用のフォルダを作成し、Node.jsのプロジェクトとして初期化します。 

// bash
mkdir my-web-app
cd my-web-app
npm init -y

2. Expressのインストール
次に、WebフレームワークであるExpressをインストールします。 

// bash
npm install express

※ Windows環境などで最新の動作を確保するため、必要に応じて npm install -g npm でパッケージマネージャーを更新しておくことが推奨されます。 

3. サーバーファイルの作成
app.js（または index.js）という名前でファイルを作成し、以下の最小限のコードを記述します。 

// javascript
const express = require('express');
const app = express();
const port = 3000;

// ルートURL（/）にアクセスした時の処理
app.get('/', (req, res) => {
  res.send('Hello World! 2026');
});

// サーバーの起動
app.listen(port, () => {
  console.log(`アプリが http://localhost:${port} で起動しました`);
});

4. アプリの実行
ターミナルで以下のコマンドを実行して、サーバーを起動します。

// bash
node app.js

起動後、ブラウザで http://localhost:3000 にアクセスすると「Hello World! 2026」と表示されます。 
ステップアップのためのヒント
動的なページの作成: EJS などのテンプレートエンジンを使用すると、HTML内にデータを埋め込んで表示できます。
効率的な開発: nodemon を導入すると、コードを変更するたびにサーバーを自動で再起動してくれるため便利です。
自動生成ツール: より複雑な構成（フォルダ構造など）が必要な場合は、npx express-generator を使用してアプリの雛形を一括作成する方法もあります。 

__
さらに実用的な例 1

実用的なWebアプリ開発では、データのやり取りを行うREST APIの構築や、コードの保守性を高めるMVC（モデル・ビュー・コントローラー）のような構造化が重要です。 
2026年現在の標準的な手法に基づき、JSONデータを扱うAPIの例と、ミドルウェアを活用した実用的な構成を紹介します。
1. JSON APIの構築（CRUD操作）
ブラウザやスマホアプリとデータをやり取りする際は、res.json() を使ってJSON形式でレスポンスを返します。 

// javascript
const express = require('express');
const app = express();

// JSONボディを解析するためのミドルウェア
app.use(express.json());

let users = [
  { id: 1, name: '田中' },
  { id: 2, name: '佐藤' }
];

// データ取得 (Read)
app.get('/api/users', (req, res) => {
  res.json(users);
});

// データ追加 (Create)
app.post('/api/users', (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(3000);

2. ルーティングの分割 (express.Router)
アプリが大きくなると、一つのファイルに全ての処理を書くのは困難です。express.Router を使って機能をモジュール化します。 
routes/user.js（ユーザー関連のルーティング）

// javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('ユーザー一覧'));
router.get('/:id', (req, res) => res.send(`ユーザーID: ${req.params.id}`));

module.exports = router;

app.js（メインファイル）
// javascript
const userRouter = require('./routes/user');
app.use('/users', userRouter); // /users/123 のようなURLでアクセス可能

3. ミドルウェアによる共通処理
ログ記録や認証など、複数のルートで共通して実行したい処理はミドルウェアとして定義します。 

// javascript
// リクエストの情報を記録するロガーミドルウェア
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next(); // 次の処理へ進むために必須
});

4. 環境変数の管理
APIキーやポート番号などの設定情報は、コードに直接書かず、.env ファイルで管理するのがセキュリティ上のベストプラクティスです。Node.js v20.6.0以降は標準機能でもサポートされていますが、依然として dotenv パッケージも広く使われています。 
.env ファイルの例: PORT=3000
コードでの利用: const port = process.env.PORT || 3000;
次のステップ
データベース接続: 実際のアプリでは、データの保存に MongoDB (Mongoose) や PostgreSQL (Prisma) を連携させるのが一般的です。
フロントエンドとの統合: ReactやVue.js と組み合わせてモダンなシングルページアプリケーション（SPA）を構築します。 

__
さらに実用的な例 2

さらに実用的なステップとして、「データベース（MongoDB）との連携」、「セキュリティ（環境変数の管理）」、そして「エラーハンドリング」を組み込んだ、堅牢なAPIサーバーの構成例を紹介します。
2026年現在、Node.jsの標準機能が強化されていますが、効率的な開発には Mongoose（ODM）や dotenv の利用が依然として主流です。

1. 構成図と準備
プロジェクト構造を以下のように整理し、必要なパッケージをインストールします。

text
my-app/
├── .env                (機密情報: DB接続先など)
├── app.js              (エントリーポイント)
├── models/             (データ構造)
│   └── User.js
└── routes/             (エンドポイント)
    └── userRoutes.js

// bash
npm install mongoose dotenv

2. 環境変数の設定 (.env)
データベースの接続パスワードなどをコードに直接書かないようにします。

env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/myapp

3. データモデルの定義 (models/User.js)
データベースに保存するデータの「型」を定義します。

// javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);

4. サーバーのメインロジック (app.js)
非同期処理（async/await）とグローバルなエラーハンドリングを組み込みます。

// javascript
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
app.use(express.json());

// MongoDBへの接続
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('DB接続成功'))
  .catch(err => console.error('DB接続失敗:', err));

// ユーザー登録 API (エラーハンドリング付き)
app.post('/users', async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    next(error); // エラーハンドリングミドルウェアに飛ばす
  }
});

// 全ユーザー取得 API
app.get('/users', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// 共通エラーハンドリングミドルウェア
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'サーバー内部でエラーが発生しました' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

__
さらに実用的な例 3

実務レベルのWebアプリケーションに不可欠な「ユーザー認証（JWT）」と「セキュリティ・ベストプラクティス」を組み込んだ構成を紹介します。
2026年現在、ステートレスなAPI設計において、JSON Web Token (JWT) を使用した認証は標準的な手法です。
1. セキュリティパッケージの導入
本番環境での運用を想定し、セキュリティを強化するライブラリをインストールします。

// bash
npm install jsonwebtoken bcryptjs helmet cors

2. ユーザー認証の実装例
パスワードをハッシュ化して保存し、ログイン時にトークンを発行する実用的なフローです。
ユーザー登録（パスワードのハッシュ化）
bcryptjs を使い、データベースに生パスワードを保存しないようにします。

// javascript
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// 会員登録エンドポイント
app.post('/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    email: req.body.email,
    password: hashedPassword
  });
  await user.save();
  res.status(201).send('ユーザー登録完了');
});

ログインとトークン発行
jsonwebtoken を使用して、認証済みの証（トークン）を発行します。

// javascript
const jwt = require('jsonwebtoken');

app.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    // 有効期限1時間のトークンを発行
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('メールアドレスまたはパスワードが正しくありません');
  }
});

3. 認証ミドルウェア（ガード）の作成
特定のページやAPIを「ログイン済みユーザーのみ」に制限するための仕組みです。

// javascript
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('アクセスが拒否されました');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('無効なトークンです');
  }
};

// 認証が必要なルート
app.get('/api/me', auth, (req, res) => {
  res.send('ログイン中のユーザーのみが見れるデータです');
});

4. 本番環境向けセキュリティ設定
Helmet を使用してHTTPヘッダーを保護し、CORS を適切に設定します。

// javascript
const helmet = require('helmet');
const cors = require('cors');

app.use(helmet()); // セキュリティヘッダーを自動設定
app.use(cors({
  origin: 'https://your-frontend-domain.com', // 許可するドメインを限定
  optionsSuccessStatus: 200
}));

2026年の運用における推奨事項
TypeScriptの導入: 大規模な開発では、型安全性（型定義）を確保するために TypeScript を利用するのが一般的です。
バリデーション: Zod などのライブラリを使い、APIのリクエストスキーマを厳密に定義することで、バグを未然に防ぎます。
ロギング: 本番環境では console.log ではなく、Winston や Pino を使用して構造化されたログを出力します。

__
さらに実用的な例 4

実務レベルの最終ステップとして、「TypeScriptの導入」、「Zodによる堅牢なバリデーション」、および「非同期処理を整理したクリーンなアーキテクチャ」を組み合わせた、2026年の標準的な開発構成を紹介します。

1. TypeScriptによる型安全な開発
JavaScriptでは防げない「ランタイムエラー」を未然に防ぐため、実務ではTypeScriptが必須です。

//bash
# 必要なパッケージのインストール
npm install typescript ts-node @types/node @types/express @types/jsonwebtoken -D
npx tsc --init

2. Zodによるスキーマバリデーション
Zod を使うと、リクエストの「形」を定義し、型推論とバリデーションを同時に行えます。
typescript
import { z } from 'zod';

// ユーザー登録のスキーマ定義
const RegisterSchema = z.object({
  body: z.object({
    email: z.string().email("無効なメールアドレスです"),
    password: z.string().min(8, "パスワードは8文字以上必要です"),
    age: z.number().optional()
  })
});

// ミドルウェアでの利用例
export const validate = (schema: any) => (req: any, res: any, next: any) => {
  try {
    schema.parse({ body: req.body });
    next();
  } catch (e: any) {
    return res.status(400).json(e.errors);
  }
};

3. ControllerとServiceの分離
ビジネスロジックを分離することで、テストがしやすく、保守性の高いコードになります。
Service層 (services/userService.ts): データベース操作などのロジック
Controller層 (controllers/userController.ts): HTTPリクエストとレスポンスの処理
typescript
// Controllerの例
import { Request, Response, NextFunction } from 'express';
import * as UserService from '../services/userService';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await UserService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

4. 2026年のモダンな開発スタックの統合
実務で採用されることが多い、信頼性の高いリソースを以下にまとめます。
ORM (データベース操作): MongoDBなら Mongoose、SQLなら Prisma が主流です。
APIテスト: Vitest と Supertest を組み合わせて、APIの自動テストを構築します。
コンテナ化: Dockerfile を作成し、Docker 環境で実行することで、開発者間での環境差異をなくします。
デプロイ: クラウド環境へのデプロイには、Google Cloud Run や AWS App Runner を利用して、スケーラブルな構成を維持するのが一般的です。
この段階まで来れば、単なる「Webアプリ」ではなく、「商用利用に耐えうるバックエンドシステム」としての基礎が完成します。

__
//?? Node.jsと Expressで作成した Webアプリを GitHub Pagesにデプロイできる?

結論から申し上げますと、Node.js/ExpressのサーバーをGitHub Pagesで動かすことはできません。

GitHub Pagesは、HTML、CSS、JavaScriptなどの「静的ファイル」のみをホストするサービスだからです。
Expressのようにサーバー側でコード（プログラム）を実行し続ける仕組み（動的サーバー）はサポートされていません。 

Expressアプリをデプロイしたい場合は、以下のいずれかの代替サービスを利用するのが一般的です。

1. 2026年現在の主な推奨サービス
Expressアプリなどのサーバーサイドプログラムを無料で開始できる、あるいは低コストで運用できるサービスです。

* Render (最も簡単):
GitHubと連携するだけで、Node.jsアプリを簡単にデプロイできます。無料枠もあります。

* Railway:
デプロイが非常に高速で、データベース（MongoDBやPostgreSQL）との連携もスムーズです。

* Vercel:
本来はフロントエンド向けですが、api/ フォルダにExpressを配置することで「Serverless Functions」として実行可能です。

* Google Cloud Run / AWS App Runner:
実務レベルの「コンテナ化（Docker）」されたアプリを動かすのに適しています。 

2. どうしてもGitHub Pagesを使いたい場合
もし「サーバーサイドの処理は不要で、見た目だけを公開したい」という場合は、以下の方法をとる必要があります。

* 静的サイトジェネレーター（SSG）にする: Expressを使わず、AstroやNext.jsの静的書き出し機能を使ってHTMLを生成し、それをGitHub Pagesにアップロードする。

* バックエンドを分離する: 画面（HTML）だけをGitHub Pagesに置き、Expressで作成したAPIサーバーはRenderやRailwayなどにデプロイして、ブラウザから通信（fetch）する。

デプロイまでの一般的な流れ（Render等の場合）
1. コードをGitHubのリポジトリにプッシュする。
2. デプロイ先のサービス（Renderなど）にログインし、そのリポジトリを選択する。
3.起動コマンド（例: node app.js）を指定して公開する。 

Expressアプリを公開して誰かに使ってもらいたい場合は、まずは Render などのプラットフォームを検討してみてください。
