'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/ui/container';
import AuthForm from '@/components/AuthForm';
import useRequest from '@/hooks/use-request';

export default function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonString, setButtonString] = useState('Sign In')
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => router.push('/'),
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    doRequest();
  };

  return (
    <Container>
      <h1>
        <strong className='font-bold'>Sign In</strong>
      </h1>
      <Container>
        <AuthForm
          email={email}
          password={password}
          onSubmit={onSubmit}
          setEmail={setEmail}
          setPassword={setPassword}
          errors={errors}
          buttonString={buttonString}
        />
      </Container>
    </Container>
  );
}
