/* eslint-disable react/prop-types */
import Boy from "../../../assets/ak47.jpg";

const Layout2 = ({ profile }) => {
  if (!profile)
    return (
      <div className="w-full py-20 text-xl text-center">No Profile Found</div>
    );

  return (
    <div className="max-w-3xl mx-auto p-5">
      {/* Profile Section */}
      <div className="flex items-center space-x-4">
        <div className="w-28 h-28 rounded-full bg-gray-500 overflow-hidden object-cover">
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
        <div>
          <p className="text-2xl font-bold">{profile.basicDetail?.name}</p>
          <p className="text-gray-600">{profile.contactDetail?.phone}</p>
          <p className="text-gray-600">{profile.contactDetail?.email}</p>
        </div>
      </div>

      {/* Past Experience Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Past Experience</h2>
        <div className="mt-4 space-y-4">
          {profile.experiences?.map((exp) => {
            return (
              <div key={exp._id}>
                <p className="font-bold">{exp.position}</p>
                <p className="text-gray-600">
                  {exp.company}, &nbsp;{exp.startDate?.split("T")[0]} -&nbsp;
                  {exp.endDate?.split("T")[0] || "Present"}
                </p>
                <p className="text-gray-600">{exp.summary}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Qualifications Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Qualifications</h2>
        <div className="mt-4 space-y-4">
          {profile.qualifications?.map((qual) => {
            return (
              <div key={qual._id}>
                <p className="font-bold">{qual.degree} </p>
                <p className="text-gray-600">
                  {qual.college}, &nbsp;
                  {qual.startDate?.split("T")[0]} - &nbsp;
                  {qual.endDate?.split("T")[0] || "N/A"}
                </p>
                <p>{qual.cgpa}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skills Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="mt-4 space-y-2">
          {profile?.skills.map((skill) => {
            return (
              <span
                key={skill}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              >
                {skill}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Layout2;
