import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { userAction } from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  handleInputChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    }, () => this.validate());
  }

  validate = () => {
    const { email, password } = this.state;
    const MIN_CHARACTERS = 6;
    if (
      password.length >= MIN_CHARACTERS
      && email.includes('@')
      && email.includes('.com')
    ) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  handleSubmit = () => {
    const { email } = this.state;
    const { history, userDispatch } = this.props;
    userDispatch(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <section className="body-login-container">
        <div className="login-container">
          <h1 className="logo">TRYBEWALLET</h1>
          <label htmlFor="email">
            email:
            <input
              data-testid="email-input"
              id="email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleInputChange }
            />
          </label>
          <label htmlFor="password">
            senha:
            <input
              data-testid="password-input"
              id="password"
              type="password"
              name="password"
              value={ password }
              onChange={ this.handleInputChange }
            />
          </label>
          <button
            type="submit"
            disabled={ isDisabled }
            onClick={ this.handleSubmit }
          >
            Entrar

          </button>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userDispatch: (value) => dispatch(userAction(value)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = ({
  userDispatch: propTypes.func,
}).isRequired;
