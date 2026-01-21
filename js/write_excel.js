// Excelファイル書き込みサンプル
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
