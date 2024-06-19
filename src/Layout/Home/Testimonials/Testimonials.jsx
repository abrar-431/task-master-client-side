import { useEffect, useState } from "react";
import Title from "../../../Components/Title";
import useAxiosPublic from '../../../Hooks/useAxiosPublic'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        useAxiosPublic.get('/reviews')
            .then(res => {
                setReviews(res.data)
            })
    }, [])
    return (
        <div className="mt-10">
            <Title heading={'What Our Users Are Saying'} subHeading='Discover how TaskMaster is making a difference for users. Read their stories and see how our platform has helped them achieve their goals and earn rewards.'></Title>
            <div>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {
                        reviews.map(review => <SwiperSlide key={review._id}>
                            <div className="mx-auto">
                                <div className="mx-auto flex justify-center">
                                    <img className="rounded-full" src={review.photo} alt="" />
                                </div>
                                <h2 className="text-xl text-center my-3 font-semibold">{review.name}</h2>
                                <Rating className="mx-auto" style={{ maxWidth: 250 }} value={review.rating}/>
                                <h2 className="text-lg font-medium mt-2 text-center"><i>{review.quote}</i></h2>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;