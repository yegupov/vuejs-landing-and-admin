<template lang="pug">
//- D:\Current work\WebDev\JavaScript\horizontal-scrolling-section
#reviews.reviews.section
	.container

		.horiz-scroll(ref="horizScrollSec")
			.horiz-scroll__container(ref="horizScrollContainer")
				.horiz-scroll__header(ref="headerHorizScrollSec")

					h2.sec-headline
						span(data-anima="textblind")
							span.textblind__row
								span.textblind__item Happy&nbsp;
									span.text-accent c
									| lients
									span.text-small (0{{allReviews.length}})

				.horiz-scroll__items(ref="horizScrollItems")
					.horiz-scroll__item(v-for="review in allReviews" :key="review.id")
						.horiz-scroll__item-img
							img(v-if="review.avatar" :src="`/img/${review.avatar}`" :alt='review.author')
							img(v-else src="/img/review.jpg")
						h4 {{review.author}}
						p {{review.position}}
						p.reviews__text(v-html="decoratedText(review.text)")

		.reviews__showall-btn
			.link(ref="showallbtn" @click.prevent="toggleAllReviews")
				span Show all
				span Collapse Reviews

		.horiz-scroll__footer
			.btn.btn_secondary(data-anima="jsprlx-top-1" @click.prevent="showModal")
				span Add review

	ReviewsModal(
		:visible="isModalVisible"
		:qtyReviews="allReviews.length"
		@close="closeModal")
		//- @addAnotherReview="addReview")
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
	name: 'Reviews',

	components: {
		ReviewsModal: () => import("@/components/front/ReviewsModal")
	},

	data: () => ({
		reviews: [],
		horizScrollSec: null,
		horizScrollItems: null,
		horizScrollContainer: null,
		scrollWidth: 0,  // Full width horizScrollContainer
		verticalScrollHeight: 0,  // Разница между высотой всей скролл секции и высотой видимого контейнера
		isModalVisible: false,
		reviewItemHeight: 0,
		widthWindow: 0,
		scrollBarWidth: 0
	}),

	computed: {
		...mapGetters("reviews", ["allReviews"])
	},

	watch: {
		// Update Reviews когда добавили отзыв
		allReviews() { // изменяется только, когда добавляется отзыв на Фронте
			// Чтобы обновить, когда удалили отзыв, нужно перезагрузить страницу
			this.$emit('changeQtyReviews', this.reviewItemHeight);
			this.reviews = Object.assign([], this.allReviews);
			this.setHeightScrollSec();
		}
	},

	created() {
		if (!this.allReviews.length) this.reviews = Object.assign([], this.fetchReviews());
		else this.reviews = Object.assign([], this.allReviews);
		this.$emit('reviewsOnload');
	},

	beforeDestroy() {
		// remove listener again
		if (this.widthWindow > 767.9) {
			window.removeEventListener('resize', this.setHeightScrollSec);
			window.removeEventListener('scroll', this.initHorizontalScroll);
		}
	},

	mounted() {
		this.$nextTick( () => {
			this.horizScrollSec = this.$refs['horizScrollSec'];
			this.horizScrollItems = this.$refs['horizScrollItems'];
			this.horizScrollContainer = this.$refs['horizScrollContainer'];

			this.widthWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

			if (this.widthWindow > 767) {
				this.scrollWidth = this.horizScrollContainer.scrollWidth;
				this.verticalScrollHeight =
					this.horizScrollSec.getBoundingClientRect().height -
					this.horizScrollContainer.getBoundingClientRect().height;

				this.setHeightScrollSec();

				window.addEventListener('resize', this.setHeightScrollSec);
				document.addEventListener('scroll', this.initHorizontalScroll);
			}
		});
	},

	methods: {
		...mapActions("reviews", ["fetchReviews"]),
		...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

		setHeightScrollSec() {
			this.reviewItemHeight = [...this.horizScrollItems.children][0].clientHeight
				|| [...this.horizScrollItems.children][0].offsetHeight;
			const headerHeight = this.$refs['headerHorizScrollSec'].clientHeight
				|| this.$refs['headerHorizScrollSec'].offsetHeight;

			let increment = this.reviewItemHeight / 2.6 * this.allReviews.length;
			if (this.widthWindow <= 1400) increment = this.reviewItemHeight / 1.6 * this.allReviews.length;
			if (this.widthWindow <= 1200) increment = this.reviewItemHeight / 1.1 * this.allReviews.length;
			if (this.widthWindow <= 1024) increment = this.reviewItemHeight * this.allReviews.length + this.reviewItemHeight * 2.4;

			let reviewSecHeight = this.allReviews.length * this.reviewItemHeight + headerHeight;
			reviewSecHeight += increment;

			this.horizScrollSec.style.height = Math.trunc(reviewSecHeight) + 'px';
		},

		// file:///D:/Current%20work/WebDev/JavaScript/horizontal-scrolling-section/index.html
		initHorizontalScroll() {
			//Checking whether the sticky element has entered into view or not
			let horizScrollPosition = this.horizScrollContainer.getBoundingClientRect().top;

			if (horizScrollPosition > 30) {
				return;
			} else {
				const scrolled = this.horizScrollSec.getBoundingClientRect().top; //how much is scrolled?
				const scrollLeft = (this.scrollWidth / this.verticalScrollHeight) * (-scrolled) * 0.2 - 170;

				// this.horizScrollItems.scrollLeft = (this.scrollWidth / this.verticalScrollHeight) * (-scrolled) * 5.4;
				this.horizScrollItems.scrollLeft = Math.trunc(scrollLeft);

				this.horizScrollItems.setAttribute('data-left', Math.trunc(scrollLeft));
			}
		},

		showModal() {
			this.scrollBarWidth = window.innerWidth - document.getElementsByTagName('html')[0].clientWidth;

			this.isModalVisible = true;
			document.body.classList.add('noscroll');
			document.body.style.paddingRight = this.scrollBarWidth + 'px';
		},

		closeModal() {
			this.isModalVisible = false;
			document.body.classList.remove('noscroll');
			document.body.style.paddingRight = '0';
		},

		decoratedText(text) {
			const textItems = text.split(' ');
			const random = Math.floor(Math.random() * textItems.length);
			let newText = '';

			textItems.forEach( (item, index) => {
				if (index + 1 === random) newText += '<span class="text-accent color-success">' + item + '</span> ';
				else newText += item + ' ';
			});

			return newText.trim();
		},

		toggleAllReviews() {
			this.$refs['showallbtn'].classList.toggle('collapse');
			this.horizScrollItems.classList.toggle('allreviews-visible');
		}
	}
}
</script>

<style scoped lang="scss">
@import "../../styles/variables.scss";
@import "../../styles/mixins.scss";

.reviews.section {
	overflow: visible;
	background-color: $bg-color-beige;
	padding: 70px 0 140px;

	@include phone() {
		padding: 70px 0 100px;
		background-color: #151515;
		color: $bg-color-beige;
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
		transform: scaleX(-1);

		@include phone() {
			background: url('/img/icons/sec-border-dark.svg');
			background-size: cover;
		}
	}

	.reviews__showall-btn {
		display: none;

		@include tablet() {
			display: block;
			margin: 0 0 100px;
			text-align: center;
		}

		.link {
			display: inline-block;

			span:nth-child(1) {
				display: block;
			}

			span:nth-child(2) {
				display: none;
			}

			&.collapse {
				span:nth-child(1) {
					display: none;
				}

				span:nth-child(2) {
					display: block;
				}
			}

			@include phone() {
				color: $bg-color-beige;
			}
		}
	}

	.horiz-scroll__footer {
		margin: 30px 0 0 0;
		text-align: center;

		.btn {
			width: 100%;
		}
	}
}

.horiz-scroll {
	padding: 100px 0 100px;
	/* height: 600vh;  Подбираем такую высоту, чтоб успели до конца прокрутиться все items */

	@include tablet() {
		height: auto !important;
		padding: 100px 0 50px;
	}

	.horiz-scroll__container {
		position: sticky;
		top: 30px;
		// max-height: 55vh;
		max-height: calc(55vh + 180px);

		@include tablet() {
			position: relative;
			max-height: 15000px;
		}

		.horiz-scroll__header {
			padding-bottom: 45px;
		}

		.horiz-scroll__items {
			display: -webkit-flex;
			display: -ms-flex;
			display: flex;
			// max-height: 55vh;
			max-height: calc(55vh + 180px);
			overflow-x: hidden;
			overflow-y: hidden;

			.horiz-scroll__item {
				display: block;
				min-width: 50vw;
				height: 55vh;
				min-height: 414px;
				margin: 0 5px 0 0;
				padding: 3em;
				border: 1px solid $lines-color;
				border-radius: 15px;
				background: $bg-color-beige;
				transition: all 0.2s ease-out;

				@include desktop() {
					min-width: 60vw;
				}

				@include notebook() {
					min-width: 70vw;
				}

				@include netbook() {
					min-width: calc(86vw - 4px);
				}

				@include tablet() {
					height: auto;
					min-height: 150px;
					margin: 0 0 10px;
					padding: 3em 3em 4.5em;
					display: none;

					&:nth-child(1), &:nth-child(2) {
						display: block;
					}
				}

				@include phone() {
					color: $text-color;
				}

				@include phoneSmall() {
					padding: 1.5em 1.5em 2.5em;
				}

				&:last-child {
					margin: 0;
				}

				.horiz-scroll__item-img {
					float: left;
					margin: 0 30px 10px 0;
					width: 70px;
					height: 70px;
					border-radius: 50%;

					img {
						width: 100%;
						height: 100%;
						border-radius: 50%;
						transition: all 0.3s ease-out;
					}
				}

				h4 {
					margin: 3px 0 0 0;
					font-size: 2rem;
					font-weight: 600;
				}

				p {
					margin: 0;
					min-height: 17px;
					font-size: 0.9rem;

					&.reviews__text {
						margin: 40px 0 0 5px;
						font-size: 1.3rem;
						line-height: 1.42;
					}
				}

				&:hover {
					// background-color: $text-color;
					border: 1px solid $links-color;

					.horiz-scroll__item-img {
						background-color: $links-color;

						img {
							transform: scale(0.75);
						}
					}

					h4, p {
						// color: $bg-color-beige;
					}
				}
			}

			@include tablet() {
				flex-direction: column;
				max-height: 15000px;

				&.allreviews-visible {
					.horiz-scroll__item {
						display: block;
					}
				}
			}
		}
	}
}

</style>
