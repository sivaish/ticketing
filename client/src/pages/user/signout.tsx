
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import useRequest from '@/hooks/use-request';
import Container from '@/components/ui/container';

export default function Signout() {

    const router = useRouter();
    const { doRequest, errors } = useRequest({
        url: '/api/users/signout',
        method: 'post',
        body: {
        },
        onSuccess: () => router.push('/'),
    });

    useEffect(() => {
        doRequest();
    }, []);

    return (
        <Container>
            <div> Signing you out...</div>
        </Container>
    )
};