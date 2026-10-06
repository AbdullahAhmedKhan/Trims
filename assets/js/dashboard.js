/* ==========================================================================
   SK Trims ERP - DASHBOARD RENDERER
   --------------------------------------------------------------------------
   Turns the plain data specs in assets/js/dash-*.js into the dashboard
   markup. Nothing here talks to a server, every number comes from the spec
   files, so the whole thing runs from file://.

   A spec is a list of blocks. Two kinds of block exist:

     { row: [ ...blocks ] }        a 12 column row, each block says c:4, c:8,
                                   c:12 ... for its own width

     { k:"chart" | "table" | ... } a panel, described by its own fields

   Block kinds: hero, chart, table, tabs, bars, funnel, stats, metrics,
   list, tracks, panel. dashboard.js is the single place that knows
   what each of them looks like.
   ========================================================================== */

window.SKDash = (function (w, d) {
  "use strict";

  var SPECS = {};

  /* ======================================================== formatters == */

  function num(v) {
    var n = Number(v);
    return isFinite(n) ? n : 0;
  }

  function qty(v) {
    return num(v).toLocaleString("en-US");
  }

  /* the application's takaFormat: crores, lakhs, then the plain amount */
  function money(v) {
    var n = num(v);
    if (Math.abs(n) >= 1e7) return "৳ " + (n / 1e7).toFixed(2) + " Cr";
    if (Math.abs(n) >= 1e5) return "৳ " + (n / 1e5).toFixed(2) + " L";
    return "৳ " + qty(n);
  }

  /* payroll prints lakh and crore the Bengali way, 1,24,85,600 */
  function taka(v) {
    return "৳ " + num(v).toLocaleString("en-IN");
  }

  function pct(v, digits) {
    return num(v).toFixed(digits == null ? 1 : digits) + "%";
  }

  var FMT = {
    money: money,
    taka: taka,
    qty: qty,
    pct: pct,
    pct0: function (v) { return pct(v, 0); },
    text: function (v) { return v == null ? "" : String(v); }
  };

  function fmtCell(v, f) {
    if (v == null) return "";
    if (typeof v === "object") {
      /* { b:"Delivered" } is a status pill, { t:"..." } is preformatted */
      if (v.b != null) return badge(v.b);
      if (v.t != null) return esc(v.t);
      if (v.v != null) return esc(v.v);
      return "";
    }
    if (typeof f === "function") return esc(f(v));
    var fn = FMT[f || "text"] || FMT.text;
    return esc(fn(v));
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------------------------------------------------------- badges --- */
  var TONE = {
    emerald: ["Approved", "Completed", "Posted", "Closed", "Delivered", "Up",
      "In Hand", "Healthy", "Available", "Active", "Received", "Paid", "Won",
      "Running On Time", "Full", "Ready", "Stocked"],
    sky: ["Running", "Open", "In Production", "Prepared", "In Transit",
      "Dispatched", "Confirmed", "In Process", "Picked"],
    teal: ["Conning", "Cutting", "Finishing", "Boarding", "Packing"],
    indigo: ["Forwarded to Bank", "Bank Acceptance", "Sanctioned"],
    violet: ["Billed", "Forward to Party", "Invoiced", "Submitted"],
    amber: ["Pending", "Partial", "Ready For Delivery", "PI Issue", "Over Produced",
      "Overdue", "Due", "Awaiting", "Processing", "Queued", "Low"],
    rose: ["On Hold", "Not Conning", "Rejected", "Down", "Exhausted", "Delayed",
      "Overdue Payment", "Cancelled", "Failed", "Blocked", "Late"],
    slate: ["Not Conning", "Flat", "Draft", "LC Open", "Forwarded to Party",
      "Not Started", "Inactive", "Closed Order", "None"]
  };

  function tone(label) {
    var s = String(label || "").trim().toLowerCase();
    var keys = Object.keys(TONE);
    for (var i = 0; i < keys.length; i++) {
      if (TONE[keys[i]].some(function (x) { return x.toLowerCase() === s; })) return keys[i];
    }
    if (/(^|\s)(hold|reject|cancel|delay|late|overdue|exhaust|blocked|fail)/.test(s)) return "rose";
    if (/(pending|partial|ready|await|due|low|over)/.test(s)) return "amber";
    if (/(run|open|progress|active|prepar|transit)/.test(s)) return "sky";
    if (/(approv|complet|post|closed|deliver|paid|up|hand|health)/.test(s)) return "emerald";
    return "slate";
  }

  /* a status pill in Tailwind utilities, the dot is a real <i> so nothing
     needs a pseudo-element */
  var TONE_CLS = {
    emerald: "bg-emerald-50 text-emerald-700",
    sky: "bg-sky-100 text-sky-700",
    violet: "bg-violet-100 text-violet-700",
    indigo: "bg-indigo-100 text-indigo-700",
    teal: "bg-teal-100 text-teal-700",
    amber: "bg-amber-100 text-amber-700",
    rose: "bg-amber-100 text-amber-700",
    slate: "bg-slate-100 text-slate-600"
  };

  function badge(label) {
    var cls = TONE_CLS[tone(label)] || TONE_CLS.slate;
    return '<span class="inline-flex flex-none items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11.5px] font-bold tracking-[0.01em] ' + cls + '">' +
      '<i class="h-1.5 w-1.5 flex-none rounded-full bg-current"></i>' + esc(label) + "</span>";
  }

  /* ============================================================ helpers = */

  /* the title and the optional line under it that sit at the top of every
     card. The card used to offer a "View All" link here; only the dashboard
     itself is a real page now, so nothing on a card navigates anywhere. */
  function head(b) {
    var out = '<div class="skd-head-row">';
    out += "<div>";
    if (b.title) out += '<h2 class="skd-title">' + esc(b.title) + "</h2>";
    if (b.sub) out += '<p class="skd-sub">' + esc(b.sub) + "</p>";
    out += "</div>";
    return out + "</div>";
  }

  function card(b, inner) {
    return '<section class="skd-card">' +
      (b.title || b.sub ? head(b) : "") + inner + "</section>";
  }

  /* ============================================================== hero == */
  function hero(b) {
    /* the card puts the title above this, the overview rail fills the rest */
    var out = '<div class="skd-hero-in"><div class="skd-rail">';
    (b.cells || []).forEach(function (c) {
      out += '<div class="skd-hcell' + (c.div ? " div" : "") + '">' +
        '<div class="skd-hlabel">' + esc(c.label) + "</div>" +
        '<div class="skd-hvalue"' + (c.color ? ' style="color:' + c.color + '"' : "") + ">" +
        esc(c.value) + "</div>" +
        (c.pct == null ? "" :
          '<div class="skd-hbar"' + (c.color ? ' style="--c:' + c.color + '"' : "") +
          "><i style=\"width:" + clamp(c.pct) + "%\"></i></div>") +
        "</div>";
    });
    out += "</div>";

    if (b.stats && b.stats.length) {
      out += '<div class="skd-inline">';
      b.stats.forEach(function (s) {
        out += "<div><b" + (s.color ? ' style="color:' + s.color + '"' : "") + ">" +
          esc(s.value) + "</b><span>" + esc(s.label) + "</span></div>";
      });
      out += "</div>";
    }
    out += "</div>";

    return card(b, out);
  }

  function clamp(v) {
    var n = num(v);
    return n < 0 ? 0 : n > 100 ? 100 : n;
  }

  /* ============================================================ charts == */

  /* the numbers on the y axis, money turns into crores and lakhs */
  function axisFmt(kind) {
    if (kind === "money") return function (v) { return money(v); };
    if (kind === "taka") return function (v) { return taka(v); };
    if (kind === "pct") return function (v) { return num(v) + "%"; };
    if (kind === "qty") return function (v) { return qty(v); };
    return function (v) { return qty(v); };
  }

  function buildChart(b, canvas) {
    if (!w.Chart) return;
    var c = b.chart || {};
    var y2 = c.y2;
    var ds = (c.datasets || []).map(function (s) {
      var out = {
        label: s.label || "",
        data: s.data || [],
        backgroundColor: s.bg || "rgba(14, 165, 233, 0.28)",
        borderColor: s.border || s.bg || "#0ea5e9",
        borderWidth: s.w == null ? 1 : s.w
      };
      if (s.borderRadius) out.borderRadius = s.borderRadius;
      if (s.type) out.type = s.type;
      if (s.order) out.order = s.order;
      if (y2 && s.axis === "y2") out.yAxisID = "y2";
      return out;
    });

    var opts = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
label: function (ctx) {
              /* where the number sits depends on the chart: a vertical bar
                 or a line puts it in parsed.y, a horizontal bar leaves the
                 name there and puts the number in parsed.x, and a doughnut
                 or a pie reports the slice number straight away, so the
                 value has to be read from the element instead */
              var p = ctx.parsed;
              var raw;
              if (typeof p === "number") raw = ctx.raw;
              else if (p && typeof p.y === "number") raw = p.y;
              else if (p && typeof p.x === "number") raw = p.x;
              else raw = ctx.raw;
              if (raw == null || !isFinite(raw)) raw = 0;
              /* a dataset can sit on the second axis and read differently */
              var kind = c.yfmt;
              if (y2 && ctx.dataset.yAxisID === "y2") kind = y2.yfmt || kind;
              var v = kind === "pct" ? pct(raw)
                : kind === "money" ? money(raw)
                : kind === "taka" ? taka(raw)
                : qty(raw);
              return ctx.dataset.label ? ctx.dataset.label + ": " + v : v;
            }
          }
        }
      },
      scales: {}
    };

    var isRound = c.type === "doughnut" || c.type === "pie" || c.type === "radar";
    if (!isRound) {
      opts.scales.x = {
        grid: { display: false, borderWidth: 0 },
        ticks: { color: "#64748b", font: { size: 11 }, maxRotation: c.rotate || 0 }
      };
      opts.scales.y = {
        beginAtZero: true,
        grid: { color: "rgba(148, 163, 184, 0.22)", borderWidth: 0 },
        ticks: { color: "#94a3b8", font: { size: 11 }, callback: axisFmt(c.yfmt) }
      };
      if (c.horizontal) {
        opts.indexAxis = "y";
        opts.scales.y.grid.display = true;
        opts.scales.x.grid.display = false;
        opts.scales.x.ticks.callback = axisFmt(c.yfmt);
        opts.scales.y.ticks.callback = function (v) { return qty(v); };
        delete opts.scales.y.beginAtZero;
      }
      if (c.stacked) {
        opts.scales.x.stacked = true;
        opts.scales.y.stacked = true;
      }

      /* a second axis on the right, for a rate or a total that would
         otherwise flatten the bars next to it */
      if (y2) {
        opts.scales.y2 = {
          position: "right",
          beginAtZero: y2.min == null,
          min: y2.min,
          max: y2.max,
          grid: { display: false, borderWidth: 0 },
          ticks: { color: "#94a3b8", font: { size: 11 }, callback: axisFmt(y2.yfmt || c.yfmt) }
        };
      }
    } else if (c.type === "radar") {
      opts.scales.r = {
        grid: { color: "rgba(148, 163, 184, 0.25)" },
        angleLines: { color: "rgba(148, 163, 184, 0.3)" },
        pointLabels: { color: "#475569", font: { size: 11 } },
        ticks: { display: false }
      };
    }

    var plugins = [];
    if (c.type === "doughnut" && b.center) {
      plugins.push(centerText(b.center, b.centerValue || money((c.datasets[0] || {}).data
        .reduce(function (a, x) { return a + num(x); }, 0))));
    }

    return new w.Chart(canvas.getContext("2d"), {
      type: c.type || "bar",
      data: { labels: c.labels || [], datasets: ds },
      options: opts,
      plugins: plugins
    });
  }

  /* the number in the middle of a doughnut */
  function centerText(label, value) {
    return {
      id: "skd-center",
      afterDraw: function (chart) {
        var meta = chart.getDatasetMeta(0);
        if (!meta || !meta.data || !meta.data[0]) return;
        var p = meta.data[0];
        var x = p.x, y = p.y, ctx = chart.ctx;
        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#0f172a";
        ctx.font = "700 19px 'Space Grotesk', system-ui, sans-serif";
        ctx.fillText(value, x, y - 7);
        ctx.fillStyle = "#94a3b8";
        ctx.font = "600 11px 'Space Grotesk', system-ui, sans-serif";
        ctx.fillText(String(label).toUpperCase(), x, y + 13);
        ctx.restore();
      }
    };
  }

  /* the coloured key under a chart, built from the datasets */
  function chartLegend(b) {
    var c = b.chart || {};
    var list = b.legendList;
    if (!list) {
      var ds = (c.datasets || []).filter(function (s) { return s.label; });
      if (ds.length < 2) return "";
      list = ds.map(function (s) {
        return { label: s.label, color: s.border || s.bg };
      });
    }
    if (!list || !list.length) return "";

    var out = '<div class="skd-legend' + (list.length <= 2 ? " one" : "") + '">';
    list.forEach(function (l) {
      out += '<div class="skd-legend-row"><span><i style="--c:' +
        (l.color || "#0ea5e9") + '"></i>' + esc(l.label) + "</span>" +
        (l.value ? "<b>" + esc(l.value) + "</b>" : "") + "</div>";
    });
    return out + "</div>";
  }

  function chart(b) {
    var c = b.chart || {};
    var h = c.height || b.height || 250;
    var out = '<div class="skd-canvas" style="height:' + h + 'px">' +
      '<canvas></canvas></div>' + chartLegend(b);

    if (b.notes && b.notes.length) {
      out += '<div class="skd-notes">';
      b.notes.forEach(function (n) {
        out += '<div class="skd-note-row"><span>' + esc(n.label) + "</span><b>" +
          esc(n.value) + "</b></div>";
      });
      out += "</div>";
    }

    return card(b, out);
  }

  /* ============================================================= tables == */

  function tableHtml(t) {
    var out = "";
    if (t.caption) out += '<p class="skd-cap">' + esc(t.caption) + "</p>";
    out += '<div class="skd-scroll"' + (t.max ? ' style="max-height:' + t.max + 'px"' : "") + ">";
    out += '<table class="skd-table"><thead><tr>';
    t.cols.forEach(function (c) {
      out += '<th class="a-' + (c.a || "l") + '">' + esc(c.t) + "</th>";
    });
    out += "</tr></thead><tbody>";

    if (!t.rows || !t.rows.length) {
      out += '<tr><td colspan="' + t.cols.length + '"><p class="skd-empty">' +
        esc(t.empty || "Nothing to show yet.") + "</p></td></tr>";
    }

    (t.rows || []).forEach(function (r) {
      out += "<tr>";
      t.cols.forEach(function (c, i) {
        out += '<td class="a-' + (c.a || "l") + (c.a === "l" ? "" : " num") + '">' +
          fmtCell(r[i], c.f || (t.fmt && t.fmt[i])) + "</td>";
      });
      out += "</tr>";
    });

    if (t.total) {
      out += '<tr class="total">';
      t.cols.forEach(function (c, i) {
        out += '<td class="a-' + (c.a || "l") + (c.a === "l" ? "" : " num") + '">' +
          fmtCell(t.total[i], c.f || (t.fmt && t.fmt[i])) + "</td>";
      });
      out += "</tr>";
    }

    return out + "</tbody></table></div>";
  }

  function table(b) {
    return card(b, tableHtml(b));
  }

  /* =============================================================== tabs == */
  function tabs(b) {
    var out = '<div class="skd-tabs" role="tablist">';
    b.tabs.forEach(function (t, i) {
      out += '<button type="button" class="skd-tab' + (i ? "" : " is-on") +
        '" role="tab" aria-selected="' + (i ? "false" : "true") +
        '" data-skd-tab="' + esc(b.id || "") + "-" + i + '">' + esc(t.label) + "</button>";
    });
    out += "</div>";

    b.tabs.forEach(function (t, i) {
      out += '<div class="skd-tabpanel" data-skd-panel="' + esc(b.id || "") + "-" + i + '"' +
        (i ? " hidden" : "") + ">" + tableHtml(t) +
        (t.foot ? '<div class="skd-tfoot"><span>' + t.foot.label + "</span></div>" : "") +
        "</div>";
    });

    if (b.foot) {
      out += '<div class="skd-tfoot"><span>' + b.foot.label + "</span></div>";
    }

    return card(b, out);
  }

  /* =============================================================== bars == */
  function bars(b) {
    var out = '<div class="skd-bars">';
    (b.rows || []).forEach(function (r) {
      out += '<div class="skd-barrow"' + (r.c ? ' style="--c:' + r.c + '"' : "") + ">" +
        '<div class="skd-barname"><span>' + esc(r.n) + "</span>" +
        (r.b ? badge(r.b) : "") + "</div>" +
        '<div class="skd-barval">' + esc(r.v == null ? "" : r.v) + "</div>" +
        (r.p == null ? "" :
          '<div class="skd-track"><i style="width:' + clamp(r.p) + '%"></i></div>') +
        (r.note ? '<div class="skd-barfoot">' + esc(r.note) + "</div>" : "") +
        "</div>";
    });
    if (!(b.rows || []).length) out += '<p class="skd-empty">Nothing to show yet.</p>';
    out += "</div>";

    if (b.foot) {
      out += '<div class="skd-tfoot"><span>' + b.foot.label + "</span></div>";
    }

    return card(b, out);
  }

  /* ============================================================= funnel == */
  function funnel(b) {
    var out = '<div class="skd-funnel">';
    (b.steps || []).forEach(function (s, i) {
      out += '<div class="skd-fstep"' + (s.c ? ' style="--c:' + s.c + '"' : "") + ">" +
        '<div class="skd-fstep-top"><b>' + esc(s.step) + "</b><span>" +
        esc(s.v == null ? "" : s.v) + "</span></div>" +
        (s.note ? "<small>" + esc(s.note) + "</small>" : "") + "</div>";

      var carry = (b.carry || [])[i];
      if (carry) {
        out += '<div class="skd-fcarry">' + esc(carry.t) +
          (carry.n != null ? " <b>" + esc(carry.n) + "</b>" : "") + "</div>";
      }
    });
    out += "</div>";
    return card(b, out);
  }

  /* ============================================================== stats == */
  /* stats and metrics carry their own heading, so they are not put
     in a card like the rest */
  function bare(b, inner) {
    if (!b.title && !b.sub && !b.link) return inner;
    return card(b, inner);
  }

  function stats(b) {
    var out = '<div class="skd-stats">';
    (b.cards || []).forEach(function (s) {
      out += '<div class="skd-stat' + (s.big ? " big" : "") + '"' +
        (s.c ? ' style="--c:' + s.c + '"' : "") + ">" +
        "<span>" + esc(s.label) + "</span><b>" + esc(s.value) + "</b>" +
        (s.sub ? "<small>" + esc(s.sub) + "</small>" : "") + "</div>";
    });
    return bare(b, out + "</div>");
  }

  /* ============================================================ metrics == */
  function metrics(b) {
    var out = '<div class="skd-metrics" style="--mc:' + b.cols.length + '">';
    out += "<h2>" + esc(b.title || "Metrics Overview") + "</h2>";
    out += '<div class="skd-mhead"><div></div>';
    b.cols.forEach(function (c) { out += "<div>" + esc(c) + "</div>"; });
    out += "</div><div class=" + '"skd-mbody" style="--mc:' + b.cols.length + '">';

    (b.rows || []).forEach(function (r) {
      out += '<div class="skd-mrow" style="--c:' + (r.c || "#0ea5e9") + '">';
      out += "<label>" + SK.icon(r.icon || "empty") + "<span>" + esc(r.label) + "</span></label>";
      r.values.forEach(function (v) {
        out += "<div>" + esc(v) + "</div>";
      });
      out += "</div>";
    });

    return out + "</div></div>";
  }

  /* =============================================================== list == */
  function list(b) {
    var out = '<ul class="skd-list">';
    (b.items || []).forEach(function (it) {
      var initial = String(it.t || "?").trim().charAt(0).toUpperCase();
      out += "<li>" +
        '<span class="skd-dot"' + (it.c ? ' style="--c:' + it.c + '"' : "") + ">" +
        esc(initial) + "</span>" +
        '<span class="skd-list-txt"><b>' + esc(it.t) + "</b>" +
        (it.s ? "<span>" + esc(it.s) + "</span>" : "") + "</span>" +
        (it.b ? badge(it.b) : it.v ? '<span class="skd-list-v">' + esc(it.v) + "</span>" : "") +
        "</li>";
    });
    if (!(b.items || []).length) out += '<li><p class="skd-empty">Nothing to show yet.</p></li>';
    out += "</ul>";

    if (b.foot) {
      out += '<div class="skd-tfoot"><span>' + b.foot.label + "</span></div>";
    }
    return card(b, out);
  }

  /* ============================================================= tracks == */
  function tracks(b) {
    var out = '<div class="skd-tracks">';
    (b.rows || []).forEach(function (r) {
      out += '<div class="skd-trackrow"' + (r.c ? ' style="--c:' + r.c + '"' : "") + ">" +
        '<div class="skd-trackrow-top"><span>' + esc(r.label) + "</span><b>" +
        esc(r.v == null ? "" : r.v) + "</b></div>" +
        (r.p == null ? "" :
          '<div class="skd-track"><i style="width:' + clamp(r.p) + '%"></i></div>') +
        "</div>";
    });
    out += "</div>";

    if (b.total && b.total.length) {
      out += '<div class="skd-tracks-total">';
      b.total.forEach(function (t) {
        out += "<div><span>" + esc(t.label) + "</span><b>" + esc(t.value) + "</b></div>";
      });
      out += "</div>";
    }
    return card(b, out);
  }

  /* ============================================================== panel == */
  function panel(b) {
    return card(b, '<div class="skd-body">' + (b.body || "") + "</div>");
  }

  /* ============================================================== blocks = */
  var KINDS = {
    hero: hero, chart: chart, table: table, tabs: tabs, bars: bars,
    funnel: funnel, stats: stats, metrics: metrics,
    list: list, tracks: tracks, panel: panel
  };

  function renderBlock(b) {
    if (!b || !KINDS[b.k]) return "";

    return '<div class="skd-in" style="grid-column:span ' + (b.c || 12) +
      '"' + (b.k === "chart" ? ' data-skd-chart="' + esc(b.id || "") + '"' : "") + ">" +
      KINDS[b.k](b) + "</div>";
  }

  function renderRow(r) {
    return '<div class="skd-row">' + (r || []).map(renderBlock).join("") + "</div>";
  }

  function renderBlocks(blocks) {
    return (blocks || []).map(function (b) {
      return b.row ? renderRow(b.row) : renderBlock(b);
    }).join("");
  }

  /* ================================================================ page = */

  /* the row of module buttons above a dashboard */
  function switcher(active) {
    return '<nav class="skd-switch" aria-label="Dashboards">' +
      w.SK.menu.map(function (m) {
        return '<a class="skd-switch-btn' + (m.key === active ? " is-on" : "") +
          '" href="' + (w.SK.isDashboard ? w.SK.dashboardHref(m.key) : w.SK.href(m.url)) +
          '" style="--m:' + m.color + '"' + (m.key === active ? ' aria-current="page"' : "") +
          ">" + w.SK.iconImg(m.icon) + "<span>" + w.SK.esc(m.name) + "</span></a>";
      }).join("") + "</nav>";
  }

  function head2(spec, mod) {
    var color = mod ? mod.color : "var(--sk-accent)";
    return '<div class="skd-head"><div class="skd-head-txt">' +
      "<h1>" + w.SK.esc(spec.title) + "</h1>" +
      (spec.note ? "<p>" + w.SK.esc(spec.note) + "</p>" : "") +
      '</div><span class="skd-head-tag" style="--sk-accent:' + color + '"><i></i>' +
      w.SK.esc(mod ? mod.name + " Dashboard" : "Dashboard") + "</span></div>";
  }

  /* --------------------------------------------------------- charts ----- */
  /* the charts of the dashboard that is on screen, so switching modules can
     throw the old ones away instead of leaving them attached to nothing */
  var LIVE = [];

  function dropCharts() {
    LIVE.forEach(function (c) {
      try { c.destroy(); } catch (e) { /* already gone */ }
    });
    LIVE = [];
  }

  function mountCharts(root) {
    if (!w.Chart) return;
    [].slice.call(root.querySelectorAll(".skd-canvas canvas")).forEach(function (c) {
      if (c.dataset.skdDone) return;
      c.dataset.skdDone = "1";
      var block = c.closest("[data-skd-chart]");
      try {
        if (block && block.__skd) LIVE.push(buildChart(block.__skd, c));
      } catch (e) {
        /* a broken spec must not take the page down */
      }
    });
  }

  /* --------------------------------------------------------- drawChart --
     Draws one chart into a canvas that is already on the page.

     A page that keeps its own markup (modules/order/index.html) has the
     canvas written in the HTML and the numbers in its own data file, so it
     needs to hand the two over here rather than go through renderBlocks.
     Returns the chart, or null if Chart.js has not loaded. */
  function drawChart(canvas, spec) {
    if (!canvas || !spec || !w.Chart) return null;
    try {
      /* center/centerValue live on the spec, buildChart reads them from
         the block, so they are handed across here */
      var block = { k: "chart", chart: spec };
      if (spec.center != null) block.center = spec.center;
      if (spec.centerValue != null) block.centerValue = spec.centerValue;

      var chart = buildChart(block, canvas);
      LIVE.push(chart);
      return chart;
    } catch (e) {
      /* a bad data set must not take the page down */
      return null;
    }
  }

  /* the chart specs are looked up through the wrapper, so the canvas can be
     filled in after the markup is on the page */
  function bindCharts(root, blocks) {
    (function walk(blocks) {
      (blocks || []).forEach(function (b) {
        if (b.row) return walk(b.row);
        if (b.k === "chart") {
          var wrap = root.querySelector('[data-skd-chart="' + b.id + '"]');
          if (wrap) wrap.__skd = b;
        }
      });
    })(blocks);
  }

  /* ================================================================ API == */

  function register(key, spec) {
    SPECS[key] = spec;
  }

  function spec(key) {
    return SPECS[key] || null;
  }

  function mod(key) {
    return w.SK.menu.filter(function (m) { return m.key === key; })[0] || null;
  }

  /* draws one dashboard into host, with the module switcher above it */
  function render(host, key) {
    var s = SPECS[key];
    if (!s) {
      dropCharts();
      host.innerHTML = '<p class="skd-empty">That dashboard is not available.</p>';
      return;
    }
    var m = mod(key);
    dropCharts();
    host.innerHTML =
      '<div class="skd-body-host">' + renderBlocks(s.blocks) + "</div>";

    var root = host.querySelector(".skd-body-host");
    bindCharts(root, s.blocks);
    mountCharts(root);
    return root;
  }

  /* the same dashboard without the switcher, for modules/<key>/index.html */
  function renderModule(host, key) {
    var s = SPECS[key];
    if (!s) return null;
    var m = mod(key);
    dropCharts();
    host.innerHTML = '<div class="skd-page">' +
      '<div class="skd-body-host">' + renderBlocks(s.blocks) + "</div></div>";
    var root = host.querySelector(".skd-body-host");
    boot();
    bindCharts(root, s.blocks);
    mountCharts(root);
    return root;
  }

  /* click anywhere on the document switches tab panels */
  var booted = false;
  function boot() {
    if (booted) return;
    booted = true;

    d.addEventListener("click", function (e) {
      var btn = e.target.closest(".skd-tab");
      if (!btn) return;
      var wrap = btn.closest(".skd-card");
      if (!wrap) return;
      var id = btn.getAttribute("data-skd-tab");

      [].slice.call(wrap.querySelectorAll(".skd-tab")).forEach(function (t) {
        var on = t === btn;
        t.classList.toggle("is-on", on);
        t.setAttribute("aria-selected", String(on));
      });
      [].slice.call(wrap.querySelectorAll(".skd-tabpanel")).forEach(function (p) {
        p.hidden = p.getAttribute("data-skd-panel") !== id;
      });
    });

    /* charts drawn before the fonts land come out squashed */
    if (w.document.fonts && w.document.fonts.ready) {
      w.document.fonts.ready.then(function () {
        [].slice.call(d.querySelectorAll("[data-chart]")).forEach(function (c) {
          var box = c.parentNode;
          if (box) box.style.height = box.offsetHeight + "px";
        });
      });
    }
  }

  return {
    register: register,
    spec: spec,
    render: render,
    renderModule: renderModule,
    drawChart: drawChart,
    boot: boot,
    helpers: { money: money, taka: taka, qty: qty, pct: pct, esc: esc, badge: badge }
  };
})(window, document);