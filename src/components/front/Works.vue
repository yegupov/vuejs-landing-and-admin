<template lang="pug">
#works.section
	.container

		h2 My works
		ul.cards
			li.work.cards__item(v-for="work in allWorks" :key="work.id")
				h3
					a(:href="work.link") {{work.title}}
				p {{work.techs}}
				p {{work.desc}}
				img(
					:src="`./img/${work.photo}`"
					:alt="work.title")
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
	name: 'Works',

	created() {
		if (!this.allWorks.length) this.fetchWorks();
		console.log('FRONT Works : ', this.allWorks);
	},

	computed: {
		...mapGetters("works", ["allWorks"])
	},

	methods: {
		...mapActions("works", ["addWork", "fetchWorks"]),
		...mapMutations("tooltip", ["SHOW_TOOLTIP"])
	}
}
</script>
