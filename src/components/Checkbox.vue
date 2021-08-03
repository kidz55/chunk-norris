<template>
  <div class="control" :class="{ 'is-checked': checked }">
    <input :id="`input-${name}`" v-model="checked" type="checkbox" @change="updateSelf" />
    <label :for="`input-${name}`">
      {{ name }}
    </label>
  </div>
</template>

<script>
  export default {
    props: {
      name: { type: String, required: true },
      initValue: { type: Boolean, default: false }
    },
    data() {
      return {
        checked: false
      };
    },
    watch: {
      initValue(value) {
        this.checked = value;
      }
    },
    methods: {
      updateSelf() {
        this.$emit('update', { name: this.name, value: this.checked });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .control {
    padding: 0 0.5rem;
    display: flex;
    align-content: center;
  }
</style>
