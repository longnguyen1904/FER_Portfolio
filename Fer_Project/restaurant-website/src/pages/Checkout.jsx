import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

function Checkout({ cart, clearCart, showModal }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'cash',
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      showModal('Lỗi', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }
    // Giả lập đặt hàng thành công
    showModal(
      '🎉 Đặt hàng thành công!',
      `Cảm ơn ${form.name}! Đơn hàng của bạn đã được xác nhận.\nPhương thức thanh toán: ${form.paymentMethod === 'cash' ? 'Tiền mặt' : 'Chuyển khoản'}\nTổng tiền: ${total.toLocaleString('vi-VN')}₫`
    );
    clearCart();
    setTimeout(() => navigate('/'), 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="page-header">
          <h1>Thanh Toán</h1>
        </div>
        <div className="container">
          <div className="empty-cart">
            <h2>Giỏ hàng trống</h2>
            <p>Vui lòng thêm món ăn vào giỏ hàng trước khi thanh toán.</p>
            <button className="btn btn-primary" onClick={() => navigate('/menu')}>
              Xem thực đơn
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="page-header">
        <h1>Thanh Toán</h1>
        <p>Hoàn tất đơn hàng của bạn</p>
      </div>

      <div className="container">
        <div className="checkout-layout">
          {/* Form thanh toán */}
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h3>Thông tin giao hàng</h3>

            <div className="form-group">
              <label htmlFor="name">Họ và tên *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nhập họ và tên"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Số điện thoại *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Địa chỉ giao hàng *</label>
              <textarea
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Nhập địa chỉ giao hàng"
                rows="3"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Phương thức thanh toán</label>
              <div className="payment-methods">
                <label className={`payment-option ${form.paymentMethod === 'cash' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={form.paymentMethod === 'cash'}
                    onChange={handleChange}
                  />
                  <span className="payment-icon">💵</span>
                  <span>Tiền mặt</span>
                </label>
                <label className={`payment-option ${form.paymentMethod === 'transfer' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="transfer"
                    checked={form.paymentMethod === 'transfer'}
                    onChange={handleChange}
                  />
                  <span className="payment-icon">🏦</span>
                  <span>Chuyển khoản</span>
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg btn-block">
              Xác nhận đặt hàng
            </button>
          </form>

          {/* Tóm tắt đơn hàng */}
          <div className="order-summary">
            <h3>Đơn hàng của bạn</h3>
            <div className="order-items">
              {cart.map((item) => (
                <div key={item.id} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div className="order-item-info">
                    <p className="order-item-name">{item.name}</p>
                    <p className="order-item-qty">x{item.quantity}</p>
                  </div>
                  <p className="order-item-price">
                    {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                  </p>
                </div>
              ))}
            </div>
            <div className="order-total">
              <span>Tổng cộng:</span>
              <span>{total.toLocaleString('vi-VN')}₫</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
