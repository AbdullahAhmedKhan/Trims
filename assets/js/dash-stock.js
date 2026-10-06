/* ==========================================================================
   STOCK DASHBOARD - DATA ONLY
   --------------------------------------------------------------------------
   This file holds numbers and nothing else. No markup is built here.

   The page modules/stock/index.html is plain HTML: the cards, the tables,
   the headings and the chart canvases are all written out there, so you can
   read and change the page in one file. This file only says what goes into
   the empty spots on it.

   How the two fit together
   -----------------------
   Every value on the page is filled by assets/js/page-binder.js, which looks
   for these attributes in the HTML:

     <div data-hero>              the figure behind one overview card
     <tbody data-rows="po">        rows for the table whose thead is above it
     <div data-legend="group">     the coloured key under a chart
     <canvas data-chart="group">   the chart drawn into this canvas

   So to change the layout, edit index.html.
   To change a number, edit the object below.

   Shape of each part
   ------------------
   overview.cells   one entry per overview card: the label the page shows and
                    the figure the binder drops into it
   <key>            a chart: labels, datasets, and the few extras this
                    project uses (type, height, yfmt, center)
   <key>.rows       rows, one array per row, in the order the columns sit in
                    the HTML thead above it; `total` adds a total line
   <key>.sum        the chip strip above that table
   periods          one entry per option in the period picker

   A cell is normally just the value. Three shapes are read as well:

     { b: "Healthy" }                    a status pill
     { t: "—" }                          text already written the way it
                                         should appear
     { gauge: -800, of: 3000 }           a signed figure, red when it has
                                         gone short, with a bar under it
                                         that grows from the right instead
                                         of the left

   When the real application is wired up, replace the literals below with a
   fetch. Nothing else in the page has to change.
   ========================================================================== */

window.STOCK_DATA = {

  /* ------------------------------------------------------------ overview --
     What is in the ware house, what is on the floor being worked on, what
     has already gone out and what is still sitting free. One entry per card;
     the page lays out a card for each name and the binder puts the figure
     in it. */
  overview: {
    cells: [
      { label: "Total Stock", value: "133,170", color: "#0284c7" },
      { label: "Stock In Process", value: "43,800", color: "#0ea5e9" },
      { label: "Used Stock", value: "48,900", color: "#14b8a6" },
      { label: "Balance Stock", value: "52,910", color: "#f59e0b" }
    ]
  },

  /* ----------------------------------------------------- chart: movement --
     What came into the ware house, what went out and what was left at the
     end of the month. All three are bars on one quantity axis: a money
     figure on a second axis needs a line of its own, and one mixed kind on
     a card reads as clutter.

     The picker swaps the numbers, the key and the card heading, so only the
     shell of the chart is written here and `periods` below holds one entry
     per choice.

     `series` gives each bar its colour by name, so a period only has to say
     the label and the numbers. */
  movement: {
    type: "bar",
    height: 300,
    yfmt: "qty",
    series: {
      Received: {
        bg: "rgba(114, 199, 255, 0.28)",
        border: "rgba(114, 199, 255, 1)"
      },
      Issued: {
        bg: "rgba(247, 107, 138, 0.28)",
        border: "rgba(247, 107, 138, 1)"
      },
      Balance: {
        bg: "rgba(20, 184, 166, 0.28)",
        border: "rgba(20, 184, 166, 1)"
      }
    }
  },

  /* one entry per option in the picker. `title` becomes the card heading,
     `labels` is the x axis and `series` is one entry per bar group. */
  periods: {
    "3m": {
      title: "Last 3 months",
      labels: ["Jul", "Aug", "Sep"],
      series: [
        { label: "Received", data: [24800, 29600, 53100] },
        { label: "Issued", data: [27100, 28400, 48900] },
        { label: "Balance", data: [55900, 57100, 52910] }
      ]
    },
    "6m": {
      title: "Last 6 months",
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      series: [
        { label: "Received", data: [24800, 27600, 31200, 24800, 29600, 53100] },
        { label: "Issued", data: [21400, 23800, 26900, 27100, 28400, 48900] },
        { label: "Balance", data: [50100, 53900, 58200, 55900, 57100, 52910] }
      ]
    },
    ytd: {
      title: "This year",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      series: [
        { label: "Received", data: [19800, 21500, 23200, 24800, 27600, 31200, 24800, 29600, 53100] },
        { label: "Issued", data: [17200, 18800, 20400, 21400, 23800, 26900, 27100, 28400, 48900] },
        { label: "Balance", data: [41200, 43900, 46700, 50100, 53900, 58200, 55900, 57100, 52910] }
      ]
    },
    lasty: {
      title: "Last year",
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
      series: [
        { label: "Received", data: [21400, 22600, 24100, 25900, 23800, 27400, 22100, 23900, 26800, 19800, 21500, 23200] },
        { label: "Issued", data: [18800, 19600, 21300, 22800, 22100, 24600, 20600, 21800, 23400, 17200, 18800, 20400] },
        { label: "Balance", data: [39800, 42800, 45600, 48700, 50400, 53200, 54700, 56800, 60200, 62800, 65500, 68300] }
      ]
    }
  },

  /* --------------------------------------------------- chart: value group --
     How the ware house value splits across material groups. The names and
     the colours are fixed, so `legend` repeats them with the value of each,
     in the same order. */
  group: {
    type: "doughnut",
    height: 230,
    center: "Stock Value",
    centerValue: "৳ 1.30 Cr",
    labels: ["Cartoon", "Poly", "Trim", "Sewing Thread", "Interlining"],
    datasets: [{
      data: [4683800, 4559600, 2174400, 926800, 672000],
      bg: [
        "rgba(114, 199, 255, 0.55)",
        "rgba(139, 92, 246, 0.55)",
        "rgba(20, 184, 166, 0.55)",
        "rgba(255, 159, 64, 0.55)",
        "rgba(247, 107, 138, 0.55)"
      ]
    }],
    legend: [
      { label: "Cartoon", value: "৳ 46.84 L", color: "#72c7ff" },
      { label: "Poly", value: "৳ 45.60 L", color: "#8b5cf6" },
      { label: "Trim", value: "৳ 21.74 L", color: "#14b8a6" },
      { label: "Sewing Thread", value: "৳ 9.27 L", color: "#ff9f40" },
      { label: "Interlining", value: "৳ 6.72 L", color: "#f76b8a" }
    ]
  },

  /* --------------------------------- tabs: monitoring and forecasting --
     The same ten ware house lines read two ways, one key per tab, in the
     order the tabs are written in modules/stock/index.html.

     Stock Monitoring asks what actually happened against what the line
     needed over the period:

       Name, Required, Consumption, Balance (required - consumption)

     Stock Forecasting asks whether what is in hand covers what is still
     to come:

       Name, Current Stock, Required, Balance (current - required)

     `sum` fills the chip strip at the top of the card. The balance column
     is a { gauge: ..., of: ... } cell: the figure is printed red when it
     has gone short, and the bar under it grows from the right instead of
     the left, so a shortfall reads against the lines that have cover. */
  monitoring: {
    sum: [
      { label: "Lines Monitored", value: "10" },
      { label: "Covered", value: "6", color: "#0d9488" },
      { label: "Short", value: "4", color: "#dc2626" },
      { label: "Net Balance", value: "+2,070", color: "#0d9488" }
    ],
    rows: [
      ["20\" · Prime Denim", 19200, 17600, { gauge: 1600, of: 3000 }],
      ["180 GSM · Hanuman", 12480, 11800, { gauge: 680, of: 3000 }],
      ["4 Hole · Beximco", 25600, 26400, { gauge: -800, of: 3000 }],
      ["22\" · DBL Group", 14400, 13900, { gauge: 500, of: 3000 }],
      ["240 GSM · Prime Denim", 8430, 9200, { gauge: -770, of: 3000 }],
      ["40/2 · Rupali Knit", 8400, 7900, { gauge: 500, of: 3000 }],
      ["210 GSM · Hanuman", 8730, 8100, { gauge: 630, of: 3000 }],
      ["360 GSM · DBL Group", 3480, 3620, { gauge: -140, of: 3000 }],
      ["60 GSM · Prime Denim", 3640, 3300, { gauge: 340, of: 3000 }],
      ["1/2\" · Beximco", 7040, 7510, { gauge: -470, of: 3000 }]
    ],
    total: ["Total", 111400, 109330, { gauge: 2070, of: 3000 }]
  },

  forecasting: {
    sum: [
      { label: "Lines Forecasted", value: "10" },
      { label: "Covered", value: "4", color: "#0d9488" },
      { label: "Short", value: "6", color: "#dc2626" },
      { label: "Net Balance", value: "-7,100", color: "#dc2626" }
    ],
    rows: [
      ["20\" · Prime Denim", 19200, 22400, { gauge: -3200, of: 3500 }],
      ["180 GSM · Hanuman", 12480, 11800, { gauge: 680, of: 3500 }],
      ["4 Hole · Beximco", 25600, 28200, { gauge: -2600, of: 3500 }],
      ["22\" · DBL Group", 14400, 13600, { gauge: 800, of: 3500 }],
      ["240 GSM · Prime Denim", 8430, 9900, { gauge: -1470, of: 3500 }],
      ["40/2 · Rupali Knit", 8400, 8100, { gauge: 300, of: 3500 }],
      ["210 GSM · Hanuman", 8730, 9400, { gauge: -670, of: 3500 }],
      ["360 GSM · DBL Group", 3480, 3900, { gauge: -420, of: 3500 }],
      ["60 GSM · Prime Denim", 3640, 3400, { gauge: 240, of: 3500 }],
      ["1/2\" · Beximco", 7040, 7800, { gauge: -760, of: 3500 }]
    ],
    total: ["Total", 111400, 118500, { gauge: -7100, of: 3500 }]
  },

  /* ---------------------------------------------------- table: purchase orders */
  po: {
    rows: [
      ["PO-1184", "Prime Denim", 12400, 2480000, { t: "Settled" }, "05 Oct 2026", { b: "Closed" }],
      ["PO-1183", "Rupali Knitwear", 8600, 1720000, 1720000, "04 Oct 2026", { b: "Open" }],
      ["PO-1182", "Hanuman Textile", 14600, 2920000, 1720000, "02 Oct 2026", { b: "Open" }],
      ["PO-1181", "Noman Group", 9600, 1920000, { t: "Settled" }, "29 Sep 2026", { b: "Closed" }],
      ["PO-1180", "Envy Pacific", 5400, 810000, { t: "Settled" }, "26 Sep 2026", { b: "Closed" }],
      ["PO-1179", "Beximco Limited", 22000, 1100000, 700000, "24 Sep 2026", { b: "Open" }],
      ["PO-1178", "DBL Group", 16800, 3360000, { t: "Settled" }, "20 Sep 2026", { b: "Closed" }],
      ["PO-1177", "Prime Denim", 11000, 2200000, { t: "Settled" }, "15 Sep 2026", { b: "Cancel" }]
    ]
  },

  /* ------------------------------------------------------ table: requisitions */
  req: {
    rows: [
      ["REQ-742", "Cutting", "3,200 / 8,400", { b: "Open" }],
      ["REQ-741", "Sewing", "1,800 / 6,200", { b: "Open" }],
      ["REQ-740", "Finishing", "4,600 / 4,600", { b: "Closed" }],
      ["REQ-739", "Packing", "3,800 / 3,800", { b: "Closed" }],
      ["REQ-738", "Cutting", "0 / 11,200", { b: "Open" }],
      ["REQ-737", "Sewing", "7,400 / 7,400", { b: "Closed" }]
    ]
  }
};