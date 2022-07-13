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

		// Modal

		$('[data-modal=consultation]').on('click', function() {
			$('.overlay, #consultation').fadeIn('slow');
		});

		$('.modal__close').on('click', function() {
			$('.overlay, #consultation, thanks, #order').fadeOut('slow');
		});

		$('.button--mini').each(function(i) {
			$(this).on('click', function() {
				$('#order .modal__subtitle').text($('.catalog-card__subtitle').eq(i).text());
				$('.overlay, #order').fadeIn('slow');
			});
		});

		function validForms(form) {
			$(form).validate({
				rules: {
					name: "required",
					phone: "required",
					email: {
						required: true,
						email: true
					}
				},
				messages: {
					name: "Пожалуйста, введите свое имя",
					phone: "Пожалуйста, введите свой номер телефона",
					email: {
						required: "Пожалуйста, введите свою электронную почту",
						email: "Не верный формат записи адреса почты"
					}
				}
			});
		};

		validForms('#consultation-form');
		validForms('#consultation form');
		validForms('#order form');

		$('form').submit(function(e) {
			e.preventDefault();

			if (!$(this).valid()) {
				return;
			}

			$.ajax({
				type: "POST",
				url: "mailer/smart.php",
				data: $(this).serialize()
			}).done(function() {
				$(this).find("input").val("");
				$('#consultation, #order').fadeOut('slow');
				$('.overlay, #thanks').fadeIn('slow');

				$('form').trigger('reset');
			});
			return false;
		});

		$(window).scroll(function() {
			if ($(this).scrollTop() > 1600) {
				$('.scrollup').fadeIn();
			} else {
				$('.scrollup').fadeOut();
			}
		});

		$("a[href=#up]").click(function(){
			const _href = $(this).attr("href");
			$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
			return false;
		});
	});

