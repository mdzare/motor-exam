import { useState } from "react"

export const CheckQuestion = ({ item, deleteQuestion , deletePic }) => {
    const { question, img, items } = item;

    const [answer, setAnswer] = useState();
    const [finish, setFinish] = useState(false);

   
    return (
        <>
            {
                <div className='border-2 m-2 p-2 rounded-md shadow-xl'>
                    <div><b>{question}</b>
                        {img && <img src={img} style={{ maxHeight: '120px' }} />}
                    </div>
                    <hr className="my-1"/>
                    <ul className={items.some(x=>x.img)? 'flex gap-5':''}>{items?.map((item, index) =>
                        <li className={'mt-1 ' + (finish && item.isAnswer ? 'bg-green-200 ' : finish && answer == index ? 'bg-red-200' : '')} key={index}>
                            <label>
                                {index + 1}-
                                <input type='radio' className='me-1'
                                    onChange={() => setAnswer(index)} disabled={finish}
                                    value={index} name={'question_'} />
                                {item.img && <img src={'../Images/' + item.img.split('/').pop()} style={{ maxWidth: '120px' }} />}
                                {item.text}
                            </label>
                        </li>)}
                    </ul>
                    <div className="flex justify-between my-2">

                        <div className="cursor-pointer inline-block m-auto border-2 border-red-500 bg-red-300 rounded-lg px-2 py-1" onClick={()=>deleteQuestion(item.id)}>حذف</div>
                        <div className="cursor-pointer inline-block m-auto border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-300 rounded-lg px-2 py-1" onClick={()=>deletePic(item.id)}>عکس ندارد</div>
                    </div>
                </div>}
        </>
    )
}
