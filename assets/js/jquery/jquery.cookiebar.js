(function (b) {
  b.cookieBar = function (a, k) {
    var e = "cookies" == a ? "cookies" : "set" == a ? "set" : !1;
    a = b.extend(
      {
        message: "We use cookies to track usage and preferences.",
        acceptButton: !0,
        acceptText: "I Understand",
        acceptFunction: function (c) {
          "enabled" != c &&
            "accepted" != c &&
            (window.location = window.location.href);
        },
        declineButton: !1,
        declineText: "Disable Cookies",
        declineFunction: function (c) {
          if ("enabled" == c || "accepted" == c)
            window.location = window.location.href;
        },
        policyButton: !1,
        policyText: "Privacy Policy",
        policyURL: "/privacy-policy/",
        autoEnable: !0,
        acceptOnContinue: !1,
        acceptOnScroll: !1,
        acceptAnyClick: !1,
        expireDays: 365,
        renewOnVisit: !1,
        forceShow: !1,
        effect: "slide",
        element: "body",
        append: !1,
        fixed: !1,
        bottom: !1,
        zindex: "",
        domain: String(window.location.hostname),
        referrer: String(document.referrer),
      },
      a
    );
    var f = new Date();
    f.setTime(f.getTime() + 864e5 * a.expireDays);
    f = f.toGMTString();
    var l = "cb-enabled={value}; expires=" + f + "; path=/",
      g,
      d = "",
      m = document.cookie.split("; ");
    for (g = 0; g < m.length; g++) {
      var h = m[g].split("=");
      "cb-enabled" == h[0] && (d = h[1]);
    }
    "" == d && "cookies" != e && a.autoEnable
      ? ((d = "enabled"), (document.cookie = l.replace("{value}", "enabled")))
      : ("accepted" != d && "declined" != d) ||
        "cookies" == e ||
        !a.renewOnVisit ||
        (document.cookie = l.replace("{value}", d));
    a.acceptOnContinue &&
      0 <= a.referrer.indexOf(a.domain) &&
      -1 == String(window.location.href).indexOf(a.policyURL) &&
      "cookies" != e &&
      "set" != e &&
      "accepted" != d &&
      "declined" != d &&
      ((e = "set"), (k = "accepted"));
    if ("cookies" == e) return "enabled" == d || "accepted" == d ? !0 : !1;
    if ("set" != e || ("accepted" != k && "declined" != k)) {
      e = a.message.replace("{policy_url}", a.policyURL);
      f = a.acceptButton
        ? '<a href="" class="cb-enable">' + a.acceptText + "</a>"
        : "";
      var r = a.declineButton
          ? '<a href="" class="cb-disable">' + a.declineText + "</a>"
          : "",
        t = a.policyButton
          ? '<a href="' +
            a.policyURL +
            '" class="cb-policy">' +
            a.policyText +
            "</a>"
          : "",
        u = a.fixed
          ? a.bottom
            ? ' class="fixed bottom"'
            : ' class="fixed"'
          : "",
        v = "" != a.zindex ? ' style="z-index:' + a.zindex + ';"' : "";
      if (a.forceShow || "enabled" == d || "" == d)
        a.append
          ? b(a.element).append(
              '<div id="cookie-bar"' +
                u +
                v +
                "><p><span>" +
                e +
                "</span>" +
                f +
                r +
                t +
                "</p></div>"
            )
          : b(a.element).prepend(
              '<div id="cookie-bar"' +
                u +
                v +
                "><p><span>" +
                e +
                "</span>" +
                f +
                r +
                t +
                "</p></div>"
            );
      var x = function (c) {
          a.acceptOnScroll && b(document).off("scroll");
          "function" === typeof c && c(d);
          "slide" == a.effect
            ? b("#cookie-bar").slideUp(300, function () {
                b("#cookie-bar").remove();
              })
            : "fade" == a.effect
            ? b("#cookie-bar").fadeOut(300, function () {
                b("#cookie-bar").remove();
              })
            : b("#cookie-bar").hide(0, function () {
                b("#cookie-bar").remove();
              });
          b(document).unbind("click", w);
        },
        p = function () {
          document.cookie = l.replace("{value}", "accepted");
          x(a.acceptFunction);
        },
        w = function (c) {
          b(c.target).hasClass("cb-policy") || p();
        };
      b("#cookie-bar .cb-enable").click(function () {
        p();
        return !1;
      });
      b("#cookie-bar .cb-disable").click(function () {
        var c = new Date();
        c.setTime(c.getTime() - 864e6);
        c = c.toGMTString();
        m = document.cookie.split("; ");
        for (g = 0; g < m.length; g++)
          (h = m[g].split("=")),
            0 <= h[0].indexOf("_")
              ? (document.cookie =
                  h[0] +
                  "=0; expires=" +
                  c +
                  "; domain=" +
                  a.domain.replace("www", "") +
                  "; path=/")
              : (document.cookie = h[0] + "=0; expires=" + c + "; path=/");
        document.cookie = l.replace("{value}", "declined");
        x(a.declineFunction);
        return !1;
      });
      if (a.acceptOnScroll) {
        var q = b(document).scrollTop(),
          n,
          y;
        b(document).on("scroll", function () {
          n = b(document).scrollTop();
          y = n > q ? n - q : q - n;
          y >= Math.round(a.acceptOnScroll) && p();
        });
      }
      a.acceptAnyClick && b(document).bind("click", w);
    } else
      return (
        (document.cookie = l.replace("{value}", k)), "accepted" == k ? !0 : !1
      );
  };
})(jQuery);
