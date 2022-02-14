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
                {'surveyQuestionId': 0, 'categoryId': 'AA', 'ngram': 'Test ngram 1'},
                {'surveyQuestionId': 0, 'categoryId': 'AA', 'ngram': 'Test ngram 2'},
                {'surveyQuestionId': 0, 'categoryId': 'BB', 'ngram': 'Test ngram 3'},
                {'surveyQuestionId': 0, 'categoryId': 'BB', 'ngram': 'Test ngram 4'}
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
    }

    const getCategories = async () => {
        if(isTutorial) {
            setCategories([
                {'categoryId': 'AA', 'description': 'This is the description for category AA'},
                {'categoryId': 'BB', 'description': 'This is the description for category BB'}
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
            return navigate('/survey-error')
        }
        navigate("/survey-complete")
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
                        isTutorial ?
                            isFinished(true) :
                            <button className='btn btn-primary btn-lg btn-block' onClick={() => finishSurvey()}>Finish survey</button>}
            </div>}
        </div>
    )
}

export default Survey;