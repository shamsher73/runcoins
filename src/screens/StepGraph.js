import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {Dimensions, Text, View} from 'react-native';

import {BarChart} from 'react-native-chart-kit';
import {FETCH_STEPS} from '../queries';

const StepGraph = ({user}) => {
  const {data, error, loading} = useQuery(FETCH_STEPS, {
    variables: {userId: user.id},
  });
  if (!data) return null;

  const dates = data.users_by_pk.steps.map(step =>
    new Date(step.date).toDateString().slice(4, 10),
  );
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
      <View>
        <BarChart
          data={dataPoints}
          style={{
            marginVertical: 8,
            borderRadius: 16,
            padding: 10,
          }}
          width={Dimensions.get('window').width - 20} // from react-native
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
