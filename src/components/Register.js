import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Register({ onRegister, valid, submitButton, title, setValid }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [validTextEmail, setValidTextEmail] = useState('');
  const [validTextPassword, setValidTextPassword] = useState('');

  const loginSubmitButtonClassName = !validityForm() ? "login__submit-button login__submit-button_disabled" : "login__submit-button"

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
    setIsValidEmail(evt.target.validity.valid);
    setValidTextEmail(evt.target.validationMessage);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
    setIsValidPassword(evt.target.validity.valid);
    setValidTextPassword(evt.target.validationMessage);
    setValid();
  }

  function validityForm() {
    return valid && isValidEmail && isValidPassword;
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({ password, email });
    setEmail('');
    setPassword('');
  }

  useEffect(() => {
    // offValid();
  }, [])

  return (
    <main className="content">
      <section className="login">
        <h2 className="login__title">{title}</h2>
        <form
          className="login__form"
          onSubmit={handleSubmit}
          noValidate>
          <input
            type="email"
            value={email || ""}
            className="login__input"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleChangeEmail}
            required />
          <span className="login__input-error">{validTextEmail}</span>
          <input
            type="password"
            value={password || ""}
            className="login__input"
            name="password"
            id="password"
            minLength="8"
            placeholder="Пароль"
            onChange={handleChangePassword}
            required />
          <span className="login__input-error">{validTextPassword}</span>
          <button
            className={loginSubmitButtonClassName}
            type="submit"
            disabled={!validityForm()}>{submitButton}
          </button>
          <p className="login__check">Уже зарегестрированы?
            <Link className='login__link' to="/sing-in"> Войти</Link>
          </p>
        </form>
      </section>
    </main>
  );
}