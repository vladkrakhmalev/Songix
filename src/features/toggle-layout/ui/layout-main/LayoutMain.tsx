import { FC, ReactNode, useEffect, useRef, useState } from "react"
import './LayoutMain.scss'
import clsx from "clsx"
import { Outlet } from "react-router-dom"
import { useAppSelector } from "@shared/hooks"
import { LayoutMainTrigger } from "../layout-main-trigger"

interface ILayoutMain {
  sidebar: ReactNode
  size?: 'big' 
}

export const LayoutMain: FC<ILayoutMain> = ({sidebar, size}) => {

  const { isHidden } = useAppSelector(state => state.toggleLayout)
  const [sidebarWidth, setSidebarWidth] = useState(size ? 400 : 250)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sidebarRef.current) {
      if (isHidden) {
        setSidebarWidth(0)
      } else {
        setSidebarWidth(sidebarRef.current.scrollWidth)
      }
    }
  }, [sidebarRef.current, isHidden, size]);

  const contentStyle = {
    marginLeft: sidebarWidth + 20 + 'px'
  }
  
  return (
    <div className={clsx("layout-main", size && '_' + size)}>

      <div className="layout-main__sidebar" ref={sidebarRef}>
        {sidebar}
      </div>

      <div className="layout-main__content" style={contentStyle}>
        {isHidden && <LayoutMainTrigger className="layout-main__button"/>}

        <div className="layout-main__content-wrapper">
          <Outlet/>
        </div>
      </div>

    </div>
  )
}