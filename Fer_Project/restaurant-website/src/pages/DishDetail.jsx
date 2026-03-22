import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dishes } from '../data/dishes';
import './DishDetail.css';

function DishDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  // Tìm món ăn theo id
  const dish = dishes.find((d) => d.id === parseInt(id));

  if (!dish) {
    return (
      <div className="dish-detail-page">
        <div className="container">
          <div className="not-found-dish">
            <h2>Không tìm thấy món ăn</h2>
            <button className="btn btn-primary" onClick={() => navigate('/menu')}>
              Quay lại thực đơn
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(dish, quantity);
    setQuantity(1);
  };

  return (
    <div className="dish-detail-page">
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Quay lại
        </button>

        <div className="dish-detail-grid">
          {/* Hình ảnh */}
          <div className="dish-detail-image">
            <img src={dish.image} alt={dish.name} />
          </div>

          {/* Thông tin */}
          <div className="dish-detail-info">
            <h1>{dish.name}</h1>
            <p className="dish-detail-price">
              {dish.price.toLocaleString('vi-VN')}₫
            </p>
            <p className="dish-detail-desc">{dish.description}</p>

            <div className="dish-detail-ingredients">
              <h3>Thành phần:</h3>
              <div className="ingredients-list">
                {dish.ingredients.map((ing, index) => (
                  <span key={index} className="ingredient-tag">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Chọn số lượng */}
            <div className="quantity-selector">
              <label>Số lượng:</label>
              <div className="quantity-controls">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-btn"
                >
                  −
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>
            </div>

            <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
              🛒 Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DishDetail;
