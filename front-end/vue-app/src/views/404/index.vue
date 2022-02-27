<template>
  <section class="notfound">
    <div class="notfound__wrapper">
      <h1>404</h1>
      <h3>OOPS! NOTHING WAS FOUND</h3>
      <p>
        The page you are looking for might have been removed had its name changed or is temporarily
        unavailable.
      </p>
      <router-link class="return-home" to="/">Return to homepage</router-link>
      <div class="notfound__wrapper-socials">
        <div class="list__socials">
          <a :href="socials.facebook" class="socials-item">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a :href="socials.twitter" class="socials-item">
            <i class="fab fa-twitter"></i>
          </a>
          <a :href="socials.pinterest" class="socials-item">
            <i class="fab fa-pinterest"></i>
          </a>
          <a :href="socials.youtube" class="socials-item">
            <i class="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: '404',
    data() {
      return {
        socials: {
          facebook: 'https://www.facebook.com/QuyenGiaSuJava/',
          twitter: 'https://twitter.com/ngTrnQuyn1',
          pinterest: 'https://www.pinterest.com/quyen10a8sao/_saved/',
          youtube: 'https://www.youtube.com/channel/UCa0VzFma3bpcw0wPE3drRXw',
        },
      };
    },
  };
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .notfound {
    font-family: 'Kanit', sans-serif;
  }
  .notfound .notfound__wrapper {
    text-align: center;
  }
  .notfound .notfound__wrapper > h1 {
    margin-top: 120px;
    background-image: linear-gradient(130deg, #ffa34f, #ff6f68);
    color: transparent;
    font-size: 186px;
    line-height: 186px;
    font-weight: 200;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    letter-spacing: 4px;
  }
  .notfound .notfound__wrapper > h3 {
    margin-top: 10px;
    font-size: 38px;
    font-weight: 200;
    line-height: 38px;
  }
  .notfound .notfound__wrapper > p {
    margin-top: 10px;
    font-size: 18px;
    font-weight: 200;
  }
  .notfound .notfound__wrapper > .return-home {
    display: inline-block;
    margin-top: 10px;
    text-decoration: none;
    font-size: 25px;
    font-weight: 200;
    text-transform: uppercase;
  }
  .notfound .notfound__wrapper > .return-home:hover {
    color: #ff6f68;
  }

  .notfound .notfound__wrapper .notfound__wrapper-socials {
    display: flex;
    justify-content: center;
  }
  .notfound__wrapper-socials .list__socials {
    margin-top: 30px;
    width: 200px;
    display: flex;
    justify-content: space-between;
  }
  .notfound__wrapper-socials .list__socials > a {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #efefef;
    position: relative;
  }
  .notfound__wrapper-socials .list__socials > a:hover {
    background-color: #ff6f68;
  }
  .notfound__wrapper-socials .list__socials > a:hover > i {
    color: #fff;
  }
  .notfound__wrapper-socials .list__socials > a > i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ff6f68;
  }
</style>
