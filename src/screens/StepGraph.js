import gql from 'graphql-tag';
import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {Dimensions, Text, View} from 'react-native';

import {BarChart} from 'react-native-chart-kit';

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

  const dates = data.users_by_pk.steps.map(step => step.date);
  const stepCounts = data.users_by_pk.steps.map(step => step.steps);
  const dataPoints = {
    labels: dates,
    datasets: [
      {
        data: stepCounts,
      },
    ],
  };

  return (
    <View>
      <Text>StepGraph</Text>
      <View>
        <BarChart
          data={dataPoints}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
        />
      </View>
    </View>
  );
};

export default StepGraph;
