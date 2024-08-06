import { useEffect, useState } from "react";
import Input, { IWraper } from "../../Input";
import Button from "../../Button";
import { FaUpload } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { authApi } from "../../../api";
import { useNavigate } from "react-router-dom";

const BasicDetails = () => {
  const [profileImage, setProfileImage] = useState(null);
  const form = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = form;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setValue("image", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await authApi.get(`/profile/basicDetail`);
        if (!data) return;
        data.image &&
          setProfileImage(
            new URL(`${import.meta.env.VITE_ASSETS_URL}/${data.image}`).href
          );
        setValue("image", data.image);
        setValue("name", data.name);
      } catch (error) {
        toast.error("Could not fetch data");
      }
    })();
  }, [setValue]);

  async function onSubmit(data) {
    try {
      const formData = new FormData();
      formData.append("image", data.image);
      formData.append("name", data.name);

      await authApi.post("/profile/basicDetail", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Saved Successfully");
      navigate("/edit/contact");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Request Failed");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md space-y-4">
      <div className="flex flex-col items-center">
        <label htmlFor="profileImage" className="cursor-pointer">
          <div
            className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden relative"
            style={{
              backgroundImage: `url(${profileImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!profileImage && <FaUpload className="text-gray-500 text-3xl" />}
          </div>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
        <div className="mt-4 flex gap-4 items-end">
          <IWraper
            register={register}
            validation={{ required: "Required Field" }}
            errors={errors}
          >
            <Input label="Name" name="name" type="text" />
          </IWraper>

          <div>
            <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
