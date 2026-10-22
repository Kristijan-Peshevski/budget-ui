export type Lang = "mk" | "sq" | "en";

export interface Dict {
  title: string;
  sub: string;
  firstName: string;
  firstNamePlaceholder: string;
  lastName: string;
  lastNamePlaceholder: string;
  email: string;
  emailPlaceholder: string;
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
    firstName: "Име",
    firstNamePlaceholder: "пр. Кристијан",
    lastName: "Презиме",
    lastNamePlaceholder: "пр. Пешевски",
    email: "Службена е-пошта (Email)",
    emailPlaceholder: "kristijan.p@mioa.gov.mk",
    pass: "Лозинка (Password)",
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
    ok: "Успешна регистрација! Податоците се подготвени за Back-End.",
  },
  sq: {
    title: "Regjistrimi",
    sub: "Krijoni një llogari të re zyrtare për qasje në sistem.",
    firstName: "Emri",
    firstNamePlaceholder: "p.sh. Kristijan",
    lastName: "Mbiemri",
    lastNamePlaceholder: "p.sh. Peshevski",
    email: "Posta elektronike zyrtare (Email)",
    emailPlaceholder: "kristijan.p@mioa.gov.mk",
    pass: "Fjalëkalimi (Password)",
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
    ok: "Regjistrimi i suksesshëm! Të dhënat janë gati për Back-End.",
  },
  en: {
    title: "Registration",
    sub: "Create a new institutional account to access the system.",
    firstName: "First Name",
    firstNamePlaceholder: "e.g. Kristijan",
    lastName: "Last Name",
    lastNamePlaceholder: "e.g. Peshevski",
    email: "Official Email",
    emailPlaceholder: "kristijan.p@mioa.gov.mk",
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
    ok: "Registration successful! Ready for Back-End API.",
  },
};
