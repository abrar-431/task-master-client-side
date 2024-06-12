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
                        <div className="container1">
                            <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                    </SwiperSlide>
                </Swiper>
            </Slide>
        </div>
    );
};

export default Banner;