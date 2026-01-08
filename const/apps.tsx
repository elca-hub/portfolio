'use server'
import AboutMeContainer from "@/app/_containers/about-me/container"
import { FiFolder, FiUser } from "react-icons/fi"
import { AppType } from "./appType"

/*
アプリ一覧(多分別ファイルで管理することなりそう)
*/
const apps: Record<string, AppType> = {
  aboutMe: {
    title: 'About Me',
    content: <AboutMeContainer />,
    redirectUrl: '/about-me',
    icon: <FiUser />,
  },
  projects: {
    title: 'Projects',
    content: <AboutMeContainer />,
    redirectUrl: '/projects',
    icon: <FiFolder />,
  }
}

export default async function getApps() {
  return apps
}
