
import React, { useState, useEffect } from "react";
import { Company } from "../types/types";
import { getCompany } from "../api/api";
import { useParams } from "react-router-dom";

const CompanyDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [company, setCompany] = useState<Company | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "team" | "review" | "updates"
  >("overview");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCompany(slug || "");
        setCompany(response.company);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleTabClick = (tab: "overview" | "team" | "review" | "updates") => {
    setActiveTab(tab);
  };

  if (!company) {
    return <div>No company data available</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 md:p-10">
      <div className="flex items-center">
        <div className="w-16 h-16 rounded-full bg-gray-200 mr-4">
          <img
            src={company.logo}
            alt={company.title}
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{company.title}</h2>
          <p className="text-gray-500">{company.tagline}</p>
          <div className="flex space-x-2 mt-2">
            {company.tags && company.tags.length > 0 ? (
              company.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span>No tags available</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 md:mt-10">
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            className={`pb-2 font-medium ${
              activeTab === "overview"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => handleTabClick("overview")}
          >
            Overview
          </button>
          <button
            className={`pb-2 font-medium ${
              activeTab === "team"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => handleTabClick("team")}
          >
            Team
          </button>
          <button
            className={`pb-2 font-medium ${
              activeTab === "review"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => handleTabClick("review")}
          >
            Review
          </button>
          <button
            className={`pb-2 font-medium ${
              activeTab === "updates"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => handleTabClick("updates")}
          >
            Updates
          </button>
        </div>

        <div className="mt-6 sm:mt-8 md:mt-10">
          {activeTab === "overview" && (
            <div>
              <h3 className="text-xl font-bold">About</h3>
              <p className="text-gray-700 mt-2">{company.description}</p>
            </div>
          )}
          {activeTab === "team" && (
            <div>
              <h3 className="text-xl font-bold">Team</h3>
              {/* Add team member information here */}
            </div>
          )}
          {activeTab === "review" && (
            <div>
              <h3 className="text-xl font-bold">Review</h3>
              {/* Add review information here */}
            </div>
          )}
          {activeTab === "updates" && (
            <div>
              <h3 className="text-xl font-bold">Updates</h3>
              {/* Add update information here */}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-xl font-bold">Prototype</h3>
          <p className="text-gray-700 mt-2">{company.stage}</p>
          <p className="text-gray-700 mt-2">{company.location}</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-xl font-bold">Tech Stack</h3>
          <ul className="text-gray-700 mt-2">
            {company.tech_stack && company.tech_stack.length > 0 ? (
              company.tech_stack.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))
            ) : (
              <li>No tech stack information available</li>
            )}
          </ul>
        </div>
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-xl font-bold">Spotlight</h3>
          <p className="text-gray-700 mt-2">Upvotes: {company.upvotes}</p>
          <p className="text-gray-700 mt-2">
            View: {/* Add view count here */}
          </p>
          <p className="text-gray-700 mt-2">
            Click: {/* Add click count here */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
