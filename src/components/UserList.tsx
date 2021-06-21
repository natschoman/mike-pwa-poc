import { orderBy, cloneDeep } from 'lodash';
import { FC } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';

import { User } from '../models/User';
import UserRow from './UserRow';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  gridItem: {
      marginBottom: theme.spacing(1) 
  }, 
  title: {
      margin: theme.spacing(3),
      marginLeft: 0
  }
}));

export interface UserListProps {
  users: User[];
}

const UserList: FC<UserListProps> = props => {
  const users = orderBy(cloneDeep(props.users), ['timestamp'], ['desc']);

  const classes = useStyles();
  return (
    <div className="UserList">
      <Typography variant="h4" component="h1"  gutterBottom className={classes.title}>
      { users.length === 0 ? 'Please add User' : 'Users' }
      </Typography>
      <Grid container spacing={3}>
        {users.map((user, idx) => {
          return (
            <Grid item xs={12} key={user.id} className={classes.gridItem}>
              <UserRow user={user} />
            </Grid>
          )}
        )}
      </Grid>
    </div>
  )
};

export default UserList;
