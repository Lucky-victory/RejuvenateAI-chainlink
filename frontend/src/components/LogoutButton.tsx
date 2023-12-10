import { useAppContext } from "@/context/state";
import { Button } from "@chakra-ui/react"
import { useRouter } from "next/router"

const LogoutButton = () => {
  const router=useRouter();
  const {setUser}=useAppContext()
  const handleLogout=()=>{
setUser(null)
    router.push('/')
  }
  return (
  <Button onClick={()=>handleLogout()}>

  </Button>
  )
}

export default LogoutButton