import { useState } from 'react';
import './Contact.css';

function Contact({ showModal }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showModal(
      '✉️ Gửi thành công!',
      `Cảm ơn ${form.name}! Chúng tôi đã nhận được tin nhắn và sẽ phản hồi sớm nhất.`
    );
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>Liên Hệ</h1>
        <p>Chúng tôi luôn sẵn sàng lắng nghe bạn</p>
      </div>

      <div className="container">
        <div className="contact-layout">
          {/* Thông tin liên hệ */}
          <div className="contact-info">
            <div className="contact-card">
              <span className="contact-icon">📍</span>
              <h3>Địa chỉ</h3>
              <p>123 Nguyễn Huệ, Quận 1</p>
              <p>TP. Hồ Chí Minh, Việt Nam</p>
            </div>
            <div className="contact-card">
              <span className="contact-icon">📞</span>
              <h3>Điện thoại</h3>
              <p>(028) 1234 5678</p>
              <p>Hotline: 0901 234 567</p>
            </div>
            <div className="contact-card">
              <span className="contact-icon">✉️</span>
              <h3>Email</h3>
              <p>info@nhahangviet.vn</p>
              <p>booking@nhahangviet.vn</p>
            </div>
            <div className="contact-card">
              <span className="contact-icon">🕐</span>
              <h3>Giờ mở cửa</h3>
              <p>T2 - T6: 10:00 - 22:00</p>
              <p>T7 - CN: 09:00 - 23:00</p>
            </div>
          </div>

          {/* Form liên hệ */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Gửi tin nhắn cho chúng tôi</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Họ và tên</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Tên của bạn"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Tiêu đề</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Tiêu đề tin nhắn"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Nội dung</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Viết tin nhắn của bạn..."
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-lg">
              Gửi tin nhắn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
