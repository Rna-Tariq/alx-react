import React from 'react';

const WithLogging = (WrappedComponent) => {
	if (!WrappedComponent) {
		throw new Error("WrappedComponent must be provided to WithLogging.");
	}

	const getDisplayName = (WrappedComponent) =>
		WrappedComponent.displayName || WrappedComponent.name || "Component";

	return class extends React.Component {
		componentDidMount() {
			console.log(`Component ${getDisplayName(WrappedComponent)} is mounted`);
		}

		componentWillUnmount() {
			console.log(
				`Component ${getDisplayName(WrappedComponent)} is going to unmount`
			);
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	};
};

export default WithLogging;
