# YouTube Progress Bar & Duration Hider Extension

Extension Chrome đơn giản để ẩn thanh tiến trình (progress bar) và/hoặc thời lượng video trên YouTube khi xem video, nhưng vẫn giữ nguyên tất cả các chức năng điều khiển khác.

## Tính năng

✅ **Ẩn thanh tiến trình video** - Loại bỏ thanh progress bar khi xem video
✅ **Ẩn thời lượng video** - Ẩn thông tin thời gian hiện tại/tổng thời lượng video
✅ **Giữ nguyên điều khiển âm lượng** - Vẫn có thể tăng/giảm âm lượng bình thường  
✅ **Giữ nguyên các nút điều khiển** - Play/pause, fullscreen, settings, subtitles...
✅ **Bật/tắt riêng biệt** - Toggle độc lập cho thanh tiến trình và thời lượng
✅ **Tự động refresh** - Tự động làm mới trang để áp dụng thay đổi ngay lập tức
✅ **Tự động áp dụng** - Hoạt động với tất cả video YouTube
✅ **Không ảnh hưởng hiệu suất** - Extension nhẹ và tối ưu

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
   - **Tự động refresh**: Tự động làm mới trang khi thay đổi
4. Extension sẽ tự động áp dụng thay đổi (nếu bật auto-refresh)

## Trạng thái Extension

- 🟢 **Đang ẩn: thanh tiến trình** - Chỉ thanh tiến trình bị ẩn
- 🟢 **Đang ẩn: thời lượng** - Chỉ thời lượng video bị ẩn  
- 🟢 **Đang ẩn: thanh tiến trình, thời lượng** - Cả hai đều bị ẩn
- 🟡 **Đã tắt tất cả** - Hiển thị bình thường

## Lưu ý

- Extension chỉ hoạt động trên `youtube.com`
- Các phím tắt YouTube vẫn hoạt động bình thường (Space, M, F, ←, →, ↑, ↓)
- Settings được lưu tự động và áp dụng cho tất cả tab YouTube
- Có thể bật/tắt riêng biệt từng tính năng theo nhu cầu
- Tự động refresh giúp áp dụng thay đổi ngay lập tức
- Nếu gặp vấn đề, hãy thử làm mới trang YouTube hoặc tắt/bật lại extension

## Cấu trúc file

```
YoutubeDisableProgessBar/
├── manifest.json      # Cấu hình extension
├── content.js         # Script chạy trên trang YouTube  
├── popup.html         # Giao diện popup
├── popup.js           # Logic popup
├── styles.css         # CSS để ẩn progress bar và thời lượng
├── icons/             # Thư mục chứa icons (đã có đầy đủ)
│   ├── icon16.png     # Icon 16x16px
│   ├── icon32.png     # Icon 32x32px  
│   ├── icon48.png     # Icon 48x48px
│   └── icon128.png    # Icon 128x128px
├── ICONS.md           # Hướng dẫn tạo icon chất lượng cao
├── DEBUG.md           # Hướng dẫn test và debug
└── README.md          # File hướng dẫn này
```

## Troubleshooting

**Extension không hoạt động:**
- Kiểm tra xem đã bật Developer mode chưa
- Reload extension trong trang chrome://extensions/
- Làm mới trang YouTube

**Thanh tiến trình hoặc thời lượng vẫn hiển thị:**
- Click icon extension và kiểm tra trạng thái các toggle
- Đảm bảo đã bật tính năng tương ứng
- Thử bật auto-refresh và toggle lại
- Kiểm tra Console để xem có lỗi không

**Auto-refresh không hoạt động:**
- Kiểm tra quyền "tabs" trong manifest.json
- Reload extension và thử lại

## Phát triển thêm

Extension này có thể được mở rộng với các tính năng:
- Ẩn/hiện các controls khác (như nút like/dislike, comments)
- Shortcut keys tùy chỉnh
- Whitelist/blacklist channels
- Dark mode cho popup
- Ẩn thumbnail duration trên trang chủ
- Timer tự động bật/tắt theo thời gian
- Sync settings với Chrome account
