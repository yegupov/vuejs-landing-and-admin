<template lang="pug">
include ../../helpers/mixins.pug

.modal-backdrop(role='dialog' :class="{'modal-visible': visible, 'modal-invisible': !visible}")
	.modal-overlay(@click='close')
	.modal
		button.btn-close(type='button' @click='close' aria-label='Close modal') ×
		.modal__slides
			transition-group(
				tag="div"
				name='slide'
				mode='out-in'
				enter-class='slide-in'
				leave-class='slide-out'
				enter-active-class='animate slide-in-active'
				leave-active-class='animate slide-out-active')
				//- div(v-for='index in slides' v-if='index == active' :key='index')
				//-   | Slide {{ index }}
				.modal__content(v-if="activeSlide === 1" key="1")
					//- :class="{textblind: activeSlide === 1}"
					h3(ref='modalCaption')
						+splitIntoLines(['Adding', 'a review'])
					p Remove some reviews or Reset state (up to 5 initial reviews) to be able to add reviews.
					p
						b Maximum number of reviews - 9.
							br
							| Currently on the site - {{qtyReviews}} reviews.
					button.btn.btn_primary(@click='move(1)' :disabled="qtyReviews === 9") Add review
					br
					a.btn(href='/admin/reviews' target='_blank') Go to Admin Panel

				.modal__form(v-if="activeSlide === 2" key="2")
					h3(ref='modalFormCaption')
						+splitIntoLines(['Add a new review'])
					ReviewsForm(
						:formVisible="visible"
						:qtyReviews="qtyReviews")
					.btn.modal__form-btn(@click='move(-1)' :class="{'animated showFade delay-05s': activeSlide === 2}") Back
</template>

<script>
export default {
	name: 'ReviewsModal',

	props: {
		visible: Boolean,
		qtyReviews: Number
	},

	components: {
		ReviewsForm: () => import('@/components/front/ReviewsForm')
	},

	data: () => ({
		activeSlide: 1
	}),

	watch: {
		visible() {
			if (this.visible) {
				this.$refs['modalCaption'].classList.remove('textblind');
				setTimeout( () => {
					this.$refs['modalCaption'].classList.add('textblind');
				}, 100);
			}
		},

		activeSlide() {
			if (this.activeSlide === 1) {
				setTimeout( () => {
					this.$refs['modalCaption'].classList.add('textblind');
				}, 50);
				this.$refs['modalFormCaption'].classList.remove('textblind');
			} else {
				setTimeout( () => {
					this.$refs['modalFormCaption'].classList.add('textblind');
				}, 50);
				this.$refs['modalCaption'].classList.remove('textblind');
			}
		}
	},

	methods: {
		close() {
			this.activeSlide = 1;
			this.$emit('close');
		},

		move(amount) {
			let newActive;
			const newIndex = this.activeSlide + amount;
			if (newIndex > 2) newActive = 1;
			if (newIndex === 0) newActive = 2;
			this.activeSlide = newActive || newIndex;
		},
	}
}
</script>

<style lang="scss">

</style>
