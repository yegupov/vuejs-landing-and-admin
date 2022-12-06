<template lang="pug">
//- .page-home(ref="pagehome")   .page-home__content  (v-if="!pageLoaded")
.page-home(ref="pagehome")
	Loader
	.page-home__content
		HeaderBar(:topPosSections="topPosSections")
		Hero
		.section
			About
			Works
		Reviews(
			@changeQtyReviews="updateTopPosSections"
			@reviewsOnload="reviewsOnload = true")
		FooterBar
</template>

<script>

export default {
	name: 'Front',

	components: {
		Loader: () => import('@/components/front/Loader'),
		HeaderBar: () => import('@/components/front/HeaderBar'),
		Hero: () => import('@/components/front/Hero'),
		About: () => import('@/components/front/About'),
		Works: () => import('@/components/front/Works'),
		Reviews: () => import('@/components/front/Reviews'),
		FooterBar: () => import('@/components/front/FooterBar'),
		SvgIcon: () => import("@/components/SvgIcon")
	},

	data: () => ({
		reviewsOnload: false,
		isScrolling: false,
		animatedElements: null,
		heightWindow: 0,
		menuLinks: null,
		topPosSections: [
			{id: 'about', topPos: 0},
			{id: 'works', topPos: 0},
			{id: 'reviews', topPos: 0},
			{id: 'contact', topPos: 0},
		]
	}),

	created() {
		// window.addEventListener('resize', this.updateHomePage);
	},

	beforeDestroy() {
		// remove listener again
		window.removeEventListener("scroll", this.throttleScroll);
		document.removeEventListener("DOMContentLoaded", this.scrolling);
		// window.removeEventListener('resize', this.updateHomePage);
	},

	mounted() {

		this.$nextTick( () => { // Дождаться завершения обновления DOM

			setTimeout( () => {
				document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
			}, 10);

			setTimeout( () => {
				document.body.classList.add('tooltip-home');
				this.$refs['pagehome'].classList.add('page-mounted');

				// topPosSections
				this.menuLinks = document.querySelectorAll('.header__menuitem > a');

				this.checkAnimaElemsLoad();

			}, 3600);

		});
	},

	methods: {
		addAnimationClass() {
			this.animatedElements = document.querySelectorAll('[data-anima]');

			window.addEventListener("scroll", this.throttleScroll, false);
			document.addEventListener("DOMContentLoaded", this.scrolling, false);
			// Событие DOMContentLoaded происходит, когда весь HTML был полностью загружен и пройден парсером,
			// не дожидаясь окончания загрузки таблиц стилей, изображений и фреймов.
		},

		throttleScroll() {
			if (this.isScrolling == false) {
				window.requestAnimationFrame( () => {
					// window.requestAnimationFrame – указывает браузеру на то, что вы хотите произвести анимацию,
					// и просит его запланировать перерисовку на следующем кадре анимации.
					// В качестве параметра метод получает функцию, которая будет вызвана перед перерисовкой.
					this.scrolling();
					this.isScrolling = false;
				});
			}
			this.isScrolling = true;
		},

		scrolling() {
			this.animatedElements.forEach((elem) => {
				const dataAnimate = elem.getAttribute('data-anima');

				let partiallyVisible = this.isPartiallyVisible(elem),
						animateClass = dataAnimate,
						scrollTop = window.scrollY,
						elemTop = partiallyVisible.elParams['top'];

				if (dataAnimate.indexOf('jsprlx') !== -1) { // jsprlx-top-9  OR  jsprlx-left-8  OR  jsprlx-img

					const dataAnimatParams = dataAnimate.split('-'),
							// prlxCorrection = dataAnimatParams[1] === 'top' || dataAnimatParams[1] === 'bottom' ? 80 : 140,
							animaSpeed = Number(dataAnimatParams[2]) * 0.6;
					let animatElTranslate = 0;

					animateClass = 'showFade';

					if (dataAnimatParams[1] === 'img') {
						const elemImgChild = elem.children[0];
						animatElTranslate = (this.heightWindow - elemTop) / 7;
						elemImgChild.style.transform = `translate3d(0px, -${Math.trunc(animatElTranslate)}px, 0px)`;
					}

					if (dataAnimatParams[1] === 'top') {
						// С помощью scrollTop
						// animatElTranslate = (scrollTop / ( 11 - Number(dataAnimatParams[2]) ) - prlxCorrection) * 1;

						animatElTranslate = (this.heightWindow - elemTop) / 8 * animaSpeed;
						elem.style.transform = 'translate3d(0px, -' + Math.trunc(animatElTranslate) + 'px, 0px)';
					}
					if (dataAnimatParams[1] === 'bottom') {
						// animatElTranslate = scrollTop / ( 16 - Number(dataAnimatParams[2]) ) - prlxCorrection;
						animatElTranslate = (this.heightWindow - elemTop) / 8 * animaSpeed;

						elem.style.transform = 'translate3d(0px, ' + Math.trunc(animatElTranslate) + 'px, 0px)';
					}

					if (dataAnimatParams[1] === 'left')
						elem.style.transform = 'translate3d(-' + Math.trunc(animatElTranslate) + 'px, 0px, 0px)';

					if (dataAnimatParams[1] === 'right')
						elem.style.transform = 'translate3d(' + Math.trunc(animatElTranslate) + 'px, 0px, 0px)';
				}

				if (dataAnimate.indexOf('jsrotate') !== -1) { // jsrotate-1
					const dataAnimatParams = dataAnimate.split('-'),
							// animatElTranslate = window.scrollY / (window.scrollY - Number(dataAnimatParams[1]) - 100);
							animatElTranslate = scrollTop / (Number(dataAnimatParams[1]) * 2 + 50);

					animateClass = 'showNow';
					elem.style.transform = 'rotate(' + Math.trunc(animatElTranslate) + 'deg)';
				}

				if (partiallyVisible.visible) {
					if (dataAnimate.indexOf('textblind') !== -1) {
						setTimeout( () => {
							elem.classList.add('animated', animateClass);
						}, 4000);
					}
					else {
						elem.classList.add('animated', animateClass);
					}
				} else {
					elem.classList.remove('animated', animateClass);
				}
				if (this.isFullyVisible(elem)) elem.classList.add('animated', animateClass);
			})
		},

		isPartiallyVisible(el) {
			const elementBoundary = el.getBoundingClientRect(),
						top = elementBoundary.top,
						bottom = elementBoundary.bottom,
						height = elementBoundary.height;
			return {
				visible: ((top + height >= 0) && (height + window.innerHeight >= bottom)),
				elParams: {top, bottom, height}
			}
		},

		isFullyVisible(el) {
			const elementBoundary = el.getBoundingClientRect(),
						top = elementBoundary.top,
						bottom = elementBoundary.bottom;

			return ((top >= 0) && (bottom <= window.innerHeight));
		},

		calculateTopPosSections() {
			this.heightWindow = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

			this.menuLinks.forEach( (link) => {
				const linkHref = link.getAttribute('href');

				if (linkHref.indexOf('#') !== -1 && linkHref.length > 1) {

					const section = document.getElementById(linkHref.slice(1));

					this.getTopPosSection(section, linkHref);
				}
			});

			// console.log('calculate TopPos Sections : ', this.topPosSections);
		},

		getTopPosSection(section, href) {
			if (section !== null) {
				const	secParams = this.isPartiallyVisible(section),
							topPosSec = secParams.elParams['top'];

				this.topPosSections.forEach( (sec) => {
					if (sec.id === href.slice(1)) sec.topPos = Math.trunc(topPosSec);
					// if (href === '#contact') console.log('Contact top pos = ', Math.trunc(topPosSec));
				});
			} else {
				setTimeout( () => {
					this.getTopPosSection(section)
				}, 10);
			}
		},

		updateTopPosSections(reviewItemHeight) {
			this.topPosSections.forEach( (section) => {
				// if (section.id === 'contact') section.topPos = section.topPos + reviewItemHeight - 200;
				if (section.id === 'contact') section.topPos = section.topPos + reviewItemHeight + 150;
			});
		},

		checkAnimaElemsLoad() {
			const firstAnimaElem = document.querySelectorAll('[data-anima]')[0];

      if (this.reviewsOnload && firstAnimaElem !== null) {
        this.addAnimationClass();
				this.calculateTopPosSections();
      } else {
        setTimeout( () => {
          this.checkAnimaElemsLoad();
        }, 5);
      }
    }
	}
}
</script>

<style lang="scss">
@import "../styles/front.scss";
</style>
