import Modal from "../Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useState } from "react";
import GodFatherLogo from "../../assets/the-godfather.svg";
import OTPForm from "./OTPForm";

// eslint-disable-next-line react-refresh/only-export-components
export const FORM_ENUMS = {
    LOGIN: "login",
    REGISTER: "register",
    OTP: "otp",
};

const AuthForm = () => {
    const [formState, setFormState] = useState(FORM_ENUMS.REGISTER);

    return formState === FORM_ENUMS.LOGIN ? (
        <Modal onClose={() => setFormState(FORM_ENUMS.REGISTER)}>
            <LoginForm></LoginForm>
        </Modal>
    ) : (
        <div className="bg-white 2xl:flex-[0.5] flex-[0.6] p-6 flex flex-col overflow-y-scroll">
            <h1 className="-translate-y-10 flex justify-center">
                <img src={GodFatherLogo} alt="" className="w-[13vw]" />
            </h1>
            {formState === FORM_ENUMS.REGISTER ? (
                <RegisterForm setFormState={setFormState} />
            ) : (
                <OTPForm
                    toLink={() => setFormState(FORM_ENUMS.REGISTER)}
                    email={formState}
                    linkText="New Registration ?"
                    hasPassword={true}
                    url={"verify"}
                />
            )}
        </div>
    );
};

export default AuthForm;
