var mainSectionHeight = function() {
  var total    = $(window).height(),
      $main_section = $('section.main-section').css('height','auto'); // 用于获取自然高度

  if ($main_section.outerHeight(true) < total) {
    var margin = $main_section.outerHeight(true) - $main_section.height();
    $main_section.height(total - margin - 20);  // 额外预留20px
  } else {
    $main_section.css('height','auto');
  }
}

$(window).resize(mainSectionHeight);

// 创建导航
$(function() {
  $("section.main-section h1, section.main-section h2, section.main-section h3").each(function(){
    $("nav ul").append("<li class='tag-" + this.nodeName.toLowerCase() + "'><a href='#" + $(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,'') + "'>" + $(this).text() + "</a></li>");
    $(this).attr("id",$(this).text().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,''));
    $("nav ul li:first-child a").parent().addClass("active");
  });

  $("nav ul li").on("click", "a", function(event) {
    var position = $($(this).attr("href")).offset().top - 190;
    $("html, body").animate({scrollTop: position}, 400);
    $("nav ul li a").parent().removeClass("active");
    $(this).parent().addClass("active");
    event.preventDefault();
  });

  mainSectionHeight();

  $('img').on('load', mainSectionHeight); // 每当有图片加载完，就重新计算高度
});
