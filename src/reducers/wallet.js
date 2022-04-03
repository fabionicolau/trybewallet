const WALLER_INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = WALLER_INITIAL_STATE, action) => {
  switch (action.type) {
  case 'CHANGE_CURRENCIES':
    return {
      ...state,
      currencies: [...state.currencies, ...action.payload],
    };
  case 'CHANGE_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case 'REMOVE_EXPENSES':
    return {
      ...state,
      expenses: [...action.payload],
    };
  case 'EDIT_EXPENSES':
    return {
      ...state,
      isEdit: action.payload,
    };
  case 'GET_ID':
    return {
      ...state,
      idToEdit: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
