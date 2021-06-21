
export enum OfflineMutationType {
  CREATE_USER = 'CREATE_USER',
  UPDATE_USER = 'UPDATE_USER',
  DELETE_USER = 'DELETE_USER',
}

export interface OfflineMutation {
  id: string;
  type: OfflineMutationType;
  variables: any;
}
