/* ==========================================================================
   PRODUCTION DASHBOARD - DATA ONLY
   --------------------------------------------------------------------------
   This file holds numbers and nothing else. No markup is built here.

   The page modules/production/index.html is plain HTML: the cards, the
   tables, the headings and the chart canvases are all written out there, so
   you can read and change the page in one file. This file only says what
   goes into the empty spots on it.

   How the two fit together
   -----------------------
   Every value on the page is filled by assets/js/page-binder.js, which looks
   for these attributes in the HTML:

     <div data-hero>              the label and figure rail at the top
     <tbody data-rows="party">    rows for the table whose thead is above it
     <div data-legend="status">   the coloured key under a chart
     <canvas data-chart="output"> the chart drawn into this canvas

   So to change the layout, edit index.html.
   To change a number, edit the object below.

   Shape of each part
   ------------------
   overview.cells   one entry per stage card: the label the page shows and
                     the figure the binder drops into it; no progress bar
   <key>            a chart: labels, datasets, and the few extras this
                    project uses (type, height, yfmt, center)
   <key>.rows       rows, one array per row, in the order the columns sit in
                    the HTML thead above it; `total` adds a total line
   periods          one entry per option in the period picker

   When the real application is wired up, replace the literals below with a
   fetch. Nothing else in the page has to change.
   ========================================================================== */

window.PRODUCTION_DATA = {

  /* ------------------------------------------------------------ overview --
     Where the month's plan has got to. One entry per stage; the page lays
     out a card for each name and the binder puts the figure in it.
     `div: true` only matters to the plain rail form. */
  overview: {
    cells: [
      { label: "Pending", value: "98,533", color: "#f59e0b", div: true },
      { label: "Planning", value: "214,300", color: "#0ea5e9", div: true },
      { label: "Process", value: "232,600", color: "#0284c7", div: true },
      { label: "Finishing", value: "251,900", color: "#0369a1", div: true },
      { label: "Finish Goods", value: "268,400", color: "#075985" }
    ]
  },

  /* ------------------------------------------------- chart: order output --
     Ordered quantity, what came out of the floor and what went out of the
     gate, month by month. The picker swaps the numbers, the key and the
     card heading, so only the shell of the chart is written here and
     `periods` below holds one entry per choice.

     `series` gives each bar its colour by name, so a period only has to
     say the label and the numbers. */
  output: {
    type: "bar",
    height: 300,
    yfmt: "qty",
    series: {
      Order: {
        bg: "rgba(114, 199, 255, 0.28)",
        border: "rgba(114, 199, 255, 1)"
      },
      Production: {
        bg: "rgba(20, 184, 166, 0.28)",
        border: "rgba(20, 184, 166, 1)"
      },
      Delivery: {
        bg: "rgba(255, 159, 64, 0.28)",
        border: "rgba(255, 159, 64, 1)"
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
        { label: "Order", data: [252000, 244000, 268400] },
        { label: "Production", data: [217000, 207000, 232600] },
        { label: "Delivery", data: [196400, 188200, 214300] }
      ]
    },
    "6m": {
      title: "Last 6 months",
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      series: [
        { label: "Order", data: [232000, 239000, 245000, 252000, 244000, 268400] },
        { label: "Production", data: [199000, 205000, 211000, 217000, 207000, 232600] },
        { label: "Delivery", data: [182600, 188400, 194200, 196400, 188200, 214300] }
      ]
    },
    ytd: {
      title: "This year",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      series: [
        { label: "Order", data: [228400, 236100, 241800, 232000, 239000, 245000, 252000, 244000, 268400] },
        { label: "Production", data: [195200, 202600, 208400, 199000, 205000, 211000, 217000, 207000, 232600] },
        { label: "Delivery", data: [179800, 186200, 190600, 182600, 188400, 194200, 196400, 188200, 214300] }
      ]
    },
    lasty: {
      title: "Last year",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      series: [
        { label: "Order", data: [198200, 205600, 211400, 208900, 214300, 221700, 226400, 219800, 232400, 240600, 238100, 246800] },
        { label: "Production", data: [168400, 174900, 180200, 178600, 183900, 190400, 194700, 188300, 199600, 207200, 204800, 213500] },
        { label: "Delivery", data: [154200, 160600, 165800, 163100, 168400, 174900, 178600, 172400, 183100, 190600, 188200, 196700] }
      ]
    }
  },

  /* -------------------------------------------------- chart: job status --
     Where the live jobs are sitting right now. The names and the colours are
     fixed, so the key under the chart is worked out from them; `legend`
     repeats them with the job count of each, in the same order. */
  status: {
    type: "doughnut",
    height: 230,
    labels: ["Pending", "Planning", "Process", "Finishing", "Finish Goods"],
    datasets: [{
      data: [3, 2, 4, 3, 4],
      bg: [
        "rgba(245, 158, 11, 0.55)",
        "rgba(14, 165, 233, 0.55)",
        "rgba(2, 132, 199, 0.55)",
        "rgba(3, 105, 161, 0.55)",
        "rgba(7, 89, 133, 0.55)"
      ]
    }],
    legend: [
      { label: "Pending", value: "3", color: "#f59e0b" },
      { label: "Planning", value: "2", color: "#0ea5e9" },
      { label: "Process", value: "4", color: "#0284c7" },
      { label: "Finishing", value: "3", color: "#0369a1" },
      { label: "Finish Goods", value: "4", color: "#075985" }
    ]
  },

  /* --------------------------------------------- table: production performance */
  performance: {
    rows: [
      ["30 Sep 2026", "Wednesday", 14, 12400, 11600, 10900, 9800, 7600, 2600, 79.03],
      ["29 Sep 2026", "Tuesday", 14, 12471, 11786, 11143, 10408, 9677, 2063, 83.46],
      ["28 Sep 2026", "Monday", 13, 11128, 10454, 9821, 9190, 8550, 1938, 82.58],
      ["27 Sep 2026", "Sunday", 15, 11704, 11025, 10388, 9658, 9020, 2046, 82.52],
      ["26 Sep 2026", "Saturday", 14, 12279, 11595, 10955, 10221, 9583, 2058, 83.24],
      ["24 Sep 2026", "Thursday", 16, 10936, 10264, 9632, 9002, 8362, 1934, 82.32],
      ["23 Sep 2026", "Wednesday", 15, 11512, 10835, 10199, 9471, 8832, 2041, 82.27],
      ["22 Sep 2026", "Tuesday", 13, 12088, 11405, 10766, 10034, 9395, 2054, 83.01]
    ],
    total: ["Total", "8 days", 114, 94518, 88964, 83804, 77784, 71019, 16734, 82.28]
  },

  /* ------------------------------------------------------ job pool tabs --
     The same 16 live jobs grouped three ways, so all three totals match.
     Each tab is a key of its own, in the order the tabs are written in
     modules/production/index.html. */
  party: {
    rows: [
      ["Prime Denim Ltd", 3, 96974, 96974, 93432],
      ["Hanuman Textile", 3, 61134, 36400, 21706],
      ["DBL Group", 2, 51298, 47855, 34763],
      ["Noman Group", 3, 42162, 32296, 24630],
      ["Envy Pacific", 3, 25297, 13889, 7919],
      ["Beximco Limited", 2, 9135, 6816, 5017]
    ],
    total: ["Total :", 16, 286000, 234230, 187467]
  },

  item: {
    rows: [
      ["3 Ply Carton", 4, 81163, 76427, 65450],
      ["5 Ply Carton", 4, 70621, 49948, 41052],
      ["Corrugated Sheet", 2, 41460, 41460, 37082],
      ["Die Cut Box", 2, 36892, 31594, 22205],
      ["Top Bottom Box", 2, 29162, 23305, 16239],
      ["Divider Insert", 2, 26702, 11496, 5439]
    ],
    total: ["Total :", 16, 286000, 234230, 187467]
  },

  team: {
    rows: [
      ["Karim Mia", 3, 80812, 77369, 60735],
      ["Rahim Uddin", 2, 67460, 67460, 67460],
      ["Salman Rahman", 3, 61134, 36400, 21706],
      ["Tanvir Hossain", 3, 42162, 32296, 24630],
      ["Ashikul Islam", 3, 25297, 13889, 7919],
      ["Shanto Das", 2, 9135, 6816, 5017]
    ],
    total: ["Total :", 16, 286000, 234230, 187467]
  }
};