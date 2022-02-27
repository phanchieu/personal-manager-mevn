<template>
  <section class="Signup">
    <div class="home">
      <a href="/">
        <img src="../../../assets/home.png" alt="" />
      </a>
    </div>
    <div class="box"></div>
    <div class="container">
      <h1 id="title">Sign Up</h1>
      <form action="#" class="signup">
        <!--  -->
        <div :class="['field infor'] + (error.fullname ? 'padding-bottom-custorm' : '')">
          <label for="Fullname" class="label_input">Fullname:</label>
          <input
            v-model="userRegister.fullName"
            type="text"
            placeholder="EX: Đặng Trần Quyền"
            id="Fullname"
          />

          <p class="error-message" v-if="error.fullName">{{ error.fullName }}</p>
        </div>
        <!--  -->
        <div :class="['field infor '] + (error.username ? 'padding-bottom-custorm' : '')">
          <label for="Username" class="label_input">Username:</label>
          <input
            v-model="userRegister.username"
            type="text"
            placeholder="EX: quyenutt2000"
            id="Username"
          />
          <p class="error-message" v-if="error.username">{{ error.username }}</p>
        </div>
        <!--  -->
        <div :class="['field infor '] + (error.email ? 'padding-bottom-custorm' : '')">
          <label for="Email" class="label_input">Email:</label>
          <input
            v-model="userRegister.email"
            type="Email"
            placeholder="EX: quyenutt2000@gmail.com"
            id="Email"
          />

          <p class="error-message" v-if="error.email">{{ error.email }}</p>
        </div>
        <!--  -->
        <div :class="['field infor '] + (error.password ? 'padding-bottom-custorm' : '')">
          <label for="Password" class="label_input">Password:</label>
          <input
            v-model="userRegister.password"
            type="password"
            placeholder="EX: 12345678"
            id="Password"
          />

          <p class="error-message" v-if="error.password">{{ error.password }}</p>
        </div>
        <!--  -->
        <div :class="['field infor '] + (error.rePassword ? 'padding-bottom-custorm' : '')">
          <label for="Confirm_Password" class="label_input">Confirm Password:</label>
          <input
            v-model="userRegister.rePassword"
            type="password"
            placeholder="Please enter confirm your password "
            id="Confirm_Password"
          />
          <p class="error-message" v-if="error.rePassword">{{ error.rePassword }}</p>
        </div>
        <!--  -->
        <div :class="['field infor '] + (error.address ? 'padding-bottom-custorm' : '')">
          <label for="Address" class="label_input">Address:</label>
          <input v-model="userRegister.address" type="text" placeholder="EX: Hà Nội" id="Address" />

          <p class="error-message" v-if="error.address">{{ error.address }}</p>
        </div>
        <!--  -->
        <div class="dob">
          <div :class="['field infor '] + (error.dateOfBirth ? 'padding-bottom-custorm' : '')">
            <label for="Date_of_birth" class="label_input">Date of birth:</label>
            <input
              v-model="userRegister.dateOfBirth"
              type="date"
              placeholder="*Date Of Birth"
              id="Date_of_birth"
            />
            <p class="error-message" v-if="error.dateOfBirth">{{ error.dateOfBirth }}</p>
          </div>
        </div>
        <!--  -->
        <div :class="['field infor '] + (error.phone ? 'padding-bottom-custorm' : '')">
          <label for="Phone" class="label_input">Phone:</label>
          <input
            v-model="userRegister.phoneNumber"
            type="text"
            placeholder="EX: 099998888"
            id="Phone"
          />
          <p class="error-message" v-if="error.phoneNumber">{{ error.phoneNumber }}</p>
        </div>
        <!--  -->
        <div class="select dob">
          <label class="label_input">Department:</label>
          <select id="department" v-model="userRegister.department._id">
            <option value="">--Department--</option>
            <option
              v-for="(optionDepartment, index) in optionsDepartment"
              :value="optionDepartment._id"
              :key="index"
            >
              {{ optionDepartment.name }}
            </option>
          </select>
          <p class="error-message" v-if="error.department">{{ error.department }}</p>
        </div>

        <div class="select">
          <label class="label_input">Contract:</label>
          <select id="contract" v-model="userRegister.contract.type">
            <option value="">--Contract--</option>
            <option
              v-for="(optionContract, index) in optionsContract"
              :value="optionContract.value"
              :key="index"
            >
              {{ optionContract.text }}
            </option>
          </select>
          <p class="error-message" v-if="error.contract">{{ error.contract }}</p>
        </div>
        <div :class="['gender '] + (error.gender ? 'padding-bottom-custorm' : '')">
          <h3>Gender</h3>
          <div v-for="(gender, index) in arrayGender" :key="index">
            <input v-model="userRegister.gender" type="radio" name="gender" :value="gender" />
            <label for="gender" style="text-transform: capitalize">{{ gender }}</label>
          </div>
        </div>
        <div style="width: 100%; text-align: center; padding-bottom: 5px">
          <p class="error-message" v-if="error.gender">{{ error.gender }}</p>
        </div>
        <div :class="['accept '] + (error.acceptTermPolicy ? 'padding-bottom-custorm' : '')">
          <input
            type="checkbox"
            id="accept"
            value="acceptTermPolicy"
            v-model="userRegister.acceptTermPolicy"
          />
          <label for="accept">
            I accept
            <a href="#">Terms of Use&nbsp;</a>
            &amp;
            <a href="#">&nbsp;Privacy Policy</a>
          </label>
          <div>
            <p class="error-message" v-if="error.acceptTermPolicy">{{ error.acceptTermPolicy }}</p>
          </div>
        </div>

        <div class="btn">
          <button class="btn-signup" @click="handleRegister" type="button">Sign Up</button>
        </div>

        <div class="login">
          <p>You have account?</p>
          <router-link to="/sign-in" id="return-login">Login now</router-link>
        </div>
      </form>
    </div>
    <transition v-if="showModal" name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header">Sign Up Success</slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import { getListUsers, registerUser } from '@/apis/User.js';
import { getListDepartments } from '@/apis/Department.js';
import {
  validateEmail,
  validatePhone,
  validateUsername,
  validateFullname,
} from '@/validation/validate';

export default {
  name: 'SignUp',
  data() {
    return {
      optionsDepartment: [],
      optionsContract: [
        { time: 2592000, value: '1 month', text: '1 month' },
        { time: 7776000, value: '3 month', text: '3 months' },
        { time: 15552000, value: '6 months', text: '6 months' },
        { time: 31536000, value: '1 year', text: '1 year' },
        { time: 63072000, value: '2 years', text: '2 years' },
        { time: 157680000, value: '5 years', text: '5 years' },
      ],
      arrayGender: ['male', 'female', 'other'],
      users: {},
      userRegister: {
        fullName: '',
        username: '',
        email: '',
        password: '',
        rePassword: '',
        address: '',
        dateOfBirth: '',
        phoneNumber: '',
        department: {
          _id: '',
        },
        contract: {
          type: '',
          createdAt: new Date(),
          endDate: new Date(),
        },
        gender: 'male',
        acceptTermPolicy: '',
        avatarUrl: 'https://cdn.iconscout.com/icon/free/png-512/vue-282497.png',
      },
      error: [],
      errorMessage: '',
      showModal: false,
    };
  },
  async beforeCreate() {
    //get list users
    this.users = await getListUsers();
    this.optionsDepartment = await getListDepartments();
  },
  methods: {
    async handleRegister(e) {
      e.preventDefault();
      await this.validateData();
      if (Object.keys(this.error).length === 0) {
        var time =
          new Date().getTime() +
          this.optionsContract.find((item) => item.value === this.userRegister.contract.type).time *
            1000;
        this.userRegister.contract.endDate = new Date(time);
        var success = registerUser(this.userRegister);
        success.then((result) => {
          if (result === true) {
            this.showModal = true;
            setTimeout(() => {
              this.showModal = false;
              this.$router.push('/sign-in');
            }, 3000);
          }
        });
      }
    },
    validateData() {
      this.error = {};
      let valEmail = validateEmail(this.users, this.userRegister.email);
      if (valEmail) {
        this.error.email = valEmail;
      }
      let valPhone = validatePhone(this.users, this.userRegister.phoneNumber);
      if (valPhone) {
        this.error.phoneNumber = valPhone;
      }
      let valUsername = validateUsername(this.users, this.userRegister.username);
      if (valUsername) {
        this.error.username = valUsername;
      }
      let valFullname = validateFullname(this.fullName);
      if (valFullname) {
        this.error.fullName = valFullname;
      }
      if (this.userRegister.password.length < 8) {
        this.error.password = 'Minimum password length is 8 characters';
      }
      if (
        this.userRegister.password &&
        this.userRegister.rePassword &&
        this.userRegister.password !== this.userRegister.rePassword
      ) {
        this.error.rePassword = 'Password re-entered incorrect';
      }
      var keys = Object.keys(this.userRegister);
      keys.forEach((key) => {
        if (key === 'contract') {
          if (!this.userRegister[key].type) {
            this.error[key] = 'Please enter ' + key;
          }
        } else if (key === 'department') {
          if (!this.userRegister[key]._id) {
            this.error[key] = 'Please enter ' + key;
          }
        } else if (!this.userRegister[key]) {
          this.error[key] = 'Please enter ' + key;
        }
      });
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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

section {
  width: 100%;
  background: -webkit-linear-gradient(left, #9097c5, #e4c6de);
  padding: 40px;
}

::selection {
  background: #fa4299;
  color: #fff;
}

.error-message {
  color: rgb(234, 0, 0);
}

.padding-bottom-custorm {
  padding-bottom: 10px;
}

.box {
  width: 100%;
  height: 350%;
  background-image: linear-gradient(to right, #9097c5, #e4c6de);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
}
::-webkit-scrollbar {
  display: none;
}

.container {
  margin: auto;
  border-radius: 5px;
  max-width: 500px;
  padding: 15px;
  background: #fff;
  color: black;
}

#title {
  display: block;
  font-size: 35px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
  color: #2c2c2c;
}

form .field {
  height: 90px;
  width: 100%;
}

form .field input {
  display: block;
  height: 50px;
  width: 100%;
  outline: none;
  border-radius: 5px;
  border: 1px solid lightgray;
  border-bottom-width: 2px;
  font-size: 18px;
  transition: all 0.2s ease;
}

form .infor input {
  padding-left: 15px;
}

form .infor input:hover {
  border-color: rgba(97, 62, 223, 0.5) !important;
}

form .field input:focus {
  outline: none !important;
  border: 3px solid rgba(97, 62, 223, 0.7) !important;
}

::placeholder {
  color: gray;
}

.avatar {
  margin-top: 20px;
  height: 50px;
  width: 100%;
  padding-left: 15px;
  outline: none;
  border-radius: 5px;
  border: 1px solid lightgray;
  border-bottom-width: 2px;
  font-size: 18px;
  color: gray;
}

.avatar label {
  display: inline-block;
  height: 100%;
  width: 100%;
  cursor: pointer;
  line-height: 50px;
}
.label_input {
  color: #9438fc;
  font-size: 18px;
  margin-bottom: 3px;
  display: inline-block;
}

.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

form .select {
  height: 90px;
  width: 100%;
}

form .select select {
  display: inline-block;
  width: 100%;
  height: 50px;
  outline: none;
  padding-left: 15px;
  border: 1px solid lightgray;
  border-bottom-width: 2px;
  border-radius: 5px;
  font-size: 18px;
  color: gray;
}

h3 {
  color: black;
  font-size: 18px;
  font-weight: 400;
}

.dob {
  /* margin-top: 20px; */
}

.dob input {
  margin-top: 2px !important;
}

.gender {
  padding-bottom: 0px !important;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.gender div {
  margin: 0px 5px;
  padding: 3px;
}

.gender div input {
  display: inline-block;
  margin-right: 5px;
}

.accept {
  text-align: center;
}

.accept input {
  display: inline-block;
  margin-right: 5px;
}
a {
  text-decoration: none;
}

.btn {
  margin-top: 20px;
  height: 50px;
  width: 100%;
}

.btn .btn-signup {
  line-height: 50px;
  background: #a051fc;
  color: #fff;
  cursor: pointer;
  font-weight: 500;
  display: block;
  height: 100%;
  width: 100%;
  margin-top: 20px;
  outline: none;
  border-radius: 5px;
  border: 1px solid lightgray;
  border-bottom-width: 2px;
  font-size: 18px;
  transition: all 0.2s ease;
}

.btn .btn-signup:hover {
  background: #7710ec;
  transition: 0.5s ease-in-out;
}

.login {
  display: flex;
  justify-content: center;
}

.login p {
  display: block;
  text-align: center;
  margin-top: 15px;
  font-size: 15px;
  font-weight: 450;
}

#return-login {
  display: block;
  text-align: center;
  margin-top: 15px;
  font-size: 15px;
  font-weight: 450;
  color: #8000ff;
  margin-left: 5px;
}

#return-login:hover {
  color: #420fb6;
}

.modal-header {
  padding-top: 30px;
  padding-bottom: 30px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 30vw;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #000000a1;
  color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  border-radius: 5px;
  text-align: center;
  font-size: 2em;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
  * The following styles are auto-applied to elements with
  * transition="modal" when their visibility is toggled
  * by Vue.js.
  *
  * You can easily play with the modal transition by editing
  * these styles.
  */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

@media (max-width: 400px) {
  .box {
    height: 150%;
  }

  .gender {
    display: flex;
    flex-wrap: wrap;
  }

  .gender div {
    width: 100%;
  }

  .accept {
    font-size: 13px;
  }

  .login p {
    font-size: 13px;
  }

  .login #return-login {
    font-size: 13px;
  }
}
</style>
