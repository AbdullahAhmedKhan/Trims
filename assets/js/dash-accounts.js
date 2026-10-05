/* ==========================================================================
   ACCOUNTS DASHBOARD - static data
   --------------------------------------------------------------------------
   Ported from "dashboard - Accounts.php". Every figure is the value that PHP
   view shipped with, ready to be swapped for a live fetch later on.
   ========================================================================== */

window.SKDash.register('accounts', {
  title: 'Accounts Dashboard',
  note: 'Posted trial balance, six month profit and loss, ledger balances, voucher mix and the liquidity ratios.',

  blocks: [

    /* ------------------------------------------------ ROW 1 : ACCOUNTS OVERVIEW */
    { row: [

      { k: 'hero', c: 12,
        title: 'Accounts Overview',
        sub: 'Posted trial balance to date, the result for the period, and where the money sits right now',
        link: { label: 'Trial Balance', href: 'modules/accounts/index.html?id=trail-balance' },
        cells: [
          { label: 'Total Assets', value: '৳ 4.77 Cr', pct: 100, color: '#0284c7' },
          { label: 'Revenue', value: '৳ 5.33 Cr', pct: 100, color: '#0284c7', div: true },
          { label: 'Net Profit', value: '৳ 71.00 L', pct: 13.3, color: '#0284c7', div: true },
          { label: 'Total Liabilities', value: '৳ 1.66 Cr', pct: 34.8, color: '#0284c7', div: true },
          { label: 'Cash & Bank', value: '৳ 1.89 Cr', pct: 39.5, color: '#0284c7', div: true }
        ],
        stats: [
          { label: 'Ledgers', value: '18', color: '#334155' },
          { label: 'Vouchers', value: '342', color: '#334155' },
          { label: 'Margin', value: '13.3%', color: '#334155' },
          { label: 'Current Ratio', value: '3.94:1', color: '#334155' },
          { label: 'Debt / Equity', value: '0.53:1', color: '#334155' }
        ]
      }
    ] },

    /* ------------------------------------- ROW 2 : SIX MONTH P&L + BALANCE SHEET */
    { row: [

      { k: 'chart', id: 'acc-pl', c: 8,
        title: 'Last 6 Months P&L',
        sub: 'Revenue against expense for the period, with the profit carried on the right axis',
        chart: {
          type: 'bar',
          height: 270,
          yfmt: 'money',
          y2: { yfmt: 'money' },
          labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          datasets: [
            { label: 'Revenue', data: [9850000, 10240000, 11180000, 8960000, 6240000, 6790000],
              bg: 'rgba(20, 184, 166, 0.85)', border: 'rgba(20, 184, 166, 1)',
              w: 1, borderRadius: 6, type: 'bar', order: 2 },
            { label: 'Expense', data: [8420000, 8760000, 9540000, 7980000, 5610000, 5850000],
              bg: 'rgba(255, 159, 64, 0.85)', border: 'rgba(255, 159, 64, 1)',
              w: 1, borderRadius: 6, type: 'bar', order: 3 },
            { label: 'Profit', axis: 'y2', data: [1430000, 1480000, 1640000, 980000, 630000, 940000],
              bg: 'rgba(114, 199, 255, 1)', border: 'rgba(114, 199, 255, 1)',
              w: 2, type: 'line', order: 1 }
          ]
        },
        legendList: [
          { label: 'Revenue', color: 'rgba(20, 184, 166, 1)' },
          { label: 'Expense', color: 'rgba(255, 159, 64, 1)' },
          { label: 'Profit', color: 'rgba(114, 199, 255, 1)' }
        ]
      },

      { k: 'tracks', id: 'acc-bs', c: 4,
        title: 'Balance Sheet Position',
        sub: 'Assets measured against what funds them',
        rows: [
          { label: 'Assets', v: '৳ 4.77 Cr', p: 100, c: 'rgba(56, 189, 248, 1)' },
          { label: 'Liabilities', v: '৳ 1.66 Cr', p: 34.8, c: 'rgba(245, 158, 11, 1)' },
          { label: 'Equity', v: '৳ 3.11 Cr', p: 65.2, c: 'rgba(139, 92, 246, 1)' },
          { label: 'Liabilities + Equity', v: '৳ 4.77 Cr', p: 100, c: 'rgba(20, 184, 166, 1)' }
        ],
        total: [
          { label: 'Difference', value: '৳ 0' },
          { label: 'Identity check', value: 'Balanced' }
        ]
      }
    ] },

    /* ------------------------------------------ ROW 3 : LEDGER BALANCES + VOUCHER MIX */
    { row: [

      { k: 'table', id: 'acc-ledger', c: 8,
        title: 'Ledger Balances',
        sub: '18 ledgers · total debit ৳ 14.51 Cr against total credit ৳ 14.51 Cr',
        link: { label: 'Ledger Report', href: 'modules/accounts/index.html?id=ledger-report' },
        max: 430,
        cols: [{ t: 'Ledger', a: 'l' }, { t: 'Group', a: 'l' }, { t: 'Cost centre', a: 'l' },
          { t: 'Opening', a: 'r' }, { t: 'Debit', a: 'r' }, { t: 'Credit', a: 'r' },
          { t: 'Closing', a: 'r' }],
        rows: [
          ['Export Sales', { b: 'Revenue/Income' }, 'Export', '-',
            { t: '৳ 4.60 L' }, { t: '৳ 4.26 Cr' }, { t: '৳ 4.21 Cr' }],
          ['Raw Material Consumed', { b: 'Expenses' }, 'Production', '-',
            { t: '৳ 2.43 Cr' }, '-', { t: '৳ 2.43 Cr' }],
          ['Capital & Reserves', { b: 'Liabilities' }, 'Head Office', { t: '৳ 2.40 Cr' },
            '-', '-', { t: '৳ 2.40 Cr' }],
          ['Bank Accounts', { b: 'Assets' }, 'Head Office', { t: '৳ 1.42 Cr' },
            { t: '৳ 2.55 Cr' }, { t: '৳ 2.27 Cr' }, { t: '৳ 1.70 Cr' }],
          ['Raw Material Stock', { b: 'Assets' }, 'Production', { t: '৳ 1.46 Cr' },
            { t: '৳ 2.64 Cr' }, { t: '৳ 2.43 Cr' }, { t: '৳ 1.67 Cr' }],
          ['Labour & Wages', { b: 'Expenses' }, 'Production', '-',
            { t: '৳ 1.26 Cr' }, '-', { t: '৳ 1.26 Cr' }],
          ['Sundry Debtors', { b: 'Assets' }, 'Head Office', { t: '৳ 94.50 L' },
            { t: '৳ 1.98 Cr' }, { t: '৳ 1.71 Cr' }, { t: '৳ 1.22 Cr' }],
          ['Local Sales', { b: 'Revenue/Income' }, 'Local', '-',
            { t: '৳ 1.20 L' }, { t: '৳ 1.12 Cr' }, { t: '৳ 1.11 Cr' }],
          ['Sundry Creditors', { b: 'Liabilities' }, 'Head Office', { t: '৳ 78.80 L' },
            { t: '৳ 1.89 Cr' }, { t: '৳ 2.08 Cr' }, { t: '৳ 98.20 L' }],
          ['Bank Loan (ST)', { b: 'Liabilities' }, 'Head Office', { t: '৳ 60.00 L' },
            { t: '৳ 15.00 L' }, '-', { t: '৳ 45.00 L' }],
          ['Factory Overhead', { b: 'Expenses' }, 'Production', '-',
            { t: '৳ 41.20 L' }, '-', { t: '৳ 41.20 L' }],
          ['Freight & Carriage', { b: 'Expenses' }, 'Export', '-',
            { t: '৳ 27.80 L' }, '-', { t: '৳ 27.80 L' }],
          ['Cash in Hand', { b: 'Assets' }, 'Head Office', { t: '৳ 18.50 L' },
            '-', '-', { t: '৳ 18.50 L' }],
          ['Rent', { b: 'Expenses' }, 'Head Office', '-',
            { t: '৳ 15.00 L' }, '-', { t: '৳ 15.00 L' }],
          ['VAT Payable', { b: 'Liabilities' }, 'Head Office', { t: '৳ 12.40 L' },
            { t: '৳ 21.50 L' }, { t: '৳ 23.80 L' }, { t: '৳ 14.70 L' }],
          ['Wages Payable', { b: 'Liabilities' }, 'Production', { t: '৳ 9.80 L' },
            { t: '৳ 41.20 L' }, { t: '৳ 39.50 L' }, { t: '৳ 8.10 L' }],
          ['Utilities', { b: 'Expenses' }, 'Production', '-',
            { t: '৳ 5.90 L' }, '-', { t: '৳ 5.90 L' }],
          ['Bank Charges', { b: 'Expenses' }, 'Head Office', '-',
            { t: '৳ 2.20 L' }, '-', { t: '৳ 2.20 L' }]
        ],
        total: ['Total', '', '', '-',
          { t: '৳ 14.51 Cr' }, { t: '৳ 14.51 Cr' }, '-']
      },

      { k: 'bars', id: 'acc-mix', c: 4,
        title: 'Voucher Mix',
        sub: '342 posted vouchers worth ৳ 16.36 Cr',
        rows: [
          { n: 'Receipt', v: '96 · ৳ 4.13 Cr', p: 100, c: 'rgba(20, 184, 166, 1)' },
          { n: 'Payment', v: '78 · ৳ 3.37 Cr', p: 81.3, c: 'rgba(244, 63, 94, 1)' },
          { n: 'Journal', v: '34 · ৳ 41.20 L', p: 35.4, c: 'rgba(139, 92, 246, 1)' },
          { n: 'Contra', v: '12 · ৳ 89.00 L', p: 12.5, c: 'rgba(245, 158, 11, 1)' },
          { n: 'Purchase', v: '58 · ৳ 2.95 Cr', p: 60.4, c: 'rgba(56, 189, 248, 1)' },
          { n: 'Sales', v: '64 · ৳ 4.62 Cr', p: 66.7, c: 'rgba(16, 185, 129, 1)' }
        ]
      }
    ] },

    /* ------------------------------------------- ROW 4 : RECENT VOUCHERS + LIQUIDITY */
    { row: [

      { k: 'table', id: 'acc-vouchers', c: 8,
        title: 'Recent Vouchers',
        sub: '8 most recent · 2 still in draft',
        link: { label: 'Day Book', href: 'modules/accounts/index.html?id=daybook' },
        cols: [{ t: 'Voucher', a: 'l' }, { t: 'Type', a: 'l' }, { t: 'Date', a: 'l' },
          { t: 'Party / ledger', a: 'l' }, { t: 'Debit', a: 'r' }, { t: 'Credit', a: 'r' },
          { t: 'Status', a: 'c' }],
        rows: [
          ['RV-2026-0418', { b: 'Receipt' }, '29 Sep 2026', 'Sundry Debtors',
            { t: '৳ 8.64 L' }, { t: '৳ 8.64 L' }, { b: 'Posted' }],
          ['PV-2026-0392', { b: 'Payment' }, '28 Sep 2026', 'Sundry Creditors',
            { t: '৳ 6.42 L' }, { t: '৳ 6.42 L' }, { b: 'Posted' }],
          ['JV-2026-0161', { b: 'Journal' }, '27 Sep 2026', 'Wages Payable',
            { t: '৳ 3.95 L' }, { t: '৳ 3.95 L' }, { b: 'Posted' }],
          ['SV-2026-0244', { b: 'Sales' }, '26 Sep 2026', 'Export Sales',
            { t: '৳ 12.40 L' }, { t: '৳ 12.40 L' }, { b: 'Posted' }],
          ['CV-2026-0088', { b: 'Contra' }, '25 Sep 2026', 'Bank Accounts',
            { t: '৳ 4.50 L' }, { t: '৳ 4.50 L' }, { b: 'Posted' }],
          ['PV-2026-0391', { b: 'Payment' }, '24 Sep 2026', 'Raw Material Stock',
            { t: '৳ 7.28 L' }, { t: '৳ 7.28 L' }, { b: 'Draft' }],
          ['RV-2026-0417', { b: 'Receipt' }, '23 Sep 2026', 'Sundry Debtors',
            { t: '৳ 5.12 L' }, { t: '৳ 5.12 L' }, { b: 'Posted' }],
          ['JV-2026-0160', { b: 'Journal' }, '22 Sep 2026', 'Utilities',
            { t: '৳ 96,000' }, { t: '৳ 96,000' }, { b: 'Draft' }]
        ]
      },

      { k: 'tracks', id: 'acc-liquidity', c: 4,
        title: 'Liquidity & Returns',
        sub: 'Ratios read straight off the trial balance',
        rows: [
          { label: 'Cash & Bank', v: '৳ 1.89 Cr', p: 39.5, c: 'rgba(20, 184, 166, 1)' },
          { label: 'Receivables', v: '৳ 1.22 Cr', p: 25.5, c: 'rgba(56, 189, 248, 1)' },
          { label: 'Inventory', v: '৳ 1.67 Cr', p: 35, c: 'rgba(139, 92, 246, 1)' },
          { label: 'Payables', v: '৳ 98.20 L', p: 20.6, c: 'rgba(245, 158, 11, 1)' }
        ],
        total: [
          { label: 'Working capital', value: '৳ 3.56 Cr' },
          { label: 'Current ratio', value: '3.94:1' },
          { label: 'Debt / Equity', value: '0.53:1' },
          { label: 'Net margin', value: '13.3%' }
        ]
      }
    ] },
  ]
});
