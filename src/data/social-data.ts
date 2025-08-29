export type ISocial = {
  link: string;
  icon: string;
  name: string;
};

const social_links: ISocial[] = [
  {
    link: "https://www.facebook.com/Strikebdofficial?mibextid=wwXIfr&rdid=vmojHEaNZm2GzlBz&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F15vGJ1u4T2%2F%3Fmibextid%3DwwXIfr#",
    icon: "fab fa-facebook-f",
    name: "Facebook",
  },
  {
    link: "http://twitter.com",
    icon: "fab fa-twitter",
    name: "Twitter",
  },
  // {
  //   link: "https://www.behance.net/",
  //   icon: "fab fa-behance",
  //   name: "Behance",
  // },
  // {
  //   link: "https://dribbble.com/",
  //   icon: "fab fa-dribbble",
  //   name: "Dribbble",
  // },
];

export default social_links;
