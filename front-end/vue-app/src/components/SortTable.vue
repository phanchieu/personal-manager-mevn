<template>
  <th class="text-center sortable" @click="sortBy(type)">
    <i class="fas fa-exchange-alt"></i>
    <slot />
  </th>
</template>

<script>
  export default {
    props: ['sort', 'type', 'list'],
    data() {
      return {
        specialType: ['department', 'job', 'role'],
      };
    },
    methods: {
      sortBy(by) {
        this.sort.by = by;
        this.sort.isAsc = !this.sort.isAsc;
        this.list.sort((a, b) => {
          let stringOfA = this.specialType.includes(by) ? a[by]['name'] : a[by];
          let stringOfB = this.specialType.includes(by) ? b[by]['name'] : b[by];
          stringOfA = stringOfA.charAt(0).toLowerCase();
          stringOfB = stringOfB.charAt(0).toLowerCase();

          return this.sort.isAsc
            ? stringOfA > stringOfB
              ? 1
              : -1
            : stringOfA < stringOfB
            ? 1
            : -1;
        });
      },
    },
  };
</script>

<style scoped>
  th.sortable .fas.fa-exchange-alt {
    transform: rotate(90deg);
    color: #be4bdb;
    margin-right: 0.25rem;
    font-size: 14px;
  }
</style>
