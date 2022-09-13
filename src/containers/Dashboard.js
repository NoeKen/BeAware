import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
// import Constants from 'expo-constants';
import { DataTable } from 'react-native-paper';
import light from '../constants/theme/light';

const optionsPerPage = [2, 3, 4]

export default Dashboard = () => {

  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  var accounts = [
    {
      accNumber: '56456454',
      accType: 'D',
      productCode: '1454541',
      availBalance: '987436.46',
    },
    {
      accNumber: '12424345645',
      accType: 'D',
      productCode: '154545641',
      availBalance: '500397.64',
    },
    {
      accNumber: '4554545664',
      accType: 'D',
      productCode: '44545',
      availBalance: '2467.02',
    },
    {
      accNumber: '45545x5664',
      accType: 'D',
      productCode: '44545',
      availBalance: '2467.02',
    },
    {
      accNumber: '45ds4545664',
      accType: 'D',
      productCode: '44545',
      availBalance: '2467.02',
    },
    {
      accNumber: '4554545sd64',
      accType: 'D',
      productCode: '44545',
      availBalance: '2467.02',
    },
  ];

  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header style={{justifyContent:'space-between',alignItems:'center'}}>
          <DataTable.Title style={{backgroundColor:'#457852',alignSelf:'center'}}>Num</DataTable.Title>
          <DataTable.Title style={{backgroundColor:'#457852',alignSelf:'center'}}>Account</DataTable.Title>
          <DataTable.Title style={{backgroundColor:'#dcf658'}}>Code</DataTable.Title>
          <DataTable.Title style={{backgroundColor:'#3f1ac4'}}>
            Balance Available
          </DataTable.Title>
        </DataTable.Header>
        {
          accounts.map(account => {
          return (
            <DataTable.Row
              key={account.accNumber}
              onPress={() => {
                console.log(`selected account ${account.accNumber}`)
              }}
            >
              <DataTable.Cell>
                {account.accNumber}
              </DataTable.Cell>
              <DataTable.Cell style={styles.messageColumn}>
                {account.productCode}
              </DataTable.Cell>
              <DataTable.Cell numeric>
                {account.availBalance}
              </DataTable.Cell>
            </DataTable.Row>
        )})}
        <DataTable.Pagination
        page={page}
        numberOfPages={3}
        onPageChange={(page) => setPage(page)}
        label="1-2 of 6"
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={'Rows per page'}
      />
      </DataTable>
      <Text>Dashboard</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // paddingTop: 16,
    backgroundColor: '#ecf0f1',
    // padding: 8,
  },
});
