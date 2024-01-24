import {
      ADD_AUTH_PERSIST_CONFIG,
      ADD_LOGOUT_AUTH_PERSIST_CONFIG,
} from './types';

export const token = (message) => ({
      type: ADD_AUTH_PERSIST_CONFIG,
      message,
});

export const Logout = () => ({
      type: ADD_LOGOUT_AUTH_PERSIST_CONFIG,
});
