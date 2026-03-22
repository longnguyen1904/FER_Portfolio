import { Link } from 'react-router-dom';
import './Cart.css';

function Cart({ cart, updateQuantity, removeFromCart }) {
  // Tính tổng tiền
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="page-header">
          <h1>Giỏ Hàng</h1>
        </div>
        <div className="container">
          <div className="empty-cart">
            <span className="empty-cart-icon">🛒</span>
            <h2>Giỏ hàng trống</h2>
            <p>Bạn chưa thêm món ăn nào vào giỏ hàng.</p>
            <Link to="/menu" className="btn btn-primary">
              Xem thực đơn
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="page-header">
        <h1>Giỏ Hàng</h1>
        <p>Có {cart.length} món trong giỏ hàng</p>
      </div>

      <div className="container">
        <div className="cart-layout">
          {/* Danh sách món */}
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">
                    {item.price.toLocaleString('vi-VN')}₫
                  </p>
                </div>
                <div className="cart-item-quantity">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-subtotal">
                  {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                  title="Xóa"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Tổng tiền */}
          <div className="cart-summary">
            <h3>Tóm tắt đơn hàng</h3>
            <div className="summary-row">
              <span>Tạm tính:</span>
              <span>{total.toLocaleString('vi-VN')}₫</span>
            </div>
            <div className="summary-row">
              <span>Phí giao hàng:</span>
              <span>Miễn phí</span>
            </div>
            <div className="summary-row total">
              <span>Tổng cộng:</span>
              <span>{total.toLocaleString('vi-VN')}₫</span>
            </div>
            <Link to="/checkout" className="btn btn-primary btn-lg btn-block">
              Thanh toán
            </Link>
            <Link to="/menu" className="btn btn-outline btn-block">
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
