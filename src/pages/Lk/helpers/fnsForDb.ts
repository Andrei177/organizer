import { openDB } from "idb";
import { ChangeEvent } from "react";

const dbPromise = openDB("image-store", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("images")) {
      db.createObjectStore("images");
    }
  },
});

export async function getImage() {
  const db = await dbPromise;
  return db.get("images", "uploaded-image");
}

export async function saveImage(base64String: string | ArrayBuffer | null) {
  const db = await dbPromise;
  return db.put("images", base64String, "uploaded-image");
}

export const handleImageChange = (
  e: ChangeEvent<HTMLInputElement>,
  setImage: (str: string | ArrayBuffer | null) => void
) => {
  if (e.target.files && e.target.files[0] !== null) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      // Сохранение изображения в IndexedDB
      saveImage(base64String).then(() => {
        setImage(base64String);
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }
};