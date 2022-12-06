<template lang="pug">
include ../../helpers/mixins.pug
// - var string = 'My phrase';
- var string = 'My phrase';
span
  each val in string
    span.letter #{val}
  //- each val in phrase
    span.letter #{val}

  //- +phraseOfLetters('phrase')
  //- +phraseOfLetters(string)
</template>

<script>

export default {
  name: 'AnimateStretch',

  props: {
    phrase: {
      type: String,
      default: 'Develop',
      required: true
    }
  },

  created() {
    console.log('phrase : ', typeof this.phrase, this.phrase);
  }
};

</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.letter {
  display: inline-block;
  // transform: translateX(100px);
  opacity: 1;

  &:nth-child(9) {
    margin-left: 30px;
    font-family: $font_companion;
    color: $links-color;
  }

  // $easing: 'ease-out';
  $easing: cubic-bezier(0.215, 0.61, 0.355, 1);

  @for $i from 1 through 15 {
    &:nth-child(#{$i}) {
      animation: stretched 1.5s (#{($i - 1) * 0.125s}) $easing;
      // animation: stretched 2s (#{($i - 1) * 0.125s}) ease-out;
      // animation: stretched 1s (#{($i - 1) * 0.125 + 1s}) ease-out;
    }
  }
}

@keyframes stretched {
	0% {
		transform: translateX(200px);
		opacity: 0;
	}
	30% {
		transform: translateX(200px);
		opacity: 0;
	}
	31% {
		transform: translateX(200px);
		opacity: 1;
	}
	100% {
		transform: translateX(0);
		opacity: 1;
	}
}

@keyframes fade {
	0% {
		opacity: 0;
	}
	55% {
		opacity: 0;
	}
	56% {
		opacity: 1;
	}
	100% {
		opacity: 1;
	}
}
</style>
