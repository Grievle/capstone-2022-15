/* eslint-disable */
import { useParams, Navigate } from 'react-router-dom';
// import { withRouter } from "react-router";
import React, { useState, PureComponent, Component, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer';
import './Mypage.css';
import { Link } from 'react-router-dom';
import img_interviewer from '../images/img_interviewer.png';
import SyncLoader from "react-spinners/SyncLoader";
import axios from 'axios';
export const Authentication = React.createContext(null);

import {LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, ZAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,} from 'recharts';



class Feedback extends Component {
    constructor(props){
        super(props)
        this.state = {
            data : [],
            interview_id: 0,
            //question_n : 0
        }
    }

    componentDidMount(){
        this._getListData()
    }

    _getListData = async function(){
      const interview_id = Number(this.props.params.interview_id);
      const question_n = Number(this.props.params.question_n);
      //const question_n = 0
      this.setState({question_n:question_n})
      console.log("interview id:", this.props.params.interview_id)
      console.log("question_n:", this.props.params.question_n)
      //const interview_id = 1;

      const isTest = false;
      //const question_n = 0;
        let getFeedbackpage = isTest
        ? `http://localhost:8000/accounts/feedback/${interview_id}/${question_n}`
        : `https://api.kmuin4u.com/accounts/feedback/${interview_id}/${question_n}`;
        try {  
      const data_list = await axios(getFeedbackpage,{
        method : 'GET',
        headers : {
            'Authorization':'Token ' + window.localStorage.getItem('token')
        }
      })
      this.setState({data: data_list})
      this.setState({interview_id: this.props.params.interview_id})
      //this.setState({question_n: this.props.params.question_n})
      console.log("data:", data_list)
      this.setState({status:1})
    }
      catch(ex) {
        this.setState({status:-1})
      }
    }
    render(){
        const list = this.state.data.data
        let interview_id = this.state.interview_id
        let question_n = this.state.question_n
        let status = this.state.status
        console.log("Mypage")

        if (status==-1){
          console.log("wait")
          alert('피드백 결과가 나오는 중입니다. 잠시만 기다려주세요.')
          return <Navigate to='/mypage'/>
        }
        if (status == 1){
            console.log("Mypage get sucess")
            console.log("list iris:", list.iris[0])
            console.log("list iris:", list.iris[0].x_max)
            return (

                <div>
                    <Navbar/>
                    <Bar2/>

          <div className='Menu-box' style={{height: '2300px'}}>
              <div className='mypage_footer_top2'>
                <Footer/>
              </div>
              <div onClick={()=>console.log("마이 페이지(연습목록)로 페이지 변경")}>
                  <Link to="/mypage" className='Menu-txt22'>
                  연습목록
                  </Link>
              </div>
              <a onClick={()=>console.log("질문 1 Feedback")} href={"/feedback/"+interview_id+'/0'} className='Menu-txt3' style={{top:'14vh'}}>

                  &nbsp;&nbsp;질문 1
              </a>
              <a onClick={()=>console.log("질문 2 Feedback")} href={"/feedback/"+interview_id+'/1'} className='Menu-txt3' style={{top:'20vh'}}>

                  &nbsp;&nbsp;질문 2
              </a>
              <a onClick={()=>console.log("질문 3 Feedback") } href={"/feedback/"+interview_id+'/2'} className='Menu-txt3' style={{top:'26vh'}}>

                  &nbsp;&nbsp;질문 3

              </a>
              <div className='Main-box'>
                <div>
              <div className='Feedback-Q'> {'Q'+(question_n+1)} </div>
              <div className='Feedback-txt'style={{top:'50px'}}>
                    🔹 Video Check
              </div>
              <div className="Interviewer-section">
                    {/*<iframe width="700vw" height="394vh" src={list.interviewee_url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>*/}
                  {list.interviewee_url!=='' && <video width="80%" height="80%" autoPlay={true} controls>
                            <source src={list.interviewee_url}/>
                      </video>}
                        {list.interviewee_url==='' && <SyncLoader color={'blue'} loading={true} css={override} size={30} />}
              </div>


      {/*나의 답변*/}
              <div className='Feedback-txt' style={{top:'117px'}}>
                    🔹 나의 답변
                <div className="Stt">
                  {list.stt_interview.slice(9, -2)}<br/>
                </div>
              </div>


      {/*시선 처리 차트*/}
              <div className='Feedback-txt'style={{top:'194px'}}>
                    🔹 시선 처리
                  <div className='ChartBackground'>
                    <img src={img_interviewer}/>
                  </div>

                  <div style={{ width: '594px', height: '313px',  left:'190px',position:'absolute'}}>
                    <Scatter_chart_iris scatter_data= {list.iris_movement} iris_data={list.iris[0]} />
                  </div>

              </div>



      {/*머리 움직임 차트*/}
              <div className='Feedback-txt' style={{top:'605px'}}>
                    🔹 머리 움직임
                  <div style={{ overflowX:'scroll',width: '650px', height: '350px',  left:'160px',position:'absolute'}}>
                  <div style={{ width: '800px', height: '300px'}}>
                    <Line_chart_face line_data= {list.face_movement} />
                  </div>
                  </div>
              </div>


      {/*목소리 크기 차트 react horizontal scrolling?*/}
              <div className='Feedback-txt' style={{top:'1058px'}}>
                    🔹 목소리 크기
                  <div style={{ overflowX:'scroll',width: '650px', height: '350px',  left:'160px',position:'absolute'}}>
                  <div style={{ width: '800px', height: '300px'}}>
                  {/*<div style={{ width: '594px', height: '300px',  left:'150px',position:'absolute'}}>*/}
                    <Line_chart_volume line_data= {list.volume_interview}  />
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
        );
      }
      else {
        return(<div></div>)
      }
 }
}





{/*********************  Scatter Chart - 시선처리 차트 ********************/}
const Scatter_chart_iris = ({
  scatter_data, iris_data}) => {
  //console.log("iris data:", x_min, x_max)
  return (
    <ResponsiveContainer width="100%" height="100%">
    <ScatterChart
      width={'500px'}
      height={'900px'}
      margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
      }}
    >
      <CartesianGrid />
      <XAxis type="number" dataKey="x" unit="" domain={[iris_data.x_min, iris_data.x_max]} tick={false}/>
      <YAxis type="number" dataKey="y" unit="" domain={[iris_data.y_min, iris_data.y_max]} tick={false}/>
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Scatter name="A school" data={scatter_data} fill="#5B7EFB" />
    </ScatterChart>
  </ResponsiveContainer>
  );
}


{/*********************  Line Chart - 머리 움직임 차트 ********************/}
const Line_chart_face = ({
  line_data
  }) => {console.log("head line", line_data)
  return (
      <ResponsiveContainer width="100%" height="100%">
         <LineChart
            width={'500px'}
            height={'300px'}
            data={line_data}
            margin={{
                      top: 30,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" unit="초"/><YAxis domain={[0, 0.03]}/> <Tooltip /> <Legend />
            <Line
              type="monotone"
              dataKey="y"
              name="머리움직임 빈도"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            {/*<Line type="monotone" dataKey="y" stroke="#82ca9d"/>*/}
          </LineChart>
        </ResponsiveContainer>

  );
}
{/*********************  Line Chart - 목소리 크기 차트 ********************/}
const Line_chart_volume = ({
  line_data
  }) => {console.log("line", line_data)
  return (
      <ResponsiveContainer width="100%" height="100%">
         <LineChart
            width={'500px'}
            height={'300px'}
            data={line_data}
            margin={{
                      top: 30,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" unit="초"/><YAxis unit="dB"/> <Tooltip /> <Legend />
            <Line
              type="monotone"
              dataKey="y"
              name="목소리 크기"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            {/*<Line type="monotone" dataKey="y" stroke="#82ca9d"/>*/}
          </LineChart>
        </ResponsiveContainer>

  );
}


class Bar2 extends Component{
  render(){
//function Bar2(props){

    return(
      <div className='Bar'>
          My Page - 피드백
      </div>
    );
  }
}


const override = {
  margin: 'auto',
  borderColor: 'red',
  justifyContent: 'center',
  display: 'flex',
  alignItems: 'center',
  height: '98vh',
  width: '100%'
}

export default (props) => (
  <Feedback
      {...props}
      params={useParams()}
  />
);