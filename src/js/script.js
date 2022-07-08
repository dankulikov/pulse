$(document).ready(function(){
    $('.carousel__inner').slick({
      speed: 1000,
      // adaptiveHeight: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="img/slider/arrow-left.svg"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="img/slider/arrow-right.svg"></button>',
      responsive: [
        {
          breakpoint: 992,
          settings: {
            dots: true,
            arrows: false
          }
        }
      ]
    });
    
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab--active)', function() {
      $(this)
        .addClass('catalog__tab--active').siblings().removeClass('catalog__tab--active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content--active').eq($(this).index()).addClass('catalog__content--active');
    });

    function toggleSlide(item) {
      $(item).each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-card__content').eq(i).toggleClass('catalog-card__content--active');
          $('.catalog-card__backside').eq(i).toggleClass('catalog-card__backside--active');
        })
      });
    };

    toggleSlide('.catalog-card__link');
    toggleSlide('.catalog-card__link-back');
  });

