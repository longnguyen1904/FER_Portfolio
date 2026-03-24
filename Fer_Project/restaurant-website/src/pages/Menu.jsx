import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

function Menu({ addToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu từ database.json qua json-server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, dishRes] = await Promise.all([
          fetch('http://localhost:5000/categories'),
          fetch('http://localhost:5000/dishes')
        ]);
        
        if (catRes.ok && dishRes.ok) {
          const catData = await catRes.json();
          const dishData = await dishRes.json();
          setCategories(catData);
          setDishes(dishData);
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu thực đơn:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

        {loading ? (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>Đang tải thực đơn từ máy chủ...</p>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

export default Menu;
