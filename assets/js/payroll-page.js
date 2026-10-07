/* ==========================================================================
   PAYROLL DASHBOARD - PAGE
   --------------------------------------------------------------------------
   The whole page is written out in modules/payroll/index.html. This file
   only says which numbers fill it:

     assets/js/dash-payroll.js    the numbers     <- edit values here
     modules/payroll/index.html   the layout      <- edit the page here
     assets/js/page-binder.js     the join

   Everything the page needs from the data file:

      overview        the figure behind each of the five overview cards
      register        the day wise Attendance Register
      attDept         Attendance by Department (own date filter)
      leaveToday      On Leave Today
      leaveApps       Recent Leave Applications
      breakDept, breakDesig, breakSection
                      the three tabs of the payroll breakdown
      payrollCost     the bar chart behind the period picker
      salaryComp      the Salary Composition doughnut (own date filter)
      periods         the numbers behind the period picker
   ========================================================================== */

window.PayrollPage = (function (w) {
  "use strict";

  function render() {
    /* "payrollCost" is the chart the picker on the seventh card drives */
    w.SKPage.mount({ data: w.PAYROLL_DATA, period: "payrollCost" });
  }

  return { render: render };
})(window);
