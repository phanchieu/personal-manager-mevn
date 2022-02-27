<template>
  <section id="home">
    <Header />
    <Main />
    <Footer />
  </section>
</template>

<script>
  import Header from '@/components/Header';
  import Main from './views/Main';
  import Footer from '@/components/Footer';

  export default {
    name: 'Home',
    components: {
      Main,
      Header,
      Footer,
    },
  };
</script>
