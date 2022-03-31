import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrencies } from '../actions';

const PAYMENT_METHOD = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const EXPENSE_TAG = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      description: '',
      currency: '',
      method: '',
      expense: '',
    };
  }

  componentDidMount() {
    const { currenciesDispach } = this.props;
    currenciesDispach(fetchCurrencies());
  }

  handleInputChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { amount, description, currency, method, expense } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <Header />
        <div>
          TrybeWallet
          <label htmlFor="amount">
            Valor:
            <input
              data-testid="value-input"
              id="amount"
              type="number"
              name="amount"
              value={ amount }
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
          <label htmlFor="expense">
            Categoria:
            <select
              data-testid="tag-input"
              name="expense"
              id="expense"
              onChange={ this.handleInputChange }
              value={ expense }
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
              type="description"
              name="description"
              value={ description }
              onChange={ this.handleInputChange }
            />
          </label>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currenciesDispach: () => dispatch(fetchCurrencies()),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = ({
  currenciesDispach: propTypes.func,
}).isRequired;
