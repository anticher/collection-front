import { format } from "date-fns";
import { ChangeEvent } from "react";
import { Form, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { setCheckedIds } from "../../../app/admin/admin.slice";
import { useAppDispatch, useAppSelector } from "../../../app/app-hooks";
import { useGetUsersQuery } from "../../../app/users/users.api-slice";
import UsersTabButtons from "./Users-tab-buttons";

function UsersTab() {
  const { t } = useTranslation();

  const { data: users = [] } = useGetUsersQuery();

  const checkedIds = useAppSelector((state) => state.admin.checkedIds);
  const dispatch = useAppDispatch();

  if (!users.length) return null;

  const checkBoxHandler = (e: ChangeEvent, id: string) => {
    const isChecked = (e.target as HTMLInputElement).checked;
    if (isChecked) {
      dispatch(setCheckedIds([...checkedIds, id]));
    } else {
      const newCheckedIds = [...checkedIds].filter(
        (checkedId) => checkedId !== id
      );
      dispatch(setCheckedIds(newCheckedIds));
    }
  };

  return (
    <>
      <UsersTabButtons />
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
                <td>
                  {format(new Date(+user.createDate), "HH:mm:ss yyyy-MM-dd")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default UsersTab;
