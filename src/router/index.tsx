import routes from './routes';
import { Routes, Route } from 'react-router';

const RouterApplication = () => {
    return (
        <Routes>
            {routes.map((route) => (
                <Route id={route.id} key={route.id} path={route.path} element={route.element} />
            ))}
        </Routes>
    )
}

export default RouterApplication;