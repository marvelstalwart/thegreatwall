
export function handleGroup(sortedReviews) {
            
                     return  Object.groupBy(sortedReviews, (review)=> {
                            return review.day
                        })

}
