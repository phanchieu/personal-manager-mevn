<template>
  <section class="auth">
    <SignIn />
  </section>
</template>

<script>
  import SignIn from './views/SignIn';
  export default {
    name: 'Auth',
    components: {
      SignIn,
    },
  };
</script>

<style></style>
