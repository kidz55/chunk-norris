import { mount } from '@vue/test-utils'
import Categories from '@/views/Categories'

describe('Categories.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Categories, {
      props: {
        categories:['cat1', 'cat2', 'cat3']
      }
    })
  })
  it('renders 4 checkboxes', () => {
    expect(wrapper.findAll('[data-test-category-checkbox]')).toHaveLength(3)
    expect(wrapper.findAll('[data-test-category-checkbox-all]')).toHaveLength(1)
  })
  it('should emit new category selection on checkbox click', async () => {
    const checkboxes = wrapper.findAll('input')
    await checkboxes[0].trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().updateCategories.length).toBe(1)
    expect(wrapper.emitted().updateCategories[0]).toEqual([["cat1"]])
    await checkboxes[0].trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().updateCategories.length).toBe(2)
    expect(wrapper.emitted().updateCategories[1]).toEqual([[]])
    await checkboxes[2].trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().updateCategories.length).toBe(3)
    expect(wrapper.emitted().updateCategories[1]).toEqual([['cat3']])
  })
  it('should update category array by adding or removing a cateogry', () => {
    wrapper.vm.updateCategorySelection({ name: 'newCat'})
    expect(wrapper.vm.selectedCategories).toEqual(['newCat'])
    wrapper.vm.updateCategorySelection({ name: 'newCat'})
    expect(wrapper.vm.selectedCategories).toEqual([])
  })
  it('should select / deselect all categories available', () => {
    wrapper.vm.selectAllCategory({ value: true})
    expect(wrapper.vm.selectedCategories).toEqual(['cat1', 'cat2', 'cat3'])
    wrapper.vm.selectAllCategory({ value: false})
    expect(wrapper.vm.selectedCategories).toEqual([])
  })
})
