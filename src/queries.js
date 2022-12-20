import gql from 'graphql-tag';

export const FETCH_STEPS = gql`
  query ($userId: String!) {
    users_by_pk(id: $userId) {
      id
      email
      steps(order_by: {date: desc}) {
        id
        date
        steps
      }
    }
  }
`;

export const UPDATE_STEP_COUNT = gql`
  mutation MyMutation($userId: String!, $date: date, $steps: numeric) {
    update_step_counts(
      where: {user_id: {_eq: $userId}, date: {_eq: $date}}
      _set: {steps: $steps}
    ) {
      returning {
        id
        date
      }
    }
  }
`;

export const FETCH_STEP_ID = gql`
  query ($userId: String!, $date: date) {
    step_counts(where: {date: {_eq: $date}, user_id: {_eq: $userId}}) {
      id
    }
  }
`;

export const ADD_STEP_RECORD = gql`
  mutation MyMutation($id: String!, $userId: String!, $date: date) {
    insert_step_counts_one(object: {id: $id, date: $date, user_id: $userId}) {
      id
    }
  }
`;

export const GET_USER = gql`
  query ($userId: String!) {
    users_by_pk(id: $userId) {
      id
      balance
    }
  }
`;
