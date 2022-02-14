import React from 'react';

class SpinnerComponent extends React.Component {
    render() {
        return(
            <div className="spinner-border text-primary my-5" role="status" style={this.props.style}>
                <span className="sr-only">Loading...</span>
            </div>
        )
    }
}

export default SpinnerComponent