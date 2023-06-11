import React from 'react'

export interface IProps {
    message: string;
}

export function Error({ message }: IProps) {
    console.log(message);
    return (
        <div>Error: {message}</div>
    )
}
