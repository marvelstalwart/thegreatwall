import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullseye, faLaptopHouse, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import {motion, AnimatePresence} from "framer-motion"
import GoogleIcon from "../assets/icons/google.svg"
import axios from "axios"
import getHost from '../utils/useUrl'
export default function ReviewForm({reviewFormOpen, setReviewFormOpen, setIsSuccess}) {
    const [user, setUser] = useState(localStorage.getItem('User'))
    const [disabled, setDisabled] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState(null)
    const [anonChecked, setAnonChecked] = useState(false)
const [review, setReview] = useState({
        vendorName: "", 
        review: "",
        ratings: 5,
        createdBy: anonChecked? null : user?.id

})
useEffect(()=> {
    const user = JSON.parse(localStorage.getItem('User'))
    if (user){
        setUser(user)
    } else{
        setUser(null)
    }
},[])



const handleCheckValidity  = ()=> {
    if (review.vendorName.length >=3 && review.review.length>=4 && user) {
        setDisabled(false)
    }
    else {
        setDisabled(true)
    }
}

const handleCheck = (e)=> {
        setAnonChecked(!anonChecked)
}
const handleChange = (e)=> {
    const {name, value} = e.target
    setIsError(false)
    setMessage(null)
    setReview({...review, [name]: value})
    handleCheckValidity()
}

const handleSubmit =  async (e) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem('User'))
    // setUser(user)
    const payload = {
        vendorName: review.vendorName,
        review: review.review,
        ratings: review.ratings,
        createdBy: anonChecked? null : user?.id


    }

    setIsLoading(true)
    const token = localStorage.getItem('token')
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    try {

        const res =  await axios.post(`${getHost()}/api/reviews`,payload, config)
        if (res.status===200) {
            setReviewFormOpen(false)
            setIsLoading(false)
           setIsSuccess(true)
            setReview({
                vendorName: "", 
                review: "",
                ratings: 5,
                createdBy: anonChecked? null : user?.id
        
            })
        }
    }
    catch (err) {
        setIsError(true)
        setIsLoading(false)
        setMessage(err?.response?.data.message)
    }
  


}

  return (
    
            <AnimatePresence>

{
          
        reviewFormOpen?
        <motion.div 
        
        className= ' fixed  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full flex justify-center items-center  h-screen bg-white z-20 bg-opacity-80 backdrop-filter transition-all duration-500  backdrop-blur-[2px]'>
          
        <motion.form
        
        initial={{
            opacity: 0,
            scale: 0.75,
        }}
        animate={{
            opacity: 1,
            scale: 1,
            transition: {
                ease: "easeOut",
                duration: 0.15,
            },
        }}
        exit={{
            opacity: 0,
            scale: 0.75,
            transition: {
                ease: "easeIn",
                duration: 0.15,
            },
        }} 
        onSubmit={handleSubmit}
        className=' w-[80%] h-fit rounded-md absolute  bg-white border border-gray-300  z-10 flex flex-col  gap-2 p-4'> 
        <div className='w-full flex justify-end'>
                <FontAwesomeIcon className='text-gray-500 cursor-pointer' icon={faXmarkCircle} onClick={()=> setReviewFormOpen(false)}/>
                </div>

                {
                    !user &&   <div className='w-full flex justify-center'>

                    <a href={`${getHost()}/api/auth/google`}  >
                    <div  className='bg-cyan-500 bg-opacity-90 text-white  flex items-center p-2 justify-center gap-4 font-bold text-lg rounded-xl'>
                  
                  <img alt='google' className='w-4 h-4 ' src={GoogleIcon}/>
                  One Click Sign In

                    </div>

                </a>

                    </div> 
                }
             
        <h2 className='tex-start font-semibold text-blue-950'>Let us know how you feel</h2>
        <input name='name' disabled={true} className='w-full bg-gray-100 p-2 rounded-md outline-none' type='text' placeholder={!anonChecked ? user?.fullName?.split(" ")[1]: 'Anonymous'}/>
        <input name='vendorName' onChange={handleChange} value={review.vendorName} className='w-full bg-gray-100 p-2 rounded-md outline-none' type='text' placeholder='vendor name'/>
        <textarea onChange={handleChange} value={review.review} name='review' className='w-full bg-gray-100 p-2 rounded-md  outline-none' type='text' placeholder='review'/>
       <div className='w-full flex justify-center gap-2'>
            <label className=''>Ratings:  </label>
        <select name='ratings' value={review.ratings} onChange={handleChange} className='bg-gray-100 w-12'>
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}> 1</option>
            </select>

       </div>
       <div className='w-full flex justify-center gap-2'>
       <input type='checkbox' onChange={handleCheck} checked={anonChecked}/> 
            <label className='text-sm'>submit anonymously</label>
       </div>
      
       <div className='w-full flex justify-center'>
       
       <button disabled={disabled} className={` ${disabled?  'bg-gray-300': isError? 'bg-red-500' : 'bg-blue-500'} w-fit rounded-md font-semibold  p-1 text-white`}>
       {isLoading? 
             <div class={`border-white h-4 w-4 animate-spin rounded-full border-2 border-t-blue-500`} />
        :
        message?
        <div>{message}</div>

        :
        !user?
        <>You need to be logged in</>
        :
            <> Submit</>
    
        }
      
       
        
        </button>
        </div>

        </motion.form>
        
        
        </motion.div>
        :
        null
}
        </AnimatePresence>
  )
}
