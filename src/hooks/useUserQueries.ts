import { useLazyQuery } from '@apollo/client';
import { LIST_USERS_QUERY } from '../graphql';

export const useUserQueries = () => {
  const [load] = useLazyQuery<any>(LIST_USERS_QUERY);

  const loadUsers = async () => {
    await load();
  };

  return {
    loadUsers
  };
};
