import {
    Routes,
    Route,
    Outlet, Navigate,
    useLocation
} from "react-router-dom";

import { MODERATOR } from './config'
import Home from './pages/Home/Home'
import Infor from './pages/Infor/Infor'
import Login from './pages/Login/Login'
import VerifyForgotPassword from './pages/ForgotPassword/VerifyForgotPassword'
import VerifyCode from './pages/ForgotPassword/VerifyCode'
import RecoverPassword from './pages/ForgotPassword/RecoverPassword'
import RegisterSignUp from './pages/RegisterAccount/RegisterSignUp'
import RegisterVerifyCode from './pages/RegisterAccount/RegisterVerifyCode'
import RegisterUser from './pages/RegisterAccount/RegisterUser'
import CreditClassInfor from './pages/Admin/CreditClassInfor'
import CreditClassMember from './pages/Admin/CreditClassMember'
import CreditClassMemberDetail from './pages/Admin/CreditClassMemberDetail'
import CreditClassPost from './pages/Admin/CreditClassPost'
import CreditClassPostDetail from './pages/Admin/CreditClassPostDetail'
import CreditClassFile from './pages/Admin/CreditClassFile'
import CreditClassFileDetail from './pages/Admin/CreditClassFileDetail'
import Account from './pages/Admin/Account'
import Course from './pages/Coures/Coures'
import { CustomerApp, AdminApp } from './App'
import Member from './pages/Members/Member.js'
import Schedule from './pages/Schedule/Schedule'
import FolderShare from './pages/Folders/FolderShare'
import CourseDetail from './pages/Coures/CourseDetail'
import Notification from './pages/Notification/Notification'
import ExerciseDetail from './pages/Exercise/ExerciseDetail'
import ExerciseAssigned from './pages/Exercise/ExerciseAssigned'

import { useSelector } from 'react-redux'

function CheckLogin() {
    const location = useLocation();
    const { pathname } = location;
    let pathSplit = pathname.split('/');
    let titleName = pathSplit[1].charAt(0).toUpperCase() + pathSplit[1].slice(1)
    document.title = (titleName === '') ? "Elearning" : titleName;
    const isLogin = useSelector(state => state.isLogin.value)
    return (
        isLogin ? <Outlet /> : <Navigate to="/login" />
    );
}
function CheckAdmin() {
    const isLogin = useSelector(state => state.isLogin.value)
    const userRole = useSelector(state => state.infor.roles)
    const isAdmin = userRole.some((role) => (role === MODERATOR))
    return (
        isAdmin ? <Outlet /> : (isLogin ? <Outlet /> : <Navigate to='/login' />)
    );
}

function Router() {
    return (
        <Routes>
            <Route element={<CheckLogin />} >
                <Route path="/" element={<CustomerApp />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/course" element={<Course />} />
                    <Route path="/courseDetail/credit_class_id=:id" element={<CourseDetail />} />
                    <Route path="/member/credit_class_id=:id" element={<Member />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/infor" element={<Infor />} />
                    <Route path="/exerciseAssigned/credit_class_id=:id/subject_name=:subjectName" element={<ExerciseAssigned />} />
                    <Route path="/notification" element={<Notification />} />
                    <Route path="/exerciseDetail/exercise_id=:id" element={<ExerciseDetail />} />
                    <Route path="/folderShare/credit_class_id=:id/subject_name=:subjectName" element={<FolderShare />} />
                </Route>
                <Route path="/admin" element={<CheckAdmin />}>
                    <Route path="/admin/" element={<AdminApp />} >
                        <Route path="/admin/" element={<CreditClassInfor />} />
                        <Route path="/admin/credit-class-infor" element={<CreditClassInfor />} />
                        <Route path="/admin/credit-class-member" element={<CreditClassMember />} />
                        <Route path="/admin/credit-class-memberdetail/:id" element={<CreditClassMemberDetail />} />
                        <Route path="/admin/credit-class-post" element={<CreditClassPost />} />
                        <Route path="/admin/credit-class-postdetail/:id/:name" element={<CreditClassPostDetail />} />
                        <Route path="/admin/credit-class-file" element={<CreditClassFile />} />
                        <Route path="/admin/credit-class-filedetail/:id/:name" element={<CreditClassFileDetail />} />
                        <Route path="/admin/account" element={<Account />} />
                    </Route>
                </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/verify-forgot-password" element={<VerifyForgotPassword />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            <Route path="/recover-password" element={<RecoverPassword />} />
            <Route path="/register-signup" element={<RegisterSignUp />} />
            <Route path="/register-verify-code" element={<RegisterVerifyCode />} />
            <Route path="/register-user" element={<RegisterUser />} />
            {/* <Route path="/courseDetail" element={<CourseDetail />} />
            <Route path="/home" element={<Home />} />
            <Route path="/course" element={<Course />} />
            <Route path="/exerciseDetail" element={<ExerciseDetail />} />
            <Route path="/exerciseAssigned" element={<ExerciseAssigned />} />
            <Route path="/folderShare" element={<FolderShare />} /> */}
        </Routes>
    )
}
export default Router;

