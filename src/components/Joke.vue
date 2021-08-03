<template>
  <div class="joke">
    <div class="content">{{ joke.value }}</div>
    <a @click="toggleFavorite" class="action">
      <icon-star :isSelected="joke.isSelected" />
    </a>
  </div>
</template>

<script>
  import IconStar from './images/IconStar.vue';
  export default {
    components: { IconStar },
    props: {
      joke: {
        type: Object,
        required: true
      }
    },
    methods: {
      toggleFavorite() {
        this.$emit('onToggleFavorite', this.joke);
      }
    }
  };
</script>
<style lang="scss" scoped>
  .joke {
    display: flex;
    padding: 1rem 2rem;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid $color-border;
  }
</style>
