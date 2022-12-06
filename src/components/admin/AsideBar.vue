<template lang="pug">
.aside.dark-mode(ref='asidebar')

	.aside__baricon(@click.prevent="toggleAsidebar")
		span

	.aside__bar
		.logo VueLanding
		.asidebar__nav
			router-link(to="/admin")
				svg-icon(icon-name="home")
				| Dashboard
			router-link(to="/admin/skills")
				svg-icon(icon-name="user")
				| Skills
			router-link(to="/admin/works")
				svg-icon(icon-name="notebook")
				| Works
			router-link(to="/admin/reviews")
				svg-icon(icon-name="notebook")
				| Reviews
			router-link(to="/admin/users")
				svg-icon(icon-name="users")
				| Users

	.aside__overlay(@click.prevent="hideAsidebar")
</template>

<script>
export default {
	name: 'AsideBar',

	components: {
		SvgIcon: () => import("@/components/SvgIcon")
	},

	methods: {
		toggleAsidebar() {
			this.$refs['asidebar'].classList.toggle('active');
		},

		hideAsidebar() {
			this.$refs['asidebar'].classList.remove('active');
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";
@import "../../styles/mixins.scss";

.aside {
	position: fixed;
	z-index: 99;

	@include tablet() {
		position: absolute;
	}

	.aside__baricon {
		display: none;
		height: 60px;
		width: 86px;
		position: absolute;
		z-index: 100;
		left: 18px;
		top: 0;

		@include tablet() {
			display: block;
		}

		span {
			height: 3.2px;
			width: 51px;
			position: absolute;
			top: 0; left: 0;
			right: 0; bottom: 0;
			margin: auto;
			-webkit-transition: all 0.3s; transition: all 0.3s;
			background-color: $text-color;

			&:before, &:after {
				content: "";
				height: 3px;
				width: 100%;
				position: absolute;
				background: inherit;
				-webkit-transition-duration: 0.3s; transition-duration: 0.3s;
				-webkit-transition-delay: 0s; transition-delay: 0s;
				background-color: $text-color;
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
	}

	.aside__bar {
		position: absolute;
		width: 170px;
		height: 100vh;
		background-color: $bg-color-dark;
		padding: 15px 0;
		transition: all 0.2s ease;

		@include tablet() {
			left: -170px;
		}

		.logo {
			height: 45px;
			line-height: 30px;
			padding: 0 4% 0 7%;
			font-size: 1.2rem;
			font-weight: bold;
			text-transform: uppercase;
			color: #fff;
			border-bottom: 1px solid lighten($bg-color-dark, 4);

			&:hover {
				color: $links-color;
			}
		}

		.asidebar__nav {
			a {
				display: block;
				padding: 20px 4% 20px 7%;
				border-bottom: 1px solid lighten($bg-color-dark, 4);
				font-size: 1.1rem;
				font-weight: bold;

				.svg-icon {
					fill: #fff;
					margin-right: 10px;
					margin-bottom: -2px;
				}

				&:hover, &.router-link-exact-active {
					color: $links-color-hover;
					background-color: lighten($bg-color-dark, 4);

					.svg-icon {
						fill: $links-color-hover;
					}
				}
			}
		}
	}

	.aside__overlay {
		position: absolute;
		z-index: 90;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.6);
		display: none;
	}

	&.active {
		position: fixed;

		.aside__baricon {
			left: 150px;
			background-color: $bg-color-dark;
			border-radius: 0 30px 30px 0;

			span {
				width: 40px;
				-webkit-transform: translateX(-0px);
				transform: translateX(-0px);
				background-color: #fff;
			}

			span::before {
				width: 50%;
				top: 0;
				-webkit-transform: translateX(-2px) translateY(1px) rotate(-45deg);
				transform: translateX(-2px) translateY(1px) rotate(-45deg);
				background-color: #fff;
			}

			span::after {
				width: 50%;
				top: 0;
				-webkit-transform: translateX(0px) translateY(0px) rotate(45deg);
				transform: translateX(0px) translateY(0px) rotate(45deg);
				background-color: #fff;
			}
		}

		.aside__bar {
			left: 0;
			z-index: 100;

			& + .aside__overlay {
				display: block;
			}
		}
	}
}
</style>
