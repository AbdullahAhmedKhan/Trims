/* ==========================================================================
   PRODUCTION DASHBOARD - static data
   --------------------------------------------------------------------------
   Ported from "dashboard - Production.php", every number included.
   ========================================================================== */

window.SKDash.register('production', {
  title: 'Production Dashboard',
  note: 'Month plan against the three production steps, the open job pool, the day wise register and the quantity windows.',

  blocks: [

    /* --------------------------------------------------- ROW 1 : OVERVIEW */
    { row: [

      { k: 'hero', c: 12,
        title: 'Production Overview',
        sub: 'Month plan against every production step and the delivery that follows',
        link: { label: 'View All', href: 'modules/production/index.html?id=production-summary' },
        cells: [
          { label: 'Planned', value: '286,000', pct: 100, color: '#0284c7' },
          { label: 'Board Making', value: '268,400', pct: 93.8, color: '#0284c7', div: true },
          { label: 'Cartoon Finishing', value: '251,900', pct: 88.1, color: '#0284c7', div: true },
          { label: 'Production', value: '232,600', pct: 81.3, color: '#0284c7', div: true },
          { label: 'Delivered', value: '214,300', pct: 74.9, color: '#0284c7', div: true }
        ],
        stats: [
          { label: 'Open Jobs', value: '16', color: '#0284c7' },
          { label: 'Jobs Running', value: '14', color: '#059669' },
          { label: 'Jobs Completed', value: '2', color: '#0d9488' },
          { label: 'Automatic (A)', value: '12', color: '#4f46e5' },
          { label: 'Manual (M)', value: '4', color: '#d97706' },
          { label: 'Pending Qty', value: '98,533', color: '#7c3aed' }
        ]
      }
    ] },

    /* ------------------------------------- ROW 2 : SIX MONTH OUTPUT + STATUS */
    { row: [

      { k: 'chart', id: 'p-stage', c: 8,
        title: 'Last 6 Months Output',
        sub: 'Board making, cartoon finishing and production quantity of every month',
        link: { label: 'View All', href: 'modules/production/index.html?id=production-summary' },
        chart: {
          type: 'bar',
          height: 260,
          yfmt: 'qty',
          labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          datasets: [
            { label: 'Board Making', data: [232000, 239000, 245000, 252000, 244000, 268400],
              bg: 'rgba(114, 199, 255, 0.25)', border: 'rgba(114, 199, 255, 1)' },
            { label: 'Cartoon Finishing', data: [218000, 224000, 230000, 237000, 229000, 251900],
              bg: 'rgba(139, 92, 246, 0.25)', border: 'rgba(139, 92, 246, 1)' },
            { label: 'Production', data: [199000, 205000, 211000, 217000, 207000, 232600],
              bg: 'rgba(20, 184, 166, 0.25)', border: 'rgba(20, 184, 166, 1)' }
          ]
        }
      },

      { k: 'chart', id: 'p-stage-doughnut', c: 4,
        title: 'Job Status',
        chart: {
          type: 'doughnut',
          height: 230,
          labels: ['Board Making', 'Cartoon Finishing', 'Production', 'Completed'],
          datasets: [{
            data: [6, 4, 4, 2],
            bg: ['rgba(114, 199, 255, 0.3)', 'rgba(139, 92, 246, 0.3)',
              'rgba(20, 184, 166, 0.3)', 'rgba(16, 185, 129, 0.3)']
          }]
        },
        legendList: [
          { label: 'Board Making', value: '6 jobs', color: 'rgba(114, 199, 255, 0.3)' },
          { label: 'Cartoon Finishing', value: '4 jobs', color: 'rgba(139, 92, 246, 0.3)' },
          { label: 'Production', value: '4 jobs', color: 'rgba(20, 184, 166, 0.3)' },
          { label: 'Completed', value: '2 jobs', color: 'rgba(16, 185, 129, 0.3)' }
        ]
      }
    ] },

    /* ---------------------------------------- ROW 3 : JOB POOL + MACHINE SPLIT */
    { row: [

      { k: 'tabs', id: 'p-break', c: 8,
        sub: 'Open job pool — every tab is the same 16 live jobs grouped a different way, so all four totals always match. Pool achievement 65.5%.',
        tabs: [
          { label: 'Party',
            cols: [{ t: 'Party', a: 'l' }, { t: 'Jobs', a: 'r', f: 'qty' },
              { t: 'Plan', a: 'r', f: 'qty' }, { t: 'Board', a: 'r', f: 'qty' },
              { t: 'Finish', a: 'r', f: 'qty' }, { t: 'Produced', a: 'r', f: 'qty' }],
            rows: [
              ['Prime Denim Ltd', 3, 96974, 96974, 96974, 93432],
              ['Hanuman Textile', 3, 61134, 52512, 36400, 21706],
              ['DBL Group', 2, 51298, 51298, 47855, 34763],
              ['Noman Group', 3, 42162, 37665, 32296, 24630],
              ['Envy Pacific', 3, 25297, 20593, 13889, 7919],
              ['Beximco Limited', 2, 9135, 7976, 6816, 5017]
            ],
            total: ['Total :', 16, 286000, 267018, 234230, 187467],
            foot: { label: 'Date: 1 Sep 2026 - 30 Sep 2026',
              link: { label: 'View More', href: 'modules/production/index.html?id=production-summary' } } },
          { label: 'Item',
            cols: [{ t: 'Item', a: 'l' }, { t: 'Jobs', a: 'r', f: 'qty' },
              { t: 'Plan', a: 'r', f: 'qty' }, { t: 'Board', a: 'r', f: 'qty' },
              { t: 'Finish', a: 'r', f: 'qty' }, { t: 'Produced', a: 'r', f: 'qty' }],
            rows: [
              ['3 Ply Carton', 4, 81163, 81163, 76427, 65450],
              ['5 Ply Carton', 4, 70621, 61093, 49948, 41052],
              ['Corrugated Sheet', 2, 41460, 41460, 41460, 37082],
              ['Die Cut Box', 2, 36892, 34549, 31594, 22205],
              ['Top Bottom Box', 2, 29162, 29162, 23305, 16239],
              ['Divider Insert', 2, 26702, 19591, 11496, 5439]
            ],
            total: ['Total :', 16, 286000, 267018, 234230, 187467],
            foot: { label: '',
              link: { label: 'View More', href: 'modules/production/index.html?id=production-summary' } } },
          { label: 'Team',
            cols: [{ t: 'Team', a: 'l' }, { t: 'Jobs', a: 'r', f: 'qty' },
              { t: 'Plan', a: 'r', f: 'qty' }, { t: 'Board', a: 'r', f: 'qty' },
              { t: 'Finish', a: 'r', f: 'qty' }, { t: 'Produced', a: 'r', f: 'qty' }],
            rows: [
              ['Karim Mia', 3, 80812, 80812, 77369, 60735],
              ['Rahim Uddin', 2, 67460, 67460, 67460, 67460],
              ['Salman Rahman', 3, 61134, 52512, 36400, 21706],
              ['Tanvir Hossain', 3, 42162, 37665, 32296, 24630],
              ['Ashikul Islam', 3, 25297, 20593, 13889, 7919],
              ['Shanto Das', 2, 9135, 7976, 6816, 5017]
            ],
            total: ['Total :', 16, 286000, 267018, 234230, 187467],
            foot: { label: '',
              link: { label: 'View More', href: 'modules/production/index.html?id=production-summary' } } },
          { label: 'Roll Size',
            cols: [{ t: 'Roll Size', a: 'l' }, { t: 'Jobs', a: 'r', f: 'qty' },
              { t: 'Plan', a: 'r', f: 'qty' }, { t: 'Board', a: 'r', f: 'qty' },
              { t: 'Finish', a: 'r', f: 'qty' }, { t: 'Produced', a: 'r', f: 'qty' }],
            rows: [
              ['36 inch', 4, 91704, 87832, 80788, 70482],
              ['44 inch', 4, 74838, 69182, 60503, 50553],
              ['48 inch', 3, 48135, 48135, 46842, 35071],
              ['54 inch', 2, 32675, 30332, 22655, 14812],
              ['60 inch', 2, 26702, 19591, 11496, 5439],
              ['72 inch', 1, 11946, 11946, 11946, 11110]
            ],
            total: ['Total :', 16, 286000, 267018, 234230, 187467],
            foot: { label: '',
              link: { label: 'View More', href: 'modules/production/index.html?id=board-making' } } }
        ]
      },

      { k: 'table', id: 'p-machine', c: 4,
        title: 'Machine Split',
        sub: 'Automatic vs manual plan · Pool achievement 65.5% · From production_planning.machine',
        link: { label: 'View More', href: 'modules/production/index.html?id=board-making' },
        cols: [{ t: 'Machine', a: 'l' }, { t: 'Jobs', a: 'r', f: 'qty' },
          { t: 'Plan', a: 'r', f: 'qty' }, { t: 'Produced', a: 'r', f: 'qty' }],
        rows: [
          ['Automatic (A)', 12, 222757, 155915],
          ['Manual (M)', 4, 63243, 31552]
        ],
        total: ['Total :', 16, 286000, 187467]
      }
    ] },

    /* ------------------------------ ROW 4 : RECENT ENTRIES + RUNNING ON FLOOR */
    { row: [

      { k: 'table', id: 'p-entries', c: 8,
        title: 'Recent Production Entries',
        sub: 'Latest board making, cartoon finishing and conning records',
        link: { label: 'View All', href: 'modules/production/index.html?id=details-report' },
        max: 420,
        cols: [{ t: 'Date', a: 'l' }, { t: 'Step', a: 'l' }, { t: 'Job No', a: 'l' },
          { t: 'Item', a: 'l' }, { t: 'Qty', a: 'r', f: 'qty' }, { t: 'Status', a: 'c' }],
        rows: [
          ['30 Sep 2026', 'Board Making', 'PD-2411', 'Corrugated Sheet', 1933, { b: 'Completed' }],
          ['30 Sep 2026', 'Cartoon Finishing', 'PD-2409', 'Die Cut Box', 1817, { b: 'Completed' }],
          ['30 Sep 2026', 'Production', 'PD-2405', '3 Ply Carton', 1633, { b: 'Partial' }],
          ['29 Sep 2026', 'Board Making', 'PD-2401', 'Top Bottom Box', 1964, { b: 'Completed' }],
          ['29 Sep 2026', 'Cartoon Finishing', 'PD-2398', '5 Ply Carton', 1857, { b: 'Partial' }],
          ['29 Sep 2026', 'Production', 'PD-2394', 'Divider Insert', 1735, { b: 'Partial' }],
          ['28 Sep 2026', 'Board Making', 'PD-2390', '3 Ply Carton', 1742, { b: 'Completed' }],
          ['28 Sep 2026', 'Cartoon Finishing', 'PD-2388', '5 Ply Carton', 1637, { b: 'Partial' }],
          ['28 Sep 2026', 'Production', 'PD-2385', 'Corrugated Sheet', 1532, { b: 'Running' }],
          ['27 Sep 2026', 'Board Making', 'PD-2381', 'Die Cut Box', 1838, { b: 'Running' }],
          ['27 Sep 2026', 'Cartoon Finishing', 'PD-2378', 'Divider Insert', 1731, { b: 'Partial' }],
          ['27 Sep 2026', 'Production', 'PD-2376', 'Top Bottom Box', 1610, { b: 'Partial' }]
        ],
        total: ['Total', '12 entries', '', '', 21029, '']
      },

      { k: 'bars', id: 'p-running', c: 4,
        title: 'Running on Floor',
        sub: '28 Sep 2026 · 14 jobs',
        rows: [
          { n: 'PD-2411 · Corrugated Sheet', v: '25,972 / 29,514', p: 88, c: '#0ea5e9', note: 'Production · 88.0% done' },
          { n: 'PD-2409 · Die Cut Box', v: '19,760 / 26,703', p: 74, c: '#f59e0b', note: 'Production · 74.0% done' },
          { n: 'PD-2405 · 3 Ply Carton', v: '15,003 / 24,595', p: 61, c: '#f59e0b', note: 'Cartoon Finishing · 61.0% done' },
          { n: 'PD-2401 · Top Bottom Box', v: '12,367 / 22,486', p: 55, c: '#f59e0b', note: 'Cartoon Finishing · 55.0% done' },
          { n: 'PD-2398 · 5 Ply Carton', v: '5,502 / 20,378', p: 27, c: '#f43f5e', note: 'Board Making · 27.0% done' },
          { n: 'PD-2394 · Divider Insert', v: '3,837 / 18,270', p: 21, c: '#f43f5e', note: 'Board Making · 21.0% done' },
          { n: 'PD-2390 · 3 Ply Carton', v: '10,990 / 16,162', p: 68, c: '#f59e0b', note: 'Cartoon Finishing · 68.0% done' },
          { n: 'PD-2388 · 5 Ply Carton', v: '2,530 / 14,054', p: 18, c: '#f43f5e', note: 'Board Making · 18.0% done' },
          { n: 'PD-2385 · Corrugated Sheet', v: '11,110 / 11,946', p: 93, c: '#0ea5e9', note: 'Production · 93.0% done' },
          { n: 'PD-2381 · Die Cut Box', v: '2,445 / 10,189', p: 24, c: '#f43f5e', note: 'Board Making · 24.0% done' },
          { n: 'PD-2378 · Divider Insert', v: '1,602 / 8,432', p: 19, c: '#f43f5e', note: 'Board Making · 19.0% done' },
          { n: 'PD-2376 · Top Bottom Box', v: '3,872 / 6,676', p: 58, c: '#f59e0b', note: 'Cartoon Finishing · 58.0% done' },
          { n: 'PD-2372 · 3 Ply Carton', v: '4,321 / 5,270', p: 82, c: '#0ea5e9', note: 'Production · 82.0% done' },
          { n: 'PD-2370 · 5 Ply Carton', v: '696 / 3,865', p: 18, c: '#f43f5e', note: 'Board Making · 18.0% done' }
        ],
        foot: { label: 'Planned jobs of today',
          link: { label: 'View More', href: 'modules/production/index.html?id=board-making' } }
      }
    ] },

    /* ------------------------------------------------ ROW 5 : PRODUCTION REGISTER */
    { row: [

      { k: 'table', id: 'p-register', c: 12,
        title: 'Production Register',
        sub: 'Day wise stage summary with production achievement and pending quantity',
        link: { label: 'View All', href: 'modules/production/index.html?id=production-summary' },
        cols: [{ t: 'Date', a: 'l' }, { t: 'Day', a: 'l' }, { t: 'Jobs', a: 'r', f: 'qty' },
          { t: 'Plan Qty', a: 'r', f: 'qty' }, { t: 'Board Making', a: 'r', f: 'qty' },
          { t: 'Finishing', a: 'r', f: 'qty' }, { t: 'Produced', a: 'r', f: 'qty' },
          { t: 'Delivered', a: 'r', f: 'qty' }, { t: 'Pending', a: 'r', f: 'qty' },
          { t: 'Achievement %', a: 'c', f: 'pct' }],
        rows: [
          ['30 Sep 2026', 'Wednesday', 14, 12400, 11600, 10900, 9800, 7600, 2600, 79.03],
          ['29 Sep 2026', 'Tuesday', 14, 12471, 11786, 11143, 10408, 9677, 2063, 83.46],
          ['28 Sep 2026', 'Monday', 13, 11128, 10454, 9821, 9190, 8550, 1938, 82.58],
          ['27 Sep 2026', 'Sunday', 15, 11704, 11025, 10388, 9658, 9020, 2046, 82.52],
          ['26 Sep 2026', 'Saturday', 14, 12279, 11595, 10955, 10221, 9583, 2058, 83.24],
          ['24 Sep 2026', 'Thursday', 16, 10936, 10264, 9632, 9002, 8362, 1934, 82.32],
          ['23 Sep 2026', 'Wednesday', 15, 11512, 10835, 10199, 9471, 8832, 2041, 82.27],
          ['22 Sep 2026', 'Tuesday', 13, 12088, 11405, 10766, 10034, 9395, 2054, 83.01]
        ],
        total: ['Total', '8 days', 114, 94518, 88964, 83804, 77784, 71019, 16734, 82.28]
      }
    ] },

    /* --------------------------------------------- ROW 6 : PRODUCTION METRICS */
    { row: [

      { k: 'metrics', c: 12,
        title: 'Production Metrics Overview',
        cols: ['Today', 'This Week', 'This Month', 'This Year'],
        rows: [
          { label: 'Planned Quantity', icon: 'order', c: '#0ea5e9',
            values: ['12,400 pcs', '70,918 pcs', '286,000 pcs', '2,309,500 pcs'] },
          { label: 'Board Making Qty', icon: 'stock', c: '#0284c7',
            values: ['11,600 pcs', '66,724 pcs', '268,400 pcs', '2,139,400 pcs'] },
          { label: 'Cartoon Finishing Qty', icon: 'cog', c: '#0369a1',
            values: ['10,900 pcs', '62,839 pcs', '251,900 pcs', '2,006,900 pcs'] },
          { label: 'Produced Quantity', icon: 'production', c: '#075985',
            values: ['9,800 pcs', '58,279 pcs', '232,600 pcs', '1,833,600 pcs'] },
          { label: 'Delivered Quantity', icon: 'delivery', c: '#0c4a6e',
            values: ['7,600 pcs', '52,792 pcs', '214,300 pcs', '1,680,300 pcs'] },
          { label: 'Wastage Qty', icon: 'empty', c: '#334155',
            values: ['300 pcs', '1,147 pcs', '4,400 pcs', '34,900 pcs'] }
        ]
      }
    ] },

  ]
});