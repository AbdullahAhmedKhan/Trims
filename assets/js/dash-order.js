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
      Order value over the window the date filter on the card chooses. The
      picker swaps the numbers, the key and the card heading, so only the
      shell of the chart is written here and `periods` below holds one set
      per choice.

      `series` gives each bar its colour by name, so a period only has to
      say the label and the numbers. */
  last7: {
    type: "bar",
    height: 250,
    yfmt: "money",
    series: {
      "Order Value": {
        bg: "rgba(114, 199, 255, 0.3)",
        border: "rgba(114, 199, 255, 1)"
      }
    },

    /* one entry per option of the date filter on the first card, in the
       order the options are written in modules/order/index.html. `title`
       becomes the card heading, `labels` is the x axis and `series` is one
       entry per bar group. */
    periods: {
      "7d": {
        title: "Last 7 days order",
        labels: ["22 Sep", "23 Sep", "24 Sep", "25 Sep", "26 Sep", "27 Sep", "28 Sep"],
        series: [
          { label: "Order Value", data: [4860000, 5240000, 4680000, 6120000, 5840000, 6420000, 5180000] }
        ]
      },
      "30d": {
        title: "Last Month",
        labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
        series: [
          { label: "Order Value", data: [33800000, 36200000, 34900000, 37500000, 35400000] }
        ]
      },
      thism: {
        title: "This Month",
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        series: [
          { label: "Order Value", data: [36400000, 38200000, 37100000, 39600000] }
        ]
      },
      "3m": {
        title: "Last 3 Months",
        labels: ["Jul", "Aug", "Sep"],
        series: [
          { label: "Order Value", data: [154600000, 161800000, 159400000] }
        ]
      },
      "6m": {
        title: "Last 6 Months",
        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
        series: [
          { label: "Order Value", data: [138400000, 142600000, 146900000, 154600000, 161800000, 159400000] }
        ]
      },
      ytd: {
        title: "This Year",
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
        series: [
          { label: "Order Value", data: [132400000, 136800000, 141200000, 138400000, 142600000, 146900000, 154600000, 161800000, 159400000] }
        ]
      },
      lasty: {
        title: "Last Year",
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        series: [
          { label: "Order Value", data: [118600000, 121400000, 126800000, 124200000, 129600000, 133400000, 136800000, 131200000, 135600000, 140200000, 138900000, 143600000] }
        ]
      }
    }
  },

  /* ------------------------------------------------------ chart: 6 months --
     Where the orders currently stand. The period picker in index.html swaps
     the numbers, the key and the card heading, so only the shell of the
     chart is written here; `periods` below holds one set per choice. */
  months: {
    type: "doughnut",
    height: 230,
    center: "Total",
    labels: ["Order", "Production", "Delivery", "Sample"],
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
      which works out as party name on the left, money on the right.

      The date filter on the card is a period picker: `rows` is what the
      table starts with, and `periods` below holds one set of rows per
      option in that picker, so choosing one swaps the table. */
  topParty: {
    rows: [
      ["Sinha Textile", 52000000, 395000],
      ["DBL Group", 46800000, 372000],
      ["Hanuman Textile", 41200000, 358000],
      ["Noman Group", 38600000, 341000],
      ["Envy Pacific", 35400000, 328000]
    ],
    periods: {
      thism: {
        rows: [
          ["Sinha Textile", 52000000, 395000],
          ["DBL Group", 46800000, 372000],
          ["Hanuman Textile", 41200000, 358000],
          ["Noman Group", 38600000, 341000],
          ["Envy Pacific", 35400000, 328000]
        ]
      },
      lastm: {
        rows: [
          ["Sinha Textile", 48600000, 362000],
          ["DBL Group", 44200000, 348000],
          ["Hanuman Textile", 39800000, 331000],
          ["Noman Group", 36400000, 315000],
          ["Envy Pacific", 33200000, 296000]
        ]
      },
      "3m": {
        rows: [
          ["Sinha Textile", 146200000, 1084000],
          ["DBL Group", 132400000, 1012000],
          ["Hanuman Textile", 118600000, 946000],
          ["Noman Group", 109800000, 894000],
          ["Envy Pacific", 98400000, 842000]
        ]
      }
    }
  },

  /* ------------------------------------------------- table: party/product --
      The second tabs card: the same shape, broken down two other ways.
      Both tables hang off the one date filter on that card, which is why
      index.html writes data-period="party,product" - each key keeps its
      own periods below and both are swapped together. */
  party: {
    rows: [
      ["Sinha Textile", 52000000, 86],
      ["DBL Group", 46800000, 74],
      ["Hanuman Textile", 41200000, 69],
      ["Noman Group", 38600000, 61],
      ["Envy Pacific", 35400000, 55]
    ],
    periods: {
      thism: {
        rows: [
          ["Sinha Textile", 52000000, 86],
          ["DBL Group", 46800000, 74],
          ["Hanuman Textile", 41200000, 69],
          ["Noman Group", 38600000, 61],
          ["Envy Pacific", 35400000, 55]
        ]
      },
      lastm: {
        rows: [
          ["Sinha Textile", 48600000, 79],
          ["DBL Group", 44200000, 68],
          ["Hanuman Textile", 39800000, 64],
          ["Noman Group", 36400000, 57],
          ["Envy Pacific", 33200000, 51]
        ]
      },
      "3m": {
        rows: [
          ["Sinha Textile", 146200000, 232],
          ["DBL Group", 132400000, 214],
          ["Hanuman Textile", 118600000, 198],
          ["Noman Group", 109800000, 179],
          ["Envy Pacific", 98400000, 163]
        ]
      }
    }
  },

  product: {
    rows: [
      ["Basic Tee", 65200000, 124],
      ["Polo Shirt", 51400000, 98],
      ["Henley", 42800000, 82],
      ["Long Sleeve", 36500000, 71],
      ["Zipper Jacket", 29400000, 47]
    ],
    periods: {
      thism: {
        rows: [
          ["Basic Tee", 65200000, 124],
          ["Polo Shirt", 51400000, 98],
          ["Henley", 42800000, 82],
          ["Long Sleeve", 36500000, 71],
          ["Zipper Jacket", 29400000, 47]
        ]
      },
      lastm: {
        rows: [
          ["Basic Tee", 61400000, 117],
          ["Polo Shirt", 48600000, 92],
          ["Henley", 39600000, 76],
          ["Long Sleeve", 34200000, 66],
          ["Zipper Jacket", 27600000, 44]
        ]
      },
      "3m": {
        rows: [
          ["Basic Tee", 186400000, 361],
          ["Polo Shirt", 148600000, 287],
          ["Henley", 124200000, 238],
          ["Long Sleeve", 106800000, 204],
          ["Zipper Jacket", 87200000, 139]
        ]
      }
    }
  },

  /* ----------------------------------------------- chart: team performance --
      One bar per marketing man, three bars side by side. `series` gives
      each bar its colour by name, and `periods` below holds one set of
      numbers per option of the date filter on the card, so the picker
      swaps the bars and the heading and keeps the same six men. */
  team: {
    type: "bar",
    height: 330,
    yfmt: "money",
    series: {
      "Orders": {
        bg: "rgba(75, 192, 192, 0.3)", border: "rgba(75, 192, 192, 1)"
      },
      "Production": {
        bg: "rgba(255, 159, 64, 0.3)", border: "rgba(255, 159, 64, 1)"
      },
      "Sales": {
        bg: "rgba(114, 199, 255, 0.3)", border: "rgba(114, 199, 255, 1)"
      }
    },
    periods: {
      thism: {
        title: "Last 1 Month Team Performance",
        labels: ["Rahim Uddin", "Karim Mia", "Salman Rahman", "Tanvir Hossain", "Ashikul Islam", "Shanto Das"],
        series: [
          { label: "Orders", data: [16820000, 15480000, 13240000, 11860000, 9620000, 7240000] },
          { label: "Production", data: [15230000, 14360000, 12180000, 10940000, 8870000, 6510000] },
          { label: "Sales", data: [14290000, 13820000, 11570000, 10280000, 8320000, 5980000] }
        ]
      },
      lastm: {
        title: "Last Month Team Performance",
        labels: ["Rahim Uddin", "Karim Mia", "Salman Rahman", "Tanvir Hossain", "Ashikul Islam", "Shanto Das"],
        series: [
          { label: "Orders", data: [15240000, 16120000, 12480000, 10960000, 10240000, 6840000] },
          { label: "Production", data: [14180000, 14920000, 11460000, 9840000, 9320000, 6120000] },
          { label: "Sales", data: [13120000, 14260000, 10820000, 9180000, 8640000, 5540000] }
        ]
      },
      "3m": {
        title: "Last 3 Months Team Performance",
        labels: ["Rahim Uddin", "Karim Mia", "Salman Rahman", "Tanvir Hossain", "Ashikul Islam", "Shanto Das"],
        series: [
          { label: "Orders", data: [46820000, 43640000, 37280000, 32460000, 27840000, 21320000] },
          { label: "Production", data: [43180000, 40120000, 34460000, 29840000, 25260000, 18940000] },
          { label: "Sales", data: [40240000, 38680000, 32140000, 27620000, 23480000, 17160000] }
        ]
      },
      "6m": {
        title: "Last 6 Months Team Performance",
        labels: ["Rahim Uddin", "Karim Mia", "Salman Rahman", "Tanvir Hossain", "Ashikul Islam", "Shanto Das"],
        series: [
          { label: "Orders", data: [92460000, 86280000, 73420000, 64820000, 55160000, 42680000] },
          { label: "Production", data: [86240000, 79860000, 68240000, 59420000, 50480000, 37820000] },
          { label: "Sales", data: [80120000, 76420000, 64180000, 55240000, 46920000, 34260000] }
        ]
      }
    }
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

  /* ------------------------------------------------- chart: item performance --
      Same shape as team above: `series` colours the two bars by name and
      `periods` holds one set per option of the date filter on the card. */
  item: {
    type: "bar",
    height: 330,
    yfmt: "money",
    series: {
      "Orders": {
        bg: "rgba(75, 192, 192, 0.3)", border: "rgba(75, 192, 192, 1)"
      },
      "Production": {
        bg: "rgba(255, 159, 64, 0.3)", border: "rgba(255, 159, 64, 1)"
      }
    },
    periods: {
      thism: {
        title: "Last 1 Month Item Performance",
        labels: ["Basic Tee", "Polo Shirt", "Henley", "Long Sleeve", "Tank Top", "Zipper Jacket"],
        series: [
          { label: "Orders", data: [65200000, 51400000, 42800000, 36500000, 31200000, 29400000] },
          { label: "Production", data: [55600000, 44700000, 38300000, 32900000, 28100000, 25400000] }
        ]
      },
      lastm: {
        title: "Last Month Item Performance",
        labels: ["Basic Tee", "Polo Shirt", "Henley", "Long Sleeve", "Tank Top", "Zipper Jacket"],
        series: [
          { label: "Orders", data: [61400000, 48600000, 39600000, 34200000, 28800000, 27600000] },
          { label: "Production", data: [52400000, 41800000, 35600000, 30800000, 26200000, 23800000] }
        ]
      },
      "3m": {
        title: "Last 3 Months Item Performance",
        labels: ["Basic Tee", "Polo Shirt", "Henley", "Long Sleeve", "Tank Top", "Zipper Jacket"],
        series: [
          { label: "Orders", data: [186400000, 148600000, 124200000, 106800000, 91400000, 87200000] },
          { label: "Production", data: [158200000, 126400000, 108600000, 94200000, 81600000, 74800000] }
        ]
      },
      "6m": {
        title: "Last 6 Months Item Performance",
        labels: ["Basic Tee", "Polo Shirt", "Henley", "Long Sleeve", "Tank Top", "Zipper Jacket"],
        series: [
          { label: "Orders", data: [364800000, 292400000, 241600000, 208400000, 178600000, 169400000] },
          { label: "Production", data: [312600000, 246800000, 210400000, 182600000, 159200000, 145800000] }
        ]
      }
    }
  },

  /* --------------------------------------------------------- metrics grid --
     The money table at the bottom. cols run across the top, then one row
     per metric: the label on the left, then a value for each column. The
     values are already written the way they are shown, lakh style. */
  metrics: {
    cols: ["Today", "This Week", "Last Week", "This Month", "Last Month"],
    rows: [
      {
        label: "Order",
        icon: "order",
        c: "#0ea5e9",
        values: [" 48,690", " 2,14,80,000", " 1,86,50,000", " 8,49,20,000", " 7,82,40,000"]
      },
      {
        label: "Production",
        icon: "production",
        c: "#0284c7",
        values: [" 23,680", " 1,24,10,000", " 98,20,000", " 4,28,40,000", " 3,91,20,000"]
      },
      {
        label: "Delivery",
        icon: "delivery",
        c: "#0369a1",
        values: [" 31,270", " 1,58,20,000", " 1,32,40,000", " 5,76,80,000", " 5,42,30,000"]
      }
    ]
  }
};
