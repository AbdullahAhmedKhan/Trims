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
     Sold value against what was billed and what actually came in, month by
     month. All three are bars on one axis: a rate on a second axis needs a
     line of its own, and two mixed kinds on one card read as clutter.

     The picker swaps the numbers, the key and the card heading, so only the
     shell of the chart is written here and `periods` below holds one entry
     per choice.

     `series` gives each bar its colour by name, so a period only has to say
     the label and the numbers. */
  billing: {
    type: "bar",
    height: 300,
    yfmt: "money",
    series: {
      Sales: {
        bg: "rgba(114, 199, 255, 0.28)",
        border: "rgba(114, 199, 255, 1)"
      },
      "Bill Value": {
        bg: "rgba(2, 132, 199, 0.28)",
        border: "rgba(2, 132, 199, 1)"
      },
      Received: {
        bg: "rgba(20, 184, 166, 0.28)",
        border: "rgba(20, 184, 166, 1)"
      }
    }
  },

  /* one entry per option in the picker. `title` becomes the card heading,
     `labels` is the x axis and `series` is one entry per bar group. */
  periods: {
    "3m": {
      title: "Last 3 Months Billing",
      labels: ["Jul", "Aug", "Sep"],
      series: [
        { label: "Sales", data: [4260000, 3980000, 2485600] },
        { label: "Bill Value", data: [3790000, 3460000, 1786500] },
        { label: "Received", data: [2933000, 2616000, 1254300] }
      ]
    },
    "6m": {
      title: "Last 6 Months Billing",
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      series: [
        { label: "Sales", data: [3820000, 4150000, 4490000, 4260000, 3980000, 2485600] },
        { label: "Bill Value", data: [3310000, 3680000, 4020000, 3790000, 3460000, 1786500] },
        { label: "Received", data: [2548000, 2911000, 3163000, 2933000, 2616000, 1254300] }
      ]
    },
    ytd: {
      title: "This Year Billing",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      series: [
        { label: "Sales", data: [3150000, 3280000, 3610000, 3820000, 4150000, 4490000, 4260000, 3980000, 2485600] },
        { label: "Bill Value", data: [2760000, 2870000, 3160000, 3310000, 3680000, 4020000, 3790000, 3460000, 1786500] },
        { label: "Received", data: [2210000, 2300000, 2540000, 2548000, 2911000, 3163000, 2933000, 2616000, 1254300] }
      ]
    },
    lasty: {
      title: "Last Year Billing",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      series: [
        { label: "Sales", data: [2860000, 2940000, 3180000, 3420000, 3560000, 3710000, 3840000, 3620000, 3980000, 4120000, 4050000, 4280000] },
        { label: "Bill Value", data: [2510000, 2580000, 2790000, 3010000, 3140000, 3270000, 3380000, 3190000, 3510000, 3640000, 3570000, 3780000] },
        { label: "Received", data: [2010000, 2070000, 2240000, 2420000, 2530000, 2630000, 2720000, 2570000, 2830000, 2940000, 2880000, 3050000] }
      ]
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
  }
};