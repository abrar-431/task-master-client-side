import { Fade, Slide } from "react-awesome-reveal";
import { TypeAnimation } from "react-type-animation";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Navigation, Pagination, Parallax } from 'swiper/modules';


const Banner = () => {
    return (
        <div className="my-10">
            <Fade>
                <h2 className="text-xl font-bold text-center">
                    <div>
                        <TypeAnimation
                            splitter={(str) => str.split(/(?=)/)}
                            sequence={[
                                'Task Master: Master Your Day, Every Day',
                                500,
                                ''
                            ]}
                            className="md:text-2xl text-lg font-bold"
                            speed={70}
                            deletionSpeed={70}
                            repeat={Infinity}
                        />
                    </div>
                </h2>
            </Fade>
            <Fade>
                <p className="my-4 text-center w-2/3 mx-auto">Join our community of go-getters who turn simple tasks into substantial rewards. Whether you are looking to make some extra cash or need tasks completed efficiently, TaskMaster is your one-stop platform for earning and productivity. Sign up today and start your journey towards financial freedom and success.</p>
            </Fade>
            <Slide>
                <Swiper
                    spaceBetween={30}
                    effect={'fade'}
                    navigation={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[EffectFade, Navigation, Pagination, Parallax]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className="relative">
                            <img className="brightness-50 w-full" src="https://i.ibb.co/x5K6rQx/image-1.jpg" />
                            <div className="absolute bottom-16 left-10">
                                <h2 className="text-xl font-bold text-white my-3">Online Surveys</h2>
                                <h2 className="text-lg font-semibold text-white"><i>Complete a 10-Minute Customer Satisfaction Survey</i></h2>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative">
                            <img className="brightness-50 w-full" src="https://i.ibb.co/1v6jQzs/image-2.jpg" />
                            <div className="absolute bottom-16 left-10">
                                <h2 className="text-xl font-bold text-white my-3">Data Entry</h2>
                                <h2 className="text-lg font-semibold text-white"><i>Enter Data from Receipts into a Spreadsheet</i></h2>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative">
                            <img className="brightness-50 w-full" src="https://i.ibb.co/SP59twV/image-3.jpg" />
                            <div className="absolute bottom-16 left-10">
                                <h2 className="text-xl font-bold text-white my-3">App Testing</h2>
                                <h2 className="text-lg font-semibold text-white"><i>Enter Data from Receipts into a Spreadsheet</i></h2>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </Slide>
        </div>
    );
};

export default Banner;