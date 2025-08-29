"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
// internal
import { postData } from "@/api/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ErrorMsg from "../common/error-msg";

import { useCookies } from "next-client-cookies";

const LoginForm = () => {
  const cookies = useCookies();

  const [loading, setLoading] = useState<boolean>(false);
  const [showOtpScreen, setShowOtpScreen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [timer, setTimer] = useState<any>(30);

  type FormData = {
    email: string;
    // password: string;
    otp: string;
  };

  let schema: any;

  schema = showOtpScreen
    ? yup.object().shape({
        email: yup.string().required().email().label("Email"),
        // password: yup.string().required().min(6).label("Password"),
        otp: yup.string().label("Otp"),
      })
    : yup.object().shape({
        email: yup.string().required().email().label("Email"),
      });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  // useEffect(() => {
  //   const initiate = async () => {
  //     const resp = await fetchData({
  //       url: "/customer/brands",
  //       cache: "no-store",
  //     });

  //     // if (!resp?.success) {
  //     // }
  //   };

  //   initiate();
  // }, [showOtpScreen, loading]);

  useEffect(() => {
    if (timer < 1) {
      setTimer(0);
    }
  }, [timer]);

  useEffect(() => {
    let interval: any;
    if (showOtpScreen === true && timer < 31) {
      interval = setInterval(() => {
        setTimer((prev: any) => prev - 1);
      }, 1000);
    } else {
    }
    return () => clearInterval(interval);
  }, [showOtpScreen, timer]);

  const onSubmit = handleSubmit(async (data) => {
    // alert(JSON.stringify(data));
    // reset();

    setLoading(true);

    try {
      const createAccount = await postData(`/auth/send-login-otp`, {
        // roleId: "roleId",
        email: data?.email,
      });

      if (!createAccount?.success) {
        // toast?.error(
        //   createAccount?.message || "Something went wromg. Try again."
        // );
        // notifyError(
        //   createAccount?.message || "Something went wromg. Try again."
        // );
        setToastMessage(
          (createAccount?.message as string) || "Otp sending failed. Try again."
        );

        console.log(createAccount?.message);

        return;
      }

      // toast?.success(createAccount?.message);
      // notifySuccess(createAccount?.message);
      setToastMessage(createAccount?.message as string);
      console.log({ createAccount });
      setShowOtpScreen(true);
      setTimer(30);
      // reset();
      // const resp = await fetchData({
      //   url: "/customer/brands",
      //   cache: "no-store",
      // });
      await postData(`/auth/login-with-otp`, {
        // roleId: "roleId",
        email: data?.email,
        otp: Number(data?.otp),
      });

      // router.push("/");
    } catch (error) {
      // toast.error(error as string);
      // notifyError(error as string);
      setToastMessage((error as string) || "Internal Server Error");
      console.log(error as string);
    } finally {
      setLoading(false);
    }
  });

  const onSubmitOtp = handleSubmit(async (data) => {
    // alert(JSON.stringify(data));
    // reset();

    setLoading(true);

    try {
      const createAccount = await postData(`/auth/login-with-otp`, {
        // roleId: "roleId",
        email: data?.email,
        otp: Number(data?.otp),
      });

      if (!createAccount?.success) {
        // toast?.error(
        //   createAccount?.message || "Something went wromg. Try again."
        // );
        // notifyError(
        //   createAccount?.message || "Something went wromg. Try again."
        // );
        setToastMessage(
          (createAccount?.message as string) || "Login failed. Try again."
        );

        console.log(createAccount?.message);
        return;
      }

      // toast?.success(createAccount?.message);
      // notifySuccess(createAccount?.message);
      setToastMessage(createAccount?.message as string);
      console.log({ createAccount });
      // setShowOtpScreen(true);
      // reset();
      const { accessToken, ...otherinfo } = createAccount?.data;
      cookies.set("token", accessToken);
      cookies.set("userinfo", JSON.stringify(otherinfo));

      router.push("/");
    } catch (error) {
      // toast.error(error as string);
      // notifyError(error as string);
      setToastMessage((error as string) || "Internal Server Error");
      console.log(error as string);
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
      {toastMessage && (
        <div
          className="w-[100%] h-[20px] text-center py-2 my-3 text-black"
          style={{ background: "#7fea7f" }}
        >
          {toastMessage}
        </div>
      )}
      <form onSubmit={!showOtpScreen ? onSubmit : onSubmitOtp}>
        <div className="mb-20">
          <label htmlFor="email">
            Email Address <span>**</span>
          </label>
          <input
            id="email"
            {...register("email")}
            type="email"
            placeholder="Email address..."
            disabled={showOtpScreen}
          />
          <ErrorMsg msg={errors.email?.message!} />
        </div>
        {!showOtpScreen ? (
          <></>
        ) : (
          <div className="mb-20">
            <label htmlFor="otp">
              OTP <span>**</span>
            </label>
            <input
              id="otp"
              {...register("otp")}
              type="otp"
              placeholder="OTP..."
            />
            <ErrorMsg msg={errors.otp?.message!} />
          </div>
        )}

        {/* <div className='mb-20'>
          <label htmlFor="pass">Password <span>**</span></label>
          <input id="password" {...register("password")} type="password" placeholder="Enter password..." />
          <ErrorMsg msg={errors.password?.message!} />
        </div> */}

        <div className="login-action mb-20 fix">
          {showOtpScreen && timer < 31 && (
            <span className="log-rem f-left">
              {/* <input id="remember" type="checkbox" />
            <label htmlFor="remember">Remember me!</label> */}
              <p>
                Did not receive otp?{" "}
                <span
                  className="text-brown-500 font-bold cursor-pointer"
                  style={{ fontWeight: "bold" }}
                  onClick={() => (timer > 0 ? {} : loading ? {} : onSubmit())}
                >
                  {timer > 0
                    ? `Send Again in ${timer}s`
                    : loading
                    ? `Sending...`
                    : `Send Again`}
                </span>
              </p>
            </span>
          )}

          {/* <span className="forgot-login f-right">
            <a href="#">Lost your password?</a>
          </span> */}
        </div>
        {!showOtpScreen ? (
          <button className="os-btn w-100">
            {loading ? "Sending otp..." : "Send Otp"}
          </button>
        ) : (
          <button className="os-btn w-100">
            {loading ? "Please wait..." : "Login"}
          </button>
        )}
        <div className="or-divide">
          <span>or</span>
        </div>
        <Link href="/register" className="os-btn os-btn-black w-100">
          Signup Now
        </Link>
      </form>
    </>
  );
};

export default LoginForm;
