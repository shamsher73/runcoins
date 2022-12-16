import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import appleHealthKit from 'react-native-health';

const Home = () => {
  const [stepCount, setStepCount] = useState(0);

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
        console.log('stepcount');
        console.log(results);
        setStepCount(results.value);
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View>
      <Text>StepCount</Text>
      <View style={{marginTop:50, alignItems:'center'}}>
        <Text style={{fontSize: 60}}>{stepCount}</Text>
      </View>
    </View>
  );
};

export default Home;
