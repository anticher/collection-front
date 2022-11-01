import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { setCheckedIds } from "../../../app/admin/admin.slice";
import { useAppDispatch, useAppSelector } from "../../../app/app-hooks";
import {
  useGetUsersQuery,
  useRemoveUsersAdminRoleMutation,
  useRemoveUsersMutation,
  useSetBlockedUsersMutation,
  useSetUnblockedUsersMutation,
  useSetUsersAdminRoleMutation,
} from "../../../app/users/users.api-slice";
import { buttonVariant } from "../../../constants/bootstrap-constants";

function UsersTabButtons() {
  const { t } = useTranslation();

  const checkedIds = useAppSelector((state) => state.admin.checkedIds);
  const dispatch = useAppDispatch();

  const { refetch } = useGetUsersQuery();

  const [setBlockUsers] = useSetBlockedUsersMutation();
  const [setUnblockUsers] = useSetUnblockedUsersMutation();
  const [setUsersAdminRole] = useSetUsersAdminRoleMutation();
  const [removeUsersAdminRole] = useRemoveUsersAdminRoleMutation();
  const [removeUsers] = useRemoveUsersMutation();

  const clearChecksAndRefetch = () => {
    dispatch(setCheckedIds([]));
    refetch();
  };

  const onBlockHandler = async () => {
    await setBlockUsers({ ids: checkedIds });
    clearChecksAndRefetch();
  };

  const onUnblockHandler = async () => {
    await setUnblockUsers({ ids: checkedIds });
    clearChecksAndRefetch();
  };

  const onSetAdminHandler = async () => {
    await setUsersAdminRole({ ids: checkedIds });
    clearChecksAndRefetch();
  };

  const onRemoveAdminHandler = async () => {
    await removeUsersAdminRole({ ids: checkedIds });
    clearChecksAndRefetch();
  };

  const onDeleteHandler = async () => {
    await removeUsers({ ids: checkedIds });
    clearChecksAndRefetch();
  };

  return (
    <div className="mb-2 d-flex gap-1">
      <Button variant={buttonVariant} onClick={onSetAdminHandler}>
        {t("admin:make-admin")}
      </Button>
      <Button variant={buttonVariant} onClick={onRemoveAdminHandler}>
        {t("admin:make-user")}
      </Button>
      <Button variant={buttonVariant} onClick={onBlockHandler}>
        {t("admin:block")}
      </Button>
      <Button variant={buttonVariant} onClick={onUnblockHandler}>
        {t("admin:unblock")}
      </Button>
      <Button variant={buttonVariant} onClick={onDeleteHandler}>
        {t("admin:delete")}
      </Button>
    </div>
  );
}

export default UsersTabButtons;
