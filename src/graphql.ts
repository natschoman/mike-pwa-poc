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

export const ADD_USER_MUTATION = gql`
  mutation addUser($name: String!) {
    insert_users(objects: {name: $name}) {
      returning {
        id
      }
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation deleteUser($id: uuid) {
    delete_users(where: {
        id: {
          _eq: $id
        } 
      }
    ) {
      returning {
        id
      }
    }
  }
`;
