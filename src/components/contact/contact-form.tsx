"use client";

import { useId, useRef, useState, type FormEvent } from "react";

import { Icon } from "@/components/ui/icon";
import type { ContactContent } from "@/content/contact-types";
import type { Locale } from "@/i18n/config";
import {
  CONTACT_FIELDS,
  CONTACT_MAX_LENGTH,
  CONTACT_OPTIONAL,
  validateContact,
  type ContactErrorCode,
  type ContactErrors,
  type ContactField,
  type ContactValues,
} from "@/lib/contact-form";
import { cn } from "@/lib/utils";

/** Route handler src/app/api/contact/route.ts — có "/" cuối vì trailingSlash: true. */
const CONTACT_ENDPOINT = "/api/contact/";

const EMPTY: ContactValues = { name: "", company: "", email: "", phone: "", message: "" };

type Status = "idle" | "sending" | "success" | "rateLimited" | "failed";

const INPUT_TYPES: Partial<Record<ContactField, { type: string; autoComplete: string }>> = {
  name: { type: "text", autoComplete: "name" },
  company: { type: "text", autoComplete: "organization" },
  email: { type: "email", autoComplete: "email" },
  phone: { type: "tel", autoComplete: "tel" },
};

type FormContent = ContactContent["form"];

function errorText(errors: FormContent["errors"], field: ContactField, code: ContactErrorCode) {
  if (code === "invalid") return field === "phone" ? errors.phoneInvalid : errors.emailInvalid;
  return errors[code];
}

/**
 * Form liên hệ: kiểm tra ngay trên trình duyệt (cùng hàm với server), gửi JSON tới
 * /api/contact/, hiện lỗi theo ô (400), gửi quá nhiều (429) hoặc lỗi chung (mạng/5xx).
 */
export function ContactForm({
  content,
  locale,
  email,
}: {
  content: FormContent;
  locale: Locale;
  email: string;
}) {
  const baseId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [website, setWebsite] = useState("");

  const id = (field: string) => `${baseId}-${field}`;

  function update(field: ContactField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    // Sửa ô đang báo lỗi thì ẩn lỗi đi, kiểm lại khi bấm gửi.
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function focusFirstError(next: ContactErrors) {
    const first = CONTACT_FIELDS.find((field) => next[field]);
    if (first) formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(first))}`)?.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const checked = validateContact({ ...values, locale, website });
    if (Object.keys(checked.errors).length > 0) {
      setErrors(checked.errors);
      setStatus("idle");
      focusFirstError(checked.errors);
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale, website }),
      });

      if (response.ok) {
        setValues(EMPTY);
        setErrors({});
        setStatus("success");
        return;
      }
      if (response.status === 429) {
        setStatus("rateLimited");
        return;
      }
      if (response.status === 400) {
        const body = (await response.json().catch(() => null)) as { errors?: ContactErrors } | null;
        if (body?.errors && Object.keys(body.errors).length > 0) {
          setErrors(body.errors);
          setStatus("idle");
          focusFirstError(body.errors);
          return;
        }
      }
      setStatus("failed");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-start py-6 sm:py-10">
        <span className="flex size-14 items-center justify-center rounded-full bg-positive-bg text-positive">
          <Icon name="check" size={28} />
        </span>
        <h2 className="mt-6 text-[28px] leading-9 font-semibold tracking-[-0.6px] text-ink">
          {content.status.successTitle}
        </h2>
        <p className="mt-3 max-w-[460px] text-[17px] leading-7 text-ink-muted">
          {content.status.successBody}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="bt-btn bt-btn-outline mt-8"
        >
          {content.status.again}
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} aria-busy={sending}>
      <h2 className="text-[26px] leading-9 font-semibold tracking-[-0.6px] text-ink">
        {content.title}
      </h2>

      <div className="mt-7 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
        {CONTACT_FIELDS.map((field) => {
          const error = errors[field];
          const errorId = `${id(field)}-error`;
          const fieldContent = content.fields[field];
          const optional = CONTACT_OPTIONAL.has(field);
          const shared = {
            id: id(field),
            name: field,
            value: values[field],
            placeholder: fieldContent.placeholder,
            maxLength: CONTACT_MAX_LENGTH[field],
            required: !optional,
            disabled: sending,
            "aria-invalid": error ? true : undefined,
            "aria-describedby": error ? errorId : undefined,
            className: cn(
              "w-full rounded-2xl border border-line bg-card-soft px-4 py-3.5 text-[16px] leading-6 text-ink transition-[border-color,box-shadow,background-color] outline-none placeholder:text-ink-muted/70 focus:border-accent focus:bg-card focus:ring-4 focus:ring-accent/20 disabled:opacity-60",
              error && "border-danger focus:border-danger focus:ring-danger/15",
            ),
          };

          return (
            <div
              key={field}
              className={cn("flex flex-col", field === "message" && "sm:col-span-2")}
            >
              <label
                htmlFor={id(field)}
                className="mb-2 text-[15px] leading-5 font-semibold text-ink"
              >
                {fieldContent.label}
                {optional ? (
                  <span className="ml-1.5 font-normal text-ink-muted">{content.optional}</span>
                ) : (
                  <span aria-hidden="true" className="ml-0.5 text-accent-text">
                    *
                  </span>
                )}
              </label>
              {field === "message" ? (
                <textarea
                  {...shared}
                  rows={6}
                  onChange={(event) => update(field, event.target.value)}
                  className={cn(shared.className, "min-h-[160px] resize-y")}
                />
              ) : (
                <input
                  {...shared}
                  type={INPUT_TYPES[field]?.type}
                  autoComplete={INPUT_TYPES[field]?.autoComplete}
                  inputMode={field === "phone" ? "tel" : undefined}
                  onChange={(event) => update(field, event.target.value)}
                />
              )}
              <div className="mt-1.5 flex min-h-5 items-start justify-between gap-3 text-[14px] leading-5">
                {error ? (
                  <p id={errorId} className="text-danger">
                    {errorText(content.errors, field, error)}
                  </p>
                ) : (
                  <span />
                )}
                {field === "message" && (
                  <span className="shrink-0 text-ink-muted tabular-nums">
                    {values.message.length}/{CONTACT_MAX_LENGTH.message}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bẫy bot: người dùng không thấy, không tab tới; bot điền vào thì server bỏ qua. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input
          id={id("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>

      {(status === "failed" || status === "rateLimited") && (
        <p
          role="alert"
          className="mt-4 rounded-2xl bg-danger-soft px-4 py-3 text-[15px] leading-6 text-danger-deep"
        >
          {status === "rateLimited" ? (
            content.status.rateLimited
          ) : (
            <>
              {content.status.failed}{" "}
              <a href={`mailto:${email}`} className="font-semibold underline underline-offset-2">
                {email}
              </a>
            </>
          )}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[14px] leading-5 text-ink-muted sm:max-w-[320px]">{content.note}</p>
        <button
          type="submit"
          disabled={sending}
          className="bt-btn bt-btn-primary w-full disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto"
        >
          {sending ? content.sending : content.submit}
        </button>
      </div>
    </form>
  );
}
