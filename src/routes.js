import { useState, useEffect } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/Auth/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import { UserAdd, UserDetails, UserList, ManagerProfileScreen as ManagerProfile } from './pages/User';
import { ManufacturerList, ManufacturerAdd, ManufacturerEdit } from './pages/Manufacturer';
import { SupplierAdd, SupplierEdit, SupplierList } from './pages/Supplier';
import { CategoryAdd, CategoryEdit, CategoryList } from './pages/Category';
import { ClientList } from './pages/Client';
import { OrderList } from './pages/Order';
import { ProductAdd, ProductEdit, ProductList } from './pages/Product';
import { UnitAdd, UnitEdit, UnitList } from './pages/Unit';

// ----------------------------------------------------------------------

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component }) => {
  const [isAutheticated, setIsAutheticated] = useState(true);

  useEffect(() => {
    try {

      const token = localStorage.getItem("TOKEN");

      if (token?.length <= 1) {
        throw new Error('Token not found');
      }

      const decoded = jwtDecode(token);

      if (decoded && decoded.Profile === 'ADMINISTRATOR') {
        setIsAutheticated(true);
      } else {
        setIsAutheticated(false);
      }

    } catch (error) {
      console.log('User not logged');
      setIsAutheticated(false);
    }
  }, []);

  return isAutheticated ? <Component /> : <Navigate to="/login" />;
};


export default function Router() {
  const routes = useRoutes([
    {
      path: '/app',
      element: <PrivateRoute component={DashboardLayout} />,
      children: [
        { path: 'dashboard', element: <PrivateRoute component={DashboardAppPage} /> },
        { path: 'user', element: <PrivateRoute component={UserList} /> },
        { path: 'user/add', element: <PrivateRoute component={UserAdd} /> },
        { path: 'user/details/:userId', element: <PrivateRoute component={UserDetails} /> },
        { path: 'manufacturer', element: <PrivateRoute component={ManufacturerList} /> },
        { path: 'manufacturer/add', element: <PrivateRoute component={ManufacturerAdd} /> },
        { path: 'manufacturer/edit/:manufacturerId', element: <PrivateRoute component={ManufacturerEdit} /> },
        { path: 'supplier', element: <PrivateRoute component={SupplierList} /> },
        { path: 'supplier/add', element: <PrivateRoute component={SupplierAdd} /> },
        { path: 'supplier/edit/:supplierId', element: <PrivateRoute component={SupplierEdit} /> },
        { path: 'category', element: <PrivateRoute component={CategoryList} /> },
        { path: 'category/add', element: <PrivateRoute component={CategoryAdd} /> },
        { path: 'category/edit/:categoryId', element: <PrivateRoute component={CategoryEdit} /> },
        { path: 'product', element: <PrivateRoute component={ProductList} /> },
        { path: 'product/add', element: <PrivateRoute component={ProductAdd} /> },
        { path: 'product/edit/:productId', element: <PrivateRoute component={ProductEdit} /> },
        { path: 'unit', element: <PrivateRoute component={UnitList} /> },
        { path: 'unit/add', element: <PrivateRoute component={UnitAdd} /> },
        { path: 'unit/edit/:unitId', element: <PrivateRoute component={UnitEdit} /> },
        { path: 'client', element: <PrivateRoute component={ClientList} /> },
        { path: 'order', element: <PrivateRoute component={OrderList} /> },             
        { path: 'profile', element: <PrivateRoute component={ManagerProfile} /> },
        { path: '/app', element: <Navigate to="/app/dashboard" /> },
      ],
    },
    {
      path: '/',
      element: <SimpleLayout />,
      children: [
        { path: 'login', element: <LoginPage />, },
        { path: '404', element: <Page404 /> },
        { path: '/', element: <Navigate to="/login" /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace />, },
  ]);

  return routes;
}
