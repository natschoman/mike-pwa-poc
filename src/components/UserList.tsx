import { FC } from 'react';
import { Divider, List, Typography } from '@material-ui/core';

import { User } from '../models/User';
import './UserList.css';
import UserRow from './UserRow';

export interface UserListProps {
  users: User[];
}

const UserList: FC<UserListProps> = ({ users }) => {
  return (
    <div className="UserList">
      <Typography variant="h5" className="UserList-title">
        Users
      </Typography>
      <List dense={false}>
        {users.map((user, idx) => {
          return (
            <div key={idx}>
              <UserRow user={user} />
              <Divider variant="inset" component="li" />
            </div>
          )}
        )}
      </List>
    </div>
  )
};

export default UserList;
