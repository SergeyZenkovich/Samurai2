import React from 'react';
import TestRenderer from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe('ProfileStatus component', () => {
    test('status from props should be in the state', () => {
        const component = TestRenderer.create(<ProfileStatus status="Yo!" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('Yo!');
    });
    test('after creation span should be displayed ', () => {
        const component = TestRenderer.create(<ProfileStatus status="Yo!" />);
        const root = component.root;
        let span = root.findByType('span');
        expect(span).not.toBeNull();
    });
    test('after creation span should be contains correct status', () => {
        const component = TestRenderer.create(<ProfileStatus status="Yo!" />);
        const root = component.root;
        let span = root.findByType('span');
        expect(span.children[0]).toBe('Yo!');
    });
    test('after creation input should not be displayed', () => {
        const component = TestRenderer.create(<ProfileStatus status="Yo!" />).root;
        expect(component.findAll((el) => { el.type == 'input' })).toHaveLength(0);
    });
    test('input should be displayed in edit Mode instead of span', () => {
        const component = TestRenderer.create(<ProfileStatus status="Yo!" />);
        const root = component.root
        let span = root.findByType('span');
        span.props.onDoubleClick();
        let input = root.findByType('input');
        expect(input.props.value).toBe('Yo!');
    });
    test('callback should be called', () => {
        const mockCallback = jest.fn();
        const component = TestRenderer.create(<ProfileStatus status="Yo!" updateUserStatus={mockCallback} />).getInstance();
        component.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
})