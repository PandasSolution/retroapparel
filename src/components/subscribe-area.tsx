"use client";

import { postData } from "@/api/api";
import { useState } from "react";

// props type
type IProps = {
  style_2?: boolean;
  style_3?: boolean;
};

const SubscribeArea = ({ style_2, style_3 }: IProps) => {
  const [toastMessage, setToastMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!email) {
        setToastMessage("Please enter email");
        return;
      }

      const resp = await postData(`/newsletters`, { email });

      if (!resp.success) {
        console.log(resp?.message);
        setToastMessage(resp?.message);
        return;
      }
      setToastMessage(resp?.message);
    } catch (error) {
      console.log(error as string);
      setToastMessage(error as string);
    } finally {
      setLoading(false);
      setEmail("");
      setTimeout(() => {
        setToastMessage("");
      }, 3000);
    }
  };

  return (
    <>
      <section
        className={`subscribe__area pb-100 ${
          style_2 ? "grey-bg box-m-15" : ""
        } ${style_3 ? "position-relative" : ""}`}
      >
        <div className={`container ${style_3 ? "custom-container" : ""}`}>
          <div
            className={`subscribe__inner ${
              style_2 ? "subscribe__inner-2 pt-120" : "pt-95"
            }`}
          >
            <div className="row">
              <div className="col-xl-8 offset-xl-2 col-lg-8 offset-lg-2">
                <div className="subscribe__content text-center">
                  <h2>Get Discount Info</h2>
                  <p>
                    Subscribe to the Retro Apparel mailing list to receive updates on
                    new arrivals, special offers and other discount information.
                  </p>
                  <div className="subscribe__form">
                    <form onSubmit={handleSubmit}>
                      <input
                        type="email"
                        placeholder="Subscribe to our newsletter..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {loading ? (
                        <button className="os-btn os-btn-2 os-btn-3" disabled>
                          subscribing...
                        </button>
                      ) : (
                       <button className="subscribe-btn">
  Subscribe
</button>
                      )}
                    </form>

                    {toastMessage && (
                      <div
                        className="w-[100%] h-[20px] text-center py-2 my-3 text-black"
                        style={{ background: "#7fea7f" }}
                      >
                        {toastMessage}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SubscribeArea;
