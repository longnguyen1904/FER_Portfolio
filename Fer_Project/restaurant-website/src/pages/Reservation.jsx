import { useState } from 'react';
import './Reservation.css';

function Reservation({ showModal }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    note: '',
  });

  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem('restaurant-reservations');
    return saved ? JSON.parse(saved) : [];
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.time) {
      showModal('Lỗi', 'Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }

    const newReservation = {
      ...form,
      id: Date.now(),
      createdAt: new Date().toLocaleString('vi-VN'),
    };

    const updated = [...reservations, newReservation];
    setReservations(updated);
    localStorage.setItem('restaurant-reservations', JSON.stringify(updated));

    showModal(
      '🎉 Đặt bàn thành công!',
      `Cảm ơn ${form.name}! Bàn đã được đặt cho ${form.guests} người vào ${form.date} lúc ${form.time}.`
    );

    setForm({ name: '', phone: '', date: '', time: '', guests: '2', note: '' });
  };

  return (
    <div className="reservation-page">
      <div className="page-header">
        <h1>Đặt Bàn</h1>
        <p>Đặt bàn trước để có trải nghiệm tốt nhất</p>
      </div>

      <div className="container">
        <div className="reservation-layout">
          <form className="reservation-form" onSubmit={handleSubmit}>
            <h3>Thông tin đặt bàn</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Họ và tên *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nhập họ tên"
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
                  placeholder="Nhập SĐT"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Ngày *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="time">Giờ *</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="guests">Số người</label>
              <select
                id="guests"
                name="guests"
                value={form.guests}
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>
                    {n} người
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="note">Ghi chú</label>
              <textarea
                id="note"
                name="note"
                value={form.note}
                onChange={handleChange}
                placeholder="Yêu cầu đặc biệt, dị ứng..."
                rows="3"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-lg btn-block">
              Đặt bàn
            </button>
          </form>

          {/* Thông tin bổ sung */}
          <div className="reservation-info">
            <div className="info-card">
              <h3>📍 Địa chỉ</h3>
              <p>123 Nguyễn Huệ, Quận 1, TP.HCM</p>
            </div>
            <div className="info-card">
              <h3>🕐 Giờ phục vụ</h3>
              <p>Thứ 2 - Thứ 6: 10:00 - 22:00</p>
              <p>Thứ 7 - CN: 09:00 - 23:00</p>
            </div>
            <div className="info-card">
              <h3>📞 Hotline</h3>
              <p>(028) 1234 5678</p>
            </div>
            <div className="info-card">
              <h3>💡 Lưu ý</h3>
              <p>Vui lòng đặt bàn trước ít nhất 2 tiếng.</p>
              <p>Bàn sẽ được giữ trong vòng 15 phút.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
