/* eslint-disable react/prop-types */
import Boy from "../../../assets/ak47.jpg";

const Layout1 = ({ profile }) => {
  if (!profile)
    return (
      <div className="w-full py-20 text-xl text-center">No Profile Found</div>
    );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        <div className="w-28 h-28 rounded-full bg-gray-500 overflow-hidden">
          <img
            src={
              `${import.meta.env.VITE_ASSETS_URL}/${
                profile.basicDetail?.image
              }` || Boy
            }
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-xl font-bold mt-4">{profile.basicDetail?.name}</h1>
        <p className="text-gray-600">{profile.contactDetail?.phone}</p>
        <p className="text-gray-600">{profile.contactDetail?.email}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Past Experience</h2>
        {profile.experiences?.map((exp, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-semibold">{exp.company}</h3>
            <p className="text-gray-600">{exp.position}</p>
            <p className="text-gray-500">
              {exp.startDate?.split("T")[0]} -{" "}
              {exp.endDate?.split("T")[0] || "Present"}
            </p>
            <p className="text-gray-700">{exp.summary}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Qualifications</h2>
        <ul className="list-disc list-inside">
          {profile.qualifications?.map((qualification, index) => (
            <li key={index} className="text-gray-700">
              {qualification.degree}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        <ul className="flex flex-wrap gap-2">
          {profile?.skills?.map((skill, index) => (
            <li
              key={index}
              className="bg-gray-200 px-4 py-2 rounded-lg text-gray-700"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Layout1;
