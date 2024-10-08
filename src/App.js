import { LoadingProvider } from './hooks/LoadingContext';
import './App.css';
import Page from './Page';
import React from "react";

export default function App (){
    return (
        <LoadingProvider>
            <Page/>
        </LoadingProvider>
    )
}