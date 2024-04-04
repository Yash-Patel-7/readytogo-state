import { 
	useState as _useState, 
	useEffect as _useEffect
} from 'react';

class State {
	private static _states: Map<unknown, State> = new Map();
	private _value: unknown;
	private _listeners: Map<React.Dispatch<unknown>, undefined>;

	private constructor(initialValue: unknown) {
		this._setValue(initialValue);
		this._listeners = new Map();
	}

	public static instanceofState = (arg: unknown): arg is State => {
		return arg instanceof State;
	}

	public static getState = (key: unknown, initialValue: unknown): State => {
		const states = State._states;
		if (states.has(key) === false) states.set(key, new State(initialValue));
		const state = states.get(key);
		if (typeof state === 'undefined') throw new Error('UNEXPECTED');
		return state;
	}

	public static useState = (key: unknown, initialValue: unknown): State => {
		const state = State.getState(key, initialValue);
		const [value, setValue] = _useState(state.getValue());
		_useEffect(() => {
			state._register(value, setValue);
			return () => {state._unregister(setValue)};
		}, []);
		return state;
	}

	private _register = (value: unknown, setValue: React.Dispatch<unknown>): State => {
		this._listeners.set(setValue, undefined);
		if (this.getValue() === value) return this;
		setValue(this.getValue());
		return this;
	}

	private _unregister = (setValue: React.Dispatch<unknown>): State => {
		this._listeners.delete(setValue);
		return this;
	}

	private _setValue = (value: unknown): State => {
		this._value = value;
		return this;
	}

	public getValue = (): unknown => {
		return this._value;
	}

	public update = (value: unknown): State => {
		this._setValue(value);
		this._listeners.forEach((_, listener) => listener(this.getValue()));
		return this;
	}
}

const instanceofState = State.instanceofState;
const getState = State.getState;
const useState = State.useState;

export {
	instanceofState,
	getState,
	useState
}
