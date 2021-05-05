import React, { useState , useEffect} from 'react';
import StudentList from './StudentList';

function Students() {
    const URL = 'https://api.hatchways.io/assessment/students';
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [tag, setTag] = useState('');

    useEffect(() => {
        fetch(URL)
            .then(res => res.json())
            .then(res => {
                setStudents(res.students);
                setFilteredStudents(res.students);  
            })
            .catch(error => console.error(error))
    }, []);
    
    useEffect(() => {
        if(filteredStudents.length !== 0){
            setIsLoading(false);
        }
    }, [filteredStudents]);

    useEffect(() => {
        filterData(search, tag);
    },[tag, search]);
    
    const filterData = (searchStr, tagStr) => {
        setIsLoading(true);
        let filteredData;
        
        filteredData = students.filter(student => {
            return student.firstName.toLowerCase().includes(searchStr.toLocaleLowerCase()) || 
                student.lastName.toLowerCase().includes(searchStr.toLocaleLowerCase())
        });

        setFilteredStudents(filteredData);
        if(tag === '') return;

        filteredData = filteredData.filter(student => {
            if(student.tags === undefined) return false;

            const status = student.tags.find(tag => tag.toLowerCase().includes(tagStr.toLowerCase()));
            if(status !== undefined) return true;

            return false;

        });

        setFilteredStudents(filteredData);
    }

    
    const addTag = (tag, index) =>{
        const check = students.map(student => {
            if(student.id === index){
                if(student.tags === undefined){
                    student.tags = [tag];
                } else{
                    student.tags.push(tag);
                }
            }
        });
    }


    return (
        <div>
            <div>
                <input type='text' value={search} onChange={(event) => setSearch(event.target.value)} placeholder='Search by name' style={{width: '100%', height: '40px', fontSize: '20px'}}/>
                <input type='text' value={tag} onChange={(event) => setTag(event.target.value)} placeholder='Search by tag' style={{width: '100%', height: '40px', fontSize: '20px'}}/>
            </div>
            {isLoading ? null : filteredStudents.map((student, index)=>{
                return <StudentList student={student} id={student.id} addTag={addTag}/>
            })}
        </div>
    );
}

export default Students;
