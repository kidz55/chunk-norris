<template>
  <div class="container" data-test-overview>
    <h1 class="title">Chunk Norris generator</h1>
    <div class="section-action" data-test-action>
      <ActionButton @click="fetchJokes" data-test-action-button>GET 10 RANDOM JOKES</ActionButton>
    </div>
    <categories v-if="categories" :categories="categories" @updateCategories="updateCategories" data-test-category />
    <jokes v-if="jokes" :isLoading="isJokesLoading" :jokes="jokes" data-test-jokes />
  </div>
</template>

<script>
  import { defineComponent, ref } from 'vue';
  import api from '../api/httpClient';
  import ActionButton from '../components/ActionButton';
  import Categories from './Categories.vue';
  import Jokes from './Jokes';

  export default defineComponent({
    name: 'Overview',
    components: { Categories, Jokes, ActionButton },
    setup() {
      const categories = ref(null);
      const jokes = ref(null);
      const selectedCategories = ref([]);
      const isJokesLoading = ref(false);
      const fetchCategory = async () => {
        try {
          const response = await api.get('categories');
          categories.value = response.data.categories;
        } catch (e) {
          // handle error
        }
      };

      const updateCategories = (selection) => {
        selectedCategories.value = selection;
      };

      const fetchJokes = async () => {
        isJokesLoading.value = true;
        let url = 'random';
        const queryParams = buildQuery();
        if (queryParams) url += `?${queryParams}`;
        try {
          const response = await api.get(url);
          jokes.value = response.data.jokes;
        } catch (e) {
          // handle error
        } finally {
          isJokesLoading.value = false;
        }
      };

      const buildQuery = () => {
        let query = '';
        if (selectedCategories.value.length) {
          selectedCategories.value.forEach((cat, i) => {
            query += `categories=${cat}`;
            if (i < selectedCategories.value.length - 1) {
              query += '&';
            }
          });
        }
        return query;
      };

      fetchCategory();
      fetchJokes();
      return {
        categories,
        selectedCategories,
        isJokesLoading,
        updateCategories,
        fetchJokes,
        jokes
      };
    }
  });
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }
  .section-action {
    text-align: center;
  }
  .title {
    text-align: center;
  }
</style>
