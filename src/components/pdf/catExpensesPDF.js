import light from '../../constants/theme/light';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import moment from 'moment/moment';
import logo from '../../../assets/pictures/logoName.png';
import {Image} from 'react-native';

// const array = [
//   { company: "Alfreds Futterkiste", contact: "Maria Anders", country: "Germany" },
//   { company: "Centro comercial Moctezuma", contact: "Francisco Chang", country: "Mexico" },
//   { company: "Ernst Handel", contact: "Roland Mendel", country: "Austria" },
//   { company: "Island Trading", contact: "Helen Bennett", country: "UK" },
//   { company: "Laughing Bacchus Winecellars", contact: "Yoshi Tannamuri", country: "Canada" },
//   { company: "Magazzini Alimentari Riuniti", contact: "Giovanni Rovelli", country: "Italy" },
// ]
const createDynamicTable = (array, title) => {
  const logoURI = Image.resolveAssetSource(logo).uri;
  const textSize = light.textFontSize + 'px';
  const subtitleSize = light.subTitleFontSize + 'px';
  var table = '';
  for (let i in array) {
    console.log('array', array[i]);
    const item = array[i];
    let color = light.textColor;

    if (item.amount < 0) {
      color = light.brandDanger;
    }
    table =
      table +
      `
    <tr>
      <td>${item?.title}</td>
      <td id='price' style="color: ${color}; font-size: ${textSize}; " >${
        item?.amount
      }</td>
      <td id='text' style= "text-align: justify;" >${item?.description}</td>
      <td id='text'> ${moment(item?.create_at).format('DD-MM-YYYY')} ${moment(
        item?.created_at,
      ).format('hh:mm:ss a')}</td>
    </tr>
    `;
  }
  // console.log(table);
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
    <style>
      footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: end;
      }
      .watermark {
        // opacity: 0.8;
        color: ${light.inactiveTab};
        // font-family: ${light.titleFontFamily};
      }
      span{
        font-family: ${light.textFontFamily};
        // font-weight: bold;
      }
      tr:first-child th {
        text-align: center; 
        background-color:  ${light.brandPrimary};
        color: ${light.brandLight};
        font-size: ${textSize};
        font-family: ${light.titleFontFamily};
      }
      tr:last-child th {
        text-align: center; 
        background-color:  ${light.brandPrimary};
        color: ${light.brandSecond};
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
      // #price{
      //   color: ${light.textColor};
      // }
      #TotalPrice{
        color: ${light.brandSecond};

      }
      #text{
        font-family: ${light.textFontFamily};
        font-size: ${textSize};
      }
      h1{
        color: ${light.brandPrimary};
        // font-weight:bold;
        font-family: ${light.titleFontFamily};
        text-align:center;
        // text-decoration:underline;
      }
      #logo {
        text-align: center; 
      }
    </style>
        <div id="logo">
            <img src="${logoURI}" height="70"  alt="Nom du site"> 
        </div>
    </head>
    <body>
      <br/>
      <h1 >"${title}" list expenses</h1>
      <br/>

      <table>
        <tr>
          <th>Label</th>
          <th>Amount (XCFA)</th>
          <th>Description</th>
          <th>Date/Time</th>
        </tr>
        ${table}
        <tr>
          <th colspan="5">${title}</th>
        </tr>
      </table>
    </body>
    <footer>
      <div class="watermark">@<span style="color: ${
        light.brandPrimary
      };weight:bold ">beAware app</span> on ${moment(new Date()).format(
    'DD-MM-YYYY',
  )}
      </div>
    </footer>
  </html>
    `;
  return html;
};
export async function CatExpensesPDF(array, title) {
  console.log('cat expenses: ', array);
  console.log('cat name: ', title);
  const results = await RNHTMLtoPDF.convert({
    html: createDynamicTable(array, title),
    fileName: 'test',
    base64: true,
    fonts: [
      '../../../assets/fonts/Roboto.ttf',
      '../../../assets/fonts/Roboto Medium.ttf',
      '../../../assets/fonts/Roboto Bold.ttf',
    ],
  });
  await RNPrint.print({filePath: results.filePath});
}
