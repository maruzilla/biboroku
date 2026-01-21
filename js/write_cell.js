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
