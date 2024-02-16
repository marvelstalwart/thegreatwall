import React, {useState, useEffect} from 'react'
import Header from './components/Header'
import Review from './components/Review'
import axios from 'axios'
import ReviewForm from '../../components/ReviewForm'
import getHost from '../../../utils/useUrl'
export default function Home({reviewFormOpen, setReviewFormOpen}) {
  const [reviews,setReviews] = useState(null)
  const [filteredReviews, setFilteredReviews] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState(null)
  
  useEffect(()=> {
        axios.get(  `${getHost()}/api/reviews`).then((res)=> {
          setReviews(res.data)
        }).catch((err)=> {
          console.error(err)
        })
       
    },[])

     useEffect(()=> {
      if(isSuccess) {
        axios.get(`${getHost()}/api/reviews`).then((res)=> {
          setReviews(res.data)
        }).catch((err)=> {
          console.error(err)
        })



      }
    },[isSuccess])

    useEffect(()=> {

      console.log(reviewFormOpen)
      },[reviewFormOpen])

    const handleFilter =()=> {
      if (searchKeyword) {
        if (reviews){
          const filteredReviews = reviews.filter((review)=> review.vendorName.toLowerCase().includes(searchKeyword.toLowerCase()))
          setFilteredReviews(filteredReviews)
        }
      }
      else {
        setFilteredReviews(null)
      }
    }

    useEffect(()=> {
        handleFilter()
    },[searchKeyword])

  return (
    <div className=' p-2 '>

      <ReviewForm reviewFormOpen={reviewFormOpen} setReviewFormOpen={setReviewFormOpen} setIsSuccess={setIsSuccess}/>
        <div className='bg-blue-100 bg-opacity-50 rounded-lg p-2'>
        <Header setSearchKeyword={setSearchKeyword}/>

      <div className=' pt-2 text-lg font-semibold text-blue-950'>Today</div>
      <section className='flex flex-col gap-4 mt-4'>
        {
        filteredReviews?.length>0? 
            
        filteredReviews?.map((review, i)=> {
          return   <Review  key={i} review={review}/>
        })
        :
        filteredReviews?.length===0?
        <div>No results</div>
        :


        reviews?.map((review, i)=> {
          return   <Review  key={i} review={review}/>
        })
        
        }
      

      </section>
        </div>


    </div>
  )
}
