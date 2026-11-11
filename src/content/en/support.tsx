import type { SupportContent, SupportProduct } from "@/content/support-types";

import { BALHEH } from "./balheh";

export const SUPPORT: SupportContent = {
  kicker: "Help center",
  title: "How can BizTown help?",
  lead: "Write to us if you need help — we normally reply within 72 hours.",
  channels: {
    email: { label: "Send an email", desc: "biztownofficial@townsoftvina.com" },
    zalo: { label: "Message on Zalo", desc: "BizTown's Zalo Official Account" },
    contact: { label: "Contact page", desc: "Leave a message and we'll call back" },
  },
  provider: "Provider: Townsoft Vina Co., Ltd.",
  tipsTitle: "To get help faster",
  tips: [
    "Name the product you use (NhàLo, Balheh…)",
    "Include your account phone number or email",
    "Briefly describe the problem, with a screenshot if you can",
  ],
  productsTitle: "Help by product",
  productsLabel: "Choose a product",
  statusLabels: { live: "Live", soon: "Coming soon" },
  faqTitle: "Frequently asked questions",
};

export const SUPPORT_PRODUCTS: SupportProduct[] = [
  {
    key: "nhalo",
    name: "NhàLo",
    mark: { logo: "nhalo" },
    status: "live",
    intro: "Rental property management app for iOS and Android.",
    links: [
      { label: "User guide", page: "nhaloGuide" },
      { label: "FAQ & bug reports", page: "nhaloHelp" },
      { label: "Privacy policy", page: "privacy" },
      { label: "Delete your account", page: "deleteAccount" },
    ],
    faqs: [
      {
        q: "I forgot my password",
        a: "On the sign-in screen tap Forgot password, enter your account phone number, enter the code sent to you, then set a new password.",
      },
      {
        q: "Do tenants need to install the app?",
        a: "No. Tenants don't have accounts in the app. They just receive bills by SMS, email or Zalo, with a QR code for bank transfer.",
      },
      {
        q: "Why can't I create a bill for a room?",
        a: "A bill can only be created once the room has meter readings for that period. Record the readings first, then create the bill.",
      },
      {
        q: "Can someone else manage a property for me?",
        a: "Yes. Go to Profile → Manager accounts and add the manager's phone number. Access is granted per property, so you never share your own account.",
      },
      {
        q: "Where do I change the app language?",
        a: "Go to Profile, Language, and choose EN, VI or KO.",
      },
      {
        q: "I want to delete my account",
        a: "See the Delete your account page (shortcut above).",
      },
    ],
  },
  {
    key: "balheh",
    name: "Balheh",
    mark: { logo: "balheh" },
    status: "live",
    intro: "Web-based project management — mobile app coming soon.",
    links: [{ label: "About Balheh", page: "balheh" }],
    faqs: BALHEH.faq.items,
  },
  {
    key: "chinchu",
    name: "Chinchu",
    mark: { logo: "chinchu" },
    status: "soon",
    intro: "Owner-listed rentals, verified through NhàLo.",
    links: [],
    faqs: [],
    soon: "Chinchu is coming soon. Help articles will be published at launch — for questions now, email or message BizTown on Zalo.",
  },
  {
    key: "custom",
    name: "Custom web & apps",
    mark: { code: "</>", tone: "navy" },
    status: "live",
    intro: "Support for websites and apps Townsoft Vina built for you.",
    links: [{ label: "Townsoft Vina services", href: "https://townsoftvina.com" }],
    faqs: [
      {
        q: "Where do I report a problem with a live system?",
        a: "Email us with the project name, a description of the issue and a screenshot. The project team will get back to you.",
      },
      {
        q: "I want new features or an upgrade",
        a: "Leave a request on the Contact page or by email. We'll advise on scope, timeline and cost before starting.",
      },
      {
        q: "Is maintenance included after handover?",
        a: "Yes. Maintenance period and scope follow each project's contract.",
      },
    ],
  },
];
