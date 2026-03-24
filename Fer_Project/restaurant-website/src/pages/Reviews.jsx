import { useState, useEffect } from 'react';
import './Reviews.css';

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: '', rating: 5, content: '' });
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu đánh giá từ json-server
  const fetchReviews = async () => {
    try {
      const res = await fetch('http://localhost:5000/reviews?_sort=date&_order=desc');
      if (res.ok) {
        const data = await res.json();
        // Sắp xếp JSON-Server trả về có thể khác ở các phiên bản, nên reverse thử cho chắc (mới nhất lên đầu)
        setReviews(data.reverse());
      }
    } catch (error) {
      console.error('Lỗi khi tải đánh giá:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.content) return;

    const newReview = {
      id: Date.now().toString(),
      name: form.name,
      rating: parseInt(form.rating),
      content: form.content,
      date: new Date().toISOString().split('T')[0],
    };

    try {
      // Lưu đánh giá mới vào JSON-Server
      await fetch('http://localhost:5000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      // Thêm ngay lập tức trên UI để user thấy
      setReviews([newReview, ...reviews]);
      setForm({ name: '', rating: 5, content: '' });
    } catch (error) {
      console.error('Lỗi khi gửi đánh giá:', error);
      alert('Không thể gửi đánh giá. Hãy chắc chắn json-server đang chạy!');
    }
  };

  // Render sao
  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  // Tính trung bình sao
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="reviews-page">
      <div className="page-header">
        <h1>Đánh Giá</h1>
        <p>Khách hàng nói gì về chúng tôi</p>
      </div>

      <div className="container">
        {/* Thống kê */}
        <div className="reviews-stats">
          <div className="stats-overall">
            <span className="stats-number">{avgRating}</span>
            <span className="stats-stars">{renderStars(Math.round(avgRating || 0))}</span>
            <span className="stats-count">{reviews.length} đánh giá</span>
          </div>
        </div>

        <div className="reviews-layout">
          {/* Danh sách đánh giá */}
          <div className="reviews-list">
            {loading ? (
              <p>Đang tải dữ liệu đánh giá từ server...</p>
            ) : reviews.length === 0 ? (
              <p>Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="review-avatar">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="review-meta">
                      <h4>{review.name}</h4>
                      <span className="review-date">{review.date}</span>
                    </div>
                    <div className="review-rating">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="review-content">{review.content}</p>
                </div>
              ))
            )}
          </div>

          {/* Form thêm đánh giá */}
          <div className="review-form-container">
            <form className="review-form" onSubmit={handleSubmit}>
              <h3>Viết đánh giá</h3>

              <div className="form-group">
                <label htmlFor="name">Tên của bạn</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nhập tên"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="rating">Đánh giá</label>
                <select id="rating" name="rating" value={form.rating} onChange={handleChange}>
                  <option value="5">⭐⭐⭐⭐⭐ Xuất sắc</option>
                  <option value="4">⭐⭐⭐⭐ Tốt</option>
                  <option value="3">⭐⭐⭐ Bình thường</option>
                  <option value="2">⭐⭐ Tệ</option>
                  <option value="1">⭐ Rất tệ</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="content">Nội dung</label>
                <textarea
                  id="content"
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Chia sẻ trải nghiệm của bạn..."
                  rows="4"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-lg btn-block">
                Gửi đánh giá
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
