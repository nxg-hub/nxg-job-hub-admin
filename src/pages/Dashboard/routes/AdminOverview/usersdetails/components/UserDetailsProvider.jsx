import React from "react";
import moment from "moment";
import CardBtn from "./CardBtn";
import avatar from "../../../../../../static/images/userIcon.png";

const UserDetailsProvider = ({ provider }) => {
  if (!provider) return null;

  const sp = provider.serviceProvider;
  const user = provider.user;

  return (
    <div className="px-6 pt-6 bg-white rounded-xl space-y-8 shadow-md border border-gray-100 h-screen overflow-y-scroll">
      {/* HEADER — Profile Image & Names */}
      <div className="flex items-start gap-6">
        {/* Profile Image */}
        <div className="relative">
          <img
            src={sp.profilePicture || user.profilePicture || avatar}
            alt={user.firstName}
            className="w-28 h-28 rounded-full object-cover shadow"
          />
        </div>

        {/* Basic Info */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {user.firstName} {user.lastName}
          </h2>

          <p className="text-gray-600">
            Email: <span className="font-medium">{user.email}</span>
          </p>

          <p className="text-gray-600">
            Phone:{" "}
            <span className="font-medium">{user.phoneNumber || "—"}</span>
          </p>

          <p className="text-gray-600">
            Registered:{" "}
            <span className="font-medium">
              {moment(user.registrationDate).format("DD MMM YYYY")}
            </span>
          </p>

          <p className="text-gray-600">
            Gender: <span className="font-medium">{user.gender}</span>
          </p>
        </div>
      </div>

      {/* ACTION BUTTON */}
      <div className="w-40">
        <CardBtn id={user.id} restrict={user.enabled} />
      </div>

      {/* SERVICE PROVIDER DETAILS */}
      <div className="border-t pt-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">
          Service Provider Details
        </h3>

        <div className="grid grid-cols-2 gap-6 text-sm">
          <DetailItem label="First Name" value={sp.firstName} />
          <DetailItem label="Last Name" value={sp.lastName} />

          <DetailItem
            label="Preferred Contact"
            value={sp.preferredContactMethod}
          />
          <DetailItem label="City" value={sp.city} />

          <DetailItem label="State" value={sp.state} />
          <DetailItem label="Address" value={sp.address} />

          <DetailItem
            label="Years of Experience"
            value={sp.yearsOfExperience}
          />
          <DetailItem
            label="Date Approved"
            value={
              sp.serviceProviderDateOfApproval
                ? moment(sp.serviceProviderDateOfApproval).format("DD MMM YYYY")
                : "Not Approved"
            }
          />
        </div>

        {/* SUBSKILLS */}
        {sp.subSkills?.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-800">Sub Skills</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {sp.subSkills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* MAIN SKILLS */}
        {sp.mainSkills?.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-800 mt-4">Main Skills</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {sp.mainSkills.map((mSkill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  {mSkill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ADDITIONAL INFO */}
        {sp.additionalInfo && (
          <div className="pt-3">
            <h4 className="font-semibold text-gray-800">Additional Info</h4>
            <p className="text-gray-700 mt-1">{sp.additionalInfo}</p>
          </div>
        )}

        {/* DOCUMENTS */}
        <div className="space-y-2 mt-6">
          <h4 className="font-semibold text-gray-800">Documents</h4>

          <DocLink title="Resume" url={sp.resume} />
          <DocLink title="Cover Letter" url={sp.coverletter} />
          <DocLink title="Portfolio Link" url={sp.portfolioLink} />
        </div>
      </div>
    </div>
  );
};

/* Helper Components */
const DetailItem = ({ label, value }) => (
  <p className="text-gray-600">
    <span className="font-medium text-gray-800">{label}:</span>{" "}
    <span>{value || "—"}</span>
  </p>
);

const DocLink = ({ title, url }) => (
  <p className="text-sm">
    <span className="font-medium">{title}: </span>
    {url ? (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 underline">
        View Document
      </a>
    ) : (
      <span className="text-gray-500">Not Provided</span>
    )}
  </p>
);

export default UserDetailsProvider;
