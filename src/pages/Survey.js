import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NgramComponent from './NgramComponent';
import ProgressComponent from './ProgressComponent';
import SpinnerComponent from './SpinnerComponent';

function Survey({isTutorial, isFinished}) {
    const { state } = useLocation()
    const [questions, setQuestions] = useState([])
    const [responses, setResponses] = useState([])
    const [index, setIndex] = useState(0)
    const [categories, setCategories] = useState([])
    const [isSaving, setIsSaving] = useState(false)
    const navigate = useNavigate()

    const getQuestions = async () => {
        if(isTutorial) {
            setQuestions([
                {
                    'surveyQuestionId': 0, 
                    'categoryId': 'AA', 
                    'ngram': 'i find myself', 
                    'ngramHId': 1, 
                    'ngramH': 'when i am', 
                    'ngramLId': 2, 
                    'ngramL': 'however i still'
                },
                {
                    'surveyQuestionId': 1, 
                    'categoryId': 'AA', 
                    'ngram': 'where i am', 
                    'ngramHId': 3, 
                    'ngramH': 'i am so', 
                    'ngramLId': 4, 
                    'ngramL': 'which i \'m'
                },
                {
                    'surveyQuestionId': 2, 
                    'categoryId': 'BB', 
                    'ngram': 'they do n\'t', 
                    'ngramHId': 5, 
                    'ngramH': 'where i can', 
                    'ngramLId': 6, 
                    'ngramL': 'i chose to'
                },
                {
                    'surveyQuestionId': 3, 
                    'categoryId': 'BB', 
                    'ngram': 'hopefully i can', 
                    'ngramHId': 7, 
                    'ngramH': 'i plan to', 
                    'ngramLId': 8, 
                    'ngramL': 'so i could'
                }
            ])
        } else {
            const response = await fetch(`https://y5686nza8b.execute-api.ap-southeast-2.amazonaws.com/dev/questions?sid=${state.sid}`)
            const json = await response.json()
            if(!response.ok) {
                return navigate('/survey-error')
            }
            setQuestions(json)
        }      
    }
    
    const getResponse = (response) => {
        setResponses(responses => [...responses, response])
        setIndex(index + 1)
        if(isTutorial && index + 1 === questions.length){
            return isFinished(true)
        }
    }

    const getCategories = async () => {
        if(isTutorial) {
            setCategories([
                {
                    'categoryId': 'AA', 
                    'description': 'Referring to myself, relating to myself, putting myself in the bigger picture'
                },
                {
                    'categoryId': 'BB', 
                    'description': 'Referring to possibilities, relating to what is coming next, thinking about the future'
                }
            ])
        } else {
            const response = await fetch(`https://y5686nza8b.execute-api.ap-southeast-2.amazonaws.com/dev/categories?gid=${state.gid}`)
            const json = await response.json()
            if(!response.ok) {
                return navigate('/survey-error')
            }
            setCategories(json)
        }
    }

    const getDescription = () => {
        return categories.find(d => d.categoryId === questions[index]['categoryId'])?.description
    }
    
    useEffect(() => {
        let isMounted = true
        if(isMounted) {
            (async() => await getQuestions())();
            (async() => await getCategories())();
        }
        return () => { isMounted = false }
    }, [])

    const finishSurvey = async () => {
        setIsSaving(true)
        const response = await fetch(`https://y5686nza8b.execute-api.ap-southeast-2.amazonaws.com/dev/responses?sid=${state.sid}`, {
        method: 'POST',
        body: JSON.stringify(responses),
        headers: {
            'Content-Type': 'application/json'
        }
        })
        if(!response.ok) {
            console.log(response)
            return navigate('/survey-error')
        }
        //navigate("/survey-complete")
        navigate("https://app.prolific.co/submissions/complete?cc=5F64F959")
    }

    return(
        <div className='row'>
            {isSaving ? 
                    <div className='col-md-12'>
                        <h3 className='my-5'>Your responses are processing. Please wait and you will be redirected to Prolific</h3>
                        <div className='d-flex justify-content-center'>
                            <SpinnerComponent style={{width: '5rem', height: '5rem'}} />
                        </div>
                    </div> :
            <div className='col-md-12'>                    
                <ProgressComponent index={index} max={questions.length} />
                {questions.length === 0 ?
                    <SpinnerComponent /> :
                    index < questions.length ? 
                        <NgramComponent data={questions[index]} description={getDescription()} response={getResponse} /> : 
                        !isTutorial ?
                            <button className='btn btn-primary btn-lg btn-block' onClick={() => finishSurvey()}>Finish survey</button>: ""}
            </div>}
        </div>
    )
}

export default Survey;