/* ==========================================================================
   BILLING DASHBOARD - PAGE
   --------------------------------------------------------------------------
   The whole page is written out in modules/billing/index.html. This file
   only says which numbers fill it:

     assets/js/dash-billing.js   the numbers    <- edit values here
     modules/billing/index.html   the layout     <- edit the page here
     assets/js/page-binder.js     the join

   Everything the page needs from the data file:

     overview       the figure behind each of the four overview cards
     billing        the bar chart behind the period picker
     lc             the LC & Collection Timeline table
     periods        the numbers behind the period picker
   ========================================================================== */

window.BillingPage = (function (w) {
  "use strict";

  function render() {
    /* "billing" is the chart the picker on the second card drives */
    w.SKPage.mount({ data: w.BILLING_DATA, period: "billing" });
  }

  return { render: render };
})(window);