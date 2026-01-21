// 特定セルを読み取る
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
