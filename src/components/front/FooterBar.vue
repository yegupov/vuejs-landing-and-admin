<template lang="pug">
#contact.footer.section(ref="footer")

	.footer__bg(ref="bgfooter")
		.footer__bg-sphere(ref="sphere")
			.footer__bg-gradient

	.footer__content.container
		h2 Let's talk
			span about the next
			span big thing
		.fl-left(data-anima="jsprlx-bottom-2")
			svg-icon(icon-name="arrow-large")

		.footer__btns.flexbox
			a.btn.btn_secondary(href="mailto:make.website.info@gmail.com" target="_blank")
				span Write a Message
			.btn.btn_secondary(@click.prevent="showModal")
				span Discuss Project

		.footer__links.flexbox
			.footer__links-items.flexbox

				.footer__links-item
					a(href="https://github.com/yegupov" target="_blank")
						span.footer__links-icon
							svg-icon(icon-name="github")
						span.footer__links-title Github
						span.footer__links-subtitle yegupov

				.footer__links-item
					a(href="https://yegupov.github.io/" target="_blank")
						span.footer__links-icon
							svg-icon(icon-name="portfolio")
						span.footer__links-title Portfolio
						span.footer__links-subtitle yegupov.github.io

			.footer__links-items.flexbox

				.footer__links-item
					a(href="https://make-website.ru/" target="_blank")
						span.footer__links-icon
							svg-icon.site-logo(icon-name="make-website")
						span.footer__links-title My site
						span.footer__links-subtitle make-website.ru

				.footer__links-item
					a(href="https://make-website.ru/blog" target="_blank")
						span.footer__links-icon
							svg-icon(icon-name="pencil")
						span.footer__links-title Blog
						span.footer__links-subtitle make-website.ru/blog

		.footer__copy
			p ©{{currentYear}}&nbsp;
				a.footer__link(href="https://yegupov.github.io/" target="_blank") Yegupov Gennady
				| , All my Rights Reserved •
				span.footer__link(@click.prevent="showNotification") Technology

	FooterModalFeedback(:visible="isModalVisible"	@close="closeModal")
	FooterModal(:visible="isNotificationVisible" @close="closeNotification")
</template>

<script>
export default {
	name: 'FooterBar',

	components: {
		FooterModal: () => import("@/components/front/FooterModal"),
		FooterModalFeedback: () => import("@/components/front/FooterModalFeedback"),
		SvgIcon: () => import('@/components/SvgIcon')
	},

	data: () => ({
		heightWindow: 0,
		ticking: false,
		isModalVisible: false,
		isNotificationVisible: false,
		scrollBarWidth: 0,
		currentYear: 0
	}),

	mounted() {
		this.$nextTick( () => {
			this.getHeightWindow();
		});
	},

	created() {
		window.addEventListener('scroll', this.animateFooterBg);
		window.addEventListener('resize', this.getHeightWindow);
		this.currentYear = new Date().getFullYear();
	},

	beforeDestroy() {
		// remove listener again
		window.removeEventListener("scroll", this.animateFooterBg);
		window.removeEventListener('resize', this.getHeightWindow);
	},

	methods: {
		initBgAnimation() {
			const footerParams = this.getElemParams(this.$refs['footer']),
						footerTop = footerParams.top,
						footerBottom = footerParams.bottom,
						footerHeight = footerParams.height;

			let translateSphere = 0,
					translateBgfooter = 0;

			// translate = (this.heightWindow - footerTop) * ratio;
			translateSphere = (this.heightWindow - footerTop) / 0.7;
			// this.$refs['sphere'].style.top = `${Math.trunc(translate)}px`;
			this.$refs['sphere'].style.transform = `translate3d(0px, ${Math.trunc(translateSphere)}px, 0px)`;

			if (footerBottom - this.heightWindow < this.heightWindow / 4) {
				translateBgfooter = (this.heightWindow - footerTop - footerHeight + 167) / 0.35;

				this.$refs['bgfooter'].style.transform = `translate3d(0px, -${Math.trunc(translateBgfooter)}px, 0px)`;

			} else {
				this.$refs['bgfooter'].style.transform = `translate3d(0px, 0px, 0px)`;
			}
		},

		getHeightWindow() {
			this.heightWindow = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		},

		getElemParams(el) {
			const elementBoundary = el.getBoundingClientRect(),
						top = elementBoundary.top,
						bottom = elementBoundary.bottom,
						height = elementBoundary.height;
			return { top, bottom, height }
		},

		animateFooterBg() {

			if (!this.ticking) {
				window.requestAnimationFrame( () => {

					// do something
					this.initBgAnimation();

					this.ticking = false;
				});

				this.ticking = true;
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

		showNotification() {
			this.isNotificationVisible = true;
			// document.body.classList.add('noscroll');
		},

		closeNotification() {
			this.isNotificationVisible = false;
			// document.body.classList.remove('noscroll');
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";
@import "../../styles/mixins.scss";

.footer {
	position: relative;
	padding: 130px 0 30px;
	background-color: $bg-color-dark;

	@include phone() {
		padding: 100px 0 30px;
	}

	.footer__content {
		position: relative;
		z-index: 1;

		h2 {
			margin: 0 0 120px 0;
			text-align: center;
			text-transform: uppercase;
			font-size: 6.5rem;
			line-height: 0.9em;
			color: #fff;

			@include netbook() {
				font-size: 5rem;
			}

			@include phone() {
				padding: 0 7%;
				font-size: 4rem;
			}

			@include phone() {
				margin: 0 0 80px 0;
				padding: 0 1%;
				font-size: 2.8rem;
			}

			span {
				display: block;

				@include phone() {
					display: inline;
					margin-left: 20px;
				}
			}
		}

		.fl-left {
			margin: -200px 0 0;

			@include phone() {
				margin: -145px 0 0;
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
		}

		.footer__btns {
			@include tablet() {
				flex-direction: column;
			}

			.btn_secondary {
				width: calc(50% - 40px);
				padding: 20px;
				border-color: #fff;
				color: #fff;
				white-space: nowrap;

				@include notebook() {
					width: calc(50% - 20px);
				}

				@include tablet() {
					width: 100%;
				}

				&:hover {
					color: $text-color;
				}

				&:first-child {
					@include tablet() {
						margin: 0 0 30px;
					}
				}
			}
		}

		.footer__links {
			padding: 130px 0 50px;

			@include phone() {
				flex-direction: column;
				padding: 100px 0 10px;
			}

			.footer__links-items {
				// width: 47%;
				width: calc(50% - 45px);

				@include notebook() {
					width: calc(50% - 20px);
				}

				@include netbook() {
					flex-direction: column;
				}

				@include phone() {
					width: 100%;
				}

				.footer__links-item {
					position: relative;
					width: calc(50% - 45px);
					height: 81px;

					@include notebook() {
						width: calc(50% - 20px);
					}

					@include netbook() {
						width: 100%;
					}

					&:before {
						content: '';
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 0;
						background-color: $links-color;
						transition: all 0.2s ease-out;
					}

					&:hover::before {
						height: 100%;
					}

					a {
						position: relative;
						z-index: 2;
						display: block;
						padding: 15px 0 15px;
						color: #fff;
						border-top: 1px solid #fff;
						transition: all 0.3s ease-out;

						.footer__links-title {
							display: block;
							font-size: 1.5rem;
							font-weight: 600;
						}

						.footer__links-subtitle {
							font-size: 0.85rem;
							color: rgba(255, 255, 255, 0.6);
						}

						.footer__links-icon {
							float: right;
							width: 40px;
							height: 40px;
							line-height: 46px;
							border-radius: 50%;
							background-color: #fff;
							text-align: center;

							.svg-icon {
								display: inline-block;
								width: 18px;
								height: 18px;
								fill: #285e54;

								&.site-logo {
									width: 22px;
									height: 22px;
									transform: translateY(2px);
								}
							}
						}

						&:hover {
							padding: 20px 20px 15px;
							border-top: 1px solid $links-color;

							.svg-icon {
								fill: $links-color;
							}
						}
					}
				}
			}
		}
	}

	.footer__copy {
		padding: 58px 0 0;
		text-align: center;
		color: rgba(255, 255, 255, 0.6);

		.footer__link {
			display: inline-block;
			margin-left: 4px;
			color: rgba(255, 255, 255, 0.8);
			cursor: pointer;

			&:hover {
				color: rgba(255, 255, 255, 1);
			}
		}
	}

	.footer__bg {
		position: absolute;
		z-index: 0;
		top: 0;
		left: 0;
		opacity: 0.6;

		.footer__bg-sphere {
			position: relative;
			top: -500px;
			left: 10vw;
			width: 80vw;
			height: 80vw;
			border-radius: 40vw;
			background-color: $bg-color-dark;
			overflow: hidden;

			@include tablet() {
				width: 100vw;
				height: 100vw;
				left: 0;
				border-radius: 50vw;
			}

			@include phone() {
				width: 180vw;
				height: 180vw;
				left: -40vw;
				border-radius: 90vw;
			}
		}

		.footer__bg-gradient {
			position: absolute;
			top: -125%;
			left: 0;
			width: 100%;
			height: 240%;
			background: #688e87; /* Old browsers */
			background: -moz-radial-gradient(center, ellipse cover,  #688e87 0%, #07453a 75%, #07453a 100%); /* FF3.6-15 */
			background: -webkit-radial-gradient(center, ellipse cover,  #688e87 0%,#07453a 75%,#07453a 100%); /* Chrome10-25,Safari5.1-6 */
			background: radial-gradient(ellipse at center,  #688e87 0%,#07453a 75%,#07453a 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
			filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#688e87', endColorstr='#07453a',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
		}
	}
}
</style>
