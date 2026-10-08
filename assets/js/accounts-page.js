/* ==========================================================================
   ACCOUNTS DASHBOARD - PAGE
   --------------------------------------------------------------------------
   The whole page is written out in modules/accounts/index.html. This file
   only says which numbers fill it:

     assets/js/dash-accounts.js   the numbers    <- edit values here
     modules/accounts/index.html  the layout     <- edit the page here
     assets/js/page-binder.js     the join

   Everything the page needs from the data file:

      overview        the figure behind each of the four overview cards
      pl              the Profit and Loss Overview chart (revenue, cost,
                      profit) behind the period picker
      periods         the numbers behind the period picker
      balanceSheet    Balance Sheet Position
      ledger          Ledger Balances
      voucherMix      Voucher Mix
      receivable      Receivable tab of the merged Receivable & Payable box
      payable         Payable tab of that same box
      expenseBreakdown  Expense Breakdown doughnut, total in the middle
      recentVouchers  Recent Transaction
      topCustomers    Top Customers
   ========================================================================== */

window.AccountsPage = (function (w) {
  "use strict";

  function render() {
    /* "pl" is the chart the picker on the first card drives */
    w.SKPage.mount({ data: w.ACCOUNTS_DATA, period: "pl" });
  }

  return { render: render };
})(window);
