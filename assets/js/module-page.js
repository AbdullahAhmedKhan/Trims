/* ==========================================================================
   SK Trims ERP - MODULE PAGE RENDERER
   --------------------------------------------------------------------------
   One file drives every module page.

     modules/<key>/index.html           -> the module dashboard
     modules/<key>/item.html?id=<slug>  -> 404 - Page Not Found

   Only the dashboard is a real page. Every other address - a menu link,
   a card link, or a typed URL - renders the 404 view instead of content,
   so nothing but the dashboard ever loads.
   ========================================================================== */

window.ModulePage = (function (w, d) {
  "use strict";

  /* ------------------------------------------------------------- render -- */
  function render() {
    var main = d.getElementById("skMain");
    var mod = SK.activeModule();
    if (!main || !mod) return;

    var name = (SK.config.name || "SK") + " " + (SK.config.sub || "ERP");

    /* itemId() is empty on a plain index.html and returns the "__dash"
       sentinel on the menu's dashboard entry; anything else is a sub item
       and falls through to the 404 view. */
    var id = SK.itemId ? SK.itemId() : "";
    var onDash = !/\/item\.html$/i.test(w.location.pathname) &&
      (!id || id === "__dash");

    if (onDash && w.SKDash && w.SKDash.spec(mod.key)) {
      main.classList.remove("skd-main-404");
      w.SKDash.renderModule(main, mod.key);
      d.title = name + " - " + mod.name;
      return;
    }

    notFound(main, mod, name);
  }

  /* -------------------------------------------------------------- 404 --- */
  /* centered in the middle of the module background (see .skd-page-404) */
  function notFound(main, mod, name) {
    var back = SK.dashboardHref ? SK.dashboardHref(mod.key) : SK.href(mod.url);

    main.classList.add("skd-main-404");
    main.innerHTML =
      '<div class="skd-page skd-page-404">' +
      '<div class="skd-404">' +
      '<div class="skd-404-orb" aria-hidden="true">' +
      '<i class="skd-404-ring"></i>' +
      '<span class="skd-404-code">404</span>' +
      "</div>" +
      "<h2>Page Not Found</h2>" +
      "<p>The page you are looking for doesn't exist.</p>" +
      "</div>" +
      "</div>";
    d.title = "Page Not Found - " + name;
  }

  return { render: render };
})(window, document);
