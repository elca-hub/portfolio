'use server'

import HomePresentation from '@/app/_containers/home/presentation'
import Apps from '@/const/apps'

export default async function HomeContainer() {
  const initialApps = Object.values(Apps)
  const defaultActiveApps = [
    Apps.aboutMe,
    Apps.projects,
  ]
  return (
    <>
      <HomePresentation initialApps={initialApps} defaultActiveApps={defaultActiveApps} />
    </>
  )
}
