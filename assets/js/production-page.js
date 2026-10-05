/* ==========================================================================
   PRODUCTION DASHBOARD - PAGE
   --------------------------------------------------------------------------
   The whole page is written out in modules/production/index.html. This file
   only says which numbers fill it:

     assets/js/dash-production.js   the numbers    <- edit values here
     modules/production/index.html  the layout     <- edit the page here
     assets/js/page-binder.js       the join

   Everything the page needs from the data file:

     overview      the label and figure behind each of the five stage cards
     output        the bar chart behind the period picker
     status        the doughnut of where the jobs are sitting
     performance   the day wise Production Performance table
     party, item, team   the three tabs of the job pool
     periods       the numbers behind the period picker
   ========================================================================== */

window.ProductionPage = (function (w) {
  "use strict";

  function render() {
    /* "output" is the chart the picker on the second card drives */
    w.SKPage.mount({ data: w.PRODUCTION_DATA, period: "output" });
  }

  return { render: render };
})(window);