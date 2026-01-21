// Excelファイル読み込みサンプル
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
