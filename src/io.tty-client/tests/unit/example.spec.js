import { shallowMount } from '@vue/test-utils';
import StatsList from '@/components/StatsList.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(StatsList, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
