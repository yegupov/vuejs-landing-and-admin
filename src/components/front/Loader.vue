<template lang="pug">
include ../../helpers/mixins.pug

.loader
	.loader__content
		.loader__header
			p.textblind
				+splitIntoLines(['Web Master Portfolio', '@2022'])

		.loader__body
			//- h2
			//- 	span.text-stretched
			//- 		+phraseOfLetters('Gennady yegupov')
			h2.textblind
				span.textblind__row
					span.textblind__item
						span.text-stretched
							+phraseOfLetters('Gennady yegupov')

		.loader__footer
			//- img(src="/img/loader.gif")
			img(src="/img/loader.gif")
</template>

<script>

export default {
	name: 'Loader'
}
</script>

<style scoped lang="scss">
@import "../../styles/variables.scss";
@import "../../styles/mixins.scss";

.loader {
	background-color: $links-color;
	color: #fff;
	max-height: 0;
	overflow: hidden;
	animation: collapse 3.3s cubic-bezier(0.215, 0.61, 0.355, 1);
	// animation: collapse 3.3s linear;

	.loader__content {
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		height: 100vh;
		// width: 100%;
		// overflow: hidden;
		// transform: translateY(0);
		transform: translateY(-100vh);
		background-color: $text-color_companion;
		animation: move_top 3.1s cubic-bezier(0.215, 0.61, 0.355, 1);
		// animation: move_top 3s ease-out;

		& > div {
			width: 100%;
		}

		.loader__header {

			.textblind {
				text-align: center;
				font-weight: 400;
				font-size: 1rem;

				.textblind__row {
					margin-bottom: 8px;

					.textblind__item {
						opacity: 1;
						transform: translateY(0);
						animation-name: dropin_leave;
						animation-delay: 1.4s;
					}
				}
			}
		}

		.loader__body {

			h2 {
				padding-left: calc(50% - 360px);
				color: #fff;
				font-weight: 600;
				font-size: 5rem;
				line-height: 1;

				@include netbook() {
					padding-left: calc(50% - 195px);
					font-size: 3rem;
				}
			}

			.textblind__row {

				.textblind__item {
					display: block;
					opacity: 1;
					transform: translateY(0);
					animation-name: dropinleave;
					animation-delay: 1.7s;
				}
			}

			.text-stretched {
				overflow: hidden;
				opacity: 1;
				// display: inline-block;
				display: block;
				padding: 20px 0;
				transform: translateX(0);
				animation: move_left 0.5s ease-out;
			}
		}

		.loader__footer {
			text-align: center;

			img {
				display: inline-block;
				width: 40px;
			}
		}
	}
}

@keyframes move_left {
	0% { opacity: 0; transform: translateX(200px); }
	25% { opacity: 1; transform: translateX(200px); }
	100% { transform: translateX(0); }
}

@keyframes move_top {
	0% { transform: translateY(0); }
	70% { transform: translateY(0);}
	100% { transform: translateY(-100vh); }
}

@keyframes collapse {
	0% { max-height: 100vh; }
	70% { max-height: 100vh;}
	100% { max-height: 0; }
}

@keyframes dropinleave {
	0% {
		transform: translateY(0);
		opacity: 1;
	}
	100% {
		transform: translateY(-180px);
		opacity: 1;
	}
}
</style>
