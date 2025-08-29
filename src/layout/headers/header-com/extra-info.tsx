"use client";

import { useCookies } from "next-client-cookies";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ExtraInfo = ({ setLoading }: any) => {
  const cookies = useCookies();
  const router = useRouter();

  const extra_info =
    cookies.get("userinfo") && cookies.get("token")
      ? [
          {
            class: "my-account",
            title: "My Account",
            listItems: [
              { link: "/account", title: "Profile" },
              { link: "/wishlist", title: "Wishlist" },
              { link: "/cart", title: "Cart" },
              { link: "/checkout", title: "Checkout" },
              { link: "/login", title: "Logout" },
              // { link: "/register", title: "Create Account" },
            ],
          },
          // {
          //   class: "lang",
          //   title: "Language",
          //   listItems: [
          //     { link: "/", title: "English" },
          //     { link: "/", title: "France" },
          //     { link: "/", title: "Germany" },
          //     { link: "/", title: "Bangla" },
          //   ],
          // },
          // {
          //   class: "currency",
          //   title: "Currency",
          //   listItems: [
          //     { link: "/", title: "USD - US Dollar" },
          //     { link: "/", title: "EUR - Ruro" },
          //     { link: "/", title: "GBP - Britis Pound" },
          //     { link: "/", title: "INR - Indian Rupee" },
          //   ],
          // },
        ]
      : [
          {
            class: "my-account",
            title: "Signin/Signup",
            listItems: [
              // { link: "/wishlist", title: "Wishlist" },
              // { link: "/cart", title: "Cart" },
              // { link: "/checkout", title: "Checkout" },
              { link: "/login", title: "Login" },
              { link: "/register", title: "Create Account" },
            ],
          },
          // {
          //   class: "lang",
          //   title: "Language",
          //   listItems: [
          //     { link: "/", title: "English" },
          //     { link: "/", title: "France" },
          //     { link: "/", title: "Germany" },
          //     { link: "/", title: "Bangla" },
          //   ],
          // },
          // {
          //   class: "currency",
          //   title: "Currency",
          //   listItems: [
          //     { link: "/", title: "USD - US Dollar" },
          //     { link: "/", title: "EUR - Ruro" },
          //     { link: "/", title: "GBP - Britis Pound" },
          //     { link: "/", title: "INR - Indian Rupee" },
          //   ],
          // },
        ];

  const logout = () => {
    cookies?.remove("userinfo");
    cookies?.remove("token");
    router.replace("/login");
  };

  return (
    <ul className="extra-info">
      {extra_info.map((item, index) => (
        <li key={index}>
          <div className={`${item.class}`}>
            <div className="extra-title">
              <h5>{item.title}</h5>
            </div>
            <ul>
              {item.listItems.map((list, index) => (
                <li
                  key={index}
                  onClick={() => {
                    if (list?.title === "Logout") {
                      logout();
                    }
                  }}
                >
                  <Link
                    href={`${list.link}`}
                    onClick={() => setLoading(true)}
                  >{`${list.title}`}</Link>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ExtraInfo;
