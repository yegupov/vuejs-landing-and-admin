<template lang="pug">
  .css-slideshow
    img(:src="`/img/work-${workId}-s-1.jpg`")
    img(:src="`/img/work-${workId}-s-2.jpg`")
    img(:src="`/img/work-${workId}-s-3.jpg`")
    img(:src="`/img/work-${workId}-s-4.jpg`")
    img(:src="`/img/work-${workId}-s-5.jpg`")
    //- div(style="background-image:url(https://assets.codepen.io/5288362/image-1.jpg)")
    //- div(style="background-image:url(https://assets.codepen.io/5288362/image-2.jpg)")
    //- div(style="background-image:url(https://assets.codepen.io/5288362/image-3.jpg)")
    //- div(style="background-image:url(https://assets.codepen.io/5288362/image-4.jpg)")
    //- div(style="background-image:url(https://assets.codepen.io/5288362/image-5.jpg)")
</template>

<script>

export default {
  name: 'cssSlideshow',

  props: {
    workId: {
      type: Number,
      default: 1,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.css-slideshow {
  width: 400px;
  height: 600px;
  position: relative;

  img {
    width: 100%;
    border: 4px solid rgba(255, 255, 255, 0.7);
    border-top: none;
    border-radius: 6px;
    position: absolute;
    animation: slideshow 5.5s infinite backwards;
    opacity: 0;

    &:nth-child(2) {
      animation-delay: 1.1s;
    }
    &:nth-child(3) {
      animation-delay: 2.2s;
    }
    &:nth-child(4) {
      animation-delay: 3.3s;
    }
    &:nth-child(5) {
      animation-delay: 4.4s;
    }
  }
}

@keyframes slideshow {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  20% {
    opacity: 1;
  }
  25% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
