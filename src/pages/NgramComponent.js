import React from 'react';
import SpinnerComponent from './SpinnerComponent';

class NgramComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: false
        }
        this.toggleLoading = this.toggleLoading.bind(this)
    }

    toggleLoading = (set) => {
        this.setState(({isLoading}) => ({
            isLoading: set
        }))
    }

    setResponse = async (response) => {
        this.toggleLoading(true)     
        let data = Object.assign({}, {'surveyQuestionId': this.props.data['surveyQuestionId']})
        data['response'] = response
        this.toggleLoading(false)
        this.props.response(data)
    }

    render() {
        return(
            <div className='ngram'>
                <h3>{this.props.description == null ? 
                    <SpinnerComponent /> :
                    this.props.description}</h3>
                <div className='form-group'>
                    <p>{this.props.data['ngram']}</p>
                </div>
                <div className='row'>
                    <div className='col-xl-10 col-lg-12 col-md-12'>
                    {this.state.isLoading ? 
                        <SpinnerComponent /> :
                        <div className='row'>                           
                            <div className='col-lg-3 col-md-6 my-1'>
                                <button className='btn btn-primary btn-block' onClick={() => this.setResponse(0)}>Don't know</button>
                            </div>
                            <div className='col-lg-3 col-md-6 my-1'>
                                <button className='btn btn-primary btn-block' onClick={() => this.setResponse(1)}>Defenitely not a match</button>
                            </div>
                            <div className='col-lg-3 col-md-6 my-1'>
                                <button className='btn btn-primary btn-block' onClick={() => this.setResponse(2)}>Maybe a match</button>
                            </div>
                            <div className='col-lg-3 col-md-6 my-1'>
                                <button className='btn btn-primary btn-block' onClick={() => this.setResponse(3)}>Definitely a match</button>
                            </div>
                        </div>}                      
                    </div>       
                </div>
            </div>           
        )
    }
}

export default NgramComponent;