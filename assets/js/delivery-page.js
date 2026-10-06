/* ==========================================================================
   DELIVERY DASHBOARD - PAGE
   --------------------------------------------------------------------------
   The whole page is written out in modules/delivery/index.html. This file
   only says which numbers fill it:

     assets/js/dash-delivery.js   the numbers    <- edit values here
     modules/delivery/index.html   the layout     <- edit the page here
     assets/js/page-binder.js      the join

   Everything the page needs from the data file:

     overview                    the figure behind each overview card
     last7                       the bar chart behind the period picker
     status                      the doughnut of where the quantity stands
     challans                    the Recent Challans table
     receipt                     the challan receipt progress bars
     party, item, team           the three tabs of the job pool
     periods                     the numbers behind the period picker
   ========================================================================== */

window.DeliveryPage = (function (w) {
  "use strict";

  function render() {
    /* "last7" is the chart the picker on the first card drives */
    w.SKPage.mount({ data: w.DELIVERY_DATA, period: "last7" });
  }

  return { render: render };
})(window);