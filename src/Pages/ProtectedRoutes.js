import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const location = useLocation();
  const pathname = location.pathname
  const shopUser = useSelector(state => state.shop.shopUser)
  
  return (
          localStorage.getItem('token') ?
            pathname.includes('shop/manager') ?
              shopUser.id ?
                  <Outlet />
                : <Navigate to="/shop?user=me" />
            : <Outlet />
          : <Navigate to="/" />
  )
};

export default ProtectedRoutes;