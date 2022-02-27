<template>
  <section class="Form">
    <div class="box"></div>
    <div class="container">
      <h1 id="title">{{ isCreate ? 'Create' : 'Update' }} Profile</h1>
      <form class="signup" @submit.prevent="saveUserInfo">
        <input-group class="field infor" :errorMessage="errorsMsg.avatarUrl">
          <div class="avatar">
            <div class="image">
              <img v-if="user.avatarUrl" :src="user.avatarUrl" id="img" />
              <i v-else class="fas fa-user" id="default"></i>
            </div>
            <p>
              <input
                type="file"
                name="img-file"
                id="img-file"
                accept="image/*"
                style="display: none"
                @change="avatarChange"
              />
            </p>
            <p><label for="img-file" style="cursor: pointer">Choose a photo</label></p>
          </div>
        </input-group>
        <input-group class="field infor" :errorMessage="errorsMsg.fullName">
        <label class="label_input" for="Fullname">Fullname:</label>
          <input v-model.trim="user.fullName" type="text" placeholder="EX: Đặng Trần Quyền" id="Fullname"/>
        </input-group>
        <input-group class="field infor" :errorMessage="errorsMsg.username">
        <label class="label_input" for="Username">Username:</label>
          <input v-model.trim="user.username" type="username" placeholder="EX: quyenutt2000" id="Username"/>
        </input-group>
        <input-group class="field infor" :errorMessage="errorsMsg.email">
        <label class="label_input" for="Email">Email:</label>
          <input v-model="user.email" type="mail" placeholder="EX: quyenutt2000@gmail.com" id="Email"/>
        </input-group>
        <input-group class="field infor" :errorMessage="errorsMsg.password">
        <label class="label_input" for="Password">Password:</label>
          <input v-model="user.password" type="password" placeholder="EX: 12345678 " id="Password"/>
        </input-group>
        <input-group class="field infor" :errorMessage="errorsMsg.address">
        <label class="label_input" for="Address">Address:</label>
          <input v-model.trim="user.address" type="text" placeholder="EX: Hà Nội" id="Address"/>
        </input-group>
        <input-group class="field infor" :errorMessage="errorsMsg.dateOfBirth">
          <div class="dob">
            <label class="label_input" for="Date_Of_Birth">Date Of Birth:</label>

            <input
              v-model="user.dateOfBirth"
              type="text"
              placeholder="Date Of Birth"
              onfocus="(this.type='date' )"
            id="Date_Of_Birth"/>
          </div>
        </input-group>
        <input-group class="field infor" :errorMessage="errorsMsg.phoneNumber">
        <label class="label_input" for="Phone">Phone Number:</label>
          <input v-model="user.phoneNumber" type="phone" placeholder="EX: 099998888" id="Phone"/>

        </input-group>
        <input-group class="field infor" :errorMessage="errorsMsg.jobName">
          <div class="select">
            <label class="label_input" for="#">Job:</label>
            <input-select
              id="job"
              keyName="_id"
              title="Job"
              :options="optionsJob"
              :model="user.job"
            />
          </div>
        </input-group>
        <input-group class="field infor" :errorMessage="errorsMsg.roleName">
          <div class="select">
            <label class="label_input" for="#">Role:</label>
            <input-select
              id="role"
              keyName="_id"
              title="Role"
              :options="optionsRole"
              :model="user.role"
            />
          </div>
        </input-group>
        <input-group class="field infor" :errorMessage="errorsMsg.department_id">
          <div class="select">
            <label class="label_input" for="#">Department:</label>

            <input-select
              id="department"
              keyName="_id"
              title="Department"
              :options="optionsDepartment"
              :model="user.department"
            />
          </div>
        </input-group>
        <input-group class="field infor" :errorMessage="errorsMsg.contractType">
          <div class="select">
            <label class="label_input" for="#">Contract:</label>

            <input-select
              id="contract"
              keyName="type"
              title="Contract"
              :options="optionsContract"
              :model="user.contract"
            />
          </div>
        </input-group>
        <input-group class="field infor" :errorMessage="errorsMsg.official">
          <div class="official">
            <h3>Official</h3>
            <div class="custom-check-box">
              <input
                id="officialTrue"
                v-model="user.official"
                type="radio"
                name="official"
                value="true"
              />
              <label for="officialTrue">Yes</label>
            </div>
            <div class="custom-check-box">
              <input
                id="officialFalse"
                v-model="user.official"
                type="radio"
                name="official"
                value="false"
              />
              <label for="officialFalse">No</label>
            </div>
          </div>
        </input-group>
        <input-group class="field infor" :errorMessage="errorsMsg.gender">
          <div class="gender">
            <h3>Gender</h3>
            <div class="custom-check-box" v-for="(gender, index) in arrayGender" :key="index">
              <input
                :id="'gender' + index"
                v-model="user.gender"
                type="radio"
                name="gender"
                :value="gender"
              />
              <label :for="'gender' + index" style="text-transform: capitalize">{{ gender }}</label>
            </div>
          </div>
        </input-group>
        <div class="btn">
          <button type="submit">Save</button>
        </div>
        <div class="admin">
          <router-link to="/admin" id="admin">You are Admin.</router-link>
        </div>
      </form>
      <modal-sign-up
        :showModal="showModal"
        :title="(isCreate ? 'Create' : 'Update') + ' Success'"
      />
    </div>
  </section>
</template>

<script>
  import { getUserById, getListUsers, createUser, updateUser } from '@/apis/User.js';
  import { getListDepartments } from '@/apis/Department.js';
  import { getListRoles } from '@/apis/Role.js';
  import { getListJobs } from '@/apis/Job.js';
  import {
    validateEmailType,
    validateUnique,
    validatePhoneType,
    validateMinLength,
    validateRequired,
  } from '@/validation/validate';
  import InputGroup from '@/components/inputs/InputGroup.vue';
  import InputSelect from '@/components/inputs/InputSelect.vue';
  import ModalSignUp from '@/components/modals/ModalSignUp.vue';
  export default {
    name: 'Form',
    props: ['id'],
    data() {
      return {
        optionsContract: [
          { time: 2592000, value: '1 month', label: '1 month' },
          { time: 2592000, value: '2 month', label: '2 month' },
          { time: 7776000, value: '3 month', label: '3 months' },
          { time: 15552000, value: '6 months', label: '6 months' },
          { time: 31536000, value: '1 year', label: '1 year' },
          { time: 63072000, value: '2 years', label: '2 years' },
          { time: 63072000, value: '3 year', label: '3 year' },
          { time: 157680000, value: '5 years', label: '5 years' },
        ],
        optionsJob: [],
        optionsRole: [],
        optionsDepartment: [],
        arrayGender: ['male', 'female', 'other'],
        user: {
          avatarUrl: null,
          job: {
            _id: '',
          },
          role: {
            _id: '',
          },
          department: {
            _id: '',
          },
          contract: {
            type: '',
            createdAt: new Date(),
            endDate: new Date(),
          },
        },
        users: [],
        errorsMsg: {},
        isCreate: false,
        showModal: false,
      };
    },
    async created() {
      this.users = await getListUsers();
      this.optionsDepartment = await getListDepartments();
      this.optionsRole = await getListRoles();
      this.optionsJob = await getListJobs();

      this.optionsRole = this.reduceOptionsForInputSelect(this.optionsRole);
      this.optionsJob = this.reduceOptionsForInputSelect(this.optionsJob);
      this.optionsDepartment = this.reduceOptionsForInputSelect(this.optionsDepartment);

      if (this.id?.toLowerCase() === 'create') return (this.isCreate = true);

      this.user = await getUserById(this.id);
      if (this.user.dateOfBirth) {
        this.user.dateOfBirth = new Date(this.user.dateOfBirth).toLocaleDateString();
      }
    },
    methods: {
      saveUserInfo() {
        this.validateData();
        // has errorsMsg will be return
        if (Object.values(this.errorsMsg).filter((item) => item).length) return;
        const time =
          new Date().getTime() +
          this.optionsContract.find((item) => item.value === this.user.contract.type).time * 1000;
        // contract need createData and endDate
        this.user.contract.endDate = new Date(time);
        this.user.contract.createdAt = new Date(this.user.contract.createdAt);
        this.isCreate
          ? createUser(this.user).then(() => (this.showModal = true))
          : updateUser(this.id, this.user).then(() => (this.showModal = true));

          setTimeout(() => {
          this.$router.push({ name: 'Admin' });
        }, 1000);
      },
      avatarChange(event) {
        if (!event.target.files.length) return;
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => (this.user.avatarUrl = reader.result);
        reader.readAsDataURL(file);
      },
      validateData() {
        this.errorsMsg = {};
        this.errorsMsg.email =
          validateEmailType(this.user.email) ||
          validateUnique(this.users, this.user.email, 'email', !this.isCreate);
        this.errorsMsg.phoneNumber =
          validatePhoneType(this.user.phone) ||
          validateUnique(this.users, this.user.phoneNumber, 'phoneNumber', !this.isCreate);
        this.errorsMsg.username =
          validateRequired(this.user.username) ||
          validateUnique(this.users, this.user.username, 'username', !this.isCreate);
        this.errorsMsg.fullName = validateRequired(this.user.fullName);
        this.errorsMsg.password = validateMinLength(this.user.password);
        this.errorsMsg.contractType = validateRequired(this.user.contract.type);
        this.errorsMsg.department_id = validateRequired(this.user.department._id);
        this.errorsMsg.address = validateRequired(this.user.address);
        this.errorsMsg.dateOfBirth = validateRequired(this.user.dateOfBirth);
        this.errorsMsg.official = validateRequired(this.user.official);
        this.errorsMsg.gender = validateRequired(this.user.gender);
        this.errorsMsg.jobName = validateRequired(this.user.job._id);
        this.errorsMsg.roleName = validateRequired(this.user.role._id);
      },
      reduceOptionsForInputSelect(data) {
        return data.reduce(function (accumulator, currentValue) {
          return accumulator.concat({
            value: currentValue._id,
            label: currentValue.name,
          });
        }, []);
      },
    },
    components: {
      InputGroup,
      InputSelect,
      ModalSignUp,
    },
  };
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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

  .box {
    width: 100%;
    height: 400%;
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

  .avatar {
    width: 100%;
    height: 200px;
    margin-bottom: 15px;
    text-align: center;
  }


  .avatar .image {
    text-align: center;
    height: 150px;
    margin: auto;
    box-shadow: 1px 1px 15px -5px black;
    width: 150px;
    margin-bottom: 15px;
    border-radius: 50%;
    color: #8000ff;
    position: relative;
  }
  .avatar label {
    font-size: 18px;
    font-weight: 400;
  }
  .avatar #default {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: 100%;
    line-height: 150px;
    margin-bottom: 5px;
    border-radius: 50%;
    font-size: 100px;
  }

  .avatar img {
    height: 100%;
    width: 100%;
    margin-bottom: 5px;
    border-radius: 50%;
  }

  .avatar p {
    color: #8000ff;
    font-size: 15px;
    font-weight: 600;
  }

  #img {
    border: none;
    outline: none;
    display: block;
    height: 100%;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    border-radius: 50%;
    margin-bottom: 15px;
  }

  form {
    margin-top: 20px;
  }

  form .field {
    width: 100%;
    margin-top: 20px;
  }
  form .field input {
    min-height: 50px;
  }

  form .field input {
    display: block;
    height: 100%;
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

  form .select {
    height: 70px;
    width: 100%;
    margin-top: 20px;
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
    color: #2c2c2c;
    font-size: 18px;
    font-weight: 400;
  }

  .dob {
    margin-top: 20px;
  }

  .dob input {
    margin-top: 2px !important;
  }
  .label_input{
  color: #9438fc;
  font-size: 18px;
    margin-bottom: 3px;
    display: inline-block;
  }

  .official {
    margin-top: 20px;
    display: flex;
    margin-bottom: 15px;
  }

  .official div {
    display: flex;
    margin: 0px 5px;
    padding: 3px;
  }

  .official div div input {
    display: inline-block;
    margin-right: 5px;
  }

  .gender {
    margin-top: 20px;
    display: flex;
    margin-bottom: 15px;
  }

  .gender div {
    display: flex;
    margin: 0px 5px;
    padding: 3px;
  }

  .gender div div input {
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
    text-align: center;
    margin-bottom: 15px;
  }

  .btn input,
  .btn button[type='submit'] {
    text-align: center;
    line-height: 50px;
    background: #a051fc;
    color: #fff;
    cursor: pointer;
    font-weight: 500;
    display: block;
    height: 100%;
    width: 100%;
    outline: none;
    border-radius: 5px;
    border: 1px solid lightgray;
    border-bottom-width: 2px;
    font-size: 18px;
    transition: all 0.2s ease;
  }

  .btn input:hover {
    background: #7710ec;
    transition: 0.5s ease-in-out;
  }

  .admin {
    display: flex;
    justify-content: center;
  }

  #admin {
    cursor: pointer;
    display: block;
    text-align: center;
    margin-top: 15px;
    font-size: 15px;
    font-weight: 450;
    color: #8000ff;
    margin-left: 5px;
  }

  #admin {
    color: #420fb6;
  }

  @media (max-width: 400px) {
    .box {
      height: 170%;
    }
    .avatar {
      height: 120px;
    }
    .avatar .image {
      height: 100px;
      width: 100px;
      margin-bottom: 5px;
    }
    .avatar #default {
      line-height: 100px;
      font-size: 70px;
    }
    .gender,
    .official {
      display: flex;
      flex-wrap: wrap;
    }
    .gender div,
    .official div {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }
    .gender div div,
    .official div div {
      width: 100%;
    }
    .login p {
      font-size: 13px;
    }
    .login #return-login {
      font-size: 13px;
    }
  }

  @media (max-width: 375px) {
    section {
      padding: 20px;
    }
    .box {
      height: 200%;
    }
  }

  @media (max-width: 320px) {
    section {
      padding: 20px;
    }
    .box {
      height: 200%;
    }
    #title {
      display: block;
      font-size: 15px;
      margin-bottom: 20px;
    }
  }
  form .field .custom-check-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  form .field .custom-check-box input {
    margin: 0 0.25rem 0.1rem 0.25rem;
    padding: 0;
    display: inline-block;
    min-height: auto;
    width: auto;
    height: auto;
  }
</style>
