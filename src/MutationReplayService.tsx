import { useContext, useEffect, useRef } from 'react';

import { Context as OfflineContext } from './context/OfflineContext';
import { OfflineMutation, OfflineMutationType } from './models/OfflineMutation';
import { useUserMutation } from './hooks/useUserMutations';
import { useUserQueries } from './hooks/useUserQueries';

const MutationReplayService = () => {

  const {
    state: { mutations },
    loadMutations,
    removeMutation,
  } = useContext(OfflineContext) as any;

  const { createUser, updateUser, deleteUser } = useUserMutation();
  const { loadUsers } = useUserQueries();

  // to avoid loop
  const processingMutations = useRef(false);
  
  useEffect(() => {
    const loadOfflineContext = async () => {
      await loadMutations();
    };

    loadOfflineContext();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fireMutation = async (mutation: OfflineMutation) => {
      switch (mutation.type) {
        case OfflineMutationType.CREATE_USER:
          await createUser(mutation.variables);
          break;
        case OfflineMutationType.UPDATE_USER:
          await updateUser(mutation.variables);
          break;
        case OfflineMutationType.DELETE_USER:
          await deleteUser(mutation.variables);
          break;
      }
    };

    if (mutations?.length > 0 && !processingMutations.current) {
      processingMutations.current = true;

      const fireMutations = async () => {
        for (let mutation of mutations) {
          await fireMutation(mutation);
          // it's ok to remove it, if the retry of the offline mutation failed then it will get queued again
          await removeMutation(mutation.id);
        }
        // refresh list after 1s
        setTimeout(() => {
          loadUsers();
          processingMutations.current = false;
        }, 1000);
      };

      fireMutations();
    }
    // eslint-disable-next-line
  }, [mutations]);

  return null;
};

export default MutationReplayService;
