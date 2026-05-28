// ==========================================
// 1. DỮ LIỆU BÀI HỌC TỪ VỰNG (5 ẢI)
// ==========================================
const lessons = [
    // Ải 1
    [
        {en:"Database",vi:"Cơ sở dữ liệu",alt:["Máy chủ","Trình duyệt","Mã nguồn"]},
        {en:"Table",vi:"Bảng dữ liệu",alt:["Tệp tin","Thư mục","Mật mã"]},
        {en:"Record",vi:"Bản ghi (Hàng)",alt:["Cột","Ô","Khóa"]},
        {en:"Field",vi:"Trường (Cột)",alt:["Hàng","Bảng","Giá trị"]},
        {en:"Schema",vi:"Lược đồ",alt:["Bản vẽ","Hình ảnh","Máy tính"]},
        {en:"Metadata",vi:"Siêu dữ liệu",alt:["Dữ liệu lỗi","Mật mã","Dữ liệu thô"]},
        {en:"Data Type",vi:"Kiểu dữ liệu",alt:["Kích thước","Tên biến","Định dạng"]},
        {en:"Attribute",vi:"Thuộc tính",alt:["Hành động","Hàm số","Giá trị"]},
        {en:"Tuple",vi:"Bộ dữ liệu",alt:["Mảng","Đối tượng","Danh sách"]},
        {en:"Relation",vi:"Quan hệ",alt:["Kết nối","Giao diện","Thành phần"]}
    ],
    // Ải 2
    [
        {en:"Primary Key",vi:"Khóa chính",alt:["Khóa phụ","Khóa ngoại","Khóa ảo"]},
        {en:"Foreign Key",vi:"Khóa ngoại",alt:["Khóa chính","Khóa đơn","Khóa mật"]},
        {en:"Candidate Key",vi:"Khóa dự tuyển",alt:["Khóa chính thức","Khóa rác","Khóa bí mật"]},
        {en:"Composite Key",vi:"Khóa tổ hợp",alt:["Khóa đơn","Khóa phụ","Khóa ẩn"]},
        {en:"Constraint",vi:"Ràng buộc",alt:["Tự do","Mở rộng","Liên kết"]},
        {en:"Integrity",vi:"Tính toàn vẹn",alt:["Bảo mật","Tính mở","Đa dạng"]},
        {en:"Unique",vi:"Duy nhất",alt:["Phổ biến","Nhiều hàng","Công khai"]},
        {en:"Null Value",vi:"Giá trị rỗng",alt:["Giá trị 0","Giá trị sai","Mặc định"]},
        {en:"Validation",vi:"Xác thực",alt:["Xóa bỏ","Mã hóa","Lưu trữ"]},
        {en:"Dependency",vi:"Sự phụ thuộc",alt:["Sự độc lập","Sự rời rạc","Sự liên kết"]}
    ],
    // Ải 3
    [
        {en:"Query",vi:"Truy vấn",alt:["Tìm lỗi","Cài đặt","Yêu cầu xóa"]},
        {en:"SQL",vi:"Ngôn ngữ truy vấn",alt:["Ngôn ngữ máy","Web","Hệ điều hành"]},
        {en:"Select",vi:"Lấy dữ liệu",alt:["Xóa","Thêm","Sửa"]},
        {en:"Insert",vi:"Chèn dữ liệu",alt:["Lọc","Xóa","Tìm"]},
        {en:"Update",vi:"Cập nhật",alt:["Xóa","Tải về","Sao lưu"]},
        {en:"Delete",vi:"Xóa dữ liệu",alt:["Lưu","Chèn","Sửa"]},
        {en:"Statement",vi:"Câu lệnh",alt:["Lời chào","Báo cáo","Ghi chú"]},
        {en:"Clause",vi:"Mệnh đề",alt:["Kết quả","Tiêu đề","Điều kiện"]},
        {en:"Order By",vi:"Sắp xếp theo",alt:["Lọc theo","Nhóm theo","Tìm theo"]},
        {en:"Join",vi:"Phép nối",alt:["Phép cộng","Phép lọc","Phép chia"]}
    ],
    // Ải 4
    [
        {en:"Index",vi:"Chỉ mục",alt:["Số trang","Mục lục","Ký hiệu"]},
        {en:"Trigger",vi:"Trình kích hoạt",alt:["Nút bấm","Lỗi","Cảnh báo"]},
        {en:"Stored Procedure",vi:"Thủ tục lưu trữ",alt:["Hàm xử lý","Cài đặt","Bản sao"]},
        {en:"View",vi:"Bảng ảo",alt:["Hình ảnh","Thư mục","Giao diện"]},
        {en:"Normalization",vi:"Chuẩn hóa",alt:["Nén","Giải nén","Phân tích"]},
        {en:"Denormalization",vi:"Phi chuẩn hóa",alt:["Chuẩn hóa","Mã hóa","Nén"]},
        {en:"Inner Join",vi:"Nối trong",alt:["Nối ngoài","Nối phải","Nối trái"]},
        {en:"Transaction",vi:"Giao dịch",alt:["Sửa đổi","Tính toán","Chuyển tiền"]},
        {en:"Commit",vi:"Xác nhận",alt:["Hủy bỏ","Xóa bỏ","Lưu tạm"]},
        {en:"Rollback",vi:"Hoàn tác",alt:["Xác nhận","Xóa sạch","Sửa lỗi"]}
    ],
    // Ải 5
    [
        {en:"Backup",vi:"Sao lưu",alt:["Xóa","Tải về","Phục hồi"]},
        {en:"Restore",vi:"Phục hồi",alt:["Xóa sạch","Cài lại","Lưu trữ"]},
        {en:"DBA",vi:"Quản trị viên",alt:["Hacker","Thiết kế","Người dùng"]},
        {en:"Encryption",vi:"Mã hóa",alt:["Giải nén","Xóa tệp","Dịch văn bản"]},
        {en:"Privilege",vi:"Quyền truy cập",alt:["Mật khẩu","Tài khoản","Thông báo"]},
        {en:"Grant",vi:"Cấp quyền",alt:["Thu hồi quyền","Ẩn quyền","Xóa quyền"]},
        {en:"Revoke",vi:"Thu hồi quyền",alt:["Cấp quyền","Sửa quyền","Cho phép"]},
        {en:"Security",vi:"Bảo mật",alt:["Công khai","Tự do","Dễ vỡ"]},
        {en:"Authentication",vi:"Xác thực",alt:["Lừa đảo","Đăng xuất","Ẩn danh"]},
        {en:"Firewall",vi:"Tường lửa",alt:["Diệt virus","Trình duyệt","Hệ điều hành"]}
    ]
];

// ==========================================
// 2. BỘ CÂU HỎI TRẮC NGHIỆM TỔNG HỢP (TIẾNG VIỆT)
// ==========================================
let quizVN = [
    {
        question: "1. Một bảng NhanVien có dữ liệu: 'NV01, Nguyễn Văn A, 2000-03-15, 7.5'. Hãy xác định đâu là bản ghi (record) trong bảng này?",
        options: ["NV01.", "Nguyễn Văn A.", "Toàn bộ dòng dữ liệu trên.", "7.5."],
        answer: 2
    },
    {
        question: "2. Trường 'doanvien' (chỉ lưu trạng thái “có/không”) nên sử dụng kiểu dữ liệu nào dưới đây để tiết kiệm bộ nhớ và dễ truy xuất nhất?",
        options: ["INT.", "VARCHAR.", "BOOLEAN.", "CHAR (3)."],
        answer: 2
    },
    {
        question: "3. Một bảng HoaDon có trường MaKhachHang liên kết với bảng KhachHang. Trường này đóng vai trò gì trong bảng HoaDon?",
        options: ["Khóa chính", "Khóa ngoại", "Trường dữ liệu thường", "Trường tính toán"],
        answer: 1
    },
    {
        question: "4. Để xóa bản ghi có MaHS = 2 trong bảng HocSinh, câu lệnh SQL nào sau đây là đúng?",
        options: [
            "DELETE FROM HocSinh; WHERE MaHS = 2;",
            "DELETE HocSinh WHERE MaHS = 2;",
            "DELETE FROM HocSinh WHERE MaHS = 2;",
            "REMOVE FROM HocSinh WHERE MaHS = 2;"
        ],
        answer: 2
    },
    {
        question: "5. Lệnh GRANT SELECT ON HocSinh TO user1; có ý nghĩa gì?",
        options: [
            "user1 được tạo bảng HocSinh",
            "user1 được quyền đọc dữ liệu từ bảng HocSinh",
            "user1 được xóa bảng HocSinh",
            "user1 được cập nhật dữ liệu"
        ],
        answer: 1
    }
];

// ==========================================
// 3. BỘ CÂU HỎI TRẮC NGHIỆM TỔNG HỢP (TIẾNG ANH)
// ==========================================
let quizEN = [
    {
        question: "1. Which of the following database declarations follows the correct naming conventions?",
        options: ["CREATE DATABASE Quan ly;", "CREATE DATABASE QuanLy123;", "CREATE DATABASE Quan-Ly;", "CREATE DATABASE Quan@Ly;"],
        answer: 1
    },
    {
        question: "2. Consider the statement: UPDATE HocSinh SET Diem = 10; What is the result?",
        options: ["Only one record is updated", "All records in the table are updated", "Data is deleted", "Data is inserted"],
        answer: 1
    },
    {
        question: "3. Which of the following correctly describes data exploitation in a database?",
        options: [
            "Storing new data into data tables.",
            "Analyzing and using data to generate necessary information.",
            "Modifying the structure of data tables in the system.",
            "Deleting unnecessary records from a table."
        ],
        answer: 1
    },
    {
        question: "4. Which statement correctly describes the primary key in a data table?",
        options: [
            "Primary key values may be duplicated.",
            "Primary key values must be unique.",
            "The primary key may be left empty in the table.",
            "The primary key does not need a defined value."
        ],
        answer: 1
    },
    {
        question: "5. Consider the statement: REVOKE INSERT ON HocSinh FROM user1; What is the result?",
        options: [
            "user1 can insert data",
            "user1 is removed from the system",
            "user1’s permission to insert data is revoked",
            "user1’s permission to view data is revoked"
        ],
        answer: 2
    }
];