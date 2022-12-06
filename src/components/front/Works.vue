<template lang="pug">
.works(ref="works")
	.container

		.works__header
			svg-icon(icon-name="arrow-large")
			.works__desc(data-anima="jsprlx-top-1")
				p Things I can help you with.
				h4 HTML layout / cms integration MODX and PrestaShop / Vue.js Development applications / Creation designs

		#works.works__headline
			.fl-right(data-anima="jsprlx-bottom-3")
				svg-icon(icon-name="arrow-large")

			h2.sec-headline(data-anima="jsprlx-top-2")
				span(data-anima="textblind")
					span.textblind__row
						span.textblind__item Feat W
							span.text-accent o
							| rks
							span.text-small (0{{allWorks.length}})

		ul.workcards(ref="workcards")
			li.workcards__item(
				v-for="work in allWorks"
				:key="work.id"
				@mouseover="toggleWorksBg(work.id, 'over')"
				@mouseout="toggleWorksBg(work.id)")
				a(:href="work.link" target="_blank" @click.prevent="seeWork(work.link, $event)")

					.workcards__img(data-anima="jsprlx-img")
						img(:src="`./img/${work.photo}`" :alt="work.title")

					.workcards__desc {{work.desc}}

					.workcards__btns
						ul.workcards__tags
							li.btn.btn_small(v-for="tech in work.techs.split(', ')") {{tech}}
						//- .btn.btn_small {{work.techs}}
						.btn {{work.title.slice(0, 24)}}
						.btn.btn_round
							svg#arrow(xmlns='http://www.w3.org/2000/svg' viewBox='0 0 9.56 9.56')
								line#line1(x1='0.27' y1='9.29' x2='9.18' y2='0.38' fill='none' stroke='#4e4e4e' stroke-miterlimit='10' stroke-width='0.75' style='stroke-dashoffset: 13.6006; stroke-dasharray: 0px, 23.6006px;')
								line#line2(x1='0.27' y1='9.29' x2='9.18' y2='0.38' fill='none' stroke='#4e4e4e' stroke-miterlimit='10' stroke-width='0.75' style='stroke-dashoffset: 0; stroke-dasharray: none;')
								polyline#arrow-head-1(points='5.01 0.38 9.18 0.38 9.18 4.55' fill='none' stroke='#4e4e4e' stroke-linecap='round' stroke-miterlimit='10' stroke-width='0.75' style='stroke-dashoffset: 9.34; stroke-dasharray: 0px, 19.34px;')
								polyline#arrow-head-2(points='5.01 0.38 9.18 0.38 9.18 4.55' fill='none' stroke='#4e4e4e' stroke-linecap='round' stroke-miterlimit='10' stroke-width='0.75' style='stroke-dashoffset: 0; stroke-dasharray: none;')

					.workcards__slideshow
						span
						.btn {{work.link}}
						cssSlideshow(:workId="work.id")

				.works__modal
					button.btn-close(type='button' @click='closeModal' aria-label='Close modal') ×
					h4 {{work.title}}
					//- .workcards__btns
					ul.workcards__tags
						li.btn.btn_small(v-for="tech in work.techs.split(', ')") {{tech}}
					p {{work.desc}}
					a.btn.btn_secondary(:href="work.link" target="_blank")
						span Go to website

		.works__footer(data-anima="showFromBottom")
			h3 Other works
			p
				span.link-arrow
					a.link(href="https://expoelectroseti.ru/" target="_blank") Expoelectroseti.ru
			p
				span.link-arrow
					a.link(href="https://damasclinic.ru/" target="_blank") Damasclinic.ru
			p
				span.link-arrow
					a.link(href="https://drperfetto.make-website.ru/" target="_blank") Drperfetto.ru
			p
				span.link-arrow
					a.link(href="http://yg-garments.ru/" target="_blank") Yg-garments.ru
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
	name: 'Works',

	components: {
		SvgIcon: () => import('@/components/SvgIcon'),
		cssSlideshow: () => import('@/components/cssSlideshow')
	},

	data: () => ({
		worksModal: null
	}),

	created() {
		if (!this.allWorks.length) this.fetchWorks();
		console.log('allWorks : ', this.allWorks);
	},

	computed: {
		...mapGetters("works", ["allWorks"])
	},

	mounted() {
		this.$nextTick( () => {
			this.displaySlideshow();
		});
	},

	// beforeDestroy() {
	// 	// remove listener again
	// },

	methods: {
		...mapActions("works", ["addWork", "fetchWorks"]),
		...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

		toggleWorksBg(workId, typeEvent) {
			if (typeEvent === 'over') this.$refs['works'].classList.add('bg' + workId);
			if (!typeEvent) this.$refs['works'].classList.remove('bg' + workId);
		},

		displaySlideshow() {
			const widthWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

			if (widthWindow > 576) {
				const workcards = this.$refs['workcards'];

				[...workcards.children].forEach( (item, index) => {
					const slideshow = item.querySelector('.workcards__slideshow');

					const listenerMousemove = (event) => {
						let itemCoords = item.getBoundingClientRect();

						let slideshowCoords = {
							top: event.clientY - itemCoords.top - item.clientTop,
							left: event.clientX - itemCoords.left - item.clientLeft
						};

						// prohibited from crossing borders  -  запрещено пересекать границы
						if (slideshowCoords.top < 10
							|| slideshowCoords.left < 10
							|| slideshowCoords.left > item.clientWidth - 10
							|| slideshowCoords.top > item.clientHeight - 10) slideshow.style.display = 'none';
						else slideshow.style.display = 'block';

						slideshow.style.left = slideshowCoords.left + 'px';
						slideshow.style.top = slideshowCoords.top + 'px';
					}

					item.addEventListener("mousemove", listenerMousemove, false);
					item.addEventListener("mouseleave", () => {
						slideshow.style.display = 'none';
					});

					// add data-anima for items
					const heightWindow = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
					if (heightWindow > 1024) {
						if (index === [...workcards.children].length - 2) {
							item.setAttribute('data-anima', 'jsprlx-bottom-2');
						}
					}
				});
			}

		},

		seeWork(link, e) {
			const widthWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

			if (widthWindow <= 576) {

				const work = e.target.closest('.workcards__item');
				this.worksModal = work.querySelector('.works__modal');

				this.worksModal.classList.add('active');
				document.body.classList.add('noscroll');

			} else {
				window.open(link, '_blank');
			}
		},

		closeModal() {
			this.worksModal.classList.remove('active');
			document.body.classList.remove('noscroll');
		}
	}
}
</script>

<style scoped lang="scss">
@import "../../styles/variables.scss";
@import "../../styles/mixins.scss";

.works {
	position: relative;
	padding: 150px 0 100px 0;
	background-color: $bg-color-gray;
	transition: background-color 1s ease-out;

	@include notebook() {
		padding: 100px 0 100px 0;
	}

	@include phone() {
		padding: 70px 0 100px 0;
		background-color: #282828;
	}

	&:before {
		content: "";
		position: absolute;
		width: 100%;
		top: -50px;
		left: 0;
		height: 150px;
		background: url('/img/icons/sec-border.svg');
		background-size: cover;
		transform: scaleY(-1);

		@include phone() {
			background: url('/img/icons/sec-border-dark.svg');
			background-size: cover;
			background-position: center right;
		}
	}

	&.bg1 { background-color: #8673A1; }
	&.bg2 { background-color: #9D9101; }
	&.bg3 { background-color: #E5BE01; }
	&.bg4 { background-color: #A12312; }
	&.bg5 { background-color: #287233; }
	&.bg6 { background-color: #E63244; }
	&.bg7 { background-color: #3F888F; }
	&.bg8 { background-color: #633A34; }

	.works__header {

		&:after {
			content: '';
			display: block;
			margin-left: 12%;
			height: 1px;
			width: 88%;
			background-color: $lines-color-dark;

			@include tablet() {
				margin-left: 0;
				width: 100%;
			}
		}

		.svg-icon {
			width: 64px;
			height: 64px;

			@include phone() {
				width: 45px;
				height: 45px;
			}

			@include phoneSmall() {
				width: 36px;
				height: 36px;
			}
		}

		.works__desc {
			margin: 20px 0 0 12%;
			padding: 0 60% 50px 0;

			@include tablet() {
				margin: 20px 0 0 20%;
				padding: 0 20% 50px 0;
			}

			h4 {
				font-size: 1.4rem;
				font-weight: 600;
				text-transform: uppercase;
				line-height: 1.1em;
				letter-spacing: 0.02rem;

				@include desktop() {
					font-size: 1.15rem;
				}

				@include tablet() {
					font-size: 1.4rem;
				}
			}

			p {
				font-size: 0.9rem;
				color: $text-color-gray;
				text-transform: uppercase;
			}
		}
	}

	.works__headline {
		padding: 150px 0 50px;

		.fl-right {
			margin-top: -24px;

			@include netbook() {
				margin-top: -110px;
			}

			@include tablet() {
				margin-top: -130px;
			}

			.svg-icon {
				margin-top: 25px;
				width: 64px;
				height: 64px;
				-webkit-transform: scaleX(-1);
				transform: scaleX(-1);

				@include phone() {
					width: 45px;
					height: 45px;
				}

				@include phoneSmall() {
					width: 36px;
					height: 36px;
				}
			}
		}
	}

	.works__footer {
		padding-left: 61.45%;

		@include tablet() {
			padding-left: 20%;
		}

		h3 {
			margin-bottom: 35px;

			@include phone() {
				color: $bg-color-beige;
			}
		}

		p {
			margin: 0;

			a.link {
				display: inline-block;
				padding: 1px 0 7px;
				font-size: 1.3rem;
				font-weight: 600;

				@include desktop() {
					font-size: 1.18rem;
				}

				@include netbook() {
					font-size: 1.3rem;
				}

				&:after, &:before {
					bottom: 8px;
				}

				&:hover {
					color: $text-color;
				}

				@include phone() {
					color: $bg-color-beige;

					&:hover, &:active, &:visited {
						color: rgba(252, 250, 248, 0.7);
					}
				}
			}
		}
	}
}
</style>
