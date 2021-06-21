import { useQuery } from '@apollo/client';
import { User } from '../models/User';
import UserList from './UserList';
import { AddUser } from './AddUser';
import { LIST_USERS_QUERY } from '../graphql';

const UserListContainer = () => {
  const { loading, error, data } = useQuery<any>(LIST_USERS_QUERY);

  if (loading) {
    return <div className="UserListContainer">Loading...</div>;
  }

  if (error) {
    return <div className="UserListContainer">{error?.message}</div>;
  }

  return (
    <div className="UserListContainer">
      <AddUser />
      <UserList users={data.users as User[]} />
    </div>
  );
};

export default UserListContainer;
