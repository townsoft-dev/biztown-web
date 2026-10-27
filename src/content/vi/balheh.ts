import type { BalhehContent } from "@/content/balheh-types";

/** Trang Balheh — tiếng Việt (Figma "Balheh · Homepage · VI · 1440"). */
export const BALHEH: BalhehContent = {
  header: {
    menu: [
      { label: "Tính năng chính", to: "features" },
      { label: "Sứ mệnh", to: "mission" },
      { label: "Quản lý", to: "manage" },
      { label: "Phân quyền", to: "roles" },
      { label: "Hướng dẫn", to: "start" },
      { label: "Hỏi đáp", to: "faq" },
    ],
    menuLabel: "Điều hướng Balheh",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
    cta: "Dùng miễn phí",
    biztownLabel: "BizTown — trang chủ",
  },
  hero: {
    title: { lead: "Cả đội làm việc ", kw: "trong một dự án" },
    lead: "Giao việc trên Board, trao đổi trong Channels và lưu tài liệu trên Wiki. Ba thứ ở cùng một nơi và liên kết với nhau.",
    cta: "Dùng miễn phí",
    consult: "Nhận tư vấn",
    note: "Không cần cài đặt · Đăng nhập bằng email, Google hoặc Microsoft",
    chaptersLabel: "Demo Balheh",
    pauseLabel: "Tạm dừng",
    playLabel: "Phát tiếp",
    chapters: ["Bảng công việc", "Chat nhóm", "Wiki tài liệu", "Theo dõi tiến độ"],
  },
  strip: {
    label: "Thay cho ba công cụ rời rạc",
    items: ["Ứng dụng giao việc", "Nhóm chat", "Thư mục tài liệu"],
  },
  features: {
    tag: "Cách Balheh hoạt động",
    title: { lead: "Từ giao việc đến hoàn thành,", kw: "không rời dự án" },
    lead: "Chọn từng bước để xem Balheh giúp đội của bạn ở đâu.",
    tabs: ["Giao việc", "Trao đổi", "Lưu tài liệu", "Kết nối"],
    screens: [
      {
        title: "Mọi thông tin của một việc nằm gọn trong một thẻ",
        callouts: [
          "Trạng thái thẻ theo cột",
          "Nhãn, người làm, tiến độ, trạng thái",
          "Mô tả, hạn chót, tệp, bình luận",
          "Checklist chia nhỏ đầu việc",
          "Theo dõi thẻ để nhận thông báo",
          "Ưu tiên, độ khó, hạn chót từng việc",
          "Bình luận và @nhắc tên",
        ],
      },
      {
        title: "Trao đổi theo kênh, tạo việc và thread ngay từ tin nhắn",
        callouts: [
          "Kênh của dự án",
          "Thread trong kênh",
          "Gửi tệp",
          "Thread mở từ tin nhắn",
          "Tạo thread, lọc, ghim tin",
          "Tin nhắn thành việc (TASK)",
          "Trả lời trong thread",
          "Gửi tin, emoji, @nhắc tên",
        ],
      },
      {
        title: "Tài liệu dự án ở một nơi, tìm được trong vài giây",
        callouts: [
          "Tìm trong toàn bộ wiki",
          "Từ khoá được tô sáng",
          "Kết quả gom theo thư mục",
          "Mở nhiều tài liệu cùng lúc",
          "Soạn bằng khối: tiêu đề, checklist",
          "Liên kết tới việc",
          "Gắn tag, chọn màu",
        ],
      },
    ],
    card: {
      title: "[320] Dựng trang giới thiệu",
      checklist1: "Checklist 001",
      tasks1: [
        { text: "Khung trang và menu", done: true },
        { text: "Phần tính năng", done: true },
        { text: "Bản mobile", done: false, mark: "selected" },
        { text: "Kiểm tra tốc độ", done: false, mark: "alarm" },
      ],
      checklist2: "Checklist 002",
      tasks2: [
        { text: "Viết nội dung hero", done: true },
        { text: "Dịch sang tiếng Hàn", done: true },
      ],
      task: "Bản mobile",
      desc: "Hoàn thiện bố cục mobile cho trang giới thiệu, kiểm tra trên iPhone và Android.",
      file: "anh-thiet-ke-mobile.png",
      added: "Thêm 17/04/2026, 7:50",
      comment: "Mình review xong phần menu rồi nhé @Minh",
      writeComment: "Viết bình luận...",
      taskPlaceholder: "Tiêu đề việc....",
    },
    chat: { reply: "Lan xác nhận giúp mình nhé, mình gửi bản cuối trước 17h" },
    search: {
      query: "rà soát dự án",
      results: "Search results (3)",
      groups: [
        {
          name: "Tổng quan dự án",
          count: 2,
          snippets: [
            "{rà soát dự án} để xác định các điểm chưa thống nhất giữa các module và đảm bảo mọi bên đã đồng thuận trước khi triển khai.",
            "Chúng ta cần {rà soát dự án} trước sprint tiếp theo.",
          ],
        },
        {
          name: "Back-end / Tech stack",
          count: 1,
          snippets: ["{rà soát dự án} và cập nhật tài liệu API trước khi bàn giao."],
        },
      ],
      more: [
        { name: "Tài liệu BA", count: 2 },
        { name: "Back-end / Menu Overview", count: 3 },
      ],
    },
    link: {
      stepsLabel: "Các bước kết nối",
      steps: [
        {
          title: "Biến tin nhắn thành việc",
          desc: "Tin nhắn của Minh trong kênh chat trở thành một đầu việc trên thẻ, kèm liên kết ngược về tin nhắn gốc.",
          action: "Tạo việc",
          done: "Đã tạo việc",
        },
        {
          title: "Gắn tài liệu liên quan",
          desc: "Gắn trang wiki “Bảng phân quyền” vào thẻ. Ai mở thẻ cũng thấy tài liệu cần đọc.",
          action: "Gắn tài liệu",
          done: "Đã gắn",
        },
        {
          title: "Mở thread từ thẻ",
          desc: "Tạo thread ngay từ thẻ. Cuộc trao đổi về việc này nằm gọn trong một chỗ và luôn gắn với thẻ.",
          action: "Tạo thread",
          done: "Đã tạo thread",
        },
      ],
      reset: "Xem lại từ đầu",
      msg: "Cần bổ sung bảng phân quyền vào trang Balheh trước thứ Sáu.",
      taskId: "TASK-415",
      newTask: "Bổ sung bảng phân quyền",
      from: "từ #mobile board",
      docs: "Tài liệu",
      page: "Bảng phân quyền",
      rel: "Việc liên quan:",
      replies: "2 trả lời",
      map: {
        title: "Những liên kết Balheh hỗ trợ",
        rows: [
          ["Thẻ", "Thread chat"],
          ["Tin nhắn", "Đầu việc"],
          ["Thẻ, kênh, thread", "Trang wiki"],
          ["Khối trong trang wiki", "Đầu việc"],
        ],
        note: "Nếu một người chưa có quyền xem nội dung được liên kết, liên kết vẫn hiện nhưng bị khoá. Không ai thấy nội dung ngoài quyền của mình.",
      },
    },
  },
  more: {
    tag: "Khám phá thêm",
    title: { lead: "Những màn hình ", kw: "ít ai kể đến", tail: ", nhưng dùng mỗi ngày" },
    lead: "Phân tích, thông báo, nhật ký hoạt động, cài đặt dự án và liên kết tài liệu.",
    prevLabel: "Màn hình trước",
    nextLabel: "Màn hình sau",
    tabs: [
      {
        screen: "ana",
        label: "Phân tích",
        title: "Toàn cảnh mọi dự án trong một trang",
        points: [
          "Sức khoẻ dự án, việc theo mức ưu tiên",
          "Xu hướng tạo mới, hoàn thành, quá hạn",
          "Hiệu suất và độ khó việc của từng người",
        ],
      },
      {
        screen: "noti",
        label: "Thông báo",
        title: "Mọi cập nhật gom theo Board, Wiki, Chat, Lịch",
        points: [
          "Chỉ xem tin chưa đọc",
          "Đánh dấu đã đọc từng nhóm hoặc tất cả",
          "Xem lại hoạt động trước đó của thẻ",
        ],
      },
      {
        screen: "act",
        label: "Nhật ký",
        title: "Ai làm gì, ở đâu, lúc nào",
        points: [
          "Tìm theo tên hoặc email, lọc theo loại",
          "Bấm thẳng tới thẻ, thread, tài liệu",
          "Tải về CSV để báo cáo",
        ],
      },
      {
        screen: "set",
        label: "Cài đặt dự án",
        title: "Mỗi dự án một cấu hình riêng",
        points: [
          "Trạng thái, ngày bắt đầu và hạn chót",
          "Riêng tư, cộng tác hoặc công khai",
          "Xem nhanh số người theo từng vai trò",
        ],
      },
      {
        screen: "links",
        label: "Liên kết tài liệu",
        title: "Tài liệu nối với thẻ, tệp và đường dẫn ngoài",
        points: [
          "Thanh định dạng khi bôi chọn chữ",
          "Gắn thẻ liên quan ngay trong trang",
          "Lưu tệp đính kèm và liên kết ngoài",
        ],
      },
    ],
    shots: {
      projectDesc:
        "Brandsite là trang giới thiệu các sản phẩm của công ty, gồm trang chủ, trang Balheh và trang tuyển dụng. Dự án do ba đội Design, Dev và Content cùng thực hiện, phát hành theo từng giai đoạn.",
      newReply: "Lan xác nhận giúp mình nhé, mình gửi bản cuối trước 17h",
    },
  },
  mission: {
    tag: "Sứ mệnh",
    title: { lead: "Tại sao Balheh ra đời?", kw: "" },
    lead: "Một đội làm việc tốt khi ai cũng thấy cùng một bức tranh: việc gì đang làm, ai đang làm và tài liệu nằm ở đâu.",
    mission: {
      label: "Sứ mệnh",
      text: "Đưa công việc, trao đổi và tài liệu của cả đội về một nơi, để không ai phải đi tìm thông tin ở ba ứng dụng khác nhau.",
    },
    vision: {
      label: "Tầm nhìn",
      text: "Trở thành không gian làm việc chung quen thuộc của các đội nhỏ và vừa: dễ dùng từ ngày đầu, không cần đào tạo.",
    },
    goals: {
      label: "Mục tiêu",
      items: [
        "Một dự án thay cho ba công cụ rời rạc",
        "Người mới vào dự án nắm được việc ngay ngày đầu",
        "Mọi quyết định đều gắn với việc và tài liệu liên quan",
      ],
    },
    compare: {
      before: "Trước đây",
      after: "Với Balheh",
      hint: "Kéo thanh trượt để so sánh",
      tools: [
        { name: "Ứng dụng giao việc", rows: ["Sửa trang chủ", "Gửi khách bản demo"] },
        { name: "Nhóm chat", rows: ["File mới nhất ở đâu nhỉ?", "Ai đang làm phần này?"] },
        { name: "Thư mục tài liệu", rows: ["bao-gia-final-v3.docx", "bao-gia-final-v4.docx"] },
      ],
      sticky: "Nhớ hỏi lại ai nhận việc ảnh sản phẩm!",
    },
  },
  manage: {
    tag: "Quản lý",
    title: { lead: "Mọi thứ để đội chạy đều mỗi ngày", kw: "" },
    cards: [
      {
        title: "Theo dõi tiến độ",
        desc: "Dashboard cá nhân cho việc của bạn hôm nay, dashboard dự án cho tiến độ từng bảng, và phần phân tích cho người quản lý.",
        link: { label: "Bắt đầu miễn phí", to: "contact" },
      },
      {
        title: "Lịch và thông báo",
        desc: "Sự kiện cá nhân, công ty và dự án. Thông báo trong ứng dụng, trên trình duyệt và qua email, bạn chọn cách nhận.",
        link: { label: "Xem cách bắt đầu", to: "start" },
      },
      {
        title: "Bảo mật tài khoản",
        desc: "Xác thực hai lớp, đăng nhập bằng Google hoặc Microsoft, xem và đăng xuất các phiên đăng nhập.",
        link: { label: "Hỏi đáp về bảo mật", to: "faq" },
      },
    ],
  },
  roles: {
    tag: "Phân quyền",
    title: { lead: "Mời đúng người, ", kw: "cho đúng quyền" },
    lead: "Bốn vai trò có sẵn cho mỗi dự án. Chủ dự án có thể tạo thêm vai trò riêng dựa trên vai trò gốc.",
    invites: [
      {
        strong: "Mời bằng email",
        rest: ", kể cả người chưa có tài khoản. Họ đăng ký xong là có sẵn quyền.",
      },
      { strong: "Liên kết mời", rest: " kèm sẵn vai trò, gửi cho cả nhóm cùng lúc." },
      {
        strong: "Mời vào từng bảng, kênh hoặc trang",
        rest: " cho đối tác bên ngoài với vai trò Khách.",
      },
    ],
    matrix: {
      title: "Quyền theo từng vai trò",
      featureLabel: "Tính năng",
      roles: [
        { name: "Chủ dự án", app: "Owner" },
        { name: "Quản lý", app: "Manager" },
        { name: "Thành viên", app: "Member" },
        { name: "Khách", app: "Guest" },
      ],
      rows: [
        {
          label: "Bảng công việc",
          cells: [
            { level: "full", text: "Mọi bảng" },
            { level: "full", text: "Mọi bảng" },
            { level: "full", text: "Mọi bảng, sửa theo quyền" },
            { level: "limited", text: "Chỉ bảng được mời" },
          ],
        },
        {
          label: "Chat",
          cells: [
            { level: "full", text: "Mọi kênh và thread" },
            { level: "full", text: "Mọi kênh và thread" },
            { level: "full", text: "Kênh Main; kênh khác khi được mời" },
            { level: "limited", text: "Chỉ kênh được mời" },
          ],
        },
        {
          label: "Wiki",
          cells: [
            { level: "full", text: "Toàn quyền" },
            { level: "full", text: "Toàn quyền" },
            { level: "full", text: "Mọi thư mục và trang" },
            { level: "limited", text: "Chỉ trang được mời" },
          ],
        },
        {
          label: "Thành viên",
          cells: [
            { level: "full", text: "Mời, xoá, đổi quyền, tạo vai trò" },
            { level: "full", text: "Mời, xoá, đổi quyền" },
            { level: "limited", text: "Chỉ xem danh sách" },
            { level: "none", text: "Không" },
          ],
        },
        {
          label: "Cài đặt dự án",
          cells: [
            { level: "full", text: "Toàn quyền" },
            { level: "full", text: "Trừ xoá dự án" },
            { level: "none", text: "Không" },
            { level: "none", text: "Không" },
          ],
        },
      ],
    },
  },
  start: {
    tag: "Hướng dẫn",
    title: { lead: "Vào việc ", kw: "trong vài phút" },
    lead: "Không cần cài đặt. Balheh chạy ngay trên trình duyệt.",
    steps: [
      {
        title: "Đăng ký bằng email",
        desc: "Nhận mã xác minh qua email, hoặc đăng nhập bằng Google, Microsoft.",
      },
      {
        title: "Tạo dự án",
        desc: "Đặt tên, chọn chế độ hiển thị. Kênh chat Main và thư mục wiki Main có sẵn.",
      },
      {
        title: "Mời thành viên",
        desc: "Mời bằng email hoặc liên kết. Thành viên tự vào mọi bảng, wiki và kênh Main.",
      },
      {
        title: "Bắt tay vào việc",
        desc: "Tạo bảng và thẻ, trao đổi trong kênh, viết tài liệu. Mọi thứ trong cùng dự án.",
      },
    ],
    cta: "Tạo dự án đầu tiên",
  },
  faq: {
    tag: "Hỏi đáp",
    title: { lead: "Câu hỏi ", kw: "thường gặp" },
    items: [
      {
        q: "Balheh khác gì so với dùng riêng ứng dụng giao việc, chat và tài liệu?",
        a: "Ba thứ nằm trong cùng một dự án và liên kết với nhau: tin nhắn thành đầu việc, thẻ mở thẳng thread, trang wiki gắn vào thẻ. Bạn chỉ quản lý một danh sách thành viên và một bộ quyền cho cả ba.",
      },
      {
        q: "Tôi dùng Balheh trên thiết bị nào?",
        a: "Balheh chạy trên trình duyệt web, không cần cài đặt. Ứng dụng di động riêng đang nằm trong lộ trình phát triển.",
      },
      {
        q: "Có mời đối tác bên ngoài vào dự án được không?",
        a: "Được. Mời họ với vai trò Khách: họ chỉ thấy đúng bảng, kênh hoặc trang được mời và chỉ có quyền xem.",
      },
      {
        q: "Nếu người được mời chưa có tài khoản thì sao?",
        a: "Cứ mời bằng email. Họ nhận thư kèm liên kết đăng ký, và khi đăng ký xong thì mọi quyền đã được mời có sẵn.",
      },
      {
        q: "Dữ liệu và tài khoản được bảo vệ thế nào?",
        a: "Mỗi tài khoản có thể bật xác thực hai lớp bằng ứng dụng xác thực, đăng nhập bằng Google hoặc Microsoft, và xem các phiên đăng nhập để đăng xuất thiết bị lạ. Khi đổi mật khẩu, các phiên khác tự đăng xuất. Trong dự án, mỗi người chỉ thấy nội dung đúng với vai trò của mình.",
      },
      {
        q: "Balheh có giao diện tối không?",
        a: "Có. Chọn giao diện sáng, tối hoặc theo cài đặt của máy.",
      },
    ],
  },
  band: {
    tag: "Bắt đầu với Balheh",
    title: { lead: "Đưa cả đội về ", kw: "một dự án", tail: " ngay hôm nay." },
    cta: "Dùng miễn phí",
    consult: "Cần hướng dẫn thiết lập? Để lại số điện thoại hoặc email:",
    inputLabel: "Số điện thoại hoặc email",
    submit: "Nhận tư vấn",
  },
  footer: {
    tagline:
      "Bảng công việc, chat nhóm và wiki tài liệu trong một dự án. Phát triển bởi Townsoft Vina.",
    taxCode: "MST: 0109151007",
    address: "6, Ngõ 7 Lê Đức Thọ, Từ Liêm, Hà Nội",
    columns: [
      {
        title: "Sản phẩm",
        links: [
          { label: "Tính năng chính", to: { section: "features" } },
          { label: "Sứ mệnh", to: { section: "mission" } },
          { label: "Quản lý", to: { section: "manage" } },
          { label: "Phân quyền", to: { section: "roles" } },
          { label: "Hướng dẫn", to: { section: "start" } },
        ],
      },
      {
        title: "Hỗ trợ",
        links: [
          { label: "Hỏi đáp", to: { section: "faq" } },
          { label: "Hướng dẫn sử dụng", to: null },
          { label: "Liên hệ", to: { section: "contact" } },
          { label: "Báo lỗi", to: null },
        ],
      },
      {
        title: "Tài khoản",
        links: [{ label: "Đăng ký miễn phí", to: { section: "contact" } }],
      },
      {
        title: "Chính sách",
        links: [
          { label: "Điều khoản sử dụng", to: null },
          { label: "Chính sách bảo mật", to: null },
          { label: "Bảo vệ dữ liệu", to: null },
        ],
      },
    ],
    copyright: "© 2026 Balheh, Townsoft Vina",
  },
  app: {
    board: {
      cols: ["Cần làm", "Đang làm", "Hoàn thành"],
      cards: [
        {
          col: 0,
          labels: [{ text: "Content", tone: "purple" }],
          title: "Nội dung trang Balheh",
          progress: 40,
          status: "Active",
          checks: "3/8",
          comments: 4,
          files: 2,
          due: "Th 6",
          alarm: true,
          people: ["orange", "purple"],
        },
        {
          col: 0,
          labels: [{ text: "Design", tone: "yellow" }],
          title: "Ảnh chụp màn hình",
          progress: 20,
          status: "Pending",
          checks: "1/5",
          comments: 2,
          files: 1,
          people: ["blue"],
        },
        {
          col: 1,
          labels: [
            { text: "Dev", tone: "red" },
            { text: "Web", tone: "yellow" },
          ],
          title: "Dựng trang giới thiệu",
          progress: 60,
          status: "Active",
          checks: "6/10",
          comments: 12,
          files: 5,
          due: "Hôm qua",
          alarm: true,
          people: ["green", "navy"],
        },
        {
          col: 1,
          labels: [{ text: "Content", tone: "purple" }],
          title: "Bản dịch tiếng Hàn",
          progress: 50,
          status: "Active",
          checks: "2/4",
          comments: 3,
          files: 0,
          people: ["purple"],
        },
        {
          col: 2,
          labels: [{ text: "Brand", tone: "green" }],
          title: "Bộ nhận diện Balheh",
          progress: 100,
          status: "Completed",
          checks: "8/8",
          comments: 6,
          files: 9,
          people: ["orange"],
        },
      ],
      newCard: "Viết thông cáo báo chí",
    },
    chat: {
      channels: [
        {
          name: "mobile board",
          threads: [
            { name: "Nhật ký hoạt động", count: 3 },
            { name: "Kiểm thử", count: 5 },
          ],
        },
        {
          name: "front-end board",
          threads: [
            { name: "Trang chủ", count: 2 },
            { name: "Menu", count: 1 },
          ],
        },
        { name: "back-end board", threads: [{ name: "Đăng nhập", count: 1 }] },
      ],
      thread: "Nhật ký hoạt động",
      messages: [
        {
          name: "Dương",
          avatar: "blue",
          time: "09:52",
          text: "Đã cập nhật API cho dashboard, mọi người kiểm tra giúp nhé.",
          task: "TASK-402: Dashboard API",
          reactions: [
            ["👍", 4],
            ["🚀", 2],
          ],
          pinned: true,
        },
        {
          name: "Lan",
          avatar: "green",
          time: "12:12",
          text: "@Minh @Hà bản thiết kế mới đã có trên Wiki.",
          reactions: [],
        },
        {
          name: "Minh",
          avatar: "purple",
          time: "15:11",
          file: "database_update_1010.pdf",
          reactions: [["👍", 3]],
        },
      ],
      people: [
        { name: "Hương", role: "Designer", avatar: "orange" },
        { name: "A Ram", role: "CEO", avatar: "navy" },
        { name: "Dũng", role: "Tech Lead", avatar: "blue" },
        { name: "Tính", role: "Backend", avatar: "green", away: true },
      ],
      hover: [
        "Create a Thread",
        "Create a Task",
        "Pin message",
        "Copy message link",
        "Delete message",
      ],
      demo: {
        msg: "Chốt lịch ra mắt vào thứ Sáu nhé @Lan",
        task: "TASK-416: Chốt lịch ra mắt",
        taskToast: "Đã tạo task",
        thread: "Lịch ra mắt",
        threadToast: "Đã tạo thread",
        started: "đã tạo thread:",
        oneMessage: "1 tin nhắn",
      },
    },
    wiki: {
      tree: [
        {
          name: "Tổng quan dự án",
          pages: ["Danh sách menu", "Công nghệ sử dụng", "Phân chia công việc"],
        },
        { name: "Tài liệu Back-end", pages: ["API", "Cơ sở dữ liệu"] },
        { name: "Tài liệu BA", pages: ["Luồng người dùng"] },
      ],
      tabs: ["Họp khởi động", "Công nghệ sử dụng"],
      crumb: "Tổng quan dự án / Họp khởi động",
      title: "Họp khởi động 08/05",
      desc: "Khởi động dự án Brandsite. Cả đội tham dự.",
      h1: "Nội dung",
      todo1: ["Giới thiệu thành viên", "Rà soát phạm vi dự án"],
      h2: "Việc cần làm",
      todo2: ["@Dream – Thiết kế màn hình onboarding", "@DũngTV – Dựng repo và CI/CD"],
      rel: "Việc liên quan:",
      task: "BAL-41: Trình soạn thảo văn bản",
      owner: "Nguyễn Thùy Hương",
      role: "QA Team Lead",
      created: "08/05/2026",
      edited: "2 giờ trước, Dream",
      demo: {
        page: "Biên bản họp 15/10",
        attend: "Tham dự: Hương, Minh, Lan, Dương",
        dec: "Quyết định",
        todos: ["@Minh – Hoàn thiện bản mobile trước 18/10", "@Lan – Gửi bản dịch tiếng Hàn"],
        saved: "Đã lưu",
        just: "Vừa xong",
      },
    },
    dash: {
      summary:
        "Brandsite là trang giới thiệu các sản phẩm của công ty, gồm trang chủ, trang Balheh và trang tuyển dụng. Dự án do ba đội Design, Dev và Content cùng thực hiện, phát hành theo từng giai đoạn.",
      memos: [
        {
          tone: "yellow",
          title: "Kiểm tra bảo mật hàng tuần",
          text: "Rà soát kết quả quét lỗ hổng trước khi phát hành bản Q4. Mọi lỗi mức cao cần xử lý trước thứ Sáu.",
          meta: "13/10 · Nguyễn Thùy Hương",
        },
        {
          tone: "green",
          title: "Họp online với anh Han",
          text: "Thành phần: @Dung Tran, @Dream · 16/10 14:00 · Kết nối hệ thống EAM",
          meta: "13/10 · Trần Văn Dũng",
        },
      ],
      upcoming: [
        { left: "Còn 1 ngày", title: "Ảnh chụp màn hình sản phẩm" },
        { left: "Còn 2 ngày", title: "Nội dung trang Balheh" },
        { left: "Còn 3 ngày", title: "Bản dịch tiếng Hàn" },
      ],
      overdue: [
        { left: "Quá hạn 3 ngày", title: "Dựng trang giới thiệu" },
        { left: "Quá hạn 1 ngày", title: "Kiểm tra tốc độ" },
        { left: "Quá hạn hôm nay", title: "Bản mobile" },
      ],
      demo: {
        title: "Họp review sprint",
        text: "Thứ Sáu 15:00 tại phòng họp 2, cả đội tham dự.",
        toast: "Đã tạo memo",
        just: "Vừa xong",
      },
    },
  },
};
