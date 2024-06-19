import { GiNotebook } from "react-icons/gi";
import Title from "../../../Components/Title";
import { FaArrowTurnDown, FaCoins } from "react-icons/fa6";
import { TiTickOutline } from "react-icons/ti";
import { Fade } from "react-awesome-reveal";

const HowWork = () => {
    return (
        <div className="my-10">
            <Title heading={'How It Works?'}></Title>
            <div className="flex flex-col gap-3">
                <div className="w-3/5">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <GiNotebook className="text-5xl text-sky-500" />
                        <span>Register</span>
                    </h2>
                    <h2 className="text-lg font-medium mt-2">Sign up for free by creating an account on TaskMaster. It is quick and easy to get started.</h2>
                </div>
                <Fade damping={0.8}>
                    <FaArrowTurnDown className="text-8xl text-sky-500 mx-auto" />
                </Fade>
                <div className="text-right w-4/6 ml-auto">
                    <h2 className="text-3xl font-bold flex items-center gap-3 justify-end">
                        <span>Complete Tasks</span>
                        <TiTickOutline className="text-5xl text-sky-500" />
                    </h2>
                    <h2 className="text-lg font-medium mt-2">Browse through a variety of tasks and choose the ones that match your skills and interests. Complete the tasks to earn coins.</h2>
                </div>
                <Fade damping={0.8}>
                    <FaArrowTurnDown className="text-8xl text-sky-500 mx-auto" />
                </Fade>
                <div className="w-3/5">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <FaCoins className="text-5xl text-sky-500" />
                        <span>Earn Rewards</span>
                    </h2>
                    <h2 className="text-lg font-medium mt-2">Redeem your earned coins for cash or other exciting rewards. The more tasks you complete, the more you earn!</h2>
                </div>
            </div>
        </div>
    );
};

export default HowWork;