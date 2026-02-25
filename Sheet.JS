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
