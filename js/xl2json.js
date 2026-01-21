var XLSX = require('xlsx');
var workbook = XLSX.readFile('test.xlsx');
var sheet_name_list = workbook.SheetNames;
sheet_name_list.forEach(function(y) {
    var worksheet = workbook.Sheets[y];
    var jsonData = XLSX.utils.sheet_to_json(worksheet);
    console.log(jsonData);
});
