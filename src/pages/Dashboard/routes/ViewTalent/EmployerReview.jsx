import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployer } from "../../../../Redux/EmployerSlice";
import avatar from "../../../../static/images/userIcon.png";
import { toast } from "react-toastify";

const EmployerReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = JSON.parse(window.localStorage.getItem("ACCESSTOKEN"));

  const [reasonForRejection, setReasonForRejection] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [loader, setLoader] = useState(false);

  const employers = useSelector((state) => state.EmployerSlice.employer) || [];
  const loading = useSelector((state) => state.EmployerSlice.loading);

  const [employerData, setEmployerData] = useState({});
  const { employer, user } = employerData;

  useEffect(() => {
    if (!employers.length) {
      dispatch(fetchEmployer({ page: 0, size: 1000 }));
    }
  }, [employers.length]);

  useEffect(() => {
    const found = employers.find((e) => e.employer.employerID === id);
    setEmployerData(found || {});
  }, [employers, id]);

  // Accept Employer
  const handleAccept = async () => {
    setLoader(true);
    try {
      await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/admin/employer/${id}/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
            Authorization: token.token,
          },
        }
      );
      toast.success("Employer vetted successfully.");
      dispatch(fetchEmployer({ page: 0, size: 10000 }));
      navigate("/vetting");
    } catch {
      toast.error("Error occurred.");
    } finally {
      setLoader(false);
    }
  };

  // Reject Employer
  const handleReject = async (e) => {
    e.preventDefault();
    if (!reasonForRejection.trim()) {
      setErrMsg(true);
      return;
    }

    setLoader(true);
    try {
      await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/v1/admin/${id}/reject-employer-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-nxg-header": import.meta.env.VITE_SECRET_KEY,
            Authorization: token.token,
          },
          body: JSON.stringify({ reasonForRejection }),
        }
      );
      toast.success("Rejection successful.");
      dispatch(fetchEmployer({ page: 0, size: 10000 }));
      navigate("/vetting");
    } catch {
      toast.error("Error occurred.");
    } finally {
      setLoader(false);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="p-6 h-screen overflow-y-scroll">
      <Link to="/vetting" className="flex items-center gap-2 text-black mb-6">
        <BsArrowLeft size={24} /> Back
      </Link>

      <div className="flex flex-col md:flex-row gap-10 w-[90%] mx-auto">
        {/* LEFT COLUMN */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6">Employer Review</h1>

          <Section title="Company Information">
            <Item label="Employer ID" value={employer?.employerID} />
            <Item label="Company Name" value={employer?.companyName} />
            <Item label="Position" value={employer?.position} />
            <Item label="Industry" value={employer?.industryType} />
            <Item label="Company Size" value={employer?.companySize} />
            <Item label="Company Phone" value={employer?.companyPhone} />
            <Item label="Address" value={employer?.companyAddress} />
            <Item
              label="Country / State"
              value={`${employer?.country}, ${employer?.state}`}
            />
            <Item
              label="Website"
              value={
                employer?.companyWebsite ? (
                  <a
                    href={employer.companyWebsite}
                    target="_blank"
                    className="text-blue-600">
                    Visit Site
                  </a>
                ) : (
                  "N/A"
                )
              }
            />
          </Section>

          <Section title="Documents">
            <Item
              label="Tax Clearance Certificate"
              value={
                employer?.taxClearanceCertificate ? (
                  <a
                    href={employer.taxClearanceCertificate}
                    target="_blank"
                    className="text-blue-600">
                    View Document
                  </a>
                ) : (
                  "N/A"
                )
              }
            />
            <Item
              label="CAC Certificate"
              value={
                employer?.caccertificate ? (
                  <a
                    href={employer.caccertificate}
                    target="_blank"
                    className="text-blue-600">
                    View Document
                  </a>
                ) : (
                  "N/A"
                )
              }
            />
            <Item
              label="Company Memorandum"
              value={
                employer?.companyMemorandum ? (
                  <a
                    href={employer.companyMemorandum}
                    target="_blank"
                    className="text-blue-600">
                    View Document
                  </a>
                ) : (
                  "N/A"
                )
              }
            />
          </Section>

          <Section title="Other Information">
            <Item label="Nationality" value={employer?.nationality} />
            <Item label="Company ZIP" value={employer?.zipCode} />
            <Item label="TIN" value={employer?.tin} />
            <Item label="Vacancies" value={employer?.vacancies?.join(", ")} />
            <Item
              label="Directors"
              value={employer?.namesOfDirectors?.join(", ")}
            />
            <Item label="Verified" value={employer?.verified ? "Yes" : "No"} />
          </Section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="md:w-[35%] bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <img
            src={user?.profilePicture || avatar}
            alt="Profile"
            className="rounded-full w-40 h-40 object-cover mb-4"
          />
          <h3 className="font-bold text-lg mb-2">
            {user?.firstName} {user?.lastName}
          </h3>

          <Section title="User Info (Account Holder)">
            <Item label="Email" value={user?.email} />
            <Item label="Phone" value={user?.phoneNumber} />
            <Item label="Gender" value={user?.gender} />
            <Item
              label="Registration Date"
              value={new Date(user?.registrationDate).toLocaleString()}
            />
            <Item
              label="Last Login"
              value={new Date(user?.lastLoginTime).toLocaleString()}
            />
          </Section>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setShowAcceptModal(true)}
              className="bg-green-700 text-white py-2 px-6 rounded-lg">
              Accept
            </button>

            <button
              onClick={() => setShowRejectForm(true)}
              className="bg-red-600 text-white py-2 px-6 rounded-lg">
              Reject
            </button>
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectForm && (
        <>
          <form
            onSubmit={handleReject}
            className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="font-bold text-lg mb-2">Reason for Rejection</h2>

            <textarea
              className="border rounded-md p-2 w-full h-32"
              value={reasonForRejection}
              onChange={(e) => {
                setReasonForRejection(e.target.value);
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
            <h2 className="font-bold text-xl mb-4">Accept this employer?</h2>

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
      {value || "N/A"}
    </span>
  </div>
);

export default EmployerReview;
