import React from "react";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";

// icons
import { MdGroup, MdPerson } from "react-icons/md";

// components
import Avatar from "../../components/Avatar";
import Badge from "../../components/Badge";
import Switch from "../../components/forms/Switch";
import PageHeader from "../../components/PageHeader";
import TableActionButtons from "../../components/table/TableActionButtons";
import TableToolbar from "../../components/table/TableToolbar";
import Table from "../../components/table/Table";
import EmptyState from "../../components/EmptyState";

// modal screens
import ViewUser from "../../modalScreens/admin/ViewUser";
import EditUserForm from "../../modalScreens/admin/EditUserForm";
import Confirmation from '../../modalScreens/Confirmation';

// hooks
import { useAllUsers, useEditUser, useDeleteUser } from "../../hooks/admin/useUsers";

// store
import useModalStore from '../../store/modalStore';

// utils
import exportToExcel from "../../utils/exportToExcel";
import { formatDate } from "../../utils/formatters";
import { toastify } from "../../utils/toastify";
import { size } from "zod";

const Users = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { openModal, closeModal, setActionLoading } = useModalStore();

  const searchValues = {
    name: searchParams.get("name") || "",
    email: searchParams.get("email") || "",
  };

  const filterValues = {
    status: searchParams.get("status") || "",
  };

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Math.max(1, Number(searchParams.get("limit")) || 10);

  const [debouncedName] = useDebounce(searchValues.name, 500);
  const [debouncedEmail] = useDebounce(searchValues.email, 500);

  const params = {
    name: debouncedName.trim(),
    email: debouncedEmail.trim(),
    status: filterValues.status,
    page,
    limit,
  };

  const { data, isLoading, isFetching, refetch } = useAllUsers(params);

  const { mutate: editUser } = useEditUser();
  const { mutate: deleteUser } = useDeleteUser();

  const users = data?.results?.users || [];
  const totalUsers = data?.results?.totalUsers || 0;
  const currentPage = data?.results?.currentPage || 1;
  const pageSize = data?.results?.limit || limit;

  const updateParams = (updates, options = {}) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      Object.entries(updates).forEach(([key, value]) => {
        if (value === "" || value === null || value === undefined) {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
      });

      return next;
    }, options);
  };

  const handleSearchChange = (key, value) => {
    updateParams({ [key]: value, page: null }, { replace: true });
  };

  const handleFilterChange = (key, value) => {
    updateParams({ [key]: value, page: null });
  };

  const handleReset = () => {
    setSearchParams({});
  };

  const handlePageChange = (nextPage) => {
    updateParams({ page: nextPage });
  };

  const handlePageSizeChange = (newLimit) => {
    updateParams({ limit: newLimit, page: 1 });
  };

  const handleExport = () => {
    if (!users.length) {
      toastify.error("No users available to export");
      return;
    }

    const exportData = users.map((user) => ({
      Name: user.name || "",
      Email: user.email || "",
      Username: user.userName || "",
      Mobile: user.mobile || "",
      Role: user.role || "",
      Status: user.isActive ? "Active" : "Inactive",
      "Created Date": user.createdAt ? formatDate(user.createdAt) : "",
    }));

    exportToExcel(exportData, "users.xlsx", "Users");
  };

  const handleStatusChange = (user, isActive) => {
    editUser(
      { id: user?._id, data: { isActive } },
      {
        onSuccess: () => {
          toastify.success("User status updated successfully");
        },
        onError: () => {
          toastify.error("Failed to update user status");
        },
      }
    );
  };

  const isResetDisabled =
    !searchValues.name &&
    !searchValues.email &&
    !filterValues.status &&
    !searchParams.has("page") &&
    !searchParams.has("limit");

  // view user
  const handleView = (data) => {
    openModal({
      icon: MdPerson,
      title: 'User details',
      size: "lg",
      content: (
        <ViewUser data={data} />
      ),
      action: {
        variant: "theme"
      }

    })
  }

  // edit user 
  const handleEdit = (data) => {
    const formId = "edit-user-form";

    openModal({
      icon: MdPerson,
      title: "Edit user",
      size: "lg",
      content: (<EditUserForm formId={formId} user={data} />),
      formId: formId,
      action: {
        label: "Save Changes",
        variant: "themeDark",
        loadingText: "Saving...",
      }
    })
  }

  // delete user
  const handleDelete = (data) => {
    openModal({
      icon: MdPerson,
      title: "Delete User",
      content: (
        <Confirmation
          message={`Are you sure you want to delete ${data.name}? This action cannot be undone.`}
          data={data.name}
        />
      ),
      action: {
        label: "Delete",
        variant: "danger",
        loadingText: "Deleting...",
        onClick: () => {
          setActionLoading(true)
          deleteUser(
            data?._id,
            {
              onSuccess: () => {
                closeModal();
                toastify.success("User deleted successfully!")
                setActionLoading(false)
              },
              onError: () => {
                toastify.error()
                setActionLoading(false)
              }
            }
          );
        },
      },
    });
  };

  const columns = [
    {
      key: "profileImage",
      header: "Profile Image",
      render: (row) => <Avatar src={row?.profileImage} size="sm" />,
    },
    {
      key: "name",
      header: "Name",
      render: (row) => (
        <p className="font-bold">{row?.name || "-"}</p>
      ),
    },
    {
      key: "email",
      header: "Email",
      nowrap: true,
      render: (row) => row?.email || "-",
    },
    {
      key: "userName",
      header: "Username",
      render: (row) => row?.userName || "-",
    },
    {
      key: "role",
      header: "Role",
      render: (row) => (
        <Badge variant="primary" text={row?.role} size="md" />
      ),
    },
    {
      key: "isActive",
      header: "Status",
      render: (row) => (
        <Switch
          label={row?.isActive ? "Active" : "Inactive"}
          checked={row?.isActive}
          onChange={(value) => handleStatusChange(row, value)}
          activeColor="bg-blue-600"
          size="sm"
        />
      ),
    },
    {
      key: "createdAt",
      header: "Join Date",
      nowrap: true,
      render: (row) => formatDate(row?.createdAt),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <TableActionButtons
          row={row}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">

      <PageHeader
        title="Users"
        description="Manage, view, and monitor all registered users."
        titleIcon={MdGroup}
        onRefresh={refetch}
      />

      <TableToolbar
        searchFields={[
          {
            key: "name",
            label: "Name",
            type: "search",
            placeholder: "Search by name",
          },
          {
            key: "email",
            label: "Email",
            type: "email",
            placeholder: "Search by email",
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
        onExport={handleExport}
      />

      <Table
        columns={columns}
        data={users}
        loading={isLoading || isFetching}
        pagination
        page={currentPage}
        pageSize={pageSize}
        total={totalUsers}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        rowKey="_id"
        emptyMessage={
          <EmptyState
            icon={MdPerson}
            size="sm"
            title="No Users Found"
            variant="minimal"
            description="No users found. Try adjusting your search or filters."
          />
        }
      />
    </div>
  );
};

export default Users;