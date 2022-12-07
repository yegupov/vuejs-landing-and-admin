<template lang="pug">
.page-home
	HeaderBar
	About
	Works
	Reviews
	FooterBar
</template>

<script>

export default {
	name: 'Front',

	components: {
		HeaderBar: () => import('@/components/front/HeaderBar'),
		About: () => import('@/components/front/About'),
		Works: () => import('@/components/front/Works'),
		Reviews: () => import('@/components/front/Reviews'),
		FooterBar: () => import('@/components/front/FooterBar'),
		SvgIcon: () => import("@/components/SvgIcon")
	}
}
</script>

<style lang="scss">
	@import "../styles/style.scss";

	.page-home {
		background-color: $bg-color-gray;

		.cards__item {
			padding: 30px;

			&:not(.iconplus) {
				padding-bottom: 45px;
			}
		}
	}
</style>
