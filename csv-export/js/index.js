'use strict'

import { data } from './data.js'
import buildTable from './buildTable.js'
import exportToCSV from './exportToCSV.js';

buildTable(data)

const linkExportCSV = document.querySelector('a')
linkExportCSV.addEventListener('click', e => {
  e.preventDefault()
  exportToCSV(data, 'my-filename.csv')
})