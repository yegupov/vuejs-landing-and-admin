<template lang="pug">

span.text-blind
  span.blind(v-for="string in phrases" :key="string")
    span {{string}}
</template>

<script>

export default {
  name: 'AnimateMask',

  props: {
    phrases: {
      type: Array,
      default: () => ([]),
      required: true
    }
  }
};

</script>

<style lang="scss" scoped>
.text-blind {
	position: relative;
	margin-bottom: 100px;
	padding-left: 10px;
	font-weight: 600;
	font-size: 8rem;
	text-transform: uppercase;
	line-height: 1;
}

.blind {
	display: block;
	overflow: hidden;

	$easing: cubic-bezier(0.215, 0.61, 0.355, 1);

	@for $i from 1 through 5 {
		&:nth-child(#{$i}) span {
			animation: dropin 1s (#{($i - 1) * 0.125s}) $easing forwards;
		}
	}

	span {
		display: block;
		opacity: 0;
		transform: translateY(100%);
	}
}

@keyframes dropin {
	0% {
		transform: translateY(100%);
		opacity: 1;
	}
	100% {
		transform: translateY(0);
		opacity: 1;
	}
}
</style>
