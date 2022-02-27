<template>
  <div class="pagination">
    <div class="select-row">
      <label for="perPage">Rows per page:</label>
      <select v-model="perPage" id="perPage">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
      </select>
    </div>
    <div>{{ to ? from + 1 : 0 }}-{{ to }} of {{ total }}</div>
    <div class="navigation">
      <i :class="{ 'not-allowed': isFirstPage() }" @click="prev()" class="fas fa-chevron-left"></i>
      <i :class="{ 'not-allowed': isLastPage() }" @click="next()" class="fas fa-chevron-right"></i>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['users'],
    data() {
      return {
        perPage: 5,
        from: null,
        to: null,
        page: null,
        lastPage: null,
        total: null,
        isFirstTime: true,
      };
    },
    watch: {
      'users.filterAndSort': function (newUsers) {
        this.reset(newUsers.length);
        this.pagination();
      },
      perPage() {
        this.reset(this.total);
        this.pagination();
      },
    },
    methods: {
      pagination() {
        this.calculateFromTo();
        this.users.pagination = this.users.filterAndSort.slice(this.from, this.to);

        if (this.isFirstTime) {
          this.isFirstTime = false;
          this.getLongestCharacter(this.users.original, 'fullName');
          this.getLongestCharacter(this.users.original, 'email');
          this.getLongestCharacter(this.users.original, 'phoneNumber');
          this.getLongestCharacter(this.users.original, 'job');
          this.getLongestCharacter(this.users.original, 'role');
          this.getLongestCharacter(this.users.original, 'department');
        }
      },
      next() {
        if (this.isLastPage()) return;
        this.page++;
        this.pagination();
      },
      prev() {
        if (this.isFirstPage()) return;
        this.page--;
        this.pagination();
      },
      reset(totalRecords) {
        this.page = 1;
        this.total = totalRecords;
        this.lastPage = Math.ceil(totalRecords / Number(this.perPage));
      },
      calculateFromTo() {
        this.from = this.isFirstPage() ? 0 : (this.page - 1) * Number(this.perPage);
        this.to = this.from + Number(this.perPage);
        this.to = this.to > this.total ? this.total : this.to;
      },
      isFirstPage() {
        return this.page === 1;
      },
      isLastPage() {
        return this.page === this.lastPage;
      },
      getLongestCharacter(list, column) {
        const specialType = ['job', 'role', 'contract', 'department'];
        const longestCharacter = list.reduce((longest, item) => {
          const length = specialType.includes(column)
            ? item[column]['name'].length
            : item[column].length;
          return longest > length ? longest : length;
        }, 0);

        setTimeout(() => {
          document.querySelectorAll(`[data-column="${column}"]`).forEach((element) => {
            element.style.maxWidth = longestCharacter * 10 + 18 + 'px';
            element.style.minWidth = longestCharacter * 10 + 18 + 'px';
            element.style.width = longestCharacter * 10 + 18 + 'px';
          });
        }, 1);
      },
    },
  };
</script>

<style scoped>
  .pagination {
    width: 100%;
    padding: 0.5rem 0;
    text-align: right;
    background-color: #fff;
    border-top: 1px solid #ececec;
  }
  .pagination > div {
    display: inline-block;
    margin: 0 2rem;
  }
  select {
    display: inline-block;
    width: auto;
    padding: 0.375rem 2.25rem 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 16px 12px;
    border-bottom: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
  }
  .select-row label {
    margin-right: 2rem;
  }
  .navigation > i {
    cursor: pointer;
    margin: 0 1rem;
    color: #ced4da;
  }
  .navigation > i:hover {
    color: #56595c;
  }
  .navigation > i.not-allowed {
    cursor: not-allowed;
  }
</style>
