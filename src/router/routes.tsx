import MainPage from "../pages/MainPage";
import Catalog from "../pages/CatalogPage";
import Basket from "../pages/BasketPage";
import { type RouteObject} from 'react-router';

export interface Paths {
    HOME: {
        id: string;
        path: string;
    },
    CATALOG: {
        id: string;
        path: string;
    },
    BASKET: {
        id: string;
        path: string;
    }
}


export const paths: Paths = {
    HOME:{
        id:'main',
        path: '/',
    },
    CATALOG:{
        id:'catalog',
        path: '/catalog',
    },
    BASKET:{
        id:'basket',
        path: '/basket',
    }
}

export const routes: RouteObject[] = [
    {
        ...paths.HOME,
        element: <MainPage />
    },
    {
        ...paths.CATALOG,
        element: <Catalog />
    },
    {
        ...paths.BASKET,
        element: <Basket />
    }
];

export default routes;