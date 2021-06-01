import React, {useState, useEffect, createContext} from 'react';
import {StyleSheet} from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import {} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import NavigationRPS from './navigation/NavigationRPS';
import {TokenContext} from './context/TokenContext';
import {GameContext} from './context/GameContext';

//const TokenContext = createContext('');

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
};

export default function App() {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        fetch('http://192.168.50.139:8080/auth/token') //ska vara localhost här egentligen, men funkar inte
            .then(response => response.text())
            .then(newToken => {
                setToken(newToken);
                console.log('token:', token);
            })
            .catch(error => console.error(error));
    }, []);

    if (!dataLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setDataLoaded(true)}
                onError={err => console.log(err)}
            />
        );
    }

    return (
        <TokenContext.Provider value={token}>
            <NavigationContainer>
                <NavigationRPS/>
            </NavigationContainer>
        </TokenContext.Provider>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});

//const startGameHandler = () => {};
//<GameContext.Provider value={game}>
//</GameContext.Provider>

//let content = <HomeScreen></HomeScreen>;
//   // <LandingScreen onStartGame={startGameHandler} />;

//  // if (startGameHandler) {
//     //content =<MakeMoveScreen></MakeMoveScreen>
//     //content =
//   }

/*   const allValues = {
    token,
    setToken,
    playerName,
    setPlayerName,
    playerMove,
    setPlayerMove,
    opponentName,
    setOpponentName,
    opponentMove,
    setOpponentMove,
<AppContext value={allValues}></AppContext>
  }


  initialRouteName="Landing"*/
