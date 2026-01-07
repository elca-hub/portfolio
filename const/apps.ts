import AboutMePresentation from "@/app/_containers/about-me/presentation"
import { IconType } from "react-icons"
import { FiFolder, FiUser } from "react-icons/fi"

export type AppType = {
  title: string
  content: React.ComponentType<{ isWindow?: boolean }>
  redirectUrl: string
  icon: IconType
}

/*
アプリ一覧(多分別ファイルで管理することなりそう)
*/
const Apps: Record<string, AppType> = {
  aboutMe: {
    title: 'About Me',
    content: AboutMePresentation,
    redirectUrl: '/about-me',
    icon: FiUser,
  },
  projects: {
    title: 'Projects',
    content: AboutMePresentation,
    redirectUrl: '/projects',
    icon: FiFolder,
  }
}

export default Apps

export type AppTypeWithOutContent = {
  title: string
  redirectUrl: string
  icon: IconType
}

export const AppsWithOutContent: AppTypeWithOutContent[] = Object.values(Apps).map(app => ({
  title: app.title,
  redirectUrl: app.redirectUrl,
  icon: app.icon,
}))
