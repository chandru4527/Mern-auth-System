import { useNavigate } from "react-router-dom";

// icons
import {
    MdEmail, MdLogout, MdPerson, MdPhone, MdLocationOn, MdCalendarToday,
    MdVerifiedUser, MdEdit, MdPhotoCamera, MdLockReset, MdLock,
} from "react-icons/md";

// components
import Button from "../components/Button";
import Loader from "../components/Loader";
import Image from "../components/media/Image";
import Badge from "../components/Badge";
import Container from "../components/Container";

// screens
import EditProfile from '../modalScreens/user/EditProfile';
import ChangePassword from '../modalScreens/user/ChangePassword';
import Confirmation from '../modalScreens/Confirmation';
import EditCoverImage from "../modalScreens/user/EditCoverImage";

// hooks
import { useCurrentUser, useLogout } from "../hooks/useAuth";

// store
import useModalStore from '../store/modalStore';

// utils
import { formatDate } from "../utils/formatters";
import { toastify } from '../utils/toastify';

const Profile = () => {

    const { openModal, closeModal, setActionLoading } = useModalStore();
    const navigate = useNavigate();

    const { data: user, isLoading } = useCurrentUser();
    const { mutate: logout, isPending: isLoggingOut } = useLogout();

    console.log(user);

    // edit profile
    const handleEditProfile = () => {
        const formId = 'edit-profile-form'
        openModal({
            title: "Edit Profile",
            size: "lg",
            icon: MdPerson,
            formId: formId,
            content: (<EditProfile user={user} formId={formId} />),
            action: {
                label: "Save Changes",
                variant: "themeDark",
                loadingText: "Saving Changes...",
            }
        })
    }

    // logout
    const handleLogout = () => {
        openModal({
            title: "Logout",
            icon: MdLogout,
            content: (
                <Confirmation
                    icon={MdLogout}
                    variant="danger"
                    title="Logout Account"
                    message="Are you sure you want to logout from your admin account?"
                />
            ),
            size: "md",
            action: {
                label: "Logout",
                variant: "danger",
                loading: isLoggingOut,
                loadingText: "Logging Out...",
                onClick: () => {
                    setActionLoading(true);
                    logout(undefined, {
                        onSuccess: () => {
                            closeModal();
                            toastify.success("Logged out successfully!");
                            navigate("/", { replace: true });
                        },
                        onError: (error) => {
                            setActionLoading(false);
                            toastify.error(
                                error?.message || "Failed to logout. Please try again."
                            );
                        },
                    });
                },
            },
        });
    };

    // change cover image
    const hanldeEditCoverImg = () => {
        openModal({
            title: "Edit Cover Image",
            icon: MdPhotoCamera,
            size: "lg",
            content: (<EditCoverImage user={user} />),
            showFooter: false
        })
    }

    // change password
    const handleChangePassword = () => {
        const formId = "change-password-form"
        openModal({
            title: "Change Password",
            icon: MdLock,
            content: <ChangePassword formId={formId} />,
            size: "md",
            formId: formId,
            action: {
                label: "Save Changes",
                variant: "themeDark",
                loadingText: "Saving Changes...",
            }

        });
    };

    if (isLoading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center px-4">
                <Loader variant="bars" color="green" size="md" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-[80vh] items-center justify-center px-4 py-10">
                <div className="w-full max-w-md p-5 text-center sm:p-8">
                    <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                        You're not logged in!
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
                        Please log in to view your profile, manage your personal
                        information, and access your account settings.
                    </p>
                    <div className="mt-6 flex justify-center">
                        <Button
                            type="button"
                            variant="themeDark"
                            icon={MdPerson}
                            iconPosition="start"
                            text="Login to Your Account"
                            onClick={() => navigate("/login")}
                        />
                    </div>
                    <p className="mt-5 text-xs text-gray-400">
                        Welcome back! We're happy to see you again.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen overflow-x-hidden bg-gray-50 pb-8 sm:pb-10">

            <div className="relative h-48 overflow-hidden sm:h-56 md:h-64 lg:h-80">

                <div className="relative h-full w-full bg-green-600">
                    <Image
                        src={user?.coverImage}
                        alt="Nature Landscape Banner"
                        className="h-full w-full object-cover object-center sm:object-center"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-black/30 via-black/15 to-transparent" />
                </div>

                <div className="absolute inset-x-0 bottom-6 mx-auto w-full max-w-7xl px-4 sm:bottom-8 sm:px-6 md:bottom-13 lg:px-8">
                    <div className="text-white">
                        <p className="text-xs font-medium text-emerald-100 sm:text-sm">
                            Account
                        </p>
                        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                            My Profile
                        </h1>
                        <p className="mt-2 max-w-xl text-xs leading-5 text-emerald-50 sm:text-sm md:text-base">
                            Manage your personal information and account settings.
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative z-10 mx-auto -mt-6 w-full max-w-7xl px-3 sm:-mt-8 sm:px-6 lg:-mt-10 lg:px-8">
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                    <div className="p-4 sm:p-6 lg:p-8">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
                                <div className="shrink-0">
                                    <div className="h-24 w-24 overflow-hidden rounded-xl border-4 border-white bg-gray-200 shadow-md sm:h-28 sm:w-28 md:h-32 md:w-32">
                                        <Image
                                            src={user?.profileImage}
                                            alt={user?.name || "Profile"}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                        <h2 className="wrap-break-word text-xl font-bold capitalize text-gray-900 sm:text-2xl md:text-3xl">
                                            {user?.name || "User"}
                                        </h2>
                                        {user?.isActive && (
                                            <Badge className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                                                <MdVerifiedUser className="text-sm" />
                                                Verified
                                            </Badge>
                                        )}
                                    </div>

                                    <p className="mt-1 break-all text-sm text-gray-500">
                                        @{user?.userName || "username"}
                                    </p>

                                    <div className="mt-3 flex flex-wrap items-center gap-2">
                                        <Badge variant="primary" className="capitalize">
                                            {user?.role || "user"}
                                        </Badge>
                                        <span className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-gray-700 sm:text-sm">
                                            <MdCalendarToday className="shrink-0 text-blue-600" />
                                            <span>
                                                Joined{" "}
                                                {user?.createdAt
                                                    ? formatDate(user.createdAt)
                                                    : "Recently"}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid w-full self-end grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:justify-start lg:w-auto lg:justify-end">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    icon={MdPhotoCamera}
                                    text="Change Cover Image"
                                    className="w-full sm:w-auto"
                                    onClick={hanldeEditCoverImg}
                                />
                                <Button
                                    type="button"
                                    variant="themeDark"
                                    icon={MdEdit}
                                    iconPosition="start"
                                    className="w-full sm:w-auto"
                                    text="Edit"
                                    onClick={handleEditProfile}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-5 w-full max-w-7xl px-3 sm:mt-8 sm:px-6 lg:px-8">
                <div className="grid min-w-0 grid-cols-1 items-stretch gap-4 sm:gap-6 lg:grid-cols-3">

                    <Container className="min-w-0 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:col-span-2">
                        <div className="mb-5 sm:mb-6">
                            <h3 className="text-base font-bold text-gray-900 sm:text-lg">
                                Personal Information
                            </h3>
                            <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                                Your personal details and contact information.
                            </p>
                        </div>

                        <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                            <div className="flex min-w-0 items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                                    <MdPerson className="text-xl text-gray-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs text-gray-500 sm:text-sm">
                                        Full Name
                                    </p>
                                    <p className="mt-1 wrap-break-word text-sm font-semibold capitalize text-gray-900">
                                        {user?.name || "Not provided"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex min-w-0 items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                                    <MdEmail className="text-xl text-blue-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs text-gray-500 sm:text-sm">
                                        Email Address
                                    </p>
                                    <p className="mt-1 break-all text-sm font-semibold text-gray-900">
                                        {user?.email || "Not provided"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex min-w-0 items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                                    <MdPhone className="text-xl text-emerald-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs text-gray-500 sm:text-sm">
                                        Mobile Number
                                    </p>
                                    <p className="mt-1 wrap-break-word text-sm font-semibold text-gray-900">
                                        {user?.mobile || "Not provided"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex min-w-0 items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50">
                                    <MdCalendarToday className="text-xl text-purple-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs text-gray-500 sm:text-sm">
                                        Date of Birth
                                    </p>
                                    <p className="mt-1 wrap-break-word text-sm font-semibold text-gray-900">
                                        {user?.dateOfBirth
                                            ? formatDate(user.dateOfBirth)
                                            : "Not provided"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex min-w-0 items-start gap-3 sm:col-span-2">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                                    <MdLocationOn className="text-xl text-orange-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs text-gray-500 sm:text-sm">
                                        Address
                                    </p>
                                    <p className="mt-1 wrap-break-word text-sm font-semibold text-gray-900">
                                        {user?.address || "Not provided"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Container>

                    <Container className="flex min-w-0 flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                        <div className="mb-5 sm:mb-6">
                            <h3 className="text-base font-bold text-gray-900 sm:text-lg">
                                Account Information
                            </h3>
                            <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                                Your account status and details.
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <p className="text-xs text-gray-500 sm:text-sm">
                                    Account Status
                                </p>
                                <div className="mt-2">
                                    <Badge
                                        variant={user?.isActive ? "success" : "danger"}
                                        className="capitalize"
                                    >
                                        {user?.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                            </div>

                            {/* <div>
                                <p className="text-xs text-gray-500 sm:text-sm">
                                    Member Since
                                </p>
                                <p className="mt-2 wrap-break-word text-sm font-semibold text-gray-900">
                                    {user?.createdAt
                                        ? formatDate(user.createdAt)
                                        : "Not available"}
                                </p>
                            </div> */}
                        </div>

                        <div className="mt-6 sm:mt-auto sm:pt-8 flex flex-col gap-3">

                            <Button
                                type="button"
                                variant="primary"
                                icon={MdLockReset}
                                text="Change Password"
                                className="w-full"
                                disabled={user?.uid}
                                onClick={handleChangePassword}
                            />


                            <Button
                                type="button"
                                variant="danger"
                                icon={MdLogout}
                                text="Logout"
                                onClick={handleLogout}
                                loading={isLoggingOut}
                                loadingText="Logging out..."
                                disabled={isLoggingOut}
                                className="w-full"
                            />
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default Profile;