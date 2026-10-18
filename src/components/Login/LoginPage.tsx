import { useState, type FormEvent, useEffect } from "react";
import govLogo from "../../assets/gov-logo.png";
import { T, LANGS, type Lang } from "./loginI18n";
import "./login.css";

interface LoginPageProps {
  onLoginSuccess?: (username: string) => void;
  onNavigateToRegister?: () => void;
}

export default function LoginPage({ onLoginSuccess, onNavigateToRegister }: LoginPageProps) {
  const [lang, setLang] = useState<Lang>("mk");
  const t = T[lang];

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.trim() && password) {
      setStatus("ok");
      if (onLoginSuccess) {
        setTimeout(() => {
          onLoginSuccess(username);
        }, 800);
      }
    } else {
      setStatus("err");
    }
  };

  const message = status === "ok" ? t.ok : status === "err" ? t.err : "";

  return (
    <div className="login-layout">
      {/* Brand logo left */}
      <div className="login-brand">
        <img
          src={govLogo}
          alt="Република Северна Македонија – Министерство за дигитална трансформација"
        />
      </div>

      {/* Main card right */}
      <main className="login-main">
        <div className="login-card">
          <h1>{t.title}</h1>
          <p className="sub">{t.sub}</p>

          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="u">{t.user}</label>
            <div className="login-field">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4.5" />
                <path d="M3.5 21c0-4.5 3.8-7 8.5-7s8.5 2.5 8.5 7z" />
              </svg>
              <input
                id="u"
                name="username"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <label htmlFor="p">{t.pass}</label>
            <div className="login-field">
              <svg viewBox="0 0 24 24">
                <rect x="4.5" y="10.5" width="15" height="10.5" rx="2" />
                <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
              </svg>
              <input
                id="p"
                name="password"
                type={showPass ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="login-eye"
                aria-label={showPass ? "Hide password" : "Show password"}
                onClick={() => setShowPass((s) => !s)}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z" />
                  <circle cx="12" cy="12" r="3.2" />
                </svg>
              </button>
            </div>

            <div className="login-row">
              <label>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span>{t.remember}</span>
              </label>
              <a href="#" onClick={(e) => { e.preventDefault(); alert("Контактирајте го вашиот системски администратор за ресетирање на лозинка."); }}>
                {t.forgot}
              </a>
            </div>

            <button className="login-btn" type="submit">
              <span>{t.login}</span>
              <span aria-hidden="true">➔</span>
            </button>

            {/* Link to Registration */}
            <div className="login-footer-link">
              <span>{t.noAccount} </span>
              <button
                type="button"
                onClick={() => {
                  if (onNavigateToRegister) onNavigateToRegister();
                }}
              >
                {t.registerLink}
              </button>
            </div>

            {message && (
              <p className={`login-msg ${status === "err" ? "err" : "ok"}`} role="status">
                {message}
              </p>
            )}
          </form>
        </div>
      </main>

      {/* Language Switcher */}
      <div className="login-lang" role="group" aria-label="Language">
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
