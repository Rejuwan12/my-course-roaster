/* eslint-disable react/prop-types */
import './Cart.css'
const Cart = ({selectedCourse, remaining, cost}) => {
      
    return (
        <div className="body">
             <h5>Remainig Hour: {remaining} hr</h5>
             <hr />
           <h3>Course Name</h3>
           
           {
            selectedCourse.map((course, idx) => (
                    <li key={idx}>{course.course_title}</li>
                   
            ))}
          <hr />
           <h5>Credit: {cost} hr</h5>
           <hr />
          
            
        </div>
    );
};

export default Cart;