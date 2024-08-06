import { useEffect } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { FaTrashAlt } from "react-icons/fa";
import Input, { IWraper } from "../../Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { authApi } from "../../../api";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email("Email is required"),
  phone: z
    .string()
    .regex(/^\d+$/, { message: "Phone must contain only numbers (0-9)" }),
  socialUrls: z.array(z.string()).optional()
});

const ContactDetails = () => {
  const methods = useForm({
    defaultValues: {
      socialUrls: [],
    },
    resolver: zodResolver(schema),
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = methods;

  const {
    fields,
    append: appendSocialMedia,
    remove: removeSocialMedia,
  } = useFieldArray({
    control,
    name: "socialUrls",
  });

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await authApi.get(`/profile/contactDetail`);
        if (!data) return;
        setValue("email", data.email);
        setValue("phone", data.phone);
        setValue("socialUrls", data.socialUrls || []);
      } catch (error) {
        toast.error("Could not fetch data");
      }
    })();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await authApi.patch(`/profile/contactDetail`, { ...data });
      toast.success("Saved Successfully");
      navigate("/edit/experience");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Request Failed");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-bold my-6">Contact Details</h2>

        <IWraper errors={errors} register={register}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input name={"email"} type="email" label={"Email"}></Input>
            <Input name={"phone"} type="tel" label={"Phone"}></Input>
          </div>
        </IWraper>

        <div className="border-t border-gray-300 mt-6 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Social Media</h2>
            <button
              type="button"
              onClick={() => appendSocialMedia("")}
              className="text-blue-500 hover:text-blue-700"
            >
              Add URL
            </button>
          </div>
          <div className="space-y-4 mt-4">
            {fields.map((item, index) => (
              <div key={item.id} className="flex items-center space-x-4 flex-1">
                <IWraper register={register} errors={errors}>
                  <Input
                    name={`socialUrls.${index}`}
                    type="text"
                    placeholder="Social Media URL"
                    labelClass="flex-1"
                  />
                </IWraper>
                <FaTrashAlt
                  onClick={() => removeSocialMedia(index)}
                  className="text-red-500 cursor-pointer"
                  title="Remove URL"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </FormProvider>
  );
};

export default ContactDetails;
