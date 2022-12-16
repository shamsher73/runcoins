import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import appleHealthKit from 'react-native-health';
import StepGraph from './StepGraph';
import makeApolloClient from './../apollo';
import {ApolloProvider} from '@apollo/react-hooks';

const Home = () => {
  const [stepCount, setStepCount] = useState(0);
  const [client, setClient] = useState(null);
  useEffect(() => {
    const fetchSession = async () => {
      const clientApollo = makeApolloClient('');
      await setClient(clientApollo);
    };
    fetchSession();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      let options = {
        date: new Date().toISOString(), // optional; default now
        includeManuallyAdded: true, // optional: default true
      };
      appleHealthKit.getStepCount(options, (err, results) => {
        if (err) {
          return;
        }
        setStepCount(results.value);
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!client) {
    return <></>;
  }
  return (
    <ApolloProvider client={client}>
      <View>
        <Text>StepCount</Text>
        <View style={{marginTop: 50, alignItems: 'center'}}>
          <Text style={{fontSize: 60}}>{stepCount}</Text>
        </View>
        <StepGraph />
      </View>
    </ApolloProvider>
  );
};

export default Home;
