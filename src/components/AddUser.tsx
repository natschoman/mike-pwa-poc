import { FC, useState } from 'react';
import {Button, makeStyles, TextField} from '@material-ui/core';
import { useUserMutation } from '../hooks/useUserMutations';

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
  const { createUser } = useUserMutation();

  function onChange(e: any) {
      setNewUser(e.target.value);
  }
  async function onClick(e: any) {
    e.preventDefault();

    await createUser({ name: newUser })

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
