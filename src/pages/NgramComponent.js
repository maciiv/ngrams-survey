import React from 'react';
import SpinnerComponent from './SpinnerComponent';

class NgramComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            isMatchDone: false,
            isCompareDone: false,
            random: 0,
            data: {}
        }
        this.toggleMatch = this.toggleMatch.bind(this)
        this.toggleCompare = this.toggleCompare.bind(this)
        this.setRandom = this.setRandom.bind(this)
    }

    toggleMatch = (set) => {
        this.setState(({isMatchDone}) => ({
            isMatchDone: set
        }))
    }

    toggleCompare = (set) => {
        this.setState(({isCompareDone}) => ({
            isCompareDone: set
        }))
    }

    setData = () => {
        if(this.props.data != undefined) {
            return this.state.data = Object.assign({}, {'surveyQuestionId': this.props.data['surveyQuestionId']})
        }
    }

    setRandom = () => {
        this.setState(({random}) => ({
            random: Math.floor(Math.random() * 2)
        }))        
    }

    setResponse = async (response, isCompare = false) => {   
        this.state.data[isCompare ? 'responseHL' : 'response'] = response
        isCompare ? this.toggleCompare(true) : this.toggleMatch(true)
        if(this.state.data['response'] != undefined && this.state.data['responseHL'] != undefined) {
            this.state.data['surveyQuestionId'] = this.props.data['surveyQuestionId']
            this.props.response(this.state.data)
            this.toggleCompare(false)
            this.toggleMatch(false)
            this.setRandom()
            this.state.data = {}
        }
    }

    render() {
        return(
            <div className='ngram'>
                <h3>Task</h3>
                <p>Both of the questions below refer to the following description:</p>
                <h5 className="mt-5">Description</h5>
                <blockquote className="blockquote"><i>{this.props.description == null ? 
                    <SpinnerComponent /> :
                    this.props.description}</i></blockquote>
                {!this.state.isMatchDone ? 
                    <div className='row'>               
                        <div className='col-md-12 mt-5'>
                            <h5>Q1: Does the description above match the following expression?</h5>
                            <h6 className="mt-4">Expression:</h6>
                            <p>{this.props.data['ngram']}</p>
                        </div>                      
                        <div className='col-xl-10 col-lg-12 col-md-12'>
                            <h6 className="mt-4">Answer:</h6>
                            <div className='row'>                           
                                <div className='col-lg-3 col-md-6 my-1'>
                                    {this.state.random == 0 ? 
                                    <button className='btn btn-danger btn-block' onClick={() => this.setResponse(1)}>No, it is not a match</button> :
                                    <button className='btn btn-success btn-block' onClick={() => this.setResponse(2)}>Yes, it is a match</button>}
                                </div>
                                <div className='col-lg-3 col-md-6 my-1'>
                                    {this.state.random == 0 ? 
                                        <button className='btn btn-success btn-block' onClick={() => this.setResponse(2)}>Yes, it is a match</button> :
                                        <button className='btn btn-danger btn-block' onClick={() => this.setResponse(1)}>No, it is not a match</button>}
                                </div>
                                <div className='col-lg-3 col-md-6 my-1'>
                                    <button className='btn btn-secondary btn-block' onClick={() => this.setResponse(0)}>I can't decide</button>
                                </div>
                            </div>
                        </div>                      
                    </div> : ""}
                {!this.state.isCompareDone ? 
                    <div className='row mb-5'> 
                        <div className='col-md-12 mt-5'>
                            <h5>Q2: Which of the following expressions is the BEST match for the description above?</h5>
                        </div>                                        
                        <div className='col-xl-10 col-lg-12 col-md-12'>
                            <h6 className="mt-4">Answer:</h6>
                            <div className='row'>
                            <div className='col-lg-3 col-md-6 my-1'>
                                    <button className='btn btn-primary btn-block' onClick={() => this.setResponse(this.props.data[this.state.random == 0 ? 'ngramHId' : 'ngramLId'], true)}>{this.props.data[this.state.random == 0 ? 'ngramH' : 'ngramL']}</button>
                                </div>
                                <div className='col-lg-3 col-md-6 my-1'>
                                    <button className='btn btn-primary btn-block' onClick={() => this.setResponse(this.props.data[this.state.random == 0 ? 'ngramLId' : 'ngramHId'], true)}>{this.props.data[this.state.random == 0 ? 'ngramL' : 'ngramH']}</button>
                                </div>
                                <div className='col-lg-3 col-md-6 my-1'>
                                    <button className='btn btn-secondary btn-block' onClick={() => this.setResponse(0, true)}>I can't decide</button>
                                </div>
                            </div>
                        </div>                      
                    </div> : ""}  
            </div>           
        )
    }
}

export default NgramComponent;