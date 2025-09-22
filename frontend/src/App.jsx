import { Routes, Route } from "react-router";
import Layout from "./components/commonLayouts/Layout"
import HomePage from "./pages/HomePage"
import ProductsListPage from "./pages/ProductsListPage"
import ProductDetailsPage from "./pages/ProductDetailsPage"
import CheckoutPage from "./pages/CheckoutPage"
import BlogPage from "./pages/BlogPage"
import ContactPage from "./pages/ContactPage"
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./firebase/firebaseconfig";
import { removeUser, setUser } from "./slices/authSlice";
import DashboardPage from "./pages/DashboardPage";
import DashboardLayout from "./components/commonLayouts/DashboardLayout";
import { getUserDocument } from "./firebase/firestoreService";
import SuccessPage from "./pages/SuccessPage"
import CancelPage from "./pages/CancelPage"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getUserDocument(user.uid);

          if (userDoc) {
            dispatch(setUser(userDoc));
          }
        }
        catch (e) {
          console.error(e.message);
        }
      }
      else {
        dispatch(removeUser());
      }
    })

    return () => unsubscribe();
  }, [dispatch])


  return (
    <>
      <ToastContainer position="top-right"
        autoClose={3000}
        // toastClassName="!fixed !top-5 !right-5 !z-[9999]"
        // bodyClassName="!text-sm !font-medium"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products-list" element={<ProductsListPage />} />
          <Route path="/product-details/:id" element={<ProductDetailsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;