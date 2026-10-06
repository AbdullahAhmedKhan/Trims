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
   lcTrend          the bar chart behind the period picker; `series` gives
                    every bar its colour, the numbers come from `periods`
   periods          one entry per option in the period picker
   exportLc         the Export LC Funnel, written in the serial the page shows
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
     LC opened in the month, how much of it the party accepted, and how much
     the bank then accepted. The picker swaps the window; the colours stay. */
  lcTrend: {
    type: "bar",
    height: 300,
    yfmt: "money",
    series: {
      "LC": { bg: "rgba(14, 165, 233, 0.26)", border: "rgba(14, 165, 233, 1)" },
      "Party acceptance": { bg: "rgba(114, 199, 255, 0.30)", border: "rgba(114, 199, 255, 1)" },
      "Bank acceptance": { bg: "rgba(255, 159, 64, 0.28)", border: "rgba(255, 159, 64, 1)" }
    }
  },

  /* one entry per option in the picker. `title` becomes the card heading,
     `labels` is the x axis and `series` is one entry per bar group. */
  periods: {
    "3m": {
      title: "Last 3 months",
      labels: ["Jul", "Aug", "Sep"],
      series: [
        { label: "LC", data: [3790000, 3460000, 1786500] },
        { label: "Party acceptance", data: [3240000, 2910000, 1530000] },
        { label: "Bank acceptance", data: [2760000, 2480000, 1190000] }
      ]
    },
    "6m": {
      title: "Last 6 months",
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      series: [
        { label: "LC", data: [3310000, 3680000, 4020000, 3790000, 3460000, 1786500] },
        { label: "Party acceptance", data: [2840000, 3150000, 3480000, 3240000, 2910000, 1530000] },
        { label: "Bank acceptance", data: [2380000, 2670000, 2940000, 2760000, 2480000, 1190000] }
      ]
    },
    ytd: {
      title: "This year",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      series: [
        { label: "LC", data: [2640000, 2910000, 3150000, 3310000, 3680000, 4020000, 3790000, 3460000, 1786500] },
        { label: "Party acceptance", data: [2270000, 2490000, 2710000, 2840000, 3150000, 3480000, 3240000, 2910000, 1530000] },
        { label: "Bank acceptance", data: [1910000, 2090000, 2280000, 2380000, 2670000, 2940000, 2760000, 2480000, 1190000] }
      ]
    },
    lasty: {
      title: "Last year",
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
      series: [
        { label: "LC", data: [2480000, 2660000, 2840000, 3010000, 3180000, 3340000, 3120000, 3270000, 3450000, 2980000, 3150000, 3390000] },
        { label: "Party acceptance", data: [2120000, 2270000, 2430000, 2570000, 2720000, 2860000, 2670000, 2800000, 2950000, 2550000, 2700000, 2900000] },
        { label: "Bank acceptance", data: [1780000, 1910000, 2050000, 2170000, 2300000, 2420000, 2260000, 2370000, 2500000, 2160000, 2290000, 2450000] }
      ]
    }
  },

  /* -------------------------------------------------------- funnel: exportLc --
     How PI value travels into an opened, accepted and held LC, in the serial
     the card shows. The connector after each step says what share of the
     LC Opened total has got that far, because the steps are not in value
     order - In Hand is held before the bank is asked. */
  exportLc: {
    steps: [
      { step: "LC Open", value: "4,160,000", note: "7 LCs reached this far", color: "#94a3b8" },
      { step: "Forward to Party", value: "3,540,000", note: "6 LCs reached this far", color: "#72c7ff" },
      { step: "In Hand", value: "1,313,000", note: "2 LCs reached this far", color: "#14b8a6" },
      { step: "Forward to Bank", value: "2,977,000", note: "5 LCs reached this far", color: "#818cf8" },
      { step: "Bank Acceptance", value: "2,512,000", note: "4 LCs reached this far", color: "#ff9f40" }
    ],
    carry: [
      { label: "share of LC Open", value: "85.1% Forward to Party" },
      { label: "share of LC Open", value: "31.6% In Hand" },
      { label: "share of LC Open", value: "71.6% Forward to Bank" },
      { label: "share of LC Open", value: "60.4% Bank Acceptance" }
    ]
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
