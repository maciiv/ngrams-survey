import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Survey from './Survey';

function Tutorial() {
    const [finished, setFinished] = useState(Boolean)
    const [isLoading, setIsLoading] = useState(false)
    const query = new URLSearchParams(window.location.search);
    const pid = query.get("PROLIFIC_PID")
    const navigate = useNavigate()

    const isFinished = (data) => {
        setFinished(data)
    }
    
    const startSurvey = async () => {
        setIsLoading(true)
        const response = await fetch(`https://y5686nza8b.execute-api.ap-southeast-2.amazonaws.com/dev/surveys?pid=${pid}`)
        const json = await response.json()
        if(!response.ok) {
            return navigate('/survey-error')
        }
        navigate('/survey', {
            state: {
                sid: json['surveyId'],
                gid: json['groupId']
            }
        })
    }

    return(
        <div className='row'>
            <div className='col-md-12'>
                <h1 className='mt-5'>Tutorial</h1>
                <p>The tasks below are similar to the survey. When the description is highlighted means that the description has changed. Please make yourself familiar with how the survey will work. The answers provided during the tutorial are not recorded.</p>
                {<Survey isTutorial={true} isFinished={isFinished} />}
                {finished ? 
                    <button className='btn btn-primary btn-lg btn-block' onClick={() => startSurvey()} disabled={isLoading}>
                        {isLoading ? 
                            <div>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span>Loading survey...</span>
                            </div> : "Start survey"}
                    </button> :
                    ""}
            </div>
        </div>
    )
}

export default Tutorial;