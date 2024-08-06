import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input, { IWraper } from "../../Input";
import Button from "../../Button";
import { authApi } from "../../../api";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  qualifications: z.array(
    z.object({
      degree: z.string().min(1, { message: "Degree is required" }),
      college: z.string().min(1, { message: "College Name is required" }),
      startDate: z.string().min(1, { message: "Start Date is required" }),
      endDate: z.string().optional(),
      cgpa: z.string().optional(),
    })
  ),
});

const QualificationForm = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      qualifications: [
        {
          degree: "",
          college: "",
          startDate: "",
          endDate: "",
          cgpa: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "qualifications",
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await authApi.patch(`/profile/qualifications`, [...data.qualifications]);
      toast.success("Saved Successfully");
      navigate("/edit/skills");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Request Failed");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await authApi.get(`/profile/qualifications`);
        if (!data?.length) return;
        setValue(
          "qualifications",
          data?.map((item) => ({
            ...item,
            startDate: item.startDate?.split("T")[0],
            endDate: item.endDate?.split("T")[0] || "",
          }))
        );
      } catch (error) {
        toast.error("Could not fetch data");
      }
    })();
  }, [setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Qualifications</h2>
        <Button.Outline
          type="button"
          onClick={() =>
            append({
              degree: "",
              college: "",
              startDate: "",
              endDate: "",
              cgpa: "",
            })
          }
        >
          Add Qualification
        </Button.Outline>
      </div>
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="p-4 border border-gray-300 rounded-md mb-4 xl:mb-0"
          >
            <IWraper errors={errors} register={register}>
              <Input
                label="Degree"
                name={`qualifications.${index}.degree`}
                validation={{
                  required: "Degree is required",
                }}
              />
              <Input
                label="College Name"
                name={`qualifications.${index}.college`}
                validation={{
                  required: "College Name is required",
                }}
              />
              <Input
                label="Start Date"
                name={`qualifications.${index}.startDate`}
                type="date"
                validation={{
                  required: "Start Date is required",
                }}
              />
              <Input
                label="End Date"
                name={`qualifications.${index}.endDate`}
                type="date"
              />
              <Input
                label="CGPA"
                name={`qualifications.${index}.cgpa`}
                type="text"
                validation={{
                  pattern: {
                    value: /^\d+(\.\d+)?$/,
                    message: "CGPA must be a number",
                  },
                }}
              />
              <Button.Outline onClick={() => remove(index)} type="button">
                Remove
              </Button.Outline>
            </IWraper>
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-4">
        Submit
      </Button>
    </form>
  );
};

export default QualificationForm;
