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
   attDept          Attendance by Department, with its own `periods`
   leaveToday       On Leave Today
   leaveApps        Recent Leave Applications
   breakDept, breakDesig, breakSection
                    the three tabs of the breakdown card
   payrollCost      the bar chart behind the period picker; `series` gives
                    every bar its colour, the numbers come from `periods`
   periods          one entry per option in the bar chart picker
   salaryComp       the Salary Composition doughnut, with its own
                    `salaryComp.periods` behind a second date filter

   When the real application is wired up, replace the literals below with a
   fetch. Nothing else in the page has to change.
   ========================================================================== */

window.PAYROLL_DATA = {

  /* ------------------------------------------------------------ overview --
     Today's attendance headcount. The figures are this month's. */
  overview: {
    cells: [
      { label: "Total Employee", value: "248" },
      { label: "Present", value: "5,842" },
      { label: "Absent", value: "96" },
      { label: "Leave", value: "214" },
      { label: "Late Attendance", value: "188" }
    ]
  },

  /* -------------------------------------------------------- table: register --
     Day wise attendance, with what the overtime of the day was worth and
     what share of the working staff actually turned up. */
  register: {
    rows: [
      ["28 Sep 2026", "Monday", 248, 236, 9, 17, 3, 79500, 95.2],
      ["27 Sep 2026", "Sunday", 248, 238, 7, 13, 1, 66100, 96.0],
      ["26 Sep 2026", "Saturday", 248, 234, 11, 22, 3, 109800, 94.4],
      ["25 Sep 2026", "Friday", 248, 237, 8, 16, 2, 86200, 95.6],
      ["24 Sep 2026", "Thursday", 248, 236, 9, 17, 2, 79500, 95.2],
      ["23 Sep 2026", "Wednesday", 248, 238, 7, 13, 1, 71700, 96.0],
      ["22 Sep 2026", "Tuesday", 248, 237, 8, 16, 2, 76200, 95.6],
      ["21 Sep 2026", "Monday", 248, 232, 13, 20, 3, 95800, 93.5]
    ],
    total: ["Total", "8 days", 1984, 1888, 72, 134, 24, 664800, 95.2]
  },

  /* ----------------------------------------------------- table: attDept --
     Who is actually turning up, department by department. Rate is that
     department's present share; the total line is staff weighted, so the
     big departments count for what they are worth.

     The card carries a date filter: `periods` gives each choice its own
     subtitle and its own rows, so the picker swaps the table as well. */
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
    total: ["Total", 248, 96, 188, 96.2],
    periods: {
      "7d": {
        title: "Last 7 days · who is turning up, and how often",
        rows: [
          ["Production", 96, 31, 66, 96.5],
          ["Quality", 34, 9, 22, 97.4],
          ["Maintenance", 28, 10, 20, 96.0],
          ["Accounts", 22, 5, 12, 98.0],
          ["HR & Admin", 26, 7, 15, 97.6],
          ["Stores", 24, 10, 18, 95.0],
          ["Security", 18, 6, 10, 94.8]
        ],
        total: ["Total", 248, 78, 163, 96.4]
      },
      "30d": {
        title: "August 2026 · who is turning up, and how often",
        rows: [
          ["Production", 96, 41, 74, 95.8],
          ["Quality", 34, 12, 27, 96.8],
          ["Maintenance", 28, 13, 25, 95.4],
          ["Accounts", 22, 7, 16, 97.5],
          ["HR & Admin", 26, 9, 19, 97.0],
          ["Stores", 24, 14, 22, 94.2],
          ["Security", 18, 9, 13, 94.0]
        ],
        total: ["Total", 248, 105, 196, 95.9]
      },
      thism: {
        title: "September 2026 · who is turning up, and how often",
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
      "3m": {
        title: "Jul - Sep 2026 · who is turning up, and how often",
        rows: [
          ["Production", 96, 118, 220, 96.0],
          ["Quality", 34, 34, 78, 97.0],
          ["Maintenance", 28, 36, 72, 95.6],
          ["Accounts", 22, 18, 46, 97.6],
          ["HR & Admin", 26, 25, 55, 97.2],
          ["Stores", 24, 39, 64, 94.5],
          ["Security", 18, 26, 37, 94.3]
        ],
        total: ["Total", 248, 296, 572, 96.1]
      },
      "6m": {
        title: "Apr - Sep 2026 · who is turning up, and how often",
        rows: [
          ["Production", 96, 240, 448, 95.9],
          ["Quality", 34, 70, 160, 96.9],
          ["Maintenance", 28, 74, 150, 95.5],
          ["Accounts", 22, 38, 96, 97.5],
          ["HR & Admin", 26, 52, 114, 97.1],
          ["Stores", 24, 80, 132, 94.4],
          ["Security", 18, 54, 78, 94.2]
        ],
        total: ["Total", 248, 608, 1178, 96.0]
      },
      lasty: {
        title: "Apr 2025 - Mar 2026 · who is turning up, and how often",
        rows: [
          ["Production", 96, 470, 900, 95.8],
          ["Quality", 34, 140, 320, 96.8],
          ["Maintenance", 28, 148, 300, 95.4],
          ["Accounts", 22, 76, 192, 97.4],
          ["HR & Admin", 26, 104, 228, 97.0],
          ["Stores", 24, 158, 264, 94.3],
          ["Security", 18, 108, 156, 94.1]
        ],
        total: ["Total", 248, 1204, 2360, 95.9]
      },
      ytd: {
        title: "Jan - Sep 2026 · who is turning up, and how often",
        rows: [
          ["Production", 96, 352, 668, 95.9],
          ["Quality", 34, 104, 236, 96.9],
          ["Maintenance", 28, 110, 222, 95.5],
          ["Accounts", 22, 56, 142, 97.5],
          ["HR & Admin", 26, 78, 168, 97.1],
          ["Stores", 24, 118, 196, 94.4],
          ["Security", 18, 80, 116, 94.2]
        ],
        total: ["Total", 248, 898, 1748, 96.0]
      }
    }
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
     What each window cost, split into gross salary, what was taken back
     and what actually went out. The picker swaps the window; the colours
     stay. Net is always Gross less Deductions. */
  payrollCost: {
    type: "bar",
    height: 300,
    yfmt: "taka",
    series: {
      "Gross Salary": { bg: "rgba(114, 199, 255, 0.30)", border: "rgba(114, 199, 255, 1)" },
      "Deductions": { bg: "rgba(247, 107, 138, 0.30)", border: "rgba(247, 107, 138, 1)" },
      "Net Paid": { bg: "rgba(20, 184, 166, 0.30)", border: "rgba(20, 184, 166, 1)" }
    }
  },

  /* one entry per option in the picker. `title` becomes the card heading,
     `labels` is the x axis and `series` is one entry per bar group. */
  periods: {
    "7d": {
      title: "Last 7 days",
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [
        { label: "Gross Salary", data: [512000, 486000, 534000, 468000, 505000, 196000, 204000] },
        { label: "Deductions", data: [76000, 72000, 79000, 69000, 75000, 29000, 30000] },
        { label: "Net Paid", data: [436000, 414000, 455000, 399000, 430000, 167000, 174000] }
      ]
    },
    "30d": {
      title: "Last Month",
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
      series: [
        { label: "Gross Salary", data: [3012000, 3154000, 2986000, 2502000, 920000] },
        { label: "Deductions", data: [445000, 466000, 442000, 371000, 138300] },
        { label: "Net Paid", data: [2567000, 2688000, 2544000, 2131000, 781700] }
      ]
    },
    thism: {
      title: "This Month",
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      series: [
        { label: "Gross Salary", data: [3012000, 3154000, 2986000, 3333600] },
        { label: "Deductions", data: [445000, 466000, 442000, 489900] },
        { label: "Net Paid", data: [2567000, 2688000, 2544000, 2843700] }
      ]
    },
    "3m": {
      title: "Last 3 months",
      labels: ["Jul", "Aug", "Sep"],
      series: [
        { label: "Gross Salary", data: [12310000, 12574000, 12485600] },
        { label: "Deductions", data: [1811500, 1862300, 1842900] },
        { label: "Net Paid", data: [10498500, 10711700, 10642700] }
      ]
    },
    "6m": {
      title: "Last 6 months",
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      series: [
        { label: "Gross Salary", data: [11840000, 12025000, 11978000, 12310000, 12574000, 12485600] },
        { label: "Deductions", data: [1720400, 1758300, 1746200, 1811500, 1862300, 1842900] },
        { label: "Net Paid", data: [10119600, 10266700, 10231800, 10498500, 10711700, 10642700] }
      ]
    },
    lasty: {
      title: "Last year",
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
      series: [
        { label: "Gross Salary", data: [10980000, 11120000, 11260000, 11340000, 11480000, 11590000, 11670000, 11840000, 12050000, 11620000, 11745000, 11910000] },
        { label: "Deductions", data: [1602000, 1624000, 1646000, 1658000, 1676000, 1692000, 1704000, 1726000, 1754000, 1690000, 1706000, 1731000] },
        { label: "Net Paid", data: [9378000, 9496000, 9614000, 9682000, 9804000, 9898000, 9966000, 10114000, 10296000, 9930000, 10039000, 10179000] }
      ]
    },
    ytd: {
      title: "This year",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      series: [
        { label: "Gross Salary", data: [11620000, 11745000, 11910000, 11840000, 12025000, 11978000, 12310000, 12574000, 12485600] },
        { label: "Deductions", data: [1690000, 1706000, 1731000, 1720400, 1758300, 1746200, 1811500, 1862300, 1842900] },
        { label: "Net Paid", data: [9930000, 10039000, 10179000, 10119600, 10266700, 10231800, 10498500, 10711700, 10642700] }
      ]
    }
  },

  /* -------------------------------------------------- chart: salaryComp --
     Where the gross payroll goes: net salary, overtime and allowance.
     The three parts add up to the gross of the window. The card carries a
     date filter of its own reading `periods` below, so it can sit beside
     the bar chart without clashing. */
  salaryComp: {
    type: "doughnut",
    height: 230,
    center: "Gross",
    centerValue: "৳ 3.74 Cr",
    labels: ["Net Salary", "Overtime", "Allowance"],
    datasets: [{
      data: [31852900, 2615000, 2901700],
      bg: [
        "rgba(20, 184, 166, 0.55)",
        "rgba(245, 158, 11, 0.55)",
        "rgba(14, 165, 233, 0.55)"
      ]
    }],
    legend: [
      { label: "Net Salary", value: "৳ 3,18,52,900", color: "#14b8a6" },
      { label: "Overtime", value: "৳ 26,15,000", color: "#f59e0b" },
      { label: "Allowance", value: "৳ 29,01,700", color: "#0ea5e9" }
    ],
    periods: {
      "7d": {
        title: "Last 7 days",
        centerValue: "৳ 29.05 L",
        values: [2475000, 205000, 225000],
        amounts: ["৳ 24,75,000", "৳ 2,05,000", "৳ 2,25,000"]
      },
      "30d": {
        title: "Last Month",
        centerValue: "৳ 1.26 Cr",
        values: [10711700, 880000, 982300],
        amounts: ["৳ 1,07,11,700", "৳ 8,80,000", "৳ 9,82,300"]
      },
      thism: {
        title: "This Month",
        centerValue: "৳ 1.25 Cr",
        values: [10642700, 873992, 968908],
        amounts: ["৳ 1,06,42,700", "৳ 8,73,992", "৳ 9,68,908"]
      },
      "3m": {
        title: "Last 3 months",
        centerValue: "৳ 3.74 Cr",
        values: [31852900, 2615000, 2901700],
        amounts: ["৳ 3,18,52,900", "৳ 26,15,000", "৳ 29,01,700"]
      },
      "6m": {
        title: "Last 6 months",
        centerValue: "৳ 7.32 Cr",
        values: [62471000, 5125000, 5616600],
        amounts: ["৳ 6,24,71,000", "৳ 51,25,000", "৳ 56,16,600"]
      },
      lasty: {
        title: "Last year",
        centerValue: "৳ 13.86 Cr",
        values: [118396000, 9700000, 10509000],
        amounts: ["৳ 11,83,96,000", "৳ 97,00,000", "৳ 1,05,09,000"]
      },
      ytd: {
        title: "This year",
        centerValue: "৳ 10.85 Cr",
        values: [92619000, 7595000, 8273600],
        amounts: ["৳ 9,26,19,000", "৳ 75,95,000", "৳ 82,73,600"]
      }
    }
  }
};
