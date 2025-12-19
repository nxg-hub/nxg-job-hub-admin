import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import icon from "../../../../../static/icons/mi_filter.svg";
import avatar from "../../../../../static/images/userIcon.png";
import { fetchFeaturedTalent } from "../../../../../Redux/FeaturedTalentSlice";

const FeaturedTalent = ({ onAddTalentClick }) => {
  const dispatch = useDispatch();

  const { featuredTalent, loading, page, totalPages } = useSelector(
    (state) => state.FeaturedTalent
  );

  const [selectedTalentId, setSelectedTalentId] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedTechStack, setSelectedTechStack] = useState("All");

  // 🔹 fetch when page changes
  useEffect(() => {
    dispatch(fetchFeaturedTalent({ page, size: 5 }));
  }, [dispatch, page]);

  const handlePageChange = ({ selected }) => {
    dispatch(fetchFeaturedTalent({ page: selected, size: 5 }));
    setSelectedTalentId(null);
  };

  const handleViewClick = (id) => {
    setSelectedTalentId((prev) => (prev === id ? null : id));
  };

  const uniqueTechStacks = [
    "All",
    ...new Set(featuredTalent.map((t) => t?.talentTechStack)),
  ];

  const filteredTalents =
    selectedTechStack === "All"
      ? featuredTalent
      : featuredTalent.filter((t) => t.talentTechStack === selectedTechStack);

  return (
    <div className="w-full p-4">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-5 h-[600px] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Featured Talents</h2>

          <div
            className="flex items-center gap-2 cursor-pointer bg-gray-100 px-3 py-2 rounded-lg"
            onClick={() => setFilterVisible(!filterVisible)}>
            <span className="font-semibold text-sm">Filter</span>
            <img src={icon} alt="Filter" className="w-4" />
          </div>
        </div>

        {/* Filter */}
        {filterVisible && (
          <div className="bg-gray-100 rounded-lg p-3 mb-4">
            {uniqueTechStacks.map((tech) => (
              <label key={tech} className="flex items-center gap-2 py-1">
                <input
                  type="radio"
                  checked={selectedTechStack === tech}
                  onChange={() => setSelectedTechStack(tech)}
                />
                {tech}
              </label>
            ))}
          </div>
        )}

        {/* Talent List */}
        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : (
          <div className="space-y-3">
            {filteredTalents.map((talent) => (
              <div key={talent.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img
                      src={talent.talentProfilePic || avatar}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold">{talent.talentName}</h3>
                      <p className="text-sm text-gray-600">
                        {talent.talentTechStack}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewClick(talent.id)}
                    className="text-blue-600">
                    {selectedTalentId === talent.id ? "Hide" : "View"}
                  </button>
                </div>

                {selectedTalentId === talent.id && (
                  <div className="mt-4 text-center">
                    <img
                      src={talent.talentProfilePic}
                      className="w-24 h-24 mx-auto rounded-full mb-3"
                    />
                    <a
                      href={talent.talentResume}
                      target="_blank"
                      className="text-sm text-white bg-[#2596be] px-4 py-2 rounded-lg inline-block">
                      View Resume
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <ReactPaginate
          pageCount={totalPages}
          onPageChange={handlePageChange}
          containerClassName="flex justify-center gap-2 mt-4"
          activeClassName="bg-[#2596be] text-white"
          pageClassName="px-3 py-1 border rounded"
          previousLabel="←"
          nextLabel="→"
        />

        {/* Add Talent */}
        <div className="mt-6 text-center">
          <button
            onClick={onAddTalentClick}
            className="bg-green-600 text-white px-5 py-2 rounded-lg">
            + Add Talent
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTalent;
