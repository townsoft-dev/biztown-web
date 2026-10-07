export function DeleteAccountContent() {
  return (
    <>
      <h1>Yêu cầu xoá tài khoản và dữ liệu</h1>
      <div className="meta">
        <div>
          <strong>Ứng dụng:</strong> BizTown Rent Manager
        </div>
        <div>
          <strong>Đơn vị cung cấp:</strong> Công ty Townsoft Vina
        </div>
      </div>
      <h2>Cách 1 — Xoá ngay trong ứng dụng (nhanh nhất)</h2>
      <p>Bạn tự xoá được, không cần chờ ai duyệt:</p>
      <ol className="steps">
        <li>
          Mở ứng dụng <strong>BizTown Rent Manager</strong> và đăng nhập.
        </li>
        <li>
          Vào tab <strong>Hồ sơ</strong> (biểu tượng người, góc dưới bên phải).
        </li>
        <li>
          Kéo xuống cuối, chọn <strong>Xoá tài khoản</strong>.
        </li>
        <li>
          Nhập <strong>mật khẩu</strong> của bạn để xác nhận.
        </li>
        <li>
          Bấm <strong>Xoá tài khoản của tôi</strong>, rồi xác nhận lần cuối ở hộp thoại.
        </li>
      </ol>
      <p>Tài khoản và dữ liệu bị xoá ngay lập tức.</p>
      <h2>Cách 2 — Gửi yêu cầu qua email</h2>
      <p>Nếu bạn không còn mở được ứng dụng (mất máy, quên mật khẩu, đã gỡ app):</p>
      <ul>
        <li>
          Gửi email tới{" "}
          <a href="mailto:dreamnguyen@townsoftvina.com?subject=Y%C3%AAu%20c%E1%BA%A7u%20xo%C3%A1%20t%C3%A0i%20kho%E1%BA%A3n">
            dreamnguyen@townsoftvina.com
          </a>
        </li>
        <li>
          Tiêu đề: <strong>Yêu cầu xoá tài khoản</strong>
        </li>
        <li>
          Trong thư ghi <strong>số điện thoại của tài khoản</strong> cần xoá.
        </li>
      </ul>
      <p>
        Chúng tôi phản hồi trong vòng <strong>72 giờ</strong> và hoàn tất trong vòng{" "}
        <strong>30 ngày</strong>. Để bảo vệ bạn, chúng tôi xác minh danh tính trước khi xoá — thường
        bằng cách gửi mã xác thực tới chính số điện thoại của tài khoản đó.
      </p>
      <h2>Dữ liệu nào bị xoá</h2>
      <p>
        Khi tài khoản bị xoá, những dữ liệu sau bị <strong>xoá vĩnh viễn</strong>:
      </p>
      <ul>
        <li>Hồ sơ tài khoản: họ tên, số điện thoại, email, số CCCD/CMND, ảnh đại diện.</li>
        <li>
          Toàn bộ <strong>nhà/dãy trọ</strong> bạn là chủ sở hữu duy nhất, kèm ảnh.
        </li>
        <li>
          <strong>Phòng</strong> thuộc các nhà đó, kèm ảnh.
        </li>
        <li>
          Hồ sơ <strong>người thuê</strong>: họ tên, số điện thoại, ngày sinh, email, số CCCD/CMND
          và <strong>ảnh giấy tờ tuỳ thân</strong>.
        </li>
        <li>
          <strong>Hợp đồng</strong> và mọi phiên bản điều khoản.
        </li>
        <li>
          <strong>Chỉ số điện, nước</strong> đã ghi.
        </li>
        <li>
          <strong>Hoá đơn</strong> đã tạo, đã gửi hoặc đã thu.
        </li>
        <li>Thông tin tài khoản ngân hàng nhận tiền.</li>
        <li>Mã thiết bị nhận thông báo đẩy và các thông báo trong ứng dụng.</li>
        <li>Tài khoản đăng nhập — sau khi xoá, số điện thoại đó không đăng nhập được nữa.</li>
      </ul>
      <h2>Dữ liệu nào KHÔNG bị xoá</h2>
      <ul>
        <li>
          <strong>Nhà bạn chỉ được giao làm Quản lý</strong> (không phải chủ sở hữu) vẫn giữ nguyên.
          Chỉ quyền truy cập của bạn bị gỡ bỏ. Dữ liệu đó thuộc về chủ nhà, chúng tôi không được
          phép xoá thay họ.
        </li>
        <li>
          <strong>Nhà có nhiều chủ sở hữu</strong>: nếu còn chủ sở hữu khác, nhà và dữ liệu bên
          trong được giữ lại cho người còn lại; chỉ quyền của bạn bị gỡ.
        </li>
      </ul>
      <h2>Dữ liệu giữ lại thêm một thời gian</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Loại</th>
              <th>Thời gian lưu</th>
              <th>Lý do</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bản sao lưu dự phòng của hệ thống</td>
              <td>
                tối đa <strong>90 ngày</strong>
              </td>
              <td>Khôi phục sự cố; bản sao cũ tự hết hạn rồi bị xoá</td>
            </tr>
            <tr>
              <td>Nhật ký kỹ thuật (thời điểm truy cập, mã lỗi)</td>
              <td>
                tối đa <strong>12 tháng</strong>
              </td>
              <td>Bảo mật, phát hiện truy cập bất thường</td>
            </tr>
            <tr>
              <td>Chứng từ bắt buộc lưu theo pháp luật</td>
              <td>theo thời hạn luật định</td>
              <td>Nghĩa vụ thuế, kế toán</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Sau các mốc trên, dữ liệu bị xoá tự động. Trong thời gian này dữ liệu không được dùng cho
        bất kỳ mục đích nào khác.
      </p>
      <div className="callout">
        <p>
          <strong>Xoá tài khoản là thao tác không thể hoàn tác.</strong> Dữ liệu đã xoá không khôi
          phục lại được, kể cả khi bạn đăng ký lại bằng chính số điện thoại đó.
        </p>
      </div>
      <div className="note">
        <p>
          Nếu bạn là <strong>người thuê nhà</strong>: bạn không có tài khoản trong ứng dụng này.
          Thông tin của bạn do <strong>chủ nhà</strong> nhập và quản lý — vui lòng liên hệ trực tiếp
          chủ nhà để yêu cầu sửa hoặc xoá. Bạn cũng có thể viết cho chúng tôi, chúng tôi sẽ chuyển
          yêu cầu tới chủ nhà tương ứng.
        </p>
      </div>
      <h2>Liên hệ</h2>
      <p>
        Công ty Townsoft Vina —{" "}
        <a href="mailto:dreamnguyen@townsoftvina.com">dreamnguyen@townsoftvina.com</a>
        <br /> Xem thêm <a href="/privacy">Chính sách quyền riêng tư</a>.
      </p>
    </>
  );
}
