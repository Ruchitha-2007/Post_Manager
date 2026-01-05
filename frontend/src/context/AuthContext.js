import React,{useContext,useState} from 'react';

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
    const [name,setName]=useState('');
    const [loggedIn,setLoggedIn]=useState(false);
    const [isEditing,setIsEditing]=useState(false)
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await api.get('/auth/refresh');
        const { accessToken, user } = res.data;

        localStorage.setItem('accessToken', accessToken);
        setName(user.name);
        setLoggedIn(true);
      } catch (err) {
        setName('');
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  if (loading) return null; 


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

