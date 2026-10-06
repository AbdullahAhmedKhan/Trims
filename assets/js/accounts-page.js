/* ==========================================================================
   ACCOUNTS DASHBOARD - PAGE
   --------------------------------------------------------------------------
   The whole page is written out in modules/accounts/index.html. This file
   only says which numbers fill it:

     assets/js/dash-accounts.js   the numbers    <- edit values here
     modules/accounts/index.html  the layout     <- edit the page here
     assets/js/page-binder.js     the join

   Everything the page needs from the data file:

     overview        the figure behind each of the five overview cards
     pl              the bar chart behind the period picker
     periods         the numbers behind the period picker
     balanceSheet    Balance Sheet Position
     ledger          Ledger Balances
     voucherMix      Voucher Mix
     recentVouchers  Recent Vouchers
     liquidity       Liquidity & Returns
   ========================================================================== */

window.AccountsPage = (function (w) {
  "use strict";

  function render() {
    /* "pl" is the chart the picker on the first card drives */
    w.SKPage.mount({ data: w.ACCOUNTS_DATA, period: "pl" });
  }

  return { render: render };
})(window);
