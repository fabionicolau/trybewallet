import fetchAPI from '../helpers/fetchAPI';

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

export const fetchCurrencies = () => async (dispatch) => {
  const data = await fetchAPI();
  dispatch(walletCurrenciesAction(Object.keys(data)));
};
