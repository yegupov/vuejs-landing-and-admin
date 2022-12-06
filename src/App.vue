<template lang="pug">
  #app
    router-view
    tooltip
</template>

<script>

export default {
  components: {
    Tooltip: () => import("@/components/Tooltip")
  }
}
</script>

<style lang="scss">
@import "./styles/variables.scss";
@import "./styles/mixins.scss";
@import "./styles/font.scss";

html {
  box-sizing: border-box;
  font-size: 14px;
  scroll-behavior: smooth;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  width: 100%;
  margin: 0;
  font-size: 1rem;
  font-family: $font_default;
  font-weight: 400;
  line-height: 1.3;
  color: $text-color;
  background-color: #fff;
}

.noscroll {
  height: 100vh;
  overflow-y: hidden;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}

img {
  display: block;
  max-width: 100%;
  max-height: 100%;
  user-select: none;
  -webkit-user-drag: none;
}

.container {
  width: 86%;
  max-width: 1200px;
  margin: 0 auto;
}

.fl-left {
  float: left;
}

.fl-right {
  float: right;
}

.flexbox {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.section {
    @include tablet() {
      flex-direction: column;
    }

    .aside {
      width: 30%;
      padding-right: 60px;

      @include tablet() {
        width: 100%;
      }
    }

    .article {
      width: 70%;

      @include tablet() {
        width: 100%;
      }
    }
  }
}

.color-primary {
  color: $color-primary;
}

.color-success {
  color: $color-success;
}

a.color-success, .text-btn.color-success {
  &:hover, &:focus {
    color: lighten($color-success, 10);

    .svg-icon {
      fill: lighten($color-success, 10);
    }
  }

  .svg-icon {
    fill: $color-success;
  }
}

.color-warning {
  color: $color-warning;
}

.color-danger {
  color: $color-danger;
}

a.color-danger, .text-btn.color-danger {
  &:hover, &:focus {
    color: lighten($color-danger, 10);

    .svg-icon {
      fill: lighten($color-danger, 10);
    }
  }

  .svg-icon {
    fill: $color-danger;
  }
}

/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
  scrollbar-width: thin;
  // scrollbar-width: 10px;
  scrollbar-color: #14cf93 #f2f2f2;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 8px;
}

*::-webkit-scrollbar-track {
  background: #f2f2f2;
}

*::-webkit-scrollbar-thumb {
  background-color: #14cf93;
  border-radius: 8px;
  border: 0px solid #ffffff;
}

::selection {
  background: $links-color; /* Safari, Chrome, Opera */
}
::-moz-selection {
  background: $links-color; /* FireFox */
}
</style>
