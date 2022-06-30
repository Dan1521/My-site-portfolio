
document.addEventListener('DOMContentLoaded', () => {
	const page = document.querySelector('#fullpage'),
		filterTag = document.querySelectorAll('[data-filter]'),
		cards = document.querySelectorAll('[data-category]'),
		burger = document.querySelector('.burger'),
		menu = document.querySelector('.menu'),
		skills = document.querySelectorAll('.skill'),
		sectionSkills =document.querySelector('.section--skills');

	if (page) {
		let myFullpage = new fullpage( page, {
			autoScrolling: true,
			scrollHorizontally: true,
			scrollingSpeed: 800,
			css3: true,
			fitToSection: false,
			easingcss3: 'ease-in-out',

			menu: '.menu',
		});
	}
	if (filterTag && cards) {
		filterTag.forEach((filter) => {
			filter.addEventListener('click', (event) => {
				let self = event.currentTarget,
					selfTag = self.dataset.filter;

				filterTag.forEach((elem) => {
					elem.classList.remove('active');
				})
				self.classList.add('active');

				cards.forEach((card) => {
					let category = card.dataset.category,
						categorys = category.split(' ');// Преобарзовение строуи с категориями в  массив

						if (1 < categorys.length) {
							for (let i = 0; i < categorys.length; i++) {
								let element = categorys[i];
								card.classList.add('hide');

								if (selfTag == String(element)) { //Если теги равны то показываем карточку
									card.classList.remove('hide');
									break;
								}
							}
						} else {
							card.classList.remove('hide');
							if (selfTag != String(categorys[0])) {
								card.classList.add('hide');// Если теги разные, то скрываем карточку
							}
						}
						if (selfTag == 'all') {
							card.classList.remove('hide');
						}
				})
			})
		})

	}
	if (burger && menu) {
		window.addEventListener('click', (e) => {
			if (e.target.contains(burger)) {
				if (!burger.classList.contains('active') && !menu.classList.contains('menu-open') ) {
					burger.classList.add('active');
					menu.classList.add('menu-open');
					document.body.classList.add('no-scroll');
				} else {
					burger.classList.remove('active');
					menu.classList.remove('menu-open');
					document.body.classList.remove('no-scroll');
				}
			} else if (!e.target.contains(menu) ) {
				burger.classList.remove('active');
				menu.classList.remove('menu-open')
			}
		})
	}
	if (skills) {
			skills.forEach((element) => {
				let circle = element.querySelector('.skill__progress-circle'),
					persent = element.dataset.persent;
					persent = +persent;

				let radius = circle.r.baseVal.value,
					circumference = 2 * Math.PI * radius,
					offset = circumference - persent / 100 * circumference;

				circle.style.strokeDashoffset = offset;
				circle.style.strokeDasharray = `${circumference} ${circumference}`;
			});
	}
});



