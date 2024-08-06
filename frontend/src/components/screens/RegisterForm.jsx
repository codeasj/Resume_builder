/* eslint-disable react/prop-types */
import Button from "../Button";
import Input, { IWraper } from "../Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "../../validations/Register";
import { FORM_ENUMS } from "./AuthForm";
import Heading from "../Headings";
import api from "../../api";
import { toast } from "react-hot-toast";

const RegisterForm = ({ setFormState }) => {
    const form = useForm({
        resolver: zodResolver(schema),
    });

    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
    } = form;

    async function submitHandler(data) {
        try {
            await api.post("/auth/register", data);

            toast.success("Account Created");

            setFormState(data.email);
        } catch (res) {
            toast.error(res?.response?.data?.message || "Request Failed");
        }
    }

    return (
        <>
            <div className="text-xl mb-6 flex justify-between items-center">
                <Heading>Register</Heading>
                <span
                    onClick={() => setFormState(FORM_ENUMS.LOGIN)}
                    className="cursor-pointer hover:underline"
                >
                    Login
                </span>
            </div>

            <form onSubmit={handleSubmit(submitHandler)}>
                <IWraper errors={errors} register={register}>
                    <Input label={"Name"} type="text" name="name" />
                    <Input label={"Phone"} type="number" name="phone" />
                    <Input label={"Email"} type="email" name="email" />
                </IWraper>

                <Button.Right
                    className={"my-7"}
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Processing..." : "Create Account"}
                </Button.Right>
            </form>
        </>
    );
};

export default RegisterForm;
