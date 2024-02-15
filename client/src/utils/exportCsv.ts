/* eslint-disable @typescript-eslint/no-explicit-any */
const ExportCSV = (array: any[]) => {
    const csvColumn = Object.keys(array[0]);
    const csvData = array.map((tier) => Object.values(tier));
    const csvArray = [csvColumn.join(';'), ...csvData.map((e) => e.join(';'))].join('%0D%0A');
    const lienCSV = document.createElement('a');

    lienCSV.href = 'data:text/csv;charset=utf-8,' + csvArray;
    lienCSV.target = '_Blank';
    lienCSV.download = 'file.csv';
    document.body.appendChild(lienCSV);
    lienCSV.click();
    document.body.removeChild(lienCSV);
};

export default ExportCSV