<template lang="pug">
.page-admin
  AsideBar(v-if="loggedUser !== null")

  .main
    HeaderBar(v-if="loggedUser !== null" :loggedUser = "loggedUser")

    .content
      .flexbox
        h1 Works
          span ({{allWorks.length}})
        button.btn.primary-btn(
          @click.prevent="fetchWorks"
          title="Return the Works list to the initial state") Reset state

      WorksForm(
        v-if="showForm"
        :editedWork="editedWork"
        :mode="mode"
        @hideWorkForm="hideForm"
      )

      ul.cards
        li.cards__item.iconplus(v-if="showForm === false")
          a(href="#workform" @click.prevent="displayForm")
            .icon-plus
              span.icon-plus__rect
            | Add work
            p You can add 3 more works to the 4 initial ones.
              br
              b Total 8 items

        li.cards__item.editable(v-for="work in allWorks" :key="work.id")
          WorksCard(
            :work="work"
            :showForm="showForm"
            @editWork="editWork")

    FooterBar

  Modal(
    v-show="isModalVisible"
    @close="closeModal")
    template(v-slot:header)
      h3 Maximum number of works - 8
    template(v-slot:body)
      p Remove some works or Reset state (Button top right) to be able to add works.
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {

  name: 'AdminWorks',

  components: {
    HeaderBar: () => import('@/components/admin/HeaderBar'),
    AsideBar: () => import('@/components/admin/AsideBar'),
    FooterBar: () => import('@/components/admin/FooterBar'),
    WorksForm: () => import("@/components/admin/WorksForm"),
    WorksCard: () => import("@/components/admin/WorksCard"),
    Modal: () => import("@/components/Modal")
  },

  data: () => ({
    mode: 'create',
    showForm: false,
    isModalVisible: false,
    editedWork: {}
  }),

  created() {
    if (!this.allWorks.length) this.fetchWorks();
  },

  computed: {
    ...mapGetters("users", ["loggedUser"]),
    ...mapGetters("works", ["allWorks"])
  },

  methods: {
    ...mapActions("works", ["addWork", "fetchWorks", "resetWorks"]),
    ...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

    editWork(work) {
      this.mode = 'edit';
      this.editedWork = work;

      this.showForm = true;
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },

    hideForm() {
      this.showForm = false;
      this.mode = 'create';
    },

    displayForm() {
      if (this.allWorks.length > 7) this.showModal();
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
  @import "../styles/style.scss";
</style>
