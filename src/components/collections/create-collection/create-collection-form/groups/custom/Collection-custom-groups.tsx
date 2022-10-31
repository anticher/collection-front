import CollectionCustomGroup from "./Collection-custom-group";

type CollectionCustomGroupsProps = {
  customInputs: string[];
};

function CollectionCustomGroups({ customInputs }: CollectionCustomGroupsProps) {
  return (
    <>
      {customInputs.map((_customInput, index) => {
        return <CollectionCustomGroup key={index} index={index} />;
      })}
    </>
  );
}

export default CollectionCustomGroups;
