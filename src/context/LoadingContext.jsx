// context/LoadingContext.jsx
import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
            {isLoading && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                        Loading...
                        <div className="mt-3 h-8 w-8 border-t-2 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
                    </div>
                </div>
            )}
        </LoadingContext.Provider>
    );
};
