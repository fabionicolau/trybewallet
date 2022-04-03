import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { MdDelete } from 'react-icons/md';
import { BsPencilSquare } from 'react-icons/bs';

import {
  walletRemoveExpensesAction,
  walletEditExpensesAction, walletGetIdToEditAction,
} from '../actions/index';
import './Table.css';

class Table extends React.Component {
  deleteTable = (id) => {
    const { walletExpensesDispatch, expenses } = this.props;
    const filter = expenses.filter((element) => element.id !== id);
    walletExpensesDispatch(filter);
  }

  editTableAndGetId = (id) => {
    const { walletIsEditDispatch,
      walletGetIdToEditDispatch,
      expenses } = this.props;
    const elementToEdit = expenses.find((element) => element.id === id);

    walletIsEditDispatch(true);
    walletGetIdToEditDispatch(elementToEdit.id);
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
                  className="edit-btn"
                  data-testid="edit-btn"
                  type="button"
                  onClick={ () => this.editTableAndGetId(expense.id) }
                >
                  <BsPencilSquare />

                </button>
                <button
                  className="delete-btn"
                  data-testid="delete-btn"
                  type="button"
                  onClick={ () => this.deleteTable(expense.id) }
                >
                  <MdDelete />

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
  walletIsEditDispatch: (value) => dispatch(walletEditExpensesAction(value)),
  walletGetIdToEditDispatch: (value) => dispatch(walletGetIdToEditAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = ({
  expenses: propTypes.arrayOf(propTypes.object),
}).isRequired;
