import { useState, useEffect } from 'react';
import './Reservation.css';

function Reservation({ showModal }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    note: '',
  });

  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu bàn từ json-server
  const fetchTables = async () => {
    try {
      const res = await fetch('http://localhost:5000/tables');
      if (res.ok) {
        const data = await res.json();
        setTables(data);
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách bàn:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.time) {
      showModal('Lỗi', 'Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }

    if (!selectedTable) {
      showModal('Lỗi', 'Vui lòng chọn 1 bàn còn trống trên sơ đồ!');
      return;
    }

    const tableInfo = tables.find(t => t.id === selectedTable);

    const newReservation = {
      ...form,
      tableId: selectedTable,
      tableName: tableInfo.name,
      createdAt: new Date().toLocaleString('vi-VN'),
    };

    try {
      // Lưu thông tin đặt bàn
      await fetch('http://localhost:5000/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReservation),
      });

      // Cập nhật trạng thái bàn thành 'booked'
      await fetch(`http://localhost:5000/tables/${selectedTable}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'booked' }),
      });

      showModal(
        '🎉 Đặt bàn thành công!',
        `Cảm ơn ${form.name}! Bạn đã đặt ${tableInfo.name} vào ${form.date} lúc ${form.time}.`
      );

      setForm({ name: '', phone: '', date: '', time: '', note: '' });
      setSelectedTable(null);
      fetchTables(); // Tải lại sơ đồ bàn
    } catch (error) {
      showModal('Lỗi', 'Có lỗi xảy ra khi kết nối server!');
    }
  };

  return (
    <div className="reservation-page">
      <div className="page-header">
        <h1>Đặt Bàn</h1>
        <p>Đặt bàn trước để có trải nghiệm tốt nhất</p>
      </div>

      <div className="container">
        <div className="reservation-layout">
          
          <div className="reservation-main">
            {/* Table Map */}
            <div className="table-map-section">
              <h3>Sơ đồ bàn</h3>
              <div className="table-legend">
                <div className="legend-item">
                  <span className="table-box table-available"></span> Còn trống
                </div>
                <div className="legend-item">
                  <span className="table-box table-booked"></span> Đã đặt
                </div>
                <div className="legend-item">
                  <span className="table-box table-selected"></span> Đang chọn
                </div>
              </div>

              {loading ? (
                <p>Đang tải sơ đồ bàn...</p>
              ) : (
                <div className="table-grid">
                  {tables.map(table => (
                    <div 
                      key={table.id}
                      className={`table-node ${table.status === 'booked' ? 'booked' : 'available'} ${selectedTable === table.id ? 'selected' : ''}`}
                      onClick={() => {
                        if (table.status === 'available') {
                          setSelectedTable(selectedTable === table.id ? null : table.id);
                        }
                      }}
                    >
                      <div className="table-name">{table.name}</div>
                      <div className="table-cap">🪑 {table.capacity}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form Đặt Bàn */}
            <form className="reservation-form" onSubmit={handleSubmit}>
              <h3>Thông tin đặt bàn</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Họ và tên *</label>
                  <input type="text" id="name" name="name" value={form.name} onChange={handleChange} placeholder="Nhập họ tên" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại *</label>
                  <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="Nhập SĐT" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Ngày *</label>
                  <input type="date" id="date" name="date" value={form.date} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="time">Giờ *</label>
                  <input type="time" id="time" name="time" value={form.time} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="note">Ghi chú</label>
                <textarea id="note" name="note" value={form.note} onChange={handleChange} placeholder="Yêu cầu đặc biệt..." rows="3"></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={!selectedTable}>
                {selectedTable ? 'Hoàn tất Đặt Bàn' : 'Vui lòng chọn bàn'}
              </button>
            </form>
          </div>

          {/* Sidebar */}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
