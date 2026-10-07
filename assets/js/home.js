/* ==========================================================================
   SK Trims ERP - HOMEPAGE DATA
   --------------------------------------------------------------------------
   index.html holds the homepage layout (plain HTML + Tailwind utilities).
   This file only fills the spots that change:

     data-home="user|greeting|date|day|month|year|weekday|count"
     [data-home-modules] > [data-mod] the eight module cards
     [data-tile-name|blurb|ico]        the text, the line and the icon

   Who you are  -> APP_CONFIG.user.name        (assets/js/menu.js)
   Which module -> APP_MENU: name, color, icon  (assets/js/menu.js)
   What time it is -> the browser clock (greeting, date, calendar tiles)

   index.html calls it after App.boot():
     App.boot(); SkHome.render();
   ========================================================================== */

window.SkHome = (function (w, d) {
  "use strict";

  var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var MONTHS_FULL = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  /* one line under each module name. The name itself comes from APP_MENU,
     this only says what the module is for. */
  var BLURB = {
    order: "Costing, work orders and delivery schedule",
    production: "Board making, finishing and output reports",
    delivery: "Challan, gate pass and delivery reports",
    billing: "New bills, billing status and costing history",
    stock: "Purchase, warehouse, materials and inventory",
    commercial: "Proforma invoice, LC and commercial tracking",
    payroll: "Employees, attendance, salary and bonus",
    accounts: "Vouchers, daybook, ledger and trial balance"
  };

  /* the greeting follows the clock: morning up to noon, afternoon to 5pm */
  function greeting(h) {
    if (h < 12) return "good morning";
    if (h < 17) return "good afternoon";
    return "good evening";
  }

  /* every element that asks for the same value gets it */
  function set(name, value) {
    [].slice.call(d.querySelectorAll('[data-home="' + name + '"]')).forEach(function (el) {
      el.textContent = value;
    });
  }

  function fillIntro() {
    var now = new Date();
    var C = w.SK && w.SK.config;

    if (C && C.user) set("user", C.user.name);
    set("greeting", greeting(now.getHours()));
    set("date", DAYS[now.getDay()] + ", " + now.getDate() + " " +
      MONTHS_FULL[now.getMonth()] + " " + now.getFullYear());
    set("day", now.getDate() < 10 ? "0" + now.getDate() : String(now.getDate()));
    set("month", MONTHS[now.getMonth()]);
    set("year", String(now.getFullYear()));
    set("weekday", DAYS[now.getDay()]);
    set("count", String((w.SK && w.SK.menu ? w.SK.menu.length : 8)));
  }

  function fillModules() {
    var host = d.querySelector("[data-home-modules]");
    if (!host || !w.SK) return;

    var menu = w.SK.menu || [];

    [].slice.call(host.querySelectorAll("[data-mod]")).forEach(function (card) {
      var key = card.getAttribute("data-mod");
      var mod = null;

      menu.forEach(function (m) {
        if (m.key === key) mod = m;
      });
      if (!mod) return;

      /* url, colour, name and icon all come from menu.js, never hard coded */
      card.setAttribute("href", w.SK.href(mod.url));
      card.style.setProperty("--m", mod.color);

      var name = card.querySelector("[data-tile-name]");
      if (name) name.textContent = mod.name;

      var blurb = card.querySelector("[data-tile-blurb]");
      if (blurb) blurb.textContent = BLURB[key] || mod.name;

      /* sized inline so the icon keeps its size without a stylesheet rule */
      var ico = card.querySelector("[data-tile-ico]");
      if (ico) {
        ico.innerHTML = w.SK
          .iconImg(mod.icon)
          .replace("<img ", '<img style="width:42px;height:42px;object-fit:contain" ');
      }
    });
  }

  function render() {
    if (!w.SK) return;
    fillIntro();
    fillModules();
  }

  return { render: render };
})(window, document);
