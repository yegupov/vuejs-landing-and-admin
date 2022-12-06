<template lang="pug">
.notfound-page
  .notfound-page__content

    h1
      span 4
      span 0
      span 4
      span Page Not Found

    p Are you lost?
      br
      | Do you want to go&nbsp;
      a(href="/") home
      | ?
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixins.scss";

.notfound-page {
  display: flex;
  align-items: center;
  margin: 0;
  height: 100vh;
  background-color: $bg-color-dark;
  color: $bg-color-beige;

  .notfound-page__content {
    margin: auto;
    text-align: center;
    padding: 70px 30px 130px 30px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;

    h1 {
      margin: 0;
      color: $bg-color-beige;

      @media (max-width: 414px) {
        font-size: 2rem;
      }

      span {
        display: inline-block;
        // position: relative;
        // bottom: -15px;
        margin-bottom: 30px;
        font-family: Georgia;
        font-style: italic;
        font-weight: bold;
        font-size: 12rem;
        letter-spacing: -8px;
        animation: swing 14s linear infinite;

        @media (max-width: 414px) {
          font-size: 8rem;
          letter-spacing: -5px;
        }

        &:nth-child(2) {
          animation-delay: 0.7s;
        }

        &:nth-child(2) {
          animation-delay: 2s;
        }

        &:last-child {
          display: block;
          font-family: 'gilroy';
          font-size: 2.8rem;
          font-style: normal;
          letter-spacing: normal;
          animation: none;
        }
      }
    }

    p {
      font-size: 1.1rem;
    }
  }
}

@keyframes swing {
	0% {
		transform: translate3d(0, 0, 0) rotate(0deg);
	}
	16% {
		transform: translate3d(0, 19px, 0) rotate(-7deg);
	}
	50% {
		transform: translate3d(0, -19px, 0) rotate(7deg);
	}
	84% {
		transform: translate3d(0, 19px, 0) rotate(-7deg);
	}
	100% {
		transform: translate3d(0, 0, 0) rotate(0deg);
	}
}
</style>
