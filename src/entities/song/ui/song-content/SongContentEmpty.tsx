export function SongContentEmtpy() {
  return (
    <div className='song-content'>
      <h1>При получении песни произошла ошибка</h1>
      <p className='song-content__message'>
        Такой песни не существует или она для вас не доступна
      </p>
    </div>
  )
}
