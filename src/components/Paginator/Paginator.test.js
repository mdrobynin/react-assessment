import React from 'react';
import { mount } from 'enzyme';

import { Paginator } from './Paginator';

describe('<Paginator /> tests', () => {
    it('Expect to have given numbers of buttons + 2 arrows', () => {
        const count = 5;
        const paginator = mount(<Paginator value={2}  count={count}/>);
        const buttonsCount = paginator.find('.paginator__button').length;

        expect(buttonsCount).toBe(count + 2);
    });

    it('Expect to produce value on click', () => {
        const callback = jest.fn();
        const paginator = mount(<Paginator value={2} onChange={callback} count={5}/>);
        const leftArrow = paginator.find('.paginator__button').first();
        
        leftArrow.simulate('click');

        expect(callback.mock.results.length).toBe(1);
    });

    it('Expect to produce decreased value on left arrow click', () => {
        const initialValue = 3;
        const callback = jest.fn();
        const paginator = mount(<Paginator value={initialValue} onChange={callback} count={5}/>);
        const leftArrow = paginator.find('.paginator__button').first();
        
        leftArrow.simulate('click');

        expect(callback.mock.calls[0][0]).toBe(initialValue - 1);
    });

    it('Expect to produce increased value on right arrow click', () => {
        const initialValue = 3;
        const callback = jest.fn();
        const paginator = mount(<Paginator value={initialValue} onChange={callback} count={5}/>);
        const rightArrow = paginator.find('.paginator__button').last();
        
        rightArrow.simulate('click');

        expect(callback.mock.calls[0][0]).toBe(initialValue + 1);
    });

    it('Expect to produce value that user clicks on', () => {
        const initialValue = 1;
        const callback = jest.fn();
        const paginator = mount(<Paginator value={initialValue} onChange={callback} count={5}/>);
        const button = paginator.find('.paginator__button').at(3);
        
        button.simulate('click');

        expect(callback.mock.calls[0][0]).toBe(3);
    });
});