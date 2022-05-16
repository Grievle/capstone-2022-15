/* eslint-disable */
import React, { useState, useEffect, Component } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer';
import './Mypage.css';
import { Link } from 'react-router-dom';
import Rechart from './Chart';
import axios from 'axios';
export const Authentication = React.createContext(null);


const Feedback = () => {

  // const [user_id, setUser_id] = useState('')
  const [interview_id, setInterview_id] = useState(0)
  const [question_n, setQuestion_n] = useState(0)
  const [errors, setErrors] = useState(false)
  const isTest = false;
    let getFeedbackpage = isTest
    ? `http://localhost:8000/accounts/feedback` // checkedId -> ques
    : `https://api.kmuin4u.com/accounts/feedback`; 

  axios({
    url: getFeedbackpage, 
    method: 'GET',
    headers: {
        'Authorization':'Token ' + window.localStorage.getItem('token')
        
    }
  }).then(response => {
    console.log("Mypage Get Success")
      setInterview_id(response.data.interview_id)
      setQuestion_n(response.data.question_n)
  })
  .catch(error => {
      console.log(error)
      alert('error')
  })


  return (
    <div>
        <Navbar/>
        <Bar2/>
        <MenuBox2/> 
        <div className='mypage_footer_top2'>
            <Footer/>
        </div> 
    </div>
  );
};


class Bar2 extends Component{
    render(){
      return(
        <div className='Bar'>
            My Page - 피드백
        </div>
      );
    }
}
class MenuBox2 extends Component{
    render(){
      return(
        <div className='Menu-box' style={{height: '325vh'}}>
            <div onClick={()=>console.log("마이 페이지(연습목록)로 페이지 변경")}>
                <Link to="/mypage" className='Menu-txt22'>
                연습목록
                </Link>
            </div>

            <div onClick={()=>console.log("질문 1 Feedback")}>
                <Link to="/feedback/" className='Menu-txt3' style={{top:'14vh'}}>
                &nbsp;&nbsp;질문 1
                </Link>
            </div>

            <div onClick={()=>console.log("질문 2 Feedback")}>
                <Link to="/feedback/2" className='Menu-txt3' style={{top:'20vh'}}>
                &nbsp;&nbsp;질문 2
                </Link>
            </div>

            <div onClick={()=>console.log("질문 3 Feedback") }>
                <Link to="/feedback/3" className='Menu-txt3' style={{top:'26vh'}}>
                &nbsp;&nbsp;질문 3
                </Link>
            </div>

        
            <div className='Main-box'>
              <MainFeedback/>
          </div>
        </div>
      );
    }
  }

  class MainFeedback extends Component{
    render(){
      const videoUrl = "https://www.youtube.com/embed/Y8JFxS1HlDo" 
      //const videoUrl = user_id + interview_id + "/interview_video/interview" + interview_id+".mp4"
  
      return(
        <div>
          <div className='Feedback-txt'style={{top:'5.2vh'}}>
                🔹 Video Check
          </div>
          <div className="Interviewer-section">
                <iframe width="700vw" height="394vh" src={videoUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>              
          </div>
  
  
  {/*나의 답변*/}
          <div className='Feedback-txt' style={{top:'17vh'}}>
                🔹 나의 답변
            <div className="Stt">
              여기에 STT 내용 <br/>
              🐟🐠🐡🦐🦑🐙🦞🐬🐳🐋🦀🐧🐚<br/>
              인퓨는 가상 생성된 모습의 면접관이 입모양을 움직이며 음성으로 질문을 전달할 수 있어, 면접관이 존재하지 않고 텍스트와 음성만으로 질문을 확인하여 연습하는 기존 면접 연습 서비스와 다르게 더욱 현장감있는 면접 연습을 제공한다. 인퓨는 가상 생성된 모습의 면접관이 입모양을 움직이며 음성으로 질문을 전달할 수 있어, 면접관이 존재하지 않고 텍스트와 음성만으로 질문을 확인하여 연습하는 기존 면접 연습 서비스와 다르게 더욱 현장감있는 면접 연습을 제공한다. 인퓨는 가상 생성된 모습의 면접관이 입모양을 움직이며 음성으로 질문을 전달할 수 있어, 면접관이 존재하지 않고 텍스트와 음성만으로 질문을 확인하여 연습하는 기존 면접 연습 서비스와 다르게 더욱 현장감있는 면접 연습을 제공한다.  
  
            </div>
          </div>
          
  
  
  {/*목소리 차트*/}
          <div className='Feedback-txt'style={{top:'32vh'}}>
                🔹 목소리 크기
              <div style={{ width: '50vw', height: '40vh',  left:'14vw',position:'absolute'}}>
                <Rechart />
              </div>
          </div>
          
  
  
  {/*머리 움직임 차트*/}
          <div className='Feedback-txt' style={{top:'87vh'}}>
                🔹 머리 움직임
              <div style={{ width: '50vw', height: '40vh',  left:'14vw',position:'absolute'}}>
                <Rechart />
              </div>
          </div>
  
  
  {/*시선처리 차트*/}
          <div className='Feedback-txt' style={{top:'141vh'}}>
                🔹 시선 처리
              <div style={{ width: '50vw', height: '40vh',  left:'14vw',position:'absolute'}}>
                <Rechart />
              </div>
          </div>  
        </div>  
      );
    }
  }
export default Feedback;
