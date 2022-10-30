import Button from "react-bootstrap/Button";
import { buttonVariant } from "../../../../constants/bootstrap-constants";
import { useAppDispatch } from "../../../../app/app-hooks";
import { setCollectionModalVisibility } from "../../../../app/collections/collections.slice";
import { useTranslation } from "react-i18next";

function CreateCollectionButton() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    dispatch(setCollectionModalVisibility(true));
  };

  return (
    <>
      <Button
        variant={buttonVariant}
        onClick={onClickHandler}
      >
        {t("collections:create-collection")}
      </Button>
    </>
  );
}

export default CreateCollectionButton;
