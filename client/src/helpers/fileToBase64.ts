export const fileToBase64 = (file: File | Blob): Promise<string> =>
   new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
         resolve(reader.result as string);
      };

      reader.onerror = reject;
   });
