import { instanceofState, getState } from './index';

describe('instanceofState', () => {
	it('should return true for an instance of State class', () => {
		const state = getState('key', 'value');
		expect(instanceofState(state)).toBe(true);
	});

	it('should return false for a string', () => {
		expect(instanceofState('string')).toBe(false);
	});

	it('should return false for an instance of Array class', () => {
		const arr = new Array<number>(1, 2, 3);
		expect(instanceofState(arr)).toBe(false);
	});
});

describe('getState', () => {
	it('should return the same instance for the same exact key', () => {
		const state1 = getState(undefined, 9);
		const state2 = getState(undefined, 7);
		expect(state1).toBe(state2);
	});

	it('should return a different instance for a different key', () => {
		const state1 = getState(0, 9);
		const state2 = getState(1, 7);
		expect(state1).not.toBe(state2);
	});

	it('should return a different instance for a primitive and object', () => {
		const state1 = getState('string', [1, 2, 3]);
		const state2 = getState(new String('string'), []);
		expect(state1).not.toBe(state2);
	});
});

describe('state', () => {
	it('should return the initial value', () => {
		const initialValue = { value: 9 };
		let state = getState('initialValue', initialValue);
		const newValue = { value: 9 };
		state = getState('initialValue', newValue);
		expect(state.getValue()).toBe(initialValue);
	});

	it('should return the current value', () => {
		const initialValue = { value: 9 };
		const state = getState('currentValue', initialValue);
		const currentValue = { value: 9 };
		state.update(currentValue);
		expect(state.getValue()).toBe(currentValue);
	});

	it('should update to a value of any type', () => {
		const initialValue = { value: 9 };
		const state = getState('updatedValue', initialValue);
		const updatedValue = 'string';
		state.update(updatedValue);
		expect(state.getValue()).toBe(updatedValue);
	});
});

