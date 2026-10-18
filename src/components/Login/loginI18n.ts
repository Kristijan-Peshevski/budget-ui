export type Lang = "mk" | "sq" | "en";

export interface Dict {
  title: string;
  sub: string;
  user: string;
  pass: string;
  remember: string;
  forgot: string;
  login: string;
  noAccount: string;
  registerLink: string;
  err: string;
  ok: string;
}

export const LANGS: Lang[] = ["mk", "sq", "en"];

export const T: Record<Lang, Dict> = {
  mk: {
    title: "Најава",
    sub: "Внесете ги вашите податоци за пристап.",
    user: "Корисничко име",
    pass: "Лозинка",
    remember: "Запомни ме",
    forgot: "Заборавена лозинка?",
    login: "Најави се",
    noAccount: "Немате профил?",
    registerLink: "Регистрирај се",
    err: "Внесете корисничко име и лозинка.",
    ok: "Успешна најава! Се пренасочувате кон системот...",
  },
  sq: {
    title: "Hyrje",
    sub: "Futni të dhënat tuaja për qasje.",
    user: "Emri i përdoruesit",
    pass: "Fjalëkalimi",
    remember: "Më kujto",
    forgot: "Keni harruar fjalëkalimin?",
    login: "Hyr",
    noAccount: "Nuk keni një llogari?",
    registerLink: "Regjistrohu",
    err: "Futni emrin e përdoruesit dhe fjalëkalimin.",
    ok: "Hyrje e suksesshme! Po ridrejtoheni në sistem...",
  },
  en: {
    title: "Login",
    sub: "Enter your credentials to access.",
    user: "Username",
    pass: "Password",
    remember: "Remember me",
    forgot: "Forgot password?",
    login: "Log in",
    noAccount: "Don't have an account?",
    registerLink: "Register here",
    err: "Enter your username and password.",
    ok: "Login successful! Redirecting to dashboard...",
  },
};
