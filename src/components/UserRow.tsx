import { User } from '../models/User';
import { FC } from 'react';
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {DeleteUser} from './DeleteUser';

export interface UserRowProps {
  user: User;
}

const UserRow: FC<UserRowProps> = ({ user }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <AccountCircleIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={ user.name }
      />
      <ListItemSecondaryAction>
        <DeleteUser id={user.id} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default UserRow;
