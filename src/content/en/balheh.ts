import type { BalhehContent } from "@/content/balheh-types";

/** Balheh page — English (Figma "Balheh · Homepage · VI · 1440", copy from the reference HTML). */
export const BALHEH: BalhehContent = {
  header: {
    menu: [
      { label: "Features", to: "features" },
      { label: "Mission", to: "mission" },
      { label: "Management", to: "manage" },
      { label: "Permissions", to: "roles" },
      { label: "Get started", to: "start" },
      { label: "FAQ", to: "faq" },
    ],
    menuLabel: "Balheh navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    cta: "Get it free",
    biztownLabel: "BizTown — home",
  },
  hero: {
    title: { lead: "Your whole team, working ", kw: "in one project" },
    lead: "Assign work on Boards, talk in Channels and keep docs in the Wiki. All three live in one place and link to each other.",
    cta: "Get it free",
    consult: "Get advice",
    note: "Nothing to install · Sign in with email, Google or Microsoft",
    chaptersLabel: "Balheh demo",
    pauseLabel: "Pause",
    playLabel: "Play",
    chapters: ["Task boards", "Team chat", "Doc wiki", "Track progress"],
  },
  strip: {
    label: "Replaces three disconnected tools",
    items: ["A task app", "A group chat", "A docs folder"],
  },
  features: {
    tag: "How Balheh works",
    title: { lead: "From assigning work to done,", kw: "without leaving the project" },
    lead: "Pick a step to see where Balheh helps your team.",
    tabs: ["Assign", "Discuss", "Document", "Connect"],
    screens: [
      {
        title: "Everything about a task, in one card",
        callouts: [
          "Card status by column",
          "Labels, members, progress, status",
          "Description, due date, files, comments",
          "Checklists break work down",
          "Watch a card to get notified",
          "Priority, difficulty, due date per task",
          "Comments and @mentions",
        ],
      },
      {
        title: "Talk in channels, turn messages into tasks and threads",
        callouts: [
          "Project channels",
          "Threads in a channel",
          "Share files",
          "Thread started from a message",
          "New thread, filter, pins",
          "Message turned into a task",
          "Reply in the thread",
          "Send, emoji, @mentions",
        ],
      },
      {
        title: "Project docs in one place, found in seconds",
        callouts: [
          "Search the whole wiki",
          "Matches highlighted",
          "Results grouped by folder",
          "Open several docs at once",
          "Block editor: headings, checklists",
          "Link to a task",
          "Tags with colors",
        ],
      },
    ],
    card: {
      title: "[320] Build the product page",
      checklist1: "Checklist 001",
      tasks1: [
        { text: "Page frame and menu", done: true },
        { text: "Features section", done: true },
        { text: "Mobile layout", done: false, mark: "selected" },
        { text: "Speed check", done: false, mark: "alarm" },
      ],
      checklist2: "Checklist 002",
      tasks2: [
        { text: "Write hero copy", done: true },
        { text: "Translate to Korean", done: true },
      ],
      task: "Mobile layout",
      desc: "Finish the mobile layout for the product page and test on iPhone and Android.",
      file: "mobile-design.png",
      added: "Added Apr 17, 2026, 7:50AM",
      comment: "Menu section reviewed @Minh",
      writeComment: "Write a comment...",
      taskPlaceholder: "Task title....",
    },
    chat: { reply: "Lan, please confirm — I’ll send the final version by 5 PM" },
    search: {
      query: "review project",
      results: "Search results (3)",
      groups: [
        {
          name: "Project Overview",
          count: 2,
          snippets: [
            "{review project} details, identify any remaining inconsistencies across modules, and ensure all stakeholders are aligned.",
            "We need to {review project} progress before the next sprint starts.",
          ],
        },
        {
          name: "Backend / Tech stack",
          count: 1,
          snippets: ["{review project} and update the API docs before handover."],
        },
      ],
      more: [
        { name: "BA Document", count: 2 },
        { name: "Backend / Menu Overview", count: 3 },
      ],
    },
    link: {
      stepsLabel: "Linking steps",
      steps: [
        {
          title: "Turn a message into a task",
          desc: "Minh’s message in the chat channel becomes a task on the card, with a link back to the original message.",
          action: "Create task",
          done: "Task created",
        },
        {
          title: "Attach a related doc",
          desc: "Attach the “Permission table” wiki page to the card. Anyone who opens the card sees what to read.",
          action: "Attach doc",
          done: "Attached",
        },
        {
          title: "Start a thread from the card",
          desc: "Create a thread right from the card. The whole conversation about this work stays in one place, tied to the card.",
          action: "Create thread",
          done: "Thread created",
        },
      ],
      reset: "Start over",
      msg: "We need to add the permission table to the Balheh page before Friday.",
      taskId: "TASK-415",
      newTask: "Add the permission table",
      from: "from #mobile board",
      docs: "Docs",
      page: "Permission table",
      rel: "See related task:",
      replies: "2 replies",
      map: {
        title: "Links Balheh supports",
        rows: [
          ["Card", "Chat thread"],
          ["Message", "Task"],
          ["Card, channel, thread", "Wiki page"],
          ["Block in a wiki page", "Task"],
        ],
        note: "If someone doesn’t have access to the linked content, the link still shows but is locked. Nobody sees anything outside their permissions.",
      },
    },
  },
  more: {
    tag: "Explore more",
    title: { lead: "The screens ", kw: "nobody talks about", tail: ", used every day" },
    lead: "Analysis, notifications, the activity log, project settings and linked docs.",
    prevLabel: "Previous screen",
    nextLabel: "Next screen",
    tabs: [
      {
        screen: "ana",
        label: "Analysis",
        title: "Every project at a glance",
        points: [
          "Project health and tasks by priority",
          "Created, completed and overdue trends",
          "Each member’s performance and task difficulty",
        ],
      },
      {
        screen: "noti",
        label: "Notifications",
        title: "Updates grouped by Board, Wiki, Chat and Calendar",
        points: [
          "Show unread only",
          "Mark a group or everything as read",
          "See a card’s previous activity",
        ],
      },
      {
        screen: "act",
        label: "Activity log",
        title: "Who did what, where and when",
        points: [
          "Search by name or email, filter by type",
          "Jump straight to the card, thread or doc",
          "Download as CSV for reports",
        ],
      },
      {
        screen: "set",
        label: "Project settings",
        title: "Each project, set up its own way",
        points: [
          "Status, start date and due date",
          "Private, collaborative or public",
          "People per role at a glance",
        ],
      },
      {
        screen: "links",
        label: "Linked docs",
        title: "Docs connected to cards, files and links",
        points: [
          "Formatting toolbar on selection",
          "Link related cards from the page",
          "Keep attachments and external links",
        ],
      },
    ],
    shots: {
      projectDesc:
        "Brandsite is the company’s product website: the homepage, the Balheh page and the careers page. Design, Dev and Content build it together and release it in phases.",
      newReply: "Lan, please confirm — I’ll send the final version by 5 PM",
    },
  },
  mission: {
    tag: "Mission",
    title: { lead: "Why we built Balheh", kw: "" },
    lead: "A team works best when everyone sees the same picture: what’s being done, who’s doing it and where the documents are.",
    mission: {
      label: "Mission",
      text: "Bring a team’s tasks, conversations and documents into one place, so nobody hunts for information across three apps.",
    },
    vision: {
      label: "Vision",
      text: "Become the shared workspace small and medium teams reach for first: easy from day one, no training needed.",
    },
    goals: {
      label: "Goals",
      items: [
        "One project instead of three disconnected tools",
        "New members understand the work on day one",
        "Every decision stays linked to its tasks and documents",
      ],
    },
    compare: {
      before: "Before",
      after: "With Balheh",
      hint: "Drag the slider to compare",
      tools: [
        { name: "Task app", rows: ["Fix the homepage", "Send the client a demo"] },
        { name: "Group chat", rows: ["Where’s the latest file?", "Who’s on this one?"] },
        { name: "Docs folder", rows: ["quote-final-v3.docx", "quote-final-v4.docx"] },
      ],
      sticky: "Ask again who’s doing the product photos!",
    },
  },
  manage: {
    tag: "Management",
    title: { lead: "Everything your team needs to run smoothly", kw: "" },
    cards: [
      {
        title: "Track progress",
        desc: "A personal dashboard for your work today, a project dashboard for progress by board, and analysis for managers.",
        link: { label: "Start for free", to: "contact" },
      },
      {
        title: "Calendar and notifications",
        desc: "Personal, company and project events. Notifications in the app, in the browser and by email — you choose how.",
        link: { label: "See how to start", to: "start" },
      },
      {
        title: "Account security",
        desc: "Two-factor authentication, sign-in with Google or Microsoft, and a list of sessions you can sign out of.",
        link: { label: "Security FAQ", to: "faq" },
      },
    ],
  },
  roles: {
    tag: "Permissions",
    title: { lead: "Invite the right people ", kw: "with the right access" },
    lead: "Four ready-made roles for every project. Project owners can create custom roles based on any of them.",
    invites: [
      {
        strong: "Invite by email",
        rest: ", even people without an account. Their access is ready when they sign up.",
      },
      { strong: "Invite links", rest: " with a role built in, for a whole group at once." },
      {
        strong: "Invite to a single board, channel or page",
        rest: " for outside partners, as a Guest.",
      },
    ],
    matrix: {
      title: "Access by role",
      featureLabel: "Feature",
      roles: [{ name: "Owner" }, { name: "Manager" }, { name: "Member" }, { name: "Guest" }],
      rows: [
        {
          label: "Boards",
          cells: [
            { level: "full", text: "All boards" },
            { level: "full", text: "All boards" },
            { level: "full", text: "All boards, edit as allowed" },
            { level: "limited", text: "Invited boards only" },
          ],
        },
        {
          label: "Chat",
          cells: [
            { level: "full", text: "All channels and threads" },
            { level: "full", text: "All channels and threads" },
            { level: "full", text: "Main channel; others when invited" },
            { level: "limited", text: "Invited channels only" },
          ],
        },
        {
          label: "Wiki",
          cells: [
            { level: "full", text: "Full access" },
            { level: "full", text: "Full access" },
            { level: "full", text: "All folders and pages" },
            { level: "limited", text: "Invited pages only" },
          ],
        },
        {
          label: "Members",
          cells: [
            { level: "full", text: "Invite, remove, change roles, create roles" },
            { level: "full", text: "Invite, remove, change roles" },
            { level: "limited", text: "View the list" },
            { level: "none", text: "Hidden" },
          ],
        },
        {
          label: "Project settings",
          cells: [
            { level: "full", text: "Full access" },
            { level: "full", text: "All except deleting the project" },
            { level: "none", text: "Hidden" },
            { level: "none", text: "Hidden" },
          ],
        },
      ],
    },
  },
  start: {
    tag: "Get started",
    title: { lead: "Up and running ", kw: "in minutes" },
    lead: "Nothing to install. Balheh runs right in your browser.",
    steps: [
      {
        title: "Sign up with email",
        desc: "Get a verification code by email, or sign in with Google or Microsoft.",
      },
      {
        title: "Create a project",
        desc: "Name it and choose its visibility. The Main chat channel and Main wiki folder are ready.",
      },
      {
        title: "Invite your team",
        desc: "Invite by email or link. Members join every board, the wiki and the Main channel automatically.",
      },
      {
        title: "Get to work",
        desc: "Create boards and cards, talk in channels, write docs — all in the same project.",
      },
    ],
    cta: "Create your first project",
  },
  faq: {
    tag: "FAQ",
    title: { lead: "Frequently asked ", kw: "questions" },
    items: [
      {
        q: "How is Balheh different from using separate task, chat and docs apps?",
        a: "All three live in the same project and link to each other: messages become tasks, cards open their threads, wiki pages attach to cards. You manage one member list and one set of permissions for all three.",
      },
      {
        q: "Which devices can I use Balheh on?",
        a: "Balheh runs in your web browser with nothing to install. A dedicated mobile app is on the roadmap.",
      },
      {
        q: "Can I invite outside partners to a project?",
        a: "Yes. Invite them as Guests: they see only the boards, channels or pages you invite them to, with view-only access.",
      },
      {
        q: "What if the person I invite doesn’t have an account?",
        a: "Invite them by email anyway. They get a sign-up link, and once they register, all the access you gave them is ready.",
      },
      {
        q: "How are our data and accounts protected?",
        a: "Every account can turn on two-factor authentication with an authenticator app, sign in with Google or Microsoft, and review sessions to sign out unknown devices. Changing your password signs out other sessions. Inside a project, each person sees only what their role allows.",
      },
      {
        q: "Does Balheh have a dark mode?",
        a: "Yes. Choose light, dark or follow your device’s setting.",
      },
    ],
  },
  band: {
    tag: "Start with Balheh",
    title: { lead: "Bring your whole team into ", kw: "one project", tail: " today." },
    cta: "Get it free",
    consult: "Want help setting up? Leave your phone number or email:",
    inputLabel: "Phone number or email",
    submit: "Get advice",
  },
  footer: {
    tagline: "Task boards, team chat and a doc wiki in one project. Built by Townsoft Vina.",
    taxCode: "Tax code: 0109151007",
    address: "6, Lane 7 Le Duc Tho, Tu Liem, Hanoi",
    columns: [
      {
        title: "Product",
        links: [
          { label: "Features", to: { section: "features" } },
          { label: "Mission", to: { section: "mission" } },
          { label: "Management", to: { section: "manage" } },
          { label: "Permissions", to: { section: "roles" } },
          { label: "Get started", to: { section: "start" } },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "FAQ", to: { section: "faq" } },
          { label: "User guides", to: null },
          { label: "Contact", to: { section: "contact" } },
          { label: "Report a bug", to: null },
        ],
      },
      {
        title: "Account",
        links: [{ label: "Sign up free", to: { section: "contact" } }],
      },
      {
        title: "Policies",
        links: [
          { label: "Terms of use", to: null },
          { label: "Privacy policy", to: null },
          { label: "Data protection", to: null },
        ],
      },
    ],
    copyright: "© 2026 Balheh, Townsoft Vina",
  },
  app: {
    board: {
      cols: ["To do", "In Progress", "Done"],
      cards: [
        {
          col: 0,
          labels: [{ text: "Content", tone: "purple" }],
          title: "Balheh page copy",
          progress: 40,
          status: "Active",
          checks: "3/8",
          comments: 4,
          files: 2,
          due: "Fri",
          alarm: true,
          people: ["orange", "purple"],
        },
        {
          col: 0,
          labels: [{ text: "Design", tone: "yellow" }],
          title: "Product screenshots",
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
          title: "Build the product page",
          progress: 60,
          status: "Active",
          checks: "6/10",
          comments: 12,
          files: 5,
          due: "Yesterday",
          alarm: true,
          people: ["green", "navy"],
        },
        {
          col: 1,
          labels: [{ text: "Content", tone: "purple" }],
          title: "Korean translation",
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
          title: "Balheh brand kit",
          progress: 100,
          status: "Completed",
          checks: "8/8",
          comments: 6,
          files: 9,
          people: ["orange"],
        },
      ],
      newCard: "Write the press release",
    },
    chat: {
      channels: [
        {
          name: "mobile board",
          threads: [
            { name: "Activities Log", count: 3 },
            { name: "Testing", count: 5 },
          ],
        },
        {
          name: "front-end board",
          threads: [
            { name: "Homepage", count: 2 },
            { name: "Menu", count: 1 },
          ],
        },
        { name: "back-end board", threads: [{ name: "Login / Logout", count: 1 }] },
      ],
      thread: "Activities Log",
      messages: [
        {
          name: "Duong",
          avatar: "blue",
          time: "09:52",
          text: "Dashboard API is updated — please give it a check.",
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
          text: "@Minh @Ha the new design is up on the Wiki.",
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
        { name: "Huong", role: "Designer", avatar: "orange" },
        { name: "A Ram", role: "CEO", avatar: "navy" },
        { name: "Dung", role: "Tech Lead", avatar: "blue" },
        { name: "Tinh", role: "Backend", avatar: "green", away: true },
      ],
      hover: [
        "Create a Thread",
        "Create a Task",
        "Pin message",
        "Copy message link",
        "Delete message",
      ],
      demo: {
        msg: "Let’s lock the launch for Friday @Lan",
        task: "TASK-416: Lock the launch date",
        taskToast: "Task created",
        thread: "Launch date",
        threadToast: "Thread created",
        started: "started a thread:",
        oneMessage: "1 Message",
      },
    },
    wiki: {
      tree: [
        { name: "Project Overview", pages: ["Menu list", "Tech Stack", "Task distribution"] },
        { name: "Back-end Document", pages: ["API", "Database"] },
        { name: "BA Document", pages: ["User Flow"] },
      ],
      tabs: ["Kickoff Meeting", "Tech Stack"],
      crumb: "Project Overview / Kickoff Meeting",
      title: "260508 Kickoff Meeting",
      desc: "Project kickoff for Brandsite. Full team attendance.",
      h1: "Agenda",
      todo1: ["Team introductions", "Review project scope"],
      h2: "Action items",
      todo2: ["@Dream – Design onboarding screen", "@DungTV – Set up repo + CI/CD"],
      rel: "See related task:",
      task: "BAL-41: Implement rich text editor",
      owner: "Nguyen Thuy Huong",
      role: "QA Team Lead",
      created: "May 08, 2026",
      edited: "2h ago · by Dream",
      demo: {
        page: "Meeting notes 10/15",
        attend: "Attendees: Huong, Minh, Lan, Duong",
        dec: "Decisions",
        todos: ["@Minh – Finish the mobile layout by 10/18", "@Lan – Send the Korean translation"],
        saved: "Saved",
        just: "Just now",
      },
    },
    dash: {
      summary:
        "Brandsite is the company’s product website: the homepage, the Balheh page and the careers page. Design, Dev and Content build it together and release it in phases.",
      memos: [
        {
          tone: "yellow",
          title: "Weekly Security Audit",
          text: "Review the vulnerability scan before the Q4 release. All high-priority issues must be fixed by Friday.",
          meta: "Oct 13 · Nguyen Thuy Huong",
        },
        {
          tone: "green",
          title: "Meeting: Online with Mr. Han",
          text: "Participants: @Dung Tran, @Dream · Oct 16 14:00 · EAM connection",
          meta: "Oct 13 · Tran Van Dung",
        },
      ],
      upcoming: [
        { left: "1 day left", title: "Product screenshots" },
        { left: "2 days left", title: "Balheh page copy" },
        { left: "3 days left", title: "Korean translation" },
      ],
      overdue: [
        { left: "3 days overdue", title: "Build the product page" },
        { left: "1 day overdue", title: "Speed check" },
        { left: "Overdue today", title: "Mobile layout" },
      ],
      demo: {
        title: "Sprint review",
        text: "Friday 3 PM in meeting room 2, whole team.",
        toast: "Memo created",
        just: "Just now",
      },
    },
  },
};
