export const handleDeleteElement = <T extends { id: string }>(
  elements: T[],
  setElements: React.Dispatch<React.SetStateAction<T[]>>,
  elementIdToDelete: string
) => {
  const updatedElements = elements.filter(
    (element) => element.id !== elementIdToDelete
  );
  setElements(updatedElements);
};
