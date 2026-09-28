import {  createContext, useState, type ReactNode } from "react"
import { type User, type IAuthContext } from "../Types";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<IAuthContext | null>(null);

 
export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null)

    const navigate = useNavigate();

    

    const login = (user: User) => {
        localStorage.setItem("user", JSON.stringify(user))
        setUser(user)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
        navigate('/')
     
    }


    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )




}


