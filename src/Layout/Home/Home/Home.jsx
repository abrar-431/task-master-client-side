import Banner from "../Banner/Banner";
import Features from "../Features/Features";
import HowWork from "../HowWork/HowWork";
import Testimonials from "../Testimonials/Testimonials";
import TopEarners from "../TopEarners/TopEarners";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Features></Features>
            <HowWork></HowWork>
            <TopEarners></TopEarners>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;