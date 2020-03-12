/**
 * oneMoon React Native App
 * @format
 * @flow
 */

import 'react-native-gesture-handler';
import React, {useReducer, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, View, Text, Button, ScrollView} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {Ionicons} from 'react-native-vector-icons/Ionicons';

import Amplify, {Hub, Auth, API, graphqlOperation} from 'aws-amplify';
import * as queries from './src/graphql/queries';
import awsconfig from './aws-exports';

import Login from './components/_oldComponents/Login';
import EmailLoginForm from './components/_oldComponents/EmailLoginForm';
import UserChallengeStatus from './components/_oldComponents/UserChallengeStatus';
import Splash from './components/_oldComponents/Splash';
import FirstTime from './components/_oldComponents/FirstTime';
import FirstTimeChallengeType from './components/_oldComponents/FirstTimeChallengeType';
import FirstTimeChallengeTypeQuantity from './components/_oldComponents/FirstTimeChallengeTypeQuantity';
import FirstTimeChallengeTypeQuantityConfirm from './components/_oldComponents/FirstTimeChallengeTypeQuantityConfirm';
import CreateChallenge from './components/CreateChallenge/Index';
import ChallengeStatus from './components/ChallengeStatus/Index';

Amplify.configure(awsconfig);

const initialState = {
  currentView: 'SPLASH_VIEW',
  user: null,
  loading: true,
  userCurrentChallenge: {
    id: '1',
    userID: 'Travis',
    title: 'Squat til you Drop',
    startDate: '2020-03-6',
    increase: null,
    isValid: 'valid',
    task1Name: '5 Squats',
    task1IsDone: false,
    task2Name: '10 Squats',
    task2IsDone: false,
    task3Name: '15 Squats',
    task3IsDone: false,
    task4Name: '20 Squats',
    task4IsDone: false,
    task5Name: 'taskName',
    task5IsDone: false,
    task6Name: 'taskName',
    task6IsDone: false,
    task7Name: 'taskName',
    task7IsDone: false,
    task8Name: 'taskName',
    task8IsDone: false,
    task9Name: 'taskName',
    task9IsDone: false,
    task10Name: 'taskName',
    task10IsDone: false,
    task11Name: 'taskName',
    task11IsDone: false,
    task12Name: 'taskName',
    task12IsDone: false,
    task13Name: 'taskName',
    task13IsDone: false,
    task14Name: 'taskName',
    task14IsDone: false,
    task15Name: 'taskName',
    task15IsDone: false,
    task16Name: 'taskName',
    task16IsDone: false,
    task17Name: 'taskName',
    task17IsDone: false,
    task18Name: 'taskName',
    task18IsDone: false,
    task19Name: 'taskName',
    task19IsDone: false,
    task20Name: 'taskName',
    task20IsDone: false,
    task21Name: 'taskName',
    task21IsDone: false,
    task22Name: 'taskName',
    task22IsDone: false,
    task23Name: 'taskName',
    task23IsDone: false,
    task24Name: 'taskName',
    task24IsDone: false,
    task25Name: 'taskName',
    task25IsDone: false,
    task26Name: 'taskName',
    task26IsDone: false,
    task27Name: 'taskName',
    task27IsDone: false,
    task28Name: 'taskName',
    task28IsDone: false,
    task29Name: 'taskName',
    task29IsDone: false,
    task30Name: 'taskName',
    task30IsDone: false,
  },
  isDone: false,
};

const reducer = (state: any, action: {type: string}) => {
  let newState = {...state};
  switch (action.type) {
    case 'SET_LOGIN_VIEW':
      newState.currentView = 'LOGIN_VIEW';
      return newState;
    case 'SET_FIRST_VIEW':
      newState.currentView = 'FIRST_TIME';
      return newState;
    case 'SET_USER_VIEW':
      newState.currentView = 'USER_MAIN_VIEW';
      return newState;
    case 'SET_REACT_NATIVE_VIEW':
      newState.currentView = 'REACT_NATIVE_VIEW';
      return newState;
    case 'SET_FIRST_TIME_CHALLENGE_TYPE_VIEW':
      newState.currentView = 'FIRST_TIME_CHALLENGE_TYPE_VIEW';
      return newState;
    case 'SET_FIRST_TIME_CHALLENGE_TYPE_VIEW':
      newState.currentView = 'FIRST_TIME_CHALLENGE_TYPE_VIEW';
      return newState;
    case 'SET_FIRST_TIME_CHALLENGE_TYPE_QUANTITY_VIEW':
      newState.currentView = 'FIRST_TIME_CHALLENGE_TYPE_QUANTITY_VIEW';
      return newState;
    case 'SET_FIRST_TIME_CHALLENGE_TYPE_QUANTITY_CONFIRM_VIEW':
      newState.currentView = 'FIRST_TIME_CHALLENGE_TYPE_QUANTITY_CONFIRM_VIEW';
      return newState;
    case 'SET_CHALLENGE_STATUS_VIEW':
      newState.currentView = 'CHALLENGE_STATUS_VIEW';
      return newState;
    case 'SET_USER':
      return {...state, user: action.user, loading: false};
    case 'LOADED':
      return {...state, loading: false};
    // case 'SET_USER_CURRENT_CHALLENGE':
    //   return {...state, userCurrentChallenge: action.userCurrentChallenge};
    default:
      return state;
  }
};

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function SplashScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Splash />
    </View>
  );
}

function DetailsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [formState, updateFormState] = useState('base');
  const [challengeInput, setChallengeInput] = useState({});
  const [currentChallengeId, setCurrentChallengeId] = useState({});
  const [userCurrentChallenge, setUserCurrentChallenge] = useState({});
  const [isDone, setIsDone] = useState(false);

  console.log('currentChallenge!!!!!!!!  ', currentChallengeId);

  useEffect(() => {
    // set listener for auth events
    Hub.listen('auth', data => {
      const {payload} = data;
      if (payload.event === 'signIn') {
        setImmediate(() => dispatch({type: 'SET_USER', user: payload.data}));
        updateFormState('base');
      }
      if (payload.event === 'signOut') {
        setTimeout(() => dispatch({type: 'SET_USER', user: null}), 350);
      }
    });
    checkUser(dispatch);

    // // // get user's current active challenge
    // const getUserCurrentChallenge = async () => {
    //   const data = await API.graphql(
    //     graphqlOperation(queries.getChallenge, {id: '1'}),
    //   );
    //   const payload = data.data.getChallenge;
    //   dispatch({
    //     type: 'SET_USER_CURRENT_CHALLENGE',
    //     userCurrentChallenge: payload,
    //   });
    //   // console.log(data);
    // };
    // getUserCurrentChallenge();
  }, []);

  // function reducer(state: any, action: {type: string}) {
  //   let newState = {...state};
  //   switch (action.type) {
  //     case 'SET_LOGIN_VIEW': //Keep for now
  //       newState.currentView = 'LOGIN_VIEW';
  //       return newState;
  //     case 'SET_USER_VIEW': //Keep for now
  //       newState.currentView = 'USER_MAIN_VIEW';
  //       return newState;
  //     case 'SET_REACT_NATIVE_VIEW':
  //       newState.currentView = 'REACT_NATIVE_VIEW';
  //       return newState;
  //     case 'SET_USER':
  //       return {...state, user: action.user, loading: false};
  //     case 'LOADED':
  //       return {...state, loading: false};
  //     default:
  //       return state;
  //   }
  // }

  function setReactView() {
    dispatch({type: 'SET_REACT_NATIVE_VIEW'});
  }

  function setFirstTimeChallengeTypeView() {
    dispatch({type: 'SET_FIRST_TIME_CHALLENGE_TYPE_VIEW'});
  }

  function setFirstTimeChallengeTypeQuantityView() {
    dispatch({type: 'SET_FIRST_TIME_CHALLENGE_TYPE_QUANTITY_VIEW'});
  }

  function setFirstTimeChallengeTypeQuantityConfirmView() {
    dispatch({type: 'SET_FIRST_TIME_CHALLENGE_TYPE_QUANTITY_CONFIRM_VIEW'});
  }

  function setChallengeStatusView() {
    dispatch({type: 'SET_CHALLENGE_STATUS_VIEW'});
  }

  useEffect(() => {
    // load app with Spalsh screen, change to login screen after 2 seconds
    // setTimeout(() => {
    //   dispatch({type: 'SET_FIRST_VIEW'});
    // }, 2000);
  }, []);

  // let body = <Splash changeView={setReactView} />;

  // mark task complete
  const markComplete = () => {
    setIsDone(true);
    console.log('markComplete', isDone);
    return;
  };

  let body = <Splash />;
  console.log('currentView: ', state.currentView);
  if (state.currentView === 'FIRST_TIME') {
    body = (
      <FirstTime
        state={state}
        challengeInput={challengeInput}
        setChallengeInput={setChallengeInput}
        changeView={setFirstTimeChallengeTypeView}
      />
    );
  } else if (state.currentView === 'USER_MAIN_VIEW') {
    body = <Login changeView={setReactView} />;
  } else if (state.currentView === 'LOGIN_VIEW') {
    body = <Login changeView={setReactView} />;
  } else if (state.currentView === 'FIRST_TIME_CHALLENGE_TYPE_VIEW') {
    console.log('challengeInput: ', challengeInput);
    body = (
      <FirstTimeChallengeType
        state={state}
        changeView={setFirstTimeChallengeTypeQuantityView}
      />
    );
  } else if (state.currentView === 'FIRST_TIME_CHALLENGE_TYPE_QUANTITY_VIEW') {
    body = (
      <FirstTimeChallengeTypeQuantity
        state={state}
        challengeInput={challengeInput}
        setChallengeInput={setChallengeInput}
        changeView={setFirstTimeChallengeTypeQuantityConfirmView}
      />
    );
  } else if (
    state.currentView === 'FIRST_TIME_CHALLENGE_TYPE_QUANTITY_CONFIRM_VIEW'
  ) {
    body = (
      <FirstTimeChallengeTypeQuantityConfirm
        state={state}
        challengeInput={challengeInput}
        changeView={setChallengeStatusView}
        currentChallengeId={currentChallengeId}
        setCurrentChallengeId={setCurrentChallengeId}
        setUserCurrentChallenge={setUserCurrentChallenge}
      />
    );
  } else if (state.currentView === 'CHALLENGE_STATUS_VIEW') {
    body = (
      <ChallengeStatus
        state={state}
        currentChallengeId={currentChallengeId}
        data={state.userCurrentChallenge}
        markComplete={markComplete}
        isDone={isDone}
      />
    );
  }

  // User authentication
  async function checkUser(dispatch) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      dispatch({type: 'SET_USER', user});
    } catch (err) {
      console.log('err: ', err);
      dispatch({type: 'LOADED'});
    }
  }

  // Sign out; Don't delete
  function signOut() {
    console.log('signOut :');
    Auth.signOut()
      .then(data => {
        console.log('signed out: ', data);
        setTimeout(() => dispatch({type: 'SET_USER', user: null}), 350);
      })
      .catch(err => console.log(err));
  }

  // This renders the sign-in form
  if (formState === 'email') {
    return (
      <View style={styles.appContainer}>
        <EmailLoginForm />
      </View>
    );
  }

  // let body = <ReactNative signOut={signOut} user={state.user} />;

  return (
    <>
      <NavigationContainer>
        {/* <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#0a3d62',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{
              title: 'splashzz',
              headerRight: () => (
                <Button
                  onPress={() => alert('This is a button!')}
                  title="Alert"
                  color="#fff"
                />
              ),
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'One Moon',
            }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{
              title: 'Detailz',
            }}
          />
        </Stack.Navigator> */}
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: '#0a3d62',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Home" component={ChallengeStatus} />
          <Tab.Screen name="Create" component={CreateChallenge} />
          <Tab.Screen name="Search" component={Splash} />
          <Tab.Screen name="Settings" component={Splash} />
        </Tab.Navigator>
        {/* <View style={styles.scrollView}>{body}</View>
        {body} */}
        {/* <Splash /> */}
      </NavigationContainer>
    </>
    // <View style={styles.appContainer}>
    //   {state.loading && (
    //     <View style={styles.body}>
    //       <Text>Loading...</Text>
    //     </View>
    //   )}
    //   {!state.user && !state.loading && (
    //     <View>
    //       <View style={styles.container}>
    //         <Button
    //           title="Sign in with Facebook"
    //           onPress={() => {
    //             console.log('Auth :', Auth);
    //             Auth.federatedSignIn({provider: 'Facebook'});
    //           }}
    //         />
    //         <Button
    //           title="Sign in with Google"
    //           onPress={async () => {
    //             const result = await Auth.federatedSignIn({provider: 'Google'});
    //             console.log(
    //               'get aws Auth.federatedSignI google credentials',
    //               result,
    //             );
    //           }}
    //         />
    //         <Button
    //           title="Sign in with Email"
    //           onPress={() => updateFormState('email')}
    //         />
    //       </View>
    //     </View>
    //   )}
    //   {state.user && state.user.signInUserSession && (
    //     <View style={styles.scrollView}>{body}</View>
    //   )}
    //   {/* If you want to use Sign out, please use it :)
    //       <Button
    //         title="Sign Out"
    //         style={{...styles.button, ...styles.signOut}}
    //         onPress={signOut}>
    //         <FaSignOutAlt color="white" />
    //       </Button>
    //   */}
    // </View>
    //   <>
    //     <ChallengeStatus data={state.userCurrentChallenge} />
    //   </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appContainer: {
    paddingTop: 85,
  },
});

export default App;
