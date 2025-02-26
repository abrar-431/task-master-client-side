import { useEffect, useState } from "react";
import Title from "../../../Components/Title";
import Feature from "./Feature";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Features = () => {
    const [features, setFeatures] = useState([]);
    const axiosPublic = useAxiosPublic();
    useEffect(()=>{
        axiosPublic.get('/features')
        .then(res=>{
            setFeatures(res.data);
        })
    },[axiosPublic])
    
    return (
        <div className="mt-10">
            <Title heading={"Features"} subHeading="Discover the Benefits of Using TaskMaster"></Title>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                {
                    features.map((feature, idx)=><Feature key={feature._id} idx={idx} feature={feature}></Feature>)
                }
            </div>
        </div>
    );
};

export default Features;