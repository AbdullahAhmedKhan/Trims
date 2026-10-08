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

  /* ---------------------------------------------- overview: the four cards */
  overview: {
    cells: [
      { label: "Total Assets", value: "৳ 4.77 Cr" },
      { label: "Total Liabilities", value: "৳ 1.66 Cr" },
      { label: "Total Receivable", value: "৳ 1.22 Cr" },
      { label: "Total Payable", value: "৳ 98.20 L" }
    ]
  },

  /* -------------------------------------------- pl: the P&L period chart --
     The three bars are described once here. `series` names each one and
     says how it is drawn: Revenue, Cost and Profit stand together as bars
     on the one axis. The numbers live in `periods` below, one entry per
     option in the picker. */
  pl: {
    type: "bar",
    height: 270,
    yfmt: "money",
    series: {
      "Revenue": {
        bg: "rgba(20, 184, 166, 0.85)", border: "rgba(20, 184, 166, 1)",
        w: 1, borderRadius: 6, order: 2
      },
      "Cost": {
        bg: "rgba(255, 159, 64, 0.85)", border: "rgba(255, 159, 64, 1)",
        w: 1, borderRadius: 6, order: 3
      },
      "Profit": {
        bg: "rgba(114, 199, 255, 0.85)", border: "rgba(114, 199, 255, 1)",
        w: 1, borderRadius: 6, order: 1
      }
    }
  },

  /* one entry per option in the picker. `title` becomes the card heading -
     the Profit and Loss Overview keeps its name and the period is carried
     after it - `labels` is the x axis and `series` one entry per bar group.
     Every month keeps the same rule: revenue less cost is the profit. */
  periods: {
    "7d": {
      title: "Profit and Loss Overview · Last 7 days",
      labels: ["24 Sep", "25 Sep", "26 Sep", "27 Sep", "28 Sep", "29 Sep", "30 Sep"],
      series: [
        { label: "Revenue", data: [268000, 194000, 312000, 158000, 246000, 289000, 231000] },
        { label: "Cost", data: [231000, 172000, 268000, 141000, 214000, 249000, 203000] },
        { label: "Profit", data: [37000, 22000, 44000, 17000, 32000, 40000, 28000] }
      ]
    },
    "3m": {
      title: "Profit and Loss Overview · Last 3 months",
      labels: ["Jul", "Aug", "Sep"],
      series: [
        { label: "Revenue", data: [8960000, 6240000, 6790000] },
        { label: "Cost", data: [7980000, 5610000, 5850000] },
        { label: "Profit", data: [980000, 630000, 940000] }
      ]
    },
    "6m": {
      title: "Profit and Loss Overview · Last 6 months",
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      series: [
        { label: "Revenue", data: [9850000, 10240000, 11180000, 8960000, 6240000, 6790000] },
        { label: "Cost", data: [8420000, 8760000, 9540000, 7980000, 5610000, 5850000] },
        { label: "Profit", data: [1430000, 1480000, 1640000, 980000, 630000, 940000] }
      ]
    },
    ytd: {
      title: "Profit and Loss Overview · This year",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      series: [
        { label: "Revenue", data: [8420000, 9130000, 10520000, 9850000, 10240000, 11180000, 8960000, 6240000, 6790000] },
        { label: "Cost", data: [7180000, 7860000, 9010000, 8420000, 8760000, 9540000, 7980000, 5610000, 5850000] },
        { label: "Profit", data: [1240000, 1270000, 1510000, 1430000, 1480000, 1640000, 980000, 630000, 940000] }
      ]
    },
    lasty: {
      title: "Profit and Loss Overview · Last year",
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
      series: [
        { label: "Revenue", data: [7840000, 8120000, 8760000, 9340000, 8970000, 9520000, 9080000, 8640000, 8210000, 8420000, 9130000, 10520000] },
        { label: "Cost", data: [6720000, 6960000, 7530000, 8020000, 7740000, 8180000, 7860000, 7410000, 7080000, 7180000, 7860000, 9010000] },
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

  /* ------------------------------------------------ receivable: 6 rows --
     The parties that owe the most, ranked by closing balance. The six of
     them carry ৳ 94.00 L of the ৳ 1.22 Cr sitting in Sundry Debtors. */
  receivable: {
    rows: [
      ["Bashundhara Group", 2450000],
      ["Meghna Group", 1980000],
      ["Noman Group", 1640000],
      ["Urmi Group", 1320000],
      ["Padma Printers", 1150000],
      ["Delta Knitwear", 860000]
    ],
    total: [{ t: "Top 6 of 18" }, 9400000]
  },

  /* ------------------------------------------------- payable: 6 rows --
     The suppliers the business owes the most, ranked by closing balance.
     The six of them carry ৳ 87.90 L of the ৳ 98.20 L in Sundry Creditors. */
  payable: {
    rows: [
      ["Janata Jute Mills", 2180000],
      ["Nur Jute Mills Ltd", 1760000],
      ["YKK Bangladesh", 1640000],
      ["Coats Bangla Ltd", 1380000],
      ["Padma Zip Industries", 1050000],
      ["Amin Label Works", 780000]
    ],
    total: [{ t: "Top 6 of 14" }, 8790000]
  },

  /* ------------------------------------------------ topCustomers: rows --
     The customers that bought the most, ranked by revenue. The six of them
     carry ৳ 2.91 Cr of the ৳ 5.33 Cr taken in. */
  topCustomers: {
    rows: [
      ["Bashundhara Group", 6840000],
      ["Meghna Group", 5920000],
      ["Noman Group", 5180000],
      ["Urmi Group", 4460000],
      ["Padma Printers", 3720000],
      ["Delta Knitwear", 2980000]
    ],
    total: [{ t: "Top 6 of 61" }, 29100000]
  },

  /* --------------------------------------- expenseBreakdown: doughnut --
     Total expense for the year, split by head, with the total drawn in the
     middle of the ring. The six heads add up to the expense rows of the
     ledger above - ৳ 4.61 Cr - and the middle figure is worked out from
     `datasets` as the chart is drawn, so it follows the numbers.

     The slices are written twice: as `datasets` for the ring, and as
     `legend` for the key beside it, which carries each head's amount. */
  expenseBreakdown: {
    type: "doughnut",
    height: 280,
    center: "Total Expense",
    labels: ["Raw material", "Salary", "Utilities", "Transport", "Office & Admin", "Others"],
    bg: [
      "rgba(2, 132, 199, 0.85)",
      "rgba(20, 184, 166, 0.85)",
      "rgba(245, 158, 11, 0.85)",
      "rgba(139, 92, 246, 0.85)",
      "rgba(56, 189, 248, 0.85)",
      "rgba(148, 163, 184, 0.85)"
    ],
    datasets: [{
      data: [24300000, 12600000, 590000, 2780000, 1720000, 4120000],
      bg: [
        "rgba(2, 132, 199, 0.85)",
        "rgba(20, 184, 166, 0.85)",
        "rgba(245, 158, 11, 0.85)",
        "rgba(139, 92, 246, 0.85)",
        "rgba(56, 189, 248, 0.85)",
        "rgba(148, 163, 184, 0.85)"
      ]
    }],
    legend: [
      { label: "Raw material", value: "৳ 2.43 Cr", color: "rgba(2, 132, 199, 1)" },
      { label: "Salary", value: "৳ 1.26 Cr", color: "rgba(20, 184, 166, 1)" },
      { label: "Utilities", value: "৳ 5.90 L", color: "rgba(245, 158, 11, 1)" },
      { label: "Transport", value: "৳ 27.80 L", color: "rgba(139, 92, 246, 1)" },
      { label: "Office & Admin", value: "৳ 17.20 L", color: "rgba(56, 189, 248, 1)" },
      { label: "Others", value: "৳ 41.20 L", color: "rgba(148, 163, 184, 1)" }
    ]
  }
};
