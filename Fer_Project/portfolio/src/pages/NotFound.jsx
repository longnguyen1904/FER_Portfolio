import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <span className="not-found-icon">🍽️</span>
        <h1>404</h1>
        <h2>Trang không tìm thấy</h2>
        <p>Xin lỗi, trang bạn tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
        <Link to="/" className="btn btn-primary btn-lg">
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
