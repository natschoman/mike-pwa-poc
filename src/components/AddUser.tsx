import { FC, useState } from "react";
import {IconButton, TextField} from '@material-ui/core';
import {ADD_USER_MUTATION, LIST_USERS_QUERY} from '../graphql';
import {useMutation} from '@apollo/client';
import {AddCircle} from '@material-ui/icons';

type AddUserProps = {
};
export const AddUser: FC<AddUserProps> = () => {
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
    <div className="AddUser">
      <TextField label="New User" onChange={onChange} />
      <IconButton edge="end" aria-label="add" disabled={!newUser || newUser.length < 3}>
        <AddCircle onClick={onClick} />
      </IconButton>
    </div>
  );
};
