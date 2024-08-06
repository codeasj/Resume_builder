/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const DesignContext = createContext();

export const AUTH_STATE = {
    LOADING: "loading",
    AUTHENTIC: "authentic",
    UN_AUTHENTIC: "un-authentic",
};

export const DesignProvider = ({ children }) => {
    const [designIndex, setDesignIndex] = useState(0);
    const [authState, setAuthState] = useState(AUTH_STATE.LOADING);
    const totalDesigns = 3;

    const handleToggle = () => {
        setDesignIndex((designIndex + 1) % totalDesigns);
    };

    const handleAuthState = (state) => {
        setAuthState(state)
    }

    return (
        <DesignContext.Provider value={{ designIndex, authState, handleToggle, handleAuthState }}>
            {children}
        </DesignContext.Provider>
    );
};
