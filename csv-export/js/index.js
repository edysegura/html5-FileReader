'use strict'

import { data } from './data.js'
import buildTable from './buildTable.js'
import exportToCSV from './exportToCSV.js';

buildTable(data)
exportToCSV('my-filename.csv', data)