<template lang="pug">
.card

  .card__header
    img.card__photo(:src="`/img/${work.photo}`" :alt='work.title')
    ul.card__tags
      li(v-for="tech in work.techs.split(', ')") {{tech}}

  .card__content
    .card__caption {{work.title}}
    .card__desc {{work.desc}}
    .card__sub
      a(href="work.link" target="_blank") {{work.link}}

  .card__footer
    button(@click="editWork" :disabled="showForm").text-btn.color-success
      svg-icon(icon-name="pencil")
      | Edit
    button(@click="removeExistedWork").text-btn.color-danger
      svg-icon(icon-name="trash")
      | Remove
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  name: 'WorksCard',

  components: {
    SvgIcon: () => import("@/components/SvgIcon")
  },

  props: {
    work: {
      type: Object,
      default: () => ({}),
      required: true
    },

		showForm: {
			type: Boolean,
			required: true
		}
  },

  data() {
    return {
      deletedWork: {...this.work}
    }
  },

  methods: {
    ...mapActions("works", ["removeWork"]),
    ...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

    editWork() {
      this.$emit("editWork", this.work);
    },

    async removeExistedWork() {
      try {
        await this.removeWork(this.deletedWork);

        this["SHOW_TOOLTIP"]({
          type: "success",
          text: 'Work removed!'
        });

      } catch (error) {
        this["SHOW_TOOLTIP"]({
          type: "error",
          text: error.response.data.error
        });
      }
    }
  }
};
</script>
