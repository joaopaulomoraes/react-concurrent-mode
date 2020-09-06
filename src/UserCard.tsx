import React, { useEffect, useState, FunctionComponent, ReactElement } from 'react'
import { useCroct } from './croctContext'
import { Resource, wrapPromise } from './helper'

type UserCardProps = {}

type User = {
  age: string | null;
  interests: string[];
  activities: string[];
  city: string | null;
  duration: string;
}

const unknowUser = {
  age: null,
  interests: [],
  activities: [],
  city: null,
  duration: '0s'
}

const UserCard: FunctionComponent<UserCardProps> = (): ReactElement => {
  const croct = useCroct()

  const [resource, setResource] = useState<Resource>({
    load: () => unknowUser
  })

  useEffect(() => {
    setResource(
      wrapPromise(
        croct.evaluate(`[
          "age": user's age,
          "interests": user's interests,
          "activities": user's activities,
          "city": location's city,
          "duration": session's duration
        ]`)
      )
    )
  }, [croct])

  const user = resource.load()

  return (
    <ul>
      <li>Age: {user.age ?? 'unkown'}</li>
      <li>Interests: [{user.interests.toString()}]</li>
      <li>Atividades: [{user.activities.toString()}]</li>
      <li>Cidade: {user.city ?? 'unkown'}</li>
      <li>Session duration: {user.duration}</li>
    </ul>
  )
}

export default UserCard
