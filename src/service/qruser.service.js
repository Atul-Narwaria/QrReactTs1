import instance from "./instance";
import Swal from "sweetalert2";

export const QrcodeUserLogin = async (email, password) => {
  try {
    const get = await instance.post("/qruser/login", {
      email,
      password,
    });
    return {
      code: 200,
      message: get.data.message,
      status: get?.data?.status,
      token: get.data.token,
    };
  } catch (e) {
    if (e.response.status == 401) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
    return { code: 400, message: e.message };
  }
};

export const QrUserTokenCheck = async (email, token) => {
  try {
    const get = await instance.post("/qruser/check_token", {
      email,
      token,
    });
    return { code: 200, message: get.data.message, status: get?.data?.status };
  } catch (e) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="/">back to home page?</a>',
    });

    return { code: 400, message: e.message };
  }
};
