import { useState, type FormEvent, useEffect } from "react";
import govLogo from "../../assets/gov-logo.png";
import { T, LANGS, type Lang } from "./registerI18n";
import "./register.css";

export type UserRole = "ADMIN" | "USER";

export interface UserRegistrationPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

interface RegisterPageProps {
  onNavigateToLogin?: () => void;
  onRegisterSuccess?: (userData: UserRegistrationPayload) => void;
}

export default function RegisterPage({ onNavigateToLogin, onRegisterSuccess }: RegisterPageProps) {
  const [lang, setLang] = useState<Lang>("mk");
  const t = T[lang];

  // Core user fields strictly aligned with User entity
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password || !confirmPassword) {
      setStatus("err");
      setErrorMsg(t.errRequired);
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setStatus("err");
      setErrorMsg(t.errEmailInvalid);
      return;
    }

    if (password !== confirmPassword) {
      setStatus("err");
      setErrorMsg(t.errPassMismatch);
      return;
    }

    setStatus("ok");
    setErrorMsg("");

    // Automatically assign standard "USER" role for self-registration (security best practice)
    const payload: UserRegistrationPayload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password,
      role: "USER",
    };

    console.log("Ready to send to Spring Boot backend controller:", payload);

    if (onRegisterSuccess) {
      setTimeout(() => {
        onRegisterSuccess(payload);
      }, 1200);
    }
  };

  return (
    <div className="register-layout">
      {/* Left side: Official Ministry Emblem and Titles */}
      <div className="register-brand">
        <img
          src={govLogo}
          alt="Република Северна Македонија – Министерство за дигитална трансформација"
        />
      </div>

      {/* Right side: Modern Registration Card */}
      <main className="register-main">
        <div className="register-card">
          <h1 className="register-title">{t.title}</h1>
          <p className="register-sub">{t.sub}</p>

          <form onSubmit={handleSubmit} noValidate>
            {/* First Name & Last Name (Grid of 2) */}
            <div className="register-grid-2">
              <div>
                <label className="register-label" htmlFor="reg-firstname">{t.firstName}</label>
                <div className="register-field">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="4.5" />
                    <path d="M3.5 21c0-4.5 3.8-7 8.5-7s8.5 2.5 8.5 7z" />
                  </svg>
                  <input
                    id="reg-firstname"
                    name="firstName"
                    autoComplete="given-name"
                    placeholder={t.firstNamePlaceholder}
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="register-label" htmlFor="reg-lastname">{t.lastName}</label>
                <div className="register-field">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="4.5" />
                    <path d="M3.5 21c0-4.5 3.8-7 8.5-7s8.5 2.5 8.5 7z" />
                  </svg>
                  <input
                    id="reg-lastname"
                    name="lastName"
                    autoComplete="family-name"
                    placeholder={t.lastNamePlaceholder}
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <label className="register-label" htmlFor="reg-email">{t.email}</label>
            <div className="register-field">
              <svg viewBox="0 0 24 24">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              <input
                id="reg-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={t.emailPlaceholder}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <label className="register-label" htmlFor="reg-pass">{t.pass}</label>
            <div className="register-field">
              <svg viewBox="0 0 24 24">
                <rect x="4.5" y="10.5" width="15" height="10.5" rx="2" />
                <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
              </svg>
              <input
                id="reg-pass"
                name="password"
                type={showPass ? "text" : "password"}
                autoComplete="new-password"
                placeholder={t.passPlaceholder}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="register-eye"
                aria-label={showPass ? "Hide password" : "Show password"}
                onClick={() => setShowPass((s) => !s)}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z" />
                  <circle cx="12" cy="12" r="3.2" />
                </svg>
              </button>
            </div>

            {/* Confirm Password */}
            <label className="register-label" htmlFor="reg-confirm-pass">{t.confirmPass}</label>
            <div className="register-field">
              <svg viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <input
                id="reg-confirm-pass"
                name="confirmPassword"
                type={showConfirmPass ? "text" : "password"}
                autoComplete="new-password"
                placeholder={t.confirmPassPlaceholder}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="register-eye"
                aria-label={showConfirmPass ? "Hide password" : "Show password"}
                onClick={() => setShowConfirmPass((s) => !s)}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z" />
                  <circle cx="12" cy="12" r="3.2" />
                </svg>
              </button>
            </div>

            {/* Terms checkbox */}
            <div className="register-row">
              <label className="register-terms">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                />
                <span>{t.acceptTerms}</span>
              </label>
            </div>

            {/* Submit Button */}
            <button className="register-btn" type="submit">
              <span>{t.registerBtn}</span>
              <span aria-hidden="true">➔</span>
            </button>

            {/* Back to Login link */}
            <div className="register-footer-link">
              <span>{t.alreadyHaveAccount} </span>
              <button
                type="button"
                onClick={() => {
                  if (onNavigateToLogin) onNavigateToLogin();
                }}
              >
                {t.loginLink}
              </button>
            </div>

            {/* Status message */}
            {(status === "err" || status === "ok") && (
              <p
                className={`register-msg ${status === "err" ? "err" : "ok"}`}
                role="status"
              >
                {status === "ok" ? t.ok : errorMsg}
              </p>
            )}
          </form>
        </div>
      </main>

      {/* Language switcher (MK | SQ | EN) */}
      <div className="register-lang" role="group" aria-label="Language selector">
        {LANGS.map((l) => (
          <button
            key={l}
            type="button"
            aria-pressed={l === lang}
            onClick={() => setLang(l)}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
