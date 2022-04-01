import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrencies, walletExpensesAction } from '../actions';
import fetchAPI from '../helpers/fetchAPI';
import Table from '../components/Table';

const PAYMENT_METHOD = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const EXPENSE_TAG = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { currenciesDispatch } = this.props;
    currenciesDispatch();
  }

  handleInputChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { walletExpensesDispatch, expenses } = this.props;
    const data = await fetchAPI();
    this.setState(({
      id: expenses.length,
      exchangeRates: data,
    }));
    walletExpensesDispatch(this.state);
    this.setState({
      value: '',
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <Header />
        <form action="">
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              id="value"
              type="number"
              name="value"
              value={ value }
              onChange={ this.handleInputChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              onChange={ this.handleInputChange }
              value={ currency }
            >
              {currencies.map((currencyElement, index) => (
                <option key={ index }>{currencyElement}</option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              data-testid="method-input"
              name="method"
              id="method"
              onChange={ this.handleInputChange }
              value={ method }
            >
              {PAYMENT_METHOD.map((methods, index) => (
                <option key={ index }>{methods}</option>
              ))}
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              data-testid="tag-input"
              name="tag"
              id="tag"
              onChange={ this.handleInputChange }
              value={ tag }
            >
              {EXPENSE_TAG.map((expenses, index) => (
                <option key={ index }>{expenses}</option>
              ))}
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              data-testid="description-input"
              id="description"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleInputChange }
            />
          </label>
          <button
            type="submit"
            onClick={ this.handleSubmit }
          >
            Adicionar despesa

          </button>
        </form>
        <div>
          <Table />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currenciesDispatch: () => dispatch(fetchCurrencies()),
  walletExpensesDispatch: (value) => dispatch(walletExpensesAction(value)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = ({
  currenciesDispach: propTypes.func,
}).isRequired;
