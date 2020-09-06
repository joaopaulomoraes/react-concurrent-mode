import React, { useEffect, FunctionComponent, ReactElement, useContext, createContext } from 'react'
import croct, { Plug } from '@croct/plug'

type CroctProps = {
  appId: string;
  debug?: boolean;
}

const CroctContext = createContext<Plug | null>(null)

const CroctProvider: FunctionComponent<CroctProps> = ({ children, appId, debug = false }): ReactElement => {
  croct.plug({ appId, debug })

  useEffect(() => {
    return () => {
      croct.unplug()
    };
  }, [])

  return (
    <CroctContext.Provider value={croct}>
      {children}
    </CroctContext.Provider>
  )
}

export const useCroct = (): Plug => {
  const context = useContext(CroctContext)

  if (context === null) {
    throw new Error('Hook useCroct must be used within an CroctProvider')
  }

  return context
}

export default CroctProvider
