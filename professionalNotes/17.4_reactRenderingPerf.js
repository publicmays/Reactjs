// use shouldComponentUpdate to prevent component from rerendering if you know it's not going to change

shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.id !== this.props.id;
}