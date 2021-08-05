<template>
  <div class="section-jokes">
    <div class="jokes-option">
      <a @click="option = 'main'" class="tab-item" :class="{ 'is-active': option === 'main' }">RANDOM JOKES</a>
      <a @click="option = 'favorites'" class="tab-item" :class="{ 'is-active': option === 'favorites' }"
        >MY FAVOURITES JOKES</a
      >
    </div>
    <div class="jokes-wrapper">
      <input
        v-model="filter"
        type="search"
        class="search-input"
        placeholder="Search for the best joke"
        autofocus
        data-test-search-bar-input
      />
      <joke-list :jokes="selectedJokes" @onUpdateFavorites="updateFavorites" :isLoading="isLoading" />
    </div>
  </div>
</template>

<script>
  import { defineComponent, computed, ref, toRefs } from 'vue';
  import jokeList from '../components/JokeList';
  export default defineComponent({
    components: {
      jokeList
    },
    props: {
      jokes: {
        type: Array,
        required: true
      },
      isLoading: {
        type: Boolean,
        required: true
      }
    },
    watch: {
      jokes() {
        this.option = 'main';
      }
    },
    setup(props) {
      const { jokes } = toRefs(props);
      const filter = ref('');
      const favoriteJokes = ref([]);
      const option = ref('main');

      const updateFavorites = (joke) => {
        const index = favoriteJokes.value.findIndex((jk) => jk.id === joke.id);
        if (index > -1) {
          favoriteJokes.value.splice(index, 1);
          return;
        }
        if (favoriteJokes.value.length >= 5) {
          favoriteJokes.value.shift();
        }
        favoriteJokes.value.push({
          ...joke,
          isSelected: true
        });
      };

      const filteredJokes = computed(() => {
        return jokes.value.map((jk) => {
          return {
            ...jk,
            isSelected: favoriteJokes.value.findIndex((j) => jk.id === j.id) > -1
          };
        });
      });

      const selectedJokes = computed(() => {
        const selected = option.value === 'favorites' ? favoriteJokes.value : filteredJokes.value;
        return selected.filter((jk) => jk.value.toLowerCase().indexOf(filter.value.toLowerCase()) > -1);
      });
      return {
        updateFavorites,
        option,
        filter,
        selectedJokes
      };
    }
  });
</script>

<style lang="scss" scoped>
  .section-jokes {
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: $device-medium) {
      width: 500px;
    }
  }
  .jokes-option {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    @media (min-width: $device-medium) {
      justify-content: space-evenly;
      flex-wrap: nowrap;
    }

    padding: 1rem;
  }

  .tab-item {
    flex: 1 0 auto;
    margin: 0 1rem;
    text-align: center;
    font-size: $size-large;
    font-weight: $weight-bold;
    color: $color-grey-dark;
    opacity: 0.5;
    cursor: pointer;

    &:hover,
    &:focus {
      text-decoration: underline;
    }

    &:active,
    &.is-active {
      opacity: 1;
      text-decoration: underline;
    }
  }

  .jokes-wrapper {
    border-left: 1px solid $color-border;
    border-right: 1px solid $color-border;
    width: 100%;
  }
  .search-input {
    width: 100%;
    min-width: 100px;
    padding: 1rem;
    font-family: $font-stack;
    font-size: $size-medium;
    border: 1px solid $color-border;

    line-height: 1.5rem;
    color: $color-dark;
    background: $color-grey-light;
    transition: all 0.15s ease-out;
    -webkit-appearance: none;
    &:focus-visible {
      outline: 0;
    }

    &::placeholder {
      color: $color-grey-dark;
    }
  }
</style>
