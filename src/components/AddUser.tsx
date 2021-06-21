import { FC, useState } from "react";
import {IconButton, makeStyles, TextField} from '@material-ui/core';
import {ADD_USER_MUTATION, LIST_USERS_QUERY} from '../graphql';
import {useMutation} from '@apollo/client';
import {AddCircle} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  addUser: {
    padding: theme.spacing(2),
    paddingLeft: 0
  }
}));

type AddUserProps = {
};
export const AddUser: FC<AddUserProps> = () => {

  const classes = useStyles();
  const [newUser, setNewUser] = useState<string | null>(null);
  const [insert_users] = useMutation(ADD_USER_MUTATION);

  function onChange(e: any) {
    const value = e.target.value;
    if (value) {
      setNewUser(value);
    }
  }
  async function onClick(e: any) {
    e.preventDefault();
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
  }

  return (
    <div className={classes.addUser}>
      <TextField label="New User" onChange={onChange} />
      <IconButton edge="end" aria-label="add" disabled={!newUser || newUser.length < 3}>
        <AddCircle onClick={onClick} />
      </IconButton>
    </div>
  );
};
