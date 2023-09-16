import { useEffect} from 'react';
import './Home.css'
import { useState} from 'react';
import Cart from '../Cart/Cart';
import {  AiOutlineCalendar, AiOutlineStrikethrough} from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
const [courses, setCourses] = useState([]);
const [selectedCourse,  setSelectedCourse] = useState([]);
const [remaining, setRemaining] = useState(0);
const [cost, setCost] = useState(0)

    useEffect(()=> {
        fetch('./course.json')
        .then(res => res.json())
        .then(data => setCourses(data))
    },[])

    const handleClick= (course) => {
        const isExist = selectedCourse.find((item)=> item.course_title == course.course_title);

        let count = course.credit;
        
        if(isExist){
            return toast('already booked')
        }
        else{
            selectedCourse.forEach((item) => {
                count =count + item.credit;      
            });
            const totalRemaining = 20 - count;
            if(count >20){
           return toast('Total Credit Hour 20');
        }
           else{
            setCost(count);
            setRemaining(totalRemaining)
            setSelectedCourse([...selectedCourse, course]);
           }       
           
        }

    }
// console.log(selectedCourse);

    return (
        
      <div className='container'>
        <div className="home-container">
        <div className="card-container">
            {
                courses.map(( course , idx) => (
                    <div key={idx} className="card">
                <div className="card-img">
                <img className='photo' src={course.img} alt="" />
                </div>
                <h3 className='course-title'>{course.course_title}</h3>
                <p className='details'><small>
                {course.details}</small></p>
                <div className="info">
                    <p className='price'><AiOutlineStrikethrough/> Price: {course.price}</p>
                    <p className='credit'><AiOutlineCalendar/> Credit: {course.credit}</p>
                </div>
                <ToastContainer/>
                <button onClick={()=>handleClick(course)} className='card-btn'>Select</button>
             </div>
                ))
            }
        </div>
             <div className="cart">
                <Cart selectedCourse={selectedCourse} remaining={remaining} cost={cost}></Cart>
            </div>
        </div>
       
      </div>
    )
};

export default Home;