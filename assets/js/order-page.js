/* ==========================================================================
   ORDER DASHBOARD - PAGE BINDER
   --------------------------------------------------------------------------
   The Order page keeps its markup in modules/order/index.html and its numbers
   in assets/js/dash-order.js. This file is the join between the two: it looks
   for the data attributes on the page and drops the values in.

   What it fills
   -------------
     <tbody data-rows="topSales">   the rows of that table
     <div data-legend="months">     the coloured key under a chart
     <div data-metrics>             the financial metrics grid
     <canvas data-chart="last7">    a chart, drawn from charts.<key>

   Column formats come from the thead above each table: a <th> says how to
   show its column with data-f, for example data-f="money".

   This file builds no page of its own, so the HTML stays the single place
   the layout is written.
   ========================================================================== */

window.OrderPage = (function (w, d) {
  "use strict";

  var H = null;   /* the shared formatters, taken from dashboard.js */

  function data() {
    return w.ORDER_DATA || {};
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ============================================================ tables == */

  /* the format of each column, read from the thead sitting above the body:
       <th data-f="money">  ->  52,000,000.00 shown as crore / lakh
       <th>                 ->  shown as it is                              */
  function columnFormats(tbody) {
    var table = tbody.closest("table");
    if (!table) return [];

    var head = table.querySelector("thead");
    if (!head) return [];

    return [].slice.call(head.querySelectorAll("th")).map(function (th) {
      var f = th.getAttribute("data-f") || "";
      var align = th.className.match(/\ba-(\w+)/);
      return { f: f, align: align ? align[1] : "l" };
    });
  }

  /* one cell. A plain value is formatted, an object is a badge or a piece
     of text that is already written the way it should appear. */
  function cell(value, col) {
    var cls = ' class="a-' + col.align + (col.align === "l" ? "" : " num") + '"';

    if (value && typeof value === "object") {
      if (value.b != null) return "<td" + cls + ">" + badge(value.b) + "</td>";
      if (value.t != null) return "<td" + cls + ">" + esc(value.t) + "</td>";
      return "<td" + cls + "></td>";
    }

    var out = H && H[value == null ? "text" : col.f || "text"];
    out = out ? out(value) : String(value == null ? "" : value);

    return "<td" + cls + ">" + esc(out) + "</td>";
  }

  function badge(label) {
    if (H && H.badge) return H.badge(label);
    return esc(label);
  }

  function fillRows() {
    [].slice.call(d.querySelectorAll("[data-rows]")).forEach(function (tbody) {
      var key = tbody.getAttribute("data-rows");
      var spec = data().tables ? data().tables[key] : null;
      var cols = columnFormats(tbody);

      if (!spec || !spec.rows || !spec.rows.length) {
        tbody.innerHTML = '<tr><td colspan="' + (cols.length || 1) +
          '"><p class="skd-empty">Nothing to show yet.</p></td></tr>";
        return;
      }

      tbody.innerHTML = spec.rows.map(function (row) {
        return "<tr>" + row.map(function (v, i) {
          return cell(v, cols[i] || { f: "", align: "l" });
        }).join("") + "</tr>";
      }).join("");
    });
  }

  /* ============================================================ legend == */

  /* A chart with two or more named bars explains itself with a coloured
     key under it. The key comes from the data set when the chart has no key
     written out: the label and colour of each bar. The doughnut carries
     amounts as well, so its key is written out as `legend` in the data. */
  function legendFor(spec) {
    if (spec.legend && spec.legend.length) return spec.legend;

    var bars = (spec.datasets || []).filter(function (s) { return s.label; });
    if (bars.length < 2) return [];

    return bars.map(function (s) {
      return { label: s.label, color: s.border || s.bg };
    });
  }

  function fillLegends() {
    [].slice.call(d.querySelectorAll("[data-legend]")).forEach(function (host) {
      var key = host.getAttribute("data-legend");
      var spec = data().charts ? data().charts[key] : null;
      if (!spec) return;

      var list = legendFor(spec);
      if (!list.length) return;

      host.className = "skd-legend" + (list.length <= 2 ? " one" : "");
      host.innerHTML = list.map(function (l) {
        return '<div class="skd-legend-row"><span><i style="--c:' +
          (l.color || "#0ea5e9") + '"></i>' + esc(l.label) + "</span>" +
          (l.value ? "<b>" + esc(l.value) + "</b>" : "") + "</div>";
      }).join("");
    });
  }

  /* =========================================================== metrics == */

  function fillMetrics() {
    var host = d.querySelector("[data-metrics]");
    if (!host) return;

    var m = data().metrics;
    if (!m || !m.rows || !m.rows.length) return;

    var count = m.cols.length;
    host.style.setProperty("--mc", count);

    var head = '<div class="skd-mhead"><div></div>' + m.cols.map(function (c) {
      return "<div>" + esc(c) + "</div>";
    }).join("") + "</div>";

    var body = '<div class="skd-mbody">' + m.rows.map(function (r) {
      var out = '<div class="skd-mrow" style="--c:' + (r.c || "#0ea5e9") + '">';
      out += "<label>" + (w.SK ? w.SK.icon(r.icon || "empty") : "") +
        "<span>" + esc(r.label) + "</span></label>";
      r.values.forEach(function (v) { out += "<div>" + esc(v) + "</div>"; });
      return out + "</div>";
    }).join("") + "</div>";

    host.innerHTML = head + body;
  }

  /* ============================================================ charts == */

  function fillCharts() {
    if (!w.SKDash) return;

    [].slice.call(d.querySelectorAll("[data-chart]")).forEach(function (canvas) {
      var key = canvas.getAttribute("data-chart");
      var spec = data().charts ? data().charts[key] : null;
      if (!spec) return;

      /* a centred number on a doughnut reads better if the HTML says what
         to call it, so the label is taken from the page when it is there */
      w.SKDash.drawChart(canvas, spec);
    });
  }

  /* ================================================================ tabs ==
     dashboard.js already wires .skd-tab clicks for the spec driven pages,
     and it works on the markup in index.html too because the class names and
     the data-skd-tab / data-skd-panel attributes are the same. Calling its
     boot() once is all this page needs. */

  /* ============================================================== head ==
     The heading is written in the HTML, so there is nothing to fill. Only
     the browser tab title is set, from the module the page belongs to. */
  function setTitle() {
    var mod = w.SK && w.SK.activeModule();
    if (!mod) return;
    d.title = (w.SK.config.name || "SK") + " " + (w.SK.config.sub || "ERP") +
      " - " + mod.name;
  }

  /* ================================================================ API == */

  function render() {
    var mod = w.SK && w.SK.activeModule();
    if (!mod) return;

    var main = d.getElementById("skMain");
    if (!main) return;

    main.classList.remove("skd-main-404");
    H = (w.SKDash && w.SKDash.helpers) || null;

    setTitle();
    fillRows();
    fillLegends();
    fillMetrics();
    fillCharts();

    if (w.SKDash) w.SKDash.boot();
  }

  return { render: render };
})(window, document);