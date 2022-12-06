<template lang="pug">
  .error-tooltip {{errorText}}
</template>

<script>
export default {
  props: {
    errorText: {
      type: String,
      default: "Ошибка"
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.error-tooltip {
  z-index: 100;
  color: $color-danger;
  padding: 1px 4px;
  font-size: 12px;
  white-space: nowrap;
  width: auto;
}
</style>
