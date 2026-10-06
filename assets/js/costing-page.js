window.CostingPage = (function (w, d) {
  "use strict";

  var SAVE_KEY = "sk.costing.saved";
  var TAKA = "৳";

  var OPTIONS = {
    parties: ["Sinha Textile", "DBL Group", "Hanuman Textile", "Noman Group", "Prime Denim", "MJ Group"],
    buyers: ["H&M", "Zara", "Marks & Spencer", "Canadian Tire", "Kmart"],
    teams: ["Marketing Team A", "Marketing Team B", "Fabric Team", "Export Team"],
    branches: ["Dhaka Plant", "Gazipur Unit 2", "Chattogram Plant"],
    items: ["Corrugated Carton", "Corrugated Box 3 Ply", "Corrugated Box 5 Ply", "Liner (Kraft)", "Garment Tag", "Poly Bag"],
    specifications: [
      "3 Ply Corrugated (B / C Flute)",
      "5 Ply Corrugated (BC Flute)",
      "3 Ply Carton",
      "5 Ply Carton",
      "7 Ply Carton",
      "Poly Bag 100 Gauge",
      "Poly Bag 150 Gauge",
      "Garment Tag",
      "Heat Transfer Label"
    ],
    grades: ["Grade A", "Grade B", "Grade C", "SS Kraft", "Test Liner"],
    measureUnits: ["cm", "inch", "mm", "meter"],
    orderUnits: ["Pcs", "Dozen", "Bundle", "Kg", "Roll"],
    materials: [
      "Liner Outer 125 gsm",
      "Liner Inner 110 gsm",
      "Cor. Medium 100 gsm",
      "P. Medium 90 gsm",
      "Carton Kraft",
      "Printing Ink",
      "Adhesive",
      "Stitching Thread"
    ]
  };

  var DEFAULT_PCT = { overhead: 10, accessories: 5, allowance: 2, margin: 15 };

  var ICONS = {
    plus: '<svg class="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" fill="none"/></svg>',
    cross: '<svg class="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" fill="none"/></svg>',
    grip: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="9" cy="6" r="1.4"/><circle cx="15" cy="6" r="1.4"/><circle cx="9" cy="12" r="1.4"/><circle cx="15" cy="12" r="1.4"/><circle cx="9" cy="18" r="1.4"/><circle cx="15" cy="18" r="1.4"/></svg>'
  };

  function $(sel, root) {
    return (root || d).querySelector(sel);
  }

  function $$(sel, root) {
    return [].slice.call((root || d).querySelectorAll(sel));
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function num(v) {
    var n = parseFloat(v);
    return isNaN(n) ? 0 : n;
  }

  function money(n) {
    return TAKA + Number(n || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function todayISO() {
    var t = new Date();
    return t.getFullYear() + "-" + String(t.getMonth() + 1).padStart(2, "0") +
      "-" + String(t.getDate()).padStart(2, "0");
  }

  function loadSaved() {
    try {
      var raw = w.localStorage.getItem(SAVE_KEY);
      var list = raw ? JSON.parse(raw) : [];
      return Object.prototype.toString.call(list) === "[object Array]" ? list : [];
    } catch (e) {
      return [];
    }
  }

  function storeSaved(list) {
    try {
      w.localStorage.setItem(SAVE_KEY, JSON.stringify(list));
    } catch (e) { /* private mode or full storage - the page keeps working */ }
  }

  function nextRef(saved) {
    var y = new Date().getFullYear();
    var n = (saved || []).filter(function (r) {
      return r && r.ref && String(r.ref).indexOf(String(y)) !== -1;
    }).length;
    return "CA-" + y + "-" + String(n + 1).padStart(4, "0");
  }

  function optionList(arr, placeholder) {
    var out = '<option value="">' + esc(placeholder) + "</option>";
    arr.forEach(function (v) {
      out += '<option value="' + esc(v) + '">' + esc(v) + "</option>";
    });
    return out;
  }

  function fieldGroup(labelText, control, widthClass) {
    var wrap = d.createElement("div");
    wrap.className = widthClass || "min-w-[130px] flex-1";
    var l = d.createElement("label");
    l.className = "skc-label";
    l.textContent = labelText;
    wrap.appendChild(l);
    wrap.appendChild(control);
    return wrap;
  }

  function mkSel(cls, arr, val) {
    var s = d.createElement("select");
    s.className = "skc-select " + cls;
    s.innerHTML = optionList(arr, "Select");
    if (val) s.value = val;
    return s;
  }

  function mkNum(cls, val, step) {
    var i = d.createElement("input");
    i.type = "number";
    i.min = "0";
    i.step = String(step == null ? 0.01 : step);
    i.inputMode = "decimal";
    i.className = "skc-input " + cls;
    i.value = val == null ? "0" : String(val);
    return i;
  }

  function mkBtn(act, cls, title) {
    var b = d.createElement("button");
    b.type = "button";
    b.className = cls;
    b.setAttribute("data-act", act);
    b.title = title;
    b.setAttribute("aria-label", title);
    b.innerHTML = ICONS[act.indexOf("del") === 0 ? "cross" : "plus"];
    return b;
  }

  function mkGrip() {
    var g = d.createElement("button");
    g.type = "button";
    g.className = "skc-grip";
    g.title = "Drag to reorder";
    g.setAttribute("aria-label", "Drag to reorder");
    g.innerHTML = ICONS.grip;
    return g;
  }

  function mkChildBtn(act, text) {
    var b = d.createElement("button");
    b.type = "button";
    b.className = "skc-addchild";
    b.setAttribute("data-act", act);
    b.title = text;
    b.innerHTML = ICONS.plus + "<span>" + text + "</span>";
    return b;
  }

  var PRICE_PER = [["0", "Select"], ["1", "SqrMtr"], ["2", "Pcs"], ["3", "Lbs"], ["4", "Kg"], ["5", "cone"], ["6", "Yds"]];

  function pricePerSel(val) {
    var s = d.createElement("select");
    s.className = "skc-select piece_per";
    var chosen = val != null ? String(val) : "2";
    s.innerHTML = PRICE_PER.map(function (p) {
      return '<option value="' + p[0] + '"' + (p[0] === chosen ? " selected" : "") + ">" + p[1] + "</option>";
    }).join("");
    return s;
  }

  function boxUL(cls) {
    var ul = d.createElement("ul");
    ul.className = "m-0 list-none space-y-3 p-0 " + cls;
    return ul;
  }

  function buildMeasure(seed) {
    seed = seed || {};
    var li = d.createElement("li");
    li.className = "skc-meas relative rounded-xl border border-slate-200 bg-white px-3 py-3";

    var row = d.createElement("div");
    row.className = "flex flex-wrap items-end gap-x-3 gap-y-3";

    row.appendChild(mkGrip());
    row.appendChild(fieldGroup("Grade", mkSel("m-grade", OPTIONS.grades, seed.grade), "w-[130px] flex-none"));
    row.appendChild(fieldGroup("Length", mkNum("m-length", seed.length), "w-[100px] flex-none"));
    row.appendChild(fieldGroup("Width", mkNum("m-width", seed.width), "w-[100px] flex-none"));
    row.appendChild(fieldGroup("Thickness", mkNum("m-thickness", seed.thickness), "w-[110px] flex-none"));
    row.appendChild(fieldGroup("M. Unit", mkSel("m-munit", OPTIONS.measureUnits, seed.munit), "w-[115px] flex-none"));
    row.appendChild(fieldGroup("Order Qty", mkNum("m-qty", seed.qty, 1), "w-[100px] flex-none"));
    row.appendChild(fieldGroup("Order Unit", mkSel("m-qunit", OPTIONS.orderUnits, seed.qunit), "w-[115px] flex-none"));
    row.appendChild(fieldGroup("Material", mkSel("m-matname", OPTIONS.materials, seed.matName), "min-w-[170px] flex-1"));
    row.appendChild(fieldGroup("Cost " + TAKA, mkNum("m-matvalue", seed.matValue), "w-[110px] flex-none"));

    var actions = d.createElement("div");
    actions.className = "flex flex-none items-center gap-1.5";
    actions.appendChild(mkBtn("add-measure", "skc-icobtn-add", "Add measurement"));
    actions.appendChild(mkBtn("del-measure", "skc-icobtn-del", "Remove measurement"));
    row.appendChild(actions);

    li.appendChild(row);
    return li;
  }

  function buildSpec(seed) {
    seed = seed || {};
    var li = d.createElement("li");
    li.className = "skc-spec min-w-0";

    var fs = d.createElement("fieldset");
    fs.className = "skc-spec-box min-w-0";

    var lg = d.createElement("legend");
    lg.className = "float-left w-full px-0";

    var head = d.createElement("div");
    head.className = "skc-box-head";
    head.appendChild(mkGrip());

    var specSel = mkSel("spec_id", OPTIONS.specifications, seed.spec);
    head.appendChild(fieldGroup("Specification", specSel, "min-w-[190px] flex-1"));

    var note = d.createElement("input");
    note.type = "text";
    note.className = "skc-input spec_note";
    note.placeholder = "e.g. 3 ply corrugated carton, B / C flute";
    if (seed.note) note.value = seed.note;
    head.appendChild(fieldGroup("Style / More", note, "min-w-[190px] flex-1"));

    head.appendChild(mkBtn("add-spec", "skc-icobtn-add", "Add specification"));
    head.appendChild(mkBtn("del-spec", "skc-icobtn-del", "Remove specification"));
    lg.appendChild(head);

    var body = d.createElement("div");
    body.className = "clear-left pt-1";

    var ul = boxUL("MeasurUL");
    var measureSeed = seed.measures && seed.measures[0] ? seed.measures[0] : null;
    ul.appendChild(buildMeasure(measureSeed));
    body.appendChild(ul);
    body.appendChild(mkChildBtn("add-measure", "Add measurement"));

    fs.appendChild(lg);
    fs.appendChild(body);
    li.appendChild(fs);
    return li;
  }

  function buildItem(seed) {
    seed = seed || {};
    var li = d.createElement("li");
    li.className = "skc-item min-w-0";

    var fs = d.createElement("fieldset");
    fs.className = "skc-item-box min-w-0";

    var lg = d.createElement("legend");
    lg.className = "float-left w-full px-0";

    var head = d.createElement("div");
    head.className = "skc-box-head";
    head.appendChild(mkGrip());

    var itemSel = mkSel("item_id", OPTIONS.items, seed.item);
    head.appendChild(fieldGroup("Item Name", itemSel, "min-w-[200px] flex-1"));
    head.appendChild(fieldGroup("Price per", pricePerSel(seed.piecePer), "w-[130px] flex-none"));

    head.appendChild(mkBtn("add-item", "skc-icobtn-add", "Add item"));
    head.appendChild(mkBtn("del-item", "skc-icobtn-del", "Remove item"));
    lg.appendChild(head);

    var body = d.createElement("div");
    body.className = "clear-left pt-1";

    var ul = boxUL("SpecUL");
    var specSeed = seed.specs && seed.specs[0] ? seed.specs[0] : null;
    ul.appendChild(buildSpec(specSeed));
    body.appendChild(ul);
    body.appendChild(mkChildBtn("add-spec", "Add specification"));

    fs.appendChild(lg);
    fs.appendChild(body);
    li.appendChild(fs);
    return li;
  }

  function addItem(seed) {
    $("#ItemFieldUL").appendChild(buildItem(seed || {}));
  }

  /* the box that owns the Add button decides where the new box goes: an icon
     on a Spec / Measure box adds a sibling (its parent UL), an icon or the
     dashed chip on the parent box appends inside that box */
  function addTarget(act, box) {
    if (!box) return null;
    if (act === "add-spec") {
      return box.classList.contains("skc-spec") ? box.parentNode : $(".SpecUL", box);
    }
    if (act === "add-measure") {
      return box.classList.contains("skc-meas") ? box.parentNode : $(".MeasurUL", box);
    }
    return null;
  }

  function addSpec(box, seed) {
    var ul = addTarget("add-spec", box);
    (ul || $("#ItemFieldUL")).appendChild(buildSpec(seed || {}));
  }

  function addMeasure(box, seed) {
    var ul = addTarget("add-measure", box);
    (ul || $("#ItemFieldUL")).appendChild(buildMeasure(seed || {}));
  }

  function calc() {
    var raw = 0;
    $$("#skMain .m-matvalue").forEach(function (inp) {
      raw += num(inp.value);
    });

    var op = num($("#skcOverhead").value);
    var acc = num($("#skcAccessories").value);
    var allow = num($("#skcAllowance").value);
    var marg = num($("#skcMargin").value);

    var opAmt = raw * op / 100;
    var accAmt = raw * acc / 100;
    var allowAmt = raw * allow / 100;
    var totalInternal = raw + opAmt + accAmt + allowAmt;
    var customer = raw + opAmt + accAmt;
    var margAmt = customer * marg / 100;
    var unitPrice = customer + margAmt;

    return {
      raw: raw, op: op, acc: acc, allow: allow, marg: marg,
      opAmt: opAmt, accAmt: accAmt, allowAmt: allowAmt,
      totalInternal: totalInternal, customer: customer,
      margAmt: margAmt, unitPrice: unitPrice
    };
  }

  function recalc() {
    var c = calc();

    $("#skcValRaw").textContent = money(c.raw);
    $("#skcValOverhead").textContent = money(c.opAmt);
    $("#skcValAccessories").textContent = money(c.accAmt);
    $("#skcValAllowance").textContent = money(c.allowAmt);
    $("#skcValTotalInternal").textContent = money(c.totalInternal);
    $("#skcValTotalCustomer").textContent = money(c.customer);
    $("#skcValMargin").textContent = money(c.margAmt);
    $("#skcValPrice").textContent = money(c.unitPrice);

    var unitSel = $(".piece_per");
    var unitLabel = unitSel && unitSel.value !== "0" ? unitSel.options[unitSel.selectedIndex].text : "";
    var pieceEl = $("#skcValPiece");
    if (c.unitPrice > 0 && unitLabel) {
      pieceEl.textContent = "per " + unitLabel;
    } else if (c.unitPrice > 0) {
      pieceEl.textContent = "Set Price per on the Item box.";
    } else {
      pieceEl.textContent = "";
    }
  }

  function collect() {
    var items = $$("#ItemFieldUL > li.skc-item").map(function (itemLi) {
      return {
        item: $(".item_id", itemLi).value,
        piecePer: num($(".piece_per", itemLi).value),
        specs: $$(".skc-spec", itemLi).map(function (specLi) {
          return {
            spec: $(".spec_id", specLi).value,
            note: $(".spec_note", specLi).value,
            measures: $$(".skc-meas", specLi).map(function (mL) {
              return {
                grade: $(".m-grade", mL).value,
                length: num($(".m-length", mL).value),
                width: num($(".m-width", mL).value),
                thickness: num($(".m-thickness", mL).value),
                munit: $(".m-munit", mL).value,
                qty: num($(".m-qty", mL).value),
                qunit: $(".m-qunit", mL).value,
                matName: $(".m-matname", mL).value,
                matValue: num($(".m-matvalue", mL).value)
              };
            })
          };
        })
      };
    });

    return {
      ref: $("#skcRef").value || nextRef(loadSaved()),
      costingDate: $("#skcDate").value,
      costingFor: $("#skcBranch").value,
      party: $("#skcParty").value,
      buyer: $("#skcBuyer").value,
      team: $("#skcTeam").value,

      items: items,

      overheadPct: num($("#skcOverhead").value),
      accessoriesPct: num($("#skcAccessories").value),
      allowancePct: num($("#skcAllowance").value),
      marginPct: num($("#skcMargin").value),

      raw: calc().raw,
      unitPrice: calc().unitPrice,
      savedAt: new Date().toISOString()
    };
  }

  function save() {
    var anyItem = $$("#ItemFieldUL .item_id").some(function (s) {
      return s.value;
    });
    if (!anyItem) {
      toast("Choose an <b>Item Name</b> first.");
      var first = $("#ItemFieldUL .item_id");
      if (first) first.focus();
      return;
    }

    var rec = collect();
    var list = loadSaved();
    list.unshift(rec);
    storeSaved(list);

    $("#skcRef").value = nextRef(list);
    refreshSide();
    toast("Costing " + esc(rec.ref) + " saved · " + money(rec.unitPrice));
  }

  function reset() {
    ["skcParty", "skcBuyer", "skcTeam", "skcBranch"].forEach(function (id) {
      $("#" + id).value = "";
    });

    $("#skcOverhead").value = DEFAULT_PCT.overhead;
    $("#skcAccessories").value = DEFAULT_PCT.accessories;
    $("#skcAllowance").value = DEFAULT_PCT.allowance;
    $("#skcMargin").value = DEFAULT_PCT.margin;

    var ul = $("#ItemFieldUL");
    ul.innerHTML = "";
    addItem();

    recalc();
    toast("Form reset to defaults.");
  }

  function refreshSide() {
    var saved = loadSaved();
    var y = new Date().getFullYear();

    var chip = $("#skcCount");
    if (chip) {
      var n = saved.filter(function (r) { return r && String(r.ref || "").indexOf(String(y)) !== -1; }).length;
      chip.textContent = "Costings saved this year: " + n;
    }

    var empty = $("#skcSavedEmpty");
    var list = $("#skcSavedList");
    if (!empty || !list) return;

    var recent = saved.filter(function (r) { return r && String(r.ref || "").indexOf(String(y)) !== -1; }).slice(0, 6);

    empty.hidden = recent.length > 0;
    list.innerHTML = recent.map(function (r, i) {
      var date = r.costingDate || new Date(r.savedAt).toISOString().slice(0, 10);
      var meta = (r.item ? esc(r.item) : "No item") + " · " + esc(date);
      return (
        '<li class="skc-saved-item">' +
        '<span class="skc-saved-ref" title="' + esc(r.ref) + '">' + esc(r.ref) + "</span>" +
        '<span class="skc-saved-meta">' + meta + "</span>" +
        '<span class="skc-saved-price">' + money(r.unitPrice) + "</span>" +
        '<button type="button" class="skc-saved-del" data-i="' + i + '" aria-label="Delete ' + esc(r.ref) + '">' +
        ICONS.cross +
        "</button>" +
        "</li>"
      );
    }).join("");

    $$(".skc-saved-del", list).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var saved2 = loadSaved();
        var idx = num(btn.getAttribute("data-i"));
        if (idx >= 0 && idx < saved2.length) saved2.splice(idx, 1);
        storeSaved(saved2);
        $("#skcRef").value = nextRef(saved2);
        refreshSide();
        toast("Costing deleted.");
      });
    });
  }

  var toastTimer = null;

  function toast(html) {
    var t = $("#skcToast");
    if (!t) {
      t = d.createElement("div");
      t.className = "skc-toast";
      t.id = "skcToast";
      t.setAttribute("role", "status");
      d.body.appendChild(t);
    }
    t.innerHTML = html;
    t.classList.add("is-on");
    w.clearTimeout(toastTimer);
    toastTimer = w.setTimeout(function () {
      t.classList.remove("is-on");
    }, 2600);
  }

  var dragging = null;
  var ghost = null;

  function closestBox(node) {
    if (!node || !node.closest) return null;
    return node.closest("li.skc-item, li.skc-spec, li.skc-meas");
  }

  /* a drag is only ever reordered among boxes of the same kind, so nested
     inner boxes must not break item / spec reordering */
  function dropTarget(node, moving) {
    var kind = moving.classList.contains("skc-item") ? "skc-item" :
      moving.classList.contains("skc-spec") ? "skc-spec" : "skc-meas";
    return node && node.closest ? node.closest("li." + kind) : null;
  }

  function ghostCleanup() {
    dragging = null;
    if (ghost) {
      ghost.remove();
      ghost = null;
    }
    $$(".skc-drag-over").forEach(function (el) {
      el.classList.remove("skc-drag-over");
    });
    $$("[draggable='true']").forEach(function (el) {
      el.setAttribute("draggable", "false");
    });
  }

  function dragPreview(li) {
    var g = li.cloneNode(true);
    g.removeAttribute("id");
    g.removeAttribute("draggable");
    g.classList.add("skc-ghost");
    d.body.appendChild(g);
    return g;
  }

  function moveGhost(e) {
    if (!ghost) return;
    var x = e.clientX - ghost.offsetWidth / 2;
    var y = e.clientY - 8;
    ghost.style.transform = "translate(" + x + "px," + y + "px)";
  }

  function handleAct(btn) {
    var act = btn.getAttribute("data-act");
    var box = closestBox(btn);

    switch (act) {
      case "add-item":
        addItem();
        recalc();
        break;
      case "del-item":
        if (!box) break;
        if ($$("#ItemFieldUL > li.skc-item").length > 1) {
          box.parentNode.removeChild(box);
          recalc();
        } else {
          toast("At least one item is required.");
        }
        break;
      case "add-spec":
        addSpec(box);
        recalc();
        break;
      case "del-spec":
        if (!box) break;
        box.parentNode.removeChild(box);
        recalc();
        break;
      case "add-measure":
        addMeasure(box);
        recalc();
        break;
      case "del-measure":
        if (!box) break;
        box.parentNode.removeChild(box);
        recalc();
        break;
    }
  }

  d.addEventListener("click", function (e) {
    var el = e.target;
    if (!el || !el.closest) return;
    var btn = el.closest("[data-act]");
    if (btn && btn.closest("#skMain")) handleAct(btn);
  });

  d.addEventListener("mousedown", function (e) {
    var grip = e.target.closest ? e.target.closest(".skc-grip") : null;
    if (!grip) return;
    var li = closestBox(grip);
    if (li) li.setAttribute("draggable", "true");
  });

  d.addEventListener("mouseup", function () {
    w.setTimeout(function () {
      $$("[draggable='true']").forEach(function (el) {
        el.setAttribute("draggable", "false");
      });
    }, 0);
  });

  d.addEventListener("dragstart", function (e) {
    var li = closestBox(e.target);
    if (!li) return;
    if (e.dataTransfer) {
      e.dataTransfer.setData("text/plain", "");
      e.dataTransfer.effectAllowed = "move";
    }
    dragging = li;
    li.setAttribute("draggable", "true");
    ghost = dragPreview(li);
    moveGhost(e);
  });

  d.addEventListener("dragend", ghostCleanup);

  d.addEventListener("dragover", function (e) {
    if (!dragging) {
      ghostCleanup();
      return;
    }
    var li = dropTarget(e.target, dragging);
    if (li && li !== dragging && li.parentNode === dragging.parentNode) {
      e.preventDefault();
      li.classList.add("skc-drag-over");
    } else {
      $$(".skc-drag-over").forEach(function (el) {
        el.classList.remove("skc-drag-over");
      });
    }
    moveGhost(e);
  });

  d.addEventListener("dragleave", function (e) {
    if (e.target.nodeType !== 1) return;
    var li = closestBox(e.target);
    if (li) li.classList.remove("skc-drag-over");
  });

  d.addEventListener("drop", function (e) {
    if (!dragging) return;
    var li = dropTarget(e.target, dragging);
    if (!li || li === dragging || li.parentNode !== dragging.parentNode) {
      ghostCleanup();
      return;
    }
    e.preventDefault();
    var rect = li.getBoundingClientRect();
    var after = e.clientY > rect.top + rect.height / 2;
    li.parentNode.insertBefore(dragging, after ? li.nextElementSibling : li);
    ghostCleanup();
  });

  function render() {
    $("#skcParty").innerHTML = optionList(OPTIONS.parties, "Select party");
    $("#skcBuyer").innerHTML = optionList(OPTIONS.buyers, "Select buyer");
    $("#skcTeam").innerHTML = optionList(OPTIONS.teams, "Select team");
    $("#skcBranch").innerHTML = optionList(OPTIONS.branches, "Select branch");

    $("#skcDate").value = todayISO();
    $("#skcRef").value = nextRef(loadSaved());

    addItem();

    $("#skcSaveBtn").addEventListener("click", save);
    $("#skcResetBtn").addEventListener("click", reset);

    d.addEventListener("input", function (e) {
      if (e.target.closest && e.target.closest("#skMain")) recalc();
    });

    refreshSide();
    recalc();
  }

  return { render: render };
})(window, document);