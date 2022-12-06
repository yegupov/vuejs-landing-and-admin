<template lang="pug">
transition(name='modal-fade')
  .modal-backdrop(role='dialog')
    .modal-overlay(@click='close')
    .modal
      header.modal-header
        button.btn-close(type='button' @click='close' aria-label='Close modal') ×
        slot(name='header')
          h2 This is the default tile!
      section.modal-body
        slot(name='body')
          | I'm the default body!
      footer.modal-footer
        slot(name='footer')
          //- .btn(type='button' @click='close' aria-label='Close modal') Close
</template>

<script>
export default {
  name: 'Modal',

  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $bg-color-beige;
  // background: url('/img/bg-noisy.jpg') repeat;
  // background-size: 200px;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    // background-color: rgba(75, 75, 75, 0.8);
  }

  .modal {
    position: relative;
    min-width: 500px;
    background: $bg-color-beige;
    border: 1px solid $lines-color;
    border-radius: $border-radius;
    // box-shadow: 2px 2px 20px 1px rgba(0,0,0,0.05);
    overflow-x: auto;
    display: flex;
    flex-direction: column;

    // .modal-header,
    // .modal-footer {
    //   padding: 15px 35px;
    //   display: flex;
    // }

    .modal-header {
      position: relative;
      padding: 15px 25% 0 14%;
      border-bottom: 1px solid $lines-color;
      // justify-content: space-between;

      h2, h3 {
        margin: 0 !important;
      }
    }

    .modal-footer {
      padding: 15px 14%;
      // border-top: 1px solid #eeeeee;
      // justify-content: flex-end;
    }

    .modal-body {
      padding: 25px 14%;
    }
  }
}

.btn-close {
  position: absolute;
  top: -8px;
  right: 5px;
  border: none;
  font-family: 'Times New Roman';
  font-size: 40px;
  padding: 8px;
  cursor: pointer;
  font-weight: normal;
  background: transparent;
  transition: all 0.2 ease-out;

  &:hover {
    top: -10px;
    right: 4px;
    font-size: 44px;
  }
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
