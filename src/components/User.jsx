import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import qList from '../data/list.json'
import { GetData, PutData } from "../hooks/apiService";
import { Question } from "./Question";
export const User = () => {
  const { id } = useParams();
  const [userExam, setUserExam] = useState({}); //سوالات دیده شده 
  const [current, setCurrent] = useState({}) //سوال فعلی 
  const [seen , setSeen] = useState([]) //سوالات رد شده
  useEffect(() => {
    GetData('exams/' + id).then(x => {
      if (!x.id)
        x = { id, questions: [] };
      setUserExam(() => x);

    })
  }
    , [])

  useEffect(() => {
    getQuestion();
  }, [userExam?.id])

  const getQuestion = () => {
    if(!userExam?.id)
      return
    var due = userExam?.questions?.filter(x => x.dueDate < new Date() && !seen.includes(x.id) ).sort((a, b) => a.dueDate - b.dueDate);
    if (due && due.length > 0) {
      var dueQ =qList.filter(x => x.id == due[0].id)[0];
      //setCurrent(()=>({ ...dueQ, items: dueQ.items.map(x => ({ ...x, sort: Math.random() })).sort((a, b) => a.sort - b.sort) }));
      setCurrent(dueQ);
      setSeen(x=> [...x,dueQ.id])
    }
    else {
      const q = qList.filter(x => !userExam?.questions?.some(s => s.id == x.id));
      const rndQ = q[Math.floor(Math.random() * q.length)]; //سوال رندوم
     // setCurrent(()=>({ ...rndQ, items: rndQ.items.map(x => ({ ...x, sort: Math.random() })).sort((a, b) => a.sort - b.sort) })) //گزینه رندوم
      setCurrent(rndQ) 
      setSeen(x=> [...x,rndQ.id])
    }

  }

  const setUserAnswer = (result) => {
    var q = userExam.questions.filter(x => x.id == current.id);
    var newItem = {};
    if (q.length > 0) {
      newItem = q[0];
      newItem.stat = Math.max(0, newItem.stat + (result ? 1 : -1));
      newItem.dueDate = newItem.stat > 0 ? new Date().getTime() + 3600000 * 24 * Math.pow(2, newItem.stat - 1) : new Date().getTime() + 3600000;
    } else {
      newItem = {
        id: current.id,
        stat: (result ? 1 : 0),
        dueDate: result ? new Date().getTime() + 3600000 * 24  : new Date().getTime() + 3600000
      }
    }

    var newExam = {...userExam , questions:[...userExam.questions.filter(x=> x.id != newItem.id), newItem] }
    PutData('exams', userExam.id, newExam).then(x=>{
      setUserExam(x);
    });


  }


  return (
    <div className=" m-auto md:w-[50%]">
      {current.id && <Question key={current.id} item={current} setUserAnswer={setUserAnswer}  next={getQuestion} />}
      {!current.id && <div>سوالی باقی نمانده است!</div>}
    </div>
  )
}




