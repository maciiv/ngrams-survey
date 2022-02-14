import React from 'react';

class ProgressComponent extends React.Component {
    getProgress = () => {
        let progress = this.props.index * 100 / this.props.max
        return {
            width: progress + "%"
        }
    }

    render() {
        return(
            <div className='progress my-5'>
               <div className="progress-bar" role="progressbar" aria-valuenow={this.props.index} aria-valuemin="0" aria-valuemax={this.props.max} style={this.getProgress()}></div>
            </div>           
        )
    }
}

export default ProgressComponent