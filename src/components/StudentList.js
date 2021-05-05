import React, { useEffect, useState } from 'react';
import '../styles/StudentList.css';
import Plus from '../assets/plus.png';
import Minus from '../assets/remove.png';


function StudentList(props) {
    
    const [display, setDisplay] = useState("collapse-view");
    const [isExpanded, setIsExpanded] = useState(false);
    let [image, setImage] = useState(Plus);
    const [tagValue, setTagValue] = useState("");   
    const calculateAvg = (grades) => {
        let sum = 0;
        for(let i=0; i<grades.length; i++){
            sum += Number(grades[i]);
        }
        
        return (sum / grades.length).toFixed(2);
    }

    const toggle = () =>{
        if(isExpanded){
            setImage(Plus)
            setDisplay("collapse-view")
            setIsExpanded(false)
        }
        else{
            setImage(Minus)
            setDisplay("expand-view")
            setIsExpanded(true)
        }
        
    }    

    return(
        <div className='container'>
            <div className="list">
                       <div className='image-container'>
                            <img src={props.student.pic} width='80px' height='80px' alt='Not available'/>
                       </div>
                       <div className='details-container'>
                           <div style={{display: 'flex', flexDirection: 'row'}}>
                            <div style={{flexGrow: 1}}><p style={{fontWeight: 'bold', fontSize: '30px', justifySelf: 'flex-start'}}>{props.student.firstName} {props.student.lastName}</p></div>
                            <div style={{flexGrow: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}><p><img src={image} width='20px' height='20px' onClick={toggle}/></p></div>
                           </div>
                           <div style={{paddingLeft: '10px', color: 'gray'}}>
                                Email: {props.student.email}<br />
                                Company: {props.student.company}<br />
                                Skill: {props.student.skill}<br />
                                Average: {calculateAvg(props.student.grades)}%
                           </div>
                           <div className={display} style={{paddingLeft: '10px', color: 'gray', width:'300px'}}>
                               {props.student.grades.map((grade, index) => {
                                   return <span>Test {index+1}: {grade}%</span>
                               })}
                           </div>
                           <div className="tagDiv">
                            <div>
                                {
                                    props.student.tags === undefined ? null : props.student.tags.map(tag => {  
                                            return <span className="tagText">{tag}</span>   
                                    })
                                }
                                </div>
                            </div>
                          
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    props.addTag(tagValue, props.id);
                                    setTagValue('');
                                }}>

                                <input className = "tag" value= {tagValue} placeholder="Add a tag" type="text" onChange={e => {setTagValue(e.target.value)}}/>
                                <button type="submit" hidden/>
                            </form>

                       </div>
                   </div>
        </div>
    );
}

export default StudentList
