import React, { useState } from 'react';
import { StyleSheet, Text, View, Button,Image } from 'react-native';
import {Link} from "expo-router";

export default function HomeScreen() {
  const [input, setInput] = useState('');

  const handleSave = () => {
    if(input.trim()){
      setInput('');
    }
  } 
  
  return(
    <View style={styles.container}>
      <Image 
        source = {require('./Logo.png')}
        style={styles.image}
      />
      <Text style={[styles.name,{marginBottom:40}]}>Cinema-Hunt</Text>
      <Text style={[styles.description,{marginBottom:40}]}>Cinema-Hunt offers personalized movie recommendations based on your preferences, helping you find the perfect film to watch. Simply answer a quick survey and explore curated suggestions by genre, year of release, category,etc. Save your favorite movies to your watchlist, regenerate recommendations, and enjoy a tailored viewing experience every time.</Text>
      
      <Link href="./Login" push asChild>
         <Button title="Start" />
      </Link>

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
    width: 200,
    height: 150,
    borderRadius: 75,
    marginVertical: 20
  },
  name:{
    fontSize: 56,
    fontWeight: 'bold'
  },
  description:{
    fontSize: 15,
    fontWeight: 'normal',
    textAlign: 'center',
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
  }

});