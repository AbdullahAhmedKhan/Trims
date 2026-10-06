/* ==========================================================================
   ACCOUNTS DASHBOARD - static data
   --------------------------------------------------------------------------
   Ported from "dashboard - Accounts.php". Every figure is the value that PHP
   view shipped with, ready to be swapped for a live fetch later on.

   This file holds numbers only. The page it fills is written out in full in
   modules/accounts/index.html, and assets/js/accounts-page.js says which of
   these keys goes where.
   ========================================================================== */

window.ACCOUNTS_DATA = {

  /* ---------------------------------------------- overview: the five cards */
  overview: {
    cells: [
      { label: "Total Assets", value: "৳ 4.77 Cr" },
      { label: "Revenue", value: "৳ 5.33 Cr" },
      { label: "Net Profit", value: "৳ 71.00 L" },
      { label: "Total Liabilities", value: "৳ 1.66 Cr" },
      { label: "Cash & Bank", value: "৳ 1.89 Cr" }
    ]
  },

  /* ------------------------------------------------- pl: the period chart --
     The bars and the line are described once here. `series` names each one
     and says how it is drawn: Revenue and Expense are bars, Profit is a
     line carried on the right hand axis. The numbers live in `periods`
     below, one entry per option in the picker. */
  pl: {
    type: "bar",
    height: 270,
    yfmt: "money",
    y2: { yfmt: "money" },
    series: {
      "Revenue": {
        bg: "rgba(20, 184, 166, 0.85)", border: "rgba(20, 184, 166, 1)",
        w: 1, borderRadius: 6, order: 2
      },
      "Expense": {
        bg: "rgba(255, 159, 64, 0.85)", border: "rgba(255, 159, 64, 1)",
        w: 1, borderRadius: 6, order: 3
      },
      "Profit": {
        bg: "rgba(114, 199, 255, 1)", border: "rgba(114, 199, 255, 1)",
        w: 2, type: "line", axis: "y2", order: 1
      }
    }
  },

  /* one entry per option in the picker. `title` becomes the card heading,
     `labels` is the x axis and `series` is one entry per bar group. Every
     month keeps the same rule: revenue less expense is the profit. */
  periods: {
    "3m": {
      title: "Last 3 months",
      labels: ["Jul", "Aug", "Sep"],
      series: [
        { label: "Revenue", data: [8960000, 6240000, 6790000] },
        { label: "Expense", data: [7980000, 5610000, 5850000] },
        { label: "Profit", data: [980000, 630000, 940000] }
      ]
    },
    "6m": {
      title: "Last 6 months",
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      series: [
        { label: "Revenue", data: [9850000, 10240000, 11180000, 8960000, 6240000, 6790000] },
        { label: "Expense", data: [8420000, 8760000, 9540000, 7980000, 5610000, 5850000] },
        { label: "Profit", data: [1430000, 1480000, 1640000, 980000, 630000, 940000] }
      ]
    },
    ytd: {
      title: "This year",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      series: [
        { label: "Revenue", data: [8420000, 9130000, 10520000, 9850000, 10240000, 11180000, 8960000, 6240000, 6790000] },
        { label: "Expense", data: [7180000, 7860000, 9010000, 8420000, 8760000, 9540000, 7980000, 5610000, 5850000] },
        { label: "Profit", data: [1240000, 1270000, 1510000, 1430000, 1480000, 1640000, 980000, 630000, 940000] }
      ]
    },
    lasty: {
      title: "Last year",
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
      series: [
        { label: "Revenue", data: [7840000, 8120000, 8760000, 9340000, 8970000, 9520000, 9080000, 8640000, 8210000, 8420000, 9130000, 10520000] },
        { label: "Expense", data: [6720000, 6960000, 7530000, 8020000, 7740000, 8180000, 7860000, 7410000, 7080000, 7180000, 7860000, 9010000] },
        { label: "Profit", data: [1120000, 1160000, 1230000, 1320000, 1230000, 1340000, 1220000, 1230000, 1130000, 1240000, 1270000, 1510000] }
      ]
    }
  },

  /* ------------------------------------------------- balanceSheet: tracks --
     Assets measured against what funds them. `pct` is the width of each
     bar, worked out against total assets. */
  balanceSheet: {
    rows: [
      { label: "Assets", value: "৳ 4.77 Cr", pct: 100, color: "rgba(56, 189, 248, 1)" },
      { label: "Liabilities", value: "৳ 1.66 Cr", pct: 34.8, color: "rgba(245, 158, 11, 1)" },
      { label: "Equity", value: "৳ 3.11 Cr", pct: 65.2, color: "rgba(139, 92, 246, 1)" },
      { label: "Liabilities + Equity", value: "৳ 4.77 Cr", pct: 100, color: "rgba(20, 184, 166, 1)" }
    ],
    total: [
      { label: "Difference", value: "৳ 0" },
      { label: "Identity check", value: "Balanced" }
    ]
  },

  /* ------------------------------------------------------ ledger: 18 rows --
     Every closing balance follows from the row above it: opening plus the
     debit side, less the credit side, whichever way that account runs. */
  ledger: {
    rows: [
      ["Export Sales", { b: "Revenue/Income" }, "Export", { t: "-" },
        460000, 42600000, 42100000],
      ["Raw Material Consumed", { b: "Expenses" }, "Production", { t: "-" },
        24300000, { t: "-" }, 24300000],
      ["Capital & Reserves", { b: "Liabilities" }, "Head Office", 24000000,
        { t: "-" }, { t: "-" }, 24000000],
      ["Bank Accounts", { b: "Assets" }, "Head Office", 14200000,
        25500000, 22700000, 17000000],
      ["Raw Material Stock", { b: "Assets" }, "Production", 14600000,
        26400000, 24300000, 16700000],
      ["Labour & Wages", { b: "Expenses" }, "Production", { t: "-" },
        12600000, { t: "-" }, 12600000],
      ["Sundry Debtors", { b: "Assets" }, "Head Office", 9450000,
        19800000, 17100000, 12200000],
      ["Local Sales", { b: "Revenue/Income" }, "Local", { t: "-" },
        120000, 11200000, 11100000],
      ["Sundry Creditors", { b: "Liabilities" }, "Head Office", 7880000,
        18900000, 20800000, 9820000],
      ["Bank Loan (ST)", { b: "Liabilities" }, "Head Office", 6000000,
        1500000, { t: "-" }, 4500000],
      ["Factory Overhead", { b: "Expenses" }, "Production", { t: "-" },
        4120000, { t: "-" }, 4120000],
      ["Freight & Carriage", { b: "Expenses" }, "Export", { t: "-" },
        2780000, { t: "-" }, 2780000],
      ["Cash in Hand", { b: "Assets" }, "Head Office", 1850000,
        { t: "-" }, { t: "-" }, 1850000],
      ["Rent", { b: "Expenses" }, "Head Office", { t: "-" },
        1500000, { t: "-" }, 1500000],
      ["VAT Payable", { b: "Liabilities" }, "Head Office", 1240000,
        2150000, 2380000, 1470000],
      ["Wages Payable", { b: "Liabilities" }, "Production", 980000,
        4120000, 3950000, 810000],
      ["Utilities", { b: "Expenses" }, "Production", { t: "-" },
        590000, { t: "-" }, 590000],
      ["Bank Charges", { b: "Expenses" }, "Head Office", { t: "-" },
        220000, { t: "-" }, 220000]
    ],
    total: ["Total", "", "", "",
      { t: "৳ 14.51 Cr" }, { t: "৳ 14.51 Cr" }, { t: "-" }]
  },

  /* --------------------------------------------------- voucherMix: bars --
     The bar is the share of the 342 vouchers that type makes up, so the
     longest bar is the commonest voucher, not the biggest one. */
  voucherMix: {
    rows: [
      { label: "Receipt", value: "96 · ৳ 4.13 Cr", pct: 100, color: "rgba(20, 184, 166, 1)" },
      { label: "Payment", value: "78 · ৳ 3.37 Cr", pct: 81.25, color: "rgba(244, 63, 94, 1)" },
      { label: "Journal", value: "34 · ৳ 41.20 L", pct: 35.4167, color: "rgba(139, 92, 246, 1)" },
      { label: "Contra", value: "12 · ৳ 89.00 L", pct: 12.5, color: "rgba(245, 158, 11, 1)" },
      { label: "Purchase", value: "58 · ৳ 2.95 Cr", pct: 60.4167, color: "rgba(56, 189, 248, 1)" },
      { label: "Sales", value: "64 · ৳ 4.62 Cr", pct: 66.6667, color: "rgba(16, 185, 129, 1)" }
    ]
  },

  /* ---------------------------------------------- recentVouchers: 8 rows --
     Each voucher shows the same figure on both sides: a posting moves an
     amount from one ledger to another, it does not create or destroy it. */
  recentVouchers: {
    rows: [
      ["RV-2026-0418", { b: "Receipt" }, "29 Sep 2026", "Sundry Debtors",
        864000, 864000, { b: "Posted" }],
      ["PV-2026-0392", { b: "Payment" }, "28 Sep 2026", "Sundry Creditors",
        642000, 642000, { b: "Posted" }],
      ["JV-2026-0161", { b: "Journal" }, "27 Sep 2026", "Wages Payable",
        395000, 395000, { b: "Posted" }],
      ["SV-2026-0244", { b: "Sales" }, "26 Sep 2026", "Export Sales",
        1240000, 1240000, { b: "Posted" }],
      ["CV-2026-0088", { b: "Contra" }, "25 Sep 2026", "Bank Accounts",
        450000, 450000, { b: "Posted" }],
      ["PV-2026-0391", { b: "Payment" }, "24 Sep 2026", "Raw Material Stock",
        728000, 728000, { b: "Draft" }],
      ["RV-2026-0417", { b: "Receipt" }, "23 Sep 2026", "Sundry Debtors",
        512000, 512000, { b: "Posted" }],
      ["JV-2026-0160", { b: "Journal" }, "22 Sep 2026", "Utilities",
        96000, 96000, { b: "Draft" }]
    ]
  },

  /* -------------------------------------------------- liquidity: tracks --
     Each bar is that balance against total assets, so the four of them are
     read off one scale. */
  liquidity: {
    rows: [
      { label: "Cash & Bank", value: "৳ 1.89 Cr", pct: 39.6, color: "rgba(20, 184, 166, 1)" },
      { label: "Receivables", value: "৳ 1.22 Cr", pct: 25.6, color: "rgba(56, 189, 248, 1)" },
      { label: "Inventory", value: "৳ 1.67 Cr", pct: 35, color: "rgba(139, 92, 246, 1)" },
      { label: "Payables", value: "৳ 98.20 L", pct: 20.6, color: "rgba(245, 158, 11, 1)" }
    ],
    total: [
      { label: "Working capital", value: "৳ 3.56 Cr" },
      { label: "Current ratio", value: "3.94:1" },
      { label: "Debt / Equity", value: "0.53:1" },
      { label: "Net margin", value: "13.3%" }
    ]
  }
};
