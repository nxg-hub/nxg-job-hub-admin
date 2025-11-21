import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProvider } from "../../../../Redux/ServiceProviderSlice";
import { toast } from "react-toastify";

const ViewServiceProvider = () => {
  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [providerVett, setProviderVett] = useState({});
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [loader, setLoader] = useState(false);
  const { provider } = useSelector((state) => state.providerSlice);
  useEffect(() => {
    const providers = provider?.find((t) => t.user.id === id);
    setProviderVett(providers || {});
  }, [id, provider]);

  const serviceProvider = providerVett?.serviceProvider;

  if (!serviceProvider) return <p>No data found</p>;

  const {
    firstName,
    lastName,
    email,
    education,
    additionalInfo,
    mainSkills,
    subSkills,
    preferredContactMethod,
    interests,
    city,
    state,
    address,
    zipCode,
    accountCreationDate,
    workExperiences,
    yearsOfExperience,
    profilePicture,
    portfolioLink,
    linkedInUrl,
    verified,
  } = serviceProvider;
  // Accept
  const handleAccept = async () => {
    setLoader(true);
    try {
      await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/v1/admin/serviceProvider/${id}/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
            Authorization: token.token,
          },
        }
      );
      toast.success("Service provider vetted successfully.");
      dispatch(fetchProvider({ page: 0, size: 100000 }));
      navigate("/vetting");
    } catch (err) {
      console.log(err);
      toast.error("Error occurred.");
    } finally {
      setLoader(false);
    }
  };

  // Reject
  const handleReject = async (e) => {
    e.preventDefault();
    if (!rejectionReason.trim()) {
      setErrMsg(true);
      return;
    }

    setLoader(true);
    try {
      await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/v1/admin/${id}/reject-serviceProvider-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
            Authorization: token.token,
          },
          body: JSON.stringify({ rejectionReason }),
        }
      );
      toast.success("Rejection successful.");
      dispatch(fetchProvider({ page: 0, size: 10000 }));
      navigate("/vetting");
    } catch {
      toast.error("Error occurred.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto h-screen overflow-y-scroll">
      <Link to="/vetting" className="flex items-center gap-2 text-black mb-6">
        <BsArrowLeft size={24} /> Back
      </Link>
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Service Provider Review</h1>

      {/* Profile Picture */}
      <Section title="Profile Picture">
        {profilePicture ? (
          <img
            src={profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        ) : (
          <p>No profile picture uploaded.</p>
        )}
      </Section>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => setShowAcceptModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded">
          Approve
        </button>
        <button
          onClick={() => setShowRejectForm(true)}
          className="bg-red-600 text-white px-4 py-2 rounded">
          Reject
        </button>
      </div>

      {/* Personal Info */}
      <Section title="Personal Information">
        <Item label="Name" value={`${firstName} ${lastName}`} />
        <Item label="Email" value={email} />
        <Item label="Address" value={`${address}, ${city}, ${state}`} />
        <Item label="ZIP Code" value={zipCode} />
        <Item label="Preferred Contact" value={preferredContactMethod} />
        <Item
          label="Account Created"
          value={new Date(accountCreationDate).toLocaleString()}
        />
      </Section>

      {/* Education */}
      <Section title="Education">
        <Item
          label="Highest Qualification"
          value={education?.highestQualification}
        />
        <Item label="School" value={education?.schoolName} />
        <Item label="Year" value={education?.schoolYear} />
        <Item label="Location" value={education?.schoolLocation} />
        <Item label="Description" value={education?.schoolDescription} />
      </Section>

      {/* Skills */}
      <Section title="Skills">
        <Item label="Main Skills" value={mainSkills?.join(", ")} />
        <Item label="Sub Skills" value={subSkills?.join(", ")} />
        <Item label="Interests" value={interests?.join(", ")} />
      </Section>

      {/* Work Experience */}
      <Section title="Work Experience">
        {workExperiences?.length === 0 && <p>No work experience provided.</p>}
        {workExperiences?.map((exp, index) => (
          <div key={index} className="mb-4 border rounded p-4">
            <Item label="Job Title" value={exp.jobTitle} />
            <Item label="Company" value={exp.companyName} />
            <Item label="Type" value={exp.employmentType} />
            <Item label="Location" value={exp.location} />
            <Item
              label="Duration"
              value={`${exp.startDate} → ${
                exp.endDate ? exp.endDate : "Present"
              }`}
            />
            <Item label="Description" value={exp.description} />
          </div>
        ))}
      </Section>

      {/* Additional Info */}
      <Section title="Additional Information">
        <Item label="Years of Experience" value={yearsOfExperience} />
        <Item label="Additional Info" value={additionalInfo} />
        <Item label="Verified" value={verified ? "Yes" : "No"} />
      </Section>

      {/* Links */}
      <Section title="Links">
        <Item label="LinkedIn" value={linkedInUrl || "Not provided"} />
        <Item label="Portfolio" value={portfolioLink || "Not provided"} />
      </Section>

      {/* Reject Modal */}
      {showRejectForm && (
        <>
          <form
            onSubmit={handleReject}
            className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="font-bold text-lg mb-2">Reason for Rejection</h2>

            <textarea
              className="border rounded-md p-2 w-full h-32"
              value={rejectionReason}
              onChange={(e) => {
                setRejectionReason(e.target.value);
                setErrMsg(false);
              }}
            />
            {errMsg && <p className="text-red-600">This field is required.</p>}

            <div className="flex justify-between mt-4">
              <button className="bg-blue-600 text-white py-2 px-4 rounded-md">
                {loader ? "Processing..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={() => setShowRejectForm(false)}
                className="bg-gray-400 text-white py-2 px-4 rounded-md">
                Cancel
              </button>
            </div>
          </form>

          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setShowRejectForm(false)}
          />
        </>
      )}

      {/* Accept Modal */}
      {showAcceptModal && (
        <>
          <div className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg text-center w-[90%] max-w-md">
            <h2 className="font-bold text-xl mb-4">
              Accept this Service Provider?
            </h2>

            <div className="flex justify-center gap-4">
              <button
                disabled={loader}
                onClick={handleAccept}
                className="bg-green-700 text-white py-2 px-6 rounded-md">
                {loader ? "Processing..." : "Yes"}
              </button>
              <button
                disabled={loader}
                onClick={() => setShowAcceptModal(false)}
                className="bg-gray-500 text-white py-2 px-6 rounded-md">
                No
              </button>
            </div>
          </div>

          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setShowAcceptModal(false)}
          />
        </>
      )}
    </div>
  );
};

/* Reusable Components */
const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-3">{title}</h2>
    <div className="grid gap-3">{children}</div>
  </div>
);

const Item = ({ label, value }) => (
  <div className="flex justify-between border-b pb-2">
    <span className="font-medium text-gray-600">{label}:</span>
    <span className="text-gray-800 max-w-[60%] text-right break-words">
      {value}
    </span>
  </div>
);

export default ViewServiceProvider;
