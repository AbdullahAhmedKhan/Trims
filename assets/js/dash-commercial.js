/* ==========================================================================
   COMMERCIAL DASHBOARD - static data
   --------------------------------------------------------------------------
   Ported from "dashboard - Commercial.php". Every number is the value the
   PHP view shipped with, ready to be swapped for a live fetch later on.
   ========================================================================== */

window.SKDash.register('commercial', {
  title: 'Commercial Dashboard',
  note: 'Proforma invoices, export LCs, lifecycle stages and maturity timeline for the commercial desk.',
  blocks: [

    /* ------------------------------------- ROW 1 : COMMERCIAL OVERVIEW (HERO) */
    {
      row: [
        {
          k: 'hero',
          c: 12,
          title: 'Commercial Overview',
          sub: 'Proforma invoices raised against the export LCs opened on them, and where every LC sits today',
          link: { label: 'Commercial List', href: 'modules/commercial/index.html' },
          cells: [
            {
              label: 'PI Value',
              value: '৳ 24.86 L',
              pct: 100,
              color: '#0284c7',
              div: false
            },
            {
              label: 'LC Book',
              value: '৳ 41.61 L',
              pct: 100,
              color: '#0284c7',
              div: true
            },
            {
              label: 'In Hand',
              value: '৳ 13.13 L',
              pct: 31.6,
              color: '#0284c7',
              div: true
            },
            {
              label: 'Forwarded',
              value: '৳ 5.63 L',
              pct: 13.5,
              color: '#0284c7',
              div: true
            },
            {
              label: 'Commercials',
              value: '৳ 40.00 L',
              pct: 96.1,
              color: '#0284c7',
              div: true
            }
          ],
          stats: [
            { label: 'PIs Raised', value: '7', color: '#0f172a' },
            { label: 'Net Weight', value: '60,400 kg', color: '#0f172a' },
            { label: 'Open LCs', value: '2', color: '#0f172a' },
            { label: 'In Hand LCs', value: '2', color: '#0f172a' },
            { label: 'Realisation', value: '71.9%', color: '#0f172a' }
          ]
        }
      ]
    },

    /* ---------------------------------------- ROW 2 : TREND CHART + FUNNEL */
    {
      row: [
        {
          k: 'chart',
          id: 'com-trend',
          c: 8,
          title: 'Last 6 Months PI vs LC',
          sub: 'Proforma invoice value against the LC value opened on it, in the same six month window',
          chart: {
            type: 'bar',
            height: 290,
            yfmt: 'money',
            labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            datasets: [
              {
                label: 'PI value',
                data: [3820000, 4150000, 4490000, 4260000, 3980000, 2485600],
                bg: 'rgba(114, 199, 255, 0.35)',
                border: 'rgba(114, 199, 255, 1)',
                w: 1
              },
              {
                label: 'LC value',
                data: [3310000, 3680000, 4020000, 3790000, 3460000, 1786500],
                bg: 'rgba(20, 184, 166, 0.30)',
                border: 'rgba(20, 184, 166, 1)',
                w: 1
              }
            ]
          }
        },
        {
          k: 'funnel',
          id: 'com-funnel',
          c: 4,
          title: 'Export LC Funnel',
          sub: 'How PI value travels into an opened, accepted and held LC',
          steps: [
            {
              step: 'LC Open',
              v: '4,160,000',
              note: '7 LCs reached this far',
              c: '#94a3b8'
            },
            {
              step: 'Forwarded to Party',
              v: '3,540,000',
              note: '6 LCs reached this far',
              c: '#72c7ff'
            },
            {
              step: 'Forwarded to Bank',
              v: '2,977,000',
              note: '5 LCs reached this far',
              c: '#818cf8'
            },
            {
              step: 'Bank Acceptance',
              v: '2,512,000',
              note: '4 LCs reached this far',
              c: '#ff9f40'
            },
            {
              step: 'In Hand',
              v: '1,313,000',
              note: '2 LCs reached this far',
              c: '#14b8a6'
            }
          ],
          carry: [
            { t: 'carried over to', n: '85.1% Forwarded to Party' },
            { t: 'carried over to', n: '84.1% Forwarded to Bank' },
            { t: 'carried over to', n: '84.4% Bank Acceptance' },
            { t: 'carried over to', n: '52.3% In Hand' }
          ]
        }
      ]
    },

    /* -------------------------------- ROW 3 : LC BY STAGE + RECENT PIs */
    {
      row: [
        {
          k: 'bars',
          id: 'com-stages',
          c: 8,
          title: 'LC by Stage',
          sub: 'Total LC value ৳ 41.61 L across 7 running LCs · Bar length is share of total open LC value',
          rows: [
            {
              n: 'LC Open',
              v: '৳ 6,20,000',
              p: 14.9,
              c: '#94a3b8',
              note: '1 LC · 14.9% of LC value'
            },
            {
              n: 'Forwarded to Party',
              v: '৳ 5,63,000',
              p: 13.5,
              c: '#72c7ff',
              note: '1 LC · 13.5% of LC value'
            },
            {
              n: 'Forwarded to Bank',
              v: '৳ 9,30,000',
              p: 22.4,
              c: '#818cf8',
              note: '1 LC · 22.4% of LC value'
            },
            {
              n: 'Bank Acceptance',
              v: '৳ 17,65,000',
              p: 42.4,
              c: '#ff9f40',
              note: '2 LCs · 42.4% of LC value'
            },
            {
              n: 'In Hand',
              v: '৳ 13,13,000',
              p: 31.6,
              c: '#14b8a6',
              note: '2 LCs · 31.6% of LC value'
            }
          ]
        },
        {
          k: 'table',
          id: 'com-pi',
          c: 4,
          title: 'Recent PIs',
          link: { label: 'View All', href: 'modules/commercial/pi.html' },
          max: 420,
          cols: [
            { t: 'PI No', a: 'l' },
            { t: 'Party', a: 'l' },
            { t: 'Value', a: 'r', f: 'money' },
            { t: 'Stage', a: 'r' }
          ],
          rows: [
            ['PI-1184', 'Sinha Textile', 486900, { b: 'Forward to Party' }],
            ['PI-1183', 'DBL Group', 312700, { b: 'Forward to Party' }],
            ['PI-1182', 'Envy Pacific', 584000, { b: 'PI Issue' }],
            ['PI-1181', 'Hanuman Textile', 236800, { b: 'Forward to Party' }],
            ['PI-1180', 'Noman Group', 198400, { b: 'Forward to Party' }],
            ['PI-1179', 'Beximco Limited', 152300, { b: 'PI Issue' }],
            ['PI-1178', 'Prime Denim', 315400, { b: 'Forward to Party' }]
          ],
          total: [
            'Total',
            '7 PIs',
            2486560,
            ''
          ]
        }
      ]
    },

    /* -------------------------- ROW 4 : LC & MATURITY TIMELINE (FULL WIDTH) */
    {
      row: [
        {
          k: 'table',
          id: 'com-lc',
          c: 12,
          title: 'LC & Maturity Timeline',
          sub: 'com_tracking stages · lc_open → forward_to_party → forward_to_bank → bank_acceptance → in_hand',
          link: { label: 'LC Tracking', href: 'modules/commercial/com_tracking.html' },
          cols: [
            { t: 'LC No', a: 'l' },
            { t: 'Party', a: 'l' },
            { t: 'Value', a: 'r', f: 'money' },
            { t: 'LC Open', a: 'l' },
            { t: 'Maturity', a: 'l' },
            { t: 'Stage', a: 'c' },
            { t: 'Days Left', a: 'r', f: 'qty' }
          ],
          rows: [
            [
              'LC-2026-0355',
              'Noman Group',
              448000,
              { t: '28 May 2026' },
              { t: '12 Oct 2026' },
              { b: 'In Hand' },
              12
            ],
            [
              'LC-2026-0371',
              'Hanuman Textile',
              512000,
              { t: '18 Jun 2026' },
              { t: '5 Oct 2026' },
              { b: 'Bank Acceptance' },
              5
            ],
            [
              'LC-2026-0396',
              'Beximco Limited',
              930000,
              { t: '24 Jul 2026' },
              { t: '28 Oct 2026' },
              { b: 'Forwarded to Bank' },
              28
            ],
            [
              'LC-2026-0412',
              'Prime Denim',
              1240000,
              { t: '12 Aug 2026' },
              { t: '15 Nov 2026' },
              { b: 'Bank Acceptance' },
              46
            ],
            [
              'LC-2026-0438',
              'Rupali Knitwear',
              865000,
              { t: '2 Sep 2026' },
              { t: '30 Nov 2026' },
              { b: 'In Hand' },
              61
            ],
            [
              'LC-2026-0447',
              'MJ Group',
              563000,
              { t: '11 Sep 2026' },
              { t: '15 Jan 2027' },
              { b: 'Forwarded to Party' },
              108
            ],
            [
              'LC-2026-0451',
              'Shanta Holdings',
              620000,
              { t: '18 Sep 2026' },
              { t: '20 Dec 2026' },
              { b: 'LC Open' },
              81
            ]
          ],
          total: [
            'Total running',
            '7 LCs',
            4161000,
            '',
            { t: 'earliest maturity drives realisation' },
            '',
            ''
          ]
        }
      ]
    },
  ]
});
