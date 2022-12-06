<template lang="pug">
.page-admin
  AsideBar(v-if="loggedUser !== null")

  .main
    HeaderBar(v-if="loggedUser !== null" :loggedUser = "loggedUser")
    .content
      h1 Users

      .section.flexbox
        .aside
          h3 My account
          .card
            .card__img
              img(:src="`/img/${loggedUser.avatar}`" alt="User avatar")
            .card__desc
              p
                b {{loggedUser.status}}
              p Email: {{loggedUser.email}}

        .article
          h3 Users list
          ul.table.users-list
            li.table__row
              .users-list__id ID
              .users-list__username Username
              .users-list__status Status
              .users-list__image Avatar
              .users-list__email Email
            li.table__row(v-for="user in allUsers" :key="user.id")
              .users-list__id(data-label="ID") {{user.id}}
              .users-list__username(data-label="Username")
                span {{user.username}}
              .users-list__status(data-label="Status")
                span {{user.status}}
              .users-list__image(data-label="Avatar")
                img(
                  v-if="user.avatar && user.avatar != '[object File]'"
                  :src="`/img/${user.avatar}`"
                  alt="User avatar")
                svg-icon(v-else icon-name="user")
              .users-list__email(data-label="Email") {{user.email}}

    FooterBar
</template>

<script>

import { mapActions, mapGetters } from "vuex"

export default {
  name: 'AdminUsers',

  components: {
    HeaderBar: () => import('@/components/admin/HeaderBar'),
    AsideBar: () => import('@/components/admin/AsideBar'),
    FooterBar: () => import('@/components/admin/FooterBar'),
    SvgIcon: () => import("@/components/SvgIcon")
  },

  created() {
    if (!this.allUsers.length) this.fetchUsers();
  },

  computed: {
    ...mapGetters("users", ["allUsers"]),
    ...mapGetters("users", ["loggedUser"])
  },

  methods: {
    ...mapActions("users", ["fetchUsers"])
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/admin.scss";

.flexbox {
  align-items: flex-start;

  @include netbook() {
    flex-direction: column;

    & > div {
      width: 100% !important;
    }
  }
}

.users-list {
  width: 80%;
  max-width: 1000px;
  margin: 30px 0;

  @include netbook() {
    width: 100%;
  }

  .users-list__id {
    width: 5%;

    @include phone() {
      border-top: 1px solid $lines-color;
    }
  }

  .users-list__username {
    width: 15%;
  }

  .users-list__status {
    width: 15%;
  }

  .users-list__image {
    width: 15%;

    img {
      margin: 0 auto;
      width: 42px;
      height: 42px;
      border-radius: 50%;
    }

    .svg-icon {
      display: block;
      margin: 0 auto;
      width: 38px;
      height: 38px;
      fill: #a8a8a8;
    }
  }

  .users-list__email {
    width: 50%;
  }
}

.table {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 0;
  border: 1px solid $lines-color;
  border-radius: $border-radius;
  text-align: center;
  background-color: #fff;

  @include phone() {
    text-align: left;
    border: none;
    background-color: transparent;
  }

  .table__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $lines-color;

    @include phone() {
      flex-direction: column;
      border-bottom: none;

      &:after {
        content: '';
        display: table;
        height: 40px;
      }
    }

    & > div {
      height: 62px;
      line-height: 61px;
      border-right: 1px solid $lines-color;

      @include phone() {
        width: 100%;
        padding: 0 5%;
        border-bottom: 1px solid $lines-color;
        border-left: 1px solid $lines-color;
        border-right: 1px solid $lines-color;
        background-color: #fff;
        text-align: left;

        &:before {
          content: attr(data-label);
          float: left;
          width: 80px;
          margin-right: 2%;
          border-right: 1px solid $lines-color;
          font-weight: bold;
        }

        &:first-child {
          border-radius: $border-radius $border-radius 0 0;
        }

        &:last-child {
          border-radius: 0 0 $border-radius $border-radius;
        }
      }

      &:last-child {
        border-right: none;

        @include phone() {
          border-right: 1px solid $lines-color;
        }
      }

      img {
        display: inline-block;
        vertical-align: middle;
      }
    }

    &:first-child {
      font-weight: bold;

      @include phone() {
        display: none;
      }
    }

    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
