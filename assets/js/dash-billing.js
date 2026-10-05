/* ==========================================================================
   BILLING DASHBOARD - static data
   --------------------------------------------------------------------------
   Ported from "dashboard - Billing.php", every figure the view shipped with,
   the derived totals worked out the same way the PHP worked them out.
   ========================================================================== */

window.SKDash.register('billing', {
  title: 'Billing Dashboard',
  note: 'Dispatched value turning into billed and collected money, the collection funnel, receivables aging by party, the latest bills and the running LC timeline.',

  blocks: [

    /* --------------------------------------------------- ROW 1 : OVERVIEW */
    { row: [

      { k: 'hero', c: 12,
        title: 'Billing Overview',
        sub: 'Dispatched value against what has been billed and what has actually come in',
        link: { label: 'Create New Bill', href: 'modules/billing/index.html?id=create-new-bill' },
        cells: [
          { label: 'Delivered', value: '৳ 24.86 L', pct: 100, color: '#0284c7' },
          { label: 'Bill Prepared', value: '৳ 19.42 L', pct: 78.1, color: '#0284c7', div: true },
          { label: 'Billed', value: '৳ 17.86 L', pct: 71.9, color: '#0284c7', div: true },
          { label: 'Collected', value: '৳ 12.54 L', pct: 70.2, color: '#0284c7', div: true },
          { label: 'Outstanding AR', value: '৳ 56.58 L', pct: 19.0, color: '#0284c7', div: true }
        ],
        stats: [
          { label: 'Bills Raised · September', value: '৳ 17.86 L' },
          { label: 'Pending Billing · delivered, not billed', value: '৳ 6.99 L' },
          { label: 'Collection Rate · collected against billed', value: '70.2%' },
          { label: 'Over 90 Days · 19.0% of receivable', value: '৳ 10.77 L' },
          { label: 'LC in Hand · 5 LCs running', value: '৳ 42.18 L' }
        ]
      }
    ] },

    /* -------------------------------- ROW 2 : SIX MONTH TREND + COLLECTION FUNNEL */
    { row: [

      { k: 'chart', id: 'b-trend', c: 8,
        title: 'Last 6 Months Billing',
        sub: 'Delivered, billed and collected value, with the collection rate on the right axis',
        chart: {
          type: 'bar',
          height: 290,
          yfmt: 'money',
          y2: { yfmt: 'pct', min: 0, max: 100 },
          labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          datasets: [
            { label: 'Delivered', data: [3820000, 4150000, 4490000, 4260000, 3980000, 2485600],
              bg: 'rgba(114, 199, 255, 0.35)', border: 'rgba(114, 199, 255, 1)',
              w: 1, borderRadius: 4, order: 3 },
            { label: 'Billed', data: [3310000, 3680000, 4020000, 3790000, 3460000, 1786500],
              bg: 'rgba(139, 92, 246, 0.3)', border: 'rgba(139, 92, 246, 1)',
              w: 1, borderRadius: 4, order: 2 },
            { label: 'Collected', type: 'line', data: [2548000, 2911000, 3163000, 2933000, 2616000, 1254300],
              bg: 'rgba(20, 184, 166, 1)', border: 'rgba(20, 184, 166, 1)',
              w: 2, order: 1 },
            { label: 'Collection rate', type: 'line', axis: 'y2', data: [77.0, 79.1, 78.7, 77.4, 75.6, 70.2],
              bg: 'rgba(255, 159, 64, 1)', border: 'rgba(255, 159, 64, 1)',
              w: 2, order: 0 }
          ]
        }
      },

      { k: 'funnel', id: 'b-funnel', c: 4,
        title: 'Collection Funnel',
        sub: 'Sept 2026 · how dispatched value converts into cash',
        steps: [
          { step: 'Delivered', v: '৳ 24.86 L', note: 'Value dispatched in September · 100.0% of delivered', c: 'rgba(114, 199, 255, 1)' },
          { step: 'Bill Prepared', v: '৳ 19.42 L', note: 'Challans picked up for billing · 78.1% of delivered', c: 'rgba(20, 184, 166, 1)' },
          { step: 'Billed', v: '৳ 17.86 L', note: 'Bill numbers assigned against them · 71.9% of delivered', c: 'rgba(139, 92, 246, 1)' },
          { step: 'Collected', v: '৳ 12.54 L', note: 'Cash received against those bills · 50.5% of delivered', c: 'rgba(20, 184, 166, 0.75)' }
        ],
        carry: [
          { t: 'carried forward to Bill Prepared', n: '78.1%' },
          { t: 'carried forward to Billed', n: '92.0%' },
          { t: 'carried forward to Collected', n: '70.2%' }
        ]
      }
    ] },

    /* ------------------------------------- ROW 3 : AR AGING + LATEST BILLS */
    { row: [

      { k: 'bars', id: 'b-aging', c: 8,
        title: 'Outstanding by Party · Aging',
        sub: 'Total receivable ৳ 56.58 L across 10 parties · bar length is the share of total receivable',
        rows: [
          { n: 'DBL Group', v: '৳ 12.65 L', p: 22.4, c: 'rgba(114, 199, 255, 1)', b: '31-60', note: 'Due 28 Oct 2026' },
          { n: 'Noman Group', v: '৳ 9.86 L', p: 17.4, c: 'rgba(255, 159, 64, 1)', b: '61-90', note: 'Due 22 Nov 2026' },
          { n: 'Sinha Textile', v: '৳ 8.42 L', p: 14.9, c: 'rgba(20, 184, 166, 1)', b: '0-30', note: 'Due 04 Oct 2026' },
          { n: 'Prime Denim', v: '৳ 6.72 L', p: 11.9, c: 'rgba(247, 107, 138, 1)', b: '90+', note: 'Due 05 Sep 2026' },
          { n: 'Hanuman Textile', v: '৳ 4.18 L', p: 7.4, c: 'rgba(20, 184, 166, 1)', b: '0-30', note: 'Due 09 Oct 2026' },
          { n: 'MJ Group', v: '৳ 4.05 L', p: 7.2, c: 'rgba(247, 107, 138, 1)', b: '90+', note: 'Due 12 Sep 2026' },
          { n: 'Shanta Holdings', v: '৳ 3.96 L', p: 7.0, c: 'rgba(114, 199, 255, 1)', b: '31-60', note: 'Due 31 Oct 2026' },
          { n: 'Rupali Knitwear', v: '৳ 2.88 L', p: 5.1, c: 'rgba(255, 159, 64, 1)', b: '61-90', note: 'Due 19 Nov 2026' },
          { n: 'Envy Pacific', v: '৳ 2.34 L', p: 4.1, c: 'rgba(20, 184, 166, 1)', b: '0-30', note: 'Due 01 Oct 2026' },
          { n: 'Beximco Limited', v: '৳ 1.52 L', p: 2.7, c: 'rgba(20, 184, 166, 1)', b: '0-30', note: 'Due 06 Oct 2026' }
        ],
        foot: { label: '0-30 ৳ 16.46 L · 31-60 ৳ 16.61 L · 61-90 ৳ 12.74 L · 90+ ৳ 10.77 L' }
      },

      { k: 'table', id: 'b-bills', c: 4,
        title: 'Latest Bills',
        link: { label: 'View All', href: 'modules/billing/index.html?id=bill-list' },
        cols: [{ t: 'Bill No', a: 'l' }, { t: 'Party', a: 'l' },
          { t: 'Amount', a: 'r', f: 'money' }, { t: 'Status', a: 'c' }],
        rows: [
          ['1184/26', 'Sinha Textile', 486900, { b: 'Billed' }],
          ['1183/26', 'DBL Group', 312700, { b: 'Billed' }],
          ['1182/26', 'Envy Pacific', 584000, { b: 'Billed' }],
          ['1181/26', 'Hanuman Textile', 236800, { b: 'Billed' }],
          ['1180/26', 'Noman Group', 198400, { b: 'Billed' }],
          ['1179/26', 'Beximco Limited', 152300, { b: 'Partial' }],
          ['1178/26', 'Prime Denim', 315400, { b: 'Prepared' }]
        ],
        total: ['Total', '7 bills', 2286500, '']
      }
    ] },

    /* ------------------------------------- ROW 4 : LC & COLLECTION TIMELINE */
    { row: [

      { k: 'table', id: 'b-lc', c: 12,
        title: 'LC & Collection Timeline',
        sub: 'com_tracking stages · lc_open → forward_to_party → forward_to_bank → bank_acceptance → in_hand · earliest maturity first, because that is the order the cash arrives in',
        link: { label: 'View All', href: 'modules/commercial/index.html?id=commercial-tracking' },
        cols: [{ t: 'LC No', a: 'l' }, { t: 'Party', a: 'l' },
          { t: 'Value', a: 'r', f: 'money' }, { t: 'Opened', a: 'l' },
          { t: 'Maturity', a: 'l' }, { t: 'Stage', a: 'c' },
          { t: 'Days Left', a: 'r', f: 'qty' }],
        rows: [
          ['LC-2026-0396', 'Beximco Limited', 930000, '24 Jul 2026', '28 Oct 2026', { b: 'In Hand' }, 28],
          ['LC-2026-0412', 'Prime Denim', 1240000, '12 Aug 2026', '15 Nov 2026', { b: 'Bank Acceptance' }, 46],
          ['LC-2026-0438', 'Rupali Knitwear', 865000, '02 Sep 2026', '30 Nov 2026', { b: 'Forwarded to Bank' }, 61],
          ['LC-2026-0451', 'Shanta Holdings', 620000, '18 Sep 2026', '20 Dec 2026', { b: 'Forwarded to Party' }, 81],
          ['LC-2026-0447', 'MJ Group', 563000, '11 Sep 2026', '15 Jan 2027', { b: 'LC Open' }, 107]
        ],
        total: ['Total in hand', '5 LCs running', 4218000, '', 'earliest maturity drives collection', '', '']
      }
    ] },
  ]
});
