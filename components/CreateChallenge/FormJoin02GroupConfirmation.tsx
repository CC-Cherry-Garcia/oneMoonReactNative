/* eslint-disable react-hooks/exhaustive-deps */
import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, TextInput, Alert} from 'react-native';
import {
  Container,
  Header,
  Content,
  H1,
  H2,
  H3,
  Text,
  Form,
  Item,
  Input,
  Label,
  Button,
  DatePicker,
  Card,
  CardItem,
  Body,
  View,
  StatusBar,
  FlatList,
  List,
  ListItem,
  Spinner,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Amplify, {API, graphqlOperation} from 'aws-amplify';
import * as queries from '../../src/graphql/queries';
import * as mutations from '../../src/graphql/mutations';
import useStore from '../../state/state';
import LocalPushNotificationSetting from '../LocalPushNotificationSetting';
import Colors from '../../variablesColors';

function FormJoin02GroupConfirmation({navigation, route}, props) {
  const state = useStore(state => state);
  const [loading, setLoading] = useState(true);

  //Store user's active challenge list in other variable,
  //because current challenge is going to be added into user's active challenge (state change)
  //and check function is going to happen again(duplicate challenge error alert papers)
  const [
    userCurrentActiveChallenges,
    setUserCurrentActiveChallenges,
  ] = useState([]);

  //To get group challenge data
  useEffect(() => {
    const getGroupChallenge = async () => {
      const result = await API.graphql(
        graphqlOperation(queries.listGroupChallenges, {
          limit: 1000, //Just in case
          filter: {groupId: {eq: state.challengeInput.groupId}},
        }),
      );

      state.setGroupChallengeInformation(
        result.data.listGroupChallenges.items[0],
      );
      setLoading(false);
    };
    setUserCurrentActiveChallenges(state.userActiveChallengesList);
    getGroupChallenge();
  }, []);

  const groupChallengeInput = {
    groupId: state.challengeInput.groupId,
    userId: route.params.userName,
    isValid: true,
    task1IsDone: false,
    task2IsDone: false,
    task3IsDone: false,
    task4IsDone: false,
    task5IsDone: false,
    task6IsDone: false,
    task7IsDone: false,
    task8IsDone: false,
    task9IsDone: false,
    task10IsDone: false,
    task11IsDone: false,
    task12IsDone: false,
    task13IsDone: false,
    task14IsDone: false,
    task15IsDone: false,
    task16IsDone: false,
    task17IsDone: false,
    task18IsDone: false,
    task19IsDone: false,
    task20IsDone: false,
    task21IsDone: false,
    task22IsDone: false,
    task23IsDone: false,
    task24IsDone: false,
    task25IsDone: false,
    task26IsDone: false,
    task27IsDone: false,
    task28IsDone: false,
    task29IsDone: false,
    task30IsDone: false,
  };
  const insertChallenge = () => {
    API.graphql(
      graphqlOperation(mutations.createGroupChallenge, {
        input: {
          ...groupChallengeInput,
          challengeId: state.groupChallengeInformation.challengeId,
          startDate: state.groupChallengeInformation.startDate,
          task1Date: state.groupChallengeInformation.task1Date,
          task2Date: state.groupChallengeInformation.task2Date,
          task3Date: state.groupChallengeInformation.task3Date,
          task4Date: state.groupChallengeInformation.task4Date,
          task5Date: state.groupChallengeInformation.task5Date,
          task6Date: state.groupChallengeInformation.task6Date,
          task7Date: state.groupChallengeInformation.task7Date,
          task8Date: state.groupChallengeInformation.task8Date,
          task9Date: state.groupChallengeInformation.task9Date,
          task10Date: state.groupChallengeInformation.task10Date,
          task11Date: state.groupChallengeInformation.task11Date,
          task12Date: state.groupChallengeInformation.task12Date,
          task13Date: state.groupChallengeInformation.task13Date,
          task14Date: state.groupChallengeInformation.task14Date,
          task15Date: state.groupChallengeInformation.task15Date,
          task16Date: state.groupChallengeInformation.task16Date,
          task17Date: state.groupChallengeInformation.task17Date,
          task18Date: state.groupChallengeInformation.task18Date,
          task19Date: state.groupChallengeInformation.task19Date,
          task20Date: state.groupChallengeInformation.task20Date,
          task21Date: state.groupChallengeInformation.task21Date,
          task22Date: state.groupChallengeInformation.task22Date,
          task23Date: state.groupChallengeInformation.task23Date,
          task24Date: state.groupChallengeInformation.task24Date,
          task25Date: state.groupChallengeInformation.task25Date,
          task26Date: state.groupChallengeInformation.task26Date,
          task27Date: state.groupChallengeInformation.task27Date,
          task28Date: state.groupChallengeInformation.task28Date,
          task29Date: state.groupChallengeInformation.task29Date,
          task30Date: state.groupChallengeInformation.task30Date,
        },
      }),
    )
      .then(res => {
        console.log('res createGroupChallenge:', res);
        state.setUserHasActiveChallenge(true);
        state.setUserActiveChallengesList([
          ...state.userActiveChallengesList,
          res.data.createGroupChallenge,
        ]);
        LocalPushNotificationSetting.register(
          9,
          0,
          0,
          'You have a daily goal to complete',
          21,
          0,
          0,
          'Did you complete your goal for today?',
        );
      })
      .catch(error =>
        console.log('Error happens in createGroupChallenge: ', error),
      );
  };

  const checkUserHasGroupChallenge = () => {
    return userCurrentActiveChallenges.find(x => {
      return x.groupId && x.groupId === state.challengeInput.groupId;
    });
  };
  if (loading) {
    return (
      <Container>
        <Header />
        <Content>
          <Spinner color="blue" />
        </Content>
      </Container>
    );
  } else if (checkUserHasGroupChallenge()) {
    Alert.alert(
      'Error',
      'You have already joined this group challenge',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('JoinGroupChallenge'),
        },
      ],
      {cancelable: false},
    );
    return <></>;
  } else if (
    typeof state.groupChallengeInformation !== 'object' ||
    Object.keys(state.groupChallengeInformation).length === 0
  ) {
    Alert.alert(
      'Error',
      'There is no group challenge id',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('JoinGroupChallenge'),
        },
      ],
      {cancelable: false},
    );
    return <></>;
  } else {
    return (
      <Container style={styles.Container}>
        <Content padder>
          <H1>Double check your Group Challenge</H1>
          <View
            style={{
              borderBottomColor: 'lightgray',
              borderBottomWidth: 1,
            }}
          />
          <Text style={styles.textDefault}>
            <Text style={{fontWeight: 'bold'}}>Title:</Text>{' '}
            {state.groupChallengeInformation.challenge.title}
          </Text>

          <Text style={styles.textDefault}>
            <Text style={{fontWeight: 'bold'}}>Start Date:</Text>{' '}
            {`${new Date(
              state.groupChallengeInformation.startDate,
            ).getFullYear()}/${new Date(
              state.groupChallengeInformation.startDate,
            ).getMonth() + 1}/${new Date(
              state.groupChallengeInformation.startDate,
            ).getDate()}`}
          </Text>
          <Button
            title="Start Group Challenge"
            onPress={() => {
              insertChallenge();
              // props.changeView();
              navigation.navigate('Home', {screen: 'HomeUser'});
            }}
            style={styles.btn}>
            <Text>Join Group Challenge</Text>
          </Button>
          <List>
            <ListItem>
              <Text>
                Day 1 Task:{' '}
                {state.groupChallengeInformation.challenge.task1Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 2 Task:{' '}
                {state.groupChallengeInformation.challenge.task2Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 3 Task:{' '}
                {state.groupChallengeInformation.challenge.task3Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 4 Task:{' '}
                {state.groupChallengeInformation.challenge.task4Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 5 Task:{' '}
                {state.groupChallengeInformation.challenge.task5Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 6 Task:{' '}
                {state.groupChallengeInformation.challenge.task6Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 7 Task:{' '}
                {state.groupChallengeInformation.challenge.task7Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 8 Task:{' '}
                {state.groupChallengeInformation.challenge.task8Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 9 Task:{' '}
                {state.groupChallengeInformation.challenge.task9Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 10 Task:{' '}
                {state.groupChallengeInformation.challenge.task10Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 11 Task:{' '}
                {state.groupChallengeInformation.challenge.task11Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 12 Task:{' '}
                {state.groupChallengeInformation.challenge.task12Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 13 Task:{' '}
                {state.groupChallengeInformation.challenge.task13Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 14 Task:{' '}
                {state.groupChallengeInformation.challenge.task14Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 15 Task:{' '}
                {state.groupChallengeInformation.challenge.task15Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 16 Task:{' '}
                {state.groupChallengeInformation.challenge.task16Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 17 Task:{' '}
                {state.groupChallengeInformation.challenge.task17Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 18 Task:{' '}
                {state.groupChallengeInformation.challenge.task18Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 19 Task:{' '}
                {state.groupChallengeInformation.challenge.task19Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 20 Task:{' '}
                {state.groupChallengeInformation.challenge.task20Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 21 Task:{' '}
                {state.groupChallengeInformation.challenge.task21Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 22 Task:{' '}
                {state.groupChallengeInformation.challenge.task22Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 23 Task:{' '}
                {state.groupChallengeInformation.challenge.task23Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 24 Task:{' '}
                {state.groupChallengeInformation.challenge.task24Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 25 Task:{' '}
                {state.groupChallengeInformation.challenge.task25Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 26 Task:{' '}
                {state.groupChallengeInformation.challenge.task26Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 27 Task:{' '}
                {state.groupChallengeInformation.challenge.task27Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 28 Task:{' '}
                {state.groupChallengeInformation.challenge.task28Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 29 Task:{' '}
                {state.groupChallengeInformation.challenge.task29Name}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
                Day 30 Task:{' '}
                {state.groupChallengeInformation.challenge.task30Name}
              </Text>
            </ListItem>
          </List>
          <Button
            title="Start Group Challenge"
            onPress={() => {
              insertChallenge();
              // props.changeView();
              navigation.navigate('Home', {screen: 'HomeUser'});
            }}
            style={styles.btn}>
            <Text>Join Group Challenge</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    padding: 20,
  },
  Title: {
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 18,
  },
  textDefault: {
    marginTop: 20,
    fontSize: 18,
  },
  textInputDefault: {
    margin: 10,
    fontSize: 18,
  },
  btn: {
    marginTop: 20,
    backgroundColor: Colors.primary,
  },
});

export default FormJoin02GroupConfirmation;
