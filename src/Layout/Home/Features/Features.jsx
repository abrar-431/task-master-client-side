import { useEffect, useState } from "react";
import Title from "../../../Components/Title";
import axiosPublicInstance from "../../../Hooks/useAxiosPublic";
import Feature from "./Feature";

const Features = () => {
    const [features, setFeatures] = useState([]);
    useEffect(()=>{
        axiosPublicInstance.get('/features')
        .then(res=>{
            setFeatures(res.data);
        })
    },[])

    console.log(features)
    return (
        <div className="mt-10">
            <Title heading={"Features"} subHeading="Discover the Benefits of Using TaskMaster"></Title>
            <div className="grid grid-cols-3 gap-6">
                {
                    features.map((feature, idx)=><Feature key={feature._id} idx={idx} feature={feature}></Feature>)
                }
            </div>
        </div>
    );
};

export default Features;