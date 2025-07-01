# YouTube Progress Bar & Duration Hider Extension

[English](README_EN.md) | Tiếng Việt

Extension Chrome đơn giản để ẩn thanh tiến trình (progress bar), thời lượng video và/hoặc phần Shorts trên YouTube khi xem video, nhưng vẫn giữ nguyên tất cả các chức năng điều khiển khác.

## Tính năng

✅ **Ẩn thanh tiến trình video** - Loại bỏ thanh progress bar khi xem video <br>
✅ **Ẩn thời lượng video** - Ẩn thông tin thời gian hiện tại/tổng thời lượng video <br>
✅ **Ẩn Shorts** - Ẩn hoàn toàn các video Shorts và mục Shorts trên YouTube <br>
✅ **Giữ nguyên điều khiển âm lượng** - Vẫn có thể tăng/giảm âm lượng bình thường <br>
✅ **Giữ nguyên các nút điều khiển** - Play/pause, fullscreen, settings, subtitles... <br>
✅ **Bật/tắt riêng biệt** - Toggle độc lập cho thanh tiến trình, thời lượng và Shorts <br>
✅ **Giao diện hiện đại** - UI theo phong cách shadcn, đẹp mắt và dễ sử dụng <br>
✅ **Dark mode** - Hỗ trợ chế độ tối, tự động theo hệ thống hoặc tùy chọn thủ công <br>
✅ **Tự động áp dụng** - Hoạt động với tất cả video YouTube <br>
✅ **Không ảnh hưởng hiệu suất** - Extension nhẹ và tối ưu <br>

## 🌟 Tính năng mới: Dark Mode & UI Hiện Đại 🌟

> **Mới!** Extension giờ đây có giao diện hiện đại với Dark Mode!
> 
> Các tính năng mới bao gồm:
> - Giao diện người dùng hiện đại theo phong cách shadcn
> - Chế độ Dark Mode tự động theo hệ thống hoặc tùy chỉnh
> - Nút chuyển đổi theme sáng/tối dễ dàng
> - Các component UI hiện đại (Switch, Card, Badge)
> - Lưu trữ tùy chọn theme người dùng
>
> Chỉ cần nhấp vào nút chuyển đổi theme ở góc trên bên phải popup!

## Cách cài đặt

1. **Mở Chrome và vào trang Extensions:**
   - Gõ `chrome://extensions/` vào thanh địa chỉ
   - Hoặc vào Menu → More tools → Extensions

2. **Bật Developer mode:**
   - Chuyển toggle "Developer mode" ở góc trên bên phải

3. **Load extension:**
   - Click "Load unpacked"
   - Chọn thư mục `YoutubeDisableProgessBar` này
   - Extension sẽ được cài đặt và xuất hiện trong danh sách

## Cách sử dụng

1. **Mở YouTube** và phát một video bất kỳ
2. **Click vào icon extension** trên thanh toolbar
3. **Toggle switches** để bật/tắt các tính năng:
   - **Ẩn thanh tiến trình**: Ẩn/hiện progress bar
   - **Ẩn thời lượng video**: Ẩn/hiện thông tin thời gian
   - **Ẩn Shorts**: Ẩn/hiện các video và mục Shorts
4. **Chuyển đổi theme**:
   - Nhấp vào nút sun/moon ở góc trên bên phải để chuyển đổi giữa Light và Dark mode
5. Extension sẽ tự động áp dụng thay đổi

## Trạng thái Extension

- 🟢 **Đang ẩn: thanh tiến trình** - Chỉ thanh tiến trình bị ẩn
- 🟢 **Đang ẩn: thời lượng** - Chỉ thời lượng video bị ẩn
- 🟢 **Đang ẩn: shorts** - Chỉ phần Shorts bị ẩn
- 🟢 **Đang ẩn: nhiều tính năng** - Kết hợp nhiều tính năng ẩn cùng lúc
- 🟡 **Đã tắt tất cả** - Hiển thị bình thường

## Lưu ý

- Extension chỉ hoạt động trên `youtube.com`
- Các phím tắt YouTube vẫn hoạt động bình thường (Space, M, F, ←, →, ↑, ↓)
- Settings được lưu tự động và áp dụng cho tất cả tab YouTube
- Có thể bật/tắt riêng biệt từng tính năng theo nhu cầu
- Nếu gặp vấn đề, hãy thử làm mới trang YouTube hoặc tắt/bật lại extension
- Tùy chọn theme (sáng/tối) được lưu và áp dụng cho mọi lần mở extension

## Cấu trúc file

```
YoutubeDisableProgessBar/
├── manifest.json         # Cấu hình extension
├── content.js            # Script chạy trên trang YouTube  
├── popup.html            # Giao diện popup
├── popup.js              # Logic popup
├── styles.css            # CSS để ẩn progress bar, thời lượng và shorts
├── components/           # Thư mục chứa các component UI
│   └── ui/               # Các component UI hiện đại
│       ├── badge.js      # Component Badge
│       ├── card.js       # Component Card
│       ├── switch.js     # Component Switch
│       └── theme-toggle.js # Component Theme Toggle
├── src/                  # Thư mục source
│   └── input.css         # CSS đầu vào cho Tailwind
├── tailwind.config.js    # Cấu hình Tailwind CSS
├── postcss.config.js     # Cấu hình PostCSS
├── build.js              # Script build
├── icons/                # Thư mục chứa icons (đã có đầy đủ)
│   ├── icon16.png        # Icon 16x16px
│   ├── icon32.png        # Icon 32x32px  
│   ├── icon48.png        # Icon 48x48px
│   └── icon128.png       # Icon 128x128px
└── README.md             # File hướng dẫn này
```

## Troubleshooting

**Extension không hoạt động:**
- Kiểm tra xem đã bật Developer mode chưa
- Reload extension trong trang chrome://extensions/
- Làm mới trang YouTube

**Thanh tiến trình, thời lượng hoặc Shorts vẫn hiển thị:**
- Click icon extension và kiểm tra trạng thái các toggle
- Đảm bảo đã bật tính năng tương ứng
- Làm mới trang và thử lại
- Kiểm tra Console để xem có lỗi không

**Dark mode không hoạt động đúng:**
- Kiểm tra xem localStorage có bị xóa không
- Thử xóa cache của trình duyệt
- Reload extension và thử lại

**Nút ngôn ngữ không hoạt động:**
- Kiểm tra xem có lỗi JavaScript trong Console không
- Reload extension và thử lại

## Phát triển thêm

Extension này có thể được mở rộng với các tính năng:
- Ẩn/hiện các controls khác (như nút like/dislike, comments)
- Shortcut keys tùy chỉnh
- Whitelist/blacklist channels
- Thêm nhiều theme màu sắc khác nhau
- Ẩn thumbnail duration trên trang chủ
- Timer tự động bật/tắt theo thời gian
- Sync settings với Chrome account
- Tùy chọn ẩn các phần khác của YouTube (như Trending, Subscriptions)
