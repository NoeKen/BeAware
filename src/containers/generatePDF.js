/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  Button,
  StyleSheet,
  NativeModules,
  Platform,
  Text,
  View,
} from 'react-native';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import { expensesListPDF } from '../components/pdf/expensesPDF';
import light from '../constants/theme/light';

export default function RNPrintExample() {
  state = {
    selectedPrinter: null,
  };

  const html = `
  <html>
    <body>
        <h1 style="color:blue;text-align: center;">Hello World!</h1>
        <h6>This is a sample React Native App</h6>
        <div style="position: fixed; color:${light.brandPrimary}; bottom: 0; right: 0; z-index:999;">made with beAware app</div>
    </body>
</html>
  `;

  // @NOTE iOS Only
  selectPrinter = async () => {
    const selectedPrinter = await RNPrint.selectPrinter({x: 100, y: 100});
    this.setState({selectedPrinter});
  };

  // @NOTE iOS Only
  silentPrint = async () => {
    if (!this.state.selectedPrinter) {
      alert('Must Select Printer First');
    }

    const jobName = await RNPrint.print({
      printerURL: this.state.selectedPrinter.url,
      html: '<h1>Silent Print</h1>',
    });
  };

  async function printHTML() {
    await RNPrint.print({
      html: '<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3>',
    });
  }

  async function printPDF() {
    const results = await RNHTMLtoPDF.convert({
      html: `${html}`,
      fileName: 'test',
      base64: true,
    });
    console.log('====================================');
    console.log('pdf:',results);
    console.log('====================================');
    await RNPrint.print({filePath: results.filePath});
  }

  async function printRemotePDF() {
    await RNPrint.print({
      filePath: 'https://graduateland.com/api/v2/users/jesper/cv',
    });
  }

  customOptions = () => {
    return (
      <View>
        {this.state.selectedPrinter && (
          <View>
            <Text>{`Selected Printer Name: ${this.state.selectedPrinter.name}`}</Text>
            <Text>{`Selected Printer URI: ${this.state.selectedPrinter.url}`}</Text>
          </View>
        )}
        <Button onPress={() => selectPrinter} title="Select Printer" />
        <Button onPress={() => silentPrint} title="Silent Print" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && this.customOptions()}
      <Button onPress={() => printHTML()} title="Print HTML" />
      <Button onPress={() => expensesListPDF()} title="Print PDF" />
      <Button onPress={() => printRemotePDF()} title="Print Remote PDF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
