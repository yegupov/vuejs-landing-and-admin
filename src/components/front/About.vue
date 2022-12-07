<template lang="pug">
#about.section.about
	.container
		h2 About (Skills)
		ul.cards
			li.cards__item(v-for="skill in allSkills" :key="skill.id")
				h3 {{skill.title}}
				p {{skill.percent}}%
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
	name: 'About',

	created() {
		if (!this.allSkills.length) this.fetchSkills();
		console.log('FRONT Skills : ', this.allSkills);
	},

	computed: {
		...mapGetters("skills", ["allSkills"])
	},

	methods: {
		...mapActions("skills", ["fetchSkills"]),
		...mapMutations("tooltip", ["SHOW_TOOLTIP"])
	}
}
</script>

<style scoped lang="scss">
@import "../../styles/variables.scss";

.about {
	padding: 60px;

	h3 {
		font-size: 3rem;
	}

	p {
		font-size: 2.2rem;
	}
}
</style>
