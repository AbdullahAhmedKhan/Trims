/* ==========================================================================
   SK Trims ERP - HEADER
   --------------------------------------------------------------------------
   Builds the header at the top of the page.

   The menu bar is plain text module names, the same idea as the navbar in
   the live application (application/views/template.php):
     - the module NAME opens that module's dashboard
     - the small ARROW next to it opens the drop down of sub items
     - sub items that have their own items array open one more level

   Everything comes from APP_MENU in menu.js.
   ========================================================================== */

window.SKHeader = (function (w, d) {
  "use strict";

  /* the width at which the menu becomes a drawer, kept in step with the
     899px breakpoint in assets/css/style.css */
  function isNarrow() {
    return !!(w.matchMedia && w.matchMedia("(max-width: 899px)").matches);
  }

  /* ------------------------------------------------------- sub menus -- */
  /* builds one drop down level, recursing for the next one */
  function buildLevel(items, mod, depth, cur, open) {
    var html = '<ul class="sk-sm" data-level="' + depth + '">';

    items.forEach(function (it) {
      var label = SK.esc(it.title);
      var on = !!cur && it.slug === cur;
      var isGroup = it.items && it.items.length;
      var isOpen = !!(open && open[it.slug]);

      if (isGroup) {
        /* a group: Operation / Report / Configuration / Manage Voucher ... */
        html +=
          '<li class="sk-si is-group' + (on ? " is-active" : "") + (isOpen ? " is-open" : "") + '">' +
          '<button type="button" class="sk-sibtn" aria-expanded="' + (isOpen ? "true" : "false") + '"' +
          (on ? ' aria-current="true"' : "") + ">" +
          "<span>" + label + "</span>" + SK.icon("caret") +
          "</button>" +
          buildLevel(it.items, mod, depth + 1, cur, open) +
          "</li>";
      } else {
        /* a leaf: Dashboard, or a sub item with its own page */
        html +=
          '<li class="sk-si' + (on ? " is-active" : "") + '">' +
          '<a class="sk-slink" href="' + SK.href(it.url) + '"' +
          (on ? ' aria-current="page"' : "") + "><span>" + label + "</span>" +
          SK.icon("right") + "</a>" +
          "</li>";
      }
    });

    return html + "</ul>";
  }

  /* ------------------------------------------------------ module bar --
     The bar takes one of two shapes.

     Inside a module only that module's items sit in the bar: the module
     you are already in does not need to be named again.

     On the homepage no module owns the page, so the bar names EVERY
     module instead. Each name opens that module's dashboard and the small
     arrow beside it opens that module's own sub menu, one panel per
     module, exactly like the bar inside a module.                     */
  function buildNav() {
    var active = SK.activeModule();
    if (!active) return buildAllNav();
    var hit = SK.activeItem(active);

    /* on a phone there is no hover, so the panel holding the open item is
       expanded on load, otherwise it would sit hidden inside a closed
       panel. Only the module being looked at is expanded. */
    var narrow = isNarrow();
    var open = {};
    if (hit && narrow) {
      hit.trail.forEach(function (it) {
        if (it.items && it.items.length) open[it.slug] = true;
      });
    }

    /* Show the active module's first level directly in the bar. Items with
       children open their own submenu; dashboard and leaf items navigate. */
    var cur = hit ? hit.item.slug : "__dash";
    var html = '<ul class="sk-menu">';

    active.items.forEach(function (it) {
      var hasChildren = it.items && it.items.length;
      var isCurrent = !!(hit && (hit.item.slug === it.slug || hit.trail.some(function (node) {
        return node.slug === it.slug;
      }))) || (!hit && it.dash);

      if (hasChildren) {
        var isOpen = !!(narrow && open[it.slug]);
        html +=
          '<li class="sk-mi' + (isCurrent ? " is-active" : "") + (isOpen ? " is-open" : "") + '" style="--m:' + active.color + '">' +
          '<button type="button" class="sk-sibtn sk-topmenu-btn" aria-expanded="' + (isOpen ? "true" : "false") + '"' +
          (isCurrent ? ' aria-current="true"' : "") + '><span>' + SK.esc(it.title) + "</span>" + SK.icon("caret") + "</button>" +
          buildLevel(it.items, active, 1, cur, open) +
          "</li>";
      } else {
        html +=
          '<li class="sk-mi' + (isCurrent ? " is-active" : "") + '" style="--m:' + active.color + '">' +
          '<div class="sk-mrow' + (isCurrent ? " is-active" : "") + '">' +
          '<a class="sk-mlink" href="' + SK.href(it.url) + '"' +
          (isCurrent ? ' aria-current="page"' : "") + ">" + SK.esc(it.title) + "</a>" +
          "</div></li>";
      }
    });

    return html + "</ul>";
  }

  /* ------------------------------------------ the homepage menu bar --
     One entry per module, in the order they sit in APP_MENU. The module
     NAME is a link to its dashboard and the ARROW beside it is a button
     that opens that module's sub menu, so both ways of getting in stay
     available from the bar.

     The panel under each one is built by buildLevel, so a module with
     groups (Order, Payroll, Accounts...) unfolds the same way here as it
     does inside the module itself. Nothing is marked active: no sub item
     page is open on the homepage.                                          */
  function buildAllNav() {
    var html = '<ul class="sk-menu">';

    SK.menu.forEach(function (mod) {
      html +=
        '<li class="sk-mi" style="--m:' + mod.color + '">' +
        '<div class="sk-mrow">' +
        '<a class="sk-mlink" href="' + SK.href(mod.url) + '">' + SK.esc(mod.name) + "</a>" +
        '<button type="button" class="sk-mcaret" aria-expanded="false" aria-label="' +
        SK.esc(mod.name + " sub menu") + '">' + SK.icon("caret") + "</button>" +
        "</div>" +
        buildLevel(mod.items, mod, 1, "", {}) +
        "</li>";
    });

    return html + "</ul>";
  }

  /* ---------------------------------------------- menu search -------- */
  function buildSearch() {
    var links = [];

    SK.menu.forEach(function (mod) {
      links.push('<a class="sk-search-result" href="' + SK.esc(SK.href(mod.url)) + '" data-search="' +
        SK.esc((mod.name + " " + mod.name + " dashboard").toLowerCase()) + '"><span>' +
        SK.esc(mod.name) + '</span><small>Dashboard</small></a>');

      function walk(items, parents) {
        (items || []).forEach(function (it) {
          var path = [mod.name].concat(parents, it.title);
          if (it.items && it.items.length) {
            walk(it.items, parents.concat(it.title));
          } else if (it.url && !it.dash) {
            links.push('<a class="sk-search-result" href="' + SK.esc(SK.href(it.url)) + '" data-search="' +
              SK.esc(path.join(" ").toLowerCase()) + '"><span>' + SK.esc(it.title) +
              '</span><small>' + SK.esc(path.slice(0, -1).join(" / ")) + '</small></a>');
          }
        });
      }
      walk(mod.items, []);
    });

    return '<div class="sk-menu-search" id="skMenuSearch">' +
      '<label class="sk-search-box"><svg class="sk-svg" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3"/><path d="m15.5 15.5 4.2 4.2"/></svg>' +
      '<input id="skMenuSearchInput" type="search" placeholder="Search menus..." autocomplete="off" aria-label="Search all menus" aria-controls="skMenuSearchResults" aria-expanded="false"></label>' +
      '<div class="sk-search-results" id="skMenuSearchResults" hidden>' + links.join("") +
      '<p class="sk-search-empty" hidden>No matching menus found.</p></div></div>';
  }

  /* ---------------------------------------------- modules popup ------ */
  /* The popup shows every module, each one opens its own module page. */
  function buildPopup() {
    var tiles = SK.menu
      .map(function (m, i) {
        return (
          '<a class="sk-mtile" href="' + SK.href(m.url) + '" style="--m:' + m.color + ";--i:" + i + '">' +
          '<span class="sk-mtile-ico">' + SK.iconImg(m.icon) + "</span>" +
          '<span class="sk-mtile-name">' + SK.esc(m.name) + "</span>" +
          "</a>"
        );
      })
      .join("");

    return (
      '<div class="sk-backdrop" id="skBackdrop" hidden></div>' +
      '<div class="sk-popup" id="skPopup" role="dialog" aria-label="Module navigation" hidden>' +
      '<button type="button" class="sk-popup-close" id="skPopupClose" aria-label="Close">' +
      SK.icon("close") + "</button>" +
      '<div class="sk-mtiles">' + tiles + "</div>" +
      "</div>"
    );
  }

  /* ------------------------------------------------------ account menu --- */
  /* The picture in the top right corner is the account menu: Profile,
     Settings and Logout. */
  function buildUserMenu(C) {
    var items = [
      { label: "Profile", url: "profile.html", ico: "user" },
      { label: "Settings", url: "settings.html", ico: "cog" },
      { label: "Logout", url: C.logout, ico: "logout" }
    ];

    return (
      '<div class="sk-usermenu" id="skUserMenu">' +

      '<button type="button" class="sk-usermenu-btn" id="skUserBtn"' +
      ' aria-haspopup="menu" aria-expanded="false" aria-controls="skUserPop"' +
      ' aria-label="Account menu" title="' +
      SK.esc(C.user.name + " · " + C.user.role) + '">' +
      '<span class="sk-avatar">' +
      SK.esc(C.user.name.charAt(0).toUpperCase()) + "</span>" +
      "</button>" +

      '<div class="sk-usermenu-pop" id="skUserPop" role="menu" hidden>' +
      '<div class="sk-usermenu-head">' +
      '<strong>' + SK.esc(C.user.name) + "</strong>" +
      "<span>" + SK.esc(C.user.role) + "</span>" +
      "</div>" +
      items
        .map(function (i) {
          return (
            '<a class="sk-usermenu-item' + (i.label === "Logout" ? " is-danger" : "") +
            '" href="' + SK.href(i.url) + '" role="menuitem">' +
            SK.icon(i.ico) + "<span>" + SK.esc(i.label) + "</span></a>"
          );
        })
        .join("") +
      "</div>" +

      "</div>"
    );
  }

  /* ---------------------------------------------------------- crumb --- */
  function buildCrumb() {
    var mod = SK.activeModule();
    var out = '<a class="sk-crumb" href="' + SK.href("index.html") + '">Home</a>';
    if (!mod) return out;

    var hit = SK.activeItem(mod);

    out += '<span class="sk-crumb-sep">/</span>' +
      '<a class="sk-crumb" href="' + SK.href(mod.url) + '" style="--m:' + mod.color + '">' +
      SK.esc(mod.name) + "</a>";

    /* every level of the sub item that is open, groups included */
    (hit ? hit.trail : []).forEach(function (it, i, all) {
      var last = i === all.length - 1;
      var group = it.items && it.items.length;

      out += '<span class="sk-crumb-sep">/</span>';

      if (last) {
        out += '<span class="sk-crumb is-here" style="--m:' + mod.color + '">' +
          SK.esc(it.title) + "</span>";
      } else if (group) {
        /* a group is only a heading, it has no page of its own */
        out += '<span class="sk-crumb is-group">' + SK.esc(it.title) + "</span>";
      } else {
        out += '<a class="sk-crumb" href="' + SK.href(it.url) + '">' +
          SK.esc(it.title) + "</a>";
      }
    });

    return out;
  }

  /* -------------------------------------------------------- module chip ---
     At the head of the breadcrumb bar, a small button in the colour and the
     icon of the module you are in, so the bar says where you are without
     having to read it. It is a link back to that module's dashboard. */
  function buildModuleChip(mod) {
    if (!mod) return "";

    return '<a class="sk-mbadge" href="' + SK.href(mod.url) + '"' +
      ' style="--m:' + mod.color + '" aria-label="' + SK.esc(mod.name) + ' module">' +
      SK.icon(mod.icon) +
      "<span>" + SK.esc(mod.name) + "</span></a>";
  }

  /* --------------------------------------------------------- markup ---
     The bar always carries the menu, on one row, right after the logo.

     buildNav() decides which modules it lists: every one of them on the
     homepage, just the current one inside a module, where the module you
     are already in does not need naming again. */
  function markup() {
    var C = SK.config;
    var mod = SK.activeModule();
    var home = !mod;

    return (
      '<a class="sk-skip" href="#skMain">Skip to content</a>' +

      '<header class="sk-header' + (home ? " is-home" : "") + '" id="skHeader">' +
      '<div class="sk-header-in">' +

      '<button type="button" class="sk-burger" id="skBurger" aria-label="Menu" aria-expanded="false">' +
      SK.icon("burger") + "</button>" +

      '<a class="sk-brand" href="' + SK.href("index.html") + '">' +
      '<span class="sk-logo">' +
      '<img src="' + SK.href("assets/images/logo.png") + '" alt="' + SK.esc(C.name) +
      '" width="448" height="90" decoding="async" fetchpriority="high" />' +
      "</span>" +
      "</a>" +

      '<nav class="sk-nav" id="skNav" aria-label="Main menu">' + buildNav() + "</nav>" +

      '<div class="sk-header-right' + (home ? "" : " has-search") + '">' +
      (home ? "" : buildSearch()) +
      (home ? "" :
      '<button type="button" class="sk-iconbtn" id="skGridBtn"' +
      ' aria-label="All modules" aria-haspopup="dialog" aria-expanded="false"' +
      ' aria-controls="skPopup">' + SK.icon("grid") + "</button>") +
      buildUserMenu(C) +
      "</div>" +

      "</div>" +

      /* no breadcrumb bar on the home page, there is no path to show */
      (home ? "" :
      '<div class="sk-subbar">' +
      buildModuleChip(mod) +
      '<nav class="sk-crumbs" aria-label="Breadcrumb">' +
      buildCrumb() + "</nav></div>") +

      "</header>" +

      buildPopup()
    );
  }

  function render() {
    var mod = SK.activeModule();
    var home = !mod;

    /* the bar is shorter without the menu row, so the page is told to
       start higher up */
    d.documentElement.classList.toggle("sk-home", home);
    d.documentElement.style.setProperty("--sk-accent", mod ? mod.color : "#0ea5e9");
    d.body.insertAdjacentHTML("afterbegin", markup());
  }

  return { markup: markup, render: render };
})(window, document);
