
import { MdDashboard, MdGroup, MdInfoOutline, MdPerson, MdViewCarousel } from "react-icons/md";


const menuItems = [
    {
        label: "Dashboard",
        icon: MdDashboard,
        path: "/admin/dashboard",
    },
    {
        label: "User Management",
        icon: MdGroup,
        children: [
            {
                path: "/admin/users",
                label: "Users",
            },
            {
                path: "/admin/subadmin",
                label: "Sub Admins",
            },
        ],
    },
    {
        label: "Banners",
        icon: MdViewCarousel,
        path: "/admin/banners",
    },
    {
        label: "Profile",
        icon: MdPerson,
        path: "/admin/profile"
    },
    {
        label: "About",
        icon: MdInfoOutline,
        path: "/admin/about",
    },

];

export default menuItems;