import { FC } from "react";
import { Navigate, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import { AdminPage, LoginPage, NotFoundPage, OrdersPage, RegisterPage } from "./pages";
import { MainLayout } from "./layouts";
import { RequiredAuthAdmin, RequiredAuthHome } from "./hoc";

const App: FC = () => {
    return (
        <Routes>
            <Route path='login' element={ <LoginPage /> } />
            <Route path='activate/:token' element={ <RegisterPage page='activate' /> } />
            <Route path='recovery/:token' element={ <RegisterPage page='recovery' /> } />
            <Route path='/' element={ <MainLayout /> }>
                <Route index element={ <Navigate to='/login' /> } />
                <Route path='/orders' element={
                    <RequiredAuthHome>
                        <OrdersPage />
                    </RequiredAuthHome>
                } />
                <Route path='/admin' element={
                    <RequiredAuthAdmin>
                        <AdminPage />
                    </RequiredAuthAdmin>
                } />
                <Route path='*' element={ <NotFoundPage /> } />
            </Route>
        </Routes>
    );
};

export default App;
