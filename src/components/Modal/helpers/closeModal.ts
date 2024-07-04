export const closeModal = (
  setShowModal: (bool: boolean) => void,
  setIsEditing?: (bool: boolean) => void,
  setEmpty?: () => void
) => {
  setShowModal(false);
  if (setIsEditing) {
    setTimeout(() => {
      setIsEditing(false);
    }, 350);
  }
  if (setEmpty) {
    setTimeout(() => {
      setEmpty();
    }, 350);
  }
};