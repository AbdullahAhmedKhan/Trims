/* ==========================================================================
   SK Trims ERP - MENU CONFIG  +  SHARED HELPERS
   --------------------------------------------------------------------------
   window.APP_MENU below is the only place the menu is defined. The header
   menu, the modules popup, the footer and the homepage are all built from
   it.

   The structure here is the one supplied for this project:

       Module
         |- Dashboard
         |- Operation | Report | Configuration   (the groups, each opens
         |                                       a further level of items)
         |    \- item

   Payroll groups are Function / Manage Data / Security / Process / Reports
   and Accounts groups are Manage Voucher / Reports. Spelling of the labels
   is kept exactly as given.

   Sub item pages
   --------------
   Every leaf opens its own page:

       modules/<key>/index.html            the module Dashboard
       modules/<key>/item.html?id=<slug>   one page per sub item

   Slugs and urls are generated from the labels below, so no leaf can point
   at a page that does not exist. Two leaves with the same label (Payroll
   has Salary, Bonus and Earn Leave under both Process and Reports) get a
   group prefix so their urls stay different.
   ========================================================================== */

/* --------------------------------------------------------------- icons --
   Icons are used only for the modules popup and the homepage tiles. The
   top menu is plain text, like the navbar in the live application.       */
window.SK_ICONS = {
  order: '<svg class="sk-svg" viewBox="0 0 24 24"><path d="M6 3.5h12a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 19V5A1.5 1.5 0 0 1 6 3.5z"/><path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4"/></svg>',
  production: '<svg class="sk-svg" viewBox="0 0 24 24"><path d="M2.5 20.5h19"/><path d="M5 20.5v-6h4v6M9 20.5v-9h4v9M13 20.5v-5h4v5"/><path d="M5 11.5 12 4l7 7.5"/><path d="M9.5 8h5"/></svg>',
  delivery: '<svg class="sk-svg" viewBox="0 0 24 24"><path d="M2.5 6.5h10.5v10H2.5z"/><path d="M13 10h4l4 3.5v3H13z"/><circle cx="6.5" cy="18" r="1.9"/><circle cx="17" cy="18" r="1.9"/></svg>',
  billing: '<svg class="sk-svg" viewBox="0 0 24 24"><path d="M6 3h12a1 1 0 0 1 1 1v17l-2.5-1.5L14 21l-2-1.5L10 21l-2.5-1.5L5 21V4a1 1 0 0 1 1-1z"/><path d="M8.5 8.5h7M8.5 12.5h7"/></svg>',
  stock: '<svg class="sk-svg" viewBox="0 0 24 24"><path d="M12 2.7 20.5 7v10L12 21.3 3.5 17V7z"/><path d="M3.5 7 12 11.4 20.5 7M12 11.4V21.3"/></svg>',
  commercial: '<svg class="sk-svg" viewBox="0 0 24 24"><rect x="2.5" y="7" width="19" height="13" rx="2"/><path d="M8.5 7V5.4A1.9 1.9 0 0 1 10.4 3.5h3.2a1.9 1.9 0 0 1 1.9 1.9V7M2.5 12.5h19"/></svg>',
  payroll: '<svg class="sk-svg" viewBox="0 0 24 24"><circle cx="9.5" cy="8" r="3.5"/><path d="M2.5 20v-1.5A4.5 4.5 0 0 1 7 14h5a4.5 4.5 0 0 1 4.5 4.5V20"/><path d="M18 7.5h4M20 5.5v4"/></svg>',
  accounts: '<svg class="sk-svg" viewBox="0 0 24 24"><rect x="4" y="2.5" width="16" height="19" rx="2.2"/><path d="M8 6.5h8M8 11h2M14 11h2M8 15h2M14 15h2M8 18.5h8"/></svg>',

  home: '<svg class="sk-svg" viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9.6V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.6"/></svg>',
  grid: '<svg class="sk-svg" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.6"/><rect x="14" y="3" width="7" height="7" rx="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.6"/></svg>',
  burger: '<svg class="sk-svg" viewBox="0 0 24 24"><path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17"/></svg>',
  close: '<svg class="sk-svg" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg>',
  caret: '<svg class="sk-svg sk-caret" viewBox="0 0 24 24"><path d="m6 9.5 6 6 6-6"/></svg>',
  right: '<svg class="sk-svg sk-caret" viewBox="0 0 24 24"><path d="m9.5 6 6 6-6 6"/></svg>',
  empty: '<svg class="sk-svg" viewBox="0 0 24 24"><path d="M4 7.5 12 3.5l8 4v9l-8 4-8-4z"/><path d="M4 7.5 12 11.5l8-4M12 11.5v9"/></svg>',
  logout: '<svg class="sk-svg sk-svg-sm" viewBox="0 0 24 24"><path d="M14 8V5.5A1.5 1.5 0 0 0 12.5 4h-6A1.5 1.5 0 0 0 5 5.5v13A1.5 1.5 0 0 0 6.5 20h6a1.5 1.5 0 0 0 1.5-1.5V16"/><path d="M10 12h10M20 12l-3-3M20 12l-3 3"/></svg>',
  user: '<svg class="sk-svg" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.6"/><path d="M4.6 20.5v-1.1a5.9 5.9 0 0 1 5.9-5.9h3a5.9 5.9 0 0 1 5.9 5.9v1.1"/></svg>',
  cog: '<svg class="sk-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'
};

/* ------------------------------------------------------------ page slug --
   "PI terms & condition" -> "pi-terms-condition"
   "&" is dropped rather than turned into "and", so the url stays short.
   The same slug is used to build the url and to read the ?id= on the way
   back, so the two can never drift apart.                              */
function skSlug(s) {
  return String(s == null ? "" : s)
    .toLowerCase()
    .replace(/\s*&\s*/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* ============================================================== THE MENU ==
   key   : folder name
   name  : the label shown in the menu bar
   icon  : a key from SK_ICONS above (popup and homepage only)
   color : accent colour of the module
   url   : the module dashboard
   items : the sub items. An item with its own items array is a group and
           opens one more level.
   ---------------------------------------------------------------------- */
window.APP_MENU = [

  /* ======================================================== 1. ORDER === */
  {
    key: 'order', name: 'Order', icon: 'order', color: '#f43f5e',
    url: 'modules/order/index.html',
    items: [
      { title: 'Dashboard', dash: true },
      {
        title: 'Operation',
        items: [
          { title: 'Manage Order' },
          { title: 'Manage Approval' },
          { title: 'Work Order' },
          { title: 'Delivery Schedule' },
          { title: 'New delivery schedule' }
        ]
      },
      {
        title: 'Report',
        items: [{ title: 'Order Summary' }]
      },
      {
        title: 'Configuration',
        items: [
          { title: 'Party' },
          { title: 'Buyer' },
          { title: 'Manage Payment Method' }
        ]
      }
    ]
  },

  /* =================================================== 2. PRODUCTION === */
  {
    key: 'production', name: 'Production', icon: 'production', color: '#f59e0b',
    url: 'modules/production/index.html',
    items: [
      { title: 'Dashboard', dash: true },
      {
        title: 'Operation',
        items: [
          { title: 'Board Making' },
          { title: 'Cartoon Finishing' },
          { title: 'Production' },
          { title: 'Other Accessories Production' }
        ]
      },
      {
        title: 'Report',
        items: [
          { title: 'Details report' },
          { title: 'Production Summary' },
          { title: 'Addi Work Report' },
          { title: 'Production Print' }
        ]
      },
      {
        title: 'Configuration',
        items: [
          { title: 'Manage Item Count' },
          { title: 'Addi Work' },
          { title: 'Lock BM Date' }
        ]
      }
    ]
  },

  /* ====================================================== 3. DELIVERY === */
  {
    key: 'delivery', name: 'Delivery', icon: 'delivery', color: '#06b6d4',
    url: 'modules/delivery/index.html',
    items: [
      { title: 'Dashboard', dash: true },
      {
        title: 'Operation',
        items: [
          { title: 'Delivery' },
          { title: 'delivery challan' },
          { title: 'gate pass' }
        ]
      },
      {
        title: 'Report',
        items: [
          { title: 'Delivery Report' },
          { title: 'Finance Report' }
        ]
      },
      {
        title: 'Configuration',
        items: [{ title: 'Delivery Print Options' }]
      }
    ]
  },

  /* ====================================================== 4. BILLING === */
  {
    key: 'billing', name: 'Billing', icon: 'billing', color: '#8b5cf6',
    url: 'modules/billing/index.html',
    items: [
      { title: 'Dashboard', dash: true },
      {
        title: 'Operation',
        items: [
          { title: 'Create new bill' },
          { title: 'bill list' },
          { title: 'billing status' }
        ]
      },
      {
        title: 'Report',
        items: [{ title: 'Costing History' }]
      },
      {
        title: 'Configuration',
        items: [
          { title: 'Costing Head' },
          { title: 'Team Target' }
        ]
      }
    ]
  },

  /* ======================================================== 5. STOCK === */
  {
    key: 'stock', name: 'Stock', icon: 'stock', color: '#14b8a6',
    url: 'modules/stock/index.html',
    items: [
      { title: 'Dashboard', dash: true },
      {
        title: 'Operation',
        items: [
          { title: 'Manage Purchase Order' },
          { title: 'Manage Requisition' },
          { title: 'Main Warehouse' },
          { title: 'Stock in process' },
          { title: 'Import Management' }
        ]
      },
      {
        title: 'Report',
        items: [
          { title: 'Stock Report' },
          { title: 'Current inventory' },
          { title: 'Stock Used History' }
        ]
      },
      {
        title: 'Configuration',
        items: [
          { title: 'Color' },
          { title: 'Units' },
          { title: 'Item' },
          { title: 'Specification' },
          { title: 'Grade' },
          { title: 'material' },
          { title: 'Manage Materials Group' },
          { title: 'Brand' },
          { title: 'Supplier' },
          { title: 'Department' },
          { title: 'Inventory History' }
        ]
      }
    ]
  },

  /* =================================================== 6. COMMERCIAL === */
  {
    key: 'commercial', name: 'Commercial', icon: 'commercial', color: '#0ea5e9',
    url: 'modules/commercial/index.html',
    items: [
      { title: 'Dashboard', dash: true },
      {
        title: 'Operation',
        items: [
          { title: 'proforma Invoice' },
          { title: 'Job wise PI' },
          { title: 'commercial list' },
          { title: 'commercial tracking' }
        ]
      },
      {
        title: 'Report',
        items: [{ title: 'commercial report' }]
      },
      {
        title: 'Configuration',
        items: [
          { title: 'Party Name for Commercial' },
          { title: 'party bank' },
          { title: 'own bank' },
          { title: 'product name for PI' },
          { title: 'PI More Info' },
          { title: 'PI terms & condition' }
        ]
      }
    ]
  },

  /* ===================================================== 7. PAYROLL === */
  {
    key: 'payroll', name: 'Payroll', icon: 'payroll', color: '#ec4899',
    url: 'modules/payroll/index.html',
    items: [
      { title: 'Dashboard', dash: true },
      {
        title: 'Function',
        items: [
          { title: 'Employee' },
          { title: 'Leave Applied' },
          { title: 'ID Card' },
          { title: 'Salary Settings' },
          { title: 'Imports' }
        ]
      },
      {
        title: 'Manage Data',
        items: [
          { title: 'Departments' },
          { title: 'Designation' },
          { title: 'Shift' },
          { title: 'Holiday' },
          { title: 'OT Permission' },
          { title: 'Shift Permission' }
        ]
      },
      {
        title: 'Security',
        items: [
          { title: 'Users' },
          { title: 'Role' },
          { title: 'Permission' },
          { title: 'Settings' },
          { title: 'Lock Data' }
        ]
      },
      {
        title: 'Process',
        items: [
          { title: 'Attendance' },
          { title: 'Salary' },
          { title: 'Payment' },
          { title: 'Advance Payment' },
          { title: 'Bonus' },
          { title: 'Earn Leave' }
        ]
      },
      {
        title: 'Reports',
        items: [
          { title: 'Daily In Out' },
          { title: 'Job Card' },
          { title: 'Monthly' },
          { title: 'Salary' },
          { title: 'Bonus' },
          { title: 'Earn Leave' },
          { title: 'Leave' }
        ]
      }
    ]
  },

  /* ==================================================== 8. ACCOUNTS === */
  {
    key: 'accounts', name: 'Accounts', icon: 'accounts', color: '#6366f1',
    url: 'modules/accounts/index.html',
    items: [
      { title: 'Dashboard', dash: true },
      { title: 'Legder' },
      { title: 'Cost Centre' },
      {
        title: 'Manage Voucher',
        items: [
          { title: 'Receipt Voucher' },
          { title: 'Payment Voucher' },
          { title: 'Journal Voucher' },
          { title: 'Contra voucher' },
          { title: 'Sales Voucher' },
          { title: 'Purchase Voucher' }
        ]
      },
      {
        title: 'Reports',
        items: [
          { title: 'Daybook' },
          { title: 'Ledger Report' },
          { title: 'Trail Balance' }
        ]
      }
    ]
  }
];

/* ==================================================== slugs and urls =====
   Walks the menu and gives every item a slug and a url:

     Dashboard  ->  modules/<key>/index.html   (the module dashboard)
     leaf       ->  modules/<key>/item.html?id=<slug>
     group      ->  no url, it only opens one more level

   Payroll repeats three labels (Salary, Bonus and Earn Leave sit under
   both Process and Reports). Two items with the same slug would share a
   page and only the first would light up, so a repeat gets the group
   name in front of it: process-salary and reports-salary.             */
(function (w) {
  w.APP_MENU.forEach(function (mod) {
    var base = mod.url.replace(/index\.html$/i, "");
    var used = {};

    function assign(items, group) {
      (items || []).forEach(function (it) {
        var slug;

        /* the module Dashboard points at the module page itself */
        if (it.dash) {
          it.slug = "__dash";
          it.url = mod.url;
          return;
        }

        slug = skSlug(it.title);
        if (Object.prototype.hasOwnProperty.call(used, slug)) {
          slug = skSlug(group) + "-" + slug;
        }
        used[slug] = true;
        it.slug = slug;

        /* a group opens one more level, so it needs no page of its own */
        if (it.items && it.items.length) {
          assign(it.items, it.title);
        } else {
          it.url = base + "item.html?id=" + slug;
        }
      });
    }

    assign(mod.items, "");
  });
})(window);

/* ============================================================== SETTINGS == */
window.APP_CONFIG = {
  name: 'SK Trims',
  sub: 'ERP',
  initial: 'SK',
  user: { name: 'Admin', role: 'Administrator' },
  logout: 'Login/logout'
};

/* =============================================================== HELPERS ==
   Used by header.js, footer.js, app.js and module-page.js.
   ---------------------------------------------------------------------- */
window.SK = (function (w) {
  var MENU = w.APP_MENU;
  var CFG = w.APP_CONFIG;

  /* project root, worked out from the address of the current page:
       .../Module/index.html                   ->  .../Module/
       .../Module/modules/order/item.html      ->  .../Module/
       .../Module/modules/order/index.html     ->  .../Module/            */
  var ROOT = (function () {
    var p = w.location.pathname;
    var m = p.match(/\/modules\/[^/]+\//i);
    if (m) return p.slice(0, m.index + 1);
    return p.replace(/[^/]*$/, "");
  })();

  function href(url) {
    return ROOT + String(url || "").replace(/^\/+/, "");
  }

  /* canonical form of a path, used to match the menu with the address bar */
  function norm(p) {
    return decodeURIComponent(String(p == null ? "" : p))
      .replace(/\\/g, "/")
      .replace(/[?#].*$/, "")
      .replace(/\/index\.html$/i, "/")
      .replace(/\/+$/, "")
      .toLowerCase();
  }

  function here() {
    return norm(w.location.pathname);
  }

  /* the ?id= of a sub item page, empty on a dashboard */
  function itemId() {
    var m = w.location.search.match(/[?&]id=([^&#]*)/i);
    return m ? decodeURIComponent(m[1]).toLowerCase() : "";
  }

  function icon(name) {
    return (w.SK_ICONS && w.SK_ICONS[name]) || w.SK_ICONS.empty || "";
  }

  /* module icons are pictures in assets/icons, named after the module key */
  function iconImg(name, cls) {
    return (
      '<img class="sk-img' + (cls ? " " + cls : "") + '" src="' +
      href("assets/icons/" + name + ".png") +
      '" alt="" width="512" height="512" loading="lazy" decoding="async">'
    );
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /** the module that owns the current address, null on the home page */
  function activeModule() {
    /* dashboard.html holds every module, the address bar says which one */
    if (isDashboard()) return dashboardModule() || MENU[0] || null;

    var path = here();
    for (var i = 0; i < MENU.length; i++) {
      var base = norm(href(MENU[i].url));
      if (path === base || path.indexOf(base + "/") === 0) return MENU[i];
    }
    return null;
  }

  /* --------------------------------------------------------------- the
     dashboard page. It carries every module's dashboard in one file, so
     #m in the address bar says which one is on screen. #m is read first
     because switching modules does not reload the page.                     */
  var DASH_PAGE = "dashboard.html";

  function isDashboard() { return false; }
  function dashboardKey() { return ""; }
  function dashboardModule() { return null; }
  function dashboardHref(key) { return href(MENU.filter(function(m){return m.key===key})[0] ? MENU.filter(function(m){return m.key===key})[0].url : ""); }

  /**
   * The sub item the current address is showing, or null on a dashboard.
   * Walks groups as well, so trail holds every level above the leaf:
   * Accounts > Manage Voucher > Receipt Voucher gives two entries.
   */
  function activeItem(mod) {
    if (!mod) return null;
    var id = itemId();
    if (!id || id === "__dash") return null;

    var found = null;

    (function walk(items, trail) {
      (items || []).forEach(function (it) {
        if (!found && !it.dash && it.slug === id) {
          found = { item: it, trail: trail.concat(it) };
        }
        if (it.items) walk(it.items, trail.concat(it));
      });
    })(mod.items, []);

    return found;
  }

  return {
    root: ROOT,
    href: href,
    norm: norm,
    here: here,
    itemId: itemId,
    icon: icon,
    iconImg: iconImg,
    esc: esc,
    activeModule: activeModule,
    activeItem: activeItem,
    isDashboard: isDashboard,
    dashboardPage: function () { return DASH_PAGE; },
    dashboardKey: dashboardKey,
    dashboardModule: dashboardModule,
    dashboardHref: dashboardHref,
    get menu() {
      return MENU;
    },
    get config() {
      return CFG;
    }
  };
})(window);