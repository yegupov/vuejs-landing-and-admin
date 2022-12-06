<template lang="pug">
.page-admin
  AsideBar(v-if="loggedUser !== null")

  .main
    HeaderBar(v-if="loggedUser !== null" :loggedUser = "loggedUser")
    .content
      .flexbox
        h1 Skills
          span ({{allSkills.length}})
        button.btn.primary-btn(
          @click.prevent="fetchSkills"
          title="Return the Skills list to the initial state") Reset state

      p
        b About section
        | &nbsp;on the Home page.

      SkillsForm(
        v-if="showForm"
        :editedSkill="editedSkill"
        :mode="mode"
        @hideSkillForm="hideForm")

      ul.cards
        li.cards__item.iconplus(v-if="showForm === false")
          a(href="#skillform" @click.prevent="displayForm")
            .icon-plus
              span.icon-plus__rect
            | Add skill
            p You can add 4 more skills to the 3 initial ones.
              br
              b Total 5 items

        li.cards__item.editable(v-for="skill in allSkills" :key="skill.id")
          SkillsCard(
            :skill="skill"
            :showForm="showForm"
            @editSkill="editSkill"
          )

    FooterBar

  Modal(
    v-show="isModalVisible"
    @close="closeModal")
    template(v-slot:header)
      h3 Maximum number of skills - 5
    template(v-slot:body)
      p Remove some skills or Reset state (Button top right) to be able to add skills.
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {

  name: 'AdminSkills',

  components: {
    HeaderBar: () => import('@/components/admin/HeaderBar'),
    AsideBar: () => import('@/components/admin/AsideBar'),
    FooterBar: () => import('@/components/admin/FooterBar'),
    SkillsForm: () => import("@/components/admin/SkillsForm"),
    SkillsCard: () => import("@/components/admin/SkillsCard"),
    Modal: () => import("@/components/Modal")
  },

  data: () => ({
    mode: 'create',
    showForm: false,
    isModalVisible: false,
    editedSkill: {}
  }),

  created() {
    if (!this.allSkills.length) this.fetchSkills();
  },

  computed: {
    ...mapGetters("users", ["loggedUser"]),
    ...mapGetters("skills", ["allSkills"])
  },

  methods: {
    ...mapActions("skills", ["addSkills", "fetchSkills", "resetSkills"]),
    ...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

    editSkill(skill) {
      this.mode = 'edit';
      this.editedSkill = skill;

      this.showForm = true;
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },

    hideForm() {
      this.showForm = false;
      this.mode = 'create';
    },

    displayForm() {
      if (this.allSkills.length > 4) this.showModal();
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
