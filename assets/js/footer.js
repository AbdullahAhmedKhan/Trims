/* ==========================================================================
   SK Trims ERP - FOOTER
   --------------------------------------------------------------------------
   Builds the footer at the bottom of the page. It is only the
   copyright line: the module links and Logout live in the account menu in
   the top right of the header. The homepage has no footer at all, because
   it fills the window on its own; every other page (the modules and the
   plain pages such as profile and settings) carries it.
   ========================================================================== */

window.SKFooter = (function (w, d) {
  "use strict";

  function markup() {
    var C = SK.config;

    /* nothing below the modules: the homepage is one full screen */
    if (SK.isHome()) return "";

    return (
      '<footer class="sk-footer" id="skFooter">' +
      '<div class="sk-footer-in">' +
      '<span class="sk-foot-brand">&copy; ' + new Date().getFullYear() + " " +
      SK.esc(C.name) + " " + SK.esc(C.sub) + ". All rights reserved." +
      "</span>" +
      "</div>" +
      "</footer>"
    );
  }

  function render() {
    var html = markup();
    if (html) d.body.insertAdjacentHTML("beforeend", html);
  }

  return { markup: markup, render: render };
})(window, document);