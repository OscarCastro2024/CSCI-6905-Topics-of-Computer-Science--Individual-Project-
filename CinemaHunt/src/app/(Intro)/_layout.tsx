import React from "react";
import {Stack} from "expo-router";

export default function IntroLayout() {
    return (
        <React.Fragment>
            <Stack screenOptions = {{headerShown: false,
                headerStyle : {
                    backgroundColor: 'brown'
                },
                headerTitleStyle: {
                    fontWeight: 'bold'
                },
                    headerTitleAlign: 'center',
                    headerTintColor: 'black'
            }}
            />
        </React.Fragment>
    );
}