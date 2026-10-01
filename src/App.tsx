import { useState, type ReactNode } from "react";
import mdtLogo from "./assets/mdt-logo.jpg";

type IconName =
  | "arrow"
  | "bell"
  | "calendar"
  | "chart"
  | "check"
  | "close"
  | "file"
  | "food"
  | "home"
  | "logout"
  | "more"
  | "plus"
  | "shopping"
  | "target"
  | "transport"
  | "wallet";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
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
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </>
    ),
    logout: (
      <>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </>
    ),
    food: (
      <>
        <path d="M7 3v8M4 3v5c0 2 1 3 3 3s3-1 3-3V3M7 11v10" />
        <path d="M17 3c-2 3-2 7 1 9v9M17 3h1v9" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v11h14V10M9 21v-7h6v7" />
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
    shopping: (
      <>
        <path d="M6 8h12l1 13H5L6 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
    transport: (
      <>
        <path d="m5 17-1 4M19 17l1 4M4 17h16V9l-2-5H6L4 9v8Z" />
        <path d="M4 10h16M7 14h.01M17 14h.01" />
      </>
    ),
    wallet: (
      <>
        <path d="M4 6h14a2 2 0 0 1 2 2v11H4a2 2 0 0 1-2-2V6a3 3 0 0 1 3-3h13v3" />
        <path d="M15 11h7v5h-7a2 2 0 0 1 0-5Z" />
      </>
    ),
  };

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
  );
}

function Button({
  children,
  className = "",
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  return (
    <button aria-label={ariaLabel} className={className} onClick={onClick} type="button">
      {children}
    </button>
  );
}

interface TransactionItem {
  id: string;
  name: string;
  contractRef?: string;
  type: "Invoice" | "Annex" | "Contract";
  amount: string;
  rawAmount: number;
  time: string;
  month: string;
  year: number;
  quarter: "Q1" | "Q2" | "Q3" | "Q4";
  icon: IconName;
  tone: string;
  status: "Paid" | "Pending" | "Approved";
}

const initialTransactions: TransactionItem[] = [
  {
    id: "tx-1",
    amount: "−$14,500.00",
    rawAmount: 14500,
    icon: "file",
    name: "Фактура #INV-2026-041 (Cloud Infrastructure)",
    contractRef: "CTR-2026-001",
    type: "Invoice",
    time: "Today, 10:42 AM",
    month: "Jun",
    year: 2026,
    quarter: "Q2",
    tone: "bg-blue-soft text-blue-deep",
    status: "Paid",
  },
  {
    id: "tx-2",
    amount: "+$8,000.00",
    rawAmount: 8000,
    icon: "chart",
    name: "Анекс #1 кон Договор за Развој",
    contractRef: "CTR-2026-002",
    type: "Annex",
    time: "Yesterday, 3:15 PM",
    month: "Jun",
    year: 2026,
    quarter: "Q2",
    tone: "bg-lime-soft text-lime-deep",
    status: "Approved",
  },
  {
    id: "tx-3",
    amount: "−$6,200.00",
    rawAmount: 6200,
    icon: "wallet",
    name: "Фактура #INV-2026-039 (IT Консалтинг)",
    contractRef: "CTR-2026-002",
    type: "Invoice",
    time: "Jun 18, 2:30 PM",
    month: "Jun",
    year: 2026,
    quarter: "Q2",
    tone: "bg-violet-soft text-violet-deep",
    status: "Paid",
  },
  {
    id: "tx-4",
    amount: "−$18,900.00",
    rawAmount: 18900,
    icon: "file",
    name: "Фактура #INV-2026-034 (Серверска Опрема)",
    contractRef: "CTR-2026-001",
    type: "Invoice",
    time: "May 24, 11:15 AM",
    month: "May",
    year: 2026,
    quarter: "Q2",
    tone: "bg-peach-soft text-peach-deep",
    status: "Paid",
  },
  {
    id: "tx-5",
    amount: "+$12,500.00",
    rawAmount: 12500,
    icon: "chart",
    name: "Анекс #2 - Дополнителни Модули",
    contractRef: "CTR-2026-003",
    type: "Annex",
    time: "May 12, 4:20 PM",
    month: "May",
    year: 2026,
    quarter: "Q2",
    tone: "bg-lime-soft text-lime-deep",
    status: "Approved",
  },
  {
    id: "tx-6",
    amount: "−$9,800.00",
    rawAmount: 9800,
    icon: "wallet",
    name: "Фактура #INV-2026-028 (Q2 Одржување)",
    contractRef: "CTR-2026-003",
    type: "Invoice",
    time: "Apr 04, 9:00 AM",
    month: "Apr",
    year: 2026,
    quarter: "Q2",
    tone: "bg-blue-soft text-blue-deep",
    status: "Paid",
  },
  {
    id: "tx-7",
    amount: "−$24,000.00",
    rawAmount: 24000,
    icon: "file",
    name: "Фактура #INV-2026-019 (Софтверски Лиценци)",
    contractRef: "CTR-2026-004",
    type: "Invoice",
    time: "Mar 19, 1:45 PM",
    month: "Mar",
    year: 2026,
    quarter: "Q1",
    tone: "bg-violet-soft text-violet-deep",
    status: "Paid",
  },
  {
    id: "tx-8",
    amount: "−$15,500.00",
    rawAmount: 15500,
    icon: "wallet",
    name: "Фактура #INV-2026-011 (Безбедносен Аудит)",
    contractRef: "CTR-2026-005",
    type: "Invoice",
    time: "Feb 14, 7:30 PM",
    month: "Feb",
    year: 2026,
    quarter: "Q1",
    tone: "bg-peach-soft text-peach-deep",
    status: "Paid",
  },
  {
    id: "tx-9",
    amount: "−$32,000.00",
    rawAmount: 32000,
    icon: "file",
    name: "Фактура #INV-2026-004 (Прва рата Договор за Развој)",
    contractRef: "CTR-2026-002",
    type: "Invoice",
    time: "Jan 15, 10:00 AM",
    month: "Jan",
    year: 2026,
    quarter: "Q1",
    tone: "bg-blue-soft text-blue-deep",
    status: "Paid",
  },
  {
    id: "tx-10",
    amount: "+$5,000.00",
    rawAmount: 5000,
    icon: "chart",
    name: "Анекс #1 - Продолжување рок",
    contractRef: "CTR-2026-005",
    type: "Annex",
    time: "Jan 08, 2:00 PM",
    month: "Jan",
    year: 2026,
    quarter: "Q1",
    tone: "bg-lime-soft text-lime-deep",
    status: "Approved",
  },
];

const monthlyCategories = [
  { color: "bg-blue", label: "Договори", value: "$48,500", icon: "file" as const, tone: "bg-blue-soft text-blue-deep" },
  { color: "bg-lime", label: "Анекси", value: "$8,000", icon: "chart" as const, tone: "bg-lime-soft text-lime-deep" },
  { color: "bg-violet", label: "Фактури", value: "$20,700", icon: "wallet" as const, tone: "bg-violet-soft text-violet-deep" },
];

const yearlyCategories = [
  { color: "bg-blue", label: "Софтвер и Развој", value: "$145,000", icon: "file" as const, tone: "bg-blue-soft text-blue-deep" },
  { color: "bg-lime", label: "Анекси кон договори", value: "$25,500", icon: "chart" as const, tone: "bg-lime-soft text-lime-deep" },
  { color: "bg-violet", label: "Реализирани Фактури", value: "$127,100", icon: "wallet" as const, tone: "bg-violet-soft text-violet-deep" },
  { color: "bg-peach", label: "Одржување & Cloud", value: "$43,200", icon: "target" as const, tone: "bg-peach-soft text-peach-deep" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [timeScope, setTimeScope] = useState<"monthly" | "yearly">("yearly");
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [yearlyQuarterFilter, setYearlyQuarterFilter] = useState<"ALL" | "Q1" | "Q2" | "Q3" | "Q4">("ALL");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [budgetDetailsOpen, setBudgetDetailsOpen] = useState(false);
  const [seeAllTransactionsOpen, setSeeAllTransactionsOpen] = useState(false);
  const [txSearchQuery, setTxSearchQuery] = useState("");
  const [txCategoryFilter, setTxCategoryFilter] = useState("All");
  const [saved, setSaved] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Food");
  const [expenseAmount, setExpenseAmount] = useState("0.00");
  const [transactionItems, setTransactionItems] = useState<TransactionItem[]>(initialTransactions);

  const saveExpense = () => {
    const categoryDetails = {
      Food: { icon: "food" as const, tone: "bg-lime-soft text-lime-deep" },
      Travel: { icon: "transport" as const, tone: "bg-blue-soft text-blue-deep" },
      Shop: { icon: "shopping" as const, tone: "bg-peach-soft text-peach-deep" },
      Home: { icon: "home" as const, tone: "bg-violet-soft text-violet-deep" },
    };
    const detail = categoryDetails[selectedCategory as keyof typeof categoryDetails];
    const parsedAmount = Number(expenseAmount || 0);
    const formattedAmount = parsedAmount.toFixed(2);

    const newTx: TransactionItem = {
      id: `tx-${Date.now()}`,
      amount: `−$${formattedAmount}`,
      rawAmount: parsedAmount,
      icon: detail.icon,
      name: `Фактура - ${selectedCategory}`,
      type: "Invoice",
      time: "Today, Just now",
      month: "Jun",
      year: selectedYear,
      quarter: "Q2",
      tone: detail.tone,
      status: "Paid",
    };

    setTransactionItems((items) => [newTx, ...items]);
    setSaved(true);
    window.setTimeout(() => {
      setSheetOpen(false);
      setSaved(false);
      setExpenseAmount("0.00");
      setActiveTab("Home");
    }, 850);
  };

  // Filtered transactions for Home tab based on scope
  const filteredHomeTransactions = transactionItems.filter((tx) => {
    if (timeScope === "monthly") {
      return tx.month === "Jun" && tx.year === selectedYear;
    }
    // Yearly view
    if (tx.year !== selectedYear) return false;
    if (yearlyQuarterFilter !== "ALL") {
      return tx.quarter === yearlyQuarterFilter;
    }
    return true;
  });

  const yearlyInvoicedTotal = transactionItems
    .filter((tx) => tx.year === selectedYear && tx.type === "Invoice")
    .reduce((sum, tx) => sum + tx.rawAmount, 0);

  const yearlyAnnexesTotal = transactionItems
    .filter((tx) => tx.year === selectedYear && tx.type === "Annex")
    .reduce((sum, tx) => sum + tx.rawAmount, 0);

  const baseContractBudget = selectedYear === 2026 ? 280000 : 210000;
  const totalApprovedBudget = baseContractBudget + yearlyAnnexesTotal;
  const remainingContractBudget = totalApprovedBudget - yearlyInvoicedTotal;

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-canvas text-ink font-sans">
      {/* Top Header matching wireframe template */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b-2 border-ink bg-white px-6">
        <div className="flex items-center gap-3">
          <img src={mdtLogo} alt="Logo MDT" className="h-11 w-auto max-w-[200px] object-contain" />
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2.5">
            <div className="grid size-9 place-items-center rounded-full bg-peach-soft text-xs font-bold text-peach-deep">
              КП
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">Кристијан Пешевски</p>
            </div>
          </div>
          <button
            className="flex items-center gap-1.5 rounded-xl border border-line bg-stone px-3.5 py-1.5 text-xs font-semibold text-ink transition hover:border-peach-deep hover:bg-peach-soft hover:text-peach-deep cursor-pointer"
            onClick={() => alert("Одјавени сте успешно")}
            type="button"
          >
            <Icon name="logout" size={15} />
            Одјави се
          </button>
        </div>
      </header>

      {/* Main Body: Left Sidebar + Right Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar matching wireframe */}
        <aside className="flex w-60 md:w-64 shrink-0 flex-col border-r-2 border-ink bg-white p-4">
          <nav className="space-y-1.5">
            <button
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition cursor-pointer ${
                activeTab === "Home"
                  ? "bg-lime-soft text-lime-deep shadow-sm"
                  : "text-muted hover:bg-stone hover:text-ink"
              }`}
              onClick={() => setActiveTab("Home")}
              type="button"
            >
              <Icon name="home" size={18} />
              Home / Overview
            </button>
            <button
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition cursor-pointer ${
                activeTab === "Contracts"
                  ? "bg-lime-soft text-lime-deep shadow-sm"
                  : "text-muted hover:bg-stone hover:text-ink"
              }`}
              onClick={() => setActiveTab("Contracts")}
              type="button"
            >
              <Icon name="file" size={18} />
              Contracts
            </button>
            <button
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition cursor-pointer ${
                activeTab === "Invoices"
                  ? "bg-lime-soft text-lime-deep shadow-sm"
                  : "text-muted hover:bg-stone hover:text-ink"
              }`}
              onClick={() => setActiveTab("Invoices")}
              type="button"
            >
              <Icon name="wallet" size={18} />
              Invoices
            </button>
          </nav>

          <div className="mt-auto border-t border-line pt-4">
            <button
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-ink-soft cursor-pointer transition active:scale-95"
              onClick={() => setSheetOpen(true)}
              type="button"
            >
              <Icon name="plus" size={15} />
              Add Expense
            </button>
          </div>
        </aside>

        {/* Right Main Screen Content Area */}
        <main className="flex-1 overflow-y-auto bg-canvas p-6 md:p-8">
          {activeTab === "Home" && (
            <div className="mx-auto max-w-6xl space-y-6">
              {/* Header with Title and Period Switcher */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-ink">Financial Dashboard</h1>
                  <p className="mt-1 text-sm text-muted">
                    Track your annual budget, cash flow, and transaction activity.
                  </p>
                </div>

                {/* Period Switcher (Monthly vs Yearly) */}
                <div className="flex items-center rounded-2xl bg-stone p-1 w-full sm:w-auto">
                  <button
                    className={`flex-1 sm:flex-initial rounded-xl px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                      timeScope === "monthly"
                        ? "bg-white text-ink shadow-sm"
                        : "text-muted hover:text-ink"
                    }`}
                    onClick={() => setTimeScope("monthly")}
                    type="button"
                  >
                    Monthly (June)
                  </button>
                  <button
                    className={`flex-1 sm:flex-initial rounded-xl px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                      timeScope === "yearly"
                        ? "bg-white text-ink shadow-sm"
                        : "text-muted hover:text-ink"
                    }`}
                    onClick={() => setTimeScope("yearly")}
                    type="button"
                  >
                    Yearly View ({selectedYear})
                  </button>
                </div>
              </div>

              {/* Grid with Balance Card & Budget Pace */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Balance Card */}
                <div className="relative overflow-hidden rounded-3xl bg-ink p-6 text-white shadow-lg shadow-ink/15">
                  <div className="absolute -right-10 -top-14 size-44 rounded-full border-[22px] border-lime/10" />
                  <div className="absolute -bottom-20 right-12 size-36 rounded-full bg-lime/5" />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white/55">
                        {timeScope === "yearly" ? `${selectedYear} Преостанат Буџет за Реализација` : "Преостанат буџет за месецот"}
                      </p>
                      {timeScope === "yearly" ? (
                        <div className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold">
                          <Icon name="calendar" size={13} />
                          <select
                            aria-label="Select Year"
                            className="bg-transparent text-white font-semibold outline-none cursor-pointer"
                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                            value={selectedYear}
                          >
                            <option className="bg-ink text-white" value={2026}>2026</option>
                            <option className="bg-ink text-white" value={2025}>2025</option>
                          </select>
                        </div>
                      ) : (
                        <button
                          className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold transition hover:bg-white/15 cursor-pointer"
                          onClick={() => setTimeScope("yearly")}
                          type="button"
                        >
                          <Icon name="calendar" size={14} /> June
                        </button>
                      )}
                    </div>
                    <p className="mt-4 text-4xl font-semibold tracking-tight">
                      {timeScope === "yearly"
                        ? `$${remainingContractBudget.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
                        : "$2,483.60"}
                    </p>
                    <div className="mt-6 flex gap-3">
                      <div className="flex-1 rounded-2xl bg-white/8 p-4">
                        <p className="text-xs text-white/45">
                          {timeScope === "yearly" ? "Вкупен Буџет (Договори + Анекси)" : "Планиран буџет"}
                        </p>
                        <p className="mt-1 text-lg font-semibold text-lime">
                          {timeScope === "yearly"
                            ? `+$${totalApprovedBudget.toLocaleString("en-US")}`
                            : "+$4,850"}
                        </p>
                      </div>
                      <div className="flex-1 rounded-2xl bg-white/8 p-4">
                        <p className="text-xs text-white/45">
                          {timeScope === "yearly" ? "Фактурирано / Исплатено" : "Реализирано"}
                        </p>
                        <p className="mt-1 text-lg font-semibold">
                          {timeScope === "yearly"
                            ? `−$${yearlyInvoicedTotal.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
                            : "−$2,366"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Budget Pace Card */}
                <div className="flex flex-col justify-between rounded-3xl border border-line bg-white p-6 shadow-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold tracking-tight">
                        {timeScope === "yearly" ? `${selectedYear} Реализација на Буџет` : "June budget"}
                      </h2>
                      <p className="mt-0.5 text-xs text-muted">
                        {timeScope === "yearly"
                          ? "194 дена преостанати во фискалната 2026 година"
                          : "12 days left in your cycle"}
                      </p>
                    </div>
                    <Button
                      className="text-sm font-semibold text-lime-deep hover:underline cursor-pointer transition active:scale-95"
                      onClick={() => setBudgetDetailsOpen(true)}
                    >
                      Details
                    </Button>
                  </div>

                  <div className="my-4 flex items-center gap-5">
                    <div className="relative size-24 shrink-0">
                      <svg className="size-full -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" fill="none" r="49" stroke="var(--color-stone)" strokeWidth="12" />
                        <circle
                          cx="60"
                          cy="60"
                          fill="none"
                          r="49"
                          stroke="var(--color-lime)"
                          strokeDasharray="308"
                          strokeDashoffset={timeScope === "yearly" ? `${Math.round(308 - (308 * Math.round((yearlyInvoicedTotal / totalApprovedBudget) * 100)) / 100)}` : "92"}
                          strokeLinecap="round"
                          strokeWidth="12"
                        />
                      </svg>
                      <div className="absolute inset-0 grid place-items-center text-center">
                        <div>
                          <p className="text-xl font-semibold">
                            {timeScope === "yearly"
                              ? `${Math.round((yearlyInvoicedTotal / totalApprovedBudget) * 100)}%`
                              : "70%"}
                          </p>
                          <p className="text-[10px] font-medium text-muted">
                            {timeScope === "yearly" ? "реализирано" : "потрошено"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-muted">
                        {timeScope === "yearly" ? "Одобрени Анекси кон договори" : "You have left"}
                      </p>
                      <p className="mt-1 text-2xl font-semibold tracking-tight text-lime-deep">
                        {timeScope === "yearly" ? `+$${yearlyAnnexesTotal.toLocaleString("en-US")}` : "$1,006.40"}
                      </p>
                      <p className="mt-2 text-xs leading-5 text-muted">
                        {timeScope === "yearly" ? (
                          <>
                            Активни анекси: <span className="font-semibold text-lime-deep">3 дополнувања</span> на договори
                          </>
                        ) : (
                          <>
                            You’re <span className="font-semibold text-lime-deep">$124 under</span> your usual pace.
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex h-2 overflow-hidden rounded-full bg-stone">
                    <span className="w-1/2 bg-blue" />
                    <span className="w-[16%] bg-lime" />
                    <span className="w-[18%] bg-violet" />
                    <span className="w-[16%] bg-peach" />
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight">
                      {timeScope === "yearly" ? `${selectedYear} Category Breakdown` : "Top spending"}
                    </h2>
                    <p className="mt-0.5 text-xs text-muted">
                      {timeScope === "yearly" ? "Annual cumulative distribution" : "Most spent this month"}
                    </p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {(timeScope === "yearly" ? yearlyCategories : monthlyCategories).map((category) => (
                    <article className="rounded-2xl border border-line bg-white p-4 shadow-card" key={category.label}>
                      <div className={`grid size-9 place-items-center rounded-xl ${category.tone}`}>
                        <Icon name={category.icon} size={17} />
                      </div>
                      <p className="mt-3 text-xs font-medium text-muted">{category.label}</p>
                      <p className="mt-1 text-lg font-semibold">{category.value}</p>
                      <div className="mt-3 h-1.5 rounded-full bg-stone">
                        <div className={`h-full w-3/4 rounded-full ${category.color}`} />
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Transactions Section with Yearly View & Filters */}
              <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight">
                      {timeScope === "yearly" ? `${selectedYear} Transactions` : "Recent activity"}
                    </h2>
                    <p className="mt-0.5 text-xs text-muted">
                      {timeScope === "yearly"
                        ? `${filteredHomeTransactions.length} recorded this year`
                        : "Latest transactions"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      className="flex items-center gap-0.5 text-sm font-semibold text-lime-deep hover:underline cursor-pointer transition active:scale-95"
                      onClick={() => setSeeAllTransactionsOpen(true)}
                    >
                      See all <Icon name="arrow" size={14} />
                    </Button>
                    <button
                      className="flex items-center gap-1.5 rounded-xl bg-lime px-3.5 py-1.5 text-xs font-semibold text-ink transition hover:bg-lime/90 cursor-pointer"
                      onClick={() => setSheetOpen(true)}
                      type="button"
                    >
                      <Icon name="plus" size={15} /> Add Expense
                    </button>
                  </div>
                </div>

                {/* Filter chips for Yearly view */}
                {timeScope === "yearly" && (
                  <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
                    {(["ALL", "Q1", "Q2", "Q3", "Q4"] as const).map((q) => (
                      <button
                        className={`rounded-full px-3 py-1 text-xs font-semibold transition cursor-pointer ${
                          yearlyQuarterFilter === q
                            ? "bg-ink text-white shadow-sm"
                            : "bg-white text-muted border border-line hover:text-ink"
                        }`}
                        key={q}
                        onClick={() => setYearlyQuarterFilter(q)}
                        type="button"
                      >
                        {q === "ALL" ? "All Quarters" : `${q} (${q === "Q1" ? "Jan-Mar" : q === "Q2" ? "Apr-Jun" : q === "Q3" ? "Jul-Sep" : "Oct-Dec"})`}
                      </button>
                    ))}
                  </div>
                )}

                <div className="mt-4 divide-y divide-line">
                  {filteredHomeTransactions.length === 0 ? (
                    <div className="py-8 text-center text-sm text-muted">
                      No transactions found for this period.
                    </div>
                  ) : (
                    filteredHomeTransactions.map((transaction, index) => (
                      <div
                        className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0"
                        key={`${transaction.id}-${index}`}
                      >
                        <div className={`grid size-11 shrink-0 place-items-center rounded-2xl ${transaction.tone}`}>
                          <Icon name={transaction.icon} size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="truncate text-sm font-semibold">{transaction.name}</p>
                            <span
                              className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                                transaction.type === "Annex"
                                  ? "bg-lime-soft text-lime-deep"
                                  : "bg-blue-soft text-blue-deep"
                              }`}
                            >
                              {transaction.type === "Annex" ? "Анекс" : "Фактура"}
                            </span>
                            {transaction.contractRef && (
                              <span className="rounded bg-stone px-1.5 py-0.5 text-[10px] font-semibold text-muted">
                                {transaction.contractRef}
                              </span>
                            )}
                            {timeScope === "yearly" && (
                              <span className="rounded bg-stone px-1.5 py-0.5 text-[10px] font-semibold text-muted">
                                {transaction.quarter}
                              </span>
                            )}
                          </div>
                          <div className="mt-0.5 flex items-center gap-2 text-xs text-muted">
                            <span>{transaction.time}</span>
                            <span>•</span>
                            <span
                              className={`font-semibold ${
                                transaction.status === "Paid"
                                  ? "text-lime-deep"
                                  : transaction.status === "Approved"
                                  ? "text-blue-deep"
                                  : "text-peach-deep"
                              }`}
                            >
                              {transaction.status === "Paid"
                                ? "Исплатено"
                                : transaction.status === "Approved"
                                ? "Одобрено"
                                : "Во обработка"}
                            </span>
                          </div>
                        </div>
                        <p
                          className={`text-sm font-semibold ${
                            transaction.type === "Annex" ? "text-lime-deep" : "text-ink"
                          }`}
                        >
                          {transaction.amount}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "Contracts" && (
            <div className="mx-auto max-w-5xl space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Contracts</h1>
                <p className="mt-1 text-sm text-muted">Overview of active and archived service contracts.</p>
              </div>
              <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-line bg-stone/50 text-xs font-semibold text-muted">
                    <tr>
                      <th className="px-6 py-4">Contract ID</th>
                      <th className="px-6 py-4">Client / Vendor</th>
                      <th className="px-6 py-4">Period</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {[
                      { id: "MDT-CTR-2026-001", client: "MDT Enterprise Solutions", period: "Jan 01, 2026 - Dec 31, 2026", status: "Active", value: "$48,000" },
                      { id: "MDT-CTR-2026-002", client: "Gov Tech Consulting", period: "Mar 15, 2026 - Sep 15, 2026", status: "Active", value: "$32,500" },
                      { id: "MDT-CTR-2025-084", client: "Nordic Data Labs", period: "Aug 01, 2025 - Feb 28, 2026", status: "Completed", value: "$18,200" },
                    ].map((ctr) => (
                      <tr className="hover:bg-stone/20 transition" key={ctr.id}>
                        <td className="px-6 py-4 font-semibold">{ctr.id}</td>
                        <td className="px-6 py-4 text-muted">{ctr.client}</td>
                        <td className="px-6 py-4 text-xs text-muted">{ctr.period}</td>
                        <td className="px-6 py-4">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            ctr.status === "Active" ? "bg-lime-soft text-lime-deep" : "bg-stone text-muted"
                          }`}>
                            {ctr.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-semibold">{ctr.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "Invoices" && (
            <div className="mx-auto max-w-5xl space-y-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Invoices</h1>
                <p className="mt-1 text-sm text-muted">Manage issued and received invoices.</p>
              </div>
              <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-line bg-stone/50 text-xs font-semibold text-muted">
                    <tr>
                      <th className="px-6 py-4">Invoice #</th>
                      <th className="px-6 py-4">Client</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Due Date</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {[
                      { id: "INV-2026-104", client: "MDT Enterprise Solutions", date: "Jun 01, 2026", dueDate: "Jun 30, 2026", status: "Paid", amount: "$4,000.00" },
                      { id: "INV-2026-098", client: "Gov Tech Consulting", date: "May 15, 2026", dueDate: "Jun 15, 2026", status: "Paid", amount: "$8,125.00" },
                      { id: "INV-2026-112", client: "Cloud Infrastructure Ltd", date: "Jun 18, 2026", dueDate: "Jul 18, 2026", status: "Pending", amount: "$2,450.00" },
                    ].map((inv) => (
                      <tr className="hover:bg-stone/20 transition" key={inv.id}>
                        <td className="px-6 py-4 font-semibold">{inv.id}</td>
                        <td className="px-6 py-4 text-muted">{inv.client}</td>
                        <td className="px-6 py-4 text-xs text-muted">{inv.date}</td>
                        <td className="px-6 py-4 text-xs text-muted">{inv.dueDate}</td>
                        <td className="px-6 py-4">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            inv.status === "Paid" ? "bg-lime-soft text-lime-deep" : "bg-peach-soft text-peach-deep"
                          }`}>
                            {inv.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-semibold">{inv.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

        {sheetOpen && (
          <div
            className="absolute inset-0 z-50 flex items-end bg-ink/45 backdrop-blur-sm"
            onMouseDown={() => setSheetOpen(false)}
            role="presentation"
          >
            <section
              aria-label="Add expense"
              aria-modal="true"
              className="w-full rounded-t-[2rem] bg-white p-5 pb-8 shadow-modal"
              onMouseDown={(event) => event.stopPropagation()}
              role="dialog"
            >
              <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-line" />
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Add expense</h2>
                  <p className="mt-1 text-sm text-muted">Keep your budget up to date.</p>
                </div>
                <Button
                  ariaLabel="Close"
                  className="grid size-9 place-items-center rounded-full bg-stone text-muted"
                  onClick={() => setSheetOpen(false)}
                >
                  <Icon name="close" size={17} />
                </Button>
              </div>
              <div className="mt-6 rounded-2xl bg-stone p-4 text-center">
                <p className="text-xs font-medium text-muted">Amount</p>
                <div className="mt-1 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-muted">$</span>
                  <input
                    aria-label="Expense amount"
                    autoFocus
                    className="w-28 bg-transparent text-center text-4xl font-semibold tracking-tight outline-none"
                    inputMode="decimal"
                    onChange={(event) => setExpenseAmount(event.target.value)}
                    value={expenseAmount}
                  />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {[
                  ["food", "Food"],
                  ["transport", "Travel"],
                  ["shopping", "Shop"],
                  ["home", "Home"],
                ].map(([icon, label]) => (
                  <Button
                    className={`flex flex-col items-center gap-2 rounded-2xl border p-3 text-[11px] font-semibold ${
                      selectedCategory === label ? "border-lime bg-lime-soft text-lime-deep" : "border-line"
                    }`}
                    key={label}
                    onClick={() => setSelectedCategory(label)}
                  >
                    <Icon name={icon as IconName} size={19} />
                    {label}
                  </Button>
                ))}
              </div>
              <Button
                className={`mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-2xl text-sm font-semibold transition ${
                  saved ? "bg-lime text-ink" : "bg-ink text-white"
                }`}
                onClick={saveExpense}
              >
                {saved ? (
                  <>
                    <Icon name="check" size={18} /> Expense saved
                  </>
                ) : (
                  "Save expense"
                )}
              </Button>
            </section>
          </div>
        )}
        {budgetDetailsOpen && (
          <div
            className="absolute inset-0 z-50 flex items-end bg-ink/45 backdrop-blur-sm"
            onMouseDown={() => setBudgetDetailsOpen(false)}
            role="presentation"
          >
            <section
              aria-label="Budget Details"
              aria-modal="true"
              className="max-h-[85vh] w-full overflow-y-auto rounded-t-[2rem] bg-white p-5 pb-8 shadow-modal"
              onMouseDown={(event) => event.stopPropagation()}
              role="dialog"
            >
              <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-line" />
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {timeScope === "yearly" ? `${selectedYear} Annual Budget Plan` : "June Budget Breakdown"}
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    {timeScope === "yearly"
                      ? "Cumulative allocation and progress for the year"
                      : "Current monthly spending limits and pace"}
                  </p>
                </div>
                <Button
                  ariaLabel="Close"
                  className="grid size-9 place-items-center rounded-full bg-stone text-muted"
                  onClick={() => setBudgetDetailsOpen(false)}
                >
                  <Icon name="close" size={17} />
                </Button>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-line bg-stone/50 p-4">
                  <p className="text-xs font-medium text-muted">Вкупен Одобрен Буџет</p>
                  <p className="mt-1 text-xl font-semibold tracking-tight">
                    {timeScope === "yearly" ? `$${totalApprovedBudget.toLocaleString("en-US")}` : "$48,500.00"}
                  </p>
                </div>
                <div className="rounded-2xl border border-line bg-stone/50 p-4">
                  <p className="text-xs font-medium text-muted">Преостанат Буџет за Реализација</p>
                  <p className="mt-1 text-xl font-semibold tracking-tight text-lime-deep">
                    {timeScope === "yearly" ? `$${remainingContractBudget.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "$27,800.00"}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-line p-4">
                <h3 className="text-sm font-semibold">Алокација по типови на договори и услуги</h3>
                <div className="mt-3 space-y-3">
                  {[
                    { label: "Софтвер и Развој (Договори)", limit: timeScope === "yearly" ? "$145,000" : "$25,000", spent: timeScope === "yearly" ? "$78,500" : "$12,400", pct: "54%", bar: "bg-blue" },
                    { label: "Анекси кон активни договори", limit: timeScope === "yearly" ? "$25,500" : "$8,000", spent: timeScope === "yearly" ? "$20,500" : "$5,200", pct: "80%", bar: "bg-lime" },
                    { label: "IT Консалтинг & Лиценци", limit: timeScope === "yearly" ? "$85,000" : "$10,500", spent: timeScope === "yearly" ? "$40,200" : "$6,200", pct: "47%", bar: "bg-violet" },
                    { label: "Одржување & Cloud Сервиси", limit: timeScope === "yearly" ? "$50,000" : "$5,000", spent: timeScope === "yearly" ? "$24,300" : "$2,450", pct: "49%", bar: "bg-peach" },
                  ].map((cat) => (
                    <div key={cat.label}>
                      <div className="flex justify-between text-xs">
                        <span className="font-medium">{cat.label}</span>
                        <span className="text-muted">{cat.spent} / {cat.limit} ({cat.pct})</span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-stone">
                        <div className={`h-full rounded-full ${cat.bar}`} style={{ width: cat.pct }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-lime-soft p-4 text-xs leading-relaxed text-lime-deep">
                {timeScope === "yearly"
                  ? "💡 Инфо: Реализацијата на договорите се одвива според планираната динамика. Вкупно 3 активни анекси го зголемија основниот буџет за $25,500."
                  : "💡 Инфо: За тековниот месец се реализирани фактури во износ од $20,700 од вкупно планирани $48,500."}
              </div>

              <Button
                className="mt-5 flex h-12 w-full items-center justify-center rounded-2xl bg-ink text-sm font-semibold text-white transition active:scale-95"
                onClick={() => setBudgetDetailsOpen(false)}
              >
                Done
              </Button>
            </section>
          </div>
        )}

        {seeAllTransactionsOpen && (
          <div
            className="absolute inset-0 z-50 flex items-end bg-ink/45 backdrop-blur-sm"
            onMouseDown={() => setSeeAllTransactionsOpen(false)}
            role="presentation"
          >
            <section
              aria-label="All Transactions"
              aria-modal="true"
              className="flex max-h-[85vh] w-full flex-col rounded-t-[2rem] bg-white p-5 pb-8 shadow-modal"
              onMouseDown={(event) => event.stopPropagation()}
              role="dialog"
            >
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line" />
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {timeScope === "yearly" ? `${selectedYear} Transactions` : "June Transactions"}
                  </h2>
                  <p className="mt-0.5 text-xs text-muted">
                    Showing complete history ({transactionItems.filter((t) => timeScope === "yearly" ? t.year === selectedYear : (t.month === "Jun" && t.year === selectedYear)).length} transactions)
                  </p>
                </div>
                <Button
                  ariaLabel="Close"
                  className="grid size-9 place-items-center rounded-full bg-stone text-muted"
                  onClick={() => setSeeAllTransactionsOpen(false)}
                >
                  <Icon name="close" size={17} />
                </Button>
              </div>

              {/* Search bar */}
              <div className="mt-4 flex items-center rounded-2xl border border-line bg-stone px-3 py-2 text-sm">
                <input
                  className="w-full bg-transparent text-xs font-medium outline-none placeholder:text-muted"
                  onChange={(e) => setTxSearchQuery(e.target.value)}
                  placeholder="Search by merchant or category..."
                  value={txSearchQuery}
                />
                {txSearchQuery && (
                  <button
                    className="text-xs text-muted hover:text-ink cursor-pointer"
                    onClick={() => setTxSearchQuery("")}
                    type="button"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category pills */}
              <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
                {["All", "Food", "Travel", "Shop", "Home"].map((cat) => (
                  <button
                    className={`rounded-full px-3 py-1 text-xs font-semibold cursor-pointer transition ${
                      txCategoryFilter === cat
                        ? "bg-ink text-white shadow-sm"
                        : "border border-line bg-white text-muted hover:text-ink"
                    }`}
                    key={cat}
                    onClick={() => setTxCategoryFilter(cat)}
                    type="button"
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Scrollable list */}
              <div className="mt-3 flex-1 overflow-y-auto space-y-2 pr-1 max-h-[40vh] [scrollbar-width:thin]">
                {transactionItems
                  .filter((tx) => {
                    if (timeScope === "monthly" && (tx.month !== "Jun" || tx.year !== selectedYear)) return false;
                    if (timeScope === "yearly" && tx.year !== selectedYear) return false;
                    if (txCategoryFilter !== "All") {
                      const iconMap: Record<string, string> = { Food: "food", Travel: "transport", Shop: "shopping", Home: "home" };
                      if (tx.icon !== iconMap[txCategoryFilter]) return false;
                    }
                    if (txSearchQuery.trim() !== "" && !tx.name.toLowerCase().includes(txSearchQuery.toLowerCase())) {
                      return false;
                    }
                    return true;
                  })
                  .map((transaction, index) => (
                    <div
                      className="flex items-center gap-3 rounded-2xl border border-line bg-white p-3 shadow-sm"
                      key={`all-${transaction.id}-${index}`}
                    >
                      <div className={`grid size-10 shrink-0 place-items-center rounded-xl ${transaction.tone}`}>
                        <Icon name={transaction.icon} size={17} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-semibold">{transaction.name}</p>
                          <span className="rounded bg-stone px-1.5 py-0.5 text-[10px] font-semibold text-muted">
                            {transaction.quarter}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-muted">{transaction.time}</p>
                      </div>
                      <p className="text-sm font-semibold">{transaction.amount}</p>
                    </div>
                  ))}
              </div>

              <Button
                className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-ink text-sm font-semibold text-white transition active:scale-95"
                onClick={() => setSeeAllTransactionsOpen(false)}
              >
                Close
              </Button>
            </section>
          </div>
        )}
    </div>
  );
}
