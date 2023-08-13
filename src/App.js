import { useEffect, useState, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NotFound from "./pages/web/NotFound";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Skeleton from "@mui/material/Skeleton";
import TestVdo from "./pages/web/TestVdo";
import { QrUserTokenCheck } from "./service/qruser.service";
import Cookies from "js-cookie";
import { logout } from "./store/auth";

const WebHome = lazy(() => import("./pages/web/Home"));

function App() {
  const isQruser = useSelector((state) => state.auth.isQrUserLogin);
  console.log(isQruser);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    let email = Cookies.get("email") ? Cookies.get("email") : "null";
    let token = Cookies.get("token") ? Cookies.get("token") : "null";
    const api = async () => {
      const { message, status } = await QrUserTokenCheck(email, token);
      console.log(status);
      if (status === "error") {
        toast.error(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        Cookies.remove("email");
        Cookies.remove("token");
        dispatch(logout());
      }
    };
    api();

    if (window.innerWidth > 750) {
      setOpen(true);
    }
  }, []);

  return (
    <BrowserRouter>
      {/* <Routes>
    <Route path="/" element={<WebHome />} />
    </Routes> */}
      <ToastContainer />
      <Suspense
        fallback={
          <>
            <div className=" w-full h-[10vh] p-2">
              <Skeleton
                animation="wave"
                variant="rounded"
                sx={{ background: "gray", width: 1 }}
                height="9vh"
              />
            </div>
            <div className=" grid h-[87vh] grid-cols-6 gap-2 p-2">
              <div className=" col-span-1">
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  sx={{ background: "gray", width: 1 }}
                  height="88vh"
                />
              </div>
              <div className=" col-span-5">
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  sx={{ background: "gray", width: 1 }}
                  height="88vh"
                />
              </div>
            </div>
          </>
        }
      >
        <Routes>
          <Route path="/" element={<WebHome />} />
          <Route
            path="/test/qrcode"
            element={isQruser ? <TestVdo /> : <WebHome />}
          />
          <Route path="404" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
