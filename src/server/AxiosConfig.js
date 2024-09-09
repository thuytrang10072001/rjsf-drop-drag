import axios from 'axios';
import {Hypnosis} from 'react-cssfx-loading';
import React, {useState} from 'react';

var displayLoading, setDisplayLoading;
function AxiosLoading() {
    const [isLoading, setIsLoading] = useState(false);
    setDisplayLoading = setIsLoading;
    displayLoading = isLoading;
    return (
        <>
            {displayLoading && (
                <div className='loading-overlay'>
                    <Hypnosis color='var(--gold)' width='35px' height='35px' />
                </div>
            )}
        </>
    );
}
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
const csrfTokenKey = document.querySelector('meta[name="csrf-token-key"]').getAttribute('content');
const instance = axios.create({
    baseURL: process.env.REACT_APP_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN':csrfToken,
        'X-CSRF-TOKEN-KEY': csrfTokenKey,
    },
});

export {instance as axios, AxiosLoading, setDisplayLoading};