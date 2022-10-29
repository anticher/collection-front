import Button from "react-bootstrap/Button";
import { buttonVariant } from "../../../../../constants/bootstrap-constants";
import { useAppDispatch } from "../../../../../app/app-hooks";
import { setCollectionItemCreateModalVisibility } from "../../../../../app/collection-items/collection-items.slice";

function CreateCollectionItemButton() {
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    dispatch(setCollectionItemCreateModalVisibility(true));
  };

  return (
    <>
      <Button
        variant={buttonVariant}
        onClick={onClickHandler}
      >
        Create item
      </Button>
    </>
  );
}

export default CreateCollectionItemButton;
