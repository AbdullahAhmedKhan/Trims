/* ==========================================================================
   PAYROLL DASHBOARD - the numbers
   --------------------------------------------------------------------------
   Ported from "dashboard - Payroll.php". Every figure is the value the PHP
   view shipped with, ready to be swapped for a live fetch later on.

   The layout is written out in modules/payroll/index.html, so this file only
   carries values - no markup, no formatting. The page says where each one
   goes:

      assets/js/dash-payroll.js    the numbers     <- edit values here
      modules/payroll/index.html   the layout      <- edit the page here
      assets/js/payroll-page.js    says what goes where
      assets/js/page-binder.js     the join

   Shape of each part
   ------------------
   overview.cells   one entry per overview card: the label the page shows and
                    the figure the binder drops into it
   register         the day wise Attendance Register
   attDept          Attendance by Department
   leaveToday       On Leave Today
   leaveApps        Recent Leave Applications
   breakDept, breakDesig, breakSection
                    the three tabs of the breakdown card
   payrollCost      the bar chart behind the period picker; `series` gives
                    every bar its colour, the numbers come from `periods`
   periods          one entry per option in the period picker
   salaryComp       the Salary Composition doughnut

   When the real application is wired up, replace the literals below with a
   fetch. Nothing else in the page has to change.
   ========================================================================== */

window.PAYROLL_DATA = {

  /* ------------------------------------------------------------ overview --
     Today's attendance headcount, the overtime that came with it, and the
     cost of it. The money figures are this month's. */
  overview: {
    cells: [
      { label: "Total Employee", value: "248" },
      { label: "Present", value: "5,842" },
      { label: "Absent", value: "96" },
      { label: "Leave", value: "214" },
      { label: "Late Attendance", value: "188" },
      { label: "Overtime Hours", value: "1,426" },
      { label: "Overtime Cost", value: "৳ 8,73,992" }
    ]
  },

  /* -------------------------------------------------------- table: register --
     Day wise attendance, with how much overtime the day produced and what
     share of the working staff actually turned up. */
  register: {
    rows: [
      ["28 Sep 2026", "Monday", 248, 236, 9, 17, 3, 3, 142, 95.2],
      ["27 Sep 2026", "Sunday", 248, 238, 7, 13, 1, 3, 118, 96.0],
      ["26 Sep 2026", "Saturday", 248, 234, 11, 22, 3, 3, 196, 94.4],
      ["25 Sep 2026", "Friday", 248, 237, 8, 16, 2, 3, 154, 95.6],
      ["24 Sep 2026", "Thursday", 248, 236, 9, 17, 2, 3, 142, 95.2],
      ["23 Sep 2026", "Wednesday", 248, 238, 7, 13, 1, 3, 128, 96.0],
      ["22 Sep 2026", "Tuesday", 248, 237, 8, 16, 2, 3, 136, 95.6],
      ["21 Sep 2026", "Monday", 248, 232, 13, 20, 3, 3, 171, 93.5]
    ],
    total: ["Total", "8 days", 1984, 1888, 72, 134, 17, 24, 1187, 95.2]
  },

  /* ----------------------------------------------------- table: attDept --
     Who is actually turning up, department by department. Rate is that
     department's present share; the total line is staff weighted, so the
     big departments count for what they are worth. */
  attDept: {
    rows: [
      ["Production", 96, 38, 72, 96.2],
      ["Quality", 34, 11, 26, 97.1],
      ["Maintenance", 28, 12, 24, 95.7],
      ["Accounts", 22, 6, 15, 97.7],
      ["HR & Admin", 26, 8, 18, 97.3],
      ["Stores", 24, 13, 21, 94.6],
      ["Security", 18, 8, 12, 94.4]
    ],
    total: ["Total", 248, 96, 188, 96.2]
  },

  /* ----------------------------------------------------- table: leaveToday --
     Approved leave running today. The detail column is a stack: the
     employee number over the department, then the leave type. */
  leaveToday: {
    rows: [
      ["Salma Khatun", { lines: ["EMP-0452 · HR & Admin", "Type · Maternity Leave"] },
        { t: "Back on 15 Oct 2026" }],
      ["Jamal Hossain", { lines: ["EMP-0198 · Maintenance", "Type · Earned Leave"] },
        { t: "Ends 30 Sep 2026" }],
      ["Rahim Uddin", { lines: ["EMP-0142 · Production - Cutting", "Type · Casual Leave"] },
        { t: "Ends 28 Sep 2026" }],
      ["Nasir Ahmed", { lines: ["EMP-0311 · Quality", "Type · Sick Leave"] },
        { t: "Back on 30 Sep 2026" }],
      ["Rafiq Alam", { lines: ["EMP-0225 · Accounts", "Type · Casual Leave"] },
        { t: "Back on 29 Sep 2026" }]
    ]
  },

  /* ------------------------------------------------------ table: leaveApps --
     The latest requests and where each one has got to. */
  leaveApps: {
    rows: [
      ["Salma Khatun", "EMP-0452", "Maternity Leave", "20 Sep 2026", "15 Oct 2026", 26, "18 Sep 2026", { b: "Approved" }],
      ["Rahim Uddin", "EMP-0142", "Casual Leave", "26 Sep 2026", "28 Sep 2026", 3, "22 Sep 2026", { b: "Approved" }],
      ["Nasir Ahmed", "EMP-0311", "Sick Leave", "27 Sep 2026", "30 Sep 2026", 4, "25 Sep 2026", { b: "Approved" }],
      ["Rafiq Alam", "EMP-0225", "Casual Leave", "28 Sep 2026", "29 Sep 2026", 2, "27 Sep 2026", { b: "Pending" }],
      ["Karim Sheikh", "EMP-0087", "Earned Leave", "05 Oct 2026", "09 Oct 2026", 5, "26 Sep 2026", { b: "Rejected" }],
      ["Abdul Karim", "EMP-0301", "Unpaid Leave", "01 Oct 2026", "10 Oct 2026", 10, "27 Sep 2026", { b: "Pending" }]
    ]
  },

  /* ------------------------------------------------------------- tabs: pay --
     The same month's payroll read three ways - by department, by
     designation and by section - one key per tab, in the order the tabs
     are written in modules/payroll/index.html. */
  breakDept: {
    rows: [
      ["Production", 96, 5240000, 4470000],
      ["Quality", 34, 1610000, 1375000],
      ["Maintenance", 28, 1285000, 1100000],
      ["Accounts", 22, 1395000, 1195000],
      ["HR & Admin", 26, 1340000, 1150000],
      ["Stores", 24, 855600, 730000],
      ["Security", 18, 760000, 622700]
    ],
    total: ["Total", 248, 12485600, 10642700]
  },

  breakDesig: {
    rows: [
      ["Operator", 132, 5510000, 4695000],
      ["Technician", 48, 2560000, 2190000],
      ["Supervisor", 40, 2780000, 2380000],
      ["Officer", 28, 1635600, 1377700]
    ],
    total: ["Total", 248, 12485600, 10642700]
  },

  breakSection: {
    rows: [
      ["Cutting", 42, 1910000, 1630000],
      ["Sewing", 38, 1720000, 1468000],
      ["Finishing", 22, 1010000, 862000],
      ["Dyeing", 14, 600000, 510000]
    ],
    total: ["Total", 116, 5240000, 4470000]
  },

  /* -------------------------------------------------- chart: payrollCost --
     What the month cost, split into what was earned, what was taken back
     and what actually went out. The picker swaps the window; the colours
     stay. Net is always Gross less Deductions. */
  payrollCost: {
    type: "bar",
    height: 300,
    yfmt: "taka",
    series: {
      "Gross Earnings": { bg: "rgba(114, 199, 255, 0.30)", border: "rgba(114, 199, 255, 1)" },
      "Deductions": { bg: "rgba(247, 107, 138, 0.30)", border: "rgba(247, 107, 138, 1)" },
      "Net Paid": { bg: "rgba(20, 184, 166, 0.30)", border: "rgba(20, 184, 166, 1)" }
    }
  },

  /* one entry per option in the picker. `title` becomes the card heading,
     `labels` is the x axis and `series` is one entry per bar group. */
  periods: {
    "3m": {
      title: "Last 3 months",
      labels: ["Jul", "Aug", "Sep"],
      series: [
        { label: "Gross Earnings", data: [12310000, 12574000, 12485600] },
        { label: "Deductions", data: [1811500, 1862300, 1842900] },
        { label: "Net Paid", data: [10498500, 10711700, 10642700] }
      ]
    },
    "6m": {
      title: "Last 6 months",
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      series: [
        { label: "Gross Earnings", data: [11840000, 12025000, 11978000, 12310000, 12574000, 12485600] },
        { label: "Deductions", data: [1720400, 1758300, 1746200, 1811500, 1862300, 1842900] },
        { label: "Net Paid", data: [10119600, 10266700, 10231800, 10498500, 10711700, 10642700] }
      ]
    },
    ytd: {
      title: "This year",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      series: [
        { label: "Gross Earnings", data: [11620000, 11745000, 11910000, 11840000, 12025000, 11978000, 12310000, 12574000, 12485600] },
        { label: "Deductions", data: [1690000, 1706000, 1731000, 1720400, 1758300, 1746200, 1811500, 1862300, 1842900] },
        { label: "Net Paid", data: [9930000, 10039000, 10179000, 10119600, 10266700, 10231800, 10498500, 10711700, 10642700] }
      ]
    },
    lasty: {
      title: "Last year",
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
      series: [
        { label: "Gross Earnings", data: [10980000, 11120000, 11260000, 11340000, 11480000, 11590000, 11670000, 11840000, 12050000, 11620000, 11745000, 11910000] },
        { label: "Deductions", data: [1602000, 1624000, 1646000, 1658000, 1676000, 1692000, 1704000, 1726000, 1754000, 1690000, 1706000, 1731000] },
        { label: "Net Paid", data: [9378000, 9496000, 9614000, 9682000, 9804000, 9898000, 9966000, 10114000, 10296000, 9930000, 10039000, 10179000] }
      ]
    }
  },

  /* -------------------------------------------------- chart: salaryComp --
     Where the gross payroll actually goes. The five parts add up to the
     1,24,85,600 of the month. */
  salaryComp: {
    type: "doughnut",
    height: 230,
    center: "Gross",
    centerValue: "৳ 1.25 Cr",
    labels: ["Basic Salary", "Overtime", "Allowances", "Bonus", "Commission"],
    datasets: [{
      data: [8740000, 873992, 1498272, 874000, 499336],
      bg: [
        "rgba(20, 184, 166, 0.55)",
        "rgba(245, 158, 11, 0.55)",
        "rgba(14, 165, 233, 0.55)",
        "rgba(167, 139, 250, 0.55)",
        "rgba(99, 102, 241, 0.55)"
      ]
    }],
    legend: [
      { label: "Basic Salary", value: "৳ 87,40,000", color: "#14b8a6" },
      { label: "Overtime", value: "৳ 8,73,992", color: "#f59e0b" },
      { label: "Allowances", value: "৳ 14,98,272", color: "#0ea5e9" },
      { label: "Bonus", value: "৳ 8,74,000", color: "#a78bfa" },
      { label: "Commission", value: "৳ 4,99,336", color: "#6366f1" }
    ]
  }
};
