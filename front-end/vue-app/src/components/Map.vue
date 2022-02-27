<template>
  <section class="map">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59587.94583112209!2d105.80194395895833!3d21.02281613572742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aba15ec15d17%3A0x620e85c2cfe14d4c!2zTMSDbmcgQ2jhu6cgdOG7i2NoIEjhu5MgQ2jDrSBNaW5o!5e0!3m2!1svi!2s!4v1620493690223!5m2!1svi!2s&zoom=15"
      style="height: 400px; width: 100%; border: 0"
      loading="lazy"
    ></iframe>
  </section>
</template>

<script>
  export default {
    name: 'Map',
  };
</script>

<style scoped>
  .map {
    margin: 30px auto;
    width: calc(100% - 60px);
  }
</style>
