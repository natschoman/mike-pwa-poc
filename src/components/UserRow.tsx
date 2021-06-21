import { User } from '../models/User';
import {FC, useState} from 'react';
import {
  IconButton,
  ListItemText,
  TextField,
  Card,
  CardHeader,
} from '@material-ui/core';
import {DeleteUser} from './DeleteUser';
import {AddCircle, Clear, Edit as EditIcon } from '@material-ui/icons';
import {EDIT_USER_MUTATION, LIST_USERS_QUERY} from '../graphql';
import {useMutation} from '@apollo/client';

type StartEditProps = {
  editInProgress: boolean;
  setEditInProgress: (e: boolean) => void;
};
const StartEdit: FC<StartEditProps> = props => {
  const { editInProgress, setEditInProgress } = props;
  if (editInProgress) {
    return null;
  }
  return (
    <IconButton edge="end" aria-label="edit" onClick={() => setEditInProgress(true)}>
      <EditIcon />
    </IconButton>
  );
};

type ItemProps = {
  editInProgress: boolean;
  editedName: string;
  setEditedName: (s: string) => void;
};
const Item: FC<ItemProps> = props => {
  const { editInProgress, editedName, setEditedName } = props;
  function onChange(e: any) {
    const value = e.target.value;
    if (value) {
      setEditedName(value);
    }
  }
  if (editInProgress) {
    return <TextField value={editedName} onChange={onChange} autoFocus />
  }
  return <ListItemText primary={editedName}/>;
};

type EditProps = {
  editInProgress: boolean;
  editedName: string;
  setEditInProgress: (b: boolean) => void;
  originalName: string;
  setEditedName: (s: string) => void;
  id: string;
};
const Edit: FC<EditProps> = props => {
  const { editInProgress, editedName, setEditInProgress, originalName, setEditedName, id } = props;
  const [update_users] = useMutation(EDIT_USER_MUTATION);
  if (!editInProgress) {
    return null;
  }
  function onClearClick() {
    if (editedName.length < 3) {
      setEditedName(originalName);
    }
    setEditInProgress(false);
  }
  async function onAddClick(e: any) {
    e.preventDefault();
    const { errors } = await update_users({
      variables: {
        name: editedName,
        id,
      },
      refetchQueries: () => [
        {
          query: LIST_USERS_QUERY,
        },
      ],
    });
    setEditInProgress(false);
    if (errors) {
      console.log('!!', errors);
    }
  }
  return (
    <>
      <IconButton edge="end" aria-label="add" disabled={editedName.length < 3} onClick={onAddClick}>
        <AddCircle />
      </IconButton>
      <IconButton edge="end" aria-label="clear" onClick={onClearClick}>
        <Clear />
      </IconButton>
    </>
  );
};

export interface UserRowProps {
  user: User;
}
const UserRow: FC<UserRowProps> = props => {
  const { id, name } = props.user;
  const [editInProgress, setEditInProgress] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>(name)

  return (
    <>
    <Card>
    <CardHeader
    title={ 
      <Item editInProgress={editInProgress} editedName={editedName} setEditedName={setEditedName} />}
    action={
      <>
        <StartEdit editInProgress={editInProgress} setEditInProgress={setEditInProgress} />
    <Edit editInProgress={editInProgress} editedName={editedName} setEditInProgress={setEditInProgress} originalName={name} setEditedName={setEditedName} id={id} />
    <DeleteUser id={id} disabled={editInProgress} />
      </>
    }
   />
    </Card>
    </>
  );
};

export default UserRow;
