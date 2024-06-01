import { useState } from "react"

export const Question = ({ item, setUserAnswer, next }) => {
    const { question, img, items } = item;

    const [answer, setAnswer] = useState();
    const [finish, setFinish] = useState(false);

    const checkAnswer = (e) => {
        if (finish || answer == undefined)
            return;
        setUserAnswer(items[answer].isAnswer)
        setFinish(true);
    }
    return (
        <>
            {
                <div className='border-2 m-2 p-2 rounded-md shadow-xl'>
                    <div><b>{question}</b>
                        {img && <img src={'../Images/' + img?.split('/').pop()} style={{ maxHeight: '120px' }} />}
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

                        <div className="cursor-pointer inline-block m-auto border-2 border-green-500 bg-green-300 rounded-lg px-2 py-1" onClick={checkAnswer}>تایید</div>
                        <div className="cursor-pointer inline-block m-auto border-2 border-blue-500 bg-blue-300 rounded-lg px-2 py-1" onClick={next}>بعدی</div>
                    </div>
                </div>}
        </>
    )
}
