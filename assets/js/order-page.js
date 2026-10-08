/* ==========================================================================
   ORDER DASHBOARD - PAGE
   --------------------------------------------------------------------------
   The whole page is written out in modules/order/index.html. This file only
   says which numbers fill it:

     assets/js/dash-order.js   the numbers    <- edit values here
     modules/order/index.html   the layout    <- edit the page here
     assets/js/page-binder.js   the join

   Everything the page needs from the data file:

     overview                       unused on this page
      last7, months, team, item      the charts
      topParty, party, product, recent tables
      metrics                        the financial metrics grid
      periods                        the numbers behind the period picker

    Four date filters run off that same mechanism, each naming the keys it
    drives: last7 (its own chart), the bare picker (months), team and item
    (one chart each) and "party,product" - one choice swapping both tables
    of the Party & Product Breakdown card. topParty keeps its own periods
    under its own key.
   ========================================================================== */

window.OrderPage = (function (w) {
  "use strict";

  function render() {
    /* "months" is the chart the bare <select data-period> drives; the first
       card names its own chart with <select data-period="last7"> */
    w.SKPage.mount({ data: w.ORDER_DATA, period: "months" });
  }

  return { render: render };
})(window);