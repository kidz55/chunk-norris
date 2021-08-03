<template>
  <div class="container">
    <h1 class="title">Chunk Norris generator</h1>
    <div class="section-action">
      <ActionButton>GET 10 RANDOM JOKES</ActionButton>
    </div>
    <categories v-if="categories" :categories="categories" @updateCategories="updateCategories" />
    <jokes v-if="jokes" :jokes="jokes" />
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
    async setup() {
      const categories = ref([]);
      const option = ref('main');
      const jokes = ref([
        {
          icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
          id: 'QpDLFSjNQIiE294JRowPTQ',
          url: '',
          value: 'Chuck Norris puts out forest fires with his piss, while singing I make it rain'
        },
        {
          icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
          id: 'qgshozvsrboyqdbqa-vz3q',
          url: 'https://api.chucknorris.io/jokes/qgshozvsrboyqdbqa-vz3q',
          value: 'To Chuck Norris, everything contains a vulnerability.'
        },
        {
          icon_url: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
          id: 'IUltEG8kQOKXFgswV7ZOoA',
          url: 'https://api.chucknorris.io/jokes/IUltEG8kQOKXFgswV7ZOoA',
          value: 'one the boy said HELP HELP ITS CHUCK NORRIS'
        }
      ]);
      const selectedCategories = ref([]);

      const fetchCategory = async () => {
        const response = await api.get('jokes/categories');
        categories.value = response.data;
      };

      const updateCategories = (selection) => {
        selectedCategories.value = selection;
      };

      const fetchJokes = async () => {
        let url = 'jokes/random';
        const queryParams = buildQuery();
        url = queryParams ? `?${queryParams}` : url;
        const response = await api.get(url);
        jokes.value = response.data;
      };

      const buildQuery = () => {
        let query = '';
        if (selectedCategories.value.length) query += `categories=${selectedCategories.value.join(',')}`;
        return query;
      };

      await fetchCategory();
      return {
        categories,
        option,
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
