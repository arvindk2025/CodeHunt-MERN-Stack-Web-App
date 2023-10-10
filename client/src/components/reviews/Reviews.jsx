import { useMutation,useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import newRequest from '../../utils/newRequest';
import "./Reviews.scss";
import Review from '../review/Review';

const Reviews = ({gigId}) => {

const queryClient = useQueryClient()
  
const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
        newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
        }),
    });
    
    const mutation = useMutation({
        mutationFn: (review) => {
          return newRequest.post('/reviews', review)
        },
        onSuccess:()=>{
            queryClient.invalidateQueries(["reviews"])
        },
    });

    const handleSubmit = (e) =>{
        e.preventDefault();
        const desc = e.target[0].value;
        const star = e.target[1].value;
        mutation.mutate({gigId, desc, star});
    };
  
  return (
        <div className="reviews">
              <h1>Reviews</h1>
              {
                isLoading ? "loading" : error ? "Something went wrong !" 
                : data.map((review) => <Review key={review._id} review={review} />)
              }

              <div className="add">
                <h3>Add Your Review </h3>
                <form action='' className='addForm' onSubmit={handleSubmit}>
                    <input type='text' placeholder='write your opinion please '/>
                    <div className="star">
                        <span>Select Rating whatever you want to give :- </span>
                        <select name='' id=''>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </div>

                    <button>Post Your Review</button>
                </form>
              </div>
        </div> 

  );
};

export default Reviews



