import { BurgerBuilder } from './BurgerBuilder'
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({
    adapter: new Adapter(),
});

describe("<BurgerBuilder /> is being tested.", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
    });

    it(" should render <BuildControls /> when received ingredients", () => {
        wrapper.setProps({ingredients : {salad: 0}})
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });

});
