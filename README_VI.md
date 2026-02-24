<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![GNU GPL v3][license-shield]][license-url]

<h1 align="center">
  <img src="src/images/banners/banner.png" alt="TubeTuner Banner" /><br/>
  TubeTuner
</h1>

<h4 align="center">
  <a href="README.md">English</a> |
  <a href="README_VI.md">Tiếng Việt</a>
</h4>

<h3 align="center">Tùy chỉnh giao diện YouTube để loại bỏ các yếu tố gây xao nhãng và tạo trải nghiệm xem tập trung, cá nhân hóa</h3>

<p align="center">
  <a href="https://github.com/PhanKydeptrai/TubeTuner"><strong>Khám phá tài liệu »</strong></a>
  <br /><br />
  <a href="https://github.com/PhanKydeptrai/TubeTuner">Xem Demo</a>
  ·
  <a href="https://github.com/PhanKydeptrai/TubeTuner/issues/new?labels=bug&template=bug-report---.md">Báo Lỗi</a>
  ·
  <a href="https://github.com/PhanKydeptrai/TubeTuner/issues/new?labels=enhancement&template=feature-request---.md">Yêu Cầu Tính Năng</a>
</p>

---

## Mục lục

1. [Về dự án](#về-dự-án)
   - [Xây dựng với](#xây-dựng-với)
2. [Bắt đầu](#bắt-đầu)
   - [Cài đặt](#cài-đặt)
3. [Tải Tiện Ích Này](#tải-tiện-ích-này)
4. [Sử dụng](#sử-dụng)
5. [Đóng góp](#đóng-góp)
6. [Giấy phép](#giấy-phép)
7. [Liên hệ](#liên-hệ)

---

## Về dự án

TubeTuner là một tiện ích mở rộng cho Chrome/Firefox cho phép bạn tùy chỉnh giao diện YouTube theo sở thích của mình. Ẩn các yếu tố gây xao nhãng và tập trung vào nội dung video với 19 tùy chọn ẩn/hiện khác nhau, cộng với các tính năng tiện ích như danh sách thiết lập sẵn (presets) và xuất/nhập (export/import) để sao lưu.

### Có gì mới trong v1.2.8
- **Thay Đổi Cơ Chế Lưu Trữ** — Tăng cường dung lượng và hiệu suất bằng cách chuyển đổi lưu trữ của tiện ích từ `sync` sang `local`.
- **Hỗ Trợ Biến Môi Trường** — Cải thiện trải nghiệm của nhà phát triển với việc thêm cấu hình `.env` cho các API endpoints.
- **Quản Lý Thanh Bên Thống Nhất** — "Ẩn Thanh Bên Video" giờ đây hoạt động như một điều khiển chính, tự động quản lý sự hiển thị của Trò Chuyện Trực Tiếp (Live Chat), Đề Xuất Video, và Danh Sách Phát.
- **Phân Cấp Trực Quan Rõ Ràng** — Cải thiện giao diện (UI) với việc nhóm các tính năng và thụt lề để hiển thị rõ mối quan hệ giữa tùy chọn thanh bên và các thành phần bên trong nó.

### Tính Năng

**Điều Khiển Nội Dung & Bảng Tin**
- Ẩn Bảng Tin Màn Hình Chính (Home Feed) — Tránh xao nhãng từ trang chủ YouTube
- Ẩn Thanh Bên Video (Video Sidebar) — Ẩn toàn bộ thanh bên của video (bao gồm trò chuyện trực tiếp, đề xuất và danh sách phát)
  - Ẩn Trò Chuyện Trực Tiếp (Live Chat) — Điều khiển riêng biệt hiển thị trò chuyện trực tiếp
  - Ẩn Đề Xuất Video (Video Suggestions) — Điều khiển riêng biệt hiển thị đề xuất video
  - Ẩn Danh Sách Phát (Playlist) — Điều khiển riêng biệt hiển thị bảng danh sách phát
- Ẩn Bình Luận (Comments) — Ẩn phần bình luận của video
- Ẩn Shorts — Ẩn hoàn toàn các video Shorts và mục Shorts
- Ẩn Channel — Ẩn thông tin kênh dưới video

**Yếu Tố Giao Diện**
- Ẩn Tiêu Đề Trên Cùng (Top Header) — Ẩn thanh điều hướng trên cùng
- Ẩn Chuông Thông Báo (Notifications Bell) — Ẩn biểu tượng chuông thông báo
- Ẩn Khám Phá & Thịnh Hành (Explore & Trending) — Ẩn tab Khám phá và Thịnh hành trên thanh bên
- Ẩn Thêm Từ YouTube (More from YouTube) — Ẩn phần "Thêm từ YouTube"
- Ẩn Cửa Hàng (Shop) — Ẩn phần Cửa hàng (Shop) của YouTube
- Ẩn Thanh Nút (Buttons Bar) — Ẩn thanh nút tác vụ dưới video

**Điều Khiển Video**
- Ẩn Thanh Tiến Trình (Progress Bar) — Xóa thanh tiến trình khi xem video
- Ẩn Thời Lượng (Duration) — Ẩn thông tin thời gian hiện tại và tổng thời lượng
- Ẩn Thẻ Màn Hình Cuối (End Screen Cards) — Ẩn các thẻ màn hình xuất hiện ở cuối video
- Ẩn Mô Tả (Description) — Ẩn phần mô tả video

**Các Tính Năng Khác**
- Xuất/Nhập Cài Đặt (Export/Import Settings) — Xuất cài đặt ra một file để sao lưu và nhập lại để khôi phục hoặc chia sẻ cấu hình
- Cài Đặt Sẵn (Presets) — Áp dụng các cài đặt có sẵn (Không, Cân Bằng, Tập Trung) hoặc tạo và lưu cài đặt tùy chỉnh
- Thang Độ Xám (Grayscale) — Áp dụng bộ lọc xám cho toàn bộ giao diện YouTube
- Chế Độ Tối (Dark Mode) — Tự động theo giao diện hệ thống của bạn
- Đa Ngôn Ngữ — Hỗ trợ tiếng Việt và tiếng Anh
- Bật/Tắt Tiện Ích — Bật/tắt nhanh tình trạng bật của tiện ích trực tiếp trên popup

<p align="right">(<a href="#readme-top">quay lại đầu trang</a>)</p>

### Xây dựng với

- [![JavaScript][JavaScript-shield]][JavaScript-url]
- [![HTML5][HTML5-shield]][HTML5-url]
- [![CSS3][CSS3-shield]][CSS3-url]

<p align="right">(<a href="#readme-top">quay lại đầu trang</a>)</p>

---

## Bắt Đầu

Làm theo các bước sau để thiết lập một bản sao cục bộ của tiện ích.

### Cài Lặt

1. **Clone repository:**
   ```sh
   git clone https://github.com/PhanKydeptrai/TubeTuner.git
   ```

2. **Cài đặt các gói phụ thuộc (dependencies):**
   ```sh
   npm install
   ```

3. **Thiết lập biến môi trường:**
   Sao chép tệp biến môi trường mẫu và cập nhật các giá trị nếu cần:
   ```sh
   cp .env.example .env
   ```

4. **Build tiện ích mở rộng:**

   Cho Chrome:
   ```sh
   npm run build:chrome
   ```

   Cho Firefox:
   ```sh
   npm run build:firefox
   ```

5. **Tải lên Chrome:**
   - Mở `chrome://extensions/`
   - Bật **Chế độ dành cho nhà phát triển (Developer mode)** ở góc trên bên phải
   - Nhấp **Tải tiện ích đã giải nén (Load unpacked)**
   - Chọn thư mục `dist/chrome`

6. **Tải lên Firefox:**
   - Mở `about:debugging#/runtime/this-firefox`
   - Nhấp vào **Load Temporary Add-on...**
   - Chọn bất kỳ tệp nào trong thư mục `dist/firefox` (ví dụ: `manifest.json`)

<p align="right">(<a href="#readme-top">quay lại đầu trang</a>)</p>

---

## Tải Tiện Ích Này

| Trình Duyệt | Liên Kết |
|---------|------|
| Chrome  | [Chrome Web Store](https://chromewebstore.google.com/detail/tubetuner/ekllndjjhcpljlfhfblfcagbdjnjkbco) |
| Firefox | [Firefox Add-ons](https://addons.mozilla.org/vi/firefox/addon/tubetuner/) |

<p align="right">(<a href="#readme-top">quay lại đầu trang</a>)</p>

---

## Sử Dụng

1. **Mở YouTube** và bật một video bất kỳ.
2. **Nhấp vào biểu tượng tiện ích** trong thanh công cụ của trình duyệt.
3. **Khám phá 3 phần chính:**
   - **Điều Khiển Nội Dung & Bảng Tin** — Ẩn/hiện Bảng Tin Trang Chủ, Thanh Bên Video (với các nhóm dành cho Trò chuyện trực tiếp, Gợi ý video, Danh sách phát), Bình Luận, Shorts, Channel
   - **Yếu Tố Giao Diện** — Ẩn/hiện Tiêu Đề Trên Cùng, Chuông Thông Báo, Khám Phá & Thịnh Hành, Thêm Từ YouTube, Thanh Nút, Cửa Hàng
   - **Điều Khiển Video** — Ẩn/hiện Thanh Tiến Trình, Thời Lượng, Thẻ Màn Hình Cuối, Mô Tả
4. **Sử dụng các công tắc** để kích hoạt hay vô hiệu hóa từng tính năng riêng biệt.
5. **Chuyển Đổi Giao Diện** — Nhấp vào nút mặt trời/mặt trăng trên cùng để chuyển giữa chế độ Sáng/Tối.
6. **Xuất/Nhập Cài Đặt** — Sử dụng các nút trong phần cài đặt để sao lưu/khôi phục lại cấu hình.
7. **Cài Đặt Sẵn (Presets)** — Chọn một cấu hình có sẵn (Không, Cân Bằng, Tập Trung) để áp dụng nhiều cài đặt cùng lúc.
8. **Cài Đặt Sẵn Tùy Chỉnh** — Cấu hình các công tắc của bạn và nhấp vào "Lưu preset" để tạo một thiết lập có tên riêng. Sử dụng "Nhập preset (.json)" để tải file gốc, hoặc "Xuất preset" để tải nó xuống máy. Nếu bạn muốn xóa, hãy chọn preset đó và nhấp "Xóa preset".

<p align="right">(<a href="#readme-top">quay lại đầu trang</a>)</p>

---

## Đóng Góp

Những đóng góp chính là động lực làm cho cộng đồng mã nguồn mở trở thành một nơi tuyệt vời để học hỏi, truyền cảm hứng và sáng tạo. Bất kỳ đóng góp nào của bạn cũng đều được **trân trọng và đánh giá cao**.

Nếu bạn có một đề xuất nào, vui lòng fork repository và tạo một pull request, hoặc mở một issue với nhãn `enhancement`. Đừng quên ghé ủng hộ dự án một ngôi sao (star) nhé!

1. Fork dự án
2. Tạo nhánh tính năng của bạn (`git checkout -b feature/AmazingFeature`)
3. Commit những đóng góp của bạn (`git commit -m 'Thêm một AmazingFeature'`)
4. Đẩy (Push) lên nhánh của bạn (`git push origin feature/AmazingFeature`)
5. Mở một Pull Request

<p align="right">(<a href="#readme-top">quay lại đầu trang</a>)</p>

---

## Giấy Phép

Phân phối dưới Giấy phép GNU General Public License v3. Xem chi tiết trong file `LICENSE`.

<p align="right">(<a href="#readme-top">quay lại đầu trang</a>)</p>

---

## Liên Hệ

Phan Ky — phanky.dev@proton.me

Liên kết Dự án: [https://github.com/PhanKydeptrai/TubeTuner](https://github.com/PhanKydeptrai/TubeTuner)

<p align="right">(<a href="#readme-top">quay lại đầu trang</a>)</p>

---

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/PhanKydeptrai/TubeTuner.svg?style=for-the-badge
[contributors-url]: https://github.com/PhanKydeptrai/TubeTuner/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/PhanKydeptrai/TubeTuner.svg?style=for-the-badge
[forks-url]: https://github.com/PhanKydeptrai/TubeTuner/network/members
[stars-shield]: https://img.shields.io/github/stars/PhanKydeptrai/TubeTuner.svg?style=for-the-badge
[stars-url]: https://github.com/PhanKydeptrai/TubeTuner/stargazers
[issues-shield]: https://img.shields.io/github/issues/PhanKydeptrai/TubeTuner.svg?style=for-the-badge
[issues-url]: https://github.com/PhanKydeptrai/TubeTuner/issues
[license-shield]: https://img.shields.io/github/license/PhanKydeptrai/TubeTuner.svg?style=for-the-badge
[license-url]: https://github.com/PhanKydeptrai/TubeTuner/blob/master/LICENSE
[JavaScript-shield]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[HTML5-shield]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[HTML5-url]: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5
[CSS3-shield]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[CSS3-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
