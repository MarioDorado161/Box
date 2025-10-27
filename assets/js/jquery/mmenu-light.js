var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function (a) {
  var c = 0;
  return function () {
    return c < a.length ? { done: !1, value: a[c++] } : { done: !0 };
  };
};
$jscomp.arrayIterator = function (a) {
  return { next: $jscomp.arrayIteratorImpl(a) };
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.ISOLATE_POLYFILLS = !1;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
$jscomp.defineProperty =
  $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
    ? Object.defineProperty
    : function (a, c, f) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[c] = f.value;
        return a;
      };
$jscomp.getGlobal = function (a) {
  a = [
    "object" == typeof globalThis && globalThis,
    a,
    "object" == typeof window && window,
    "object" == typeof self && self,
    "object" == typeof global && global,
  ];
  for (var c = 0; c < a.length; ++c) {
    var f = a[c];
    if (f && f.Math == Math) return f;
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE =
  "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS =
  !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function (a, c) {
  var f = $jscomp.propertyToPolyfillSymbol[c];
  if (null == f) return a[c];
  f = a[f];
  return void 0 !== f ? f : a[c];
};
$jscomp.polyfill = function (a, c, f, b) {
  c &&
    ($jscomp.ISOLATE_POLYFILLS
      ? $jscomp.polyfillIsolated(a, c, f, b)
      : $jscomp.polyfillUnisolated(a, c, f, b));
};
$jscomp.polyfillUnisolated = function (a, c, f, b) {
  f = $jscomp.global;
  a = a.split(".");
  for (b = 0; b < a.length - 1; b++) {
    var e = a[b];
    if (!(e in f)) return;
    f = f[e];
  }
  a = a[a.length - 1];
  b = f[a];
  c = c(b);
  c != b &&
    null != c &&
    $jscomp.defineProperty(f, a, { configurable: !0, writable: !0, value: c });
};
$jscomp.polyfillIsolated = function (a, c, f, b) {
  var e = a.split(".");
  a = 1 === e.length;
  b = e[0];
  b = !a && b in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
  for (var n = 0; n < e.length - 1; n++) {
    var p = e[n];
    if (!(p in b)) return;
    b = b[p];
  }
  e = e[e.length - 1];
  f = $jscomp.IS_SYMBOL_NATIVE && "es6" === f ? b[e] : null;
  c = c(f);
  null != c &&
    (a
      ? $jscomp.defineProperty($jscomp.polyfills, e, {
          configurable: !0,
          writable: !0,
          value: c,
        })
      : c !== f &&
        (void 0 === $jscomp.propertyToPolyfillSymbol[e] &&
          ((f = (1e9 * Math.random()) >>> 0),
          ($jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE
            ? $jscomp.global.Symbol(e)
            : $jscomp.POLYFILL_PREFIX + f + "$" + e)),
        $jscomp.defineProperty(b, $jscomp.propertyToPolyfillSymbol[e], {
          configurable: !0,
          writable: !0,
          value: c,
        })));
};
$jscomp.initSymbol = function () {};
$jscomp.polyfill(
  "Symbol",
  function (a) {
    if (a) return a;
    var c = function (n, p) {
      this.$jscomp$symbol$id_ = n;
      $jscomp.defineProperty(this, "description", {
        configurable: !0,
        writable: !0,
        value: p,
      });
    };
    c.prototype.toString = function () {
      return this.$jscomp$symbol$id_;
    };
    var f = "jscomp_symbol_" + ((1e9 * Math.random()) >>> 0) + "_",
      b = 0,
      e = function (n) {
        if (this instanceof e)
          throw new TypeError("Symbol is not a constructor");
        return new c(f + (n || "") + "_" + b++, n);
      };
    return e;
  },
  "es6",
  "es3"
);
$jscomp.polyfill(
  "Symbol.iterator",
  function (a) {
    if (a) return a;
    a = Symbol("Symbol.iterator");
    for (
      var c =
          "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(
            " "
          ),
        f = 0;
      f < c.length;
      f++
    ) {
      var b = $jscomp.global[c[f]];
      "function" === typeof b &&
        "function" != typeof b.prototype[a] &&
        $jscomp.defineProperty(b.prototype, a, {
          configurable: !0,
          writable: !0,
          value: function () {
            return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
          },
        });
    }
    return a;
  },
  "es6",
  "es3"
);
$jscomp.iteratorPrototype = function (a) {
  a = { next: a };
  a[Symbol.iterator] = function () {
    return this;
  };
  return a;
};
!(function (a) {
  function c(b) {
    if (f[b]) return f[b].exports;
    var e = (f[b] = { i: b, l: !1, exports: {} });
    return a[b].call(e.exports, e, e.exports, c), (e.l = !0), e.exports;
  }
  var f = {};
  c.m = a;
  c.c = f;
  c.d = function (b, e, n) {
    c.o(b, e) || Object.defineProperty(b, e, { enumerable: !0, get: n });
  };
  c.r = function (b) {
    "undefined" != typeof Symbol &&
      Symbol.toStringTag &&
      Object.defineProperty(b, Symbol.toStringTag, { value: "Module" });
    Object.defineProperty(b, "__esModule", { value: !0 });
  };
  c.t = function (b, e) {
    if (
      (1 & e && (b = c(b)), 8 & e) ||
      (4 & e && "object" == typeof b && b && b.__esModule)
    )
      return b;
    var n = Object.create(null);
    if (
      (c.r(n),
      Object.defineProperty(n, "default", { enumerable: !0, value: b }),
      2 & e && "string" != typeof b)
    )
      for (var p in b)
        c.d(
          n,
          p,
          function (q) {
            return b[q];
          }.bind(null, p)
        );
    return n;
  };
  c.n = function (b) {
    var e =
      b && b.__esModule
        ? function () {
            return b["default"];
          }
        : function () {
            return b;
          };
    return c.d(e, "a", e), e;
  };
  c.o = function (b, e) {
    return Object.prototype.hasOwnProperty.call(b, e);
  };
  c.p = "";
  c((c.s = 0));
})([
  function (a, c, f) {
    f.r(c);
    var b = (function () {
        function m(d) {
          var g = this;
          this.listener = function (k) {
            (k.matches ? g.matchFns : g.unmatchFns).forEach(function (h) {
              h();
            });
          };
          this.toggler = window.matchMedia(d);
          this.toggler.addListener(this.listener);
          this.matchFns = [];
          this.unmatchFns = [];
        }
        return (
          (m.prototype.add = function (d, g) {
            this.matchFns.push(d);
            this.unmatchFns.push(g);
            (this.toggler.matches ? d : g)();
          }),
          m
        );
      })(),
      e = function (m) {
        return Array.prototype.slice.call(m);
      },
      n =
        ("ontouchstart" in window || navigator.msMaxTouchPoints,
        -1 < navigator.userAgent.indexOf("MSIE") ||
          -1 < navigator.appVersion.indexOf("Trident/")),
      p = (function () {
        function m(d, g, k, h, l) {
          this.node = d;
          this.title = g;
          this.slidingSubmenus = h;
          this.selectedClass = k;
          this.node.classList.add("mm-spn");
          n && (this.slidingSubmenus = !1);
          this.node.classList.add("mm-spn--" + l);
          this.node.classList.add(
            "mm-spn--" + (this.slidingSubmenus ? "navbar" : "vertical")
          );
          this._setSelectedl();
          this._initAnchors();
        }
        return (
          Object.defineProperty(m.prototype, "prefix", {
            get: function () {
              return "mm-spn";
            },
            enumerable: !1,
            configurable: !0,
          }),
          (m.prototype.openPanel = function (d) {
            var g = d.parentElement;
            if (this.slidingSubmenus) {
              var k = d.dataset.mmSpnTitle;
              g === this.node
                ? this.node.classList.add("mm-spn--main")
                : (this.node.classList.remove("mm-spn--main"),
                  k ||
                    e(g.children).forEach(function (h) {
                      h.matches("a, span") && (k = h.textContent);
                    }));
              k || (k = this.title);
              this.node.dataset.mmSpnTitle = k;
              e(
                (this.node || document).querySelectorAll(".mm-spn--open")
              ).forEach(function (h) {
                h.classList.remove("mm-spn--open");
                h.classList.remove("mm-spn--parent");
              });
              d.classList.add("mm-spn--open");
              d.classList.remove("mm-spn--parent");
              for (d = d.parentElement.closest("ul"); d; )
                d.classList.add("mm-spn--open"),
                  d.classList.add("mm-spn--parent"),
                  (d = d.parentElement.closest("ul"));
            } else
              for (
                g = d.matches(".mm-spn--open"),
                  e(
                    (this.node || document).querySelectorAll(".mm-spn--open")
                  ).forEach(function (h) {
                    h.classList.remove("mm-spn--open");
                  }),
                  d.classList[g ? "remove" : "add"]("mm-spn--open"),
                  d = d.parentElement.closest("ul");
                d;

              )
                d.classList.add("mm-spn--open"),
                  (d = d.parentElement.closest("ul"));
          }),
          (m.prototype._setSelectedl = function () {
            var d = e(
              (this.node || document).querySelectorAll("." + this.selectedClass)
            );
            d = d[d.length - 1];
            var g = null;
            d && (g = d.closest("ul"));
            g || (g = this.node.querySelector("ul"));
            this.openPanel(g);
          }),
          (m.prototype._initAnchors = function () {
            var d = this;
            this.node.addEventListener("click", function (g) {
              var k = g.target,
                h = !1;
              (h =
                (h =
                  (h = h || !!k.matches("a")) ||
                  (function (l) {
                    var r;
                    return (
                      !!(r = l.closest("span")
                        ? l.parentElement
                        : !!l.closest("li") && l) &&
                      (e(r.children).forEach(function (t) {
                        t.matches("ul") && d.openPanel(t);
                      }),
                      !0)
                    );
                  })(k)) ||
                (function (l) {
                  l = e((l || document).querySelectorAll(".mm-spn--open"));
                  if ((l = l[l.length - 1]))
                    if ((l = l.parentElement.closest("ul")))
                      return d.openPanel(l), !0;
                  return !1;
                })(k)) && g.stopImmediatePropagation();
            });
          }),
          m
        );
      })(),
      q = (function () {
        function m(d, g) {
          var k = this;
          void 0 === d && (d = null);
          this.wrapper = document.createElement("div");
          this.wrapper.classList.add("mm-ocd");
          this.wrapper.classList.add("mm-ocd--" + g);
          this.content = document.createElement("div");
          this.content.classList.add("mm-ocd__content");
          this.wrapper.append(this.content);
          this.backdrop = document.createElement("div");
          this.backdrop.classList.add("mm-ocd__backdrop");
          this.wrapper.append(this.backdrop);
          document.body.append(this.wrapper);
          d && this.content.append(d);
          var h = function (l) {
            k.close();
            l.stopImmediatePropagation();
          };
          this.backdrop.addEventListener("touchstart", h, { passive: !0 });
          this.backdrop.addEventListener("mousedown", h, { passive: !0 });
        }
        return (
          Object.defineProperty(m.prototype, "prefix", {
            get: function () {
              return "mm-ocd";
            },
            enumerable: !1,
            configurable: !0,
          }),
          (m.prototype.open = function () {
            this.wrapper.classList.add("mm-ocd--open");
            document.body.classList.add("mm-ocd-opened");
          }),
          (m.prototype.close = function () {
            this.wrapper.classList.remove("mm-ocd--open");
            document.body.classList.remove("mm-ocd-opened");
          }),
          m
        );
      })();
    a = (function () {
      function m(d, g) {
        void 0 === g && (g = "all");
        this.menu = d;
        this.toggler = new b(g);
      }
      return (
        (m.prototype.navigation = function (d) {
          var g = this;
          if (!this.navigator) {
            var k = (d = d || {}).title,
              h = d.selectedClass,
              l = d.slidingSubmenus;
            d = d.theme;
            this.navigator = new p(
              this.menu,
              void 0 === k ? "Menu" : k,
              void 0 === h ? "Selected" : h,
              void 0 === l || l,
              void 0 === d ? "light" : d
            );
            this.toggler.add(
              function () {
                return g.menu.classList.add(g.navigator.prefix);
              },
              function () {
                return g.menu.classList.remove(g.navigator.prefix);
              }
            );
          }
          return this.navigator;
        }),
        (m.prototype.offcanvas = function (d) {
          var g = this;
          if (!this.drawer) {
            var k = (d = d || {}).position;
            this.drawer = new q(null, void 0 === k ? "left" : k);
            var h = document.createComment("original menu location");
            this.menu.after(h);
            this.toggler.add(
              function () {
                g.drawer.content.append(g.menu);
              },
              function () {
                g.drawer.close();
                h.after(g.menu);
              }
            );
          }
          return this.drawer;
        }),
        m
      );
    })();
    c["default"] = a;
    window.MmenuLight = a;
  },
]);
