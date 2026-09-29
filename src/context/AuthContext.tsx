import { createContext, useEffect, useState, type ReactNode } from "react"
import { type User, type IAuthContext } from "../Types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext<IAuthContext | null>(null);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    const navigate = useNavigate();


    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user")
            if (!storedUser) {
                navigate("/");
                return;
            }

            const parsedUser: User = JSON.parse(storedUser)
            setUser(parsedUser)
            navigate(`${parsedUser.role.toLocaleLowerCase()}/dashboard`)

        } catch (err: any) {
            console.log(err)
            localStorage.removeItem("user");
            navigate("/");
        }
    }, [])



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


