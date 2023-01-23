import { Link } from 'react-router-dom';
import logoPath from '../images/logo.svg';

function Header({ link, linkName, userEmail, onClick }) {
  return (
    <header className="header">
      <img className="logo" src={logoPath} alt="Логотип Место Россия" />
      <div className="header__wrap">
        {userEmail && <span className="header__user-email">{userEmail}</span>}
        <Link to={link} className="header__link" onClick={onClick}>{linkName}</Link>
      </div>
    </header>
  );
}

export default Header;