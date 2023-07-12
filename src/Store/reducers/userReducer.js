const initialState = {
    user: null
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'Set_User':
        return {
          ...state,
          user:action.payload
        };
      default:
        return state;
    }
  };
  export default userReducer;
  