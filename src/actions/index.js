export const userAction = (payload) => ({
  type: 'CHANGE_USER',
  payload,
});

export const walletCurrenciesAction = (payload) => ({
  type: 'CHANGE_CURRENCIES',
  payload,
});

export const walletExpensesAction = (payload) => ({
  type: 'CHANGE_EXPENSES',
  payload,
});
