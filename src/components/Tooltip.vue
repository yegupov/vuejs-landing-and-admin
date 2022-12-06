<template lang="pug">
  .query-tooltip(
    v-if="show"
    :class="{'success': type === 'success', 'error': type === 'error'}"
  )
    span.query-tooltip__text {{text}}
    button(
      type="button"
      @click="CLOSE_TOOLTIP"
    ).btn.query-tooltip__close
      svg-icon(icon-name="multiply")

  .query-tooltip(v-else)
    span.query-tooltip__text {{text}}
    button(
      type="button"
      @click="CLOSE_TOOLTIP"
    ).btn.query-tooltip__close
      svg-icon(icon-name="multiply")
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: 'Tooltip',

  data() {
    return {
      timeout: 3000
    }
  },

  components: {
    SvgIcon: () => import("@/components/SvgIcon")
  },

  computed: {
    ...mapState("tooltip", {
      show: state => state.show,
      type: state => state.type,
      text: state => state.text
    })
  },

  methods: {
    ...mapMutations("tooltip", ["CLOSE_TOOLTIP"])
  },

  updated() {
    setTimeout(this["CLOSE_TOOLTIP"], this.timeout);
  }
};

</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixins.scss";

.query-tooltip {
  position: fixed;
  z-index: 10000;
  width: auto;
  height: auto;
  bottom: -100px;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px 55px 20px 30px;
  border-radius: $border-radius $border-radius 0 0;
  transition: all 0.7s ease;
}

.query-tooltip__text {
  color: #fff;
}

.query-tooltip__close {
  position: absolute;
  top: 19px;
  right: 20px;
  width: 15px;
  height: 15px;
  padding: 0;
  // margin: 0 0 0 35px;
  background: transparent;
  cursor: pointer;

  .svg-icon {
    fill: #fff;
  }
}

.query-tooltip.success {
  transform: translateX(-50%) translateY(-100px);
  background-color: $color-success;
}

.query-tooltip.warning {
  transform: translateX(-50%) translateY(-100px);
  background-color:$color-warning;
}

.query-tooltip.error {
  transform: translateX(-50%) translateY(-100px);
  background-color: $color-danger;
}

.tooltip-home { /* Styles for front Home page */

  .query-tooltip {
    bottom: -100px;
    left: 9.7%;
    // left: calc(30% + 5px);
    border-radius: $border-radius;

    @include phone() {
      left: 50%;
    }
  }

  .btn.query-tooltip__close {
    border: none;
    top: 16px;
  }

  .query-tooltip.success,
  .query-tooltip.warning,
  .query-tooltip.error {
    transform: translateX(-50%) translateY(-120px);
  }
}

</style>
