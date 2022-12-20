import {useQuery} from '@apollo/react-hooks';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import CreateStepRecord from '../components/CreateStepRecord';
import {FETCH_STEP_ID} from '../queries';

const StepCount = ({step, setStepId, user}) => {
  const {data, loading, error} = useQuery(FETCH_STEP_ID, {
    variables: {
      userId: user.id,
      date: new Date().toISOString().split('T')[0],
    },
  });

  // useEffect(() => {
  //   if (data && data.step_counts && data.step_counts[0]) {
  //     setStepId(data.step_counts[0].id);
  //   }
  // }, [data]);

  return (
    <View>
      <View style={{marginTop: 50, alignItems: 'center'}}>
        <Text style={{fontSize: 88, color: 'white'}}>{step}</Text>
      </View>
      {data && data.step_counts && !data.step_counts[0] && (
        <CreateStepRecord user={user} />
      )}
    </View>
  );
};

export default StepCount;
