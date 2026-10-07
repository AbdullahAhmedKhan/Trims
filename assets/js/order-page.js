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
   ========================================================================== */

window.OrderPage = (function (w) {
  "use strict";

  function render() {
    /* "months" is the chart the picker on the second card drives */
    w.SKPage.mount({ data: w.ORDER_DATA, period: "months" });
  }

  return { render: render };
})(window);