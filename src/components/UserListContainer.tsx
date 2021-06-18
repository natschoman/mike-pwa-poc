import { gql, useQuery } from '@apollo/client';

import { User } from '../models/User';
import UserList from './UserList';
import './UserListContainer.css';

const USERS_QUERY = gql`
    query users {
        users {
            id
            name
            rocket
        }
    }
`;

const UserListContainer = () => {
  const { loading, error, data } = useQuery<any>(USERS_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error?.message}</div>;
  }

  return (
    <div className="UserListContainer">
      <UserList users={data.users as User[]} />
    </div>
  );
};

export default UserListContainer;
