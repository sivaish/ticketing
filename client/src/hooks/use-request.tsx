import axios, { AxiosResponse, AxiosError } from 'axios';
import { useState } from 'react';

interface UseRequestProps {
    url: string;
    method: string;
    body: any;
    onSuccess?: (data: any) => void;
}

const useRequest = ({ url, method, body, onSuccess }: UseRequestProps) => {
    const [errors, setErrors] = useState<JSX.Element | null>(null);

    const doRequest = async () => {
        try {
            const response: AxiosResponse = await (axios as any)[method](url, body);

            if (onSuccess) {
                onSuccess(response.data);
            }

            return response.data;
        } catch (err: any) {
            setErrors(
                <div>
                    <h4><strong className='font-bold'>Error!</strong></h4>
                    <ul className='px-6 py-2'>
                        {err.response.data.errors.map((err: any, index: number) => (
                            <li key={index}> {err.message}</li>
                        ))}
                    </ul>
                </div >
            );
        }
    };

    return { doRequest, errors };
};

export default useRequest;
