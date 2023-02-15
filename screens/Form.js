import React, {
  useState,
} from 'react';
import { TextInput, View, StyleSheet, ActivityIndicator, Alert, SafeAreaView, Text } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Button } from '../components/button';
import { database } from '../config/firebase'
import { useNavigation } from '@react-navigation/native';

export default function Form() {
  const [patrimony, setPatrimony] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function handleNewOrder() {
    const user = getAuth().currentUser;

    if (patrimony !== '' && description !== '') {
      setLoading(true);

      // adicionando o chamado no banco de dados do usuário
      addDoc(collection(database, `${user.uid}`), {
        patrimony,
        description,
        status: 'open',
        email: user.email,
      })
      .then(() => {
        Alert.alert("Chamado", "Chamado criado com sucesso");
        navigation.navigate("Home");
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))

      // adicionando o chamado no banco de dados do usuário
      addDoc(collection(database, 'orders'), {
        patrimony,
        description,
        status: 'open',
        email: user.email,
      })
      .then(() => {
        Alert.alert("Chamado", "Chamado criado com sucesso");
        navigation.navigate("Home");
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Text style={styles.title}>Criar chamado</Text>

        <TextInput
          style={styles.input}
          placeholder="Número do patrimônio"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
          onChangeText={setPatrimony}
        />

        <TextInput
          style={styles.inputDesc}
          placeholder="Descrição"
          autoCapitalize="none"
          autoCorrect={false}
          multiline
          onChangeText={setDescription}
        />

        <Button
          title={ !loading ? "Enviar chamado" : <ActivityIndicator size='small' color='white' />}
          disabled={loading}
          onPress={handleNewOrder}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    color: "#027DFF"
  },
  input: {
    backgroundColor: "#D9DAE1",
    width: '100%',
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    padding: 12,
    borderRadius: 10,
  },
  inputDesc: {
    backgroundColor: "#D9DAE1",
    width: '100%',
    height: 160,
    marginBottom: 20,
    fontSize: 16,
    padding: 12,
    borderRadius: 10,
  }
});