import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { database, auth } from '../config/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { signOut, getAuth } from 'firebase/auth';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '../components/button';

export default function Home() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [name, setName] = useState('');

  const navigation = useNavigation();

  function Item({ patrimony, desc, email }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{ patrimony }</Text>
        <Text style={styles.desc}>{ desc }</Text>
        <Text style={styles.email}>{ email }</Text>
      </View>
    );
  }

  // buscando dados do usuário
  useEffect(() => {
    const user = getAuth().currentUser;

    const collectionRef = collection(database, `name${user.uid}`);
    const unsubscribe = onSnapshot(collectionRef, querySnapshot => {
      const data = querySnapshot.docs.map(doc => {
        return doc.data().nome;
      });

      setName(data);
      setLoading(false);
      console.log(orders);
    });

    return unsubscribe;
  }, []);

  // bucando dados do banco de dados
  useEffect(() => {
    setLoading(true);
    const user = getAuth().currentUser;

    const collectionRef = collection(database, showOrders ? `${user.uid}` : 'orders' );
    const unsubscribe = onSnapshot(collectionRef, querySnapshot => {
      const data = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      });

      setOrders(data);
      setLoading(false);
      console.log(orders);
    });

    return unsubscribe;
  }, [showOrders]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.titleHeader}>{ !showOrders ? 'Todos Chamados' : 'Meus Chamados' }</Text>
            <Text style={styles.name}>Olá, { name }</Text>
          </View>

      
          <TouchableOpacity
            style={{ marginBottom: 30 }}
            onPress={() => signOut(auth)}
          >
            <MaterialIcons name="logout" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginBottom: 30 }}
            onPress={() => setShowOrders(!showOrders)}
          >
            {
              !showOrders ?
              <Feather name="menu" size={24} color="black" /> :
              <MaterialIcons name="menu-open" size={29} color="black" />
            }
          </TouchableOpacity>
        </View>

        {
          !loading ?
          <>
            <FlatList
              data={orders}
              extraData={orders}
              keyExtractor={item => item.id}
              renderItem={({item}) => <Item email={item.email} patrimony={item.patrimony} desc={item.description} />}
            /> 
          </>
          :
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large' color="#027DFF" />
          </View>
        }
        
        <Button
          title="Nova Chamado"
          onPress={() => navigation.navigate("Form")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 30,
    backgroundColor: 'white'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    color: "#027DFF",
    marginBottom: 5 
  },  
  item: {
    backgroundColor: 'lightgray',
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  }, 
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    color: 'black',
    marginBottom: 30,
  },
  desc: {
    fontSize: 16,
    color: 'black'
  },
  email: {
    fontSize: 14,
    marginTop: 10,
    color: 'lack'
  },
});