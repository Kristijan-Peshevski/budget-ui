import { useMemo, useState, type ReactNode } from "react"

import mdtLogo from "./assets/mdt-logo.jpg"

import RegisterPage from "./components/Register/RegisterPage"

import LoginPage from "./components/Login/LoginPage"

type IconName = "arrow" | "bell" | "calendar" | "chart" | "check" | "close" | "file" | "home" | "logout" | "more" | "plus" | "search" | "user" | "wallet"

function Icon({ name, size = 20 }: { name: IconName size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <path d="m9 18 6-6-6-6" />,

    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),

    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),

    chart: (
      <>
        <path d="M5 20V10M12 20V4M19 20v-7" />
        <path d="M3 20h18" />
      </>
    ),

    check: <path d="m5 12 4 4L19 6" />,

    close: <path d="m6 6 12 12M18 6 6 18" />,

    file: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M16 13H8M16 17H8" />
      </>
    ),

    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v11h14V10M9 21v-7h6v7" />
      </>
    ),

    logout: (
      <>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <path d="M21 12H9" />
      </>
    ),

    more: (
      <>
        <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
        <circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" />
      </>
    ),

    plus: <path d="M12 5v14M5 12h14" />,

    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),

    user: (
      <>
        <circle cx="12" cy="8" r="4.5" />
        <path d="M3.5 21c0-4.5 3.8-7 8.5-7s8.5 2.5 8.5 7z" />
      </>
    ),

    wallet: (
      <>
        <path d="M4 6h14a2 2 0 0 1 2 2v11H4a2 2 0 0 1-2-2V6a3 3 0 0 1 3-3h13v3" />
        <path d="M15 11h7v5h-7a2 2 0 0 1 0-5Z" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[name]}
    </svg>
  )
}

type Tab = "Dashboard" | "Contracts" | "Invoices"

type RecordStatus = "Активен" | "Завршен" | "На проверка" | "Одобрен" | "Платена"

interface Contract {
  id: string

  supplier: string

  subject: string

  period: string

  value: number

  invoiced: number

  status: "Активен" | "Завршен" | "На проверка"
}

interface Invoice {
  id: string

  contractId: string

  supplier: string

  date: string

  dueDate: string

  amount: number

  status: "На проверка" | "Одобрен" | "Платена"
}

const initialContracts: Contract[] = [
  {
    id: "ДОГ-2026-001",
    supplier: "MDT Enterprise Solutions",
    subject: "Cloud инфраструктура и одржување",
    period: "01.01.2026 – 31.12.2026",
    value: 4800000,
    invoiced: 1450000,
    status: "Активен",
  },

  {
    id: "ДОГ-2026-002",
    supplier: "Gov Tech Consulting",
    subject: "Развој и имплементација на систем",
    period: "15.03.2026 – 15.09.2026",
    value: 3250000,
    invoiced: 980000,
    status: "Активен",
  },

  {
    id: "ДОГ-2025-084",
    supplier: "Nordic Data Labs",
    subject: "Безбедносен аудит",
    period: "01.08.2025 – 28.02.2026",
    value: 1820000,
    invoiced: 1820000,
    status: "Завршен",
  },
]

const initialInvoices: Invoice[] = [
  {
    id: "ФАК-2026-104",
    contractId: "ДОГ-2026-001",
    supplier: "MDT Enterprise Solutions",
    date: "01.06.2026",
    dueDate: "30.06.2026",
    amount: 400000,
    status: "Платена",
  },

  {
    id: "ФАК-2026-098",
    contractId: "ДОГ-2026-002",
    supplier: "Gov Tech Consulting",
    date: "15.05.2026",
    dueDate: "15.06.2026",
    amount: 812500,
    status: "Платена",
  },

  {
    id: "ФАК-2026-112",
    contractId: "ДОГ-2026-001",
    supplier: "MDT Enterprise Solutions",
    date: "18.06.2026",
    dueDate: "18.07.2026",
    amount: 245000,
    status: "На проверка",
  },

  {
    id: "ФАК-2026-087",
    contractId: "ДОГ-2025-084",
    supplier: "Nordic Data Labs",
    date: "12.02.2026",
    dueDate: "12.03.2026",
    amount: 610000,
    status: "Одобрен",
  },
]

const formatMkd = (amount: number) =>
  `${amount.toLocaleString("mk-MK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} МКД`

const toDateInputValue = (value: string) => {
  const match = value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/)
  return match ? `${match[3]}-${match[2]}-${match[1]}` : value
}

const toDisplayDate = (value: string) => {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  return match ? `${match[3]}.${match[2]}.${match[1]}` : value
}

function StatusBadge({ status }: { status: RecordStatus }) {
  const tone =
    status === "Активен" || status === "Платена"
      ? "bg-lime-soft text-lime-deep"
      : status === "На проверка"
        ? "bg-peach-soft text-peach-deep"
        : status === "Одобрен"
          ? "bg-blue-soft text-blue-deep"
          : "bg-stone text-muted"

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${tone}`}
    >
      {status}
    </span>
  )
}

function Button({
  children,
  className = "",
  onClick,
  ariaLabel,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
  ariaLabel?: string
}) {
  return (
    <button
      aria-label={ariaLabel}
      className={className}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}

function Modal({
  title,
  children,
  onClose,
}: {
  title: string
  children: ReactNode
  onClose: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/45 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={onClose}
    >
      <section
        aria-modal="true"
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] bg-white p-5 shadow-modal sm:rounded-[2rem] sm:p-7"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="mb-5 flex items-start justify-between gap-5">
          <div>
            <h2 className="text-xl font-semibold text-ink">{title}</h2>
            <p className="mt-1 text-sm text-muted">
              Преглед на поврзани службени записи.
            </p>
          </div>
          <Button
            ariaLabel="Затвори"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-stone text-muted hover:text-ink"
            onClick={onClose}
          >
            <Icon name="close" size={17} />
          </Button>
        </div>
        {children}
      </section>
    </div>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("Dashboard")

  const [authView, setAuthView] = useState<"app" | "login" | "register">("app")

  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null,
  )

  const [contracts, setContracts] = useState(initialContracts)

  const [invoices, setInvoices] = useState(initialInvoices)

  const [contractModalOpen, setContractModalOpen] = useState(false)

  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false)

  const [query, setQuery] = useState("")

  const [invoiceStatus, setInvoiceStatus] =
    useState<"Сите" | Invoice["status"]>("Сите")

  const [saved, setSaved] = useState(false)
  const [newInvoiceNumber, setNewInvoiceNumber] = useState("")
  const [newInvoiceContract, setNewInvoiceContract] = useState("")
  const [newInvoiceAmount, setNewInvoiceAmount] = useState("")
  const [newInvoiceDate, setNewInvoiceDate] = useState("")
  const [newInvoiceDueDate, setNewInvoiceDueDate] = useState("")
  const [invoiceFormError, setInvoiceFormError] = useState("")
  const [editingInvoiceId, setEditingInvoiceId] = useState<string | null>(null)
  const [newContractNumber, setNewContractNumber] = useState("")
  const [newContractSupplier, setNewContractSupplier] = useState("")
  const [newContractSubject, setNewContractSubject] = useState("")
  const [newContractPeriod, setNewContractPeriod] = useState("")
  const [newContractValue, setNewContractValue] = useState("")
  const [contractFormError, setContractFormError] = useState("")

  const filteredContracts = useMemo(
    () =>
      contracts.filter((item) =>
        `${item.id} ${item.supplier} ${item.subject}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  )

  const filteredInvoices = useMemo(
    () =>
      invoices.filter((item) => {
        const matchesQuery = `${item.id} ${item.supplier} ${item.contractId}`
          .toLowerCase()
          .includes(query.toLowerCase())

        return (
          matchesQuery &&
          (invoiceStatus === "Сите" || item.status === invoiceStatus)
        )
      }),
    [invoices, invoiceStatus, query],
  )

  const totalContracted = contracts.reduce((sum, item) => sum + item.value, 0)

  const totalInvoiced = invoices.reduce((sum, item) => sum + item.amount, 0)

  const resetInvoiceForm = () => {
    setNewInvoiceNumber("")
    setNewInvoiceContract("")
    setNewInvoiceAmount("")
    setNewInvoiceDate("")
    setNewInvoiceDueDate("")
    setInvoiceFormError("")
    setEditingInvoiceId(null)
  }

  const resetContractForm = () => {
    setNewContractNumber("")
    setNewContractSupplier("")
    setNewContractSubject("")
    setNewContractPeriod("")
    setNewContractValue("")
    setContractFormError("")
  }

  const saveContractDraft = () => {
    const value = Number(newContractValue.replace(",", "."))
    const contractNumber = newContractNumber.trim()
    if (
      !contractNumber ||
      !newContractSupplier.trim() ||
      !newContractSubject.trim() ||
      !newContractPeriod.trim() ||
      !Number.isFinite(value) ||
      value <= 0 ||
      contracts.some((contract) => contract.id === contractNumber)
    ) {
      setContractFormError(
        "Внесете уникален број, добавувач, предмет, период и валидна вредност поголема од нула.",
      )
      return
    }

    setContracts((items) => [
      {
        id: contractNumber,
        supplier: newContractSupplier.trim(),
        subject: newContractSubject.trim(),
        period: newContractPeriod.trim(),
        value,
        invoiced: 0,
        status: "На проверка",
      },
      ...items,
    ])
    setContractModalOpen(false)
    resetContractForm()
  }

  const openInvoiceEditor = (invoice: Invoice) => {
    setEditingInvoiceId(invoice.id)
    setNewInvoiceNumber(invoice.id)
    setNewInvoiceContract(invoice.contractId)
    setNewInvoiceAmount(String(invoice.amount))
    setNewInvoiceDate(toDateInputValue(invoice.date))
    setNewInvoiceDueDate(toDateInputValue(invoice.dueDate))
    setInvoiceFormError("")
    setInvoiceModalOpen(true)
  }

  const saveInvoiceDraft = () => {
    const amount = Number(newInvoiceAmount.replace(",", "."))
    const contract = contracts.find((item) => item.id === newInvoiceContract)
    if (
      !newInvoiceNumber.trim() ||
      !contract ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      setInvoiceFormError(
        "Внесете број, активен договор и валиден износ поголем од нула.",
      )
      return
    }

    setInvoices((items) => {
      const updatedInvoice: Invoice = {
        id: newInvoiceNumber.trim(),
        contractId: contract.id,
        supplier: contract.supplier,
        date: newInvoiceDate ? toDisplayDate(newInvoiceDate) : "Нацрт",
        dueDate: newInvoiceDueDate
          ? toDisplayDate(newInvoiceDueDate)
          : "Не е внесено",
        amount,
        status:
          items.find((item) => item.id === editingInvoiceId)?.status ??
          "На проверка",
      }

      if (editingInvoiceId) {
        return items.map((item) =>
          item.id === editingInvoiceId ? updatedInvoice : item,
        )
      }

      return [updatedInvoice, ...items]
    })
    setSaved(true)
    window.setTimeout(() => {
      setSaved(false)
      resetInvoiceForm()
      setInvoiceModalOpen(false)
    }, 800)
  }

  if (authView === "login") {
    return (
      <LoginPage
        onLoginSuccess={() => setAuthView("app")}
        onNavigateToRegister={() => setAuthView("register")}
      />
    )
  }

  if (authView === "register") {
    return (
      <RegisterPage
        onNavigateToLogin={() => setAuthView("login")}
        onRegisterSuccess={() => setAuthView("app")}
      />
    )
  }

  const navigation: { id: Tab label: string icon: IconName }[] = [
    { id: "Dashboard", label: "Преглед", icon: "home" },

    { id: "Contracts", label: "Договори", icon: "file" },

    { id: "Invoices", label: "Фактури", icon: "wallet" },
  ]

  const pageTitle =
    activeTab === "Dashboard"
      ? "Преглед на буџетот"
      : activeTab === "Contracts"
        ? "Договори"
        : "Фактури"

  const pageDescription =
    activeTab === "Dashboard"
      ? "Следете ја реализацијата на договорите, фактурите и буџетските средства."
      : activeTab === "Contracts"
        ? "Централен регистар на договори и нивната реализација."
        : "Регистар на фактури поврзани со активни и завршени договори."

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-canvas text-ink font-sans">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-line bg-white px-3 shadow-xs sm:px-6">
        <div className="flex items-center gap-3">
          <img
            alt="Министерство за дигитална трансформација"
            className="h-9 w-auto max-w-[190px] object-contain"
            src={mdtLogo}
          />
          <span className="hidden border-l border-line pl-3 text-xs font-semibold text-muted sm:block">
            Регистар на буџетска реализација
          </span>
        </div>
        <div className="flex h-10 items-center gap-2 sm:gap-4">
          <Button
            ariaLabel="Известувања"
            className="hidden size-10 place-items-center rounded-xl text-muted hover:bg-stone hover:text-ink sm:grid"
          >
            <Icon name="bell" size={19} />
          </Button>
          <p className="hidden max-w-[180px] truncate text-sm font-semibold leading-none sm:block">
            Кристијан Пешевски
          </p>
          <Button
            className="flex h-10 items-center gap-1.5 rounded-xl border border-line bg-stone px-2.5 text-xs font-semibold hover:border-peach-deep hover:bg-peach-soft hover:text-peach-deep"
            onClick={() => setAuthView("login")}
          >
            <Icon name="logout" size={14} />
            <span className="hidden sm:inline">Одјави се</span>
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="group relative z-30 hidden w-16 shrink-0 flex-col border-r border-line bg-white p-2.5 shadow-xs transition-[width] duration-300 hover:w-60 sm:flex">
          <nav className="space-y-1.5">
            {navigation.map((item) => (
              <Button
                key={item.id}
                className={`flex w-full items-center overflow-hidden whitespace-nowrap rounded-xl p-3 text-sm font-semibold transition ${
                  activeTab === item.id
                    ? "bg-lime-soft text-lime-deep shadow-sm"
                    : "text-muted hover:bg-stone hover:text-ink"
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="shrink-0">
                  <Icon name={item.icon} size={20} />
                </span>
                <span className="ml-3 opacity-0 transition-opacity group-hover:opacity-100">
                  {item.label}
                </span>
              </Button>
            ))}
          </nav>
          <div className="mt-auto border-t border-line pt-3">
            <Button
              className="flex w-full items-center overflow-hidden whitespace-nowrap rounded-xl bg-ink p-3 text-xs font-semibold text-white transition hover:bg-ink-soft"
              onClick={() => setInvoiceModalOpen(true)}
            >
              <span className="shrink-0">
                <Icon name="plus" size={18} />
              </span>
              <span className="ml-2 opacity-0 transition-opacity group-hover:opacity-100">
                Регистрирај фактура
              </span>
            </Button>
          </div>
        </aside>

        <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-line bg-white/95 px-2 py-2 shadow-lg backdrop-blur-md sm:hidden">
          {navigation.map((item) => (
            <Button
              key={item.id}
              className={`flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-[10px] font-semibold ${
                activeTab === item.id ? "text-lime-deep" : "text-muted"
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon name={item.icon} size={20} />
              <span>{item.label}</span>
            </Button>
          ))}
          <Button
            className="flex flex-col items-center gap-1 text-[10px] font-semibold text-ink"
            onClick={() => setInvoiceModalOpen(true)}
          >
            <span className="grid size-6 place-items-center rounded-full bg-lime">
              <Icon name="plus" size={14} />
            </span>
            <span>Нова фактура</span>
          </Button>
        </nav>

        <main className="flex-1 overflow-y-auto bg-canvas p-3 pb-24 sm:p-6 sm:pb-8 md:p-8">
          <div className="mx-auto max-w-6xl space-y-5 sm:space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-lime-deep">
                  Министерство за дигитална трансформација
                </p>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {pageTitle}
                </h1>
                <p className="mt-1 text-sm text-muted">{pageDescription}</p>
              </div>
              {activeTab !== "Dashboard" && (
                <div className="flex w-full items-center rounded-2xl border border-line bg-white px-3 py-2 sm:w-72">
                  <Icon name="search" size={17} />
                  <input
                    aria-label="Пребарај регистар"
                    className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-muted"
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Пребарај регистар..."
                    value={query}
                  />
                </div>
              )}
            </div>

            {activeTab === "Dashboard" && (
              <>
                <div className="flex items-center justify-between rounded-2xl border border-line bg-white px-4 py-3">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Icon name="calendar" size={17} /> Фискална 2026 година
                  </div>
                  <span className="text-xs text-muted">
                    Последно освежување: денес, 10:42
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["Одобрен буџет", totalContracted, "file"],
                    ["Договорени средства", totalContracted, "chart"],
                    ["Фактурирано", totalInvoiced, "wallet"],
                    ["Преостанато", totalContracted - totalInvoiced, "check"],
                  ].map(([label, amount, icon]) => (
                    <div
                      className="rounded-3xl border border-line bg-white p-5 shadow-card"
                      key={label as string}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-muted">
                          {label}
                        </p>
                        <span className="grid size-9 place-items-center rounded-xl bg-stone text-lime-deep">
                          <Icon name={icon as IconName} size={18} />
                        </span>
                      </div>
                      <p className="mt-4 text-xl font-bold tracking-tight">
                        {formatMkd(amount as number)}
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        {label === "Преостанато"
                          ? "Достапни средства за реализација"
                          : "Фискална 2026 година"}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
                  <section className="rounded-3xl border border-line bg-white p-5 shadow-card sm:p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-lg font-semibold">
                          Реализација на буџетот
                        </h2>
                        <p className="mt-1 text-xs text-muted">
                          Однос помеѓу договорените и фактурираните средства
                        </p>
                      </div>
                      <span className="text-lg font-bold text-lime-deep">
                        {Math.round((totalInvoiced / totalContracted) * 100)}%
                      </span>
                    </div>
                    <div className="mt-6 h-4 overflow-hidden rounded-full bg-stone">
                      <div
                        className="h-full rounded-full bg-lime"
                        style={{
                          width: `${Math.min(100, (totalInvoiced / totalContracted) * 100)}%`,
                        }}
                      />
                    </div>
                    <div className="mt-4 flex justify-between text-xs text-muted">
                      <span>Фактурирано: {formatMkd(totalInvoiced)}</span>
                      <span>Вкупно: {formatMkd(totalContracted)}</span>
                    </div>
                  </section>
                  <section className="rounded-3xl border border-line bg-white p-5 shadow-card sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold">
                          Потребно внимание
                        </h2>
                        <p className="mt-1 text-xs text-muted">
                          Записи што бараат следен чекор
                        </p>
                      </div>
                      <Icon name="bell" size={19} />
                    </div>
                    <button
                      className="mt-5 flex w-full items-center justify-between rounded-2xl bg-peach-soft p-3 text-left text-sm text-peach-deep"
                      onClick={() => {
                        setActiveTab("Invoices")
                        setInvoiceStatus("На проверка")
                      }}
                      type="button"
                    >
                      <span>
                        <strong>1</strong> фактура на проверка
                      </span>
                      <Icon name="arrow" size={16} />
                    </button>
                    <button
                      className="mt-2 flex w-full items-center justify-between rounded-2xl bg-stone p-3 text-left text-sm"
                      onClick={() => setActiveTab("Contracts")}
                      type="button"
                    >
                      <span>
                        <strong>2</strong> активни договори
                      </span>
                      <Icon name="arrow" size={16} />
                    </button>
                  </section>
                </div>
                <section className="rounded-3xl border border-line bg-white shadow-card">
                  <div className="flex items-center justify-between border-b border-line p-5 sm:p-6">
                    <div>
                      <h2 className="text-lg font-semibold">
                        Последни фактури
                      </h2>
                      <p className="mt-1 text-xs text-muted">
                        Фактури поврзани со договорите во регистарот
                      </p>
                    </div>
                    <Button
                      className="text-sm font-semibold text-lime-deep hover:underline"
                      onClick={() => setActiveTab("Invoices")}
                    >
                      Види ги сите
                    </Button>
                  </div>
                  <div className="divide-y divide-line">
                    {invoices.slice(0, 3).map((invoice) => (
                      <div
                        className="flex items-center gap-3 p-4 sm:px-6"
                        key={invoice.id}
                      >
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-soft text-blue-deep">
                          <Icon name="file" size={17} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">
                            {invoice.id} · {invoice.supplier}
                          </p>
                          <p className="mt-1 text-xs text-muted">
                            {invoice.contractId} · {invoice.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <StatusBadge status={invoice.status} />
                          <p className="mt-1 text-sm font-semibold">
                            {formatMkd(invoice.amount)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {activeTab === "Contracts" && (
              <section className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
                <div className="flex items-center justify-between border-b border-line p-5 sm:p-6">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Регистар на договори
                    </h2>
                    <p className="mt-1 text-xs text-muted">
                      {filteredContracts.length} записи во фискалната година
                    </p>
                  </div>
                  <Button
                    className="flex items-center gap-2 rounded-xl bg-ink px-3 py-2 text-xs font-semibold text-white hover:bg-ink-soft"
                    onClick={() => setContractModalOpen(true)}
                  >
                    <Icon name="plus" size={15} /> Нов договор
                  </Button>
                </div>
                <div className="hidden overflow-x-auto sm:block">
                  <table className="w-full min-w-[780px] text-left text-sm">
                    <thead className="border-b border-line bg-stone/50 text-xs font-semibold text-muted">
                      <tr>
                        <th className="px-6 py-4">Број на договор</th>
                        <th className="px-6 py-4">Добавувач / предмет</th>
                        <th className="px-6 py-4">Период</th>
                        <th className="px-6 py-4">Статус</th>
                        <th className="px-6 py-4 text-right">Вредност</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {filteredContracts.map((contract) => (
                        <tr
                          className="cursor-pointer transition hover:bg-stone/30"
                          key={contract.id}
                          onClick={() => setSelectedContract(contract)}
                        >
                          <td className="px-6 py-4 font-semibold text-lime-deep">
                            {contract.id}
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-semibold">{contract.supplier}</p>
                            <p className="mt-1 text-xs text-muted">
                              {contract.subject}
                            </p>
                          </td>
                          <td className="px-6 py-4 text-xs text-muted">
                            {contract.period}
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge status={contract.status} />
                          </td>
                          <td className="px-6 py-4 text-right font-semibold">
                            {formatMkd(contract.value)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="divide-y divide-line sm:hidden">
                  {filteredContracts.map((contract) => (
                    <button
                      className="w-full p-4 text-left"
                      key={contract.id}
                      onClick={() => setSelectedContract(contract)}
                      type="button"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-lime-deep">
                          {contract.id}
                        </span>
                        <StatusBadge status={contract.status} />
                      </div>
                      <p className="mt-2 text-sm font-semibold">
                        {contract.supplier}
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        {contract.subject}
                      </p>
                      <div className="mt-3 flex justify-between border-t border-line pt-3 text-xs">
                        <span className="text-muted">{contract.period}</span>
                        <strong>{formatMkd(contract.value)}</strong>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {activeTab === "Invoices" && (
              <section className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
                <div className="flex flex-col gap-4 border-b border-line p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Регистар на фактури
                    </h2>
                    <p className="mt-1 text-xs text-muted">
                      {filteredInvoices.length} записи · секоја фактура е
                      поврзана со договор
                    </p>
                  </div>
                  <div className="flex gap-2 overflow-x-auto">
                    {([
                      "Сите",
                      "На проверка",
                      "Одобрен",
                      "Платена",
                    ] as const).map((status) => (
                      <Button
                        className={`whitespace-nowrap rounded-xl px-3 py-2 text-xs font-semibold ${
                          invoiceStatus === status
                            ? "bg-ink text-white"
                            : "bg-stone text-muted hover:text-ink"
                        }`}
                        key={status}
                        onClick={() => setInvoiceStatus(status)}
                      >
                        {status}
                      </Button>
                    ))}
                    <Button
                      className="flex items-center gap-1 rounded-xl bg-lime px-3 py-2 text-xs font-semibold text-ink"
                      onClick={() => setInvoiceModalOpen(true)}
                    >
                      <Icon name="plus" size={15} /> Нова
                    </Button>
                  </div>
                </div>
                <div className="hidden overflow-x-auto sm:block">
                  <table className="w-full min-w-[850px] text-left text-sm">
                    <thead className="border-b border-line bg-stone/50 text-xs font-semibold text-muted">
                      <tr>
                        <th className="px-6 py-4">Број на фактура</th>
                        <th className="px-6 py-4">Договор / добавувач</th>
                        <th className="px-6 py-4">Датум</th>
                        <th className="px-6 py-4">Доспева</th>
                        <th className="px-6 py-4">Статус</th>
                        <th className="px-6 py-4 text-right">Износ</th>
                        <th className="px-6 py-4 text-right">Опции</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {filteredInvoices.map((invoice) => (
                        <tr
                          className="transition hover:bg-stone/30"
                          key={invoice.id}
                        >
                          <td className="px-6 py-4 font-semibold">
                            {invoice.id}
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-semibold text-lime-deep">
                              {invoice.contractId}
                            </p>
                            <p className="mt-1 text-xs text-muted">
                              {invoice.supplier}
                            </p>
                          </td>
                          <td className="px-6 py-4 text-xs text-muted">
                            {invoice.date}
                          </td>
                          <td className="px-6 py-4 text-xs text-muted">
                            {invoice.dueDate}
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge status={invoice.status} />
                          </td>
                          <td className="px-6 py-4 text-right font-semibold">
                            {formatMkd(invoice.amount)}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button
                              ariaLabel={`Уреди ${invoice.id}`}
                              className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-lime-deep hover:bg-lime-soft"
                              onClick={() => openInvoiceEditor(invoice)}
                            >
                              Уреди
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="divide-y divide-line sm:hidden">
                  {filteredInvoices.map((invoice) => (
                    <div className="p-4" key={invoice.id}>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{invoice.id}</span>
                        <StatusBadge status={invoice.status} />
                      </div>
                      <p className="mt-2 text-sm font-semibold text-lime-deep">
                        {invoice.contractId}
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        {invoice.supplier}
                      </p>
                      <div className="mt-3 flex justify-between border-t border-line pt-3 text-xs">
                        <span className="text-muted">
                          Доспева: {invoice.dueDate}
                        </span>
                        <span className="flex items-center gap-3">
                          <strong>{formatMkd(invoice.amount)}</strong>
                          <Button
                            className="font-semibold text-lime-deep"
                            onClick={() => openInvoiceEditor(invoice)}
                          >
                            Уреди
                          </Button>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {filteredInvoices.length === 0 && (
                  <div className="p-10 text-center text-sm text-muted">
                    Нема записи за избраните филтри.
                  </div>
                )}
              </section>
            )}
          </div>
        </main>
      </div>

      {selectedContract && (
        <Modal
          onClose={() => setSelectedContract(null)}
          title={`Договор ${selectedContract.id}`}
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-stone p-4">
              <p className="text-xs text-muted">Добавувач</p>
              <p className="mt-1 font-semibold">{selectedContract.supplier}</p>
            </div>
            <div className="rounded-2xl bg-stone p-4">
              <p className="text-xs text-muted">Статус</p>
              <div className="mt-2">
                <StatusBadge status={selectedContract.status} />
              </div>
            </div>
            <div className="rounded-2xl bg-stone p-4">
              <p className="text-xs text-muted">Период</p>
              <p className="mt-1 font-semibold">{selectedContract.period}</p>
            </div>
            <div className="rounded-2xl bg-stone p-4">
              <p className="text-xs text-muted">Вредност</p>
              <p className="mt-1 font-semibold">
                {formatMkd(selectedContract.value)}
              </p>
            </div>
          </div>
          <div className="mt-5 rounded-2xl border border-line p-4">
            <p className="text-xs font-semibold text-muted">
              Предмет на договорот
            </p>
            <p className="mt-1 text-sm font-semibold">
              {selectedContract.subject}
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-sm">
              <span>Поврзани фактури</span>
              <strong>
                {
                  invoices.filter(
                    (invoice) => invoice.contractId === selectedContract.id,
                  ).length
                }
              </strong>
            </div>
            {invoices
              .filter((invoice) => invoice.contractId === selectedContract.id)
              .map((invoice) => (
                <div
                  className="mt-3 flex items-center justify-between rounded-xl bg-stone p-3 text-xs"
                  key={invoice.id}
                >
                  <span>
                    <strong>{invoice.id}</strong>
                    <span className="ml-2 text-muted">{invoice.date}</span>
                  </span>
                  <span className="font-semibold">
                    {formatMkd(invoice.amount)}
                  </span>
                </div>
              ))}
          </div>
          <Button
            className="mt-5 flex h-11 w-full items-center justify-center rounded-xl bg-ink text-sm font-semibold text-white"
            onClick={() => {
              setSelectedContract(null)
              setActiveTab("Invoices")
              setQuery(selectedContract.id)
            }}
          >
            Отвори ги сите фактури
          </Button>
        </Modal>
      )}

      {contractModalOpen && (
        <Modal
          onClose={() => {
            resetContractForm()
            setContractModalOpen(false)
          }}
          title="Регистрирај нов договор"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-semibold text-muted">
              Број на договор
              <input
                className="mt-1.5 w-full rounded-xl border border-line px-3 py-2.5 text-sm font-normal text-ink outline-none focus:border-ink"
                onChange={(event) => setNewContractNumber(event.target.value)}
                placeholder="пр. ДОГ-2026-003"
                value={newContractNumber}
              />
            </label>
            <label className="text-xs font-semibold text-muted">
              Добавувач
              <input
                className="mt-1.5 w-full rounded-xl border border-line px-3 py-2.5 text-sm font-normal text-ink outline-none focus:border-ink"
                onChange={(event) => setNewContractSupplier(event.target.value)}
                placeholder="Име на добавувач"
                value={newContractSupplier}
              />
            </label>
            <label className="text-xs font-semibold text-muted sm:col-span-2">
              Предмет на договорот
              <input
                className="mt-1.5 w-full rounded-xl border border-line px-3 py-2.5 text-sm font-normal text-ink outline-none focus:border-ink"
                onChange={(event) => setNewContractSubject(event.target.value)}
                placeholder="Краток опис на набавката или услугата"
                value={newContractSubject}
              />
            </label>
            <label className="text-xs font-semibold text-muted">
              Период
              <input
                className="mt-1.5 w-full rounded-xl border border-line px-3 py-2.5 text-sm font-normal text-ink outline-none focus:border-ink"
                onChange={(event) => setNewContractPeriod(event.target.value)}
                placeholder="пр. 01.07.2026 – 31.12.2026"
                value={newContractPeriod}
              />
            </label>
            <label className="text-xs font-semibold text-muted">
              Вредност (МКД)
              <input
                className="mt-1.5 w-full rounded-xl border border-line px-3 py-2.5 text-sm font-normal text-ink outline-none focus:border-ink"
                inputMode="decimal"
                onChange={(event) => setNewContractValue(event.target.value)}
                placeholder="0,00"
                value={newContractValue}
              />
            </label>
          </div>
          {contractFormError && (
            <p
              className="mt-3 rounded-xl bg-peach-soft px-3 py-2 text-xs font-semibold text-peach-deep"
              role="alert"
            >
              {contractFormError}
            </p>
          )}
          <div className="mt-5 flex gap-2">
            <Button
              className="flex-1 rounded-xl border border-line px-4 py-3 text-sm font-semibold text-muted hover:text-ink"
              onClick={() => {
                resetContractForm()
                setContractModalOpen(false)
              }}
            >
              Откажи
            </Button>
            <Button
              className="flex-1 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white"
              onClick={saveContractDraft}
            >
              Зачувај како нацрт
            </Button>
          </div>
        </Modal>
      )}

      {invoiceModalOpen && (
        <Modal
          onClose={() => {
            resetInvoiceForm()
            setInvoiceModalOpen(false)
          }}
          title={
            editingInvoiceId ? "Уреди фактура" : "Регистрирај нова фактура"
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-semibold text-muted">
              Број на фактура
              <input
                className="mt-1.5 w-full rounded-xl border border-line px-3 py-2.5 text-sm font-normal text-ink outline-none focus:border-ink"
                onChange={(event) => setNewInvoiceNumber(event.target.value)}
                placeholder="пр. ФАК-2026-113"
                value={newInvoiceNumber}
              />
            </label>
            <label className="text-xs font-semibold text-muted">
              Договор
              <select
                className="mt-1.5 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm font-normal text-ink outline-none focus:border-ink"
                onChange={(event) => setNewInvoiceContract(event.target.value)}
                value={newInvoiceContract}
              >
                <option value="">Избери договор</option>
                {contracts
                  .filter((contract) => contract.status === "Активен")
                  .map((contract) => (
                    <option key={contract.id} value={contract.id}>
                      {contract.id} · {contract.supplier}
                    </option>
                  ))}
              </select>
            </label>
            <label className="text-xs font-semibold text-muted">
              Датум на фактура
              <input
                className="mt-1.5 w-full rounded-xl border border-line px-3 py-2.5 text-sm font-normal text-ink outline-none focus:border-ink"
                onChange={(event) => setNewInvoiceDate(event.target.value)}
                type="date"
                value={newInvoiceDate}
              />
            </label>
            <label className="text-xs font-semibold text-muted">
              Доспева
              <input
                className="mt-1.5 w-full rounded-xl border border-line px-3 py-2.5 text-sm font-normal text-ink outline-none focus:border-ink"
                onChange={(event) => setNewInvoiceDueDate(event.target.value)}
                type="date"
                value={newInvoiceDueDate}
              />
            </label>
            <label className="text-xs font-semibold text-muted sm:col-span-2">
              Износ (МКД)
              <input
                className="mt-1.5 w-full rounded-xl border border-line px-3 py-2.5 text-sm font-normal text-ink outline-none focus:border-ink"
                inputMode="decimal"
                onChange={(event) => setNewInvoiceAmount(event.target.value)}
                placeholder="0,00"
                value={newInvoiceAmount}
              />
            </label>
          </div>
          <label className="mt-4 block text-xs font-semibold text-muted">
            Забелешка
            <textarea
              className="mt-1.5 min-h-24 w-full resize-y rounded-xl border border-line px-3 py-2.5 text-sm font-normal text-ink outline-none focus:border-ink"
              placeholder="Краток опис или дополнителни информации..."
            />
          </label>
          {invoiceFormError && (
            <p
              className="mt-3 rounded-xl bg-peach-soft px-3 py-2 text-xs font-semibold text-peach-deep"
              role="alert"
            >
              {invoiceFormError}
            </p>
          )}
          <div className="mt-5 flex gap-2">
            <Button
              className="flex-1 rounded-xl border border-line px-4 py-3 text-sm font-semibold text-muted hover:text-ink"
              onClick={() => {
                resetInvoiceForm()
                setInvoiceModalOpen(false)
              }}
            >
              Откажи
            </Button>
            <Button
              className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold ${
                saved ? "bg-lime text-ink" : "bg-ink text-white"
              }`}
              onClick={saveInvoiceDraft}
            >
              {saved ? (
                <span className="flex items-center justify-center gap-2">
                  <Icon name="check" size={16} /> Зачувано
                </span>
              ) : editingInvoiceId ? (
                "Зачувај промени"
              ) : (
                "Зачувај како нацрт"
              )}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  )
}
