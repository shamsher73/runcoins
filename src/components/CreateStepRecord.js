import {useMutation} from '@apollo/react-hooks';
import React, {useEffect} from 'react';
import {ADD_STEP_RECORD} from '../queries';
import uuid from 'react-native-uuid';

const CreateStepRecord = ({user}) => {
  const [addStepRecord, {data, loading, error}] = useMutation(ADD_STEP_RECORD);

  useEffect(() => {
    const date = new Date().toISOString().split('T')[0];
    addStepRecord({
      variables: {
        id: uuid.v4(),
        userId: user.id,
        date: date,
      },
    });
    console.log(data);
    console.log(error);
  }, []);

  return <></>;
};

export default CreateStepRecord;
