<template>
  <select v-model.trim="model[keyName]">
    <option value="">--{{ title }}--</option>
    <option v-for="(option, index) in options" :value="option.value" :key="index">
      {{ option.label }}
    </option>
  </select>
</template>

<script>
  export default {
    props: ['options', 'model', 'keyName', 'title'],
  };
</script>

<style></style>
