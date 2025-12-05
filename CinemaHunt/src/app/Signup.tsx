import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert} from 'react-native';
import {Link, useRouter} from "expo-router";
import { useSQLiteContext } from 'expo-sqlite';

export default function Signup() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const db = useSQLiteContext();
  const router = useRouter();
 

  const handleSignUp = async() => {
    if(!email.trim() || !password.trim() || !confirmPassword.trim()){
      Alert.alert('Error', 'Please fill all the fields.');
      return;
    }

    if(password !== confirmPassword){
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    try {
      const outcome = await db.getAllAsync(
        'SELECT * FROM users WHERE email = ?', [email]);
        if(outcome.length > 0){
          Alert.alert('Error', 'Account already exists');
          return;
        }
        
        await db.runAsync(
          `INSERT INTO users (email, password) VALUES (?,?)`, [email,password]
        );
        Alert.alert('Success', 'Account created successfully', [
          {text: 'OK', onPress: () => router.push('/Login')}
        ]);
    }catch (err) {
        console.error('Signup failed', err);
        Alert.alert('Error', 'An error occurred during signup.');
    }
  };
  
  return(
    <View style={styles.container}>
      <Text style={[styles.name,{marginBottom:40}]}>Sign up</Text>
      <TextInput
        style ={[styles.input,{marginBottom:15},{marginTop:25}]}
        placeholder="Enter your email..."
        value={email}
        onChangeText={setEmail}
        />
      <TextInput
        style ={[styles.input,{marginBottom:15},{marginTop:20}]}
        placeholder="Create a password.. "
        value={password}
        onChangeText={setPassword}
        />
      <TextInput
        style ={[styles.input,{marginBottom:25},{marginTop:20}]}
        placeholder="Confirm your password..."
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        />
        
        <Button title="Sign up" onPress={handleSignUp}/>

       <View style={styles.button2}>
         <Text style={styles.accountText}>Already have an account? </Text>
         <Link href="/Login" push asChild>
            <Button title="Login" />
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
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 20
  },
  name:{
    fontSize: 56,
    fontWeight: 'bold'
  },
  bio:{
    fontSize: 16,
    marginVertical:10
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
    marginLeft:10,
  }, 
  accountText: {
    fontSize: 15,
    fontWeight: 'bold'
  }
});