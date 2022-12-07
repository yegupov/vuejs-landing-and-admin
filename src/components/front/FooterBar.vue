<template lang="pug">
#contact.footer.section
	.container
		.footer__copy
			p ©{{currentYear}}&nbsp;
				a.footer__link(href="https://yegupov.github.io/" target="_blank") Yegupov Gennady
</template>

<script>
export default {
	name: 'FooterBar',

	components: {
		SvgIcon: () => import('@/components/SvgIcon')
	},

	data: () => ({
		currentYear: 0
	}),

	created() {
		this.currentYear = new Date().getFullYear();
	}
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";
@import "../../styles/mixins.scss";

.footer {
	position: relative;
	padding: 50px 0 70px;
	background-color: $bg-color-dark;

	@include phone() {
		padding: 100px 0 30px;
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
}
</style>
