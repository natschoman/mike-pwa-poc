import {FC, useState} from 'react';
import {IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {DELETE_USER_MUTATION, LIST_USERS_QUERY} from '../graphql';
import {useMutation} from '@apollo/client';

import ConfirmDialog from './common/ConfirmDialog'

type DeleteUserProps = {
  id: string;
  disabled: boolean;
  name: string;
};
export const DeleteUser: FC<DeleteUserProps> = props => {

  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const { id, disabled, name } = props;
  const [delete_users] = useMutation(DELETE_USER_MUTATION);

  const onDelete = async () =>{
    const { errors } = await delete_users({
      variables: {
        id,
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
    <>
    <IconButton edge="end" aria-label="delete" disabled={disabled} onClick={()=>setShowConfirmDialog(true)}>
      <DeleteIcon />
    </IconButton>
    <ConfirmDialog 
        text={name}
        onConfirm={onDelete}
        show={showConfirmDialog}
        handleOnClose={()=>setShowConfirmDialog(false)}
      />
    </>
  );
};
