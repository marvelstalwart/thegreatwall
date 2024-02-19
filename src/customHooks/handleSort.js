
import { getDate } from "../utils/getDate"



export function handleSort(reviews) {


    let sorted = [...reviews]
    
       return sorted.map((review)=> {
            const day = getDate(review.createdAt)
            return {...review, day}            
        }).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        
    
    


      }