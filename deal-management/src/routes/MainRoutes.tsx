import { Route, Routes } from "react-router";

import { Suspense, lazy } from 'react';
import Loader from "../components/common/Loader";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

const Deals = lazy(() => import('../pages/Deals'));
const NewDeal = lazy(() => import('../pages/NewDeal'));

const MainRoutes = () => {
    return (
        
        
        <Suspense fallback={<Loader />}>     
            <Routes>
                <Route path='/' element={<Deals />} />
                <Route path='/new-deal' element={<NewDeal />} />
            </Routes>
        </Suspense>
    

    )
}

export default MainRoutes