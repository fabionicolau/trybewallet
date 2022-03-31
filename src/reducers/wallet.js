const WALLER_INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = WALLER_INITIAL_STATE, action) => {
  switch (action.type) {
  case 'CHANGE_CURRENCIES':
    return {
      ...state,
      currencies: [...state.currencies, action.payload],
    };
  case 'CHANGE_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
};

export default wallet;
