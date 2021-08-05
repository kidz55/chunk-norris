<template>
  <div class="section-categories">
    <Checkbox
      v-for="category in categoryList"
      :key="category.name"
      :name="category.name"
      :initValue="category.isSelected"
      @update="updateCategorySelection"
    />
    <Checkbox name="all" @update="selectAllCategory" />
  </div>
</template>

<script>
  import { defineComponent, ref, toRefs, computed } from 'vue';
  import Checkbox from '../components/Checkbox.vue';
  export default defineComponent({
    components: { Checkbox },
    props: {
      categories: {
        type: Array,
        required: true
      }
    },
    watch: {
      categoryList() {
        this.$emit('updateCategories', this.selectedCategories);
      }
    },
    async setup(props) {
      const { categories } = toRefs(props);
      const selectedCategories = ref([]);

      const selectAllCategory = ({ value }) => {
        selectedCategories.value = value ? [...categories.value] : [];
      };

      const updateCategorySelection = (category) => {
        const index = selectedCategories.value.findIndex((c) => c === category.name);
        if (index > -1) {
          selectedCategories.value.splice(index, 1);
          return;
        }
        selectedCategories.value.push(category.name);
      };
      return {
        categoryList: computed(() => {
          return categories.value.map((cat) => {
            return { name: cat, isSelected: selectedCategories.value.includes(cat) };
          });
        }),
        updateCategorySelection,
        selectedCategories,
        selectAllCategory
      };
    }
  });
</script>

<style>
  .section-categories {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 2rem;
  }
</style>
