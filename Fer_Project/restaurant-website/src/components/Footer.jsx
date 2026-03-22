import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>🍽️ Nhà Hàng Việt</h3>
          <p>
            Mang đến trải nghiệm ẩm thực Việt Nam đích thực với những món ăn
            được chế biến từ nguyên liệu tươi ngon nhất.
          </p>
        </div>

        <div className="footer-section">
          <h3>Liên kết nhanh</h3>
          <ul>
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/menu">Thực đơn</Link></li>
            <li><Link to="/reservation">Đặt bàn</Link></li>
            <li><Link to="/contact">Liên hệ</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Giờ mở cửa</h3>
          <p>Thứ 2 - Thứ 6: 10:00 - 22:00</p>
          <p>Thứ 7 - Chủ Nhật: 09:00 - 23:00</p>
        </div>

        <div className="footer-section">
          <h3>Liên hệ</h3>
          <p>📍 123 Nguyễn Huệ, Q.1, TP.HCM</p>
          <p>📞 (028) 1234 5678</p>
          <p>✉️ info@nhahangviet.vn</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Nhà Hàng Việt. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
