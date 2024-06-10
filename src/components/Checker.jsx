import { useEffect, useState } from 'react';
import qList from '../data/questions.json'
import { CheckQuestion } from './CheckQuestion';
import { json } from 'react-router-dom';

export const Checker = () => {
    const [list, setList] = useState([])
    useEffect(() => {
        setList(qList);
    }, [])
    const deleteQuestion = (id) => {
        setList(list.filter(x => x.id != id));
    }
    const deletePic = (id) => {
        setList(list.map(x => x.id != id ? x : {id:x.id , question:x.question , items:x.items}));

    }
    return (
        <div>
            <div className=" m-auto md:w-[50%]">
                {list.map((x, i) => <CheckQuestion key={i} item={x} deleteQuestion={deleteQuestion} deletePic={deletePic} />)}
            </div>
            <div>{JSON.stringify(list)}</div>
        </div>)
}
