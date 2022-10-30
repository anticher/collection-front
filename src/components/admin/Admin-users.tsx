import { ChangeEvent, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  useGetUsersQuery,
  useRemoveUsersAdminRoleMutation,
  useRemoveUsersMutation,
  useSetBlockedUsersMutation,
  useSetUnblockedUsersMutation,
  useSetUsersAdminRoleMutation,
} from "../../app/users/users.api-slice";
import { buttonVariant } from "../../constants/bootstrap-constants";

function AdminUsers() {
  const { t } = useTranslation();

  const { data: users = [], refetch } = useGetUsersQuery();

  const [setBlockUsers] = useSetBlockedUsersMutation();
  const [setUnblockUsers] = useSetUnblockedUsersMutation();
  const [setUsersAdminRole] = useSetUsersAdminRoleMutation();
  const [removeUsersAdminRole] = useRemoveUsersAdminRoleMutation();
  const [removeUsers] = useRemoveUsersMutation();

  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  if (!users.length) return null;

  const checkBoxHandler = (e: ChangeEvent, id: string) => {
    const isChecked = (e.target as HTMLInputElement).checked;
    if (isChecked) {
      setCheckedIds([...checkedIds, id]);
    } else {
      const newCheckedIds = [...checkedIds].filter(
        (checkedId) => checkedId !== id
      );
      setCheckedIds(newCheckedIds);
    }
  };

  const onBlockHandler = async () => {
    await setBlockUsers({ ids: checkedIds });
    setCheckedIds([]);
    refetch();
  };

  const onUnblockHandler = async () => {
    await setUnblockUsers({ ids: checkedIds });
    setCheckedIds([]);
    refetch();
  };

  const onSetAdminHandler = async () => {
    await setUsersAdminRole({ ids: checkedIds });
    setCheckedIds([]);
    refetch();
  };

  const onRemoveAdminHandler = async () => {
    await removeUsersAdminRole({ ids: checkedIds });
    setCheckedIds([]);
    refetch();
  };

  const onDeleteHandler = async () => {
    await removeUsers({ ids: checkedIds });
    setCheckedIds([]);
    refetch();
  };

  return (
    <>
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
      <Table bordered size="sm" responsive>
        <thead>
          <tr>
            <th></th>
            <th>uuid</th>
            <th>{t("admin:username")}</th>
            <th>{t("admin:email")}</th>
            <th>{t("admin:role")}</th>
            <th>{t("admin:block-status")}</th>
            <th>{t("admin:create-date")}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Form.Check
                    checked={Boolean(
                      checkedIds.find((checkId) => checkId === user.id)
                    )}
                    onChange={(e) => checkBoxHandler(e, user.id)}
                  />
                </td>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.isBlocked ? "true" : "false"}</td>
                <td>{user.createDate}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default AdminUsers;
