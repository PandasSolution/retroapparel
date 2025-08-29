"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
// internal
import { postData } from "@/api/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { toast } from "react-toastify";
import ErrorMsg from "../common/error-msg";

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
// billingAddress: string;
//  country: string;
  city: string;
//  postalCode?: string;
};

const schema = yup.object().shape({
  name: yup.string().required().label("Name"),
  email: yup.string().required().email().label("Email"),
  phone: yup.string().required().label("Phone"),
  address: yup.string().required().label("Shipping Address"),
 // billingAddress: yup.string().required().label("Billing Address"),
//  country: yup.string().required().label("Country"),
  city: yup.string().required().label("City"),
//  postalCode: yup.string().label("Postal Code"),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const onSubmit = handleSubmit(async (data) => {
    // alert(JSON.stringify(data));

    setLoading(true);

    try {
      const createAccount = await postData(`/customer/auth/register`, {
        // roleId: "roleId",
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        address: data?.address,
        //billingAddress: data?.billingAddress,
       // country: data?.country,
        city: data?.city,
        //postalCode: data?.postalCode,
        image: "https://cdn-icons-png.flaticon.com/512/9368/9368192.png",
      });

      if (!createAccount?.success) {
        // toast?.error(
        //   createAccount?.message || "Something went wromg. Try again."
        // );
        // notifyError(
        //   createAccount?.message || "Something went wromg. Try again."
        // );
        setToastMessage(
          (createAccount?.message as string) ||
            "Something went wrong. Try again."
        );

        console.log(createAccount?.message);
        return;
      }

      // toast?.success(createAccount?.message);
      // notifySuccess(createAccount?.message);
      setToastMessage(createAccount?.message as string);
      console.log({ createAccount });
      // reset();

      router.push("/login");
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
      {/* <ToastContainer /> */}

      <form onSubmit={onSubmit}>
        <div className="mb-20">
          <label htmlFor="name">
            Fullname <span>**</span>
          </label>
          <input
            id="name"
            {...register("name")}
            type="text"
            placeholder="Enter name..."
          />
          <ErrorMsg msg={errors.name?.message!} />
        </div>

        <div className="mb-20">
          <label htmlFor="email">
            Email Address <span>**</span>
          </label>
          <input
            id="email"
            {...register("email")}
            type="email"
            placeholder="Email address..."
          />
          <ErrorMsg msg={errors.email?.message!} />
        </div>

        <div className="mb-20">
          <label htmlFor="phone">
            Phone <span>**</span>
          </label>
          <input
            id="phone"
            {...register("phone")}
            type="text"
            placeholder="Phone..."
          />
          <ErrorMsg msg={errors.phone?.message!} />
        </div>

        <div className="mb-20">
          <label htmlFor="address">
            Shipping Address <span>**</span>
          </label>
          <input
            id="address"
            {...register("address")}
            type="text"
            placeholder="Shipping Address..."
          />
          <ErrorMsg msg={errors.address?.message!} />
        </div>

        {/* <div className="mb-20">
          <label htmlFor="billingAddress">
            Billing Address <span>**</span>
          </label>
          <input
            id="billingAddress"
            {...register("billingAddress")}
            type="text"
            placeholder="Billing Address..."
          />
          <ErrorMsg msg={errors.billingAddress?.message!} />
        </div> */}
{/* 
        <div className="mb-20">
          <label htmlFor="country">
            Country <span>**</span>
          </label>
          <input
            id="country"
            {...register("country")}
            type="text"
            placeholder="Country..."
          />
          <ErrorMsg msg={errors.country?.message!} />
        </div> */}

        <div className="mb-20">
          <label htmlFor="city">
            City <span>**</span>
          </label>
          <input
            id="city"
            {...register("city")}
            type="text"
            placeholder="City..."
          />
          <ErrorMsg msg={errors.city?.message!} />
        </div>

        {/* <div className="mb-20">
          <label htmlFor="postalCode">
            Postal Code <span></span>
          </label>
          <input
            id="postalCode"
            {...register("postalCode")}
            type="text"
            placeholder="Postal Code..."
          />
        </div> */}

        {/* <div className="mb-20">
          <label htmlFor="pass">
            Password <span>**</span>
          </label>
          <input
            id="password"
            {...register("password")}
            type="password"
            placeholder="Enter password..."
          />
          <ErrorMsg msg={errors.password?.message!} />
        </div> */}

        <div className="login-action mb-20 fix">
          <span className="log-rem f-left">
            <input id="remember" type="checkbox" />
            <label htmlFor="remember">Remember me!</label>
          </span>
          {/* <span className="forgot-login f-right">
            <a href="#">Lost your password?</a>
          </span> */}
        </div>
        <button className="os-btn w-100" disabled={loading}>
          {loading ? "Please wait..." : "Register Now"}
        </button>
        {toastMessage && (
          <div
            className="w-[100%] h-[20px] text-center py-2 my-3 text-black"
            style={{ background: "#7fea7f" }}
          >
            {toastMessage}
          </div>
        )}
        <div className="or-divide">
          <span>or</span>
        </div>
        <Link href="/login" className="os-btn os-btn-black w-100">
          Login Now
        </Link>
      </form>
    </>
  );
};

export default RegisterForm;
