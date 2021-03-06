import React, {useEffect} from 'react';
import './App.css';
import Main from "../main/Main";
import {CircularProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "./hooks";
import {initializeAppTC} from "./app-reducer";
import {ErrorSnackbar} from "../main/common/ErrorSnackbar/ErrorSnackbar";

const App = () => {

    const dispatch = useAppDispatch();
    const isInitialized = useAppSelector((state) => state.app.initialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <Main/>
        </div>
    );
}

export default App;
