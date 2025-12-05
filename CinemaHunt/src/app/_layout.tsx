import React from 'react';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import { SQLiteProvider } from 'expo-sqlite';

export default function RootLayout() {
    return (
        <SQLiteProvider
            databaseName= "LoginAndSignup.db"
            onInit={async (db) =>
                await db.execAsync(`
                  PRAGMA journal_mode = 'wal';
                  CREATE TABLE IF NOT EXISTS users (
                      id INTEGER PRIMARY KEY AUTOINCREMENT, 
                      email TEXT UNIQUE NOT NULL,
                      password TEXT NOT NULL
                    );
                `)}
        >
        <React.Fragment>
           <StatusBar style="auto"/>
           <Stack
               screenOptions={{
                  headerStyle : {
                    backgroundColor: 'brown'
                 },
                 headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#ffffff'
                 },
                 headerTitleAlign: 'center',
                 headerTintColor: 'black'
                }}
            >
             <Stack.Screen
                 name="(Intro)"
                 options={{
                    title: "Cinema-Hunt",
                    }}
                />
            </Stack>
        </React.Fragment>
        </SQLiteProvider>
    );
}