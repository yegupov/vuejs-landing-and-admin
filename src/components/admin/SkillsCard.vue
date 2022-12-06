<template lang="pug">
.card

  .card__content
    .card__caption.text-large {{skill.title}}
    .card__sub.text-large {{skill.percent}}%

  .card__footer
    button(@click="editSkill" :disabled="showForm").text-btn.color-success
      svg-icon(icon-name="pencil")
      | Edit
    button(@click="removeExistedSkill").text-btn.color-danger
      svg-icon(icon-name="trash")
      | Remove
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  name: 'SkillsCard',

  components: {
    SvgIcon: () => import("@/components/SvgIcon")
  },

  props: {
    skill: {
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
      deletedSkill: {...this.skill}
    }
  },

  methods: {
    ...mapActions("skills", ["removeSkill"]),
    ...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

    editSkill() {
      this.$emit("editSkill", this.skill);
    },

    async removeExistedSkill() {
      try {
        await this.removeSkill(this.deletedSkill);

        this["SHOW_TOOLTIP"]({
          type: "success",
          text: 'Skill removed!'
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
