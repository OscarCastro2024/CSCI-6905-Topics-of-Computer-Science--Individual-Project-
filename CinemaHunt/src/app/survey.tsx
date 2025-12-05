import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity,Button } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { questionsOptions } from "./questionContext";
import {Stack, Link} from 'expo-router';

export default function surveyScreen() {
  const [currentId, setCurrentId] = useState<string>("1");
  const [selected, setSelected] = useState<{ [key: string]: number[] }>({});

  const currentQuestion = questionsOptions.find((q) => q.id === currentId);

  const handleOptionSelected = (optionIndex: number) => {
    const current = selected[currentId] || [];
    const newSelected = current.includes(optionIndex)
      ? current.filter( i => i !== optionIndex)
      : [...current, optionIndex];
    setSelected({ ...selected, [currentId]: newSelected });
  };

  const handleNext = () => {
    const c = parseInt(currentId);
    if (c < 5){
      setCurrentId((c + 1).toString());
    }
  };
  
  const handleBack = () => {
    const c = parseInt(currentId);
    if (c > 1){
      setCurrentId((c - 1).toString());
    }
  };

  const handleRowButton = (id: string) => {
    setCurrentId(id);
  };

  if(!currentQuestion) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Question not found</Text>
      </View>
    )
  }
  
  return (
     <View style={styles.container}>
      <Stack.Screen options={{ title: `Question ${currentQuestion.id}`}} />
       <View style={styles.buttonRow}>
          <View style={styles.buttonSpace}>
            <Button title="1" onPress={() => handleRowButton("1")} />
          </View>
          <View style={styles.buttonSpace}>
            <Button title="2" onPress={() => handleRowButton("2")} />
          </View>
          <View style={styles.buttonSpace}>
            <Button title="3" onPress={() => handleRowButton("3")} />
          </View>
          <View style={styles.buttonSpace}>
            <Button title="4" onPress={() => handleRowButton("4")} />
          </View>
          <View style={styles.buttonSpace}>
            <Button title="5" onPress={() => handleRowButton("5")} />
          </View>             
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionRow}
              onPress={() => handleOptionSelected(index)}
            >
              <MaterialCommunityIcons
                name={selected[currentId]?.includes(index) ? "radiobox-marked" : "radiobox-blank"}
                size= {24}
                color="black"
              />
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.backButton}>
          <TouchableOpacity onPress={handleBack}>
            <MaterialCommunityIcons
              name="page-previous"
              size={48}
              color="black"/>
          </TouchableOpacity>
        </View>

        {currentId === "5" ? (
          <View style={styles.nextButton}>
            <Link href="/(Movies)/Recommendations" push asChild>
              <TouchableOpacity style={styles.finishButton}>
                 <Text style={styles.finishedText}>Finish</Text>
              </TouchableOpacity>
            </Link>
          </View>
        ): (
          <View style={styles.nextButton}>
            <TouchableOpacity onPress={handleNext}>
              <MaterialCommunityIcons
                name="page-next"
                size={48}
                color="black"/>
            </TouchableOpacity>
          </View>
        )}
     </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: '#f0f4f7',
        paddingTop: 60,
    },
    buttonRow: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    buttonSpace: {
        flex: 1,
        marginHorizontal: 5,
    },
    notFound: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    notFoundText: {
      fontSize: 18,
      color: 'red',
    },
    questionContainer: {
      flex: 1,
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    questionText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      marginTop: 150,
    },
    optionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      width: '100%',
    },
    optionText: {
      fontSize: 16,
      marginLeft: 10,
    },
    nextButton: {
      position: 'absolute',
      bottom: 200,
      right: 20,
    },
    backButton: {
      position: 'absolute',
      bottom: 200,
      left: 20,
    },
    finishButton: {
      padding: 10,
      backgroundColor: '#03b3ffff',
      borderRadius: 5,
    },
    finishedText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
});