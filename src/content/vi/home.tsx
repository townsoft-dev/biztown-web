export function HomeContent() {
  return (
    <>
      <h1>BizTown Rent Manager</h1>
      <p className="lead">Quản lý nhà trọ và hoá đơn tiền trọ hàng tháng, ngay trên điện thoại.</p>
      <p>
        Ứng dụng dành cho <strong>chủ nhà trọ và người được chủ nhà uỷ quyền quản lý</strong>. Ghi
        chỉ số điện nước, ứng dụng tự tính tiền phòng, tiền điện, tiền nước và các khoản phí theo
        đúng điều khoản hợp đồng, rồi gửi hoá đơn cho người thuê kèm mã QR chuyển khoản.
      </p>
      <p>
        <strong>Người thuê nhà không cần cài ứng dụng</strong> — họ nhận hoá đơn qua SMS, email hoặc
        Zalo.
      </p>
      <h2>Các trang thông tin</h2>
      <ul>
        <li>
          <a href="/support">Hỗ trợ và liên hệ</a>
        </li>
        <li>
          <a href="/privacy">Chính sách quyền riêng tư</a>
        </li>
        <li>
          <a href="/delete-account">Yêu cầu xoá tài khoản và dữ liệu</a>
        </li>
      </ul>
      <h2>Liên hệ</h2>
      <p>
        Công ty Townsoft Vina —{" "}
        <a href="mailto:dreamnguyen@townsoftvina.com">dreamnguyen@townsoftvina.com</a>
      </p>
    </>
  );
}
