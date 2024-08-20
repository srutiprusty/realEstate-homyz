import {useAuth0} from '@auth0/auth0-react'
import { toast } from "react-toastify";
/* when we are making functionality of an user before this  check is the user is valida or not */

const useAuthCheck = () => {

    const {isAuthenticated} = useAuth0()
    const validateLogin = () => {
        if(!isAuthenticated)
        {
            toast.error("you must be logged in", {position: "bottom-right"})
            return false
        } else return true
    }
  return (
    {
        validateLogin
    }
  )
}

export default useAuthCheck