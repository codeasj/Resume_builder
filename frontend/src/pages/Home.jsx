import Layout1 from "../components/screens/Home/Layout1";
import Layout2 from "../components/screens/Home/Layout2";
import Layout3 from "../components/screens/Home/Layout3";
import { DesignContext } from "../contexts/DesignIndexContext";
import { useContext, useEffect, useState } from "react";
import { authApi } from "../api";
import { toast } from "react-hot-toast";

const Home = () => {
    const { designIndex } = useContext(DesignContext);
    const [profile, setProfile] = useState();

    useEffect(() => {
        (async () => {
            try {
                const {
                    data: { data },
                } = await authApi.get("/profile");
                setProfile(data);
            } catch (error) {
                toast.error("Could not fetch data");
            }
        })();
    }, []);

    function renderDesign(index) {
        switch (index) {
            case 0:
                return <Layout1 profile={profile} />;
            case 1:
                return <Layout2 profile={profile} />;
            case 2:
                return <Layout3 profile={profile} />;
        }
    }

    return renderDesign(designIndex);
};

export default Home;
