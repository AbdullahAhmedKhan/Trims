/* ==========================================================================
   STOCK DASHBOARD - static data
   --------------------------------------------------------------------------
   Ported from "dashboard - Stock.php", every number included.
   ========================================================================== */

window.SKDash.register('stock', {
  title: 'Stock Dashboard',
  note: 'Ware house quantity and value, the six month movement, material availability and the last fourteen days of receipts and issues.',

  blocks: [

    /* ------------------------------------------------ ROW 1 : STOCK OVERVIEW */
    { row: [

      { k: 'hero', c: 12,
        title: 'Stock Overview',
        sub: 'Material sitting in the ware house, what is already issued, and what is still on order',
        link: { label: 'Main Ware House', href: 'modules/stock/index.html?id=main-warehouse' },
        cells: [
          { label: 'Stock Qty', value: '133,170', pct: 100, color: '#0284c7' },
          { label: 'Stock Value', value: '৳ 1.30 Cr', pct: 41.2, color: '#0284c7', div: true },
          { label: 'Free Qty', value: '52,910', pct: 39.7, color: '#0284c7', div: true },
          { label: 'In Process', value: '43,800', pct: 62.3, color: '#0284c7', div: true },
          { label: 'Open POs', value: '3', pct: 34.8, color: '#0284c7', div: true }
        ],
        stats: [
          { label: 'Material Lines', value: '15', color: '#334155' },
          { label: 'Rolls', value: '1,348', color: '#334155' },
          { label: 'Exhausted', value: '2', color: '#334155' },
          { label: 'Low Stock', value: '4', color: '#334155' },
          { label: 'Open Requisitions', value: '3', color: '#334155' }
        ]
      }
    ] },

    /* ------------------------------------- ROW 2 : MOVEMENT + VALUE BY GROUP */
    { row: [

      { k: 'chart', id: 's-movement', c: 8,
        title: 'Last 6 Months Movement',
        sub: 'Material received into the ware house against material issued out, closing value on the right axis',
        chart: {
          type: 'bar',
          height: 290,
          yfmt: 'qty',
          y2: { yfmt: 'money' },
          labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          datasets: [
            { label: 'Received', data: [24800, 27600, 31200, 24800, 29600, 53100],
              bg: 'rgba(114, 199, 255, 0.35)', border: 'rgba(114, 199, 255, 1)',
              w: 1, borderRadius: 4, type: 'bar', order: 3 },
            { label: 'Issued', data: [21400, 23800, 26900, 27100, 28400, 48900],
              bg: 'rgba(247, 107, 138, 0.3)', border: 'rgba(247, 107, 138, 1)',
              w: 1, borderRadius: 4, type: 'bar', order: 2 },
            { label: 'Closing value', axis: 'y2', data: [11482000, 12096000, 12734000, 12318000, 12652000, 13016600],
              bg: 'rgba(255, 159, 64, 1)', border: 'rgba(255, 159, 64, 1)',
              w: 2, type: 'line', order: 1 }
          ]
        },
        legendList: [
          { label: 'Received', color: 'rgba(114, 199, 255, 1)' },
          { label: 'Issued', color: 'rgba(247, 107, 138, 1)' },
          { label: 'Closing value', color: 'rgba(255, 159, 64, 1)' }
        ]
      },

      { k: 'chart', id: 's-group', c: 4,
        title: 'Value by Group',
        sub: 'How the ware house value splits across material groups',
        chart: {
          type: 'doughnut',
          height: 230,
          labels: ['Cartoon', 'Poly', 'Trim', 'Sewing Thread', 'Interlining'],
          datasets: [{
            label: 'Stock value',
            data: [4683800, 4559600, 2174400, 926800, 672000],
            w: 2,
            bg: ['rgba(114, 199, 255, 1)', 'rgba(139, 92, 246, 1)',
              'rgba(20, 184, 166, 1)', 'rgba(255, 159, 64, 1)', 'rgba(247, 107, 138, 1)']
          }]
        },
        legendList: [
          { label: 'Cartoon', value: '৳ 46.84 L', color: 'rgba(114, 199, 255, 1)' },
          { label: 'Poly', value: '৳ 45.60 L', color: 'rgba(139, 92, 246, 1)' },
          { label: 'Trim', value: '৳ 21.74 L', color: 'rgba(20, 184, 166, 1)' },
          { label: 'Sewing Thread', value: '৳ 9.27 L', color: 'rgba(255, 159, 64, 1)' },
          { label: 'Interlining', value: '৳ 6.72 L', color: 'rgba(247, 107, 138, 1)' }
        ]
      }
    ] },

    /* -------------------------------- ROW 3 : AVAILABILITY + NEEDS ATTENTION */
    { row: [

      { k: 'bars', id: 's-avail', c: 8,
        title: 'Material Availability',
        sub: '52,910 free across 15 lines · bar length is the share of the whole free quantity',
        rows: [
          { n: '20" · Prime Denim', v: '12,000', p: 22.7, c: 'rgba(16, 185, 129, 1)', b: 'Healthy',
            note: 'Trim · pack 1.0 Pcs · 62.5% of the line is still free' },
          { n: '180 GSM · Hanuman', v: '7,860', p: 14.9, c: 'rgba(16, 185, 129, 1)', b: 'Healthy',
            note: 'Poly · pack 20.0 Kg · 63.0% of the line is still free' },
          { n: '4 Hole · Beximco', v: '6,400', p: 12.1, c: 'rgba(255, 159, 64, 1)', b: 'Low',
            note: 'Trim · pack 1.0 Pcs · 25.0% of the line is still free' },
          { n: '22" · DBL Group', v: '5,400', p: 10.2, c: 'rgba(16, 185, 129, 1)', b: 'Healthy',
            note: 'Trim · pack 1.0 Pcs · 37.5% of the line is still free' },
          { n: '40/2 · Rupali Knit', v: '5,250', p: 9.9, c: 'rgba(16, 185, 129, 1)', b: 'Healthy',
            note: 'Sewing Thread · pack 1.0 Cone · 62.5% of the line is still free' },
          { n: '240 GSM · Prime Denim', v: '5,240', p: 9.9, c: 'rgba(16, 185, 129, 1)', b: 'Healthy',
            note: 'Cartoon · pack 12.0 Kg · 62.2% of the line is still free' },
          { n: '210 GSM · Hanuman', v: '2,610', p: 4.9, c: 'rgba(16, 185, 129, 1)', b: 'Healthy',
            note: 'Poly · pack 20.0 Kg · 29.8% of the line is still free' },
          { n: '60 GSM · Prime Denim', v: '2,400', p: 4.5, c: 'rgba(16, 185, 129, 1)', b: 'Healthy',
            note: 'Interlining · pack 8.0 Kg · 65.9% of the line is still free' },
          { n: '300 GSM · Prime Denim', v: '2,050', p: 3.9, c: 'rgba(16, 185, 129, 1)', b: 'Healthy',
            note: 'Cartoon · pack 12.0 Kg · 33.3% of the line is still free' },
          { n: '20/2 · Rupali Knit', v: '1,830', p: 3.5, c: 'rgba(16, 185, 129, 1)', b: 'Healthy',
            note: 'Sewing Thread · pack 1.0 Cone · 27.2% of the line is still free' },
          { n: '1/2" · Beximco', v: '880', p: 1.7, c: 'rgba(255, 159, 64, 1)', b: 'Low',
            note: 'Trim · pack 1.0 Pcs · 12.5% of the line is still free' },
          { n: '360 GSM · DBL Group', v: '500', p: 0.9, c: 'rgba(255, 159, 64, 1)', b: 'Low',
            note: 'Cartoon · pack 12.0 Kg · 14.4% of the line is still free' },
          { n: '80 GSM · Prime Denim', v: '490', p: 0.9, c: 'rgba(255, 159, 64, 1)', b: 'Low',
            note: 'Interlining · pack 8.0 Kg · 25.0% of the line is still free' },
          { n: '240 GSM · Noman Group', v: '0', p: 0, c: 'rgba(247, 107, 138, 1)', b: 'Exhausted',
            note: 'Poly · pack 20.0 Kg · 0.0% of the line is still free' },
          { n: '30/2 · Envy Pacific', v: '0', p: 0, c: 'rgba(247, 107, 138, 1)', b: 'Exhausted',
            note: 'Sewing Thread · pack 1.0 Cone · 0.0% of the line is still free' }
        ],
        foot: { label: 'Exhausted 0 free (2 lines) · Low 8,270 free (4 lines) · Healthy 44,640 free (9 lines)' }
      },

      { k: 'bars', id: 's-attention', c: 4,
        title: 'Needs Attention',
        sub: 'Exhausted lines and lines running low',
        link: { label: 'Current Inventory', href: 'modules/stock/index.html?id=current-inventory' },
        rows: [
          { n: '240 GSM · Noman Group', v: '৳ 5.61 L', c: 'rgba(247, 107, 138, 1)', b: 'Nothing left',
            note: 'Poly · pack 20.0 Kg · 2,440 on hand · 0.0% free' },
          { n: '30/2 · Envy Pacific', v: '৳ 2.46 L', c: 'rgba(247, 107, 138, 1)', b: 'Nothing left',
            note: 'Sewing Thread · pack 1.0 Cone · 4,480 on hand · 0.0% free' },
          { n: '80 GSM · Prime Denim', v: '৳ 2.35 L', c: 'rgba(255, 159, 64, 1)', b: '490 Kg',
            note: 'Interlining · pack 8.0 Kg · 1,960 on hand · 25.0% free' },
          { n: '360 GSM · DBL Group', v: '৳ 11.14 L', c: 'rgba(255, 159, 64, 1)', b: '500 Kg',
            note: 'Cartoon · pack 12.0 Kg · 3,480 on hand · 14.4% free' },
          { n: '1/2" · Beximco', v: '৳ 2.46 L', c: 'rgba(255, 159, 64, 1)', b: '880 Pcs',
            note: 'Trim · pack 1.0 Pcs · 7,040 on hand · 12.5% free' },
          { n: '4 Hole · Beximco', v: '৳ 5.12 L', c: 'rgba(255, 159, 64, 1)', b: '6,400 Pcs',
            note: 'Trim · pack 1.0 Pcs · 25,600 on hand · 25.0% free' }
        ]
      }
    ] },

    /* ---------------------------------- ROW 4 : PURCHASE ORDERS + REQUISITIONS */
    { row: [

      { k: 'table', id: 's-po', c: 8,
        title: 'Recent Purchase Orders',
        sub: 'Latest po rows, payable against what has already been paid',
        link: { label: 'View All', href: 'modules/stock/index.html?id=manage-purchase-order' },
        max: 420,
        cols: [{ t: 'PO No', a: 'l' }, { t: 'Supplier', a: 'l' },
          { t: 'Qty', a: 'r', f: 'qty' }, { t: 'Value', a: 'r', f: 'money' },
          { t: 'Payable', a: 'r', f: 'money' }, { t: 'Expected', a: 'l' },
          { t: 'Status', a: 'c' }],
        rows: [
          ['PO-1184', 'Prime Denim', 12400, 2480000, { t: 'Settled' }, '05 Oct 2026', { b: 'Closed' }],
          ['PO-1183', 'Rupali Knitwear', 8600, 1720000, 1720000, '04 Oct 2026', { b: 'Open' }],
          ['PO-1182', 'Hanuman Textile', 14600, 2920000, 1720000, '02 Oct 2026', { b: 'Open' }],
          ['PO-1181', 'Noman Group', 9600, 1920000, { t: 'Settled' }, '29 Sep 2026', { b: 'Closed' }],
          ['PO-1180', 'Envy Pacific', 5400, 810000, { t: 'Settled' }, '26 Sep 2026', { b: 'Closed' }],
          ['PO-1179', 'Beximco Limited', 22000, 1100000, 700000, '24 Sep 2026', { b: 'Open' }],
          ['PO-1178', 'DBL Group', 16800, 3360000, { t: 'Settled' }, '20 Sep 2026', { b: 'Closed' }],
          ['PO-1177', 'Prime Denim', 11000, 2200000, { t: 'Settled' }, '15 Sep 2026', { b: 'Cancel' }]
        ],
        total: ['Total', '8 purchase orders', 100400, 16510000, 4140000, '3 unpaid', '']
      },

      { k: 'table', id: 's-req', c: 4,
        title: 'Requisitions',
        link: { label: 'View All', href: 'modules/stock/index.html?id=manage-requisition' },
        cols: [{ t: 'Req No', a: 'l' }, { t: 'Department', a: 'l' },
          { t: 'Delivered', a: 'r' }, { t: 'Status', a: 'c' }],
        rows: [
          ['REQ-742', 'Cutting', '3,200 / 8,400', { b: 'Open' }],
          ['REQ-741', 'Sewing', '1,800 / 6,200', { b: 'Open' }],
          ['REQ-740', 'Finishing', '4,600 / 4,600', { b: 'Closed' }],
          ['REQ-739', 'Packing', '3,800 / 3,800', { b: 'Closed' }],
          ['REQ-738', 'Cutting', '0 / 11,200', { b: 'Open' }],
          ['REQ-737', 'Sewing', '7,400 / 7,400', { b: 'Closed' }]
        ],
        total: ['Total', '4 undelivered', 20800, '']
      }
    ] },

    /* ------------------------------------------------- ROW 5 : 14 DAY REGISTER */
    { row: [

      { k: 'table', id: 's-days', c: 12,
        title: 'Last 14 Days In / Out',
        sub: 'Every receipt and every issue, day by day, with the running free quantity',
        link: { label: 'Inventory History', href: 'modules/stock/index.html?id=inventory-history' },
        cols: [{ t: 'Date', a: 'l' }, { t: 'Received', a: 'r', f: 'qty' },
          { t: 'Issued', a: 'r', f: 'qty' }, { t: 'Net', a: 'r' },
          { t: 'Free Qty', a: 'r', f: 'qty' }, { t: 'Day', a: 'c' }],
        rows: [
          ['30 Sep 2026', 900, 900, '0', 52910, { b: 'Flat' }],
          ['29 Sep 2026', 700, 1300, '-600', 52910, { b: 'Down' }],
          ['28 Sep 2026', 1600, 1200, '+400', 53510, { b: 'Up' }],
          ['27 Sep 2026', 500, 1000, '-500', 53110, { b: 'Down' }],
          ['26 Sep 2026', 1700, 1400, '+300', 53610, { b: 'Up' }],
          ['25 Sep 2026', 200, 600, '-400', 53310, { b: 'Down' }],
          ['24 Sep 2026', 1300, 1300, '0', 53710, { b: 'Flat' }],
          ['23 Sep 2026', 400, 750, '-350', 53710, { b: 'Down' }],
          ['22 Sep 2026', 900, 1200, '-300', 54060, { b: 'Down' }],
          ['21 Sep 2026', 1500, 1100, '+400', 54360, { b: 'Up' }],
          ['20 Sep 2026', { t: '—' }, 1000, '-1,000', 53960, { b: 'Down' }],
          ['19 Sep 2026', 1100, 700, '+400', 54960, { b: 'Up' }],
          ['18 Sep 2026', 300, 800, '-500', 54560, { b: 'Down' }],
          ['17 Sep 2026', 800, 900, '-100', 55060, { b: 'Down' }]
        ],
        total: ['14 days', 11900, 14150, '-2,250', 52910, 'closing']
      }
    ] },

    /* ------------------------------------------------------ ROW 6 : STOCK METRICS */
    { row: [

      { k: 'metrics', c: 12,
        title: 'Stock Metrics Overview',
        cols: ['Today', 'This Week', 'This Month', 'This Year'],
        rows: [
          { label: 'Receipt Quantity', icon: 'stock', c: '#0ea5e9',
            values: ['5,300 pcs', '23,600 pcs', '53,100 pcs', '1,68,400 pcs'] },
          { label: 'Issue Quantity', icon: 'delivery', c: '#0284c7',
            values: ['4,890 pcs', '21,400 pcs', '48,900 pcs', '1,47,600 pcs'] },
          { label: 'Receipt Value', icon: 'commercial', c: '#0369a1',
            values: ['৳ 1.32 Cr', '৳ 5.86 Cr', '৳ 13.02 Cr', '৳ 41.40 Cr'] },
          { label: 'Issue Value', icon: 'accounts', c: '#075985',
            values: ['৳ 1.21 Cr', '৳ 5.38 Cr', '৳ 11.92 Cr', '৳ 37.80 Cr'] }
        ]
      }
    ] }
  ]
});
