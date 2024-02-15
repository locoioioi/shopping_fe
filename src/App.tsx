import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Root } from './pages/Root';
import { Homepage } from './pages/Homepage';
import { Login } from './pages/Login';
import { ProductPage } from './pages/ProductPage';
import { ProductDetail } from './pages/ProductDetail';
import { MissionPage } from './pages/MissionPage';
import { RequestPage } from './pages/RequestPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { ProfilePage } from './pages/ProfilePage';
import { Admin } from './pages/Admin';
import { MissionAdmin } from './pages/MissionAdmin';
import { OrderAdmin } from './pages/OrderAdmin';
import { CreateProduct } from './pages/CreateProduct';
import { CreateMission } from './pages/CreateMission';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'products',
        children: [
          {
            index: true,
            element: <ProductPage />
          },
          {
            path: ':productId',
            element: <ProductDetail />
          }
        ]
      },
      {
        path: 'missions',
        element: <MissionPage />
      },
      {
        path: "requests",
        element: <RequestPage />
      },
      {
        path: 'cart',
        element: <CartPage />
      },
      {
        path: "wishlist",
        element: <WishlistPage />
      },
      {
        path: "profile",
        element: <ProfilePage />
      },
      {
        path: "admin",
        element: <Admin />,
        children: [
          {
            path: "missions",
            element: <MissionAdmin />
          },
          {
            path: "orders",
            element: <OrderAdmin />
          },
          {
            path: "product",
            element: <CreateProduct />
          },
          {
            path: "missions/create",
            element: <CreateMission />
          }
        ]
      }
    ]
  }
]);

function App() {
  return (  
    <RouterProvider router={router} />
  );
}

export default App;
