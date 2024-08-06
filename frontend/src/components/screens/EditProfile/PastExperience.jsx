import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input, { IWraper } from "../../Input";
import Button from "../../Button";
import "./PastExperience.css";
import { authApi } from "../../../api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const schema = z.object({
  experiences: z.array(
    z.object({
      position: z.string().min(1, { message: "Position is required" }),
      company: z.string().min(1, { message: "Company is required" }),
      startDate: z.string().min(1, { message: "Start Date is required" }),
      endDate: z.string().optional(),
      isCurrentlyWorking: z.boolean().optional(),
      summary: z.string().max(300, "Summary can't exceed 300 characters"),
    })
  ),
});

const PastExperience = () => {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      experiences: [
        {
          position: "",
          company: "",
          startDate: "",
          endDate: "",
          isCurrentlyWorking: false,
          summary: "",
        },
      ],
    },
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = methods;

  const navigate = useNavigate();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await authApi.get(`/profile/experiences`);
        if (!data?.length) return;
        setValue(
          "experiences",
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

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await authApi.patch(`/profile/experiences`, [...data.experiences]);
      toast.success("Saved Successfully");
      navigate("/edit/qualification");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Request Failed");
    }
  };

  return (
    <div>
      <div className="header-container">
        <h2 className="heading">Past Experience</h2>
        <Button.Outline
          type="button"
          onClick={() =>
            append({
              position: "",
              company: "",
              startDate: "",
              endDate: "",
              isCurrentlyWorking: false,
              summary: "",
            })
          }
        >
          Add Experience
        </Button.Outline>
      </div>
      <div className="experiences-container">
        {fields.map((item, index) => {
          const currentlyWorking = watch(
            `experiences.${index}.isCurrentlyWorking`
          );
          const summary = watch(`experiences.${index}.summary`);

          return (
            <div key={item.id}>
              <IWraper errors={errors} register={register}>
                <div className="experience-grid p-4">
                  <Input
                    label="Position / Title"
                    name={`experiences.${index}.position`}
                    validation={{
                      required: "Position is required",
                    }}
                  />
                  <Input
                    label="Company"
                    name={`experiences.${index}.company`}
                    validation={{
                      required: "Company is required",
                    }}
                  />
                  <Input
                    label="Start Date"
                    name={`experiences.${index}.startDate`}
                    type="date"
                    validation={{
                      required: "Start Date is required",
                    }}
                  />
                  <Input
                    label="End Date"
                    name={`experiences.${index}.endDate`}
                    type="date"
                    disabled={currentlyWorking}
                  />
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      {...register(`experiences.${index}.isCurrentlyWorking`, {
                        onChange: () => {
                          setValue(`experiences.${index}.endDate`, "");
                        },
                      })}
                    />
                    Currently Working
                  </label>
                  <div className="textarea-wrapper">
                    <label>
                      <span className="font-semibold text-sm">Summary</span>
                      <textarea
                        className="p-2 border-primary border outline-none rounded-md w-full"
                        {...register(`experiences.${index}.summary`, {
                          maxLength: 300,
                        })}
                      />
                      <div className="char-counter">
                        {summary?.length || 0}/300
                      </div>
                    </label>
                  </div>
                  <Button.Outline type="button" onClick={() => remove(index)}>
                    Remove
                  </Button.Outline>
                </div>
              </IWraper>
            </div>
          );
        })}
      </div>
      <Button
        type="button"
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        Submit
      </Button>
    </div>
  );
};

export default PastExperience;
