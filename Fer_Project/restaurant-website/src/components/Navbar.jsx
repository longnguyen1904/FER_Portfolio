import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar({ cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">🍽️</span>
          <span className="logo-text">Nhà Hàng Việt</span>
        </Link>

        {/* Nút hamburger cho mobile */}
        <button
          className={`navbar-toggle ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menu chính */}
        <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <li>
            <NavLink to="/" onClick={closeMenu} end>
              Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu" onClick={closeMenu}>
              Thực đơn
            </NavLink>
          </li>
          <li>
            <NavLink to="/reservation" onClick={closeMenu}>
              Đặt bàn
            </NavLink>
          </li>
          <li>
            <NavLink to="/reviews" onClick={closeMenu}>
              Đánh giá
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={closeMenu}>
              Liên hệ
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className="cart-link" onClick={closeMenu}>
              🛒 Giỏ hàng
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
