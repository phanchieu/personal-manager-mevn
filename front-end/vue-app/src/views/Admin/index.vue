<template>
  <section id="admin">
    <Header />
    <div class="wrapper">
      <div class="content">
        <div class="content-title">Dashboard</div>

        <div class="tabs">
          <div class="tab tabs-item">
            <div class="tabs-item-title">Product</div>
            <div class="tabs-item-quality">72</div>
            <a href="#" class="tabs-item-more">
              show detail
              <i class="fas fa-long-arrow-alt-right"></i>
            </a>
          </div>
          <div class="tab tabs-item">
            <div class="tabs-item-title">Customer</div>
            <div class="tabs-item-quality">272</div>
            <a href="#" class="tabs-item-more">
              show detail
              <i class="fas fa-long-arrow-alt-right"></i>
            </a>
          </div>
          <div class="tab tabs-item">
            <div class="tabs-item-title">Revenue</div>
            <div class="tabs-item-quality">7243</div>
            <a href="#" class="tabs-item-more">
              show detail
              <i class="fas fa-long-arrow-alt-right"></i>
            </a>
          </div>
          <div class="tab tabs-item">
            <div class="tabs-item-title">Quantity</div>
            <div class="tabs-item-quality">1172</div>
            <a href="#" class="tabs-item-more">
              show detail
              <i class="fas fa-long-arrow-alt-right"></i>
            </a>
          </div>
        </div>
        <!-- end tabs  -->
        <div class="list-user">
          <div class="list-user-search">
            <div class="search-box">
              <input
                v-model="search.text"
                type="search"
                placeholder="Enter the keyword"
                class="search"
              />
              <i class="fas fa-search search-icon"></i>
            </div>
            <div class="search-type-box">
              <label for="employee">Choose a type</label>
              <select v-model="search.by" class="employee text-capitalize">
                <option
                  v-for="(type, index) in search.list"
                  :key="index"
                  :value="type.value"
                  class="text-capitalize"
                >
                  {{ type.label }}
                </option>
              </select>
              <i class="fas fa-caret-down drop-icon"></i>
            </div>
            <a href="#" class="add" @click.prevent="$router.push(`/form/create`)">
              <i class="fas fa-plus-circle"></i>
            </a>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th class="text-center">STT</th>
                <th class="text-center">Avatar</th>
                <sort-table
                  data-column="fullName"
                  :list="users.filterAndSort"
                  :sort="sort"
                  type="fullName"
                >
                  Full Name
                </sort-table>
                <sort-table
                  data-column="email"
                  :list="users.filterAndSort"
                  :sort="sort"
                  type="email"
                >
                  Email
                </sort-table>
                <sort-table
                  data-column="phoneNumber"
                  :list="users.filterAndSort"
                  :sort="sort"
                  type="phoneNumber"
                >
                  Phone
                </sort-table>
                <th class="text-center">Official</th>
                <sort-table data-column="job" :list="users.filterAndSort" :sort="sort" type="job">
                  Job
                </sort-table>
                <sort-table data-column="role" :list="users.filterAndSort" :sort="sort" type="role">
                  Role
                </sort-table>
                <th data-column="contract" class="text-center">Contract</th>
                <sort-table
                  data-column="department"
                  :list="users.filterAndSort"
                  :sort="sort"
                  type="department"
                >
                  Department
                </sort-table>
                <th class="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(user, index) in users.pagination" :key="user._id">
                <td class="text-center">{{ index + 1 }}</td>
                <td class="text-center">
                  <img :src="user.avatarUrl" alt="" class="user-img" />
                </td>
                <td class="text-center">{{ user.fullName }}</td>
                <td class="text-center">{{ user.email }}</td>
                <td class="text-center">{{ user.phoneNumber }}</td>
                <td class="text-center">{{ user.official ? 'Yes' : 'No' }}</td>
                <td class="text-center">{{ user.job.name }}</td>
                <td class="text-center">{{ user.role.name }}</td>
                <td class="text-center">{{ user.contract.type }}</td>
                <td class="text-center">{{ user.department.name }}</td>
                <td v-if="user.role._id !== '60912447d2dde23467173284'" class="text-center">
                  <button class="btn btn-primary" @click="handleEdit(user._id)">Edit</button>
                  <button class="btn btn-danger" @click="handleToggleModalDelete(user._id)">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <pagination :users="users" />
        </div>
        <!-- end list-user  -->
      </div>
    </div>
    <Map />
    <Footer />
    <modal-delete ref="ModalDelete" />
  </section>
</template>

<script>
  // APIS
  import { getListUsers } from '@/apis/User';

  // Components
  import Map from '@/components/Map';
  import ModalDelete from './views/ModalDelete';
  import Header from '@/components/Header';
  import Footer from '@/components/Footer';
  import SortTable from '@/components/SortTable';
  import Pagination from '@/components/Pagination';

  export default {
    name: 'Admin',
    components: {
      Map,
      ModalDelete,
      Header,
      Footer,
      SortTable,
      Pagination,
    },
    data() {
      return {
        users: {
          original: [],
          filterAndSort: [],
          pagination: [],
        },
        specialType: ['department', 'job', 'role'],
        sort: {
          isAsc: true,
          by: '',
        },
        search: {
          text: '',
          by: 'fullName',
          list: [
            { label: 'fullName', value: 'fullName' },
            { label: 'job', value: 'job' },
            { label: 'email', value: 'email' },
            { label: 'phoneNumber', value: 'phoneNumber' },
          ],
        },
      };
    },
    watch: {
      'search.text': function (newValue) {
        newValue?.trim() ? this.searchUsers() : (this.users.filterAndSort = this.users.original);
      },
    },
    mounted() {
      // event when delete user
      this.$root.$on('users-changed', async () => {
        this.users.filterAndSort = this.users.original = await getListUsers();
      });
    },
    async beforeCreate() {
      this.users.filterAndSort = this.users.original = await getListUsers();
      this.$root.$emit('get-users-success', this.users.filterAndSort.length);
    },
    methods: {
      handleEdit(userId) {
        this.$router.push(`/form/${userId}`);
      },
      handleToggleModalDelete(userId) {
        this.$refs.ModalDelete.handleToggleModal(userId);
      },
      searchUsers() {
        this.users.filterAndSort = this.users.original.filter((user) => {
          const text = this.specialType.includes(this.search.by)
            ? user[this.search.by]['name']
            : user[this.search.by];
          return text.toLowerCase().includes(this.search.text.toLowerCase());
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

  img {
    display: block;
    max-width: 100%;
  }

  a,
  ul,
  li {
    text-decoration: none;
  }

  html,
  body {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    line-height: 1;
    background-color: white;
  }

  #admin {
    margin-top: 80px;
  }

  .wrapper {
    max-width: 1920px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .search-box {
    display: inline-block;
    position: relative;
  }

  .search {
    font-size: 17px;
    padding: 8px;
    width: 400px;
    border: none;
    margin-bottom: 20px;
    outline: none;
    border-radius: 20px;
    background-color: #fff;
  }

  .search-icon::before {
    position: absolute;
    top: 10px;
    right: 15px;
    color: #8c9196;
  }

  .search::placeholder {
    padding-left: 5px;
  }

  .search-type-box {
    display: inline-block;
    position: relative;
  }

  .drop-icon::before {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    font-size: 24px;
    color: #8c9196;
  }

  .sidebar {
    background-color: #263544;
    color: #ababab;
    max-width: 250px;
  }
  .sidebar-img {
    width: 100px;
    height: 100px;
    border: 1px solid black;
    border-radius: 50px;
    margin: 20px auto;
  }
  .sidebar-title {
    text-align: center;
    padding-top: 20px;
    padding-bottom: 35px;
    font-size: 25px;
  }
  .sidebar-item {
    height: 50px;
    line-height: 50px;
    display: inline-block;
    width: 100%;
  }
  .sidebar-item-icon {
    color: #ababab;
    font-size: 24px;
    padding: 14px 20px;
  }
  .sidebar-item-title {
    display: inline-block;
    color: #ababab;
    font-size: 18px;
  }
  .sidebar-item:hover {
    background-color: #1d2530;
  }

  .content {
    width: 100%;
    padding: 30px;
    background-color: #eceff1;
  }
  .content-title {
    display: inline-block;
    font-size: 30px;
    margin-bottom: 35px;
    text-transform: uppercase;
    padding-bottom: 9px;
    border-bottom: 2px solid black;
  }

  .add {
    color: blue;
    font-size: 36px;
    position: absolute;
    right: 10px;
  }

  .tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tabs-item {
    width: calc(25% - 30px);
    background-color: #c9c9de;
    border-radius: 5px;
    padding-left: 25px;
    color: white;
  }
  .tabs-item-title {
    font-size: 25px;
    padding: 13px 0;
  }
  .tabs-item-quality {
    font-size: 40px;
    padding: 14px 0;
  }
  .tabs-item-more {
    text-transform: uppercase;
    font-size: 12px;
    margin: 15px 0;
    display: inline-block;
    color: white;
  }
  .tabs-item:hover {
    box-shadow: none;
    transition: all ease-out 0.3s;
    opacity: 0.9;
    box-shadow: 0px 20px 30px 0px #ccc;
  }
  .tabs-item:first-child {
    background-color: #0e1731;
  }
  .tabs-item:nth-child(2) {
    background-color: #79af80;
  }
  .tabs-item:nth-child(3) {
    background-color: #caa538;
  }
  .tabs-item:last-child {
    background-color: #bd527b;
  }

  .list-user {
    margin: 40px 0;
  }

  .list-user-search {
    position: relative;
  }

  .list-user-search label {
    font-size: 19px;
    margin-left: 20px;
    margin-right: 20px;
  }

  .employee {
    font-size: 20px;
    outline: none;
    border: none;
    border-radius: 4px;
    padding: 5px 20px;
    background-color: white;
    color: #3c4858;
  }

  .table {
    background-color: white;
    width: 100%;
    border-collapse: collapse;
    display: block;
    max-width: -moz-fit-content;
    max-width: fit-content;
    margin: 0 auto;
    overflow-x: auto;
    white-space: nowrap;
  }

  th,
  td {
    text-align: center;
    padding: 10px;
    font-size: 18px;
  }
  th.sortable {
    cursor: pointer;
  }
  th,
  tr:nth-child(even) {
    background-color: #dddddd;
  }
  .truncate {
    max-width: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .user-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: block;
    margin: 0 auto;
  }

  .btn {
    padding: 10px 25px;
    display: inline-block;
    border-radius: 8px;
    color: white;
    border: none;
    outline: none;
    min-width: 120px;
    cursor: pointer;
    opacity: 1;
    transition: opacity 0.4s linear;
    will-change: opacity;
  }

  .btn:hover {
    opacity: 0.8;
  }

  .btn + .btn {
    margin-left: 10px;
  }
  .btn-primary {
    background-color: #0d6efd;
  }
  .btn-danger {
    background-color: #dd3b45;
  }
  .text-capitalize {
    text-transform: capitalize;
  }
  .text-right {
    text-align: right;
  }
</style>
