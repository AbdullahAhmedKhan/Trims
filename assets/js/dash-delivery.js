/* ==========================================================================
   DELIVERY DASHBOARD - DATA ONLY
   --------------------------------------------------------------------------
   This file holds numbers and nothing else. No markup is built here.

   The page modules/delivery/index.html is plain HTML: the cards, the tables,
   the headings and the chart canvases are all written out there, so you can
   read and change the page in one file. This file only says what goes into
   the empty spots on it.

   How the two fit together
   -----------------------
   Every value on the page is filled by assets/js/page-binder.js, which looks
   for these attributes in the HTML:

     <div data-hero>              the figure rail of the overview cards
     <tbody data-rows="party">    rows for the table whose thead is above it
     <div data-legend="status">   the coloured key under a chart
     <canvas data-chart="status"> the chart drawn into this canvas

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
   periods          one entry per option in the period picker

   When the real application is wired up, replace the literals below with a
   fetch. Nothing else in the page has to change.
   ========================================================================== */

window.DELIVERY_DATA = {

  /* ------------------------------------------------------------ overview --
     How far the ordered quantity has moved through the floor and out of the
     gate. One entry per card; the page lays out a card for each name and the
     binder puts the figure in it. */
  overview: {
    cells: [
      { label: "Order Qty", value: "351,000", color: "#0284c7" },
      { label: "Conning Qty", value: "258,000", color: "#0ea5e9" },
      { label: "Delivered Qty", value: "214,200", color: "#14b8a6" }
    ]
  },

  /* ------------------------------------------------------ chart: last 7 --
     Delivered quantity, day by day. The picker on the card swaps the numbers
     and the heading, so only the shell of the chart is written here and
     `periods` below holds one entry per choice.

     `series` gives each bar its colour by name, so a period only has to say
     the label and the numbers. */
  last7: {
    type: "bar",
    height: 300,
    yfmt: "qty",
    series: {
      "Delivered Qty": {
        bg: "rgba(20, 184, 166, 0.28)",
        border: "rgba(20, 184, 166, 1)"
      }
    }
  },

  /* one entry per option in the picker. `title` becomes the card heading,
     `labels` is the x axis and `series` is one entry per bar group. */
  periods: {
    "7d": {
      title: "Last 7 days delivery",
      labels: ["22 Sep", "23 Sep", "24 Sep", "25 Sep", "26 Sep", "27 Sep", "28 Sep"],
      series: [
        { label: "Delivered Qty", data: [11600, 6800, 13400, 8900, 6100, 3400, 11200] }
      ]
    },
    "30d": {
      title: "Last Month",
      labels: ["30 Aug", "29 Aug", "28 Aug", "27 Aug", "26 Aug", "25 Aug", "24 Aug",
        "23 Aug", "22 Aug", "21 Aug", "20 Aug", "19 Aug", "18 Aug", "17 Aug", "16 Aug",
        "15 Aug", "14 Aug", "13 Aug", "12 Aug", "11 Aug", "10 Aug", "09 Aug",
        "08 Aug", "07 Aug", "06 Aug", "05 Aug", "04 Aug", "03 Aug", "02 Aug", "01 Aug"],
      series: [
        { label: "Delivered Qty", data: [9100, 7400, 8600, 5200, 9800, 8300, 10700,
          6200, 12400, 7100, 4800, 8900, 10600, 5700, 9400, 6800, 7900, 11200,
          5300, 8800, 6400, 9900, 4500, 8200, 7300, 10100, 5900, 7600, 4900, 8700] }
      ]
    },
    thism: {
      title: "This Month",
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      series: [
        { label: "Delivered Qty", data: [52600, 54100, 51800, 55800] }
      ]
    },
    "3m": {
      title: "Last 3 Months",
      labels: ["Jul", "Aug", "Sep"],
      series: [
        { label: "Delivered Qty", data: [196400, 188200, 214300] }
      ]
    },
    "6m": {
      title: "Last 6 Months",
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      series: [
        { label: "Delivered Qty", data: [182600, 188400, 194200, 196400, 188200, 214300] }
      ]
    },
    ytd: {
      title: "This year delivery",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      series: [
        { label: "Delivered Qty", data: [179800, 186200, 190600, 182600, 188400,
          194200, 196400, 188200, 214300] }
      ]
    },
    lasty: {
      title: "Last Year",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      series: [
        { label: "Delivered Qty", data: [154200, 160600, 165800, 163100, 168400, 174900,
          178600, 172400, 183100, 190600, 188200, 196700] }
      ]
    }
  },

  /* -------------------------------------------------- chart: delivery status --
     Where the quantity stands across the four stages of the delivery flow.
     The names and the colours are fixed, so `legend` repeats them with the
     quantity of each, in the same order. */
  status: {
    type: "doughnut",
    height: 230,
    center: "Order Qty",
    centerValue: "351,000",
    labels: ["Order", "Production", "Delivery", "Pending"],
    datasets: [{
      data: [351000, 258000, 214200, 43800],
      bg: [
        "rgba(14, 165, 233, 0.55)",
        "rgba(2, 132, 199, 0.55)",
        "rgba(20, 184, 166, 0.55)",
        "rgba(245, 158, 11, 0.55)"
      ]
    }],
    legend: [
      { label: "Order", value: "351,000", color: "#0ea5e9" },
      { label: "Production", value: "258,000", color: "#0284c7" },
      { label: "Delivery", value: "214,200", color: "#14b8a6" },
      { label: "Pending", value: "43,800", color: "#f59e0b" }
    ],

    /* one entry per option of the date filter on the card, in the order the
       options are written in modules/delivery/index.html. The segment names
       and colours stay as they are above; `centerValue` is the Order figure
       in the middle of the ring. */
    periods: {
      "7d": {
        values: [351000, 258000, 214200, 43800],
        amounts: ["351,000", "258,000", "214,200", "43,800"],
        centerValue: "351,000"
      },
      "30d": {
        values: [412000, 306500, 258900, 53100],
        amounts: ["412,000", "306,500", "258,900", "53,100"],
        centerValue: "412,000"
      },
      thism: {
        values: [388500, 287400, 241600, 46900],
        amounts: ["388,500", "287,400", "241,600", "46,900"],
        centerValue: "388,500"
      },
      "3m": {
        values: [596000, 441200, 372800, 74600],
        amounts: ["596,000", "441,200", "372,800", "74,600"],
        centerValue: "596,000"
      },
      "6m": {
        values: [1048000, 779600, 658300, 141200],
        amounts: ["1,048,000", "779,600", "658,300", "141,200"],
        centerValue: "1,048,000"
      },
      lasty: {
        values: [2214300, 1642800, 1387400, 351100],
        amounts: ["2,214,300", "1,642,800", "1,387,400", "351,100"],
        centerValue: "2,214,300"
      },
      ytd: {
        values: [1658900, 1224500, 1034600, 261400],
        amounts: ["1,658,900", "1,224,500", "1,034,600", "261,400"],
        centerValue: "1,658,900"
      }
    }
  },

  /* ------------------------------------------------------ table: recent challans */
  challans: {
    rows: [
      ["DC-1284/26", "OD-2026-1284", 4800, { b: "Delivered" }],
      ["DC-1283/26", "OD-2026-1283", 3200, { b: "Delivered" }],
      ["DC-1282/26", "OD-2026-1280", 5600, { b: "Delivered" }],
      ["DC-1281/26", "OD-2026-1282", 3400, { b: "Delivered" }],
      ["DC-1280/26", "OD-2026-1281", 2800, { b: "In Production" }],
      ["DC-1279/26", "OD-2026-1276", 2400, { b: "Delivered" }]
    ]
  },

  /* ---------------------------------------------- flow: challan receipts --
     Where the challans that have been raised have been received. Told with
     bars rather than a doughnut, so it does not read as a copy of the
     Delivery Status ring above it. The shares are worked out from the
     values by page-binder.js, so only the numbers are written here. */
  receipt: {
    total: { label: "Total Challans", value: "37" },
    rows: [
      { label: "Pending Challan", value: "8", color: "#f59e0b" },
      { label: "Received by Factory", value: "21", color: "#14b8a6" },
      { label: "Received by Office", value: "8", color: "#0ea5e9" }
    ]
  },

  /* ----------------------------------------------------- job pool tabs --
     The same 12 live jobs grouped three ways, so all three totals match.
     Each tab is a key of its own, in the order the tabs are written in
     modules/delivery/index.html. */
  party: {
    rows: [
      ["Sinha Textile", 2, 63000, 57000, 57000],
      ["Envy Pacific", 1, 45000, 40000, 40000],
      ["Beximco Limited", 1, 33000, 29000, 29000],
      ["Hanuman Textile", 1, 28000, 25000, 25000],
      ["DBL Group", 2, 60000, 50000, 24800],
      ["MJ Group", 1, 27000, 24000, 16800],
      ["Noman Group", 1, 22000, 18000, 12600],
      ["Shanta Holdings", 1, 18000, 15000, 9000],
      ["Prime Denim", 1, 30000, 0, 0],
      ["Rupali Knitwear", 1, 25000, 0, 0]
    ],
    total: ["Total :", 12, 351000, 258000, 214200]
  },

  item: {
    rows: [
      ["Basic Tee", 2, 87000, 78000, 78000],
      ["Long Sleeve", 2, 61000, 54000, 54000],
      ["Polo Shirt", 3, 93000, 55000, 41600],
      ["Zipper Jacket", 2, 39000, 34000, 28000],
      ["Henley", 3, 71000, 37000, 12600]
    ],
    total: ["Total :", 12, 351000, 258000, 214200]
  },

  team: {
    rows: [
      ["Salman Rahman", 2, 61000, 54000, 54000],
      ["Rahim Uddin", 2, 60000, 53000, 47000],
      ["Ashikul Islam", 2, 69000, 59000, 40000],
      ["Tanvir Hossain", 2, 49000, 42000, 29400],
      ["Karim Mia", 2, 61000, 31000, 24800],
      ["Shanto Das", 2, 51000, 19000, 19000]
    ],
    total: ["Total :", 12, 351000, 258000, 214200]
  }
};