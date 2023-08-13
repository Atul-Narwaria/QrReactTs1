import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { qrUserLogin } from "../../store/auth";
import { QrcodeUserLogin } from "../../service/qruser.service";



export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [Logintype, setLogintype] = useState("student");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const { code, message, status, token } = await QrcodeUserLogin(
      data.email,
      data.password
    );
    if (code === 200) {
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
      }else{
        Cookies.set("token", `${token}`);
        Cookies.set("email", `${message}`);
        dispatch(qrUserLogin());
      }
     
      // navigate("/admin", { replace: true });
    } else {
      toast.error("incorrect email/password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen content-center px-10 lg:px-2   w-full    ">
      <div
        className=" hidden lg:block h-screen relative"
        style={{
          background: `url('https://www.einfosoft.com/templates/admin/smartangular/source/light/assets/images/pages/bg-01.png')  center `,
        }}
      ></div>
      <div className="mx-[1rem] lg:mx-[8rem]   ">
        <h3 className=" text-[2rem] font-semibold mt-[2vh] ">
          Welcome to{" "}
          <span className=" text-blue-700 font-bold">studiorinternational</span>
        </h3>

        <div className="mt-[5vh] md:mt-[20vh]">
          <h3 className="py-[4vh] text-xl text-blue-700 font-bold">
            Login to continue..
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              variant="outlined"
              sx={{ width: "100%", marginBottom: "30px" }}
            >
              <InputLabel
                htmlFor="outlined-adornment-password"
                error={errors.email ? true : false}
              >
                email
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={"text"}
                {...register("email", { required: true })}
                aria-invalid={errors.email ? "true" : "false"}
                endAdornment={
                  <InputAdornment position="end">
                    <MdEmail color={errors.email ? "red" : ""} />
                  </InputAdornment>
                }
                label="email"
                error={errors.email ? true : false}
              />
              {errors.email?.type === "required" && (
                <p role="alert" className="input-error">
                  email is required
                </p>
              )}
            </FormControl>
            <FormControl
              variant="outlined"
              sx={{ width: "100%", marginBottom: "10px" }}
            >
              <InputLabel
                htmlFor="outlined-adornment-password"
                error={errors.password ? true : false}
              >
                password
              </InputLabel>
              <OutlinedInput
                error={errors.password ? true : false}
                id="outlined-adornment-password"
                {...register("password", { required: true, maxLength: 20 })}
                endAdornment={
                  <InputAdornment position="end">
                    <button
                      // aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      // onMouseDown={handleMouseDownPassword}
                      // edge="end"
                    >
                      {showPassword ? (
                        <FaEye color={errors.password ? "red" : ""} />
                      ) : (
                        <FaEyeSlash color={errors.password ? "red" : ""} />
                      )}
                    </button>
                  </InputAdornment>
                }
                label="Password"
                type={showPassword ? "text" : "password"}
              />
              {errors.password?.type === "required" && (
                <p role="alert" className="input-error">
                  password is required
                </p>
              )}
            </FormControl>
            <button
              onClick={() => handleSubmit(onSubmit)}
              className=" bg-blue-700 text-white text-md w-full p-3 hover:bg-blue-800 hover:shadow-xl duration-500 rounded-lg"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
