import React, {useState, useEffect} from 'react'
import Header from './components/Header'
import Review from './components/Review'
import axios from 'axios'
import { handleSort } from '../../customHooks/handleSort'
import {handleGroup} from "../../customHooks/useGroup"
import ReviewForm from '../../components/ReviewForm'
import getHost from '../../utils/useUrl'

export default function Home({reviewFormOpen, setReviewFormOpen}) {
  const [reviews,setReviews] = useState(null)
  const [ searchResults, setSearchResults] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState(null)
  const [sortedReviews, setSortedReviews] = useState(null)
  const [groupedReviews, setGroupedReviews] = useState(null)
  const [filteredReviews, setFilteredReviews] = useState(null)
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
// Sort reviews and get the day string for each
    useEffect(()=> {
          if (reviews){
           
            let sorted = handleSort(reviews)
         
            setSortedReviews(sorted)
          }
    
      },[reviews]) 
// Group review by day string
      useEffect(()=> {
          if(sortedReviews){
          
            let grouped = handleGroup(sortedReviews)
            setGroupedReviews(grouped)
          }
      },[sortedReviews])
// For searching through reviews
    const handleSearch =()=> {
      if (searchKeyword) {
        if (reviews){
          const  searchResults = sortedReviews?.filter((review)=> review.vendorName.toLowerCase().includes(searchKeyword.toLowerCase()))
           setSearchResults( searchResults)
        }
      }
      else {
         setSearchResults(null)
      }
    }
// Filter based on day
    const handleFilter= (value)=> {
      let reviews;
      setSearchKeyword(null)
// Filter through search results
   
// Filter through the sorted reviews with the day field
      
          reviews = [...sortedReviews]
      


      const filtered = reviews.filter((review)=> review.day.toLowerCase() ===value.toLowerCase())
      setSearchResults(filtered)



    


          
    }

    useEffect(()=> {
        handleSearch()
    },[searchKeyword])

  return (
    <div className=' p-2 '>

      <ReviewForm reviewFormOpen={reviewFormOpen} setReviewFormOpen={setReviewFormOpen} setIsSuccess={setIsSuccess}/>
        <div className='bg-blue-100 bg-opacity-50 rounded-lg p-2'>
        <Header searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} handleFilter={handleFilter}/>
        

      {searchKeyword && searchResults?.length> 0 && <div>Showing results for {searchKeyword}</div>}
            {

       searchResults?.length>0?  
      <section className='flex flex-col gap-4 mt-4'>
        {
       searchResults?.map((review, i)=> {
        return   <Review  key={i} review={review}/>
      })
      }

</section>
:
 searchResults?.length===0?
<div>No results</div>
:

           groupedReviews ?  Object.entries(groupedReviews).map(([key, values])=> {
              return <div>
                  <div className=' pt-2 text-lg font-semibold text-blue-950'>

                    
                    {key}

                  </div>
                  <section className='flex flex-col gap-4 mt-4'>
               {values.map((review, i)=> <Review  key={i} review={review}/> )}
               </section>
                </div>
            })
          
          : <div>No results</div>
          }

        </div>


    </div>
  )
}
