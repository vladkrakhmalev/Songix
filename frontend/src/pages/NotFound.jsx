import { Link } from "react-router-dom";

export default function NotFound() {

  return (
    <div className='panel__container'>
      <h1>Упс, ошибка 404</h1>
      <p className='panel__title'>Похоже, что вы перешли на несуществующую страницу</p>
      <Link className='panel__btn' to='/songs'>На главную</Link>
    </div>
  )
}