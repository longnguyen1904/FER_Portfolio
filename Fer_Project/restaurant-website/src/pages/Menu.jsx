import { useState } from 'react';
import { Link } from 'react-router-dom';
import { dishes, categories } from '../data/dishes';
import './Menu.css';

function Menu({ addToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Lọc món ăn theo danh mục và tìm kiếm
  const filteredDishes = dishes.filter((dish) => {
    const matchCategory =
      activeCategory === 'all' || dish.category === activeCategory;
    const matchSearch = dish.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="menu-page">
      <div className="page-header">
        <h1>Thực Đơn</h1>
        <p>Khám phá các món ăn ngon nhất của chúng tôi</p>
      </div>

      <div className="container">
        {/* Thanh tìm kiếm */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm món ăn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Bộ lọc danh mục */}
        <div className="category-filter">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Danh sách món ăn */}
        {filteredDishes.length === 0 ? (
          <div className="no-results">
            <p>Không tìm thấy món ăn nào phù hợp 😢</p>
          </div>
        ) : (
          <div className="dishes-grid">
            {filteredDishes.map((dish) => (
              <div key={dish.id} className="dish-card">
                <div className="dish-img-wrapper">
                  <img src={dish.image} alt={dish.name} />
                </div>
                <div className="dish-info">
                  <span className="dish-category">
                    {categories.find((c) => c.id === dish.category)?.name}
                  </span>
                  <h3>{dish.name}</h3>
                  <p className="dish-desc">{dish.description}</p>
                  <div className="dish-bottom">
                    <span className="dish-price">
                      {dish.price.toLocaleString('vi-VN')}₫
                    </span>
                    <div className="dish-actions">
                      <Link to={`/dish/${dish.id}`} className="btn btn-sm btn-outline">
                        Chi tiết
                      </Link>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => addToCart(dish)}
                      >
                        + Giỏ hàng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
