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
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    dispatch(walletCurrenciesAction(Object.keys(data)));
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
