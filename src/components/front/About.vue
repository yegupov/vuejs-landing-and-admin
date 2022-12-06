<template lang="pug">
#about.about(:class='{"many-about-cards": allSkills.length > 3}')
	.container
		.about__body.flexbox(ref="aboutsec")

			.about__desc
				p About myself
				h3
					span(data-anima="textblind")
						span.textblind__row
							span.textblind__item I am a web
						span.textblind__row
							span.textblind__item developer&nbsp;
								span.text-accent Gennady

					span(data-anima="textblind")
						span.textblind__row
							span.textblind__item
								span.text-accent Yegupov
								| &nbsp;I do html
						span.textblind__row
							span.textblind__item layout, create

					span(data-anima="textblind")
						span.textblind__row
							span.textblind__item designs and work
						span.textblind__row
							span.textblind__item with cms Modx and
						span.textblind__row
							span.textblind__item Prestashop.
				a.link(href="mailto:make.website.info@gmail.com" target="_blank") Contact

			.about__cards
				ul.about__skills(ref="aboutskills")
					li.about__skill(
						v-for="(skill, index) in allSkills"
						:key="skill.id"
						data-anima="jsrotate-1"
						@mouseover="addHoverClass(index)"
						@mouseout="addHoverClass")
						.about__skillbody
							h3.clip-text(:style="{'marginTop': '-' + skill.percent / 1.5 + 'px'}") {{skill.title.slice(0, 10)}}
							.about__progress(:data-height="skill.percent")
								.about__progressbg
									p
										span dipping
										| {{skill.percent}}%
									.wave
									.wave
					li.about__skill.invisible
						.about__skillbody
							h3.clip-text Gif upload
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
	name: 'About',

	components: {
		SvgIcon: () => import('@/components/SvgIcon')
	},

	created() {
		if (!this.allSkills.length) this.fetchSkills();
		// console.log('FRONT Skills : ', this.allSkills);
	},

	mounted() {
		this.$nextTick( () => {
			setTimeout( () => {
				this.$refs['aboutsec'].classList.add('about_visible');
			}, 4000);
		});
	},

	computed: {
		...mapGetters("skills", ["allSkills"])
	},

	methods: {
		...mapActions("skills", ["fetchSkills"]),
		...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

		addHoverClass(ind) {
			const skillList = this.$refs['aboutskills'];

			[...skillList.children].forEach( (item, index) => {
				const progress = item.querySelector('.about__progress'),
							cardBody = item.querySelector('.about__skillbody'),
							cardHeight = cardBody.clientHeight || cardBody.offsetHeight;
				let progressVal = 0;

				if (progress !== null) {
					progressVal = +progress.getAttribute('data-height') * cardHeight / 100 + 20;  // Card height: 570px;

					if (ind === index) {
						item.classList.add('hover');
						progress.style.height = Math.trunc(progressVal) + 'px';
					}
					else {
						item.classList.remove('hover');
						progress.style.height = '0';
					}
				}
			});
		}
	}
}
</script>

<style scoped lang="scss">
@import "../../styles/variables.scss";
@import "../../styles/mixins.scss";

.about {
	padding: 0;
	background-color: $bg-color-beige;
	overflow: visible;

	@include phone() {
		background-color: #151515;
	}

	.about__body {
		position: relative;
		z-index: 3;
		padding: 0 0 120px 0;
		opacity: 0;
		transition: opacity 0.7s ease;

		&.about_visible {
			opacity: 1;
		}

		@include tablet() {
			flex-direction: column;
		}

		.about__desc {
			width: 30%;
			padding: 250px 5% 0 0;

			@include netbook() {
				padding: 250px 0 0 0;
			}

			@include tablet() {
				order: 1;
				width: 100%;
				padding: 280px 5% 0 0;
			}

			h3 {
				font-size: 2.4rem;
				font-weight: 600;
				text-transform: uppercase;
				line-height: 1.1em;

				@include desktop() {
					font-size: 1.88rem;
				}

				@include netbook() {
					font-size: 1.4rem;
				}

				@include tablet() {
					font-size: 2.4rem;
				}

				@include phone() {
					font-size: 2.1rem;
					color: $bg-color-beige;
				}

				@include phoneSmall() {
					font-size: 1.7rem;
				}

				.text-accent {
					display: inline-block;
					transform: translate(0, -2px);
					font-size: 1.1em;
					font-weight: normal;
					text-transform: none;
					color: $links-color;
				}
			}

			p {
				display: none;

				@include tablet() {
					display: block;
					text-transform: uppercase;
					color: $text-color-gray;
				}
			}

			.link {
				display: none;

				@include tablet() {
					display: inline-block;
					margin-top: 20px;
				}
			}
		}

		.about__cards {
			width: 70%;

			@include tablet() {
				width: 100%;
			}

			.about__skills {
				margin: 0 0 0 340px;
				transform: translateY(-150px) rotate(-30deg);

				@include notebook() {
					margin: 0 0 40px 22vw;
					transform: translateY(-100px) rotate(-30deg);
				}

				@include netbook() {
					margin: 0 0 40px 18vw;
					transform: translateY(-80px) rotate(-27deg);
				}

				@include tablet() {
					margin: 0 0 0 24vw;
					transform: translateY(-100px) rotate(-27deg);
				}

				@include phone() {
					margin: 0 0 0 38vw;
				}

				@include phoneSmall() {
					margin: 0 0 0 45vw;
				}

				.about__skill {
					display: inline-block;
					vertical-align: top;
					position: relative;
					opacity: 1;

					&.hover {
						z-index: 4;
					}

					.about__skillbody {
						position: relative;
						display: block;
						width: 400px;
						height: 570px;
						margin: 0 0 0 -300px;
						background-color: #fff;
						border: 1px solid $lines-color;
						border-radius: $border-radius;
						-webkit-transform-origin: bottom left;
						transform-origin: bottom left;

						@include desktop() {
							width: 350px;
							height: 499px;
						}

						@include notebook() {
							width: 300px;
							height: 428px;
							margin: 0 0 0 -250px;
						}

						@include netbook() {
							width: 270px;
							height: 385px;
							margin: 0 0 0 -210px;
						}

						@include tablet() {
							width: 280px;
							height: 399px;
						}

						@include phone() {
							width: 230px;
							height: 328px;
						}

						@include phoneSmall() {
							width: 180px;
							height: 257px;
						}

						&:before {
							content: '';
							position: absolute;
							z-index: -1;
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
							background-blend-mode: screen;
							border-radius: $border-radius;
							opacity: 0.7;
						}

						.about__progress {
							position: absolute;
							bottom: 0;
							left: 0;
							height: 0;
							width: 100%;
							border-radius: 0 0 $border-radius $border-radius;
							overflow: hidden;

							.about__progressbg {
								position: absolute;
								bottom: 0;
								left: 0;
								border-radius: 0 0 $border-radius $border-radius;
								background: rgba(41,185,229,0);
								background: -moz-linear-gradient(top, rgba(41,185,229,0) 0%, rgba(41,185,229,0) 41%, rgba(21,207,148,1) 46%, rgba(21,207,148,1) 100%);
								background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(41,185,229,0)), color-stop(41%, rgba(41,185,229,0)), color-stop(46%, rgba(21,207,148,1)), color-stop(100%, rgba(21,207,148,1)));
								background: -webkit-linear-gradient(top, rgba(41,185,229,0) 0%, rgba(41,185,229,0) 41%, rgba(21,207,148,1) 46%, rgba(21,207,148,1) 100%);
								background: -o-linear-gradient(top, rgba(41,185,229,0) 0%, rgba(41,185,229,0) 41%, rgba(21,207,148,1) 46%, rgba(21,207,148,1) 100%);
								background: -ms-linear-gradient(top, rgba(41,185,229,0) 0%, rgba(41,185,229,0) 41%, rgba(21,207,148,1) 46%, rgba(21,207,148,1) 100%);
								background: linear-gradient(to bottom, rgba(41,185,229,0) 0%, rgba(41,185,229,0) 41%, rgba(21,207,148,1) 46%, rgba(21,207,148,1) 100%);
								filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#29b9e5', endColorstr='#15cf94', GradientType=0 );

								height: 100%;
								width: 100%;

								p {
									position: absolute;
									z-index: 10;
									bottom: -5px;
									right: 30px;
									display: inline-block;
									font-size: 4rem;
									line-height: 1.1;
									color: $bg-color-beige;

									@include notebook() {
										font-size: 3rem;
									}

									@include phone() {
										font-size: 2rem;
									}

									span {
										display: block;
										font-size: 0.38em;
										font-weight: normal;
									}
								}

								.wave {
									background: url('/img/icons/wave.svg') repeat-x;
									position: absolute;
									top: 10px;
									width: 2000px;
									height: 570px;
									opacity: 0.5;
									animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
									transform: translate3d(0, 0, 0);

									&:nth-of-type(2) {
										top: 40px;
										animation: wave 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite, swell 7s ease -1.25s infinite;
										opacity: 1;
									}
								}
							}
						}

						&:hover {
							border: 1px solid #caede1;

							.about__progressbg {
								animation: load 1.5s normal forwards;
							}

							.clip-text {
								animation: swing 14s linear infinite;
							}
						}
					}

					&:nth-child(1) .about__skillbody:before {
						background:
							linear-gradient(lightsalmon, transparent),
							linear-gradient(90deg, skyblue, transparent),
							linear-gradient(-90deg, coral, transparent);
					}

					&:nth-child(2) .about__skillbody:before {
						background:
							linear-gradient(coral, transparent),
							linear-gradient(90deg, LightSteelBlue, transparent),
							linear-gradient(-90deg, bisque, transparent);
					}

					&:nth-child(3) .about__skillbody:before {
						background:
							linear-gradient(skyblue, transparent),
							linear-gradient(90deg, limegreen, transparent),
							linear-gradient(-90deg, coral, transparent);
					}

					&:nth-child(4) .about__skillbody:before {
						background:
							linear-gradient(limegreen, transparent),
							linear-gradient(90deg, skyblue, transparent),
							linear-gradient(-90deg, coral, transparent);
					}

					&:nth-child(5) .about__skillbody:before {
						background:
							linear-gradient(limegreen, transparent),
							linear-gradient(90deg, skyblue, transparent),
							linear-gradient(-90deg, coral, transparent);
					}

					@for $i from 1 through 5 {
						&:nth-child(#{$i}) .about__skillbody {
							transform: translateY($i * 80px) rotate($i * 7deg);
						}
					}

					&:nth-child(2) {
						.about__skillbody {
							transform: translateY(120px) rotate(18deg);
							left: -30px;
						}
					}

					&:nth-last-child(2) {
						.about__skillbody {
							// top: 5px;
							transform: translateY(280px) rotate(22deg);
							background: url('/img/icons/about-card-bg-l.jpg') no-repeat;
							background-size: cover;
						}

						.about__skillbody:before {
							background: none;
						}
					}

					.clip-text {
						position: relative;
						z-index: 5;
						padding: 150px 110px 50px 40px;
						font-family: Georgia;
						font-style: italic;
						font-weight: bold;
						font-size: 12rem;
						color: lighten($text-color, 2%);
						text-transform: lowercase;
						line-height: 0.6em;
						letter-spacing: -0.15em;
						word-wrap: break-word;

						&::first-letter {
							text-transform: uppercase;
						}

						@include desktop() {
							font-size: 9.5rem;
						}

						@include notebook() {
							padding: 100px 70px 50px 35px;
							font-size: 9rem;
						}

						@include netbook() {
							padding: 100px 30px 50px 25px;
							font-size: 7rem;
						}

						@include phone() {
							font-size: 5.3rem;
						}

						@include phoneSmall() {
							padding: 100px 30px 40px 25px;
							font-size: 5rem;
						}

						@media (max-width: 375px) {
							font-size: 4rem;
						}
					}

					.about__skillbody:hover::before {
						background: none;
					}

					.about__skillbody:hover, &.invisible {
						background: url('/img/icons/about-card-bg-h.png') no-repeat;
					}

					.about__skillbody:hover .clip-text, &.invisible .clip-text {
						@supports (background-clip:text) or (-webkit-background-clip:text) {
							color: transparent;
							background-clip: text;
							-webkit-background-clip: text;
							background-image: url('/img/animate-green.gif');
							background-repeat: no-repeat;
							background-size: cover;
							background-position: center;
						}
					}
				}
			}
		}
	}

	&.many-about-cards {
		padding: 0 0 30px 0;

		.about__cards .about__skills {
			margin: 0 0 0 300px;
			transform: translateY(-190px) rotate(-42deg);

			@include netbook() {
				margin: 0 0 0 280px;
				// margin: 0 0 0 30vw;
				transform: translateY(-130px) rotate(-38deg);
			}

			@include tablet() {
				margin: 0 0 0 30vw;
				transform: translateY(-130px) rotate(-36deg);
			}

			@include phone() {
				margin: 0 0 0 40vw;
			}

			.about__skill {

				.about__skillbody {
					margin: 0 0 0 -360px;

					@include netbook() {
						width: 270px;
						height: 385px;
					}

					@media (max-width: 992px) {
						width: 220px;
						height: 314px;
					}

					@include tablet() {
						margin: 0 0 0 -220px;
						width: 240px;
						height: 342px;
					}

					@include phone() {
						width: 180px;
						height: 257px;
					}

					@media (max-width: 375px) {
						width: 170px;
						height: 242px;
					}
				}

				@for $i from 1 through 5 {
					&:nth-child(#{$i}) .about__skillbody {
						transform: translateY($i * 45px) rotate($i * 7deg);
						// transform: rotate($i * 5deg);
						// animation: stretched (#{($i - 1) * 0.15s}) ease-out;
					}
				}

				&:nth-last-child(2) {
					.about__skillbody {
						margin: 0 0 0 -330px;
						transform: translateY(330px) rotate(30deg);

						@include tablet() {
							margin: 0 0 0 -250px;
							transform: translateY(270px) rotate(33deg);
						}
					}
				}
			}
		}
	}
}

@keyframes load {
	0% { height: 0; }
	100% { height: 100%; }
}

@keyframes wave {
	0% {
		margin-left: 0;
	}
	100% {
		margin-left: -500px;
	}
}

@keyframes swell {
	0%,
	100% {
		transform: translate3d(0, -25px, 0);
	}
	50% {
		transform: translate3d(0, 5px, 0);
	}
}

@keyframes swing {
	0% {
		transform: translate3d(0, 0, 0) rotate(0deg);
	}
	16% {
		transform: translate3d(0, 15px, 0) rotate(-5deg);
	}
	50% {
		transform: translate3d(0, -15px, 0) rotate(5deg);
	}
	84% {
		transform: translate3d(0, 15px, 0) rotate(-5deg);
	}
	100% {
		transform: translate3d(0, 0, 0) rotate(0deg);
	}
}
</style>
