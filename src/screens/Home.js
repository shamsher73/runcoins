import {useMutation} from '@apollo/react-hooks';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import appleHealthKit from 'react-native-health';
import {UPDATE_STEP_COUNT} from '../queries';
import StepCount from './StepCount';
import StepGraph from './StepGraph';

const Home = ({user}) => {
  const [stepCount, setStepCount] = useState(0);
  const [stepId, setStepId] = useState(null);
  const [updateStepCount, {data, loading, error}] =
    useMutation(UPDATE_STEP_COUNT);

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

  useEffect(() => {
    const updateTimer = setInterval(() => {
      const date = new Date().toISOString().split('T')[0];
      updateStepCount({
        variables: {
          userId: user.id,
          date: date,
          steps: stepCount,
        },
      });
      console.log('updated step');
    }, 5000);
    return () => clearTimeout(updateTimer);
  }, [stepCount]);

  return (
    <View>
      <StepCount step={stepCount} setStepId={setStepId} user={user} />
      <StepGraph user={user} />
    </View>
  );
};

export default Home;
