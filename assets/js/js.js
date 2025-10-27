var vh = 0.01 * window.innerHeight;
function mostrar_cargando() {
  $("body").append(
    '<div class="cargando"><div class="interior"><div></div><div></div><div></div><div></div><div></div></div><div class="fondo"></div></div>'
  );
}
function destruir_cargando() {
  $(".cargando").remove();
}
function colocar() {
  $(".mitades").length > 0 &&
    $(".mitades .mitad").each(function (e, t) {
      var o =
        ($(this).outerHeight() - $(this).find(".texto").outerHeight()) / 2;
      $(this).find(".secundarias .imagen:nth-of-type(2)").css("top", o);
    }),
    $(".contacto .mapa iframe").length > 0 &&
      $(".contacto .mapa iframe").css(
        "height",
        $(".contacto .formulario").outerHeight()
      );
}
document.documentElement.style.setProperty("--vh", `${vh}px`),
  $(document).ready(function () {
    colocar(),
      $.cookieBar({
        acceptAnyClick: !1,
        acceptButton: !0,
        acceptFunction: null,
        acceptOnContinue: !1,
        acceptOnScroll: !1,
        acceptText: cookies_aceptar,
        append: !1,
        autoEnable: !0,
        bottom: !1,
        declineButton: !1,
        declineFunction: null,
        declineText: null,
        domain: site_url,
        effect: "slide",
        element: "body",
        expireDays: 365,
        fixed: !0,
        forceShow: !1,
        message: cookies_texto,
        policyButton: !0,
        policyText: cookies_info,
        policyURL: cookies_url,
        referrer: site_url,
        renewOnVisit: !1,
        zindex: "",
      }),
      hay_fancybox &&
        $(".desplegar_legal").length > 0 &&
        $(".desplegar_legal").click(function () {
          var e = $(this).attr("data-valor");
          mostrar_cargando(),
            $.ajax({
              url: site_url + "inicio/legal",
              data: { id_contenido: e },
              cache: !1,
              type: "post",
              dataType: "json",
            }).done(function (e) {
              if ((destruir_cargando(), "" != e)) {
                var t = e.titulo,
                  o = e.descripcion;
                $.fancybox.open(
                  '<div class="format_popup legal"><div class="tit">' +
                    t +
                    '</div><div class="limit"><div>' +
                    o +
                    "</div></div></div>"
                );
              }
            });
        }),
      $(".formulario").length > 0 &&
        ($(".formulario .campo input").keypress(function (e) {
          13 == e.keyCode && $(this).parents("form").submit();
        }),
        $(".formulario form .botones .boton").click(function () {
          $(this).parents("form").submit();
        }),
        $(".formulario form").submit(function (e) {
          e.preventDefault();
          var t = $(this),
            o = new FormData(t[0]);
          $.ajax({
            url: t.attr("action"),
            data: o,
            cache: !1,
            type: "post",
            dataType: "json",
            contentType: !1,
            processData: !1,
          }).done(function (e) {
            destruir_cargando();
            var o = e.correcto,
              i = $(".tit_js").text(),
              n = e.mensaje;
            $.fancybox.open(
              '<div class="format_popup minified"><div class="tit">' +
                i +
                '</div><div class="limit"><ul>' +
                n +
                "</ul></div></div>"
            ),
              o &&
                (t.find('input[type="text"]').val(""),
                t.find('input[type="email"]').val(""),
                t.find('input[type="tel"]').val(""),
                t.find('input[type="number"]').val(""),
                t.find('input[type="date"]').val(""),
                t.find('input[type="password"]').val(""),
                t.find("select").val(""),
                t.find("textarea").val(""),
                t.find('input[type="checkbox"]').prop("checked", !1),
                t.find('input[type="radio"]').prop("checked", !1),
                t.find('input[type="file"]').val(""));
          });
        }));
  }),
  $(window).on("load", function () {
    $("html").addClass("loaded"),
      $(".mm-ocd__backdrop").click(function (e) {
        e.stopPropagation(), $('a[href="#my-mmmenu"]').removeClass("on");
      }),
      colocar();
  }),
  $(window).resize(function (e) {
    colocar();
  }),
  $(window).on("orientationchange", function () {
    colocar();
  }),
  $(window).scroll(function () {
    var e = $(window).height();
    $(window).scrollTop() > 0.5 * e
      ? $("body").addClass("fixed")
      : $("body").removeClass("fixed");
  }),
  $(document).on("submit", "form", function () {
    mostrar_cargando();
  }),
  $(".menu_ham").length > 0 &&
    document.addEventListener("DOMContentLoaded", () => {
      const e = new MmenuLight(document.querySelector("#mmmenu")),
        t =
          (e.navigation({ title: "Bowling Box", slidingSubmenus: !0 }),
          e.offcanvas({}));
      document
        .querySelector('a[href="#my-mmmenu"]')
        .addEventListener("click", (e) => {
          e.preventDefault(),
            t.open(),
            $('a[href="#my-mmmenu"]').addClass("on");
        });
    });






      // Pausar animación cuando la pestaña no está activa (ahorro de recursos)
  document.addEventListener("visibilitychange", () => {
    const sliders = document.querySelectorAll(".slide-track");
    sliders.forEach(track => {
      track.style.animationPlayState = document.hidden ? "paused" : "running";
    });
  });