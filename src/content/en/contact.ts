import type { ContactContent } from "../contact-types";

export const CONTACT: ContactContent = {
  eyebrow: "Contact",
  title: ["Let's ", { kw: "talk" }, " about your business"],
  lead: "Need product advice, a custom website/app, or want to partner with us? Leave a few lines and the BizTown team will get back to you soon.",
  info: {
    emailLabel: "Email",
    addressLabel: "Address",
    companyLabel: "Operated by",
  },
  form: {
    title: "Send us a message",
    fields: {
      name: { label: "Full name", placeholder: "Jane Nguyen" },
      company: { label: "Company", placeholder: "Company / shop name" },
      email: { label: "Email", placeholder: "you@company.com" },
      phone: { label: "Phone number", placeholder: "+84 912 345 678" },
      message: { label: "Message", placeholder: "How can we help?" },
    },
    optional: "(optional)",
    submit: "Send message",
    sending: "Sending…",
    note: "We only use your details to get back to you and never share them with third parties.",
    errors: {
      required: "Please fill in this field.",
      emailInvalid: "Please enter a valid email address.",
      phoneInvalid: "Please enter a valid phone number (8–15 digits).",
      tooLong: "This is longer than allowed.",
    },
    status: {
      successTitle: "Message sent",
      successBody:
        "Thank you! The BizTown team has received your message and will get back to you soon.",
      again: "Send another message",
      rateLimited: "You've sent several messages in a row. Please try again in a few minutes.",
      failed: "We couldn't send your message. Please try again, or email us directly:",
    },
  },
};
