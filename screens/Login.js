import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Button } from '../components/button';
import AnimatedLottieView from 'lottie-react-native';

const animation = require("../animations/signin.json");

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function onHandleLogin() {
    if (email !== '' && password !== '') {
      setLoading(true);

      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login success"))
        .catch((err) => Alert.alert("Login error", err.message))
        .finally(() => setLoading(false));
    }
  }

  function onHandleForgotPassword() {
    if (email !== '') {
      sendPasswordResetEmail(auth, email)
        .then(() => Alert.alert("Redefinir senha", "Enviamos um e-mail para você"))
        .catch(error => console.log(error))
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.form}>
        <AnimatedLottieView source={animation} autoPlay style={{ height: 200, marginBottom: 30 }} />
        
        <Text style={styles.title}>Entre</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <Button
          title={ !loading ? 'Entrar' : <ActivityIndicator size='small' color='white' />}
          disabled={loading}
          onPress={onHandleLogin}
        />

        <TouchableOpacity onPress={onHandleForgotPassword}>
          <Text style={{color: '#027DFF', fontWeight: '600', fontSize: 14, marginTop: 20}}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
          <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Você ja tem uma conta? </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{color: '#027DFF', fontWeight: '600', fontSize: 14}}> Criar Conta</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </View>
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
    width: '100%',
    height: 58,
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
  button: {
    backgroundColor: '#027DFF',
    height: 58,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});