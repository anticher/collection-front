import Button from "react-bootstrap/Button";
import { buttonVariant } from "../../../../constants/bootstrap-constants";
import { useAppDispatch } from "../../../../app/app-hooks";
import { setCollectionItemCreateModalVisibility } from "../../../../app/collection-items/collection-items.slice";
import { useTranslation } from "react-i18next";

function CreateCollectionItemButton() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    dispatch(setCollectionItemCreateModalVisibility(true));
  };

  return (
    <Button variant={buttonVariant} onClick={onClickHandler}>
      {t("collections:create-item")}
    </Button>
  );
}

export default CreateCollectionItemButton;
