<template>
  <section id="Slider">
    <div id="list-testimonials">
      <h3>Testimonials</h3>
      <div class="testimonials">
        <carousel :items="1" :nav="false">
          <div class="testimonial">
            <div>
              <img :src="require('@/assets/images/Home_images/persons/person_1.jpg')" alt="" />
            </div>
            <p>
              "Testimonials can help a company reach potential customers, take good care of them, and improve their business based on feedback from customers themselves."
            </p>
            <h6>Kyle McDonald</h6>
          </div>
          <div class="testimonial">
            <div>
              <img :src="require('@/assets/images/Home_images/persons/person_2.jpg')" alt="" />
            </div>
            <p>
              "Testimonials can help a company reach potential customers, take good care of them, and improve their business based on feedback from customers themselves."
            </p>
            <h6>Robert Aguilar</h6>
          </div>
          <div class="testimonial">
            <div>
              <img :src="require('@/assets/images/Home_images/persons/person_3.jpg')" alt="" />
            </div>
            <p>
              "Testimonials can help a company reach potential customers, take good care of them, and improve their business based on feedback from customers themselves."
            </p>
            <h6>Join Smith</h6>
          </div>
          <div class="testimonial">
            <div>
              <img :src="require('@/assets/images/Home_images/persons/person_4.jpg')" alt="" />
            </div>
            <p>
              "Testimonials can help a company reach potential customers, take good care of them, and improve their business based on feedback from customers themselves."
            </p>
            <h6>Roger Spears</h6>
          </div>
        </carousel>
      </div>
    </div>
  </section>
</template>

<script>
  import carousel from 'vue-owl-carousel2';
  export default {
    components: { carousel },
  };
</script>

<style scoped>
  /* =============CSS CHUNG========== */
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body {
    line-height: 1.7;
  }
  .container {
    width: 1109px;
    margin: 0 auto;
  }
  a {
    text-decoration: none;
  }
  li {
    list-style: none;
  }
  h3 {
    color: #000;
    font-size: 40px;
    font-weight: 900;
  }
  .btn {
    color: white;
    line-height: 1.5;
    font-size: 16px;
    font-weight: normal;
    border-radius: 30px;
    border: 2px solid #4285f4;
    padding: 15px 38px;
    border-width: 2px;
    background: #4285f4;
    position: relative !important;
    position: absolute;
    top: 0px;
  }
  .btn:hover {
    box-shadow: 0 5px 30px -5px rgb(66 133 244 / 70%);
    transition: ease 0.6s;
    top: -2px;
    color: white;
  }
  /* ============CSS CHUNG============ */
  #list-testimonials {
    text-align: center;
    padding: 86px 0px 90px 0px;
    background-color: #f6f6f6;
    height: 636px;
  }
  #list-testimonials h3 {
    display: block;
    width: 100%;
    text-align: center;
  }
  .testimonials {
    width: 100%;
    /* background-color: green; */
  }
  .testimonial {
    display: inline-block;
    width: 100%;
    height: 100%;
    text-align: center;
    overflow: hidden;
  }

  .testimonial:not(.testimonial:first-child) {
    display: none;
  }
  .testimonial > div {
    width: 100px;
    height: 100px;
    text-align: center;
    margin: 50px auto 0px auto;
  }
  .testimonial > div img {
    object-fit: cover;
    width: 100%;
    border-radius: 50%;
  }
  .testimonial p {
    max-width: 798px;
    margin: 30px auto 36px auto;
    font-size: 1.5rem;
    font-style: italic;
  }
  .testimonial h6 {
    margin-bottom: 24px;
  }
  .slider li {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    text-indent: -99999999999999999999px;
    background-color: #dee2e6;
    margin-left: 6px;
  }
  .slider li:first-child {
    margin-left: 0px;
  }
  .slider li:nth-child(3) {
    background-color: #007bff;
  }
</style>
