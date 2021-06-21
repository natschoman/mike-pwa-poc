import {FC} from 'react';
import {IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {DELETE_USER_MUTATION, LIST_USERS_QUERY} from '../graphql';
import {useMutation} from '@apollo/client';

type DeleteUserProps = {
  id: string;
  disabled: boolean;
};
export const DeleteUser: FC<DeleteUserProps> = props => {
  const { id, disabled } = props;
  const [delete_users] = useMutation(DELETE_USER_MUTATION);

  async function onClick(e: any) {
    e.preventDefault();
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
    <IconButton edge="end" aria-label="delete" disabled={disabled}>
      <DeleteIcon onClick={onClick} />
    </IconButton>
  );
};
