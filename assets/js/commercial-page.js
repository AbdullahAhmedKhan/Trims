/* ==========================================================================
   COMMERCIAL DASHBOARD - PAGE
   --------------------------------------------------------------------------
   The whole page is written out in modules/commercial/index.html. This file
   only says which numbers fill it:

     assets/js/dash-commercial.js   the numbers    <- edit values here
     modules/commercial/index.html  the layout     <- edit the page here
     assets/js/page-binder.js       the join

   Everything the page needs from the data file:

      overview        the figure behind each of the three overview cards
      lcTrend         the bar chart behind the period picker (New LC value)
      status          the Commercial Status doughnut, with its own date filter
       pi              Recent PI
       lcParty         LC & Maturity Timeline, the "To party" tab
       lcBank          LC & Maturity Timeline, the "To Bank" tab
       periods         the numbers behind the period picker
    The two tabs need no wiring here: dashboard.js switches the panels.
   ========================================================================== */

window.CommercialPage = (function (w) {
  "use strict";

  function render() {
    /* "lcTrend" is the chart the picker on the second card drives */
    w.SKPage.mount({ data: w.COMMERCIAL_DATA, period: "lcTrend" });
  }

  return { render: render };
})(window);
