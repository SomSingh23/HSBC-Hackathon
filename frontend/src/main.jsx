import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import deferRoleChecking from "./deferRoleChecking.js";
import GoogleOAuth from "./GoogleOAuth.jsx";
import FraudDetection from "./FraudDetection.jsx";
import CustomerSegmentation from "./CustomerSegmentation.jsx";
import TotalSependInEachCat from "./TotalSependInEachCat.jsx";
import MerchantSpending from "./MerchentSpending.jsx";
import GenderBasedSpending from "./GenderSegmentation.jsx";
import PredictiveModeling from "./TransactionAmountModeling.jsx";
import TransactionForm from "./AddTransaction.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: deferRoleChecking,
  },
  {
    path: "/login/google/auth",
    element: <GoogleOAuth />,
    loader: deferRoleChecking,
  },
  {
    path: "/fraud/detection",
    element: <FraudDetection />,
    loader: deferRoleChecking,
  },
  {
    path: "/customer/segmentation",
    element: <CustomerSegmentation />,
    loader: deferRoleChecking,
  },
  {
    path: "total_spending_in_each_category",
    element: <TotalSependInEachCat />,
    loader: deferRoleChecking,
  },
  {
    path: "/merchant/spending",
    element: <MerchantSpending />,
    loader: deferRoleChecking,
  },
  {
    path: "/gender/segmentation",
    element: <GenderBasedSpending />,
    loader: deferRoleChecking,
  },
  {
    path: "/predictive/modeling",
    element: <PredictiveModeling />,
    loader: deferRoleChecking,
  },
  {
    path: "/add/transaction",
    element: <TransactionForm />,
    loader: deferRoleChecking,
  },
  {
    path: "*",
    element: <h1>404 Page Not Found</h1>,
  },
]);
createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="1046716752032-28rvh1r1374cvfk00uomnm1f2km1anag.apps.googleusercontent.com">
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
