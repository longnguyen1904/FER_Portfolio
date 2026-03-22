import { Link } from 'react-router-dom';
import { featuredDishes } from '../data/dishes';
import './Home.css';

function Home() {
  return (
    <div className="home">
      {/* Banner */}
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Nhà Hàng Việt</h1>
            <p className="hero-subtitle">
              Trải nghiệm ẩm thực Việt Nam đích thực
            </p>
            <p className="hero-desc">
              Từ những món phở thơm lừng đến bún chả hấp dẫn, mỗi món ăn đều
              được chế biến từ nguyên liệu tươi ngon nhất.
            </p>
            <div className="hero-buttons">
              <Link to="/menu" className="btn btn-primary">
                Xem thực đơn
              </Link>
              <Link to="/reservation" className="btn btn-outline">
                Đặt bàn ngay
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Giới thiệu */}
      <section className="about-section">
        <div className="container">
          <h2 className="section-title">Về Chúng Tôi</h2>
          <div className="about-grid">
            <div className="about-card">
              <span className="about-icon">🍜</span>
              <h3>Ẩm thực đích thực</h3>
              <p>
                Các món ăn được chế biến theo công thức truyền thống, giữ trọn
                hương vị Việt Nam.
              </p>
            </div>
            <div className="about-card">
              <span className="about-icon">🥬</span>
              <h3>Nguyên liệu tươi</h3>
              <p>
                100% nguyên liệu tươi sạch, được chọn lọc kỹ càng từ các nhà
                cung cấp uy tín.
              </p>
            </div>
            <div className="about-card">
              <span className="about-icon">👨‍🍳</span>
              <h3>Đầu bếp tài năng</h3>
              <p>
                Đội ngũ đầu bếp giàu kinh nghiệm, tâm huyết với từng món ăn
                phục vụ quý khách.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Món nổi bật */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Món Ăn Nổi Bật</h2>
          <div className="featured-grid">
            {featuredDishes.map((dish) => (
              <div key={dish.id} className="featured-card">
                <div className="featured-img-wrapper">
                  <img src={dish.image} alt={dish.name} />
                  <span className="featured-badge">⭐ Nổi bật</span>
                </div>
                <div className="featured-info">
                  <h3>{dish.name}</h3>
                  <p>{dish.description}</p>
                  <div className="featured-bottom">
                    <span className="featured-price">
                      {dish.price.toLocaleString('vi-VN')}₫
                    </span>
                    <Link to={`/dish/${dish.id}`} className="btn btn-sm">
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Sẵn sàng thưởng thức?</h2>
          <p>Đặt bàn ngay hôm nay để trải nghiệm ẩm thực tuyệt vời!</p>
          <Link to="/reservation" className="btn btn-primary btn-lg">
            Đặt bàn ngay
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
