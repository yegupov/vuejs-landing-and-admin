<template lang="pug">
include ../../helpers/mixins.pug

#hero.hero.section
	a.btn.btn_fixed(href="/admin" target="_blank" title="Login")
		svg-icon.btn-icon(icon-name="dashboard")
		| Admin panel

	.container

		h1(ref='heroHeadline')
			+splitIntoLines(['Passionate', 'Developer'])

		p(ref='heroNote')
			+splitIntoLines(['Currently avialable for', 'freelance worldwide'])

		.svg-web-wrap
			SvgWeb
		svg-icon(icon-name='arrow-down')
</template>

<script>

export default {
	name: 'Hero',

	components: {
		SvgWeb: () => import('@/components/animate/SvgWeb'),
		SvgIcon: () => import("@/components/SvgIcon")
	},

	mounted() {
		this.$nextTick( () => {
			setTimeout( () => {
				this.$refs['heroHeadline'].classList.add('textblind');
			}, 3200);
			setTimeout( () => {
				this.$refs['heroNote'].classList.add('textblind');
			}, 4000);
		});
	}
}
</script>

<style scoped lang="scss">
@import "../../styles/variables.scss";
@import "../../styles/mixins.scss";

.hero {
	min-height: 40vh;
	padding: 100px 0 0;
	background-color: $bg-color-beige;

	@include tablet() {
		padding: 70px 0 80px;
	}

	@include phone() {
		clear: both;
		padding: 80px 0 80px;
		background-color: #151515;
	}

	h1 {
		margin: 0;
		opacity: 0;

		&.textblind {
			opacity: 1;
			font-weight: 600;
			font-size: 11.5vw;
			letter-spacing: -0.4vw;

			@include tablet() {
				font-size: 14vw;
			}

			@include phoneSmall() {
				font-size: 17vw;
			}

			.textblind__row {
				width: 100%;

				&:last-child {
					width: 100%;
					text-align: right;

					@include tablet() {
						text-align: left;
						margin-top: 30px;
					}

					@include phone() {
						margin-top: 10vw;
					}

					@include phoneSmall() {
						margin-top: 16vw;
					}
				}
			}

			@include phone() {
				color: $bg-color-beige;
			}
		}
	}

	p {
		position: absolute;
		top: 10vw;
		right: 15%;
		font-size: 0.9rem;
		text-transform: uppercase;
		color: $text-color-gray;
		opacity: 0;

		@include desktop() {
			top: 11.3vw;
			right: 11%;
		}

		@include netbook() {
			// top: 12.4vw;
			top: calc(10vw + 30px);
		}

		@include tablet() {
			top: 45vw;
			right: auto;
			left: 8%;
		}

		@include phone() {
			top: calc(43vw + 80px);
		}

		@include phoneSmall() {
			top: calc(48vw + 100px);
			font-size: 0.8rem;
		}

		&.textblind {
			opacity: 1;
		}

		.textblind__row:first-child {
			margin-bottom: 5px;
		}
	}

	.svg-web-wrap {
		float: right;
		// margin: -9.7vw 56vw 0 0;
		margin: -150px 56vw 0 0;

		svg {
			transform-origin: bottom right;
		}

		@include desktop() {
			svg {
				transform: scale(0.9);
			}
		}

		@include notebook() {
			svg {
				transform: scale(0.8);
			}
		}

		@include netbook() {
			margin: -147px 55vw 0 0;

			svg {
				transform: scale(0.63);
			}
		}

		@include tablet() {
			margin: -32vw -5px 0 0;
			position: relative;

			svg {
				transform: scale(0.45);
			}
		}

		@include phone() {
			// margin: -37vw -5px 0 0;
			margin: 0 -5px 0 0;
			margin-top: calc(10vw / 0.8 * -1 - 130px);
			position: relative;

			svg {
				transform: scale(0.38);
			}
		}

		@include phoneSmall() {
			margin-top: calc(10vw / 0.7 * -1 - 140px);
			// margin-top: -50vw;
			margin-right: 4.5%;

			svg {
				transform: scale(0.4);
			}
		}
	}

	.svg-icon {
		float: left;
		margin-top: -79px;
		width: 60px;
		height: 60px;

		@include desktop() {
			margin-top: -77px;
		}

		@include notebook() {
			margin-top: -70px;
			width: 54px;
			height: 54px;
		}

		@include netbook() {
			margin-top: -58px;
			width: 46px;
			height: 46px;
		}

		@include tablet() {
			display: none;
		}
	}
}

.btn_fixed {
	position: fixed;
	z-index: 100;
	top: 100px;
	right: -165px;
	transition: all 0.2s ease-out;
	display: none;

	.btn-icon.svg-icon {
		margin: 2px 15px 0 -18px;
		width: 22px;
		height: 22px;
		fill: $text-color-gray;

		@include tablet() {
			display: block;
		}
	}

	&:hover {
		right: -23px;

		.btn-icon.svg-icon {
			fill: $text-color;
		}
	}
}

.page-mounted {

	.btn_fixed {
		display: block;
	}

	.svg-web-wrap:before {
		@include tablet() {
			position: absolute;
			left: 20px;
			top: 105px;
			content: '';
			width: 120px;
			height: 4px;
			background-color: $links-color;
			animation: showFadeBeforeEl 3s ease-out;
		}

		@include phone() {
			left: 35px;
		}

		@include phoneSmall() {
			// width: 90px;
			// height: 3px;
			left: 30px;
			top: 110px;
		}
	}

}

@keyframes showFadeBeforeEl {
	0% {opacity: 0;}
	70% {opacity: 0;}
	100% {opacity: 1;}
}
</style>
