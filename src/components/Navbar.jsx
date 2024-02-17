import React, {useEffect, useState} from 'react'
import GoogleIcon from "../assets/icons/google.svg"
import { useParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import getHost from '../utils/useUrl'
import { faPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export default function Navbar({setReviewFormOpen}) {

    const{token} = useParams()
const [user, setUser] = useState(null)
const handleLogout= ()=>{
    localStorage.clear()
    setUser(null)
}
useEffect(()=> {
    if(token) { 

        let profile = jwtDecode(token)
        
        // profile = {
        //     jwt  lastName: profile.name.familyName,
        //     firstName: profile.name.givenName,
        //     email: profile.emails[0].value
            
            
        // }
        console.log(profile)
        localStorage.setItem('token', profile.token)
        localStorage.setItem('User', JSON.stringify(profile))
         
      }

    //   localStorage.clear()
      
      
  
},[token])

useEffect(()=> {
  const user = JSON.parse(localStorage.getItem('User'))
  if (user) {

      setUser(user)
  }  
  
},[token])


  return (
    <div className=' w-full flex justify-between items-center px-4'>
        <button onClick={()=> setReviewFormOpen(true)}><FontAwesomeIcon icon={faPlus}/> <span className='font-semibold text-lg text-gray-700'>   </span></button>
        <div className='p-4 rounded-xl'>

            {

                user?
                <div className='flex gap-2'>

                    <button className='font-semibold text-blue-950'>{user.fullName.split(" ")[1]} </button>
                    <span><FontAwesomeIcon onClick={handleLogout} icon={faRightFromBracket} className='text-blue-950'/> </span>
                    </div>
                :

            <a href={`${getHost()}/api/auth/google`}>
                            <button  className='bg-white flex items-center justify-center gap-4 font-bold text-lg text-gray-700 rounded-xl'>
                          
                          <img alt='google' className='w-4 h-4 ' src={GoogleIcon}/>
                          Sign In

                            </button>

                        </a>
            }
              </div>
        </div>
  )
}
