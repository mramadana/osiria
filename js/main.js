$(window).on("load", function () {
  $(".loader")
    .delay(200)
    .fadeOut(2000, function () {
      $("body").css("overflow", "auto");
    });
});

$(document).ready(function () {
    "use strict";
    let isRtl = $('html[lang="ar"]').length > 0;

    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    };
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }

    aos_init();

    // function aos_init() {
    //   AOS.init({
    //     duration: 1000,
    //     once: true
    //   });
    // }

    function aos_init() {
      AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        mirror: false
      });
    }


    // animation aos init

    

// when click to responsive btn show ul and overlay
    $(".nav-btn").click(function() {
      $(this).addClass('active');
      $(".nav-links").addClass('active');
      $(".nav-overlay").addClass('show')
    })

    // when i click on overlay remove class show and remove ul

    $(".nav-overlay, .header-m-line-start").click(function() {
      $(".nav-btn").removeClass('active');
      $(".nav-links").removeClass('active');
      $(".nav-overlay").removeClass('show')
    })

    //   start to back-to-top button
    $(window).scroll(function() {
        if($(window).scrollTop() > 50) {
            $(".back-to-top").addClass('show')
        } else {
            $(".back-to-top").removeClass('show')
        }
    });
  
    // when i click back-to-top
    $(".back-to-top").click(function() {
        $("html").scrollTop(0);
    });
    
    // select-2
    $('.select-plugin').select2({
      dir: isRtl ? "rtl" : "ltr"
  });

  $('.select').select2({
      dir: isRtl ? "rtl" : "ltr"
  });

  $(':input[type="number"]').on("input", function() {
    var nonNumReg = /[^0-9]/g
    $(this).val($(this).val().replace(nonNumReg, ''));
  })


  let isFixed = function () {

    if ($(window).scrollTop() > 50) {
      $(".header").addClass("fixed");
      $(".top-header").addClass("unactive");

    } else {
      $(".header").removeClass("fixed");
      $(".top-header").removeClass("unactive");

    }
  };

  isFixed();

  $(window).on("scroll", function () {
    isFixed();
  });

  let navbarlinks = select('#navbar .link', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 10
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  // Get the dropdown element
var dropdownMenu = $(".dr-lang .dropdown-menu");

// Set the initial value of the dropdown from local storage
if (localStorage.getItem("selectedOption")) {
  dropdownMenu.find("a[data-value='" + localStorage.getItem("selectedOption") + "']").addClass("active");
}

// Add an event listener to the dropdown menu
dropdownMenu.on("click", "a", function() {
  // Get the selected value and text
  var selectedValue = $(this).data("value");
  var selectedText = $(this).text();

  $(".dr-lang #dropdownMenuButton .text").css("display", "none");

  // Update the dropdown text
  $("#selectedOptionText").text(selectedText);

  // Update the local storage value
  localStorage.setItem("selectedOption", selectedValue);

  // Remove the active class from all links
  dropdownMenu.find("a").removeClass("active");

  // Add the active class to the selected link
  $(this).addClass("active");
});

// Set the initial text of the dropdown
var initialSelectedValue = localStorage.getItem("selectedOption");
if (initialSelectedValue) {
  var initialSelectedText = dropdownMenu.find("a[data-value='" + initialSelectedValue + "']").text();
  $("#selectedOptionText").text(initialSelectedText);
}

if ($(".dr-lang .dropdown-item").hasClass("active")) {
  $(".dr-lang #dropdownMenuButton .text").css("display", "none");
}

  const setRtlDir = function () {
    $("html").attr({
      dir: "rtl",
      lang: "ar",
    });

    $("#style").attr("href", "css/bootstrap-rtl.min.css");
    $("#js_link").attr("src", "js/bootstrap-rtl.min.js");
    console.log("arabic");
    localStorage.removeItem("spruhaltr");
    localStorage.setItem("spruhartl", true);
  };

  const setLtrDir = function () {
    $("html").attr({
      dir: "ltr",
      lang: "en",
    });
    $("#style").attr("href", "css/bootstrap.min.css");
    $("#js_link").attr("src", "js/bootstrap.min.js");
    console.log("english");

    localStorage.removeItem("spruhartl");
    localStorage.setItem("spruhaltr", true);
  };

  $(document).on("click", ".ar-lang", function (e) {
    e.preventDefault();
    if(localStorage.getItem("spruhaltr")){
      setRtlDir();
      // location.reload();
    }
    

  });

  $(document).on("click", ".en-lang", function (e) {
    e.preventDefault();
    if(localStorage.getItem("spruhartl")){
      setLtrDir();
      // location.reload();
    }
  });

  // if(localStorage.getItem("spruhartl"))

  if (localStorage.getItem("spruhaltr")) {
    setLtrDir();
  }
  if (localStorage.getItem("spruhartl")) {
    setRtlDir();
  }
    
});