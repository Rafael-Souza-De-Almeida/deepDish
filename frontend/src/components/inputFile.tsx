import { Upload } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface InputFileProps {
  handleSetFile: (file: File) => void;
}

export default function InputFile({ handleSetFile }: InputFileProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        setPreview(URL.createObjectURL(file));
        handleSetFile(file);
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="relative py-28 flex flex-col items-center justify-center w-full border-2 border-primary rounded-2xl cursor-pointer hover:bg-primary/10 transition-all">
        {preview ? (
          <div>
            <img
              src={preview}
              alt="Preview"
              className="h-96 w-full object-cover rounded-2xl"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="mb-3 w-10 h-10 text-primary" />
            <p className="mb-2 text-lg ">
              <span className="font-bold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-md">PNG, JPG or JPEG</p>
          </div>
        )}
        <input
          type="file"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>
    </div>
  );
}
