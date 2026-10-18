export type Lang = "mk" | "sq" | "en";

export interface Dict {
  title: string;
  sub: string;
  fullName: string;
  fullNamePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  institution: string;
  institutionPlaceholder: string;
  user: string;
  userPlaceholder: string;
  pass: string;
  passPlaceholder: string;
  confirmPass: string;
  confirmPassPlaceholder: string;
  acceptTerms: string;
  registerBtn: string;
  alreadyHaveAccount: string;
  loginLink: string;
  errRequired: string;
  errPassMismatch: string;
  errEmailInvalid: string;
  ok: string;
}

export const LANGS: Lang[] = ["mk", "sq", "en"];

export const T: Record<Lang, Dict> = {
  mk: {
    title: "Регистрација",
    sub: "Креирајте нов службен кориснички профил за пристап.",
    fullName: "Име и Презиме",
    fullNamePlaceholder: "пр. Кристијан Пешевски",
    email: "Службена е-пошта",
    emailPlaceholder: "kristijan.p@mioa.gov.mk",
    institution: "Институција / Орган",
    institutionPlaceholder: "Министерство за дигитална трансформација",
    user: "Корисничко име",
    userPlaceholder: "kpeshevski",
    pass: "Лозинка",
    passPlaceholder: "Внесете лозинка",
    confirmPass: "Потврди лозинка",
    confirmPassPlaceholder: "Повторете ја лозинката",
    acceptTerms: "Се согласувам со правилата и условите за службено користење.",
    registerBtn: "Регистрирај се",
    alreadyHaveAccount: "Веќе имате профил?",
    loginLink: "Најави се",
    errRequired: "Ве молиме пополнете ги сите задолжителни полиња.",
    errPassMismatch: "Лозинките не се совпаѓаат.",
    errEmailInvalid: "Внесете валидна е-пошта.",
    ok: "Успешна регистрација! Профилот е креиран (демо приказ).",
  },
  sq: {
    title: "Regjistrimi",
    sub: "Krijoni një llogari të re zyrtare për qasje në sistem.",
    fullName: "Emri dhe Mbiemri",
    fullNamePlaceholder: "p.sh. Kristijan Peshevski",
    email: "Posta elektronike zyrtare",
    emailPlaceholder: "kristijan.p@mioa.gov.mk",
    institution: "Institucioni / Organi",
    institutionPlaceholder: "Ministria e Transformimit Digjital",
    user: "Emri i përdoruesit",
    userPlaceholder: "kpeshevski",
    pass: "Fjalëkalimi",
    passPlaceholder: "Vendosni fjalëkalimin",
    confirmPass: "Konfirmo fjalëkalimin",
    confirmPassPlaceholder: "Përsëritni fjalëkalimin",
    acceptTerms: "Pajtohem me rregullat dhe kushtet e përdorimit zyrtar.",
    registerBtn: "Regjistrohu",
    alreadyHaveAccount: "Keni tashmë një llogari?",
    loginLink: "Hyr",
    errRequired: "Ju lutemi plotësoni të gjitha fushat e kërkuara.",
    errPassMismatch: "Fjalëkalimet nuk përputhen.",
    errEmailInvalid: "Vendosni një email të vlefshëm.",
    ok: "Regjistrimi i suksesshëm! Llogaria u krijua (version demo).",
  },
  en: {
    title: "Registration",
    sub: "Create a new institutional account to access the system.",
    fullName: "Full Name",
    fullNamePlaceholder: "e.g. Kristijan Peshevski",
    email: "Official Email",
    emailPlaceholder: "kristijan.p@mioa.gov.mk",
    institution: "Institution / Department",
    institutionPlaceholder: "Ministry of Digital Transformation",
    user: "Username",
    userPlaceholder: "kpeshevski",
    pass: "Password",
    passPlaceholder: "Enter password",
    confirmPass: "Confirm Password",
    confirmPassPlaceholder: "Repeat password",
    acceptTerms: "I agree to the terms and institutional access policy.",
    registerBtn: "Register",
    alreadyHaveAccount: "Already have an account?",
    loginLink: "Log in",
    errRequired: "Please fill in all required fields.",
    errPassMismatch: "Passwords do not match.",
    errEmailInvalid: "Please enter a valid email address.",
    ok: "Registration successful! Account created (demo preview).",
  },
};
