/* ==========================================================================
   SK Trims ERP - APP BOOTSTRAP + BEHAVIOUR
   --------------------------------------------------------------------------
   Runs on every page:
     1. renders the header (header.js) and the footer (footer.js)
     2. moves your #sk-app content into the page shell
     3. fills the homepage tiles from menu.js
     4. handles the drop down menu, the mobile menu drawer and the modules popup
   No fetch and no server needed - it all works from file://
   ========================================================================== */

window.App = (function (w, d) {
  "use strict";

  var qs = function (s, r) { return (r || d).querySelector(s); };
  var one = function (s, r) { return [].slice.call((r || d).querySelectorAll(s)); };

  /* ====================================================== shell ========= */
  function buildShell() {
    var app = qs("#sk-app");
    if (!app) return;

    var main = d.createElement("main");
    main.className = "sk-main";
    main.id = "skMain";
    while (app.firstChild) main.appendChild(app.firstChild);

    var wrap = d.createElement("div");
    wrap.className = "sk-shell";
    wrap.appendChild(main);
    d.body.appendChild(wrap);
    app.parentNode.removeChild(app);
  }

  /* ================================================== homepage tiles === */
  var HOME_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var HOME_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var HOME_MONTHS_FULL = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  /* the greeting follows the clock: morning up to noon, afternoon to 5pm */
  function greeting(h) {
    if (h < 12) return "good morning";
    if (h < 17) return "good afternoon";
    return "good evening";
  }

  /* the welcome line and the calendar card above the module tiles */
  function homeHero() {
    var C = SK.config;
    var now = new Date();
    var day = now.getDate();
    var full = HOME_DAYS[now.getDay()] + ", " + day + " " +
      HOME_MONTHS_FULL[now.getMonth()] + " " + now.getFullYear();

    return (
      '<section class="sk-home-hero">' +

      '<div class="sk-hero-copy">' +
      '<span class="sk-home-kicker">Welcome back</span>' +
      '<h1 class="sk-home-title">Welcome ' + SK.esc(C.user.name) + ", " +
      greeting(now.getHours()) + "</h1>" +
      '<p class="sk-home-lead">' + SK.esc(full) +
      " &middot; Open any module below to get started.</p>" +
      "</div>" +

      '<div class="sk-hero-cal" role="img" aria-label="' + SK.esc("Today, " + full) + '">' +
      '<span class="sk-cal-ico"><svg class="sk-svg" viewBox="0 0 24 24">' +
      '<rect x="3" y="5" width="18" height="16" rx="2.5"/>' +
      '<path d="M3 9.6h18M8 3v4M16 3v4"/>' +
      '<path d="M7.5 13.4h2M11 13.4h2M14.5 13.4h2M7.5 16.9h2M11 16.9h2"/>' +
      "</svg></span>" +
      '<span class="sk-cal-box sk-cal-day">' + (day < 10 ? "0" + day : day) + "</span>" +
      '<span class="sk-cal-box sk-cal-mon">' + HOME_MONTHS[now.getMonth()] +
      "<small>" + now.getFullYear() + "</small></span>" +
      '<span class="sk-cal-dow"><b>' + HOME_DAYS[now.getDay()] + "</b><small>Today</small></span>" +
      "</div>" +

      "</section>"
    );
  }

  function fillHome() {
    var host = qs("[data-sk-home]");
    if (!host) return;

    host.className = "sk-home-wrap";
    host.innerHTML =
      homeHero() +

      '<div class="sk-mtiles sk-home-tiles">' +
      SK.menu
        .map(function (m) {
          /* the whole card is the link, so it needs no arrow */
          return (
            '<a class="sk-mtile" href="' + SK.href(m.url) + '" style="--m:' + m.color + '">' +
            '<span class="sk-mtile-ico">' + SK.iconImg(m.icon) + "</span>" +
            '<span class="sk-mtile-name">' + SK.esc(m.name) + "</span>" +
            "</a>"
          );
        })
        .join("") +
      "</div>";
  }

  /* ======================================================== menu ======== */
  /* A drop down panel that hangs out to the side would run off the right
     of a narrow window, so any panel that does not fit is flipped to the
     other side of the item it belongs to. */
  function fitPanels(li) {
    var vw = d.documentElement.clientWidth;

    one(".sk-sm", li).forEach(function (p) {
      p.classList.remove("is-flip");
    });

    /* outermost first: each flip moves the panels inside it, and the next
       getBoundingClientRect forces the new position to be measured */
    one(".sk-sm", li).forEach(function (p) {
      var r = p.getBoundingClientRect();
      if (r.width && r.right > vw - 8) p.classList.add("is-flip");
    });
  }

  function closeAll(except) {
    one(".sk-si.is-open, .sk-mi.is-open").forEach(function (li) {
      /* keep the item that was clicked, and the levels above it */
      if (except && (li === except || li.contains(except))) return;
      li.classList.remove("is-open");
      var b = qs(".sk-mcaret, .sk-sibtn", li);
      if (b) b.setAttribute("aria-expanded", "false");
    });
  }

  function wireMenu() {
    d.addEventListener("click", function (e) {
      var btn = e.target.closest(".sk-mcaret, .sk-sibtn");

      if (btn) {
        /* on a phone the drawer is the only way to open the menu */
        e.preventDefault();
        e.stopPropagation();
        /* the arrow sits inside .sk-mrow, so climb to the list item */
        var li = btn.closest(".sk-mi, .sk-si");
        if (!li) return;
        var open = li.classList.contains("is-open");
        closeAll(li);
        li.classList.toggle("is-open", !open);
        btn.setAttribute("aria-expanded", String(!open));
        if (li.classList.contains("is-open")) fitPanels(li);
        return;
      }

      /* clicking anywhere else closes what is open */
      if (!e.target.closest(".sk-menu")) closeAll();
    });

    /* a panel opened by hover also has to be kept inside the window */
    d.addEventListener("mouseover", function (e) {
      var li = e.target.closest && e.target.closest(".sk-mi");
      if (li && !isDrawer()) fitPanels(li);
    });

    d.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeAll();
        closeNav();
        closePopup();
      }
    });
  }

  /* ================================================ menu search ======= */
  function wireMenuSearch() {
    var host = qs("#skMenuSearch");
    var input = qs("#skMenuSearchInput");
    var results = qs("#skMenuSearchResults");
    if (!host || !input || !results) return;

    var links = one(".sk-search-result", results);
    var empty = qs(".sk-search-empty", results);

    function update(show) {
      var query = input.value.trim().toLowerCase();
      var terms = query ? query.split(/\s+/) : [];
      var count = 0;
      links.forEach(function (link) {
        var haystack = link.getAttribute("data-search");
        var match = terms.length && terms.every(function (term) {
          return haystack.indexOf(term) !== -1;
        });
        link.hidden = !match;
        if (match) count++;
      });
      var open = !!query && show !== false;
      results.hidden = !open;
      empty.hidden = !open || count > 0;
      input.setAttribute("aria-expanded", String(open));
    }

    input.addEventListener("input", function () { update(true); });
    input.addEventListener("focus", function () {
      if (input.value.trim()) update(true);
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        input.value = "";
        update(false);
        input.blur();
      } else if (e.key === "Enter") {
        var first = links.filter(function (link) { return !link.hidden; })[0];
        if (first) w.location.href = first.href;
      }
    });
    d.addEventListener("click", function (e) {
      if (!host.contains(e.target)) update(false);
    });
  }

  /* ================================================= mobile drawer ===== */
  /* true while the menu is a drawer, see the 899px breakpoint in style.css */
  function isDrawer() {
    return !!(w.matchMedia && w.matchMedia("(max-width: 899px)").matches);
  }

  function navIsOpen() {
    var n = qs("#skNav");
    return !!n && n.classList.contains("is-open");
  }

  function openNav() {
    qs("#skNav").classList.add("is-open");
    qs("#skBurger").setAttribute("aria-expanded", "true");
    qs("#skBurger").classList.add("is-on");
    d.body.classList.add("sk-lock");
  }

  function closeNav() {
    if (!navIsOpen()) return;
    qs("#skNav").classList.remove("is-open");
    qs("#skBurger").setAttribute("aria-expanded", "false");
    qs("#skBurger").classList.remove("is-on");
    d.body.classList.remove("sk-lock");
    closeAll();
  }

  function wireBurger() {
    var burger = qs("#skBurger");
    if (!burger) return;
    burger.addEventListener("click", function (e) {
      e.stopPropagation();
      navIsOpen() ? closeNav() : openNav();
    });
  }

  /* ================================================== modules popup ===== */
  function popupIsOpen() {
    var p = qs("#skPopup");
    return !!(p && p.classList.contains("is-open"));
  }

  /* How long the box takes to close. It is only hidden once that animation
     is over, so this matches the closing transition in style.css. */
  var POPUP_OUT = 300;

  /* The button keeps the class only while the turn is playing. It is taken
     off first and put back straight away, so a fast second click starts the
     turn again instead of finding the class already there. */
  function spinGrid() {
    var btn = qs("#skGridBtn");
    if (!btn) return;
    btn.classList.remove("is-on");
    void btn.offsetWidth;
    btn.classList.add("is-on");
    w.setTimeout(function () {
      btn.classList.remove("is-on");
    }, 700);
  }

  function openPopup() {
    var p = qs("#skPopup");
    var back = qs("#skBackdrop");
    var btn = qs("#skGridBtn");
    if (!p) return;

    /* a closing run still in flight would hide the box again */
    w.clearTimeout(closePopup.timer);

    p.hidden = false;
    if (back) back.hidden = false;

    /* reading a size makes the browser treat the hidden state as the start
       of a fresh transition, without it the box would only appear on the
       second click */
    void p.offsetWidth;

    p.classList.add("is-open");
    if (back) back.classList.add("is-open");
    if (btn) btn.setAttribute("aria-expanded", "true");
    spinGrid();
    d.body.classList.add("sk-lock");
  }

  function closePopup() {
    var p = qs("#skPopup");
    var back = qs("#skBackdrop");
    var btn = qs("#skGridBtn");
    if (!popupIsOpen()) return;

    p.classList.remove("is-open");
    if (back) back.classList.remove("is-open");
    if (btn) {
      btn.setAttribute("aria-expanded", "false");
      spinGrid();
    }
    if (!navIsOpen()) d.body.classList.remove("sk-lock");

    /* let the tiles run back out before the box leaves the page */
    w.clearTimeout(closePopup.timer);
    closePopup.timer = w.setTimeout(function () {
      if (popupIsOpen()) return;
      if (p) p.hidden = true;
      if (back) back.hidden = true;
    }, POPUP_OUT);
  }

  function wirePopup() {
    var btn = qs("#skGridBtn");
    if (btn) btn.addEventListener("click", function (e) {
      e.stopPropagation();
      popupIsOpen() ? closePopup() : openPopup();
    });

    var close = qs("#skPopupClose");
    if (close) close.addEventListener("click", closePopup);

    var back = qs("#skBackdrop");
    if (back) back.addEventListener("click", closePopup);
  }

  /* =================================================== account menu === */
  /* Profile / Settings / Logout, under the picture in the top right. */
  function userMenuOpen() {
    var m = qs("#skUserMenu");
    return !!(m && m.classList.contains("is-open"));
  }

  function setUserMenu(open) {
    var m = qs("#skUserMenu");
    var pop = qs("#skUserPop");
    var btn = qs("#skUserBtn");
    if (!m || !pop || !btn) return;

    m.classList.toggle("is-open", open);
    pop.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
  }

  function wireUserMenu() {
    var btn = qs("#skUserBtn");
    if (!btn) return;

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      setUserMenu(!userMenuOpen());
    });

    /* anything outside the menu closes it, and so does Escape */
    d.addEventListener("click", function (e) {
      if (!e.target.closest(".sk-usermenu")) setUserMenu(false);
    });

    d.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && userMenuOpen()) {
        setUserMenu(false);
        btn.focus();
      }
    });
  }

  /* ============================================ see-through home bar === */
  /* The home header has no background of its own so the photo shows
     through it. Once the page is scrolled it would end up sitting on top
     of the tiles, so it turns solid at that point. */
  function wireHomeBar() {
    var head = qs(".sk-header");
    if (!head) return;

    var waiting = false;
    function sync() {
      waiting = false;
      var y = w.pageYOffset || d.documentElement.scrollTop || 0;
      head.classList.toggle("is-stuck", y > 8);
    }

    w.addEventListener("scroll", function () {
      if (waiting) return;
      waiting = true;
      w.requestAnimationFrame(sync);
    }, { passive: true });

    sync();
  }

  /* ============================================================ boot === */
  function boot() {
    SKHeader.render();
    buildShell();
    SKFooter.render();
    fillHome();

    /* only the homepage carries the photo and the see-through header */
    var home = SK.isHome();
    d.body.classList.toggle("sk-home-page", home);
    if (home) wireHomeBar();

    wireMenu();
    wireMenuSearch();
    wireBurger();
    wirePopup();
    wireUserMenu();

    d.dispatchEvent(new CustomEvent("sk:ready"));
  }

  return {
    boot: boot,
    fillHome: fillHome,
    openNav: openNav,
    closeNav: closeNav,
    openPopup: openPopup,
    closePopup: closePopup
  };
})(window, document);
