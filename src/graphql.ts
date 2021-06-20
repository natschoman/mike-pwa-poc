import {gql} from '@apollo/client';

export const LIST_USERS_QUERY = gql`
    query users {
        users {
            id
            name
            rocket
            timestamp
        }
    }
`;

export const ADD_USERS_MUTATION = gql`
  mutation addUser($name: String!) {
    insert_users(objects: {name: $name}) {
      returning {
        id
      }
    }
  }
`;
