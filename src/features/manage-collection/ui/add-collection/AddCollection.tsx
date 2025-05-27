import { FC, useState } from "react";
import "./AddCollection.scss";
import { Button } from "@shared/ui/button";
import { collectionApi, CollectionForm } from "@entities/collection";

export const AddCollection: FC = () => {
  const [addCollection] = collectionApi.useAddCollectionMutation();

  const [isCreate, setIsCreate] = useState<boolean>(false);

  const handleCreate = (title: string) => {
    addCollection(title);
    setIsCreate(false);
  };

  if (isCreate)
    return (
      <CollectionForm
        onCreate={handleCreate}
        onCancel={() => setIsCreate(false)}
      />
    );

  return <Button onClick={() => setIsCreate(true)}>+ Добавить</Button>;
};
