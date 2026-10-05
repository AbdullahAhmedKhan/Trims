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

  /* the format of each column. Normally it comes from the thead above the
     body: <th data-f="money"> turns a number into crore or lakh. A table
     with no header row says the same thing itself:
       <table class="skd-table" data-cols="text,money,money">
     and a money, qty, pct or taka column is right aligned, the rest left. */
  var NUMERIC = { money: 1, taka: 1, qty: 1, pct: 1 };

  function columnFormats(tbody) {
    var table = tbody.closest("table");
    if (!table) return [];

    var head = table.querySelector("thead");
    if (head) {
      return [].slice.call(head.querySelectorAll("th")).map(function (th) {
        var f = th.getAttribute("data-f") || "";
        var align = th.className.match(/\ba-(\w+)/);
        return { f: f, align: align ? align[1] : "l" };
      });
    }

    var list = table.getAttribute("data-cols") || "";
    return list.split(",").map(function (f) {
      f = f.trim();
      return { f: f, align: NUMERIC[f] ? "r" : "l" };
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
      var spec = data()[key];
      var cols = columnFormats(tbody);

      if (!spec || !spec.rows || !spec.rows.length) {
        tbody.innerHTML = '<tr><td colspan="' + (cols.length || 1) +
          '"><p class="skd-empty">Nothing to show yet.</p></td></tr>';
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

  /* The legend host keeps whatever layout class the page gave it, so a card
     can ask for the keys to sit side by side:
       <div class="skd-legend skd-legend-inline" data-legend="item">
     .one is the stacked fallback for a short key; an inline key does not
     need it, because the inline rule lays the keys out in a row already. */
  function legendClass(host, count) {
    var base = "skd-legend";
    var inline = false;

    [].slice.call(host.classList).forEach(function (c) {
      if (/^skd-legend-/.test(c)) {
        base += " " + c;
        if (c === "skd-legend-inline") inline = true;
      }
    });

    return base + (count <= 2 && !inline ? " one" : "");
  }

  function fillLegends() {
    [].slice.call(d.querySelectorAll("[data-legend]")).forEach(function (host) {
      var key = host.getAttribute("data-legend");
      var spec = data()[key];
      if (!spec) return;

      var list = legendFor(spec);
      if (!list.length) return;

      host.className = legendClass(host, list.length);
      host.innerHTML = list.map(function (l) {
        return '<div class="skd-legend-row"><span><i style="--c:' +
          (l.color || "#0ea5e9") + '"></i>' + esc(l.label) + "</span>" +
          (l.value ? "<b>" + esc(l.value) + "</b>" : "") + "</div>";
      }).join("");
    });
  }

  /* =========================================================== metrics == */

  /* The heading is in the HTML, so only the grid under it is filled here. */
  function fillMetrics() {
    var wrap = d.querySelector("[data-metrics]");
    if (!wrap) return;

    var grid = wrap.querySelector("[data-metrics-grid]");
    if (!grid) return;

    var m = data().metrics;
    if (!m || !m.rows || !m.rows.length) return;

    grid.style.setProperty("--mc", m.cols.length);

    grid.innerHTML =
      '<div class="skd-mhead"><div></div>' + m.cols.map(function (c) {
        return "<div>" + esc(c) + "</div>";
      }).join("") + "</div>" +

      '<div class="skd-mbody">' + m.rows.map(function (r) {
        var out = '<div class="skd-mrow" style="--c:' + (r.c || "#0ea5e9") + '">';
        out += "<label>" + (w.SK ? w.SK.icon(r.icon || "empty") : "") +
          "<span>" + esc(r.label) + "</span></label>";
        r.values.forEach(function (v) { out += "<div>" + esc(v) + "</div>"; });
        return out + "</div>";
      }).join("") + "</div>";
  }

  /* ============================================================ charts == */

  /* the chart of each <canvas>, kept so a chart can be thrown away and
     drawn again when the period picker changes */
  var drawn = {};

  function paint(canvas, spec) {
    var key = canvas.getAttribute("data-chart");

    /* only one chart per canvas: redrawing replaces the old one */
    if (drawn[key]) {
      try { drawn[key].destroy(); } catch (e) { /* already gone */ }
      drawn[key] = null;
    }

    drawn[key] = w.SKDash.drawChart(canvas, spec);
  }

  function fillCharts() {
    if (!w.SKDash) return;

    [].slice.call(d.querySelectorAll("[data-chart]")).forEach(function (canvas) {
      var key = canvas.getAttribute("data-chart");
      var spec = data()[key];
      if (!spec) return;

      /* a chart with a matching entry in periods is drawn by the picker */
      if (data().periods && data().periods[key]) return;

      paint(canvas, spec);
    });
  }

  /* ===================================================== period picker ==
     The doughnut card carries a <select data-period>. Choosing a period
     swaps three things: the numbers, the coloured key and the card
     heading. periods.<key> in the data file holds all three, so adding a
     choice is one entry there plus one <option> in index.html. */

  function periodSpec(key) {
    var periods = data().periods || {};
    return periods[key] || periods[Object.keys(periods)[0]] || null;
  }

  /* the numbers for one period, in the shape drawChart wants */
  function monthSpec(period) {
    var base = data().months || {};
    var spec = {};

    Object.keys(base).forEach(function (k) { spec[k] = base[k]; });
    spec.datasets = [{ data: period.values || [], bg: base.bg || [] }];
    spec.legend = (base.labels || []).map(function (label, i) {
      return { label: label, value: (period.amounts || [])[i] || "", color: (base.bg || [])[i] };
    });

    return spec;
  }

  function showPeriod(key) {
    var period = periodSpec(key);
    if (!period) return;

    var heading = d.querySelector("[data-period-title]");
    if (heading) heading.textContent = period.title || "";

    var canvas = d.querySelector('[data-chart="months"]');
    if (canvas && w.SKDash) paint(canvas, monthSpec(period));

    var legend = d.querySelector('[data-legend="months"]');
    if (legend) {
      var list = legendFor(monthSpec(period));
      legend.className = legendClass(legend, list.length);
      legend.innerHTML = list.map(function (l) {
        return '<div class="skd-legend-row"><span><i style="--c:' +
          (l.color || "#0ea5e9") + '"></i>' + esc(l.label) + "</span>" +
          (l.value ? "<b>" + esc(l.value) + "</b>" : "") + "</div>";
      }).join("");
    }
  }

  function wirePeriod() {
    var picker = d.querySelector("[data-period]");
    if (!picker) return;

    picker.addEventListener("change", function () {
      showPeriod(picker.value);
    });

    /* the heading in the HTML is the starting point, the data file decides
       the wording so the two can never drift apart */
    showPeriod(picker.value);
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
    wirePeriod();

    if (w.SKDash) w.SKDash.boot();
  }

  return { render: render };
})(window, document);