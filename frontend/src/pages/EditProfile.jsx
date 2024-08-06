import { Outlet, NavLink } from "react-router-dom";

const EditProfile = () => {
    // Array of tabs
    const tabs = [
        { id: "basic", label: "Basic Details" },
        { id: "contact", label: "Contact Details" },
        { id: "experience", label: "Past Experience" },
        { id: "qualification", label: "Qualification" },
        { id: "skills", label: "Skills" },
    ];

    return (
        <div className="p-6 pt-1">
            <div className="flex justify-center">
                <ul className="flex bg-blue-300 p-6 px-2 rounded-full gap-3 w-fit">
                    {tabs.map((tab) => (
                        <li key={tab.id}>
                            <NavLink
                                to={tab.id}
                                className={({ isActive }) =>
                                    `p-4 rounded-full font-medium text-base cursor-pointer ${
                                        isActive ? "bg-blue-500 text-white" : ""
                                    }`
                                }
                            >
                                {tab.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Render content based on active tab */}
            <div className="mt-4">
                <Outlet />
            </div>
        </div>
    );
};

export default EditProfile;
