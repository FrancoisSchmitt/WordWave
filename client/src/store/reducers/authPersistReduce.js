/**
 * @const auth switch to know if ADD_EMPLOYEE is called if it is the case we iterate in the table data
 */
const initialState = {
      value: [],
      isLoggedIn: false,
};

const authTokens = (state = initialState, action) => {
      switch (action.type) {
            case 'ADD_AUTH_PERSIST_CONFIG':
                  return {
                        ...state,
                        value: [action.message],
                        isLoggedIn: true,
                  };
            case 'ADD_LOGOUT_AUTH_PERSIST_CONFIG':
                  return initialState;
            default:
                  return state;
      }
};

export default authTokens;
