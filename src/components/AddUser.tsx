import { FC, useContext, useState } from 'react';
import {Button, makeStyles, TextField} from '@material-ui/core';
import {useMutation} from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

import {ADD_USER_MUTATION, LIST_USERS_QUERY} from '../graphql';
import { Context as OfflineContext } from '../context/OfflineContext';
import { OfflineMutationType } from '../models/OfflineMutation';

const useStyles = makeStyles((theme) => ({
  addUser: {
    marginTop: theme.spacing(1),
  }
}));

type AddUserProps = {
};
export const AddUser: FC<AddUserProps> = () => {

  const classes = useStyles();
  const [newUser, setNewUser] = useState<string | null>(null);
  const [insert_users] = useMutation(ADD_USER_MUTATION);

  const { addMutation } = useContext(OfflineContext) as any;

  function onChange(e: any) {
      setNewUser(e.target.value);
  }
  async function onClick(e: any) {
    e.preventDefault();

    try {
      const { errors } = await insert_users({
        variables: {
          name: newUser,
        },
        refetchQueries: () => [
          {
            query: LIST_USERS_QUERY,
          },
        ],
      });

      if (errors) {
        console.log('!!', errors);
      }
    } catch (err) {
      if (!navigator.onLine) {
        addMutation({
          id: uuidv4(),
          type: OfflineMutationType.CREATE_USER,
          variables: { name: newUser },
        });
      }
    }

    setNewUser('');
  }

  return (
    <div className={classes.addUser}>
      <TextField label="New User" onChange={onChange} fullWidth value={newUser}/>
      <Button disabled={!newUser || newUser.length < 3} variant="contained" color="primary" onClick={onClick} className={classes.addUser}>
        Add User
      </Button>
    </div>
  );
};
