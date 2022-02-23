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
        this.state.data[isCompare ? 'responseC' : 'response'] = response
        isCompare ? this.toggleCompare(true) : this.toggleMatch(true)
        if(this.state.data['response'] != undefined && this.state.data['responseC'] != undefined) {
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
                <h3>{this.props.description == null ? 
                    <SpinnerComponent /> :
                    this.props.description}</h3>
                {!this.state.isMatchDone ? 
                    <div className='row'>                  
                        <div className='col-md-12 mt-4'>
                            <div className='form-group'>
                                <p>Does the following expression match the description above?<br></br>
                                {this.props.data['ngram']}</p>
                            </div>
                        </div>                      
                        <div className='col-xl-10 col-lg-12 col-md-12'>
                            <div className='row'>                           
                                <div className='col-lg-3 col-md-6 my-1'>
                                    {this.state.random == 0 ? 
                                    <button className='btn btn-danger btn-block' onClick={() => this.setResponse(1)}>Defenitely not a match</button> :
                                    <button className='btn btn-success btn-block' onClick={() => this.setResponse(2)}>Definitely a match</button>}
                                </div>
                                <div className='col-lg-3 col-md-6 my-1'>
                                    {this.state.random == 0 ? 
                                        <button className='btn btn-success btn-block' onClick={() => this.setResponse(2)}>Definitely a match</button> :
                                        <button className='btn btn-danger btn-block' onClick={() => this.setResponse(1)}>Defenitely not a match</button>}
                                </div>
                                <div className='col-lg-3 col-md-6 my-1'>
                                    <button className='btn btn-secondary btn-block' onClick={() => this.setResponse(0)}>Don't know</button>
                                </div>
                            </div>
                        </div>                      
                    </div> : ""}
                {!this.state.isCompareDone ? 
                    <div className='row'> 
                        <div className='col-md-12 mt-5'>
                            <div className='form-group'>
                                <p>Which of the following expressions match the description above?</p>
                            </div>
                        </div>                                        
                        <div className='col-xl-10 col-lg-12 col-md-12'>
                            <div className='row'>
                            <div className='col-lg-3 col-md-6 my-1'>
                                    <button className='btn btn-primary btn-block' onClick={() => this.setResponse(this.props.data[this.state.random == 0 ? 'ngramC1Id' : 'ngramC2Id'], true)}>{this.props.data[this.state.random == 0 ? 'ngramC1' : 'ngramC2']}</button>
                                </div>
                                <div className='col-lg-3 col-md-6 my-1'>
                                    <button className='btn btn-primary btn-block' onClick={() => this.setResponse(this.props.data[this.state.random == 0 ? 'ngramC2Id' : 'ngramC1Id'], true)}>{this.props.data[this.state.random == 0 ? 'ngramC2' : 'ngramC1']}</button>
                                </div>
                                <div className='col-lg-3 col-md-6 my-1'>
                                    <button className='btn btn-secondary btn-block' onClick={() => this.setResponse(0, true)}>Don't know</button>
                                </div>
                            </div>
                        </div>                      
                    </div> : ""}  
            </div>           
        )
    }
}

export default NgramComponent;