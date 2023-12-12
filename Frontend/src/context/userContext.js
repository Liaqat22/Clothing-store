import React, { createContext, useContext, useEffect, useState } from 'react'

const User = createContext()

function UserProvider({ children }) {
    const [auth, setAuth] = useState({
        user: null,
        token: ''
    })

    useEffect(() => {
        const object = localStorage.getItem("auth")
        if (object) {
            const data = JSON.parse(object)
            setAuth({
                ...auth,
                user: data.user,
                token: data.token
            })
        }
    }, [])

    return (
        <div>
            <User.Provider value={[auth, setAuth]}>{children}</User.Provider>
        </div>
    )
}
const useAuth = () => useContext(User)

export { UserProvider, User, useAuth }
