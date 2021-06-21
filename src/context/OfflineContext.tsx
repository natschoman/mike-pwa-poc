import createDataContext from './createDataContext';
import { OfflineMutation } from '../models/OfflineMutation';

const INITIAL_STATE = {
  mutations: [],
};

const OFFLINE_MUTATIONS_KEY = '@MikePwaPoc_OfflineMutations';
const LOAD_MUTATIONS = 'LOAD_MUTATIONS';
const ADD_MUTATION = 'ADD_MUTATION';
const REMOVE_MUTATION = 'REMOVE_MUTATION';

const getOfflineMutationsKey = () => `${OFFLINE_MUTATIONS_KEY}`;

const offlineReducer = (state: any, action: any) => {
  switch (action.type) {
    case LOAD_MUTATIONS:
      return {
        ...state,
        mutations: [...action.payload],
      };

    case ADD_MUTATION:
      return {
        ...state,
        mutations: [...state.mutations, action.payload],
      };

    case REMOVE_MUTATION:
      return {
        ...state,
        mutations: [...state.mutations.filter((m: OfflineMutation) => m.id !== action.payload)],
      };

    default:
      return state;
  }
};

const loadMutations = (dispatch: any) => async () => {
  const mutationsKey = getOfflineMutationsKey();

  try {
    const storage = await localStorage.getItem(mutationsKey);
    const payload = !storage ? { mutations: [] } : JSON.parse(storage);

    if (!storage) {
      await localStorage.setItem(mutationsKey, JSON.stringify(payload));
    }

    dispatch({ type: LOAD_MUTATIONS, payload: payload.mutations });
  } catch (e) {
    console.error(e);
  }
};

const addMutation = (dispatch: any) => async (mutation: OfflineMutation) => {
  const rtpKey = getOfflineMutationsKey();

  try {
    const storage = (await localStorage.getItem(rtpKey)) ?? '{ mutations: [] }';
    let mutations = JSON.parse(storage).mutations;
    mutations.push(mutation);
    await localStorage.setItem(rtpKey, JSON.stringify({ mutations }));

    dispatch({ type: ADD_MUTATION, payload: mutation });
  } catch (e) {
    console.log(e);
  }
};

const removeMutation = (dispatch: any) => async (id: string) => {
  const rtpKey = getOfflineMutationsKey();

  try {
    const storage = (await localStorage.getItem(rtpKey)) ?? '{ mutations: [] }';
    let mutations: OfflineMutation[] = JSON.parse(storage).mutations;
    const unfinishedMutations = mutations.filter(m => m.id !== id);
    await localStorage.setItem(rtpKey, JSON.stringify({ mutations: unfinishedMutations }));

    dispatch({ type: REMOVE_MUTATION, payload: id });
  } catch (e) {
    console.log(e);
  }
};

export const { Context, Provider } = createDataContext(
  offlineReducer,
  {
    loadMutations,
    addMutation,
    removeMutation,
  },
  {
    ...INITIAL_STATE,
  },
);
