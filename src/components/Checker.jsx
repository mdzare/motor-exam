import { useEffect, useState } from 'react';
import qList from '../data/list.json'
import { GetData } from '../hooks/apiService';
import { useParams } from 'react-router-dom';

export const Checker = () => {
    const { id } = useParams();
    const [userExam, setUserExam] = useState({}); //سوالات دیده شده 

    useEffect(() => {
        GetData('exams/' + id).then(x => {
            // if (!x.id)
            //     x = { id, questions: [] };
            setUserExam(() => x);

        })
    }, [])
    return (
         <div>{userExam.questions?.filter(x=> qList.filter(q=> q.id == x.id).length == 0).map(z=> z.id).join(',')}</div>
    )
}
