import { mount } from '@vue/test-utils'
import Overview from '@/views/Overview'
import api from '@/api/httpClient.js'
import { when } from 'jest-when';
const categories = ['food', 'explicit']
const jokes = [
  {
    "categories": [], 
    "created_at": "2020-01-05 13:42:28.143137", 
    "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png", 
    "id": "1DmgoWNgQ2GV9SZrYpkUPQ", 
    "updated_at": "2020-01-05 13:42:28.143137", 
    "url": "https://api.chucknorris.io/jokes/1DmgoWNgQ2GV9SZrYpkUPQ", 
    "value": "Salman Rushdie is afraid of the fatwa on him... but is utterly terrified that Chuck Norris is even slightly irked at him."
  }, 
  {
    "categories": [], 
    "created_at": "2020-01-05 13:42:20.568859", 
    "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png", 
    "id": "EPcoMPqUSs6819V4Q11RVw", 
    "updated_at": "2020-01-05 13:42:20.568859", 
    "url": "https://api.chucknorris.io/jokes/EPcoMPqUSs6819V4Q11RVw", 
    "value": "Chuck Norris'new show is called \"12\" because he doesn't need \"24\"."
  }, 
]
describe('Overview.vue', () => {
  let wrapper;
  let httpGetStub;
  const categoryPath = 'categories';
  httpGetStub = jest.spyOn(api, 'get');
  when(httpGetStub).calledWith(categoryPath).mockResolvedValue(
    { data: { categories } }
  );
  const jokeCall = `random`;
  const jokeCallMatcher = when((arg) => arg.startsWith(jokeCall));
  when(httpGetStub)
    .calledWith(jokeCallMatcher)
    .mockResolvedValue({ data: { jokes } });

  beforeEach(() => {
    wrapper = mount(Overview, {})
  })
  afterEach(() => {
    httpGetStub.mockClear()
  })
  it('should render the view correctly and make the two calls in the beginning', () => {
    expect(wrapper.find('[data-test-overview]').exists()).toBeTruthy()
    expect(httpGetStub).toHaveBeenCalledTimes(2);
    expect(httpGetStub.mock.calls[0][0]).toBe('categories');
    expect(httpGetStub.mock.calls[1][0]).toBe('random');
    expect(wrapper.vm.jokes).toEqual(jokes);
    expect(wrapper.vm.categories).toEqual(categories);
  })
  it('should make a call with the selected categories', async () => {
    wrapper.vm.updateCategories(['cat1', 'cat2'])
    const button = wrapper.find('[data-test-action-button]')
    await button.trigger('click')
    expect(httpGetStub).toHaveBeenCalledTimes(3);
    expect(httpGetStub.mock.calls[2][0]).toBe('random?categories=cat1&categories=cat2');
  })
})
