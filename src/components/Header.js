import logoPath from '../images/Logo_header.svg';
import { Route, Link, Switch } from 'react-router-dom';

export default function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Лого хедера" />
      <Switch>
        <Route path="/sign-in">
          <Link className='header__link' to="/sing-up">Регистрация</Link>
        </Route>
        <Route path='/sign-up'>
          <Link className='header__link' to='/sing-in'>Войти</Link>
        </Route>
        <Route path="/">
          <div className='header__nav'>
            <p className='header__email'>{email}</p>
            <button className='header__button' onClick={onSignOut}>Выйти</button>
          </div>
        </Route>
      </Switch>
    </header>
  );
}