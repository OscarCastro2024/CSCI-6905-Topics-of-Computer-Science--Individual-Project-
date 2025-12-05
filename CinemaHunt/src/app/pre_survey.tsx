import React from "react";
import {StyleSheet,Text,View,Button} from "react-native";
import {Link} from "expo-router";

export default function preSurveyScreen() {
    return (
        <View style={styles.container}>
            <Text style={[styles.textInfo]}>We will now ask you a few questions to help us with the recommendation!</Text>
            <View style={styles.beginButton}>
              <Link href="/survey" push asChild>
                <Button title="Begin Survey" />
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
      textInfo:{
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: -80
      },
      beginButton: {
        marginTop: 40,
        fontSize: 20,
        fontWeight: 'bold'
      }

    });