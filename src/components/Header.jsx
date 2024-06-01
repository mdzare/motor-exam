import { NavLink } from 'react-router-dom'

export const Header = () => {
    const menu = [
        {label:'خانه', href:'/'},
        {label:'آزمون', href:'/Exam'},
    ]


  return (
    <div className='flex gap-2 p-2 bg-blue-200'>
        {menu.map(x=> <NavLink className={'font-bold hover:bg-green-50 rounded-md '} key={x.href} to={x.href}>{x.label}</NavLink>)}
    </div>
  )
}
