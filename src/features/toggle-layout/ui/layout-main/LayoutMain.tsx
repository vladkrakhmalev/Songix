import { FC, ReactNode, useEffect, useRef, useState } from "react"
import './LayoutMain.scss'
import clsx from "clsx"
import { Outlet, useOutlet } from "react-router-dom"
import { useAppSelector } from "@shared/hooks"
import { LayoutMainTrigger } from "../layout-main-trigger"
import { isMobail } from "@shared/utils/is-mobail"

interface ILayoutMain {
  sidebar: ReactNode
  size?: 'big' 
}

export const LayoutMain: FC<ILayoutMain> = ({sidebar, size}) => {

  const { isHidden } = useAppSelector(state => state.toggleLayout)
  const [sidebarWidth, setSidebarWidth] = useState(size ? 400 : 250)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const outlet = useOutlet()

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
    marginLeft: isMobail() ? 0 : sidebarWidth + 20 + 'px'
  }

  const layoutMainTrigger = isMobail() && <div><LayoutMainTrigger/></div>
  
  return (
    <div className={clsx("layout-main", size && '_' + size)}>

      <div className={clsx("layout-main__sidebar", isHidden && '_hidden')} ref={sidebarRef}>
        {sidebar}
      </div>

      <div className="layout-main__content" style={contentStyle}>
        {isHidden && <LayoutMainTrigger className="layout-main__button"/>}

        <div className="layout-main__content-wrapper">
          {outlet ? <Outlet/> : layoutMainTrigger}
        </div>
      </div>

    </div>
  )
}