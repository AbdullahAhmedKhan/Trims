/* ==========================================================================
   STOCK DASHBOARD - PAGE
   --------------------------------------------------------------------------
   The whole page is written out in modules/stock/index.html. This file only
   says which numbers fill it:

     assets/js/dash-stock.js   the numbers    <- edit values here
     modules/stock/index.html  the layout     <- edit the page here
     assets/js/page-binder.js  the join

   Everything the page needs from the data file:

     overview        the figure behind each of the four overview cards
     movement        the bar chart behind the period picker
     group           the Value by Group doughnut
     monitoring, forecasting
                     the two tabs of Stock Monitoring & Forecasting
     po, req         Recent Purchase Orders and Requisitions
     periods         the numbers behind the period picker
   ========================================================================== */

window.StockPage = (function (w) {
  "use strict";

  function render() {
    /* "movement" is the chart the picker on the second card drives */
    w.SKPage.mount({ data: w.STOCK_DATA, period: "movement" });
  }

  return { render: render };
})(window);