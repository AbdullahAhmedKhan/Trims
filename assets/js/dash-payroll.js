/* ==========================================================================
   PAYROLL DASHBOARD - static data
   --------------------------------------------------------------------------
   Ported from "dashboard - Payroll.php". Every number is the value the PHP
   view shipped with, ready to be swapped for a live fetch later on.
   ========================================================================== */

window.SKDash.register('payroll', {
  title: 'Payroll Dashboard',
  note: 'Payroll cost and composition, the September run status, attendance, leave and the monthly money windows.',

  blocks: [

    /* ------------------------------------------------------- ROW 1 : KPI CARDS */
    { row: [

      { k: 'stats', c: 12,
        cards: [
          { label: 'Total Employees', value: '248', sub: '238 active · 10 on leave', c: '#334155' },
          { label: 'Gross Payroll', value: '৳ 1,24,85,600', sub: 'This month · +4.2% vs last month', c: '#334155' },
          { label: 'Net Payroll', value: '৳ 1,06,42,700', sub: '85.2% of gross payable', c: '#334155' },
          { label: 'Deductions', value: '৳ 18,42,900', sub: 'PF · ESI · Tax · Loan · Advance', c: '#334155' },
          { label: 'Employer Contribution', value: '৳ 9,96,480', sub: 'Company PF & ESI burden', c: '#334155' }
        ]
      }
    ] },

    /* ------------------------------------------ ROW 2 : PAYROLL COST + COMPOSITION */
    { row: [

      { k: 'chart', id: 'pr-trend', c: 8,
        title: 'Last 6 Months Payroll Cost',
        sub: 'Gross earnings, deductions and net paid trend',
        chart: {
          type: 'bar',
          height: 260,
          yfmt: 'taka',
          labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          datasets: [
            { label: 'Gross Earnings', data: [11840000, 12025000, 11978000, 12310000, 12574000, 12485600],
              bg: 'rgba(114, 199, 255, 0.3)', border: 'rgba(114, 199, 255, 1)', w: 1 },
            { label: 'Deductions', data: [1720400, 1758300, 1746200, 1811500, 1862300, 1842900],
              bg: 'rgba(247, 107, 138, 0.3)', border: 'rgba(247, 107, 138, 1)', w: 1 },
            { label: 'Net Paid', data: [10119600, 10266700, 10231800, 10498500, 10711700, 10642700],
              bg: 'rgba(20, 184, 166, 0.3)', border: 'rgba(20, 184, 166, 1)', w: 1 }
          ]
        },
        legendList: [
          { label: 'Gross', color: 'rgba(114, 199, 255, 1)' },
          { label: 'Deductions', color: 'rgba(247, 107, 138, 1)' },
          { label: 'Net Paid', color: 'rgba(20, 184, 166, 1)' }
        ]
      },

      { k: 'chart', id: 'pr-comp', c: 4,
        title: 'Salary Composition',
        chart: {
          type: 'doughnut',
          height: 230,
          labels: ['Basic Salary', 'Overtime', 'Allowances', 'Bonus', 'Commission'],
          datasets: [{
            data: [8740000, 873992, 1498272, 874000, 499336],
            bg: ['rgba(20, 184, 166, 0.3)', 'rgba(255, 159, 64, 0.3)', 'rgba(114, 199, 255, 0.3)',
              'rgba(247, 107, 138, 0.3)', 'rgba(167, 139, 250, 0.3)']
          }]
        },
        legendList: [
          { label: 'Basic Salary', value: '৳ 87,40,000', color: 'rgba(20, 184, 166, 0.3)' },
          { label: 'Overtime', value: '৳ 8,73,992', color: 'rgba(255, 159, 64, 0.3)' },
          { label: 'Allowances', value: '৳ 14,98,272', color: 'rgba(114, 199, 255, 0.3)' },
          { label: 'Bonus', value: '৳ 8,74,000', color: 'rgba(247, 107, 138, 0.3)' },
          { label: 'Commission', value: '৳ 4,99,336', color: 'rgba(167, 139, 250, 0.3)' }
        ]
      }
    ] },

    /* -------------------------------- ROW 3 : PAYROLL BREAKDOWN + DEPARTMENT COST */
    { row: [

      { k: 'tabs', id: 'pr-break', c: 4,
        tabs: [
          { label: 'Department',
            cols: [{ t: 'Name', a: 'l' }, { t: 'Staff', a: 'r', f: 'qty' },
              { t: 'Gross', a: 'r', f: 'taka' }, { t: 'Net', a: 'r', f: 'taka' }],
            rows: [
              ['Production', 96, 5240000, 4470000],
              ['Quality', 34, 1610000, 1375000],
              ['Maintenance', 28, 1285000, 1100000],
              ['Accounts', 22, 1395000, 1195000],
              ['HR & Admin', 26, 1340000, 1150000],
              ['Stores', 24, 855600, 730000],
              ['Security', 18, 760000, 622700]
            ],
            total: ['Total :', 248, 12485600, 10642700],
            foot: { label: 'Date: 01 Sep 2026 - 30 Sep 2026',
              link: { label: 'View More', href: 'modules/payroll/index.html?id=salary' } } },
          { label: 'Designation',
            cols: [{ t: 'Designation', a: 'l' }, { t: 'Staff', a: 'r', f: 'qty' },
              { t: 'Gross', a: 'r', f: 'taka' }, { t: 'Net', a: 'r', f: 'taka' }],
            rows: [
              ['Operator', 132, 5510000, 4695000],
              ['Technician', 48, 2560000, 2190000],
              ['Supervisor', 40, 2780000, 2380000],
              ['Officer', 28, 1635600, 1377700]
            ],
            total: ['Total :', 248, 12485600, 10642700],
            foot: { label: 'Date: 01 Sep 2026 - 30 Sep 2026',
              link: { label: 'View More', href: 'modules/payroll/index.html?id=salary' } } },
          { label: 'Section',
            cols: [{ t: 'Section', a: 'l' }, { t: 'Staff', a: 'r', f: 'qty' },
              { t: 'Gross', a: 'r', f: 'taka' }, { t: 'Net', a: 'r', f: 'taka' }],
            rows: [
              ['Cutting', 42, 1910000, 1630000],
              ['Sewing', 38, 1720000, 1468000],
              ['Finishing', 22, 1010000, 862000],
              ['Dyeing', 14, 600000, 510000]
            ],
            total: ['Total :', 116, 5240000, 4470000],
            foot: { label: 'Date: 01 Sep 2026 - 30 Sep 2026',
              link: { label: 'View More', href: 'modules/payroll/index.html?id=salary' } } }
        ]
      },

      { k: 'chart', id: 'pr-dept', c: 8,
        title: 'Department Wise Salary Cost',
        link: { label: 'View All', href: 'modules/payroll/index.html?id=salary' },
        chart: {
          type: 'bar',
          height: 300,
          horizontal: true,
          yfmt: 'taka',
          labels: ['Production', 'Quality', 'Maintenance', 'Accounts', 'HR & Admin', 'Stores', 'Security'],
          datasets: [
            { label: 'Gross', data: [5240000, 1610000, 1285000, 1395000, 1340000, 855600, 760000],
              bg: 'rgba(114, 199, 255, 0.3)', border: 'rgba(114, 199, 255, 1)', w: 1 },
            { label: 'Net', data: [4470000, 1375000, 1100000, 1195000, 1150000, 730000, 622700],
              bg: 'rgba(20, 184, 166, 0.3)', border: 'rgba(20, 184, 166, 1)', w: 1 }
          ]
        }
      }
    ] },

    /* ------------------------------------------ ROW 4 : PAYSLIPS + RUN STATUS */
    { row: [

      { k: 'table', id: 'pr-payslips', c: 8,
        title: 'Recent Payslips',
        sub: 'Payroll period: September 2026',
        link: { label: 'View All', href: 'modules/payroll/index.html?id=salary' },
        cols: [{ t: 'Employee', a: 'l' }, { t: 'ID', a: 'l' }, { t: 'Department', a: 'l' },
          { t: 'Gross', a: 'r', f: 'taka' }, { t: 'Deductions', a: 'r', f: 'taka' },
          { t: 'Net Payable', a: 'r', f: 'taka' }, { t: 'Status', a: 'c' }],
        rows: [
          ['Rahim Uddin', 'EMP-0142', 'Production - Cutting', 48500, 7150, 41350, { b: 'Approved' }],
          ['Karim Sheikh', 'EMP-0087', 'Production - Sewing', 42000, 6050, 35950, { b: 'Approved' }],
          ['Nasir Ahmed', 'EMP-0311', 'Quality', 56200, 8420, 47780, { b: 'Pending' }],
          ['Rafiq Alam', 'EMP-0225', 'Accounts', 61800, 9650, 52150, { b: 'Approved' }],
          ['Salma Khatun', 'EMP-0452', 'HR & Admin', 38900, 5430, 33470, { b: 'On Hold' }],
          ['Jamal Hossain', 'EMP-0198', 'Maintenance', 44700, 6610, 38090, { b: 'Approved' }]
        ]
      },

      { k: 'funnel', id: 'pr-run', c: 4,
        title: 'Payroll Run Status',
        steps: [
          { step: 'Attendance Locked', v: '26 Sep 2026', note: '248 employees', c: '#10b981' },
          { step: 'Payroll Processed', v: '27 Sep 2026', note: 'Gross ৳ 1,24,85,600', c: '#10b981' },
          { step: 'Manager Approval', v: 'Pending', note: '6 entries on hold', c: '#f59e0b' },
          { step: 'Disbursement', v: 'Scheduled', note: '30 Sep 2026', c: '#cbd5e1' }
        ]
      }
    ] },

    /* --------------------------------------------- ROW 5 : PENDING APPROVALS */
    { row: [

      { k: 'list', id: 'pr-approvals', c: 12,
        title: 'Pending Approvals',
        link: { label: 'View All', href: 'modules/payroll/index.html?id=salary' },
        items: [
          { t: 'Loan Request', s: 'Rahim Uddin', v: '৳ 25,000' },
          { t: 'Overtime Entry', s: 'Karim Sheikh', v: '42 hrs' },
          { t: 'Leave Application', s: 'Salma Khatun', v: '3 days' },
          { t: 'Salary Revision', s: 'Rafiq Alam', v: '৳ 4,500' }
        ]
      }
    ] },

    /* ------------------------------------------- ROW 6 : ATTENDANCE SUMMARY */
    { row: [

      { k: 'stats', c: 12,
        cards: [
          { label: 'Present', value: '5,842', sub: 'Last 30 days', c: '#10b981' },
          { label: 'Absent', value: '96', sub: 'Last 30 days', c: '#f43f5e' },
          { label: 'Leave', value: '214', sub: 'Last 30 days', c: '#0ea5e9' },
          { label: 'Late Attendance', value: '188', sub: 'Last 30 days', c: '#f59e0b' },
          { label: 'Overtime Hours', value: '1,426', sub: 'Last 30 days', c: '#8b5cf6' },
          { label: 'Overtime Cost', value: '৳ 8,73,992', sub: 'Last 30 days', c: '#475569' }
        ]
      }
    ] },

    /* ---------------------------------------------- ROW 7 : LEAVE INFORMATION */
    { row: [

      { k: 'list', id: 'pr-leave-today', c: 4,
        title: 'On Leave Today',
        sub: '28 Sep 2026 · 5 on leave',
        items: [
          { t: 'Salma Khatun', s: 'EMP-0452 · HR & Admin · Maternity Leave',
            v: 'Back on 15 Oct 2026', c: '#0284c7' },
          { t: 'Jamal Hossain', s: 'EMP-0198 · Maintenance · Earned Leave',
            v: 'Ends 17 Sep 2026', c: '#0284c7' },
          { t: 'Rahim Uddin', s: 'EMP-0142 · Production - Cutting · Casual Leave',
            v: 'Ends 28 Sep 2026', c: '#0284c7' },
          { t: 'Nasir Ahmed', s: 'EMP-0311 · Quality · Sick Leave',
            v: 'Back on 30 Sep 2026', c: '#0284c7' },
          { t: 'Rafiq Alam', s: 'EMP-0225 · Accounts · Casual Leave',
            v: 'Back on 29 Sep 2026', c: '#0284c7' }
        ],
        foot: { label: 'Approved leave only',
          link: { label: 'View More', href: 'modules/payroll/index.html?id=leave' } }
      },

      { k: 'table', id: 'pr-leave', c: 8,
        title: 'Recent Leave Applications',
        sub: 'Latest submitted requests and their current status',
        link: { label: 'View All', href: 'modules/payroll/index.html?id=leave-applied' },
        cols: [{ t: 'Employee', a: 'l' }, { t: 'ID', a: 'l' }, { t: 'Leave Type', a: 'l' },
          { t: 'From', a: 'l' }, { t: 'To', a: 'l' }, { t: 'Days', a: 'r', f: 'qty' },
          { t: 'Applied On', a: 'l' }, { t: 'Status', a: 'c' }],
        rows: [
          ['Salma Khatun', 'EMP-0452', 'Maternity Leave', '20 Sep 2026', '15 Oct 2026', 26, '18 Sep 2026', { b: 'Approved' }],
          ['Rahim Uddin', 'EMP-0142', 'Casual Leave', '26 Sep 2026', '28 Sep 2026', 3, '22 Sep 2026', { b: 'Approved' }],
          ['Nasir Ahmed', 'EMP-0311', 'Sick Leave', '27 Sep 2026', '30 Sep 2026', 4, '25 Sep 2026', { b: 'Approved' }],
          ['Rafiq Alam', 'EMP-0225', 'Casual Leave', '28 Sep 2026', '29 Sep 2026', 2, '27 Sep 2026', { b: 'Pending' }],
          ['Karim Sheikh', 'EMP-0087', 'Earned Leave', '05 Oct 2026', '09 Oct 2026', 5, '26 Sep 2026', { b: 'Rejected' }],
          ['Abdul Karim', 'EMP-0301', 'Unpaid Leave', '01 Oct 2026', '10 Oct 2026', 10, '27 Sep 2026', { b: 'Pending' }]
        ]
      }
    ] },

    /* ------------------------------------------ ROW 8 : ATTENDANCE INSIGHTS */
    { row: [

      { k: 'chart', id: 'pr-att', c: 8,
        title: 'Daily Attendance Trend',
        sub: 'Present, absent, late and leave count of last 10 working days',
        chart: {
          type: 'bar',
          height: 300,
          yfmt: 'qty',
          labels: ['11 Sep', '14 Sep', '15 Sep', '16 Sep', '17 Sep', '18 Sep',
            '21 Sep', '22 Sep', '23 Sep', '24 Sep'],
          datasets: [
            { label: 'Present', data: [231, 233, 229, 234, 236, 235, 232, 237, 238, 236],
              bg: 'rgba(16, 185, 129, 0.25)', border: 'rgba(16, 185, 129, 1)', w: 1, borderRadius: 4 },
            { label: 'Absent', data: [14, 12, 16, 11, 9, 10, 13, 8, 7, 9],
              bg: 'rgba(244, 63, 94, 0.25)', border: 'rgba(244, 63, 94, 1)', w: 1, borderRadius: 4 },
            { label: 'Late Marking', data: [18, 22, 15, 24, 12, 14, 20, 16, 13, 17],
              bg: 'rgba(245, 158, 11, 0.25)', border: 'rgba(245, 158, 11, 1)', w: 1, borderRadius: 4 },
            { label: 'On Leave', data: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
              bg: 'rgba(99, 102, 241, 0.25)', border: 'rgba(99, 102, 241, 1)', w: 1, borderRadius: 4 }
          ]
        },
        legendList: [
          { label: 'Present', color: 'rgba(16, 185, 129, 1)' },
          { label: 'Absent', color: 'rgba(244, 63, 94, 1)' },
          { label: 'Late', color: 'rgba(245, 158, 11, 1)' },
          { label: 'On Leave', color: 'rgba(99, 102, 241, 1)' }
        ]
      },

      { k: 'table', id: 'pr-att-dept', c: 4,
        title: 'Attendance by Department',
        sub: 'September 2026 · 96.8% avg',
        cols: [{ t: 'Department', a: 'l' }, { t: 'Staff', a: 'r', f: 'qty' },
          { t: 'Absent', a: 'r', f: 'qty' }, { t: 'Late', a: 'r', f: 'qty' },
          { t: 'Rate', a: 'r', f: 'pct' }],
        rows: [
          ['Production', 96, 38, 72, 96.2],
          ['Quality', 34, 11, 26, 97.1],
          ['Maintenance', 28, 12, 24, 95.7],
          ['Accounts', 22, 6, 15, 97.7],
          ['HR & Admin', 26, 8, 18, 97.3],
          ['Stores', 24, 13, 21, 94.6],
          ['Security', 18, 8, 12, 94.4]
        ],
        total: ['Total :', 248, 96, 188, 61.3],
        foot: { label: 'Approved & verified records only',
          link: { label: 'View More', href: 'modules/payroll/index.html?id=attendance' } }
      }
    ] },

    /* -------------------------------------------- ROW 9 : ATTENDANCE REGISTER */
    { row: [

      { k: 'table', id: 'pr-register', c: 12,
        title: 'Attendance Register',
        sub: 'Day wise attendance summary with overtime hours and present percentage',
        link: { label: 'View All', href: 'modules/payroll/index.html?id=monthly' },
        cols: [{ t: 'Date', a: 'l' }, { t: 'Day', a: 'l' }, { t: 'Working Staff', a: 'r', f: 'qty' },
          { t: 'Present', a: 'r', f: 'qty' }, { t: 'Absent', a: 'r', f: 'qty' },
          { t: 'Late Marking', a: 'r', f: 'qty' }, { t: 'Half Day', a: 'r', f: 'qty' },
          { t: 'On Leave', a: 'r', f: 'qty' }, { t: 'Overtime (hrs)', a: 'r', f: 'qty' },
          { t: 'Present %', a: 'c', f: 'pct' }],
        rows: [
          ['28 Sep 2026', 'Monday', 248, 236, 9, 17, 3, 3, 142, 95.2],
          ['27 Sep 2026', 'Sunday', 248, 238, 7, 13, 1, 3, 118, 96.0],
          ['26 Sep 2026', 'Saturday', 248, 234, 11, 22, 3, 3, 196, 94.4],
          ['25 Sep 2026', 'Friday', 248, 237, 8, 16, 2, 3, 154, 95.6],
          ['24 Sep 2026', 'Thursday', 248, 236, 9, 17, 2, 3, 142, 95.2],
          ['23 Sep 2026', 'Wednesday', 248, 238, 7, 13, 1, 3, 128, 96.0],
          ['22 Sep 2026', 'Tuesday', 248, 237, 8, 16, 2, 3, 136, 95.6],
          ['21 Sep 2026', 'Monday', 248, 232, 13, 20, 3, 3, 171, 93.5]
        ],
        total: ['Total', '8 days', 1984, 1888, 72, 134, 17, 24, 1187, 95.2]
      }
    ] },

    /* ------------------------------------------ ROW 10 : PAYROLL METRICS OVERVIEW */
    { row: [
      { k: 'metrics', c: 12,
        title: 'Payroll Metrics Overview',
        cols: ['This Month', 'Last Month', 'This Year', 'Last Year'],
        rows: [
          { label: 'Gross Salary', icon: 'payroll', c: '#0ea5e9',
            values: ['৳ 1,24,85,600', '৳ 1,25,74,000', '৳ 1,42,65,800', '৳ 1,31,20,400'] },
          { label: 'Deductions', icon: 'commercial', c: '#0284c7',
            values: ['৳ 18,42,900', '৳ 18,62,300', '৳ 2,14,38,870', '৳ 1,98,78,060'] },
          { label: 'Net Salary', icon: 'billing', c: '#0369a1',
            values: ['৳ 1,06,42,700', '৳ 1,07,11,700', '৳ 1,20,26,930', '৳ 1,11,42,340'] },
          { label: 'Overtime Wages', icon: 'cog', c: '#075985',
            values: ['৳ 8,73,992', '৳ 8,12,450', '৳ 1,02,48,300', '৳ 88,25,600'] }
        ]
      }
    ] }
  ]
});