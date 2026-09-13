import {
    HiOutlineHome,
    HiOutlineNewspaper,
} from "react-icons/hi";

export const ADMIN_NAV = [
    {
        href: "/admin",
        label: "Dashboard",
        Icon: HiOutlineHome,
        exact: true,
    },
    {
        href: "/admin/blogs",
        label: "Blogs",
        Icon: HiOutlineNewspaper,
        exact: false,
    },
] as const;
