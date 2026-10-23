import React from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { MdAdd, MdViewCarousel } from "react-icons/md";

// Components
import Image from "../../components/media/Image";
import PageHeader from "../../components/PageHeader";
import Switch from "../../components/forms/Switch";
import TableToolbar from "../../components/table/TableToolbar";
import Table from "../../components/table/Table";
import TableActionsButtons from "../../components/table/TableActionButtons";
import EmptyState from "../../components/EmptyState";

// Modal screens
import BannerForm from "../../modalScreens/admin/BannerForm";
import ViewBanner from "../../modalScreens/admin/ViewBanner";
import Confirmation from "../../modalScreens/Confirmation";

// Hooks
import { useAdminBanners, useUpdateBanner, useDeleteBanner, } from "../../hooks/admin/useAdminBanners";

// Store
import useModalStore from "../../store/modalStore";

// Utils
import { toastify } from "../../utils/toastify";

const Banners = () => {

    const { openModal, closeModal, setActionLoading } = useModalStore();
    const [searchParams, setSearchParams] = useSearchParams();

    const searchValues = { title: searchParams.get("search") || "", };

    const filterValues = { status: searchParams.get("status") || "", };

    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const pageSize = Math.max(1, Number(searchParams.get("limit")) || 10);

    const [debouncedSearch] = useDebounce(searchValues.title, 500);

    const params = {
        ...(debouncedSearch.trim() && { search: debouncedSearch.trim() }),
        ...(filterValues.status && { status: filterValues.status }),
        page,
        limit: pageSize,
    };

    const { data, isLoading, isError } = useAdminBanners(params);
    const { mutate: deleteBanner } = useDeleteBanner();
    const { mutate: updateBanner } = useUpdateBanner();

    const banners = data?.results?.banners || [];
    const totalBanners = data?.results?.totalBanners || 0;
    const totalPages = Math.max(1, Math.ceil(totalBanners / pageSize));

    const updateParams = (updates) => {
        setSearchParams((previous) => {
            const next = new URLSearchParams(previous);

            Object.entries(updates).forEach(([key, value]) => {
                if (value === "" || value === null || value === undefined) {
                    next.delete(key);
                } else {
                    next.set(key, String(value));
                }
            });

            return next;
        });
    };

    const handleSearchChange = (key, value) => { updateParams({ search: value, page: 1 }); };

    const handleFilterChange = (key, value) => { updateParams({ status: value, page: 1 }); };

    const handleReset = () => { setSearchParams({}); };

    const handlePageChange = (nextPage) => { updateParams({ page: nextPage }); };

    const handlePageSizeChange = (size) => { updateParams({ limit: size, page: 1 }); };

    const isResetDisabled = !searchValues.title && !filterValues.status
        && !searchParams.has("page") && !searchParams.has("limit");

    // add banner
    const handleAddBanner = () => {
        const formId = "banner-form";

        openModal({
            icon: MdViewCarousel,
            title: "Add Banner",
            content: <BannerForm mode="add" formId={formId} />,
            size: "lg",
            formId,
            action: {
                label: "Add Banner",
                variant: "theme",
                loadingText: "Adding...",
            },
        });
    };

    // view banner
    const handleView = (banner) => {
        openModal({
            icon: MdViewCarousel,
            title: "Banner Details",
            content: <ViewBanner banner={banner} />,
            size: "lg",
        });
    };

    // edit banner
    const handleEdit = (banner) => {
        const formId = "banner-form";

        openModal({
            icon: MdViewCarousel,
            title: "Edit Banner",
            content: <BannerForm mode="edit" data={banner} formId={formId} />,
            size: "lg",
            formId,
            action: {
                label: "Save Changes",
                variant: "theme",
                loadingText: "Updating...",
            },
        });
    };

    // delete banner
    const handleDelete = (banner) => {
        openModal({
            icon: MdViewCarousel,
            title: "Delete Banner",
            content: (
                <Confirmation
                    message="Are you sure you want to delete this banner?"
                    data={banner.title}
                />
            ),
            action: {
                label: "Delete",
                variant: "danger",
                loadingText: "Deleting...",
                onClick: () => {
                    setActionLoading(true);

                    deleteBanner(banner._id, {
                        onSuccess: () => {
                            toastify.success("Banner deleted successfully");
                            closeModal();
                        },
                        onError: (error) => {
                            toastify.error(error?.message || "Failed to delete banner");
                        },
                        onSettled: () => setActionLoading(false),
                    });
                },
            },
        });
    };

    // banner status
    const handleBannerStatus = (banner, value) => {
        updateBanner(
            {
                id: banner._id,
                data: { isActive: value },
            },
            {
                onSuccess: () => { toastify.success(`Banner ${value ? "activated" : "deactivated"} successfully`); },
                onError: (error) => { toastify.error(error?.message || "Failed to update banner status"); },
            }
        );
    };

    const columns = [
        {
            key: "image",
            label: "Banner",
            render: (row) => (
                <Image
                    src={row.image}
                    alt={row.title}
                    className="h-11 w-20 rounded-md border border-slate-200 object-cover"
                />
            ),
        },
        {
            key: "title",
            label: "Title",
            minWidth: "150px",
            render: (row) => (
                <p className="font-semibold text-slate-800">{row.title}</p>
            ),
        },
        {
            key: "badge",
            label: "Badge",
            render: (row) => (
                <p className="font-semibold text-slate-500">{row?.badge}</p>
            ),
        },
        {
            key: "description",
            label: "Description",
            minWidth: "100px",
            render: (row) => (
                <p className="max-w-xs truncate text-sm text-slate-500" title={row.description}>
                    {row.description}
                </p>
            ),
        },
        {
            key: "order",
            label: "Order",
            render: (row) => (
                <span className="font-medium text-slate-600">{row.order}</span>
            ),
        },
        {
            key: "isActive",
            label: "Status",
            render: (row) => (
                <Switch
                    checked={row.isActive}
                    label={row.isActive ? "Active" : "Inactive"}
                    labelPosition="right"
                    onCheckedChange={(value) => handleBannerStatus(row, value)}
                    activeColor="bg-green-600"
                    size="sm"
                    ariaLabel={`Toggle ${row.title} status`}
                />
            ),
        },
        {
            key: "actions",
            label: "Actions",
            render: (row) => (
                <TableActionsButtons
                    row={row}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ),
        },
    ];

    if (isError) {
        return (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                Failed to load banners. Please try again.
            </div>
        );
    }

    return (

        <div className="space-y-5">

            <PageHeader
                titleIcon={MdViewCarousel}
                title="Banners"
                description="Manage promotional banners displayed on your platform."
                actionLabel="New Banner"
                actionIcon={MdAdd}
                actionVariant="theme"
                onClick={handleAddBanner}
            />

            <TableToolbar
                searchFields={[
                    {
                        key: "title",
                        type: "search",
                        label: "Search Banner",
                        placeholder: "Search by banner title...",
                    },
                ]}
                searchValues={searchValues}
                onSearchChange={handleSearchChange}
                filters={[
                    {
                        key: "status",
                        label: "Status",
                        placeholder: "All Status",
                        options: [
                            { label: "Active", value: "active" },
                            { label: "Inactive", value: "inactive" },
                        ],
                    },
                ]}
                filterValues={filterValues}
                onFilterChange={handleFilterChange}
                onReset={handleReset}
                isResetDisabled={isResetDisabled}
            />

            <Table
                columns={columns}
                data={banners}
                loading={isLoading}
                page={page}
                pageSize={pageSize}
                totalItems={totalBanners}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                emptyMessage={
                    <EmptyState
                        icon={MdViewCarousel}
                        size="sm"
                        title="No banners found"
                        description="No promotional banners match your search or filters."
                        variant="minimal"
                    />
                }
            />

        </div>
    );
};

export default Banners;