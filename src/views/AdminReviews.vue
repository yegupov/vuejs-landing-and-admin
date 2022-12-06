<template lang="pug">
.page-admin
  AsideBar(v-if="loggedUser !== null")

  .main
    HeaderBar(v-if="loggedUser !== null" :loggedUser = "loggedUser")
    .content
      .flexbox
        h1 Reviews
          span ({{allReviews.length}})
        button.btn.primary-btn(@click.prevent="fetchReviews" title="Return the Reviews list to the initial state") Reset state

      ReviewsForm(
        v-if="showForm"
        :editedReview="editedReview"
        :mode="mode"
        @hideReviewForm="hideForm"
      )

      ul.cards
        li.cards__item.iconplus(v-if="showForm === false")
          a(href="#reviewform" @click.prevent="displayForm")
            .icon-plus
              span.icon-plus__rect
            | Add review
            p You can add 4 more reviews to the 5 initial ones.
              br
              b Total 9 items

        li.cards__item.editable(v-for="review in allReviews" :key="review.id")
          ReviewsCard(
            :review="review"
            :showForm="showForm"
            @editReview="editReview")

    FooterBar

  Modal(
    v-show="isModalVisible"
    @close="closeModal")
    template(v-slot:header)
      h3 Maximum number of reviews - 9
    template(v-slot:body)
      p Remove some reviews or Reset state (Button top right) to be able to add reviews.
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {

  name: 'AdminReviews',

  components: {
    HeaderBar: () => import('@/components/admin/HeaderBar'),
    AsideBar: () => import('@/components/admin/AsideBar'),
    FooterBar: () => import('@/components/admin/FooterBar'),
    ReviewsForm: () => import("@/components/admin/ReviewsForm"),
    ReviewsCard: () => import("@/components/admin/ReviewsCard"),
    Modal: () => import("@/components/Modal")
  },

  data: () => ({
    mode: 'create',
    showForm: false,
    isModalVisible: false,
    editedReview: {}
  }),

  created() {
    if (!this.allReviews.length) this.fetchReviews();
  },

  computed: {
    ...mapGetters("users", ["loggedUser"]),
    ...mapGetters("reviews", ["allReviews"])
  },

  methods: {
    ...mapActions("reviews", ["addReviews", "fetchReviews", "resetReviews"]),
    ...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

    editReview(review) {
      // this.visibleEditForm = true;
      this.mode = 'edit';
      this.editedReview = review;

      this.showForm = true;
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },

    hideForm() {
      this.showForm = false;
      this.mode = 'create';
    },

    displayForm() {
      if (this.allReviews.length > 8) this.showModal();
      else this.showForm = true;
    },

    showModal() {
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
    }
  }
};
</script>

<style lang="scss">
  @import "../styles/admin.scss";
</style>
