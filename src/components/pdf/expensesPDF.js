import light from '../../constants/theme/light';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import moment from 'moment/moment';

// const array = [
//   { company: "Alfreds Futterkiste", contact: "Maria Anders", country: "Germany" },
//   { company: "Centro comercial Moctezuma", contact: "Francisco Chang", country: "Mexico" },
//   { company: "Ernst Handel", contact: "Roland Mendel", country: "Austria" },
//   { company: "Island Trading", contact: "Helen Bennett", country: "UK" },
//   { company: "Laughing Bacchus Winecellars", contact: "Yoshi Tannamuri", country: "Canada" },
//   { company: "Magazzini Alimentari Riuniti", contact: "Giovanni Rovelli", country: "Italy" },
// ]
const createDynamicTable = (array) => {
  console.log('====================================');
  console.log('array: ', array.list);
  console.log('====================================');
  var table = '';
  for (let i in array.list) {
    const item = array.list[i];
    table = table + `
    <tr>
      <td>${item.name}</td>
      <td id='price'>${item.price}</td>
    </tr>
    `
  }
  console.log(table);
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
    <style>
      .watermark {
        opacity: 0.5;
        color: BLACK;
        position: absolute;
        bottom: 0;
        right: 0;
        display: online-flex;

      }
      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }
      td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }
      th{
        color: ${light.brandSecond};
        font-size:20px;
      }
      tr:nth-child(even) {
        background-color: #dddddd;
      }
      #price{
        color: ${light.brandSecond};
      }
      h2{
        color: ${light.brandPrimary};
        font-size:25px;
        font-weight:bold;
        text-align:center;
        text-style:underline;
      }
    </style>
    </head>
    <body>
    <h2>${array.title}</h2>
    <p>This is the list that you made on ${moment(array.created_at).format('MMMM Do YYYY, h:mm a')}</p>

    <table>
      <tr>
        <th>Label</th>
        <th>Price</th>
      </tr>
      ${table}
    </table>
    <div class="watermark">Generated on ${moment(new Date()).format('DD-MM-YYYY')} at ${moment(new Date()).format('HH:MM')} from <h3 style="color: ${light.brandSecond};weight:bold ">beAware app</h3></div>
    
    </body>
  </html>
    `;
  return html;
}
export async function expensesListPDF(array) {
  const results = await RNHTMLtoPDF.convert({
    html: createDynamicTable(array),
    fileName: 'test',
    base64: true,
  });
  await RNPrint.print({filePath: results.filePath});
}
