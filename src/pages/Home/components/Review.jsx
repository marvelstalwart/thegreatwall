import React , {useEffect, useState, useMemo} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import axios from "axios"
import getHost from '../../../../utils/useUrl'
import { faHeart as HeartRegular } from '@fortawesome/free-regular-svg-icons'
import { faHeart as HeartLiked } from '@fortawesome/free-solid-svg-icons'
export default function Review({review}) {
        const[liked, setLiked] = useState(false)
        const [user,setUser] = useState(null)
        const stars = Array.from({length: review.ratings}, (_, i)=> i + 1)
        const colors = ['bg-red-500', 'bg-purple-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500'] 
        const [updatedReview, setUpdatedReview] = useState(null)

const handleLike = async () => {
    setLiked(true)
    const token = localStorage.getItem('token')
    if (token){
 
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        console.log(config)
        const res = await axios.put(`${getHost()}/api/reviews/likes/${review._id}`, {},config)
        setUpdatedReview(res.data)

    }else {
     window.location.href= `${getHost()}/api/auth/google`
    }
}
const handleDislike = async ()=> {
    setLiked(false)
    const token = localStorage.getItem('token')
    if (token){
 
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const res = await axios.put(`${getHost()}/api/reviews/likes/${review._id}/unlike`, {},config)
        setUpdatedReview(res.data)

} else {
    window.location.href= `${getHost()}/api/auth/google`
   }

}

        useEffect(()=> {
                const user =JSON.parse(localStorage.getItem('User'))
                setUser(user)
                const isLiked =review.likes?.includes(user.id)
                setLiked(isLiked)
        },[])

        function getRandomColor() {
            // Generate a random index within the range of the colors array
            const randomIndex = Math.floor(Math.random() * colors.length);
            // Return the color at the random index
            return colors[randomIndex];
          }

          const color = useMemo(()=>{
                return getRandomColor()
          },[])  
const name = review.createdBy? review.createdBy.split(" ")[1] : 'Anon'
  return ( 
    <div className='p-4 bg-white flex flex-col gap-2 rounded-md'>
        <div className='flex justify-between'>
        
        <div className='flex items-center gap-2'>
        <div className={`${color} text-white w-6 h-6 rounded-full text-center`}> {name[0]}</div>
                <p className='font-semibold'>{review.createdBy? review.createdBy.split(" ")[1] : <>Anon</>}</p>
            </div>
        <img className=''/>
        
            <div>
                {

                stars.map(_=>  <FontAwesomeIcon icon={faStar} className=' text-yellow-300'/> )
                }

                </div>

        
       

        </div>
                <div className='font-bold text-blue-950'>
                    {review.vendorName}
                </div>

                <div>
                    {review.review}
                </div>
                <div className='flex items-center gap-1 justify-end'>
                   <p>{updatedReview? updatedReview.likes.length:review.likes?.length}</p> 
                   {
                    liked?
                    <FontAwesomeIcon onClick={handleDislike} icon={HeartLiked}  className='text-blue-500'/>
                    :      <FontAwesomeIcon onClick={handleLike} icon={HeartRegular} className='cursor-pointer'/>


                   }
              
                </div>

    </div>
  )
}
