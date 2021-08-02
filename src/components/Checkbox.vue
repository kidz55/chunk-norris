<template>
  <div class="control" :class="{ 'is-checked': checked }">
    <input :id="`input-${name}`" v-model="checked" type="checkbox" @change="updateSelf" />
    <label :for="`input-${name}`">
      {{label}}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    label: { type: String, default: '' },
  },
  methods: {
    updateSelf() {
      this.$emit('input', this.checked);
    }
  }
}
</script>>