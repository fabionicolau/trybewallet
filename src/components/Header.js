import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { expenses, email } = this.props;
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">
          {expenses.length > 0
            ? `Despesa total: ${expenses.reduce((acc, valorAtual) => acc + valorAtual)}`
            : 'Despesa total: 0'}
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = ({
  expenses: propTypes.arrayOf(propTypes.object),
  email: propTypes.string,
}).isRequired;