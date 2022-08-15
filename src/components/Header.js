import logoPath from '../images/Logo_header.svg';

export default function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Лого хедера" />
    </header>
  );
}