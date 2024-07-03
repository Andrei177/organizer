
export const closeModal = (
  setShowModal: (bool: boolean) => void,
  setIsEditing?: ((bool: boolean) => void),
  setEmpty?: (() => void),
) => {
  setShowModal(false);
  if (setIsEditing) {
    new Promise((res) =>
      setTimeout(() => {
        res(setIsEditing(false));
      }, 350)
    );
  }
  if (setEmpty) {
    setEmpty();
  }
};
