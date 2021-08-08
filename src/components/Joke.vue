<template>
  <div class="joke" data-test-joke>
    <div class="content">
      <div class="badge" :class="`is-${categoryHash}`" v-show="category" data-test-joke-category>{{ category }}</div>
      <div class="description" data-test-joke-content>{{ joke.value }}</div>
    </div>
    <a @click="toggleFavorite" class="action" data-test-joke-action>
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
    computed: {
      category() {
        return this.joke.categories.length > 0 ? this.joke.categories[0] : 'uncategorised';
      },
      categoryHash() {
        return (this.category.split().reduce((acc, curr) => acc + curr.charCodeAt(0), 0) % 8) + 1;
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
  .badge {
    padding: 0.2rem 0.5rem;
    width: fit-content;
    border-radius: 3rem;
    margin-bottom: 0.2rem;
  }

  .joke {
    display: flex;
    padding: 1rem 2rem;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid $color-border;
  }

  $color-categories: (#b3b3b3 #00d3a0 #4a93e2 #d86dff #d3ca00 #12c2f3 #00b2ae #ff5252);
  @for $i from 1 through length($color-categories) {
    .is-#{$i} {
      background-color: nth($color-categories, $i);
    }
  }
</style>
