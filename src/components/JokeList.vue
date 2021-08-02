<template>
  <div class="joke-list">
    <Joke v-for="joke in jokes" :key="joke.id" :joke="joke" />
  </div>
</template>

<script>
import Joke from './Joke'
export default {
  components: { Joke },
  props: {
    jokes: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.joke-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid $color-border;
}
</style>