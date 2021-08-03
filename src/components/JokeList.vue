<template>
  <div class="joke-list">
    <Joke v-for="joke in jokes" :key="joke.id" :joke="joke" @onToggleFavorite="updateFavorites" />
    <div v-show="jokes.length === 0" class="no-joke">
      No jokes for the moment :(
    </div>
  </div>
</template>

<script>
  import Joke from './Joke';
  export default {
    components: { Joke },
    props: {
      jokes: {
        type: Array,
        required: true
      }
    },
    emits: ['onUpdateFavorites'],
    methods: {
      updateFavorites(joke) {
        this.$emit('onUpdateFavorites', joke);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .joke-list {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-top: 1px solid $color-border;
  }
  .no-joke {
    display: flex;
    padding: 1rem 2rem;
    border-bottom: 1px solid $color-border;
  }
</style>
