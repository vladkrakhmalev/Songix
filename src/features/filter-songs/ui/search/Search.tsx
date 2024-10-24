import { FC } from "react";
import './Search.scss'
import { Input } from "@shared/ui/input";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { setSearch } from "../../model/filterSongsSlice";

export const Search: FC = () => {
  const dispatch = useAppDispatch()  
  const { search } = useAppSelector(state => state.filterSongs)

  const handlerChange = (value: string) => {
    dispatch(setSearch(value))
  }
  
  return (
    <Input type="search" value={search} onChange={handlerChange}>Поиск</Input>
  )
}