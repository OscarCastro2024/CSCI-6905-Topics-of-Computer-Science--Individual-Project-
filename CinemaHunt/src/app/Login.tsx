import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import {Link, useRouter,} from "expo-router";
import { useSQLiteContext } from 'expo-sqlite';
import { User } from './interfaces';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const db = useSQLiteContext();
  const router = useRouter();

  const handleLogin = async () => {
    if(!email.trim() || !password.trim()){
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      const outcome = await db.getAllAsync(
      'SELECT * FROM users WHERE email = ?', [email]);
      if(outcome.length === 0){
        Alert.alert('Error', 'User not found.');
        return;
      }

      const user = outcome[0] as User;
      if(user.password === password){
        Alert.alert('Success', 'Login successfully', [
          {text: 'OK', onPress: () => router.push('/pre_survey')}
        ]);
      } else {
        Alert.alert('Error', 'Invalid Email or Password.');
      }
    } catch (err) {
        console.error('Login failed', err);
        Alert.alert('Error', 'An error occurred during login.');
      }
    }; 
  
  return(
    <View style={styles.container}>
      <Text style={[styles.name,{marginBottom:40}]}>Login</Text>

      <TextInput
        style ={[styles.input,{marginBottom:15},{marginTop:25}]}
        placeholder="Enter your email..."
        value={email}
        onChangeText={setEmail}
        />
      <TextInput
        style ={[styles.input,{marginBottom:25},{marginTop:20}]}
        placeholder="Enter your password "
        value={password}
        onChangeText={setPassword}
        />

        <Button title="Login" onPress={handleLogin} />

       <View style={styles.button2}>
         <Text style={styles.accountText}>Don't have an account?  </Text>
         <Link href="/Signup" push asChild>
         <Button title="Sign Up" />
         </Link>
        </View>
      </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f4f7'
  },
  name:{
    fontSize: 56,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10
  }, 
  button2: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 20,
    marginLeft: 10
  },
  accountText: {
    fontSize: 15,
    fontWeight: 'bold'
  }
});