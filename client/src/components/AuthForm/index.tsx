import React from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
} from '@chakra-ui/react';

interface AuthFormProps {
    email: string;
    password: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    errors: string | React.ReactElement | null;
    buttonString: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
    email,
    password,
    onSubmit,
    setEmail,
    setPassword,
    errors,
    buttonString,
}) => {
    return (
        <form onSubmit={onSubmit}>
            <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormControl>

            {errors && typeof errors === 'string' ? (
                <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative my-2'>
                    {errors}
                </div>
            ) : null}

            {errors && React.isValidElement(errors) ? (
                <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative my-2'>
                    {errors}
                </div>
            ) : null}

            <Button mt={4} colorScheme="teal" type="submit">
                {buttonString}
            </Button>
        </form>
    );
};

export default AuthForm;
