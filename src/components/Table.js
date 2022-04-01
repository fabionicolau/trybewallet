import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { walletRemoveExpensesAction } from '../actions/index';

class Table extends React.Component {
  deleteTable = (id) => {
    const { walletExpensesDispatch, expenses } = this.props;
    const filter = expenses.filter((element) => element.id !== id);
    walletExpensesDispatch(filter);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{parseFloat(expense.value).toFixed(2)}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>
                {parseFloat(expense.exchangeRates[expense.currency].ask)
                  .toFixed(2)}
              </td>
              <td>
                {(expense.value * expense.exchangeRates[expense.currency].ask)
                  .toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  // onClick={}
                >
                  Editar

                </button>
                <button
                  data-testid="delete-btn"
                  type="button"
                  onClick={ () => this.deleteTable(expense.id) }
                >
                  Excluir

                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  walletExpensesDispatch: (value) => dispatch(walletRemoveExpensesAction(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = ({
  expenses: propTypes.arrayOf(propTypes.object),
}).isRequired;
