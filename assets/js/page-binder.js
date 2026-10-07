/* ==========================================================================
   PAGE BINDER - fills a dashboard page that keeps its own markup
   --------------------------------------------------------------------------
   Some module dashboards are written out in full in their index.html: every
   card, table and chart canvas is real HTML, so the layout can be read and
   changed in one place. Only the numbers come from JavaScript.

   This file is the join between the two. It looks for data attributes on
   the page and drops the values in:

     <tbody data-rows="topSales">   the rows of that table, plus its total row
     <div data-sum="monitoring">     a short strip of figures above a table
     <div data-legend="output">     the coloured key under a chart
     <div data-flow="receipt">      a share of a whole told with bars
     <div data-funnel="exportLc">   a value travelling through stages
     <div data-tracks="balanceSheet">
                                     a few named readings, each with a bar,
                                     and a line of totals under them
     <div data-bars="voucherMix">   a named value per row with a bar
     <canvas data-chart="output">   a chart, drawn from that key in the data
     <div data-hero="Pending"></div>   fill one overview figure
     <div data-metrics>             the metrics grid

   The blocks carry their own layout as Tailwind utilities; only the data
   attributes above are read here, and a few hooks the scripts share: .skd-card
   (the tab scope), .skd-tab / .skd-tabpanel (the tabs), .skd-gauge (the
   shortfall bar) and .skd-in (the reveal), all styled by the Tailwind build in
   assets/css/dashboard.css.

   Column formats come from the thead above the table - a <th> says how to
   show its column with data-f, for example data-f="money". A table with no
   header row says it itself with data-cols.

    A page with a period picker also passes the name of its period driven
    chart. The picker swaps the numbers, the coloured key and the card
    heading, all three coming from data.periods in the data file. A second
    picker on the same page names its own chart - <select data-period="status">
    - and that chart then keeps its periods under its own key, away from the
    page wide data.periods.

   This file builds no page of its own, so the HTML stays the one place the
   layout is written.

     SKPage.mount({ data: ORDER_DATA, period: "months" })
   ========================================================================== */

window.SKPage = (function (w, d) {
  "use strict";

  var H = null;        /* the shared formatters, taken from dashboard.js */
  var DATA = {};       /* the numbers for the page being filled */
  var CHARTS = {};     /* canvas key -> chart, so one can be replaced */
  var PERIOD = null;   /* the chart the page's period picker drives */

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
        var align = th.className.match(/\btext-(left|right|center)/);
        return { f: f, align: align ? (align[1] === "left" ? "l" : align[1] === "right" ? "r" : "c") : "l" };
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
  function cell(value, col, isTotal) {
    var base = (isTotal ? "border-t-2 border-slate-300" : "border-t border-slate-200") +
      " px-2.5 py-[11px] align-middle text-slate-700";
    var align = col.align === "r" ? " text-right tabular-nums whitespace-nowrap"
      : col.align === "c" ? " text-center tabular-nums"
      : " text-left";
    var cls = ' class="' + base + align + '"';

    if (value && typeof value === "object") {
      if (value.b != null) return "<td" + cls + ">" + badge(value.b) + "</td>";
      if (value.t != null) return "<td" + cls + ">" + esc(value.t) + "</td>";
      if (value.lines != null) {
        var j = col.align === "r" ? "justify-items-end" : "justify-items-start";
        return "<td" + cls + '><span class="grid gap-[3px] ' + j + '">' + value.lines.map(function (l) {
          /* "Mat · 28 Oct 2026" puts the short label apart from the value */
          var p = String(l == null ? "" : l).split("\u00b7");
          return '<span class="inline-flex items-baseline gap-1.5 whitespace-nowrap text-[12.5px] leading-[1.35] text-slate-700">' + (p.length > 1
            ? '<i class="min-w-6 flex-none text-[10px] font-bold uppercase tracking-[0.06em] text-slate-400">' + esc(p[0].trim()) + "</i>" + esc(p.slice(1).join("\u00b7").trim())
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
        return "<td" + cls + '><span class="tabular-nums' + (n < 0 ? " font-bold text-amber-600" : "") + '">' +
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
          '"><p class="px-2.5 py-[34px] text-center text-[13px] text-slate-400">Nothing to show yet.</p></td></tr>';
        return;
      }

      var html = spec.rows.map(function (r) {
        return row(r.map(function (v, i) {
          return cell(v, cols[i] || { f: "", align: "l" });
        }));
      }).join("");

      /* a total line is written the same way as a row, only styled apart */
      if (spec.total) {
        html += '<tr class="border-t-2 border-slate-300 bg-slate-50 font-bold text-slate-900">' + spec.total.map(function (v, i) {
          return cell(v, cols[i] || { f: "", align: "l" }, true);
        }).join("") + "</tr>";
      }

      tbody.innerHTML = html;
    });
  }

  /* =============================================================== sum == */

  /* A short strip of figures above a table, so a card can say where it got
     to before the reader reaches the rows:

       <div data-sum="monitoring"></div>
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
        return '<div class="inline-flex items-baseline gap-2 whitespace-nowrap rounded-[10px] border border-slate-200 bg-slate-50 px-3 py-1.5">' +
          '<span class="text-[10.5px] font-bold uppercase tracking-[0.07em] text-slate-500">' + esc(c.label) + "</span>" +
          '<b class="text-[13.5px] font-bold tabular-nums" style="color:' + (c.color || "#0f172a") + '">' + esc(c.value) + "</b></div>";
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

      host.innerHTML = '<div class="flex min-w-0 flex-1 basis-[520px]">' + cells.map(function (c) {
        return '<div class="min-w-0 flex-1 px-[18px] py-0.5 first:pl-0' + (c.div ? " border-l border-slate-200" : "") + '">' +
          '<div class="whitespace-nowrap text-[11.5px] font-bold uppercase tracking-[0.07em] text-slate-500">' + esc(c.label) + "</div>" +
          '<div class="mt-[9px] whitespace-nowrap text-[clamp(19px,2vw,27px)] font-bold leading-none tracking-[-0.03em]"' + (c.color ? ' style="color:' + c.color + '"' : "") +
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
     can ask for its keys to sit side by side (a flex host) or stacked in a
     grid of two columns. A short key of one or two items falls back to a
     single column so it does not spread over the card. */
  function paintLegend(host, list) {
    var inline = host.classList.contains("flex");
    var rowAlign = inline ? "justify-start flex-none" : "justify-between";

    host.innerHTML = list.map(function (l) {
      return '<div class="flex items-center gap-2.5 text-[13.5px] font-semibold ' + rowAlign + '">' +
        '<span class="inline-flex min-w-0 items-center gap-[9px] font-medium text-slate-600">' +
        '<i class="h-[13px] w-[13px] flex-none rounded" style="background:' +
        (l.color || "#0ea5e9") + '"></i>' + esc(l.label) + "</span>" +
        (l.value ? '<b class="whitespace-nowrap font-bold">' + esc(l.value) + "</b>" : "") +
        "</div>";
    }).join("");

    if (inline) host.classList.remove("grid-cols-1");
    else host.classList.toggle("grid-cols-1", list.length <= 2);
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

       <div data-flow="receipt"></div>
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

      var out = '<div class="flex items-end justify-between gap-3">' +
        '<div><b class="block text-[clamp(26px,2.4vw,32px)] font-bold leading-none tracking-[-0.035em] text-slate-900">' + esc(total.value == null ? sum : total.value) +
        '</b><span class="mt-1.5 block text-[11.5px] font-bold uppercase tracking-[0.07em] text-slate-500">' + esc(total.label || "Total") + "</span></div>" +
        (total.note ? '<div class="whitespace-nowrap text-[13px] font-bold text-slate-700">' + esc(total.note) + "</div>" : "") +
        "</div>";

      /* one rail, split between the parts in the order the rows are written */
      out += '<div class="flex h-3 gap-[3px]">' + rows.map(function (r) {
        var pc = sum ? (share(r.value) / sum) * 100 : 0;
        return '<i class="block h-full min-w-1 rounded-full" style="background:' +
          (r.color || "#0ea5e9") + ";width:" + pc +
          '%;box-shadow:inset 0 0 0 1px rgba(255,255,255,0.35)"></i>';
      }).join("") + "</div>";

      /* a row per part, each with its own bar on the same scale */
      out += '<div class="grid gap-[14px]">' + rows.map(function (r) {
        var pc = sum ? (share(r.value) / sum) * 100 : 0;
        return '<div class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-[5px]" style="--c:' + (r.color || "#0ea5e9") + '">' +
          '<div class="flex min-w-0 items-center gap-[9px] text-[13.5px] font-semibold text-slate-800">' +
          '<i class="h-[9px] w-[9px] flex-none rounded-full" style="background:var(--c,currentColor);box-shadow:0 0 0 3px color-mix(in srgb, var(--c) 18%, transparent)"></i>' +
          '<span class="truncate">' + esc(r.label) + "</span></div>" +
          '<div class="whitespace-nowrap text-[13.5px] font-bold tabular-nums"><span>' + esc(r.value) +
          '</span><small style="margin-left:10px" class="text-slate-400">' + pc.toFixed(1) + "%</small></div>" +
          '<div class="col-span-full h-[7px] overflow-hidden rounded-full bg-slate-100">' +
          '<i class="block h-full rounded-full" style="width:' + pc + '%;background:linear-gradient(90deg, color-mix(in srgb, var(--c) 55%, #fff), var(--c))"></i></div>' +
          "</div>";
      }).join("") + "</div>";

      host.innerHTML = out;
    });
  }

  /* ============================================================== funnel ==

     A value travelling through a fixed sequence of stages, told as a stack
     of steps rather than a ring, so two cards on one page do not end up as
     the same doughnut twice:

        <div data-funnel="exportLc"></div>
          the whole card is filled here, out of that key in the data file

      The data writes the stages in the order they should appear, so the
      serial the page shows is the serial in the file:

        exportLc: {
          steps: [ { step, value, note, color } ],
          carry:  [ { label, value } ]   one connector line between two steps,
                                         matched to the step above it
        } */
  function fillFunnel() {
    [].slice.call(d.querySelectorAll("[data-funnel]")).forEach(function (host) {
      var spec = DATA[host.getAttribute("data-funnel")];
      if (!spec || !spec.steps || !spec.steps.length) return;

      var out = "";

      spec.steps.forEach(function (s, i) {
        out += '<div class="relative border-l-4 px-4 py-[13px]" style="--c:' +
          (s.color || "#0ea5e9") + ';background:color-mix(in srgb, var(--c) 12%, #fff);border-left-color:var(--c)">' +
          '<div class="flex items-baseline justify-between gap-3">' +
          '<b class="text-sm font-bold text-slate-800">' + esc(s.step) + "</b><span class=" +
          '"whitespace-nowrap text-sm font-bold tabular-nums">' +
          esc(s.value == null ? "" : s.value) + "</span></div>" +
          (s.note ? '<small class="mt-1 block text-xs text-slate-500">' + esc(s.note) + "</small>" : "") + "</div>";

        var carry = (spec.carry || [])[i];
        if (carry) {
          out += '<div class="flex items-center gap-2 px-5 py-[7px] text-xs text-slate-400">' +
            '<i class="h-4 w-px flex-none bg-slate-300"></i>' + esc(carry.label) +
            (carry.value != null ? ' <b class="font-bold text-slate-600">' + esc(carry.value) + "</b>" : "") + "</div>";
        }
      });

      host.innerHTML = out;
    });
  }

  /* ============================================================= tracks == */

  /* A handful of named readings, each drawn as a bar on the same scale,
     with a line of totals ruled off underneath:

        <div data-tracks="balanceSheet"></div>

        balanceSheet: {
          rows: [ { label, value, pct, color } ],
          total: [ { label, value } ]
        }

      `pct` is the width of the bar, written out by hand so a card can put
      assets against liabilities on one scale without working anything out
      here. Leave it off and the row shows only its figure. */
  function fillTracks() {
    [].slice.call(d.querySelectorAll("[data-tracks]")).forEach(function (host) {
      var spec = DATA[host.getAttribute("data-tracks")];
      if (!spec || !spec.rows || !spec.rows.length) return;

      var rows = '<div class="grid gap-4">' + spec.rows.map(function (r) {
        var pc = r.pct == null ? null : Math.min(100, Math.max(0, num(r.pct)));

        return '<div class="grid gap-[7px]"' + (r.color ? ' style="--c:' + r.color + '"' : "") + ">" +
          '<div class="flex items-baseline justify-between gap-3 text-[13.5px]"><span class="font-medium text-slate-600">' + esc(r.label) + "</span><b class=" +
          '"whitespace-nowrap font-bold tabular-nums">' +
          esc(r.value == null ? "" : r.value) + "</b></div>" +
          (pc == null ? "" :
            '<div class="h-2 overflow-hidden rounded-full bg-slate-100"><i class="block h-full rounded-full" style="width:' + pc + '%;background:var(--c, #0ea5e9)"></i></div>') +
          "</div>";
      }).join("") + "</div>";

      var total = (spec.total || []).map(function (t) {
        return '<div><span class="block text-[11.5px] font-bold uppercase tracking-[0.06em] text-slate-400">' + esc(t.label) +
          "</span><b class=" + '"mt-[5px] block text-base font-bold tabular-nums">' + esc(t.value) + "</b></div>";
      }).join("");

      host.innerHTML = rows + (total ? '<div class="mt-[18px] flex flex-wrap gap-x-[30px] gap-y-2.5 border-t border-slate-200 pt-[15px]">' + total + "</div>" : "");
    });
  }

  /* ============================================================== bars == */

  /* A named value per row with its own bar, for a mix or a ranking where
     each row stands alone rather than adding up to a whole:

        <div data-bars="voucherMix"></div>

        voucherMix: {
          rows: [ { label, value, pct, color, badge, note } ]
        }

      `badge` is a status pill beside the name, `note` a line under the
      bar, and `pct` the width of the bar, written out by hand. */
  function fillBars() {
    [].slice.call(d.querySelectorAll("[data-bars]")).forEach(function (host) {
      var spec = DATA[host.getAttribute("data-bars")];

      if (!spec || !spec.rows || !spec.rows.length) {
        host.innerHTML = '<p class="px-2.5 py-[34px] text-center text-[13px] text-slate-400">Nothing to show yet.</p>';
        return;
      }

      host.innerHTML = spec.rows.map(function (r) {
        var pc = r.pct == null ? null : Math.min(100, Math.max(0, num(r.pct)));

        return '<div class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-[14px] gap-y-1"' +
          (r.color ? ' style="--c:' + r.color + '"' : "") + ">" +
          '<div class="flex min-w-0 items-center gap-[9px] text-[13.5px] font-semibold text-slate-800"><span class="truncate">' + esc(r.label) + "</span>" +
          (r.badge ? badge(r.badge) : "") + "</div>" +
          '<div class="whitespace-nowrap text-[13.5px] font-bold tabular-nums">' + esc(r.value == null ? "" : r.value) + "</div>" +
          (pc == null ? "" :
            '<div class="col-span-full h-2 overflow-hidden rounded-full bg-slate-100"><i class="block h-full rounded-full" style="width:' + pc + '%;background:var(--c, #0ea5e9)"></i></div>') +
          (r.note ? '<div class="col-span-full text-xs text-slate-400">' + esc(r.note) + "</div>" : "") +
          "</div>";
      }).join("");
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

      /* a chart the period picker drives is drawn by showPeriod() instead,
         so it is not painted once here only to be replaced below */
      if (pickerFor(key)) return;
      if (DATA.periods && DATA.periods[key]) return;
      if (PERIOD === key && d.querySelector("[data-period]")) return;

      paint(canvas, spec);
    });
  }

  /* ===================================================== period picker ==
     A page with a picker names its period driven chart, for example
     "months". The <select data-period> chooses between the entries in
     data.periods, and each entry supplies the heading, the numbers and the
     amounts for its own key under the chart. A picker written as
     <select data-period="status"> drives that chart alone and reads its
     entries from data.status.periods instead, so two charts on one page
     can each carry a date filter without clashing.

     Two shapes are read, so a bar chart and a doughnut can both use it:

       a bar chart gives `labels` for the x axis and `series`, one per bar
       group; the colours come from the base spec in the data file:

         periods: { "3m": { title, labels: [...],
                             series: [{ label: "Order", data: [...] }] } }

        a doughnut gives `values` for the segments and `amounts` for the
        key; the names and colours come from the base spec:

          periods: { "3m": { title, values: [...], amounts: [...] } }

        a table gives `rows` (and optionally `total`) and the binder refills
        the tbody for that key, so a card carrying a table and a date filter
        swaps its rows too:

          periods: { "3m": { title, rows: [...], total: [...] } } */

  function periodSpec(name, key) {
    /* a chart may carry its own periods - a doughnut on the same page as a
       bar chart must not read the bar chart's entries. Falls back to the
       page wide data.periods, and then to the first entry of whichever set
       is in play, so an unknown choice still draws something. */
    var own = DATA[name] && DATA[name].periods;
    var periods = own || DATA.periods || {};

    if (periods[key]) return periods[key];
    var keys = Object.keys(periods);
    return keys.length ? periods[keys[0]] : null;
  }

  /* the picker that drives this chart, if the page has one. A picker says
     which chart it drives with data-period="status"; a bare <select
     data-period> drives the chart the page passed as `period`. */
  function pickerFor(name) {
    var list = [].slice.call(d.querySelectorAll("[data-period]"));

    for (var i = 0; i < list.length; i++) {
      if ((list[i].getAttribute("data-period") || PERIOD) === name) return list[i];
    }
    return null;
  }

  /* the numbers for one period, in the shape drawChart wants */
  function buildPeriodSpec(base, period) {
    var spec = {};

    Object.keys(base).forEach(function (k) {
      if (k !== "series" && k !== "legend" && k !== "bg" && k !== "labels" &&
        k !== "periods" && k !== "datasets") {
        spec[k] = base[k];
      }
    });

    if (period.series) {
      /* a bar chart: the periods give the axis and the numbers, the base
         spec gives every bar its colour. The colour entry may also carry
         how that series is drawn - a line on the second axis, a bar with
         rounded corners, a wider stroke - so a mixed chart keeps its shape
         when the period changes. */
      var colors = base.series || {};
      var SHAPE = ["type", "axis", "w", "borderRadius", "order"];

      spec.labels = period.labels || [];
      spec.datasets = period.series.map(function (s) {
        var c = colors[s.label] || {};
        var out = { label: s.label, data: s.data || [], bg: c.bg, border: c.border };

        SHAPE.forEach(function (flag) {
          if (c[flag] != null) out[flag] = c[flag];
        });

        return out;
      });
    } else {
      /* a doughnut: the base spec gives the segment names and colours.
         The colours may sit on `bg` or inside the datasets, and the key may
         be written out already - either way the period only swaps the
         amounts, and the centre figure when the card carries one. */
      var bg = base.bg ||
        (base.datasets && base.datasets[0] && base.datasets[0].bg) || [];
      var names = (base.legend && base.legend.length
        ? base.legend.map(function (l) { return l.label; })
        : base.labels) || [];

      if (period.title != null && period.title !== "") spec.title = period.title;
      if (period.centerValue != null) spec.centerValue = period.centerValue;

      spec.labels = names;
      spec.datasets = [{ data: period.values || [], bg: bg }];
      spec.legend = names.map(function (label, i) {
        var was = (base.legend || [])[i] || {};
        return {
          label: label,
          value: (period.amounts || [])[i] != null ? period.amounts[i]
            : (was.value != null ? was.value : ""),
          color: was.color || bg[i]
        };
      });
    }

    return spec;
  }

  function showPeriod(name, key, picker) {
    var base = DATA[name];
    var period = periodSpec(name, key);
    if (!base || !period) return;

    /* the heading is looked up inside the picker's own card, so two pickers
       on one page cannot rewrite each other's titles */
    var heading = null;
    if (picker && picker.closest) {
      var card = picker.closest(".skd-card");
      heading = card ? card.querySelector("[data-period-title]") : null;
    } else {
      heading = d.querySelector("[data-period-title]");
    }
    if (heading) heading.textContent = period.title || "";

    /* a period may carry its own table rows - a date filter over a table
       swaps the numbers the tbody shows, not just a heading */
    if (period.rows && DATA[name] && DATA[name].rows) {
      DATA[name].rows = period.rows;
      if (period.total) DATA[name].total = period.total;
      fillRows();
    }

    var canvas = d.querySelector('[data-chart="' + name + '"]');
    if (canvas && w.SKDash) paint(canvas, buildPeriodSpec(base, period));

    var legend = d.querySelector('[data-legend="' + name + '"]');
    if (legend) paintLegend(legend, legendFor(buildPeriodSpec(base, period)));
  }

  function wirePeriod(name, picker) {
    picker = picker || pickerFor(name);
    if (!picker) return;

    picker.addEventListener("change", function () {
      showPeriod(name, picker.value, picker);
    });

    /* the heading in the HTML is only the starting point, the data file
       decides the wording so the two can never drift apart */
    showPeriod(name, picker.value, picker);
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
    PERIOD = opts.period || null;

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
    fillFunnel();
    fillTracks();
    fillBars();
    fillMetrics();
    fillCharts();

    /* every period picker on the page: a bare <select data-period> drives
       the chart named in `opts.period`, one written as data-period="status"
       drives that chart on its own */
    var pickers = [].slice.call(d.querySelectorAll("[data-period]"));
    if (pickers.length) {
      pickers.forEach(function (p) {
        var name = p.getAttribute("data-period") || opts.period;
        if (name) wirePeriod(name, p);
      });
    } else if (opts.period) {
      wirePeriod(opts.period, null);
    }

    if (w.SKDash) w.SKDash.boot();
  }

  return { mount: mount };
})(window, document);