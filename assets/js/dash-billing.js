/* ==========================================================================
   BILLING DASHBOARD - DATA ONLY
   --------------------------------------------------------------------------
   This file holds numbers and nothing else. No markup is built here.

   The page modules/billing/index.html is plain HTML: the cards, the tables,
   the headings and the chart canvases are all written out there, so you can
   read and change the page in one file. This file only says what goes into
   the empty spots on it.

   How the two fit together
   -----------------------
   Every value on the page is filled by assets/js/page-binder.js, which looks
   for these attributes in the HTML:

     <div data-hero>              the figure behind one overview card
     <tbody data-rows="lc">        rows for the table whose thead is above it
     <div data-legend="billing">   the coloured key under a chart
     <canvas data-chart="billing"> the chart drawn into this canvas

   So to change the layout, edit index.html.
   To change a number, edit the object below.

   Shape of each part
   ------------------
   overview.cells   one entry per overview card: the label the page shows and
                    the figure the binder drops into it
   <key>            a chart: labels, datasets, and the few extras this
                    project uses (type, height, yfmt, center)
   <key>.rows       rows, one array per row, in the order the columns sit in
                    the HTML thead above it
   periods          one entry per option in the period picker

   A cell is normally just the value. Three shapes are read as well, so a
   table can carry something other than a plain number:

     { b: "Delivered" }                  a status pill
     { t: "-" }                          text already written as it should show
     { lines: ["Mat · 28 Oct 2026"] }    a short label and a value, stacked

   When the real application is wired up, replace the literals below with a
   fetch. Nothing else in the page has to change.
   ========================================================================== */

window.BILLING_DATA = {

  /* ------------------------------------------------------------ overview --
     How much was sold, how much of it was billed, how much came in and what
     is still to come. One entry per card; the page lays out a card for each
     name and the binder puts the figure in it. */
  overview: {
    cells: [
      { label: "Sales", value: "৳ 24.86 L", color: "#0284c7" },
      { label: "Bill Value", value: "৳ 17.86 L", color: "#0ea5e9" },
      { label: "Received", value: "৳ 12.54 L", color: "#14b8a6" },
      { label: "Pending", value: "৳ 12.31 L", color: "#f59e0b" }
    ]
  },

  /* ------------------------------------------------------ chart: billing --
     What was billed, period by period. The picker swaps the numbers, the key
     and the card heading, so only the shell of the chart is written here and
     `periods` below holds one entry per choice.

     `series` gives each bar its colour by name, so a period only has to say
     the label and the numbers. */
  billing: {
    type: "bar",
    height: 300,
    yfmt: "money",
    series: {
      "Bill Value": {
        bg: "rgba(2, 132, 199, 0.28)",
        border: "rgba(2, 132, 199, 1)"
      }
    }
  },

  /* one entry per option in the picker. `title` becomes the card heading,
     `labels` is the x axis and `series` is one entry per bar group. */
  periods: {
    "7d": {
      title: "Last 7 days Billing",
      labels: ["24 Sep", "25 Sep", "26 Sep", "27 Sep", "28 Sep", "29 Sep", "30 Sep"],
      series: [
        { label: "Bill Value", data: [186000, 142000, 168500, 96000, 124000, 210500, 198400] }
      ]
    },
    "30d": {
      title: "Last Month Billing",
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
      series: [
        { label: "Bill Value", data: [842000, 916000, 874000, 968000, 895000] }
      ]
    },
    thism: {
      title: "This Month Billing",
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      series: [
        { label: "Bill Value", data: [916000, 874000, 968000, 895000] }
      ]
    },
    "3m": {
      title: "Last 3 Months Billing",
      labels: ["Jul", "Aug", "Sep"],
      series: [
        { label: "Bill Value", data: [3790000, 3460000, 1786500] }
      ]
    },
    "6m": {
      title: "Last 6 Months Billing",
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      series: [
        { label: "Bill Value", data: [3310000, 3680000, 4020000, 3790000, 3460000, 1786500] }
      ]
    },
    ytd: {
      title: "This Year Billing",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      series: [
        { label: "Bill Value", data: [2760000, 2870000, 3160000, 3310000, 3680000, 4020000, 3790000, 3460000, 1786500] }
      ]
    },
    lasty: {
      title: "Last Year Billing",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      series: [
        { label: "Bill Value", data: [2510000, 2580000, 2790000, 3010000, 3140000, 3270000, 3380000, 3190000, 3510000, 3640000, 3570000, 3780000] }
      ]
    }
  },

  /* -------------------------------------------------- chart: billing status --
     Sales against what was billed and what came in, as one ring. The names
     and the colours are fixed, so `legend` repeats them with the amount of
     each, in the same order. The date filter on the card swaps the amounts
     through `periods` below, one entry per option of the picker. */
  status: {
    type: "doughnut",
    height: 230,
    labels: ["Sales", "Bill Value", "Received"],
    datasets: [{
      data: [10725600, 9036500, 6803300],
      bg: [
        "rgba(14, 165, 233, 0.55)",
        "rgba(2, 132, 199, 0.55)",
        "rgba(20, 184, 166, 0.55)"
      ]
    }],
    legend: [
      { label: "Sales", value: "৳ 1.07 Cr", color: "#0ea5e9" },
      { label: "Bill Value", value: "৳ 90.37 L", color: "#0284c7" },
      { label: "Received", value: "৳ 68.03 L", color: "#14b8a6" }
    ],

    periods: {
      "7d": {
        values: [1560000, 1125400, 796000],
        amounts: ["৳ 15.60 L", "৳ 11.25 L", "৳ 7.96 L"]
      },
      "30d": {
        values: [6180000, 4495000, 3420000],
        amounts: ["৳ 61.80 L", "৳ 44.95 L", "৳ 34.20 L"]
      },
      thism: {
        values: [5020000, 3653000, 2790000],
        amounts: ["৳ 50.20 L", "৳ 36.53 L", "৳ 27.90 L"]
      },
      "3m": {
        values: [10725600, 9036500, 6803300],
        amounts: ["৳ 1.07 Cr", "৳ 90.37 L", "৳ 68.03 L"]
      },
      "6m": {
        values: [23185600, 20046500, 15425300],
        amounts: ["৳ 2.32 Cr", "৳ 2.00 Cr", "৳ 1.54 Cr"]
      },
      lasty: {
        values: [43560000, 38370000, 30890000],
        amounts: ["৳ 4.36 Cr", "৳ 3.84 Cr", "৳ 3.09 Cr"]
      },
      ytd: {
        values: [33225600, 28836500, 22475300],
        amounts: ["৳ 3.32 Cr", "৳ 2.88 Cr", "৳ 2.25 Cr"]
      }
    }
  },

  /* ---------------------------------------------------------- table: lc --
     Where each running LC is sitting and when its three dates fall. An LC
     sits at one stage, so the other three stage columns are left empty for
     that row. The three dates share one column as { lines: [...] } so the
     table keeps its width, and there is no total row: the overview cards
     above already carry the summary. */
  lc: {
    rows: [
      ["LC-2026-0396", "Beximco Limited", 930000, null, 930000, null, null,
        { lines: ["Mat · 28 Oct 2026", "Shp · 24 Jul 2026", "Exp · 28 Dec 2026"] }],
      ["LC-2026-0412", "Prime Denim", 1240000, null, null, 1240000, null,
        { lines: ["Mat · 15 Nov 2026", "Shp · 12 Aug 2026", "Exp · 15 Feb 2027"] }],
      ["LC-2026-0438", "Rupali Knitwear", 865000, null, null, null, 865000,
        { lines: ["Mat · 30 Nov 2026", "Shp · 02 Sep 2026", "Exp · 28 Feb 2027"] }],
      ["LC-2026-0451", "Shanta Holdings", 620000, 620000, null, null, null,
        { lines: ["Mat · 20 Dec 2026", "Shp · 18 Sep 2026", "Exp · 20 Mar 2027"] }],
      ["LC-2026-0447", "MJ Group", 563000, null, null, null, null,
        { lines: ["Mat · 15 Jan 2027", "Shp · 11 Sep 2026", "Exp · 15 Apr 2027"] }]
    ]
  },

  /* ------------------------------------------ top collection / creditors --
     The three small cards under the Billing Status ring: who paid in the
     most, who owes the most, and who has not ordered for a while. */
  collection: {
    rows: [
      ["Prime Denim Ltd", 485000],
      ["DBL Group", 372000],
      ["Hanuman Textile", 318500],
      ["Envy Pacific", 264000],
      ["Beximco Limited", 198500],
      ["Noman Group", 152000]
    ]
  },

  creditors: {
    rows: [
      ["Hanuman Textile", 1250000],
      ["Noman Group", 985000],
      ["Envy Pacific", 742000],
      ["MJ Group", 518000],
      ["Shanta Holdings", 364000],
      ["Rupali Knitwear", 205000]
    ]
  },

  inactive: {
    rows: [
      ["Rupali Knitwear", 142],
      ["Prime Denim", 118],
      ["Sinha Textile", 96],
      ["Shanta Holdings", 74],
      ["MJ Group", 61],
      ["Beximco Limited", 47]
    ]
  }
};