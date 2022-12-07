<template lang="pug">
  .modal
    .modal__body
      h3.modal__headline Login
      p
        b Username
        | : admin
        br
        b Password
        | : qqwwaass

      form#login_form.login-form(@submit.prevent="handleSubmit")

        .form-group(:class='{"focused": checkValueUsername, "error": validation.firstError("user.username")}')
          label.form-label(for='username') Username
          input#username.form-control(
            type='text'
            name='username'
            v-model="user.username"
            @focus="moveLabel('focus', $event)"
            @blur="moveLabel('blur', $event)")
          .form-group__error
            error-tooltip( :errorText="validation.firstError('user.username')" )

        .form-group(:class='{"focused": checkValuePass, "error": validation.firstError("user.password")}')
          label.form-label(for='password') Password
          input#password.form-control.password(
            type='password'
            name='password'
            v-model="user.password"
            @focus="moveLabel('focus', $event)"
            @blur="moveLabel('blur', $event)")
          .form-group__error
            error-tooltip( :errorText="validation.firstError('user.password')" )

        .form-group.form-footer
          button.btn.primary-btn(type='submit' :disabled="disableSubmit") Sign in
          router-link(to="/") Back to site

    .modal__overlay
</template>

<script>
import { Validator } from 'simple-vue-validator';
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  mixins: [require('simple-vue-validator').mixin],

  data() {
    return {
      disableSubmit: false,
      user: {
        username: "",
        password: ""
      },
      checkValueUsername: false,
      checkValuePass: false
    }
  },

  components: {
    ErrorTooltip: () => import('@/components/ErrorTooltip.vue')
  },

  computed: {
    ...mapGetters("users", ["loggedUser"])
  },

  created () {
    this.logout();
  },

  validators: {
    'user.username': (value) => {
      return Validator.value(value).required('Enter Username')
    },

    'user.password': (value) => {
      return Validator.value(value).required('Enter Password')
    }
  },

  methods: {
    ...mapActions("users", ["login", "setLoggedUser", "logout"]),
    ...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

    moveLabel: function (typeEvent, event) {
      let target = event.target

      if (typeEvent == 'focus' && !target.value.trim().length) { // zero-length string AFTER a trim
        target.id == 'username' ? this.checkValueUsername = true : this.checkValuePass = true
      }
      if (typeEvent == 'blur' && !target.value.trim().length) {
        target.id == 'username' ? this.checkValueUsername = false : this.checkValuePass = false
      }
    },

    async handleSubmit() {

      if ((await this.$validate()) === false) return;
      this.disableSubmit = true;

      try {
        const loggedUser = await this.login(this.user);

        if (loggedUser) {

          this["SHOW_TOOLTIP"]({
              type: "success",
              text: "Welcome to Admin panel!"
            });
        } else {

          this["SHOW_TOOLTIP"]({
            type: "error",
            text: "The email address or password is incorrect!"
          });
        }

        this.validation.reset();

      } catch (error) {
        this["SHOW_TOOLTIP"]({
          type: "error",
          text: "Backend not work!"
        });
      } finally {
        this.disableSubmit = false;
      }
    },
  }
}
</script>

<style lang="scss">
@import "../styles/style.scss";

.modal {
  position: fixed;
  z-index: 9997;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  .modal__body {
    position: relative;
    z-index: 9999;
    width: 60%;
    max-width: 450px;
    min-width: 280px;
    height: auto;
    margin: 0;
    padding: 30px 5%;
    border-radius: $border-radius;
    background-color: #fff;

    @media (max-width: 567px) {
      width: 86%;
    }

    .modal__headline {
      text-align: center;
      font-size: 4rem;
      font-weight: 400;
      margin-bottom: 30px;
    }

    p {
      font-size: 1.2rem;
    }
  }

  .modal__overlay {
    position: fixed;
    z-index: 9998;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(40,52,65,1);
  }

  .form-group {
    position: relative;
    height: 45px;
    margin: 0 0 20px;
    text-align: center;

    .form-label {
      position: absolute;
      display: inline-block;
      left: 0; top: 0;
      width: auto;
      height: 15px;
      transform: translate(0px, 1px);
      transform-origin: 0 0;
      white-space: nowrap;
      will-change: transform;
      font-size: 13px;
      color: #666;
      padding: 0;
      background-color: #fff;
      cursor: text;
      z-index: 10;
      transition: transform .5s;
    }

    .form-control {
      position: absolute;
      left: 0; top: 0; bottom: 3px; right: 0;
      width: 100%;
      padding: 15px 0;
      letter-spacing: 0.05rem;
      background-color: #fff;
      outline: none;
      z-index: 1;

      &.password {
        letter-spacing: 0.2rem;
      }
    }

    .btn {
      margin: 0 auto;

      & + a {
        margin-left: 20px;
      }
    }

    &.focused {
      .form-label {
        transform: translate(0px, -15px);
      }
    }
  }
}
</style>
