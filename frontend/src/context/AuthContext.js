import React,{useContext,useState} from 'react';

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
    const [name,setName]=useState('');
    const [loggedIn,setLoggedIn]=useState(false);
    const [isEditing,setIsEditing]=useState(false)

    return (
        <AuthContext.Provider value={{ 
            name,
            setName,
            loggedIn,
            setLoggedIn,
            isEditing,
            setIsEditing
         }}>
            {children}
        </AuthContext.Provider>
    );
}

