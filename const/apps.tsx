import AboutMePresentation from "@/app/_containers/about-me/presentation"
import { FiFolder, FiUser } from "react-icons/fi"

export type AppIconType = React.ReactElement<{ className?: string }>

export type AppType = {
  title: string
  content: React.ComponentType<{ isWindow?: boolean }>
  redirectUrl: string
  icon: AppIconType
}

/*
アプリ一覧(多分別ファイルで管理することなりそう)
*/
const Apps: Record<string, AppType> = {
  aboutMe: {
    title: 'About Me',
    content: AboutMePresentation,
    redirectUrl: '/about-me',
    icon: <FiUser />,
  },
  projects: {
    title: 'Projects',
    content: AboutMePresentation,
    redirectUrl: '/projects',
    icon: <FiFolder />,
  }
}

export default Apps
