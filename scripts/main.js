$(document).foundation(); // Initialize Foundation

$(document).ready(function() {
  var $window = $(window);
  var $section = $("section");
  var $pane = $(".pane");
  var $navLinks = $("#navMenu a");
  var $navLinksFirst = $("#navMenu a:first");
  var $navLinksLast = $("#navMenu a:last");
  var $touchToggle = $("#touchToggle");

  $window.scroll(debounce(scrollSpy, 10, true));

  $touchToggle.click(function() {
    $pane.toggleClass("transparent");
  });

  function scrollSpy() {
    var scrollDist = window.pageYOffset;
    var pageHeight = document.documentElement.scrollHeight;
    if (scrollDist >= 100) {
      if (scrollDist + window.innerHeight >= pageHeight - 100) {
        $navLinks.removeClass("current");
        $navLinksLast.addClass("current");
      } else {
        $section.each(function(s) {
          if ($(this).offset().top <= scrollDist + 200) {
            $navLinks.removeClass("current");
            $navLinks.eq(s).addClass("current");
          }
        });
      }
    } else {
      $navLinks.removeClass("current");
      $navLinksFirst.addClass("current");
    }
  }

  function debounce(func, wait, immediate) { // Limit function execution interval
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
});
