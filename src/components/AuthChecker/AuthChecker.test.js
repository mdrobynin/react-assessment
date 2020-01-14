import React from 'react';
import { mount } from 'enzyme';
import setup from '../../tests-setup';

import { USER_ACTIONS } from '../../actions';
import { AuthChecker } from './AuthChecker';
import { FullScreenLoader } from '../FullScreenLoader';

describe('<AuthChecker /> tests', () => {
    it('Expect render fullscreen loader if auth is not checked', () => {
        const { element } = setup(<AuthChecker/>);
        const checker = mount(element)

        expect(checker.find(FullScreenLoader).length).toBe(1);
    });

    it('Expect render children in auth state checked', () => {
        const { element, store } = setup(<AuthChecker><div>child</div></AuthChecker>);

        store.dispatch({ type: USER_ACTIONS.AUTH_STATE_CHECK });

        const checker = mount(element);

        expect(checker.contains(<div>child</div>)).toBe(true);
    });
});