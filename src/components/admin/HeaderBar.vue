<template lang="pug">
  header.header

    .header__items
      .header__item Developed&nbsp;
        a(href="https://yegupov.github.io/" target="_blank") Gennady Yegupov
      .header__item
        a(href="/" target="_blank") Go to website

    .header__nav
      .date {{localeDate}}
      .user-profile
        .user-profile__avatar
          img(
            :src="`/img/${loggedUser.avatar}`"
            alt="User avatar")
        .user-profile__text {{loggedUser.email}}
      a.logout(href="#" @click.prevent="leave")
        span Logout
        svg-icon(icon-name="exit")
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: 'HeaderBar',

  components: {
		SvgIcon: () => import("@/components/SvgIcon")
	},

  props: {
    loggedUser: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },

  data: () => ({
    date: new Date()
  }),

  computed: {
    localeDate() {
      return (new Date(this.date)).toLocaleDateString()
    }
  },

  methods: {
    ...mapActions("users", ["logout"]),

    leave() {
      this.logout();
      this.$router.replace("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";
@import "../../styles/mixins.scss";

.header, .header__nav, .user-profile {
  display: flex;
  justify-content: space-between;
}

.header {
  align-items: center;
  padding: 0 40px;
  height: 60px;
  background-color: $bg-color-gray;
  border-bottom: 1px solid $lines-color;

  @include tablet() {
    padding: 0 40px 0 120px;
  }

  @include phoneSmall() {
    padding: 0 40px 0 100px;
  }

  .header__items {
    margin-right: auto;

    .header__item {
      float: left;
      margin-right: 25px;
      padding-right: 24px;
      border-right: 1px solid $text-color;

      @include netbook() {
        margin-right: 8px;
        padding-right: 8px;
      }

      @include tablet() {
        margin-right: 0;
      }

      &:first-child {
        @include tablet() {
          display: none;
        }
      }

      &:last-child {
        border: none;
        padding-right: 0;
      }
    }
  }

  .header__nav {
    align-items: center;
    margin-left: auto;

    .date {
      font-weight: bold;

      @include netbook() {
        display: none;
      }
    }
  }
}

.user-profile {
  margin-left: 30px;
  align-items: center;
  padding: 0;

  @include netbook() {
    margin-left: 0;
  }

  .user-profile__avatar img {
    width: 36px;
    border-radius: 50%;
    margin-right: 5px;
  }

  .user-profile__text {
    @include phone() {
      display: none;
    }
  }
}

.logout {
  margin-left: 30px;

  @include phone() {
    margin-left: 5px;
  }

  span {
    @include netbook() {
      display: none;
    }
  }

  .svg-icon {
    display: none;

    @include netbook() {
      display: block;
    }
  }
}
</style>
