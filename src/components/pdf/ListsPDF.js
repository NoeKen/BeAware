import light from '../../constants/theme/light';

import moment from 'moment/moment';
import {Image} from 'react-native';
import logo from '../../../assets/pictures/logoName.png';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';

const createDynamicTable = arrayList => {
  const logoURI = Image.resolveAssetSource(logo).uri;
  var tables = '';
  for (let i in arrayList) {
    const List = arrayList[i];
    var table = '';
    for (let i in List.list) {
      const item = List.list[i];
      table =
        table +
        `
      <tr>
        <td>${item.name}</td>
        <td id='price'>${item.price}</td>
      </tr>
      `;
    }
    tables =
      tables +
      `
      <br/>
      <table>
        <tr>
          <th colspan="2">${List?.title}</th> 
        </tr>
        <tr>
          <th>Label</th>
          <th>Price (XCFA)</th>
        </tr>
        ${table}
        <tr>
          <th>Total</th>
          <th id='TotalPrice'>${List?.total_price}</th>
        </tr>
      </table>
      <p>This is the list that you made on ${moment(List.created_at).format(
        'MMMM Do YYYY, h:mm a',
      )}</p>
      <br/>
      
    `;
  }

  // console.log(table);
  // const body = array.forEach((item) => {
  const html = `
  <!DOCTYPE html>
  <html>
    <header >
    <style>
    body {
      margin: 20;
      padding: 0;
      font-family: sans-serif;
    }
      footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: end;
      }
      .watermark {
        opacity: 0.8;
        color: ${light.inactiveTab};
      }
      tr:first-child th {
        text-align: center; 
        background-color:  rgba(3, 96, 112, 1);
        color: ${light.brandLight};
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
        color: ${light.textColor};
      }
      #TotalPrice{
        color: ${light.brandSecond};
      }
      h1{
        color: ${light.brandPrimary};
        font-weight:bold;
        text-align:center;
        text-style:underline;
      }
      #logo {
        text-align: right; 
      }
      // h2{
      //   color: ${light.brandPrimary};
      //   font-weight:bold;
      //   text-align:center;
      //   text-style:underline;
      // }
      </style>
      <div id="logo">
      <img src="${logoURI}" height="80"  alt="Nom du site"> 
  </div>
    <h1>Impression de toutes vos listes </h1>
    </header>
      <body>
        ${tables}
        </body>
        <footer>
          <div class="watermark">@<span style="color: ${
      light.brandPrimary
    };weight:bold ">beAware app</span> on ${moment(new Date()).format(
      'DD-MM-YYYY')}
    </div>
    </footer>
     </html>
     `;
  return html;
};

export async function AllListPDF(array) {
  const results = await RNHTMLtoPDF.convert({
    html: createDynamicTable(array),
    fileName: 'test',
    base64: true,
    height:612,
  });
  await RNPrint.print({filePath: results.filePath});
}

    // <div class="watermark">Generated on ${moment(new Date()).format(
    //   'DD-MM-YYYY',
    // )}
//     at ${moment(new Date()).format('HH:MM')} from <span style="color: ${
// light.brandSecond
// };weight:bold ">beAware app</span>
// </div>