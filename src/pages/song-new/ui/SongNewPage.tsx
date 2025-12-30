import { AddSongForm } from '@features/add-song'
import './SongNewPage.scss'
import { useParams } from 'react-router-dom'

const SongNewPage = () => {
  const { collectionId = '' } = useParams()

  return <AddSongForm collectionId={collectionId} />
}

export default SongNewPage
