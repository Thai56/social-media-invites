import expect from 'expect';
import { mount } from 'enzyme';
import BusinessInfo from '../pages/BusinessInfo';

let wrapper;
describe('BusinessInfo ', () => {
  it('should render a form ', () => {
    wrapper = mount(BusinessInfo); 
    console.log('wrapper ', wrapper);
  });
});
