import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { currenciesDispach } = this.props;
    currenciesDispach(fetchCurrencies());
  }

  render() {
    return (
      <div>
        <Header />
        TrybeWallet
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currenciesDispach: () => dispatch(fetchCurrencies()),
});
export default connect(null, mapDispatchToProps)(Wallet);

Wallet.propTypes = ({
  currenciesDispach: propTypes.func,
}).isRequired;
