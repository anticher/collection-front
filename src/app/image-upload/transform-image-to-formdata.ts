export const transformImageToFormdata = (image: File): FormData => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "vslfg49p");
  formData.append("cloud_name", "dxezgp8h3");
  return formData;
};
