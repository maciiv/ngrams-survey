import '../App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [isChecked, setIsChecked] = useState(false)
  const query = new URLSearchParams(window.location.search);
  const pid = query.get("pid")
  const navigate = useNavigate()

  const getParticipantExists = async () => {
    if(pid == null) {
      return true
    }
    const response = await fetch('https://y5686nza8b.execute-api.ap-southeast-2.amazonaws.com/dev/prolific?pid=' + pid)     
    const json = await response.json()
    if(!response.ok) {
      return navigate('/survey-error')
    }
    return json['exists']
  }

  const checkHandler = () => {
    setIsChecked(!isChecked)
  }

  const navigateToTutorial = async () => {
    let participantExists = await getParticipantExists()
    if(participantExists) {
      return navigate('survey-complete')
    }
    navigate(`tutorial?pid=${pid}`)
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <p className='my-5'>Consent info</p>
        <div className='form-check my-5'>
          <input type='checkbox' className='form-check-input' id='consent-check' checked={isChecked} onChange={checkHandler} />
          <label className='form-check-label' htmlFor='consent-check'>I agree</label>
        </div>
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-3'>
            <button className='btn btn-danger btn-lg btn-block' onClick={() => navigate('survey-complete')}>Cancel</button>
          </div>
          <div className='col-md-3'>
            <button className='btn btn-primary btn-lg btn-block' onClick={() => navigateToTutorial()} disabled={!isChecked}>Proceed</button>
          </div>       
        </div>
      </div>
    </div>
  );
}

export default Home;
