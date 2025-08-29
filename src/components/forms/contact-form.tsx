"use client";
import { postData } from "@/api/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ErrorMsg from "../common/error-msg";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const schema = yup.object().shape({
  name: yup.string().required().label("Name"),
  email: yup.string().required().email().label("Email"),
  subject: yup.string().required().min(5).label("Subject"),
  message: yup.string().required().label("Message"),
});

const ContactForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);

      const resp = await postData(`/contacts`, data);
      // alert(JSON.stringify(data))
      // console.log(data);

      if (!resp?.success) {
        setToastMessage(resp?.message);
        return;
      }

      setToastMessage(resp?.message);
      reset();
    } catch (error) {
      console.log(error as string);
      setToastMessage(error as string);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setToastMessage("");
      }, 4000);
    }
  });

  return (
    <>
      <form onSubmit={onSubmit} id="contact-form">
        <div className="row">
          <div className="col-xl-6 col-lg-6">
            <div className="contact__input">
              <label>
                Name <span className="required">*</span>
              </label>
              <input
                id="name"
                {...register("name")}
                placeholder="Name"
                type="text"
              />
              <ErrorMsg msg={errors.name?.message!} />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="contact__input">
              <label>
                Email <span className="required">*</span>
              </label>
              <input
                id="email"
                {...register("email")}
                type="email"
                placeholder="Email"
              />
              <ErrorMsg msg={errors.email?.message!} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="contact__input">
              <label>
                Subject <span className="required">*</span>
              </label>
              <input id="subject" {...register("subject")} type="text" />
              <ErrorMsg msg={errors.subject?.message!} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="contact__input">
              <label>
                Message <span className="required">*</span>
              </label>
              <textarea {...register("message")} cols={30} rows={10}></textarea>
              <ErrorMsg msg={errors.message?.message!} />
            </div>
          </div>
        </div>
        {toastMessage && (
          <div
            className="w-[100%] h-[20px] text-center py-2 my-3 text-black"
            style={{ background: "#7fea7f" }}
          >
            {toastMessage}
          </div>
        )}
        <div className="row">
          <div className="col-xl-12">
            <div className="contact__submit">
              {loading ? (
                <button type="submit" className="os-btn os-btn-black" disabled>
                  Sending...
                </button>
              ) : (
                <button type="submit" className="os-btn os-btn-black">
                  Send Message
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
