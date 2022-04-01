import React from 'react';
import SpinnerComponent from './SpinnerComponent';

class NgramComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            isDescription: false,
            isResponse: false,
            isResponseHL: false,
            random:  Math.floor(Math.random() * 2),
            descriptionChange: false,
            response: 0,
            responseHL: 0
        }
    }

    setResponse = (e, response) => {   
        if (this.state.response !== response){

        }
        e.target.className = e.target.className + " selected"
        this.setState({
            response: response,
            isResponse: true
        })
    }

    setResponseCompare = (response) => {
        this.setState({
            responseHL: response,
            isResponseHL: true
        })
    }

    next = () => {
        this.props.response({
            'surveyQuestionId': this.props.data['surveyQuestionId'],
            'response': this.state.response,
            'responseHL': this.state.responseHL,
            'responseDate': Date.now()
        })
    }

    componentDidMount() {
        this.setState({
            isDescription: false,
            isResponse: false,
            isResponseHL: false,
            random: Math.floor(Math.random() * 2)
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props){
            this.setState({
                isDescription: false,
                isResponse: false,
                isResponseHL: false,
                random: Math.floor(Math.random() * 2),
                descriptionChange: prevProps.description !== this.props.description
            })
        }
    }

    render() {
        return(
            <div className='ngram'>
                <h3>Task</h3>
                <p>Both of the questions below refer to the following description:</p>
                <p className={`big-text description ${this.state.descriptionChange ? 'changed' : ''} ${this.state.isDescription ? 'clicked' : ""}`} onClick={() => this.setState({isDescription: true})}>
                    <i>
                        {this.props.description == null ? 
                            <SpinnerComponent /> :
                            this.props.description}
                    </i>
                </p>
                <div className='row'>               
                    <div className='col-md-12 mt-5'>
                        <h5>Q1: Does the description above match the following expression?</h5>
                        <p className="mt-4 mb-0">Expression:</p>
                        <p className="big-text expression">{this.props.data['ngram']}</p>
                    </div>                      
                    <div className='col-xl-10 col-lg-12 col-md-12'>
                        <p className="mt-4 mb-0">Answer:</p>
                        <div className='row'>                           
                            <div className='col-lg-3 col-md-6 my-1'>
                                {this.state.random === 0 ? 
                                <button className='btn btn-danger btn-block' onClick={(e) => this.setResponse(e, 1)} disabled={!this.state.isDescription}>No, it is not a match</button> :
                                <button className='btn btn-success btn-block' onClick={(e) => this.setResponse(e, 2)} disabled={!this.state.isDescription}>Yes, it is a match</button>}
                            </div>
                            <div className='col-lg-3 col-md-6 my-1'>
                                {this.state.random === 0 ? 
                                    <button className='btn btn-success btn-block' onClick={(e) => this.setResponse(e, 2)} disabled={!this.state.isDescription}>Yes, it is a match</button> :
                                    <button className='btn btn-danger btn-block' onClick={(e) => this.setResponse(e, 1)} disabled={!this.state.isDescription}>No, it is not a match</button>}
                            </div>
                            <div className='col-lg-3 col-md-6 my-1'>
                                <button className='btn btn-secondary btn-block' onClick={(e) => this.setResponse(e, 0)} disabled={!this.state.isDescription}>I can't decide</button>
                            </div>
                        </div>
                    </div>                      
                </div>
                <div className='row mb-5'> 
                    <div className='col-md-12 mt-5'>
                        <h5>Q2: Which of the following expressions is the BEST match for the description above?</h5>
                    </div>                                        
                    <div className='col-xl-10 col-lg-12 col-md-12'>
                        <p className="mt-4 mb-0">Answer:</p>
                        <div className='row'>
                        <div className='col-lg-3 col-md-6 my-1'>
                                <button className='btn btn-primary btn-block' onClick={() => this.setResponseCompare(this.props.data[this.state.random === 0 ? 'ngramHId' : 'ngramLId'], true)} disabled={!this.state.isDescription}>{this.props.data[this.state.random === 0 ? 'ngramH' : 'ngramL']}</button>
                            </div>
                            <div className='col-lg-3 col-md-6 my-1'>
                                <button className='btn btn-primary btn-block' onClick={() => this.setResponseCompare(this.props.data[this.state.random === 0 ? 'ngramLId' : 'ngramHId'], true)} disabled={!this.state.isDescription}>{this.props.data[this.state.random === 0 ? 'ngramL' : 'ngramH']}</button>
                            </div>
                            <div className='col-lg-3 col-md-6 my-1'>
                                <button className='btn btn-secondary btn-block' onClick={() => this.setResponseCompare(0, true)}>I can't decide</button>
                            </div>
                        </div>
                    </div>                      
                </div>
                <div className='row mb-5'>
                    <div className='col-md-12 mt-3 d-flex'>
                        <button className='btn btn-primary btn-block w-50 mx-auto' disabled={!this.state.isResponse || !this.state.isResponseHL} onClick={() => this.next()}>Next</button>
                    </div>
                </div>
            </div>           
        )
    }
}

export default NgramComponent;