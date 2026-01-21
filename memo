____
__
//***** SheetJS: JavaScriptでExcelの操作をする
//?? SheetJSを node.jsで動かすには
> npm list
> npm install xlsx
> node xl2json.js

-- xl2json.js --
var XLSX = require('xlsx');
var workbook = XLSX.readFile('test.xlsx');
var sheet_name_list = workbook.SheetNames;
sheet_name_list.forEach(function(y) {
    var worksheet = workbook.Sheets[y];
    var jsonData = XLSX.utils.sheet_to_json(worksheet);
    console.log(jsonData);
});

--
Node.js で SheetJS (xlsx) を動かすには、以下の手順でセットアップ・実行できます。
ここでは Excelファイルの読み込みと書き込み の両方を行うサンプルを示します。

1. 環境準備
Bash

コードをコピー
# プロジェクト作成
mkdir sheetjs-demo
cd sheetjs-demo

# Node.js プロジェクト初期化
npm init -y

# SheetJS (xlsx) インストール
npm install xlsx

2. Excelファイル読み込みサンプル
// read_excel.js
const XLSX = require("xlsx");
const path = require("path");

try {
    // 読み込むExcelファイルのパス
    const filePath = path.join(__dirname, "sample.xlsx");

    // Excelファイルを読み込み
    const workbook = XLSX.readFile(filePath);

    // 最初のシート名を取得
    const sheetName = workbook.SheetNames[0];

    // シートをJSON形式に変換
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: null });

    console.log("読み込んだデータ:", sheetData);
} catch (err) {
    console.error("Excel読み込みエラー:", err.message);
}

3. Excelファイル書き込みサンプル
// write_excel.js
const XLSX = require("xlsx");
const path = require("path");

try {
    // 書き込むデータ（配列の各要素が1行）
    const data = [
        { 名前: "田中", 年齢: 28, 部署: "営業" },
        { 名前: "佐藤", 年齢: 34, 部署: "開発" },
        { 名前: "鈴木", 年齢: 25, 部署: "総務" }
    ];

    // 新しいワークブック作成
    const workbook = XLSX.utils.book_new();

    // データをシートに変換
    const worksheet = XLSX.utils.json_to_sheet(data);

    // ワークブックにシートを追加
    XLSX.utils.book_append_sheet(workbook, worksheet, "社員一覧");

    // ファイルに書き込み
    const filePath = path.join(__dirname, "output.xlsx");
    XLSX.writeFile(workbook, filePath);

    console.log("Excelファイルを書き込みました:", filePath);
} catch (err) {
    console.error("Excel書き込みエラー:", err.message);
}

4. 実行方法
Bash

コードをコピー
node read_excel.js
node write_excel.js

5. 注意点
xlsx はブラウザ版とNode.js版でAPIは同じですが、Node.jsではreadFile / writeFileを使います。
日本語や特殊文字を含む場合はUTF-8で保存されます。
大きなファイルを扱う場合はメモリ消費に注意してください。

__
//?? 特定セルだけ読み書きしたい
--
1. 特定セルを読み取る

// read_cell.js
const XLSX = require("xlsx");
const path = require("path");

try {
    const filePath = path.join(__dirname, "sample.xlsx");

    // Excelファイル読み込み
    const workbook = XLSX.readFile(filePath);

    // シート取得（例: 最初のシート）
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // 特定セル（例: B2）の値を取得
    const targetCell = "B2";
    const cellValue = sheet[targetCell] ? sheet[targetCell].v : null;

    console.log(`セル ${targetCell} の値:`, cellValue);
} catch (err) {
    console.error("セル読み込みエラー:", err.message);
}

2. 特定セルに書き込む

// write_cell.js
const XLSX = require("xlsx");
const path = require("path");

try {
    const filePath = path.join(__dirname, "sample.xlsx");

    // Excelファイル読み込み
    const workbook = XLSX.readFile(filePath);

    // シート取得
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // 特定セル（例: C3）に値を書き込み
    const targetCell = "C3";
    sheet[targetCell] = { t: "s", v: "更新された値" }; 
    // t: "s" → 文字列, "n" → 数値, "b" → boolean

    // シートの範囲（!ref）を更新（必要な場合）
    if (!sheet["!ref"] || !sheet["!ref"].includes(targetCell)) {
        const range = XLSX.utils.decode_range(sheet["!ref"]);
        const cellPos = XLSX.utils.decode_cell(targetCell);
        range.s.c = Math.min(range.s.c, cellPos.c);
        range.s.r = Math.min(range.s.r, cellPos.r);
        range.e.c = Math.max(range.e.c, cellPos.c);
        range.e.r = Math.max(range.e.r, cellPos.r);
        sheet["!ref"] = XLSX.utils.encode_range(range);
    }

    // ファイル保存
    XLSX.writeFile(workbook, path.join(__dirname, "sample_updated.xlsx"));

    console.log(`セル ${targetCell} を更新しました`);
} catch (err) {
    console.error("セル書き込みエラー:", err.message);
}

3. ポイント
セル指定は "A1" 形式（列は英字、行は数字）。
sheet[cell] が undefined の場合、そのセルはまだ存在しないので新規作成します。
t はデータ型を表し、主に以下を使用します：
"s" → 文字列
"n" → 数値
"b" → 真偽値
"d" → 日付

範囲 !ref を更新しないと、新しいセルがExcelで表示されない場合があります。


__-----------
//?? JavaScriptで画像から人の顔の位置を検出するもっとも簡単な方法
--
最も簡単なのは ml5.js（FaceAPI）
ml5.js は TensorFlow.js をラップした初心者向けライブラリで、
数行のコードで顔検出が動くのが最大のメリットです。

最小コード例（画像の顔検出）

<script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>

<img id="inputImage" src="face.jpg" />

<script>
  const img = document.getElementById("inputImage");

  // FaceAPI をロード
  const faceapi = ml5.faceApi(img, () => {
    faceapi.detect((err, results) => {
      console.log(results); // 顔の位置（bounding box）がここに入る
    });
  });
</script>

--
->//?? Canvas に検出結果を描画するコード, 複数人の顔検出

--
->//?? スマホでも動作し、カメラフォルダから画像を選べるようにしたい
--
//Canvas に顔の位置を描画（複数人対応）

 複数人の顔を検出
 で複数の顔を順番に処理。
✔ 顔の位置（バウンディングボックス）を Canvas に描画
 で赤枠を描画。
✔ 目・鼻・口などのランドマークも描画
黄色い点で表示。

--
->//?? スマホでも動作し、カメラフォルダから画像を選べるようにしたい

--
スマホ対応：画像選択 → 顔検出 → Canvas 描画（複数人対応）
スマホではこれが自動的に「カメラロール（ギャラリー）」を開いてくれる。

--HTML
<script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>
<input id="fileInput" type="file" accept="image/*" />
<br>
<canvas id="canvas"></canvas>

<script>
  const fileInput = document.getElementById("fileInput");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  let faceapi;

  // FaceAPI の設定
  const options = {
    withLandmarks: true,
    withDescriptors: false
  };

  // モデル読み込み
  ml5.faceApi(options, () => {
    faceapi = ml5.faceApi(options, modelReady);
  });

  function modelReady() {
    console.log("FaceAPI ready");
  }

  // 画像が選択されたら実行
  fileInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      faceapi.detect(img, gotResults);
    };
  });

  function gotResults(err, results) {
    if (err) {
      console.error(err);
      return;
    }

    results.forEach(face => {
      const { x, y, width, height } = face.alignedRect._box;

      // 顔の枠
      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, width, height);

      // ランドマーク
      ctx.fillStyle = "yellow";
      face.parts.forEach(part => {
        part.forEach(point => {
          ctx.beginPath();
          ctx.arc(point._x, point._y, 2, 0, Math.PI * 2);
          ctx.fill();
        });
      });
    });
  }
</script>

--
->//?? 検出した顔の部分をアフィン変換で変形出来るようにしたい

いいね、その方向は一気に応用が広がる。
アフィン変換は Canvas の setTransform() または transform() を使う方法が最もシンプル。

全体の流れ
- ml5.js で顔の位置（x, y, width, height）を取得
- 顔部分を一旦オフスクリーン Canvas に切り出す
- ctx.setTransform(a, b, c, d, e, f) でアフィン変換
- メイン Canvas に変形した顔を描画
- transform をリセット

--
->//?? 検出した顔の部分をアフィン変換で変形出来るようにしたい
->//?? HTML全体も書いて
->//?? "ml5.faceApi(options, () => {"の個所で、"Uncaught TypeError: ml5.faceApi is not a function"というエラーが出ました
->//?? "Uncaught (in promise) Error: SsdMobilenetv1 - load model before inference"というエラーが出ました


-- kaocon.html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>顔検出 + アフィン変換</title>
  <script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>
  <style>
    body {
      font-family: sans-serif;
      padding: 10px;
    }
    canvas {
      max-width: 100%;
      border: 1px solid #ccc;
      margin-top: 10px;
    }
  </style>
</head>
<body>

  <h2>顔検出 + アフィン変換（スマホ対応）</h2>

  <input id="fileInput" type="file" accept="image/*">
  <canvas id="canvas"></canvas>

  <script>
    const fileInput = document.getElementById("fileInput");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    let faceapi;

    const options = {
      withLandmarks: false,
      withDescriptors: false
    };

    // FaceAPI モデル読み込み
    ml5.faceApi(options, () => {
      faceapi = ml5.faceApi(options, modelReady);
    });

    function modelReady() {
      console.log("FaceAPI ready");
    }

    // 画像選択時
    fileInput.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        faceapi.detect(img, (err, results) => {
          if (err) return console.error(err);
          results.forEach(face => applyAffineToFace(img, face));
        });
      };
    });

    // 顔部分をアフィン変換して描画
    function applyAffineToFace(img, face) {
      const { x, y, width, height } = face.alignedRect._box;

      // 顔部分をオフスクリーン Canvas に切り出す
      const off = document.createElement("canvas");
      off.width = width;
      off.height = height;
      const offCtx = off.getContext("2d");
      offCtx.drawImage(img, x, y, width, height, 0, 0, width, height);

      // アフィン変換（例：少し傾けて伸ばす）
      ctx.save();
      ctx.setTransform(
        1.2, 0.2,   // a, b（横方向の伸び + 斜め）
        -0.1, 1.1,  // c, d（縦方向の歪み）
        x, y        // e, f（描画位置）
      );

      ctx.drawImage(off, 0, 0);
      ctx.restore();
    }
  </script>
</body>
</html>

ctx.setTransform(a, b, c, d, e, f) は以下の行列に対応：
	a c e
	b d f
	0 0 1

- a, d：拡大縮小
- b, c：傾き（shear）
- e, f：移動（translate）

|横に伸ばす|		setTransform(1.3, 0, 0, 1, x, y) | 
|斜めに傾ける|		setTransform(1, 0.3, 0, 1, x, y) | 
|回転|		setTransform(cosθ, sinθ, -sinθ, cosθ, x, y) | 

__
//?? HTML全体も書いて
