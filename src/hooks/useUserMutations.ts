import { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import { OfflineMutationType } from '../models/OfflineMutation';
import { ADD_USER_MUTATION, DELETE_USER_MUTATION, EDIT_USER_MUTATION, LIST_USERS_QUERY } from '../graphql';
import { Context as OfflineContext } from '../context/OfflineContext';

export const useUserMutation = () => {
  const { addMutation } = useContext(OfflineContext) as any;
  const [createUserMutation] = useMutation(ADD_USER_MUTATION);
  const [updateUserMutation] = useMutation(EDIT_USER_MUTATION);
  const [deleteUserMutation] = useMutation(DELETE_USER_MUTATION);

  const createUser = async (mutationVars: any) => {
    try {
      await createUserMutation({
        variables: mutationVars,
        refetchQueries: () => [
          {
            query: LIST_USERS_QUERY,
          },
        ],
      });
    } catch (err) {
      if (!navigator.onLine) {
        addMutation({
          id: uuidv4(),
          type: OfflineMutationType.CREATE_USER,
          variables: mutationVars,
        });
      }
    }
  };

  const updateUser = async (mutationVars: any) => {
    try {
      await updateUserMutation({
        variables: mutationVars,
        refetchQueries: () => [
          {
            query: LIST_USERS_QUERY,
          },
        ],
      });
    } catch (err) {
      if (!navigator.onLine) {
        addMutation({
          id: uuidv4(),
          type: OfflineMutationType.UPDATE_USER,
          variables: mutationVars,
        });
      }
    }
  }

  const deleteUser = async (mutationVars: any) => {
    try {
      await deleteUserMutation({
        variables: mutationVars,
        refetchQueries: () => [
          {
            query: LIST_USERS_QUERY,
          },
        ],
      });
    } catch (err) {
      if (!navigator.onLine) {
        addMutation({
          id: uuidv4(),
          type: OfflineMutationType.DELETE_USER,
          variables: mutationVars,
        });
      }
    }
  };

  return {
    createUser,
    updateUser,
    deleteUser,
  };
};
