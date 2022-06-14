import './homeStyle.css'
import Post from "../../component/TopPost/Post";
import Navbar from "../../component/Navbar/Nabar"
import CourseAvaiable from "../../component/CourseAvaiable/CourseAvaiable";


import axios from "axios";
import {TEACHER, USER} from '../../config'

import { Fragment } from "react";
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import CalendarPicker from '@mui/lab/CalendarPicker';

import LocalizationProvider from '@mui/lab/LocalizationProvider';

function Home() {
    const [listTopCourse, setListTopCourse] = useState([])
    const [listNewPost, setListNewPost] = useState([])
    const [date, setDate] = useState(new Date());
    const [unseenNoti, setUnseenNoti] = useState(0)
    const userRoles = useSelector(state => state.infor.roles || [])
    const [courseRegistered, setCourseRegistered]=useState([])

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        axios.get('/api/credit-class/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setListTopCourse(response.data)
        }).catch(error => console.log(error))
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        axios.get('/api/user/top-five-post-currently', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setListNewPost(response.data)
        }).catch(error => console.log(error))
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        axios.get('/api/notification/unseen-notification', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            setUnseenNoti(res.data)
        })
    }, [])

    useEffect(() => {
        // setLoading(true)
        let url='/api/user/registration';
        if(userRoles.some(role => role === TEACHER)){
          url='/api/teacher/timetable-semester'
        }
    
        const token=localStorage.getItem('accessToken')
        axios.get(url,{
            headers: {
                'Authorization':`Bearer ${token}`
            }
        }).then((response) => {
            setCourseRegistered(response.data)
        }).catch(error => console.log(error))
      },[]) 

    return (
        <Fragment>
            <Navbar />
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container columnSpacing={4}>
                        <Grid container item={true} md={9} xs={12} direction='column' rowSpacing={2}>
                            <Grid item={true} >
                                <div className="course-component">
                                    <Typography gutterBottom variant="h6" component="div" color="#2980B9">
                                        KHÓA HỌC HIỆN CÓ
                                    </Typography>
                                    {/* <CourseAvaiable courses={listTopCourse} fullWidth={false} /> */}
                                    <CourseAvaiable courses={listTopCourse} courseJoined={courseRegistered} fullWidth={false} />
                                </div>
                            </Grid>
                            <Grid item={true}>
                                <Typography gutterBottom variant="h6" component="div" color="#2980B9">
                                    BÀI ĐĂNG MỚI NHẤT
                                </Typography>
                                <div className="top-post">
                                    <Post listPost={listNewPost} />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container item={true} md={3} xs={12} direction='column' rowSpacing={2}>
                            <Grid item={true}>
                                <div className="course-component time-picker">
                                    <p className="time-picker__text">LỊCH</p>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
                                    </LocalizationProvider>
                                </div>
                            </Grid>
                            <Grid item={true} >
                                <div className="course-component">
                                    <p style={{ fontWeight: '600', padding: '5px' }}>Thông báo</p>
                                    <div className="notifi-text">{unseenNoti} Mail(s)</div>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Fragment>
    )
}
export default Home