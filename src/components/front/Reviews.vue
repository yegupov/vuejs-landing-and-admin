<template lang="pug">
#reviews.reviews.section
	.container
		h2 Reviews
		ul.cards
			li.review.cards__item(v-for="review in allReviews" :key="review.id")
				img(v-if="review.avatar" :src="`/img/${review.avatar}`" :alt='review.author')
				img(v-else src="/img/review.jpg")
				h3
					a(:href="review.link") {{review.author}}
				p {{review.position}}
				p {{review.text}}
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
	name: 'Reviews',

	created() {
		if (!this.allReviews.length) this.fetchReviews();
		console.log('FRONT Reviews : ', this.allReviews);
	},

	computed: {
		...mapGetters("reviews", ["allReviews"])
	},

	methods: {
		...mapActions("reviews", ["addReview", "fetchReviews"]),
		...mapMutations("tooltip", ["SHOW_TOOLTIP"])
	}
}
</script>

<style lang="scss">
.reviews {
	.cards__item {
		img {
			width: 70px;
			border-radius: 50%;
		}
	}
}

</style>
