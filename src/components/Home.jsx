import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { DeleteData, GetData, PostData } from "../hooks/apiService"

export const Home = () => {
    const [newUser, setNewUser] = useState();
    const [userList, setUserList] = useState([]);
    useEffect(() => { RefreshData(); }, [])


    const RefreshData = () => {
        GetData('users').then(x => {
            setUserList(x);

        })
    }
    const createUser = async (e) => {
        if (newUser.length == 0)
            return;
        if (userList.filter(x => x.name === newUser).length > 0) {
            alert('این کاربر قبلا وجود دارد');
            return;
        }
        await PostData('users', { id: `${Math.max(...userList.map(x => x.id), 0) + 1}`, name: newUser });
        await PostData('exams', { id: `${Math.max(...userList.map(x => x.id), 0) + 1}`, questions: [] })
        setNewUser('');
        RefreshData();
    }

    const DeleteUser = (id) => {
        DeleteData('users', id).then(() => {
            DeleteData('exams', id);
            RefreshData();
        }
        )
    }
    console.log()
    return (
        <div className="mt-[10%] m-auto w-[300px] p-2 rounded-lg shadow-lg border border-gray-400">
            <div className="">

                <input value={newUser} onChange={(e) => setNewUser(e.target.value)} className="border-2 rounded-s-lg p-1" placeholder="ایجاد کاربر جدید" />
                <span className="bg-green-300 px-2 py-2 rounded-e-lg cursor-pointer" onClick={createUser}>+</span>
            </div>
            <b>انتخاب کاربر:</b>
            <div className="flex gap-2 flex-col">

                {userList?.map((x) =>
                    <div className="flex justify-between p-1 rounded-md shadow-md border border-blue-400" key={x.id}>
                        <NavLink className="font-bold" to={'/User/' + x.id} >{x.name}</NavLink>
                        <span className="text-red-400 cursor-pointer" onClick={() => DeleteUser(x.id)}>X</span>
                    </div>)}
            </div>
        </div>
    )
}
