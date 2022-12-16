import gql from 'graphql-tag';
import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {Text, View} from 'react-native';

export const FETCH_TODOS = gql`
  query {
    users_by_pk(id: "115217961756992723403") {
      id
      email
      steps {
        id
        date
        steps
      }
    }
  }
`;

const StepGraph = () => {
  const {data, error, loading} = useQuery(FETCH_TODOS, {variables: {}});

  if (!data) return null;

  return (
    <View>
      <Text>StepGraph</Text>
      <View>
        {data.users_by_pk.steps.map(step => (
          <Text key={step.id}>{step.date}</Text>
        ))}
      </View>
    </View>
  );
};

export default StepGraph;
