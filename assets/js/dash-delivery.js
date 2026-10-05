/* ==========================================================================
   DELIVERY DASHBOARD - static data
   --------------------------------------------------------------------------
   Ported from "dashboard - Delivery.php". The PHP page derives every figure
   from one job pool and one 14 day register; the numbers below are those
   same derivations, frozen, ready to be swapped for a live fetch later on.
   ========================================================================== */

window.SKDash.register("delivery", {
  title: "Delivery Dashboard",
  note: "Delivery dispatch, job status, readiness and the delivery register.",

  blocks: [

    /* ------------------------------------------------- ROW 1 : DELIVERY OVERVIEW */
    { row: [

      { k: "hero", c: 12,
        title: "Delivery Overview",
        sub: "Ordered quantity against everything conning, dispatched and still waiting for a challan",
        link: { label: "View All", href: "modules/delivery/index.html?id=delivery-challan" },
        cells: [
          { label: "Order Qty", value: "351,000", pct: 73.5, color: "#0284c7" },
          { label: "Conning Qty", value: "258,000", pct: 73.5, color: "#0284c7", div: true },
          { label: "Delivered Qty", value: "214,200", pct: 61, color: "#0284c7", div: true },
          { label: "Ready For Delivery", value: "43,800", pct: 17, color: "#0284c7", div: true },
          { label: "Delivery Rate", value: "61.0%", pct: 61, color: "#0284c7", div: true }
        ],
        stats: [
          { label: "Open Jobs", value: "5", color: "#334155" },
          { label: "Ready Jobs", value: "1", color: "#334155" },
          { label: "Not Conning", value: "2", color: "#334155" },
          { label: "Jobs Delivered", value: "5", color: "#334155" },
          { label: "Challans", value: "37", color: "#334155" },
          { label: "Packets", value: "5,440", color: "#334155" }
        ]
      }
    ] },

    /* --------------------------------------------- ROW 2 : DISPATCH TREND + STATUS */
    { row: [

      { k: "chart", id: "d-trend", c: 8,
        title: "Last 14 Days Dispatch",
        sub: "Delivered quantity every day, with the number of challans raised on that day",
        chart: {
          type: "bar",
          height: 270,
          yfmt: "qty",
          y2: { yfmt: "qty" },
          labels: ["15 Sep", "16 Sep", "17 Sep", "18 Sep", "19 Sep", "20 Sep", "21 Sep",
            "22 Sep", "23 Sep", "24 Sep", "25 Sep", "26 Sep", "27 Sep", "28 Sep"],
          datasets: [
            { label: "Delivered Qty", order: 2,
              data: [8200, 6400, 10800, 9100, 3200, 0, 9700, 11600, 6800, 13400, 8900, 6100, 3400, 11200],
              bg: "rgba(20, 184, 166, 0.3)", border: "rgba(20, 184, 166, 1)" },
            { label: "Challans", type: "line", axis: "y2", order: 1,
              data: [3, 2, 4, 3, 1, 0, 3, 4, 2, 5, 3, 2, 1, 4],
              bg: "rgba(139, 92, 246, 1)", border: "rgba(139, 92, 246, 1)", w: 2 }
          ]
        }
      },

      { k: "chart", id: "d-status", c: 4,
        title: "Job Delivery Status",
        center: "Jobs",
        centerValue: "12",
        chart: {
          type: "doughnut",
          height: 230,
          labels: ["Delivered", "In Production", "Ready For Delivery", "Not Conning"],
          datasets: [{
            data: [5, 4, 1, 2],
            bg: ["rgba(20, 184, 166, 0.85)", "rgba(114, 199, 255, 0.85)",
              "rgba(255, 159, 64, 0.85)", "rgba(203, 213, 225, 0.9)"]
          }]
        },
        legendList: [
          { label: "Delivered (5)", color: "rgba(20, 184, 166, 0.85)" },
          { label: "In Production (4)", color: "rgba(114, 199, 255, 0.85)" },
          { label: "Ready For Delivery (1)", color: "rgba(255, 159, 64, 0.85)" },
          { label: "Not Conning (2)", color: "rgba(203, 213, 225, 0.9)" }
        ]
      }
    ] },

    /* ---------------------------------------- ROW 3 : BREAKDOWN TABS + READY BY PARTY */
    { row: [

      { k: "tabs", id: "d-break", c: 8,
        sub: "Open job pool - every tab is the same 12 live jobs grouped a different way, so all four totals always match.",
        tabs: [
          { label: "Party",
            cols: [{ t: "Party", a: "l" }, { t: "Jobs", a: "r", f: "qty" },
              { t: "Order", a: "r", f: "qty" }, { t: "Conning", a: "r", f: "qty" },
              { t: "Delivered", a: "r", f: "qty" }, { t: "Ready", a: "r", f: "qty" },
              { t: "Rate", a: "r", f: "pct" }],
            rows: [
              ["Sinha Textile", 2, 63000, 57000, 57000, 0, 90.5],
              ["Envy Pacific", 1, 45000, 40000, 40000, 0, 88.9],
              ["Beximco Limited", 1, 33000, 29000, 29000, 0, 87.9],
              ["Hanuman Textile", 1, 28000, 25000, 25000, 0, 89.3],
              ["DBL Group", 2, 60000, 50000, 24800, 25200, 41.3],
              ["MJ Group", 1, 27000, 24000, 16800, 7200, 62.2],
              ["Noman Group", 1, 22000, 18000, 12600, 5400, 57.3],
              ["Shanta Holdings", 1, 18000, 15000, 9000, 6000, 50],
              ["Prime Denim", 1, 30000, 0, 0, 0, 0],
              ["Rupali Knitwear", 1, 25000, 0, 0, 0, 0]
            ],
            total: ["Total party (12)", 12, 351000, 258000, 214200, 43800, 61],
            foot: {
              label: "Date: 15 Sep 2026 - 28 Sep 2026",
              link: { label: "View More", href: "modules/delivery/index.html?id=delivery-challan" }
            }
          },
          { label: "Item",
            cols: [{ t: "Item", a: "l" }, { t: "Jobs", a: "r", f: "qty" },
              { t: "Order", a: "r", f: "qty" }, { t: "Conning", a: "r", f: "qty" },
              { t: "Delivered", a: "r", f: "qty" }, { t: "Ready", a: "r", f: "qty" },
              { t: "Rate", a: "r", f: "pct" }],
            rows: [
              ["Basic Tee", 2, 87000, 78000, 78000, 0, 89.7],
              ["Long Sleeve", 2, 61000, 54000, 54000, 0, 88.5],
              ["Polo Shirt", 3, 93000, 55000, 41600, 13400, 44.7],
              ["Zipper Jacket", 2, 39000, 34000, 28000, 6000, 71.8],
              ["Henley", 3, 71000, 37000, 12600, 24400, 17.7]
            ],
            total: ["Total item (12)", 12, 351000, 258000, 214200, 43800, 61],
            foot: {
              label: "",
              link: { label: "View More", href: "modules/production/index.html?id=production" }
            }
          },
          { label: "Team",
            cols: [{ t: "Team", a: "l" }, { t: "Jobs", a: "r", f: "qty" },
              { t: "Order", a: "r", f: "qty" }, { t: "Conning", a: "r", f: "qty" },
              { t: "Delivered", a: "r", f: "qty" }, { t: "Ready", a: "r", f: "qty" },
              { t: "Rate", a: "r", f: "pct" }],
            rows: [
              ["Salman Rahman", 2, 61000, 54000, 54000, 0, 88.5],
              ["Rahim Uddin", 2, 60000, 53000, 47000, 6000, 78.3],
              ["Ashikul Islam", 2, 69000, 59000, 40000, 19000, 58],
              ["Tanvir Hossain", 2, 49000, 42000, 29400, 12600, 60],
              ["Karim Mia", 2, 61000, 31000, 24800, 6200, 40.7],
              ["Shanto Das", 2, 51000, 19000, 19000, 0, 37.3]
            ],
            total: ["Total team (12)", 12, 351000, 258000, 214200, 43800, 61],
            foot: {
              label: "",
              link: { label: "View More", href: "modules/order/index.html?id=manage-order" }
            }
          },
          { label: "GSM",
            cols: [{ t: "Specification", a: "l" }, { t: "Jobs", a: "r", f: "qty" },
              { t: "Order", a: "r", f: "qty" }, { t: "Conning", a: "r", f: "qty" },
              { t: "Delivered", a: "r", f: "qty" }, { t: "Ready", a: "r", f: "qty" },
              { t: "Rate", a: "r", f: "pct" }],
            rows: [
              ["180 GSM", 5, 149000, 106000, 75400, 30600, 50.6],
              ["220 GSM", 2, 61000, 54000, 54000, 0, 88.5],
              ["240 GSM", 1, 45000, 40000, 40000, 0, 88.9],
              ["260 GSM", 2, 39000, 34000, 28000, 6000, 71.8],
              ["200 GSM", 2, 57000, 24000, 16800, 7200, 29.5]
            ],
            total: ["Total specification (12)", 12, 351000, 258000, 214200, 43800, 61],
            foot: {
              label: "",
              link: { label: "View More", href: "modules/production/index.html?id=production-summary" }
            }
          }
        ]
      },

      { k: "chart", id: "d-party-ready", c: 4,
        title: "Ready For Delivery",
        sub: "Conning but not dispatched yet, by party",
        chart: {
          type: "bar",
          horizontal: true,
          height: 330,
          yfmt: "qty",
          labels: ["DBL Group", "MJ Group", "Noman Group", "Shanta Holdings"],
          datasets: [{
            label: "Ready Qty",
            data: [25200, 7200, 5400, 6000],
            bg: "rgba(255, 159, 64, 0.3)",
            border: "rgba(255, 159, 64, 1)"
          }]
        }
      }
    ] },

    /* --------------------------------- ROW 4 : RECENT CHALLANS + ITEM WISE DELIVERY */
    { row: [

      { k: "table", id: "d-challans", c: 4,
        title: "Recent Challans",
        sub: "Latest dispatch notes raised",
        link: { label: "View All", href: "modules/delivery/index.html?id=delivery-challan" },
        cols: [{ t: "Challan", a: "l" }, { t: "Job", a: "l" },
          { t: "Qty", a: "r", f: "qty" }, { t: "Status", a: "r" }],
        rows: [
          ["DC-1284/26", "OD-2026-1284", 4800, { b: "Delivered" }],
          ["DC-1283/26", "OD-2026-1283", 3200, { b: "Delivered" }],
          ["DC-1282/26", "OD-2026-1280", 5600, { b: "Delivered" }],
          ["DC-1281/26", "OD-2026-1282", 3400, { b: "Delivered" }],
          ["DC-1280/26", "OD-2026-1281", 2800, { b: "In Production" }],
          ["DC-1279/26", "OD-2026-1276", 2400, { b: "Delivered" }]
        ]
      },

      { k: "chart", id: "d-item", c: 8,
        title: "Item Wise Delivery",
        sub: "Ordered quantity against the quantity already dispatched",
        chart: {
          type: "bar",
          height: 330,
          yfmt: "qty",
          labels: ["Basic Tee", "Long Sleeve", "Polo Shirt", "Zipper Jacket", "Henley"],
          datasets: [
            { label: "Order Qty", data: [87000, 61000, 93000, 39000, 71000],
              bg: "rgba(114, 199, 255, 0.3)", border: "rgba(114, 199, 255, 1)" },
            { label: "Delivered Qty", data: [78000, 54000, 41600, 28000, 12600],
              bg: "rgba(20, 184, 166, 0.3)", border: "rgba(20, 184, 166, 1)" }
          ]
        }
      }
    ] },

    /* -------------------------------------------------------- ROW 5 : DELIVERY REGISTER */
    { row: [

      { k: "table", id: "d-register", c: 12,
        title: "Delivery Register",
        sub: "Day wise challans, dispatched quantity, packets and the share that went out",
        link: { label: "View All", href: "modules/delivery/index.html?id=delivery-challan" },
        cols: [{ t: "Date", a: "l" }, { t: "Day", a: "l" },
          { t: "Challans", a: "r", f: "qty" }, { t: "Delivered Qty", a: "r", f: "qty" },
          { t: "Packets", a: "r", f: "qty" }, { t: "Ready Qty", a: "r", f: "qty" },
          { t: "Open Jobs", a: "r", f: "qty" }, { t: "Dispatch %", a: "r", f: "pct" }],
        rows: [
          ["28 Sep 2026", "Monday", 4, 11200, 560, 12800, 8, 46.7],
          ["27 Sep 2026", "Sunday", 1, 3400, 170, 8200, 8, 29.3],
          ["26 Sep 2026", "Saturday", 2, 6100, 305, 9400, 8, 39.4],
          ["25 Sep 2026", "Friday", 3, 8900, 445, 12100, 8, 42.4],
          ["24 Sep 2026", "Thursday", 5, 13400, 670, 15600, 9, 46.2],
          ["23 Sep 2026", "Wednesday", 2, 6800, 340, 10800, 9, 38.6],
          ["22 Sep 2026", "Tuesday", 4, 11600, 580, 14200, 9, 45],
          ["21 Sep 2026", "Monday", 3, 9700, 485, 13100, 10, 42.5]
        ],
        total: ["Total", "8 days", 24, 71100, 3555, 96200, { t: "-" }, 42.5]
      }
    ] },

    /* --------------------------------------------- ROW 6 : DELIVERY METRICS OVERVIEW */
    { row: [

      { k: "metrics", c: 12,
        title: "Delivery Metrics Overview",
        cols: ["Today", "This Week", "Last Week", "Last Month"],
        rows: [
          { label: "Delivered Qty", icon: "delivery", c: "#0ea5e9",
            values: ["11,200", "49,800", "44,400", "372,400"] },
          { label: "Cartoon", icon: "stock", c: "#0284c7",
            values: ["4,940", "21,970", "19,590", "164,300"] },
          { label: "Poly", icon: "empty", c: "#0369a1",
            values: ["4,100", "18,220", "16,260", "136,200"] },
          { label: "Sewing Thread", icon: "cog", c: "#075985",
            values: ["221", "984", "882", "7,380"] }
        ]
      }
    ] }
  ]
});
