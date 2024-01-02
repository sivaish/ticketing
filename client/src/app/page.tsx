'use client'

import React from 'react';
import useUser from '@/actions/auth';

export default function Home() {

  const { loading,
    loggedOut,
    user: data,
    mutate } = useUser();

  console.log('User :: ' + JSON.stringify(data));

  return (
    <div>
      {data?.currentUser?.id ? <p> Logged in Successfully </p> : <p> Please Login</p>}
    </div>
  )
}