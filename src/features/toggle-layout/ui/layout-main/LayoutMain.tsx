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

  const sidebarClass = clsx(
    "layout-main__sidebar",
    size && ('_' + size)
  )

  const contentStyle = {
    marginLeft: sidebarWidth + 20 + 'px'
  }
  
  return (
    <div className="layout-main">

      <div className={sidebarClass} ref={sidebarRef}>
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