/* ==========================================================================
   PAGE BINDER - fills a dashboard page that keeps its own markup
   --------------------------------------------------------------------------
   Some module dashboards are written out in full in their index.html: every
   card, table and chart canvas is real HTML, so the layout can be read and
   changed in one place. Only the numbers come from JavaScript.

   This file is the join between the two. It looks for data attributes on
   the page and drops the values in:

     <tbody data-rows="topSales">   the rows of that table, plus its total row
     <div class="skd-sum" data-sum="monitoring">
                                    a short strip of figures above a table
     <div data-legend="output">     the coloured key under a chart
     <div class="skd-flow" data-flow="receipt">
                                    a share of a whole told with bars
     <canvas data-chart="output">   a chart, drawn from that key in the data
     <div data-hero="Pending"></div>   fill one overview figure
     <div data-metrics>             the metrics grid

   Column formats come from the thead above the table - a <th> says how to
   show its column with data-f, for example data-f="money". A table with no
   header row says it itself with data-cols.

   A page with a period picker also passes the name of its period driven
   chart. The picker swaps the numbers, the coloured key and the card
   heading, all three coming from data.periods in the data file.

   This file builds no page of its own, so the HTML stays the one place the
   layout is written.

     SKPage.mount({ data: ORDER_DATA, period: "months" })
   ========================================================================== */

window.SKPage = (function (w, d) {
  "use strict";

  var H = null;        /* the shared formatters, taken from dashboard.js */
  var DATA = {};       /* the numbers for the page being filled */
  var CHARTS = {};     /* canvas key -> chart, so one can be replaced */

  /* ------------------------------------------------------------- small -- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function badge(label) {
    return H && H.badge ? H.badge(label) : esc(label);
  }

  /* a plain number, through the format its column asked for */
  function num(v) {
    var n = Number(v);
    return isFinite(n) ? n : 0;
  }

  function fmt(value, f) {
    var fn = H && H[value == null ? "text" : f || "text"];
    return fn ? fn(value) : String(value == null ? "" : value);
  }

  /* ============================================================= tables == */

  /* The format of each column. Normally it comes from the thead above the
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

    return (table.getAttribute("data-cols") || "").split(",").map(function (f) {
      f = f.trim();
      return { f: f, align: NUMERIC[f] ? "r" : "l" };
    });
  }

  /* one cell. A plain value is formatted with the format the thead asked for.
     An object is one of the shapes below, so a table can carry something
     other than a plain number:

       { b: "Healthy" }                          a status pill
       { t: "—" }                                text written as it should show
       { lines: ["Mat · 28 Oct 2026"] }          a short label and a value,
                                                  stacked - several dates in
                                                  one cell, so the table keeps
                                                  its width
       { n: -800 }                               a signed number, printed in
                                                  red when it goes below zero
       { gauge: -800, of: 3000 }                 the same number with a
                                                  diverging bar under it, so a
                                                  shortfall reads against the
                                                  lines that have cover  */
  function cell(value, col) {
    var cls = ' class="a-' + col.align + (col.align === "l" ? "" : " num") + '"';

    if (value && typeof value === "object") {
      if (value.b != null) return "<td" + cls + ">" + badge(value.b) + "</td>";
      if (value.t != null) return "<td" + cls + ">" + esc(value.t) + "</td>";
      if (value.lines != null) {
        return "<td" + cls + '><span class="skd-stack">' + value.lines.map(function (l) {
          /* "Mat · 28 Oct 2026" puts the short label apart from the value */
          var p = String(l == null ? "" : l).split("\u00b7");
          return "<span>" + (p.length > 1
            ? "<i>" + esc(p[0].trim()) + "</i>" + esc(p.slice(1).join("\u00b7").trim())
            : esc(l)) + "</span>";
        }).join("") + "</span></td>";
      }
      if (value.gauge != null) {
        var g = num(value.gauge);
        var scale = num(value.of);
        var pc = scale ? Math.min(100, (Math.abs(g) / Math.abs(scale)) * 100) : 0;
        return "<td" + cls + '><span class="skd-gauge' + (g < 0 ? " neg" : "") + '">' +
          "<b>" + esc(fmt(g, col.f)) + "</b>" +
          '<i style="--w:' + pc.toFixed(1) + '%"></i></span></td>';
      }
      if (value.n != null) {
        var n = num(value.n);
        return "<td" + cls + '><span class="skd-num' + (n < 0 ? " is-neg" : "") + '">' +
          esc(fmt(n, col.f)) + "</span></td>";
      }
      return "<td" + cls + "></td>";
    }

    return "<td" + cls + ">" + esc(fmt(value, col.f)) + "</td>";
  }

  function row(cells) {
    return "<tr>" + cells.join("") + "</tr>";
  }

  function fillRows() {
    [].slice.call(d.querySelectorAll("[data-rows]")).forEach(function (tbody) {
      var spec = DATA[tbody.getAttribute("data-rows")];
      var cols = columnFormats(tbody);
      var span = cols.length || 1;

      if (!spec || !spec.rows || !spec.rows.length) {
        tbody.innerHTML = '<tr><td colspan="' + span +
          '"><p class="skd-empty">Nothing to show yet.</p></td></tr>';
        return;
      }

      var html = spec.rows.map(function (r) {
        return row(r.map(function (v, i) {
          return cell(v, cols[i] || { f: "", align: "l" });
        }));
      }).join("");

      /* a total line is written the same way as a row, only styled apart */
      if (spec.total) {
        html += '<tr class="total">' + spec.total.map(function (v, i) {
          return cell(v, cols[i] || { f: "", align: "l" });
        }).join("") + "</tr>";
      }

      tbody.innerHTML = html;
    });
  }

  /* =============================================================== sum == */

  /* A short strip of figures above a table, so a card can say where it got
     to before the reader reaches the rows:

       <div class="skd-sum" data-sum="monitoring"></div>
         filled from the `sum` of that key in the data file

       monitoring: {
         sum: [ { label, value, color } ],
         rows: [...]
       }

     `color` ties one chip to one reading, a shortfall in red and a covered
     line in green, so the strip carries the same story as the table. */
  function fillSums() {
    [].slice.call(d.querySelectorAll("[data-sum]")).forEach(function (host) {
      var spec = DATA[host.getAttribute("data-sum")];
      if (!spec || !spec.sum || !spec.sum.length) return;

      host.innerHTML = spec.sum.map(function (c) {
        return '<div class="skd-sumchip"' + (c.color ? ' style="--c:' + c.color + '"' : "") +
          "><span>" + esc(c.label) + "</span><b>" + esc(c.value) + "</b></div>";
      }).join("");
    });
  }

  /* ============================================================== hero == */

  /* The overview, filled two ways, both reading DATA.overview:

       <div class="skd-ovc-value" data-hero="Pending"></div>
         a card the page has already laid out, filled from the entry of
         that name. This is the one the pages use, so the layout of the
         overview stays written out in the HTML.

       <div class="skd-hero-in" data-hero></div>
         the whole rail written out here instead, one cell per entry.

     There is no progress bar in either: the figures stand on their own. */
  function fillHero() {
    var ov = DATA.overview;
    if (!ov) return;

    var cells = ov.cells || [];

    [].slice.call(d.querySelectorAll("[data-hero]")).forEach(function (host) {
      var name = host.getAttribute("data-hero");

      if (name) {
        cells.forEach(function (c) {
          if (c.label === name) host.textContent = c.value;
        });
        return;
      }

      host.innerHTML = '<div class="skd-rail">' + cells.map(function (c) {
        return '<div class="skd-hcell' + (c.div ? " div" : "") + '">' +
          '<div class="skd-hlabel">' + esc(c.label) + "</div>" +
          '<div class="skd-hvalue"' + (c.color ? ' style="color:' + c.color + '"' : "") +
          ">" + esc(c.value) + "</div></div>";
      }).join("") + "</div>";
    });
  }

  /* ============================================================ legend == */

  /* A chart with two or more named bars explains itself with a coloured key
     under it. The key comes from the data sets when the chart has none
     written out: the label and colour of each bar. A doughnut carries
     amounts too, so its key is written out as `legend` in the data. */
  function legendFor(spec) {
    if (spec.legend && spec.legend.length) return spec.legend;

    var bars = (spec.datasets || []).filter(function (s) { return s.label; });
    if (bars.length < 2) return [];

    return bars.map(function (s) {
      return { label: s.label, color: s.border || s.bg };
    });
  }

  /* The key host keeps whatever layout class the page gave it, so a card
     can ask for its keys to sit side by side:
       <div class="skd-legend skd-legend-inline" data-legend="output">
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

  function paintLegend(host, list) {
    host.className = legendClass(host, list.length);
    host.innerHTML = list.map(function (l) {
      return '<div class="skd-legend-row"><span><i style="--c:' +
        (l.color || "#0ea5e9") + '"></i>' + esc(l.label) + "</span>" +
        (l.value ? "<b>" + esc(l.value) + "</b>" : "") + "</div>";
    }).join("");
  }

  function fillLegends() {
    [].slice.call(d.querySelectorAll("[data-legend]")).forEach(function (host) {
      var spec = DATA[host.getAttribute("data-legend")];
      if (!spec) return;

      var list = legendFor(spec);
      if (list.length) paintLegend(host, list);
    });
  }

  /* ============================================================== flow == */

  /* A share of a whole told with bars instead of a doughnut, so two cards on
     one page do not end up as the same ring twice:

       <div class="skd-flow" data-flow="receipt"></div>
         the whole card is filled here, out of that key in the data file

     The data says what the parts are, and the shares are worked out from
     their values, so only the numbers have to be edited:

       receipt: {
         total: { label: "Challans", value: "37" },
         rows: [ { label, value, color } ]
       }

     `value` is the figure shown and the share it is worked out from, so a
     part written as a number needs no counting here. */
  function fillFlow() {
    function share(v) {
      var n = Number(v);
      return isFinite(n) ? n : 0;
    }

    [].slice.call(d.querySelectorAll("[data-flow]")).forEach(function (host) {
      var spec = DATA[host.getAttribute("data-flow")];
      if (!spec || !spec.rows || !spec.rows.length) return;

      var rows = spec.rows;
      var sum = rows.reduce(function (a, r) { return a + share(r.value); }, 0);
      var total = spec.total || {};

      var out = '<div class="skd-flow-top">' +
        '<div class="skd-flow-total"><b>' + esc(total.value == null ? sum : total.value) +
        "</b><span>" + esc(total.label || "Total") + "</span></div>" +
        (total.note ? '<div class="skd-flow-pct">' + esc(total.note) + "</div>" : "") +
        "</div>";

      /* one rail, split between the parts in the order the rows are written */
      out += '<div class="skd-flow-rail">' + rows.map(function (r) {
        var pc = sum ? (share(r.value) / sum) * 100 : 0;
        return '<i style="--c:' + (r.color || "#0ea5e9") + ";width:" + pc + '%"></i>';
      }).join("") + "</div>";

      /* a row per part, each with its own bar on the same scale */
      out += '<div class="skd-flow-rows">' + rows.map(function (r) {
        var pc = sum ? (share(r.value) / sum) * 100 : 0;
        return '<div class="skd-flow-row" style="--c:' + (r.color || "#0ea5e9") + '">' +
          '<div class="skd-flow-name"><i></i><span>' + esc(r.label) + "</span></div>" +
          '<div class="skd-flow-val">' + esc(r.value) +
          "<small>" + pc.toFixed(1) + "%</small></div>" +
          '<div class="skd-track"><i style="width:' + pc + '%"></i></div>' +
          "</div>";
      }).join("") + "</div>";

      host.innerHTML = out;
    });
  }

  /* =========================================================== metrics == */

  /* The heading is in the HTML, so only the grid under it is filled here. */
  function fillMetrics() {
    var wrap = d.querySelector("[data-metrics]");
    if (!wrap) return;

    var grid = wrap.querySelector("[data-metrics-grid]");
    var m = DATA.metrics;
    if (!grid || !m || !m.rows || !m.rows.length) return;

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

  /* Only one chart per canvas: redrawing replaces the old one. */
  function paint(canvas, spec) {
    var key = canvas.getAttribute("data-chart");

    if (CHARTS[key]) {
      try { CHARTS[key].destroy(); } catch (e) { /* already gone */ }
      CHARTS[key] = null;
    }

    CHARTS[key] = w.SKDash.drawChart(canvas, spec);
  }

  function fillCharts() {
    if (!w.SKDash) return;

    [].slice.call(d.querySelectorAll("[data-chart]")).forEach(function (canvas) {
      var key = canvas.getAttribute("data-chart");
      var spec = DATA[key];
      if (!spec) return;

      /* a chart the period picker drives is drawn by showPeriod() instead */
      if (DATA.periods && DATA.periods[key]) return;

      paint(canvas, spec);
    });
  }

  /* ===================================================== period picker ==
     A page with a picker names its period driven chart, for example
     "months". The <select data-period> chooses between the entries in
     data.periods, and each entry supplies the heading, the numbers and the
     amounts for its own key under the chart.

     Two shapes are read, so a bar chart and a doughnut can both use it:

       a bar chart gives `labels` for the x axis and `series`, one per bar
       group; the colours come from the base spec in the data file:

         periods: { "3m": { title, labels: [...],
                             series: [{ label: "Order", data: [...] }] } }

       a doughnut gives `values` for the segments and `amounts` for the
       key; the names and colours come from the base spec:

         periods: { "3m": { title, values: [...], amounts: [...] } } */

  function periodSpec(key) {
    var periods = DATA.periods || {};
    return periods[key] || periods[Object.keys(periods)[0]] || null;
  }

  /* the numbers for one period, in the shape drawChart wants */
  function buildPeriodSpec(base, period) {
    var spec = {};

    Object.keys(base).forEach(function (k) {
      if (k !== "series" && k !== "legend" && k !== "bg" && k !== "labels") {
        spec[k] = base[k];
      }
    });

    if (period.series) {
      /* a bar chart: the periods give the axis and the numbers, the base
         spec gives every bar its colour */
      var colors = base.series || {};

      spec.labels = period.labels || [];
      spec.datasets = period.series.map(function (s) {
        var c = colors[s.label] || {};
        return { label: s.label, data: s.data || [], bg: c.bg, border: c.border };
      });
    } else {
      /* a doughnut: the base spec gives the segment names and colours */
      var bg = base.bg || [];

      spec.labels = base.labels || [];
      spec.datasets = [{ data: period.values || [], bg: bg }];
      spec.legend = (base.labels || []).map(function (label, i) {
        return {
          label: label,
          value: (period.amounts || [])[i] || "",
          color: bg[i]
        };
      });
    }

    return spec;
  }

  function showPeriod(name, key) {
    var base = DATA[name];
    var period = periodSpec(key);
    if (!base || !period) return;

    var heading = d.querySelector("[data-period-title]");
    if (heading) heading.textContent = period.title || "";

    var canvas = d.querySelector('[data-chart="' + name + '"]');
    if (canvas && w.SKDash) paint(canvas, buildPeriodSpec(base, period));

    var legend = d.querySelector('[data-legend="' + name + '"]');
    if (legend) paintLegend(legend, legendFor(buildPeriodSpec(base, period)));
  }

  function wirePeriod(name) {
    var picker = d.querySelector("[data-period]");
    if (!picker) return;

    picker.addEventListener("change", function () {
      showPeriod(name, picker.value);
    });

    /* the heading in the HTML is only the starting point, the data file
       decides the wording so the two can never drift apart */
    showPeriod(name, picker.value);
  }

  /* =============================================================== head ==
     Headings are written in the HTML, so only the browser tab title is set,
     from the module the page belongs to. */
  function setTitle() {
    var mod = w.SK && w.SK.activeModule();
    if (!mod) return;

    d.title = (w.SK.config.name || "SK") + " " + (w.SK.config.sub || "ERP") +
      " - " + mod.name;
  }

  /* ================================================================ API ==
     Tabs need nothing here: dashboard.js already wires .skd-tab clicks, and
     it works on markup in index.html too because the class names and the
     data-skd-tab / data-skd-panel attributes are the same. */
  function mount(opts) {
    opts = opts || {};
    DATA = opts.data || {};

    var mod = w.SK && w.SK.activeModule();
    var main = d.getElementById("skMain");
    if (!mod || !main) return;

    main.classList.remove("skd-main-404");
    H = (w.SKDash && w.SKDash.helpers) || null;

    setTitle();
    fillRows();
    fillSums();
    fillHero();
    fillLegends();
    fillFlow();
    fillMetrics();
    fillCharts();
    if (opts.period) wirePeriod(opts.period);

    if (w.SKDash) w.SKDash.boot();
  }

  return { mount: mount };
})(window, document);