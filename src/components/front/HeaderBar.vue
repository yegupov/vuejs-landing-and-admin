<template lang="pug">
.header

	.container
		.header__navicon(ref='navicon' @click.prevent="toggleMenu")
			span

		ul.header__menu(ref='navmenu')
			li.header__menuitem(v-for="link in menuItems" :key="link.title")
				a.link(:href="link.href ? link.href : '#' + link.title" @click="toggleMenu") {{link.title}}

				ul.header__submenu(v-if="link.subMenu && link.subMenu.length")
					li(v-for="sublink in link.subMenu" :key="sublink.title")
						a.link(:href='sublink.href' target="_blank") {{sublink.title}}

			li.header__menuitem
				a.link(href='/admin' target='_blank') Admin

		.fl-left
			a.link(href="/") Yg-websites
		.fl-right
			a.link(href="#contact") Contact
</template>

<script>
export default {
	name: 'HeaderBar',

	data: () => ({
		menuItems: [
			{title: 'YG websites', href: '/'},
			{title: 'about'},
			{title: 'works'},
			{title: 'reviews'},
			{
				title: 'github',
				href: '#',
				subMenu: [
					{title: 'Profile', href: 'https://github.com/yegupov'},
					{title: 'Portfolio', href: 'https://yegupov.github.io/'}
				]
			}
			// {title: 'contact'},
		]
	}),

	methods: {

		toggleMenu() {
			this.$refs['navicon'].classList.toggle('active');
			this.$refs['navmenu'].classList.toggle('active');
			// document.body.classList.toggle('noscroll');
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";
@import "../../styles/mixins.scss";

.header {
	padding: 15px 0;

	@include phone() {
		height: 80px;
		padding: 0;
	}

	.header__menu {
		display: flex;
		justify-content: space-between;
		align-items: center;

		@include phone() {
			flex-direction: column;
			justify-content: space-around;
			background: $bg-color-gray;
			position: absolute;
			z-index: 90;
			top: 0;
			left: -100%;
			width: 100%;
			height: 100vh;
			transition: left .5s;
			-webkit-transition: left .5s;
		}

		.header__menuitem {
			position: relative;

			@include phone() {

				&:nth-child(1) {
					display: none;
				}

				&:nth-child(5) > .link {
					pointer-events: none;
				}
			}

			a.link {
				z-index: 5;
				padding: 7px 0 20px;
				font-size: 0.85rem;

				@include phone() {
					font-size: 1.3rem;
					color: $text-color;

					&:before, &:after {
						background-color: $text-color;
					}
				}
			}

			.header__submenu {
				position: absolute;
				z-index: 4;
				left: -30px;
				top: -10px;
				padding: 40px 30px 30px;
				border-radius: 10px;
				background-color: #fff;
				transition: all 0.2s ease-out;
				display: none;

				@include phone() {
					display: block;
					position: relative;
					left: -10px;
					top: 0;
					padding: 10px 0 0;
					text-align: center;
					background-color: transparent;
				}

				li {
					margin-top: 10px;

					a.link {
						font-size: 0.95rem;
						text-transform: none;

						@include phone() {
							font-size: 1.4rem;
							color: $links-color;
							padding: 8px 0;

							&:before {
								display: none;
							}

							&:after {
								content: "🡥";
								display: inline-block;
								width: 10px;
								height: 10px;
								padding-left: 5px;
								font-size: 1em;
								color: #14cf93;
								// transform: translateY(-3px);
								right: -8px;
								bottom: 22px;
								// width: 100%;
								// height: 1px;
								background-color: transparent;
								// pointer-events: none;
								// transition: all 0.2s ease-out;

							}
						}
					}
				}
			}

			&:hover {

				.header__submenu {
					display: block;
				}
			}
		}
	}

	.fl-left, .fl-right {
		display: none;
		margin: 30px 0 0;

		a {
			color: $bg-color-beige;
		}
	}

	.fl-left {
		margin: 30px 0 0 15px;

		a {
			text-transform: uppercase;
			// font-size: 2.5rem;
		}
	}

	@include phone() {
		background-color: #151515;

		.fl-left, .fl-right {
			display: block;
		}

		.header__navicon {
			display: block;
		}

		.header__menu.active {
			position: fixed;
			left: 0;

			.header__navicon span::before {
				width: 50%;
				top: 0;
				-webkit-transform: translateX(-5px) translateY(-7px) rotate(-45deg);
				transform: translateX(-5px) translateY(-8px) rotate(-45deg);
				border-bottom-left-radius: 5px;
				border-top-left-radius: 5px;
			}

			.header__navicon span::after {
				width: 50%;
				top: 0;
				-webkit-transform: translateX(-5px) translateY(7px) rotate(45deg);
				transform: translateX(-5px) translateY(8px) rotate(45deg);
				border-bottom-left-radius: 5px;
				border-top-left-radius: 5px;
			}

			.header__navicon {
				span {
					-webkit-transform: translateX(-0px);
					transform: translateX(-0px);
				}
			}
		}
	}
}

.header__navicon {
	display: none;
	height: 60px;
	width: 86px;
	position: relative;
	z-index: 100;
	margin: 10px 0 0;
	float: left;

	span {
		height: 3px;
		width: 51px;
		position: absolute;
		top: 0; left: 0;
		right: 0; bottom: 0;
		margin: auto;
		-webkit-transition: all 0.3s; transition: all 0.3s;
		// background-color: $text-color;
		background-color: $bg-color-beige;

		&:before, &:after {
			content: "";
			height: 3px;
			width: 100%;
			position: absolute;
			background: inherit;
			-webkit-transition-duration: 0.3s; transition-duration: 0.3s;
			-webkit-transition-delay: 0s; transition-delay: 0s;
			background-color: $bg-color-beige;
			-webkit-transform-origin: top left;
			transform-origin: top left;
		}

		&:before {
			top: -14px;
		}

		&:after {
			top: 14px;
		}
	}

	&.active {
		position: fixed;

		span {
			-webkit-transform: translateX(-0px);
			transform: translateX(-0px);
			background-color: $text-color;
		}

		span::before {
			width: 50%;
			top: 0;
			-webkit-transform: translateX(-2px) translateY(1px) rotate(-45deg);
			transform: translateX(-2px) translateY(1px) rotate(-45deg);
			background-color: $text-color;
		}

		span::after {
			width: 50%;
			top: 0;
			-webkit-transform: translateX(0px) translateY(0px) rotate(45deg);
			transform: translateX(0px) translateY(0px) rotate(45deg);
			background-color: $text-color;
		}
	}
}
</style>
