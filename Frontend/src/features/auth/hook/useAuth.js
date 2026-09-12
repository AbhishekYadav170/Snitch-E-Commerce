


// import { setError, setLoading, setUser } from "../state/auth.slice"
// import { register, login } from "../service/auth.api"
// import { useDispatch } from "react-redux"
// import { getMe } from "../service/auth.api"



// export const useAuth = () => {

//     const dispatch = useDispatch()

//     async function handleRegister({ email, contact, password, fullname, isSeller = false }) {

//         const data = await register({ email, contact, password, fullname, isSeller })

//         dispatch(setUser(data.user))
//     }

//     async function handleLogin({ email, password }) {

//         const data = await login({ email, password })
//         dispatch(setUser(data.user))
//         return data.user
//     }

//     async function handleGetMe() {

//         try {
//             dispatch(setLoading(true))
//             const data =await getMe()
//             dispatch(setUser(data.user))
//         } catch (err) {
//             console.log(err)
//         } finally {
//             dispatch(setLoading(false))
//         }
        
//     }
//     return { handleRegister, handleLogin, handleGetMe }

// }








import { setError, setLoading, setUser } from "../state/auth.slice"
import { register, login, logout } from "../service/auth.api"
import { useDispatch } from "react-redux"
import { getMe } from "../service/auth.api"

function getErrorMessage(err) {
    return err?.response?.data?.message
        || err?.response?.data?.errors?.[ 0 ]?.msg
        || "Something went wrong. Please try again."
}

export const useAuth = () => {

    const dispatch = useDispatch()

    async function handleRegister({ email, contact, password, fullname, isSeller = false }) {
        try {
            dispatch(setError(null))
            const data = await register({ email, contact, password, fullname, isSeller })
            dispatch(setUser(data.user))
            return data.user
        } catch (err) {
            dispatch(setError(getErrorMessage(err)))
            throw err
        }
    }

    async function handleLogin({ email, password }) {
        try {
            dispatch(setError(null))
            const data = await login({ email, password })
            dispatch(setUser(data.user))
            return data.user
        } catch (err) {
            dispatch(setError(getErrorMessage(err)))
            throw err
        }
    }

    async function handleGetMe() {

        try {
            dispatch(setLoading(true))
            const data =await getMe()
            dispatch(setUser(data.user))
        } catch (err) {
            dispatch(setUser(null))
        } finally {
            dispatch(setLoading(false))
        }

    }

    async function handleLogout() {
        try {
            await logout()
        } catch (err) {
            console.log(err)
        } finally {
            dispatch(setUser(null))
        }
    }

    return { handleRegister, handleLogin, handleGetMe, handleLogout }

}