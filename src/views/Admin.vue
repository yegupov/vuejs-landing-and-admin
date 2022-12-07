<template lang="pug">
.page-admin
  AsideBar(v-if="loggedUser !== null")

  .main
    HeaderBar(v-if="loggedUser !== null" :loggedUser = "loggedUser")

    .content
      h1 Admin panel

      .content__desc
        p Web developer's&nbsp;
          a(href="#") personal portfolio site
          | &nbsp;and admin panel developed with the <b>Vue.js</b> framework. The project used a <b>fake backend</b> to be able to work without a server (without a backend).
        p All data is stored in <b>Vuex</b> storage. <b>Data.js</b> has the initial state of the data: 2 users, 5 works, 5 reviews, and 3 skills.
        p In the admin panel, you can perform the operations of creating, editing and deleting positions (<b>CRUD</b>), as well as resetting the states to the initial values.
        p Admin panel <b>code on GitHub</b>:&nbsp;
          a(href="https://github.com/yegupov/vuejs-landing-and-admin" target="_blank") vue-landing-and-admin

      ul.cards
        li.cards__item
          .card
            .card__content
              .card__caption.text-large Works
              .card__desc You can edit or delete existing positions, as well as create new ones.
            .card__footer
              a(href="/admin/works").btn Edit Works
        li.cards__item
          .card
            .card__content
              .card__caption.text-large Skills
              .card__desc You can edit or delete existing positions, as well as create new ones.
            .card__footer
              a(href="/admin/skills").btn Edit Skills
        li.cards__item
          .card
            .card__content
              .card__caption.text-large Reviews
              .card__desc You can edit or delete existing positions, as well as create new ones.
            .card__footer
              a(href="/admin/reviews").btn Edit Revies
        li.cards__item
          .card
            .card__content
              .card__caption.text-large Users
              .card__desc You cannot create, edit, or delete Users.
            .card__footer
              a(href="/admin/users").btn See Users list

    FooterBar
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: 'Admin',

  components: {
    HeaderBar: () => import('@/components/admin/HeaderBar'),
    AsideBar: () => import('@/components/admin/AsideBar'),
    FooterBar: () => import('@/components/admin/FooterBar')
  },

  computed: {
    ...mapGetters("users", ["loggedUser"]),
    ...mapGetters("users", ["allUsers"])
  },

  created () {
    if (!this.allUsers.length) this.fetchUsers();
  },

  methods: {
    ...mapActions("users", ["fetchUsers"]),
  }
};
</script>

<style lang="scss">
  @import "../styles/style.scss";
</style>
