import { Outlet } from "react-router-dom";
import Header from '../Pages/Shared/Header'
import Footer from '../Pages/Shared/Footer'

const Root = () => {
    return (
        <div className="font-noto-serif">
            <Header></Header>
            <div className="w-5/6 mx-auto">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;