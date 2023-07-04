import {
     Button,
     Image,
     ImageBackground,
     SafeAreaView,
     ScrollView,
     StatusBar,
     StyleSheet,
     Text,
     TextInput,
     TouchableOpacity,
     useColorScheme,
     View,
} from 'react-native';
import React, { useState, useEffect } from 'react'
import Checkbox from '../components/Checkbox';

import {GetData, RemoveItem, RemoveAll, SetData, ToggleStatus} from '../db';
//RemoveAll
//ToggleStatus
import uuid from 'react-native-uuid';


type toDo = {
     id: string;
     nome: string;
     status: boolean;
};


export default function Todo() {
     const [text, setText] = useState('')
     const [list, setList] = useState<Array<toDo>>([])

     const handleSetToDo = (nome: string) => {
          const status = false;
          var id = uuid.v4().toString();
          SetData({ nome, status, id })
               .then(() => {
                    fetchData();
                    setText('');
               })
               .catch(error => {
                    console.log(error);
               });
     };

     const handleRemovetoDo = (id: string) => {          
          RemoveItem(id)
               .then(() => {
                    fetchData();
               })
               .catch(error => {
                    console.log(error);
               });
     };

     const handleRemoveAlltoDo = () => {          
          RemoveAll()
               .then(() => {
                    fetchData();
               })
               .catch(error => {
                    console.log(error);
               });
     };

     const handleToggleStatus = (id: string) => {          
          ToggleStatus(id)
               .then(() => {
                    fetchData();
               })
               .catch(error => {
                    console.log(error);
               });
     };

     const fetchData = async () => {
          const result = await GetData();
          setList(result);
     };

     useEffect(() => {
          fetchData();
     }, []);


     return (
          <View style={styles.back}>
               <Text style={styles.title}>To Do List</Text>

               <View style={styles.v2}>

                    <TextInput style={styles.inp} placeholder='Digite aqui...' onChangeText={(text) => setText(text)} value={text} />
                    <TouchableOpacity style={styles.imgbtn} onPress={() => handleSetToDo(text)}>
                         <Image style={styles.img} source={require('../../assets/enviar.png')} />
                    </TouchableOpacity>

               </View>


               <ScrollView >
                    {list?.map((item, id) => {
                         return (
                              <View key={id} style={styles.v3}>
                                   <Checkbox item={item}/>
                                   <Text style={styles.nm}>{item.nome}</Text>
                                   <TouchableOpacity onPress={() => {                                        
                                        handleRemovetoDo(item.id)
                                   }}>
                                        <Image style={styles.icon} source={require('../../assets/delete.png')} />
                                   </TouchableOpacity>
                              </View>
                         )
                    })}
               </ScrollView >
               <TouchableOpacity style={styles.apg1} onPress={handleRemoveAlltoDo}>
                    <Text style={styles.apg}>APAGAR TUDO</Text>
               </TouchableOpacity>
          </View>
     )
}

const styles = StyleSheet.create({
     apg1: {
          backgroundColor: "red",
          height: 40,
          position: "absolute",
          bottom: 10,
          left: "34%",
          borderRadius: 5,
          padding: 6,
     },

     apg: {
          fontSize: 20,
          color: "white",

     },
     back: {
          flex: 1,
          backgroundColor: "#1B1B1E",
     },
     v2: {
          margin: 20,
          flexDirection: "row",
          justifyContent: "space-between",

     },
     v3: {
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 10,
          borderColor: "#FFFFFF",
          borderWidth: 1,
          borderRadius: 5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",


     },
     nm: {
          fontSize: 25,
          color: "#FFFFFF",
          position: "absolute",
          left: 40,
     },
     icon: {
          width: 25,
          height: 25,
     },
     check: {
          height: 50,
     },
     title: {
          color: "white",
          fontSize: 50,
          textAlign: "center",
          fontWeight: "bold"
     },
     inp: {

          flex: 1,
          marginTop: 10,
          fontSize: 20,
          borderRadius: 20,
          backgroundColor: "#D9D9D9",
     },
     imgbtn: {
          bottom: -5,
          right: 0,
          position: "absolute",
     },
     img: {
          width: 60,
          height: 60,
     },
})