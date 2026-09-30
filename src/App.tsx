import { useState, type ReactNode } from "react";

type IconName =
  | "arrow"
  | "bell"
  | "calendar"
  | "chart"
  | "check"
  | "close"
  | "food"
  | "home"
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

const transactions = [
  {
    amount: "−$38.24",
    icon: "food" as const,
    name: "Whole Foods",
    time: "Today, 10:42 AM",
    tone: "bg-lime-soft text-lime-deep",
  },
  {
    amount: "−$12.50",
    icon: "transport" as const,
    name: "Metro Card",
    time: "Yesterday, 6:18 PM",
    tone: "bg-blue-soft text-blue-deep",
  },
  {
    amount: "−$64.00",
    icon: "shopping" as const,
    name: "Uniqlo",
    time: "Jun 18, 2:30 PM",
    tone: "bg-peach-soft text-peach-deep",
  },
];

const categories = [
  { color: "bg-violet", label: "Home", value: "$1,240", icon: "home" as const, tone: "bg-violet-soft text-violet-deep" },
  { color: "bg-lime", label: "Food", value: "$386", icon: "food" as const, tone: "bg-lime-soft text-lime-deep" },
  { color: "bg-blue", label: "Travel", value: "$148", icon: "transport" as const, tone: "bg-blue-soft text-blue-deep" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Food");
  const [expenseAmount, setExpenseAmount] = useState("0.00");
  const [transactionItems, setTransactionItems] = useState(transactions);

  const saveExpense = () => {
    const categoryDetails = {
      Food: { icon: "food" as const, tone: "bg-lime-soft text-lime-deep" },
      Travel: { icon: "transport" as const, tone: "bg-blue-soft text-blue-deep" },
      Shop: { icon: "shopping" as const, tone: "bg-peach-soft text-peach-deep" },
      Home: { icon: "home" as const, tone: "bg-violet-soft text-violet-deep" },
    };
    const detail = categoryDetails[selectedCategory as keyof typeof categoryDetails];
    const formattedAmount = Number(expenseAmount || 0).toFixed(2);

    setTransactionItems((items) => [
      {
        amount: `−$${formattedAmount}`,
        icon: detail.icon,
        name: selectedCategory,
        time: "Just now",
        tone: detail.tone,
      },
      ...items,
    ]);
    setSaved(true);
    window.setTimeout(() => {
      setSheetOpen(false);
      setSaved(false);
      setExpenseAmount("0.00");
      setActiveTab("Home");
    }, 850);
  };

  return (
    <div className="min-h-screen bg-ink sm:grid sm:place-items-center sm:p-8">
      <main className="relative mx-auto min-h-screen w-full max-w-md overflow-hidden bg-canvas text-ink shadow-modal sm:min-h-[844px] sm:rounded-[2.25rem] sm:border sm:border-white/15">
        <div className="h-full overflow-y-auto pb-28">
          <header className="flex items-center justify-between px-5 pb-4 pt-6">
            <div className="flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-full bg-peach-soft text-sm font-bold text-peach-deep">
                CM
              </div>
              <div>
                <p className="text-xs font-medium text-muted">Good morning</p>
                <h1 className="text-lg font-semibold tracking-tight">Casey Morgan</h1>
              </div>
            </div>
            <Button
              ariaLabel="Notifications"
              className="relative grid size-11 place-items-center rounded-full border border-line bg-white shadow-sm"
            >
              <Icon name="bell" size={19} />
              <span className="absolute right-3 top-2.5 size-2 rounded-full border-2 border-white bg-peach-deep" />
            </Button>
          </header>

          {activeTab === "Home" && (
            <>
          <section className="px-5">
            <div className="relative overflow-hidden rounded-3xl bg-ink p-6 text-white shadow-lg shadow-ink/15">
              <div className="absolute -right-10 -top-14 size-44 rounded-full border-[22px] border-lime/10" />
              <div className="absolute -bottom-20 right-12 size-36 rounded-full bg-lime/5" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white/55">Available balance</p>
                  <Button className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold">
                    <Icon name="calendar" size={14} /> June
                  </Button>
                </div>
                <p className="mt-4 text-4xl font-semibold tracking-tight">$2,483.60</p>
                <div className="mt-6 flex gap-2">
                  <div className="flex-1 rounded-2xl bg-white/8 p-3">
                    <p className="text-xs text-white/45">Income</p>
                    <p className="mt-1 text-sm font-semibold text-lime">+$4,850</p>
                  </div>
                  <div className="flex-1 rounded-2xl bg-white/8 p-3">
                    <p className="text-xs text-white/45">Spent</p>
                    <p className="mt-1 text-sm font-semibold">−$2,366</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-5 pt-7">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">June budget</h2>
                <p className="mt-0.5 text-xs text-muted">12 days left in your cycle</p>
              </div>
              <Button className="text-sm font-semibold text-lime-deep">Details</Button>
            </div>

            <div className="mt-4 rounded-3xl border border-line bg-white p-5 shadow-card">
              <div className="flex items-center gap-5">
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
                      strokeDashoffset="92"
                      strokeLinecap="round"
                      strokeWidth="12"
                    />
                  </svg>
                  <div className="absolute inset-0 grid place-items-center text-center">
                    <div>
                      <p className="text-xl font-semibold">70%</p>
                      <p className="text-[10px] font-medium text-muted">spent</p>
                    </div>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-muted">You have left</p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight">$1,006.40</p>
                  <p className="mt-2 text-xs leading-5 text-muted">
                    You’re <span className="font-semibold text-lime-deep">$124 under</span> your usual pace.
                  </p>
                </div>
              </div>
              <div className="mt-5 flex h-2 overflow-hidden rounded-full bg-stone">
                <span className="w-1/2 bg-violet" />
                <span className="w-[16%] bg-lime" />
                <span className="w-[8%] bg-blue" />
                <span className="w-[6%] bg-peach" />
              </div>
            </div>
          </section>

          <section className="pt-7">
            <div className="flex items-center justify-between px-5">
              <h2 className="text-lg font-semibold tracking-tight">Top spending</h2>
              <Button ariaLabel="More category options" className="text-muted">
                <Icon name="more" size={20} />
              </Button>
            </div>
            <div className="mt-4 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none]">
              {categories.map((category) => (
                <article className="w-32 shrink-0 rounded-2xl border border-line bg-white p-4 shadow-card" key={category.label}>
                  <div className={`grid size-9 place-items-center rounded-xl ${category.tone}`}>
                    <Icon name={category.icon} size={17} />
                  </div>
                  <p className="mt-4 text-xs font-medium text-muted">{category.label}</p>
                  <p className="mt-1 font-semibold">{category.value}</p>
                  <div className="mt-3 h-1 rounded-full bg-stone">
                    <div className={`h-full w-3/4 rounded-full ${category.color}`} />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="px-5 pt-7">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">Recent activity</h2>
                <p className="mt-0.5 text-xs text-muted">Latest transactions</p>
              </div>
              <Button className="flex items-center gap-0.5 text-sm font-semibold">
                See all <Icon name="arrow" size={14} />
              </Button>
            </div>
            <div className="mt-4 overflow-hidden rounded-3xl border border-line bg-white px-4 shadow-card">
              {transactionItems.map((transaction, index) => (
                <div className="flex items-center gap-3 border-b border-line py-4 last:border-none" key={`${transaction.name}-${transaction.time}-${index}`}>
                  <div className={`grid size-11 shrink-0 place-items-center rounded-2xl ${transaction.tone}`}>
                    <Icon name={transaction.icon} size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{transaction.name}</p>
                    <p className="mt-1 text-xs text-muted">{transaction.time}</p>
                  </div>
                  <p className="text-sm font-semibold">{transaction.amount}</p>
                </div>
              ))}
            </div>
          </section>
            </>
          )}

          {activeTab === "Stats" && (
            <div className="px-5">
              <section>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted">Spending insights</p>
                    <h2 className="mt-1 text-3xl font-semibold tracking-tight">$2,366.40</h2>
                  </div>
                  <Button className="flex items-center gap-2 rounded-full border border-line bg-white px-3 py-2 text-xs font-semibold shadow-sm">
                    <Icon name="calendar" size={14} /> June
                  </Button>
                </div>
                <p className="mt-2 text-sm text-muted">
                  <span className="font-semibold text-lime-deep">8.4% less</span> than last month
                </p>
              </section>

              <section className="mt-7 rounded-3xl border border-line bg-white p-5 shadow-card">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Monthly spend</h3>
                    <p className="mt-1 text-xs text-muted">June 1–20</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted">
                    <span className="size-2 rounded-full bg-lime" /> Daily
                  </div>
                </div>
                <div className="mt-7 h-44">
                  <svg className="h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 340 170">
                    <defs>
                      <linearGradient id="mobileChart" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-lime)" stopOpacity=".42" />
                        <stop offset="100%" stopColor="var(--color-lime)" stopOpacity=".02" />
                      </linearGradient>
                    </defs>
                    <path d="M0 145H340M0 102H340M0 59H340M0 16H340" fill="none" stroke="var(--color-line)" strokeDasharray="4 5" />
                    <path d="M0 128 C28 120 35 70 70 88 S112 140 145 105 S178 36 212 63 S249 124 278 82 S315 50 340 25 V150 H0Z" fill="url(#mobileChart)" />
                    <path d="M0 128 C28 120 35 70 70 88 S112 140 145 105 S178 36 212 63 S249 124 278 82 S315 50 340 25" fill="none" stroke="var(--color-ink)" strokeLinecap="round" strokeWidth="3" vectorEffect="non-scaling-stroke" />
                    <circle cx="340" cy="25" fill="var(--color-lime)" r="5" stroke="var(--color-ink)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                  </svg>
                </div>
                <div className="flex justify-between text-[10px] font-medium text-muted">
                  <span>Jun 1</span><span>Jun 5</span><span>Jun 10</span><span>Jun 15</span><span>Jun 20</span>
                </div>
              </section>

              <section className="mt-7">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">By category</h3>
                  <Button className="text-sm font-semibold text-lime-deep">See all</Button>
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    { amount: "$1,240", icon: "home" as const, label: "Home", percent: "w-[82%]", tone: "bg-violet-soft text-violet-deep", bar: "bg-violet" },
                    { amount: "$386", icon: "food" as const, label: "Food", percent: "w-[58%]", tone: "bg-lime-soft text-lime-deep", bar: "bg-lime" },
                    { amount: "$148", icon: "transport" as const, label: "Travel", percent: "w-[36%]", tone: "bg-blue-soft text-blue-deep", bar: "bg-blue" },
                    { amount: "$112", icon: "shopping" as const, label: "Shopping", percent: "w-[27%]", tone: "bg-peach-soft text-peach-deep", bar: "bg-peach" },
                  ].map((item) => (
                    <article className="rounded-2xl border border-line bg-white p-4 shadow-card" key={item.label}>
                      <div className="flex items-center gap-3">
                        <div className={`grid size-10 place-items-center rounded-xl ${item.tone}`}>
                          <Icon name={item.icon} size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-semibold">{item.label}</span>
                            <span className="font-semibold">{item.amount}</span>
                          </div>
                          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone">
                            <div className={`h-full rounded-full ${item.percent} ${item.bar}`} />
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === "Wallet" && (
            <div className="px-5">
              <section className="relative overflow-hidden rounded-3xl bg-lime p-6">
                <div className="absolute -right-8 -top-12 size-36 rounded-full border-[20px] border-white/25" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-ink/60">Total balance</p>
                    <div className="grid size-9 place-items-center rounded-full bg-white/45">
                      <Icon name="wallet" size={17} />
                    </div>
                  </div>
                  <p className="mt-5 text-4xl font-semibold tracking-tight">$12,842.60</p>
                  <p className="mt-2 text-xs font-medium text-ink/55">Across 3 connected accounts</p>
                </div>
              </section>

              <section className="mt-7">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">Your accounts</h2>
                    <p className="mt-0.5 text-xs text-muted">Updated a moment ago</p>
                  </div>
                  <Button ariaLabel="Account options" className="text-muted"><Icon name="more" size={20} /></Button>
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    { digits: "4821", label: "Everyday checking", amount: "$2,483.60", color: "bg-ink text-white" },
                    { digits: "9034", label: "Rainy day savings", amount: "$8,240.00", color: "bg-blue-soft text-blue-deep" },
                    { digits: "1168", label: "Travel fund", amount: "$2,119.00", color: "bg-violet-soft text-violet-deep" },
                  ].map((account) => (
                    <Button className="flex w-full items-center gap-4 rounded-2xl border border-line bg-white p-4 text-left shadow-card" key={account.digits}>
                      <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${account.color}`}>
                        <Icon name="wallet" size={19} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold">{account.label}</span>
                        <span className="mt-1 block text-xs text-muted">•••• {account.digits}</span>
                      </span>
                      <span className="text-right">
                        <span className="block text-sm font-semibold">{account.amount}</span>
                        <span className="mt-1 flex justify-end text-muted"><Icon name="arrow" size={14} /></span>
                      </span>
                    </Button>
                  ))}
                </div>
              </section>

              <section className="mt-7">
                <h2 className="text-lg font-semibold">Quick actions</h2>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Button className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4 text-sm font-semibold shadow-card">
                    <span className="grid size-9 place-items-center rounded-xl bg-lime-soft text-lime-deep"><Icon name="plus" size={17} /></span>
                    Add account
                  </Button>
                  <Button className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4 text-sm font-semibold shadow-card">
                    <span className="grid size-9 place-items-center rounded-xl bg-blue-soft text-blue-deep"><Icon name="chart" size={17} /></span>
                    Statements
                  </Button>
                </div>
              </section>
            </div>
          )}
        </div>

        <nav
          aria-label="App navigation"
          className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-around border-t border-line bg-white/95 px-3 pb-5 pt-3 backdrop-blur-lg"
        >
          {[
            { icon: "home" as const, label: "Home" },
            { icon: "chart" as const, label: "Stats" },
            { icon: "target" as const, label: "Budgets" },
            { icon: "wallet" as const, label: "Wallet" },
          ].map((item, index) => (
            <div className="flex flex-1 justify-center" key={item.label}>
              {index === 2 ? (
                <Button
                  ariaLabel="Add expense"
                  className="-mt-9 grid size-14 place-items-center rounded-full border-4 border-canvas bg-lime text-ink shadow-lg shadow-ink/15 transition active:scale-95"
                  onClick={() => setSheetOpen(true)}
                >
                  <Icon name="plus" size={23} />
                </Button>
              ) : (
                <Button
                  className={`flex min-w-14 flex-col items-center gap-1.5 text-[10px] font-semibold ${
                    activeTab === item.label ? "text-ink" : "text-muted"
                  }`}
                  onClick={() => setActiveTab(item.label)}
                >
                  <span className={activeTab === item.label ? "text-lime-deep" : ""}>
                    <Icon name={item.icon} size={20} />
                  </span>
                  {item.label}
                </Button>
              )}
            </div>
          ))}
        </nav>

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
      </main>
    </div>
  );
}
