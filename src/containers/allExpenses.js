import { Tab, Text, View } from "native-base";
import React from "react";
import { FlatList } from "react-native";
import ExpenseItem from "../components/expenses/ExpenseItem";

const AllExpenses = ({route,navigation})=>{
    const {items} = route.params;
    // const arr =  items.getParams('arr',[])
    // console.log("name: ",JSON.stringify(items[0].amount)); 
    return (
        <View style={{marginTop:20,paddingHorizontal:16}} >
            {/* {
                items.map((item)=><Text>name:{item.title}</Text>)
            } */}
            <FlatList 
                data={items}
                renderItem={(item)=>(
                    [<ExpenseItem item={item.item} navigation={navigation} />]
                )}
            />
            {/* <Text>{items[0].amount}</Text> */}
        </View>
    )
}

export default AllExpenses;