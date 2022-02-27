<template>
  <div class="__input-group" :class="{ invalid: errorMessage }">
    <slot />
    <p class="error-message" v-show="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
  export default {
    props: ['errorMessage'],
  };
</script>

<style scoped>
  .__input-group input {
    border-color: rgb(234, 0, 0);
  }
  .__input-group .error-message {
    color: rgb(234, 0, 0);
  }
</style>
