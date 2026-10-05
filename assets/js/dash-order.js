/* ==========================================================================
   ORDER DASHBOARD - DATA ONLY
   --------------------------------------------------------------------------
   This file holds numbers and nothing else. No markup is built here.

   The page modules/order/index.html is plain HTML: the cards, the tables,
   the headings and the chart canvases are all written out there, so you can
   read and change the page in one file. This file only says what goes into
   the empty spots on it.

   How the two fit together
   -----------------------
   Every value on the page is filled by assets/js/order-page.js, which looks
   for these attributes in the HTML:

     <tbody data-rows="topSales">     rows for the table whose thead is above it
     <div  data-legend="months">      the coloured key under a chart
     <div  data-metrics>              the financial metrics grid
     <canvas data-chart="last7">      the chart drawn into this canvas

   So to change the layout, edit index.html.
   To change a number, edit the object below.

   Shape of each part
   ------------------
   charts.<key>    passed to Chart.js: labels, datasets, and the few extras
                   this project uses (type, height, yfmt, center)
   tables.<key>    rows, one array per row, in the order the columns sit
                   in the HTML thead above it
   metrics         the money table at the bottom: cols across the top, one
                   row per metric with a label, an icon and its values

   When the real application is wired up, replace the literals below with a
   fetch. Nothing else in the page has to change.
   ========================================================================== */

window.ORDER_DATA = {

  /* ------------------------------------------------------ chart: 7 days --
     Last seven days of order value, one bar per day. */
  last7: {
    type: "bar",
    height: 250,
    yfmt: "money",
    labels: ["22 Sep", "23 Sep", "24 Sep", "25 Sep", "26 Sep", "27 Sep", "28 Sep"],
    datasets: [
      {
        label: "Order Value",
        data: [4860000, 5240000, 4680000, 6120000, 5840000, 6420000, 5180000],
        bg: "rgba(114, 199, 255, 0.3)",
        border: "rgba(114, 199, 255, 1)"
      }
    ]
  },

  /* ------------------------------------------------------ chart: 6 months --
     Where the orders currently stand. The period picker in index.html swaps
     the numbers, the key and the card heading, so only the shell of the
     chart is written here; `periods` below holds one set per choice. */
  months: {
    type: "doughnut",
    height: 230,
    center: "Total",
    labels: ["Order", "Approved Order", "Pending Order", "Sample"],
    bg: [
      "rgba(14, 165, 233, 0.55)",
      "rgba(20, 184, 166, 0.55)",
      "rgba(255, 159, 64, 0.55)",
      "rgba(139, 92, 246, 0.55)"
    ]
  },

  /* one entry per option in the picker. `title` becomes the card heading,
     `values` fills the doughnut and `amounts` fills the coloured key.
     The colours come from months.bg, in the same order as its labels. */
  periods: {
    "3m": {
      title: "Last 3 months Performance",
      values: [18340000, 9240000, 6410000, 2680000],
      amounts: ["18,340,000", "9,240,000", "6,410,000", "2,680,000"]
    },
    "6m": {
      title: "Last 6 months Performance",
      values: [28432600, 15240000, 6218400, 4120000],
      amounts: ["28,432,600", "15,240,000", "6,218,400", "4,120,000"]
    },
    ytd: {
      title: "This Year Performance",
      values: [68420000, 39240000, 21360000, 8760000],
      amounts: ["68,420,000", "39,240,000", "21,360,000", "8,760,000"]
    },
    lasty: {
      title: "Last Year Performance",
      values: [112800000, 74620000, 38940000, 14260000],
      amounts: ["1,12,80,000", "74,62,000", "38,94,000", "14,26,000"]
    }
  },

  /* ------------------------------------------------------ table: top sales --
     Two tabs sit on one card. These two tables have no header row, so the
     table says what its columns are:
       <table class="skd-table" data-cols="text,money,money">
     which works out as party name on the left, money on the right. */
  topParty: {
    rows: [
      ["Sinha Textile", 52000000, 395000],
      ["DBL Group", 46800000, 372000],
      ["Hanuman Textile", 41200000, 358000],
      ["Noman Group", 38600000, 341000],
      ["Envy Pacific", 35400000, 328000]
    ]
  },

  topCreditors: {
    rows: [
      ["Prime Denim", 18400000, 212000],
      ["Shanta Holdings", 16300000, 198000],
      ["Rupali Knitwear", 14900000, 185000],
      ["MJ Group", 13200000, 174000],
      ["Beximco Limited", 11800000, 162000]
    ]
  },

  /* ------------------------------------------------- table: party/product --
     The second tabs card: the same shape, broken down two other ways. */
  party: {
    rows: [
      ["Sinha Textile", 52000000, 86],
      ["DBL Group", 46800000, 74],
      ["Hanuman Textile", 41200000, 69],
      ["Noman Group", 38600000, 61],
      ["Envy Pacific", 35400000, 55]
    ]
  },

  product: {
    rows: [
      ["Basic Tee", 65200000, 124],
      ["Polo Shirt", 51400000, 98],
      ["Henley", 42800000, 82],
      ["Long Sleeve", 36500000, 71],
      ["Zipper Jacket", 29400000, 47]
    ]
  },

  /* ----------------------------------------------- chart: team performance --
     One bar per marketing man, three bars side by side. */
  team: {
    type: "bar",
    height: 330,
    yfmt: "money",
    labels: ["Rahim Uddin", "Karim Mia", "Salman Rahman", "Tanvir Hossain", "Ashikul Islam", "Shanto Das"],
    datasets: [
      {
        label: "Orders",
        data: [16820000, 15480000, 13240000, 11860000, 9620000, 7240000],
        bg: "rgba(75, 192, 192, 0.3)", border: "rgba(75, 192, 192, 1)"
      },
      {
        label: "Production",
        data: [15230000, 14360000, 12180000, 10940000, 8870000, 6510000],
        bg: "rgba(255, 159, 64, 0.3)", border: "rgba(255, 159, 64, 1)"
      },
      {
        label: "Sales",
        data: [14290000, 13820000, 11570000, 10280000, 8320000, 5980000],
        bg: "rgba(114, 199, 255, 0.3)", border: "rgba(114, 199, 255, 1)"
      }
    ]
  },

  /* ------------------------------------------------- table: recent orders --
     The status column is a coloured pill. A row is written as
     ["OD-2026-1284", "Sinha Textile", 4869000, { b: "Delivered" }]
     and the b marks it as a badge; the colour is worked out from the word. */
  recent: {
    rows: [
      ["OD-2026-1284", "Sinha Textile", 4869000, { b: "Delivered" }],
      ["OD-2026-1283", "DBL Group", 3127000, { b: "Delivered" }],
      ["OD-2026-1282", "Hanuman Textile", 2368000, { b: "In Production" }],
      ["OD-2026-1281", "Noman Group", 1984000, { b: "In Production" }],
      ["OD-2026-1280", "Envy Pacific", 2150000, { b: "Pending" }],
      ["OD-2026-1279", "Prime Denim", 1682000, { b: "Approved" }]
    ]
  },

  /* ------------------------------------------------ chart: item performance */
  item: {
    type: "bar",
    height: 330,
    yfmt: "money",
    labels: ["Basic Tee", "Polo Shirt", "Henley", "Long Sleeve", "Tank Top", "Zipper Jacket"],
    datasets: [
      {
        label: "Orders",
        data: [65200000, 51400000, 42800000, 36500000, 31200000, 29400000],
        bg: "rgba(75, 192, 192, 0.3)", border: "rgba(75, 192, 192, 1)"
      },
      {
        label: "Production",
        data: [55600000, 44700000, 38300000, 32900000, 28100000, 25400000],
        bg: "rgba(255, 159, 64, 0.3)", border: "rgba(255, 159, 64, 1)"
      }
    ]
  },

  /* --------------------------------------------------------- metrics grid --
     The money table at the bottom. cols run across the top, then one row
     per metric: the label on the left, then a value for each column. The
     values are already written the way they are shown, lakh style. */
  metrics: {
    cols: ["Today", "This Week", "Last Week", "This Month", "Last Month"],
    rows: [
      {
        label: "Order Value",
        icon: "order",
        c: "#0ea5e9",
        values: ["৳ 48,690", "৳ 2,14,80,000", "৳ 1,86,50,000", "৳ 8,49,20,000", "৳ 7,82,40,000"]
      },
      {
        label: "Production Value",
        icon: "production",
        c: "#0284c7",
        values: ["৳ 23,680", "৳ 1,24,10,000", "৳ 98,20,000", "৳ 4,28,40,000", "৳ 3,91,20,000"]
      },
      {
        label: "LC Value",
        icon: "commercial",
        c: "#0369a1",
        values: ["৳ 31,270", "৳ 1,58,20,000", "৳ 1,32,40,000", "৳ 5,76,80,000", "৳ 5,42,30,000"]
      },
      {
        label: "Payment",
        icon: "accounts",
        c: "#075985",
        values: ["৳ 19,840", "৳ 1,12,60,000", "৳ 98,60,000", "৳ 4,52,00,000", "৳ 4,18,00,000"]
      }
    ]
  }
};