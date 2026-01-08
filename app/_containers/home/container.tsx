'use server'

import HomePresentation from '@/app/_containers/home/presentation'
import { AppType } from '@/const/appType'
import { FiFolder, FiUser } from 'react-icons/fi'
import AboutMeContainer from '../about-me/container'

export default async function HomeContainer() {
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
  const defaultActiveApps = [
    apps.aboutMe,
    apps.projects,
  ]

  return (
    <>
      <HomePresentation apps={apps} defaultActiveApps={defaultActiveApps} />
    </>
  )
}
