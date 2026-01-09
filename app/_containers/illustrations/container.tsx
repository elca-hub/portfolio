'use client'

import IllustrationsPresentation from '@/app/_containers/illustrations/presentation'

export default function IllustrationsContainer({ isWindow = false }: { isWindow?: boolean }) {

  return (
    <IllustrationsPresentation isWindow={isWindow} />
  )
}
