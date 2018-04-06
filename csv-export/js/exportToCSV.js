export default function exportToCSV(filename, data) {
  let csvText = ''
  data.forEach(row => {
    csvText += row.join(',') + '\n'
  });
  console.log(csvText)
}