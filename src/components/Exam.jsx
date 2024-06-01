import qList from '../data/list.json'
import { Question } from './Question'


export const Exam = () => {
    return <div>
     <div className=" m-auto md:w-[50%]">
      {qList.map((x,i)=> <Question key={i} item={x} setUserAnswer={()=>{}}  next={()=>{}} />)}
    </div>
    </div>
}