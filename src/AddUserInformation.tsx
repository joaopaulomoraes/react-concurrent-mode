import React, { FunctionComponent, ReactElement, useCallback } from 'react'
import { useCroct } from './croctContext'

const AddUserInformation: FunctionComponent = (): ReactElement => {
  const croct = useCroct()

  const handlePromptAge = useCallback(() => {
    const birthDate = prompt('Whats your birth date?', 'YYYY-mm-dd')

    croct.user
      .edit()
      .set('birthDate', birthDate)
      .save()

  }, [croct.user])

  const handlePromptInterest = useCallback(() => {
    const interest = prompt('Whats your interest?')?.split(', ')

    croct.user
      .edit()
      .combine('interests', interest ?? [])
      .save()

  }, [croct.user])

  return (
    <>
      <button onClick={handlePromptAge}>Ask my age</button>
      <button onClick={handlePromptInterest}>Ask my interest</button>
    </>
  );
}

export default AddUserInformation;
