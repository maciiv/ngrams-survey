import '../App.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
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
        <h4 className="mt-5">Research team</h4>
        <ul className="list-unstyled">
          <li><b>Principal Researcher: </b>Dr Andrew Gibson, Lecturer in Information Science, Faculty of Science, QUT</li>
          <li><b>Associate Researcher: </b>Associate Professor Jill Willis (QUT)</li>
          <li><b>Associate Researcher: </b>Dr Lance DeVine (QUT)</li>
          <li><b>Associate Researcher: </b>Mr Miguel Canizares</li>
        </ul>
        <h4 className="mt-4">Description</h4>
        <p>The purpose of this project is to validate a dataset of reflexive n-grams (short groups of words drawn from reflective writing) 
          through human assessment of how well the n-grams match a computer assigned category. A computer algorithm has assigned each 
          n-gram a category label (e.g. the n-gram "I wonder if" may have the label "epistemic"), and this crowd-sourced questionnaire 
          will provide empirical evidence of the extent to which humans agree with the computer assigned categories.</p>
        <p>You are invited to participate in this project because you have been selected through the Prolific crowd-sourcing platform as 
          being willing to answer questions for research, and because your primary language is English.</p>
        <h4 className="mt-4">Participation</h4>
        <p>Participation will involve answering questions about whether you think groups of words match or don't match a written description. 
          Questions are grouped into a prolific task that is expected to take approximately 20 minutes of your time for which you will be 
          paid according to the rate advertised on Prolific. Questions will be in the following format:</p>
        <p>Question example???</p>
        <p>Your participation in this project is entirely voluntary. If you agree to participate you do not have to complete any question(s) 
          you are uncomfortable answering. Your decision to participate or not participate will in no way impact upon your current or future 
          relationship with QUT. If you do agree to participate you can withdraw at any time without comment, however incomplete tasks will 
          not be remunerated as per stand Prolific arrangements. No identifying information will be collected from you. Your prolific ID will 
          be used to verify completion of the task and ensure payment, however this ID will not be stored as part of the research data 
          resulting from your participation.</p>
        <h4 className="mt-4">Expected benefits</h4>
        <p>It is expected that this project will not directly benefit you. However, it may benefit others by enabling better application of 
          computer algorithms in assisting people to reflect. To compensate you for your contribution should you choose to participate 
          the research team will ensure that payment arrangements are honoured according to the details in Prolific.</p>
        <h4 className="mt-4">Risks</h4>
        <p>There are no risks beyond normal day-to-day living associated with your participation in this project.</p>
        <h4>Privacy and confidentiality</h4>
        <p>All responses are anonymous and will be treated confidentially unless required by law. The names of individual persons are not 
          required in any of the responses. Any data collected as part of this project will be stored securely as per QUT's Management of 
          research data policy. Please note that non-identifiable data collected in this project may be used as comparative data in future 
          projects or stored on an open access database for secondary analysis.</p>
        <h4 className="mt-4">Consent to participate</h4>
        <p>Continuing with this task and submitting responses is accepted as an indication of your consent to participate in this project.</p>
        <h4 className="mt-4">Questions / Further information about the project</h4>
        <p>If have any questions or require further information please contact one of the research team members below.</p>
        <ul className="list-unstyled">
          <li><b>Name: </b>Dr Andrew Gibson, Lecturer in Information Science, QUT</li>
          <li><b>Email: </b>andrew.gibson@qut.edu.au</li>
        </ul>
        <h4 className="mt-4">Concerns / Complaints regarding the conduct of the project</h4>
        <p>QUT is committed to research integrity and the ethical conduct of research projects. However, if you do have any concerns or 
          complaints about the ethical conduct of the project you may contact the QUT Research Ethics Unit on +61 7 3138 5123 or 
          email ethicscontact@qut.edu.au. The QUT Research Ethics Unit is not connected with the research project and can facilitate 
          a resolution to your concern in an impartial manner.</p>
        <div className="d-flex">
          <p className="mx-auto"><i><b>Thank you for helping with this research project. Please print this page for your information.</b></i></p>
        </div>
        <div className='row mt-4 mb-5'>
          <div className='col-md-6'>
            <button className='btn btn-danger btn-lg btn-block w-50 my-2 mx-auto' onClick={() => navigate('survey-complete')}>Cancel</button>
          </div>
          <div className='col-md-6'>
            <button className='btn btn-primary btn-lg btn-block w-50 my-2 mx-auto' onClick={() => navigateToTutorial()}>Proceed</button>
          </div>       
        </div>
      </div>
    </div>
  );
}

export default Home;
