# readytogo-state
Share the state among any React components

## Usage

```javascript
import { instanceofState, getState, useState } from '@readytogo/state';

const PageOne = () => {
	const counter = useState('counter', 5);
	instanceofState(counter); // true
	return (
		<Button />
	);
}

const PageTwo = () => {
	return (
		<Button />
	);
}

const Button = () => {
	const counter = useState('counter', 7);
	instanceofState(counter); // true
	const onClick = () => {
		counter.update(counter.getValue() + 1);
	}
	return (
		<button onClick={onClick}>
			<Text />
		</button>
	);
}

const Text = () => {
	const counter = getState('counter', undefined);
	instanceofState(counter); // true
	if (counter.getValue() === undefined) {
		return (
			<div>Error: Rendered before PageOne or Button</div>
		);
	}
	return (
		<div>{counter.getValue()}</div>
	);
}
```

## Note
The useState() hook registers the component to be re-rendered when the value of the state changes. It registers the component on mount and unregisters the component on unmount. It always returns the state instance associated with the unique key and sets the initial value of the state if it was not set before. The getState() function always returns the state instance associated with the unique key and sets the initial value of the state if it was not set before. The instanceofState() function checks whether something is an instance of State class. In the usage above, if PageOne is rendered, then the initial value of the counter state will be 5, and both the PageOne and Button components will re-render every time the button is clicked. To avoid unnecessary re-renders, make sure that useState() is called only in the topmost parent component that depends on the state. All children components will re-render automatically when the parent re-renders. If PageTwo is rendered, then the initial value of the counter state will be 7. So, the parent components that render first determine the initial value of the state. The state is shared among all the components that use the same unique key. To make a state local to a specific component, use a unique key that is not used by any other component.

