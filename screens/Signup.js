import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { Button } from '../components/button';
import { collection, addDoc } from 'firebase/firestore';
import AnimatedLottieView from 'lottie-react-native';

const animation = require("../animations/signin.json");

export default function Signup({ navigation }) {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [name, setName] = useState('');
const [loading, setLoading] = useState(false);

function onHandleSignup() {
  if (email !== '' && password !== '') {
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        addDoc(collection(database, `name${data.user.uid}`), {
          nome: name,
        });
        console.log('Signup success');
      })
      .catch((err) => Alert.alert("Login error", err.message))
      .finally(() => setLoading(false));
  }
};
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
    >
      <View style={styles.container}>
        <SafeAreaView style={styles.form}>
          <AnimatedLottieView source={animation} autoPlay style={{ height: 200, marginBottom: 30 }} />

          <Text style={styles.title}>Crie sua conta</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
            value={password}
            onChangeText={setPassword}
          />

          <Button
            title={ !loading ? 'Entrar' : <ActivityIndicator size='small' color='white' />}
            disabled={loading}
            onPress={onHandleSignup}
          />

          <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
            <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{color: '#027DFF', fontWeight: '600', fontSize: 14}}>Entre</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "#027DFF",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    width: '100%',
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    marginTop: 70,
  },
});