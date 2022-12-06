<template lang="pug">
.card

  .card__header.smallphoto
    img.card__photo(v-if="review.avatar" :src="`/img/${review.avatar}`" :alt='review.author')
    img.card__photo(v-else src="/img/review.jpg")

  .card__content
    .card__caption {{review.author}}
    .card__sub {{review.position}}
    .card__desc {{review.text}}

  .card__footer
    button(@click="editReview" :disabled="showForm").text-btn.color-success
      svg-icon(icon-name="pencil")
      | Edit
    button(@click="removeExistedReview").text-btn.color-danger
      svg-icon(icon-name="trash")
      | Remove
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  name: 'ReviewsCard',

  components: {
    SvgIcon: () => import("@/components/SvgIcon")
  },

  props: {
    review: {
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
      deletedReview: {...this.review}
    }
  },

  methods: {
    ...mapActions("reviews", ["removeReview"]),
    ...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

    editReview() {
      this.$emit("editReview", this.review);
    },

    async removeExistedReview() {
      try {
        await this.removeReview(this.deletedReview);

        if (this.$route.path == '/admin/reviews') {
          this["SHOW_TOOLTIP"]({
            type: "success",
            text: 'Review removed!'
          });
        }

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
