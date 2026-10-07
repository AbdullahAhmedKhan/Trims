/* ==========================================================================
   COMMERCIAL DASHBOARD - the numbers
   --------------------------------------------------------------------------
   Ported from "dashboard - Commercial.php". Every figure is the value the
   PHP view shipped with, ready to be swapped for a live fetch later on.

   The layout is written out in modules/commercial/index.html, so this file
   only carries values - no markup, no formatting. The page says where each
   one goes:

      assets/js/dash-commercial.js   the numbers    <- edit values here
      modules/commercial/index.html  the layout     <- edit the page here
      assets/js/commercial-page.js   says what goes where
      assets/js/page-binder.js       the join

   Shape of each part
   ------------------
   overview.cells   one entry per overview card: the label the page shows and
                     the figure the binder drops into it
   lcTrend          the bar chart behind the period picker; one New LC value
                     bar per period, colours from `series`, numbers from
                     `periods`
   status           the Commercial Status doughnut: LC, party acceptance,
                     bank acceptance and payment, with its own date filter
                     reading status.periods
   periods          one entry per option in the bar chart picker
   pi, lc           Recent PI and LC & Maturity Timeline

   When the real application is wired up, replace the literals below with a
   fetch. Nothing else in the page has to change.
   ========================================================================== */

window.COMMERCIAL_DATA = {

  /* ------------------------------------------------------------ overview --
     Three figures: what has been invoiced, what has been opened against it,
     and what has actually come back in. */
  overview: {
    cells: [
      { label: "PI", value: "৳ 24.86 L" },
      { label: "LC", value: "৳ 41.61 L" },
      /* payments received, at the 71.9% realisation the desk reports
         against the 41.61 L of LC opened */
      { label: "Payment", value: "৳ 29.92 L" }
    ]
  },

  /* ------------------------------------------------------- chart: lcTrend --
     One bar per period: the new LC value. The picker swaps the window; the
     colour stays. */
  lcTrend: {
    type: "bar",
    height: 300,
    yfmt: "money",
    series: {
      "New LC value": { bg: "rgba(14, 165, 233, 0.26)", border: "rgba(14, 165, 233, 1)" }
    }
  },

  /* one entry per option in the picker. `title` becomes the card heading,
     `labels` is the x axis and `series` holds the single New LC value bar. */
  periods: {
    "7d": {
      title: "Last 7 days",
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [
        { label: "New LC value", data: [412000, 368000, 524000, 286000, 475000, 198000, 334000] }
      ]
    },
    "30d": {
      title: "Last Month",
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
      series: [
        { label: "New LC value", data: [860000, 920000, 780000, 590000, 310000] }
      ]
    },
    thism: {
      title: "This Month",
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      series: [
        { label: "New LC value", data: [480000, 520000, 430000, 356500] }
      ]
    },
    "3m": {
      title: "Last 3 Months",
      labels: ["Jul", "Aug", "Sep"],
      series: [
        { label: "New LC value", data: [3790000, 3460000, 1786500] }
      ]
    },
    "6m": {
      title: "Last 6 Months",
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      series: [
        { label: "New LC value", data: [3310000, 3680000, 4020000, 3790000, 3460000, 1786500] }
      ]
    },
    lasty: {
      title: "Last Year",
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
      series: [
        { label: "New LC value", data: [2480000, 2660000, 2840000, 3010000, 3180000, 3340000, 3120000, 3270000, 3450000, 2980000, 3150000, 3390000] }
      ]
    },
    ytd: {
      title: "This Year",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      series: [
        { label: "New LC value", data: [2640000, 2910000, 3150000, 3310000, 3680000, 4020000, 3790000, 3460000, 1786500] }
      ]
    }
  },

  /* --------------------------------------------------- chart: status --
     Where the new LC value stands: still LC, accepted by the party,
     accepted by the bank, and paid. The segment names and colours are
     fixed; its own picker reads `status.periods` for the window, so the
     bar card and this ring each carry a date filter of their own. */
  status: {
    type: "doughnut",
    height: 230,
    center: "New LC",
    centerValue: "৳ 90.36 L",
    labels: ["LC", "Party acceptance", "Bank acceptance", "Payment"],
    datasets: [{
      data: [9036500, 7680000, 6430000, 6495000],
      bg: [
        "rgba(14, 165, 233, 0.55)",
        "rgba(114, 199, 255, 0.55)",
        "rgba(255, 159, 64, 0.55)",
        "rgba(20, 184, 166, 0.55)"
      ]
    }],
    legend: [
      { label: "LC", value: "৳ 90.36 L", color: "#0ea5e9" },
      { label: "Party acceptance", value: "৳ 76.80 L", color: "#72c7ff" },
      { label: "Bank acceptance", value: "৳ 64.30 L", color: "#ff9f40" },
      { label: "Payment", value: "৳ 64.95 L", color: "#14b8a6" }
    ],
    periods: {
      "7d": {
        title: "Last 7 days",
        centerValue: "৳ 25.97 L",
        values: [2597000, 2245000, 1915000, 1865000],
        amounts: ["৳ 25.97 L", "৳ 22.45 L", "৳ 19.15 L", "৳ 18.65 L"]
      },
      "30d": {
        title: "Last Month",
        centerValue: "৳ 34.60 L",
        values: [3460000, 2910000, 2480000, 2490000],
        amounts: ["৳ 34.60 L", "৳ 29.10 L", "৳ 24.80 L", "৳ 24.90 L"]
      },
      thism: {
        title: "This Month",
        centerValue: "৳ 17.86 L",
        values: [1786500, 1530000, 1190000, 1285000],
        amounts: ["৳ 17.86 L", "৳ 15.30 L", "৳ 11.90 L", "৳ 12.85 L"]
      },
      "3m": {
        title: "Last 3 Months",
        centerValue: "৳ 90.36 L",
        values: [9036500, 7680000, 6430000, 6495000],
        amounts: ["৳ 90.36 L", "৳ 76.80 L", "৳ 64.30 L", "৳ 64.95 L"]
      },
      "6m": {
        title: "Last 6 Months",
        centerValue: "৳ 2.00 Cr",
        values: [20046500, 17150000, 14420000, 14415000],
        amounts: ["৳ 2.00 Cr", "৳ 1.72 Cr", "৳ 1.44 Cr", "৳ 1.44 Cr"]
      },
      lasty: {
        title: "Last Year",
        centerValue: "৳ 3.69 Cr",
        values: [36870000, 31540000, 26660000, 26510000],
        amounts: ["৳ 3.69 Cr", "৳ 3.15 Cr", "৳ 2.67 Cr", "৳ 2.65 Cr"]
      },
      ytd: {
        title: "This Year",
        centerValue: "৳ 2.87 Cr",
        values: [28746500, 24620000, 20700000, 20670000],
        amounts: ["৳ 2.87 Cr", "৳ 2.46 Cr", "৳ 2.07 Cr", "৳ 2.07 Cr"]
      }
    }
  },


  /* ------------------------------------------------------------ table: pi --
     The most recent proforma invoices raised, with the stage each sits at. */
  pi: {
    rows: [
      ["PI-1184", "Sinha Textile", 486900, { b: "Forward to Party" }],
      ["PI-1183", "DBL Group", 312700, { b: "Forward to Party" }],
      ["PI-1182", "Envy Pacific", 584000, { b: "PI Issue" }],
      ["PI-1181", "Hanuman Textile", 236800, { b: "Forward to Party" }],
      ["PI-1180", "Noman Group", 198400, { b: "Forward to Party" }],
      ["PI-1179", "Beximco Limited", 152300, { b: "PI Issue" }],
      ["PI-1178", "Prime Denim", 315400, { b: "Forward to Party" }]
    ],
    total: ["Total", "7 PIs", 2486560, ""]
  },

  /* ------------------------------------------------------------ table: lc --
     Every running LC with when it was opened and when it matures. */
  lc: {
    rows: [
      ["LC-2026-0355", "Noman Group", 448000, { t: "28 May 2026" }, { t: "12 Oct 2026" }, { b: "In Hand" }, 12],
      ["LC-2026-0371", "Hanuman Textile", 512000, { t: "18 Jun 2026" }, { t: "5 Oct 2026" }, { b: "Bank Acceptance" }, 5],
      ["LC-2026-0396", "Beximco Limited", 930000, { t: "24 Jul 2026" }, { t: "28 Oct 2026" }, { b: "Forwarded to Bank" }, 28],
      ["LC-2026-0412", "Prime Denim", 1240000, { t: "12 Aug 2026" }, { t: "15 Nov 2026" }, { b: "Bank Acceptance" }, 46],
      ["LC-2026-0438", "Rupali Knitwear", 865000, { t: "2 Sep 2026" }, { t: "30 Nov 2026" }, { b: "In Hand" }, 61],
      ["LC-2026-0447", "MJ Group", 563000, { t: "11 Sep 2026" }, { t: "15 Jan 2027" }, { b: "Forwarded to Party" }, 108],
      ["LC-2026-0451", "Shanta Holdings", 620000, { t: "18 Sep 2026" }, { t: "20 Dec 2026" }, { b: "LC Open" }, 81]
    ]
  }
};
