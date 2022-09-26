<template>
  <div class="home-container">
    <h4 class="q-mt-lg">Please import a log file</h4>
    <img class="arrow-image" alt="Up down arrow" src="~assets/arrow.svg" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.home-container {
  text-align: center;
  .arrow-image {
    position: absolute;
    top: 80px;
    right: 0px;
    width: 200px;
    height: 200px;
    animation-name: arrow;
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }

  @keyframes arrow {
    0% {
      top: 80px;
    }
    50% {
      top: 100px;
    }
    100% {
      top: 80px;
    }
  }
}
</style>
