/* ==========================================================================
   SK Trims ERP - DASHBOARD KIT LOADER
   --------------------------------------------------------------------------
   The module pages each need the whole dashboard kit, and repeating eleven
   script tags in eight HTML files is a mess. This pulls them in from one
   place, in order, while the page is still being read:

     Chart.js  ->  dashboard.js (the renderer)  ->  the eight dash-*.js specs

   dashboard.html lists the same files itself, because it is the only page
   that has to name them in the right order.
   ========================================================================== */

(function (d) {
  "use strict";

  /* the one place that knows the list, so a ninth dashboard is one line */
  var SPECS = [
    "order", "production", "delivery", "stock",
    "accounts", "payroll", "commercial", "billing"
  ];

  var ROOT = (window.SK && window.SK.root) || "";

  var files = ["https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js",
    ROOT + "assets/js/dashboard.js"];

  SPECS.forEach(function (key) {
    files.push(ROOT + "assets/js/dash-" + key + ".js");
  });

  files.forEach(function (src) {
    d.write('<script src="' + src + '"><\/script>');
  });
})(document);