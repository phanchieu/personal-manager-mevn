<template>
  <section>
    <div class="home">
      <a href="/">
        <img src="../../assets/home.png" alt="" />
      </a>
    </div>
    <div class="box"></div>
    <div class="profile">
      <div class="left">
        <div class="avatar">
          <img id="avatar" :src="userInfo.avatarUrl" />
        </div>
        <div class="infor">
          <div class="title">
            <h3>Personal Information</h3>
          </div>
          <div class="content">
            <div>
              <p id="name">Fullname: {{ userInfo.fullName }}</p>
            </div>
            <div>
              <p id="dob">Date of birth: {{ userInfo.dateOfBirth | DATE }}</p>
            </div>
            <div>
              <p id="dob">Email: {{ userInfo.email }}</p>
            </div>
            <div>
              <p id="dob">Phone: {{ userInfo.phoneNumber }}</p>
            </div>
          </div>
        </div>
        <div class="image">
          <img src="../../assets/profile.png" />
        </div>
      </div>
      <div class="right">
        <div class="field">
          <p>Username : {{ userInfo.username }}</p>
        </div>
        <div class="field">
          <p>Gender : {{ userInfo.gender }}</p>
        </div>
        <div class="field">
          <p>Contract : {{ userInfo.contract.type }}</p>
        </div>
        <div class="field">
          <p>Job : {{ userInfo.job.name }}</p>
        </div>
        <div class="field">
          <p>Official : {{ userInfo.official | OFFICIAL }}</p>
        </div>
        <div class="field">
          <p>Role : {{ userInfo.role.name }}</p>
        </div>
        <div class="field">
          <p>Department : {{ userInfo.department.name }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'profile',
    data() {
      return {
        userInfo: '',
      };
    },
    created() {
      this.userInfo = JSON.parse(localStorage.getItem('mevn'));
    },
    filters: {
      DATE: function (value) {
        if (!value) return '';
        const date = new Date(value);
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
      },
      OFFICIAL: function (value) {
        if (!value) return '';
        return value ? 'YES' : 'NO';
      },
    },
  };
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  }

  section {
    height: 100vh;
    width: 100%;
    background: lightgrey;
    padding: 20px;
  }

  .home a img {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 60px;
    height: 60px;
    box-shadow: 1px 3px 2px rgb(0, 0, 0, 0.2);
    border-radius: 50%;
    transition: all ease-in-out 0.3s;
    z-index: 100;
  }

  .home a img:hover {
    width: 65px;
    height: 65px;
  }

  .box {
    width: 100%;
    height: 110%;
    background-color: lightgrey;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }
  .profile {
    width: 100%;
    display: flex;
    height: 100%;
  }

  .profile .left {
    height: 100%;
    background-color: white;
    padding-top: 30px;
    width: 500px;
    border-radius: 10px;
    position: relative;
  }

  .avatar {
    width: 100%;
    border-radius: 50%;
    text-align: center;
    margin-bottom: 15px;
  }

  .avatar img {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    box-shadow: 1px 1px 15px -5px black;
  }

  .infor {
    margin: 0px auto;
  }

  h3 {
    font-size: 18px;
    height: 100%;
    line-height: 20px;
    letter-spacing: 1px;
  }

  .title {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 20px;
    margin-bottom: 15px;
  }

  .infor .content {
    margin: 0px 20px;
    border: 4px solid #6c63ff;
    padding: 0px 10px;
    border-radius: 10px;
  }

  .infor .content div {
    height: 50px;
    width: 100%;
  }

  .infor .content div:not(:last-child) {
    border-bottom: 2px solid #6c63ff;
  }

  .infor .content div p {
    height: 100%;
    line-height: 50px;
    font-size: 18px;
    font-weight: 600;
  }

  .left .image img {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-radius: 10px;
    height: 150px;
  }

  /* end left */

  /* right */

  .profile .right {
    height: 100%;
    padding: 20px;
    width: 100%;
    justify-content: center;
    margin-left: 20px;
    background-color: white;
    border-radius: 10px;
  }

  .right .field {
    width: 100%;
    display: flex;
    height: 65px;
    background-color: #6c63ff;
    margin-right: 15px;
    margin-bottom: 15px;
    border-radius: 25px;
    display: flex;
    padding: 0px 15px;
  }

  .field p {
    display: inline-block;
    height: 100%;
    font-size: 18px;
    font-weight: 600;
    line-height: 65px;
  }

  /* end right */
</style>
