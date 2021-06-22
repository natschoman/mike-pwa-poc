import {FC, useState} from 'react';
import {IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import ConfirmDialog from './common/ConfirmDialog'
import { useUserMutation } from "../hooks/useUserMutations";

type DeleteUserProps = {
  id: string;
  disabled: boolean;
  name: string;
};
export const DeleteUser: FC<DeleteUserProps> = props => {

  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const { id, disabled, name } = props;
  const { deleteUser } = useUserMutation();

  const onDelete = async () =>{
    await deleteUser({ id })
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
