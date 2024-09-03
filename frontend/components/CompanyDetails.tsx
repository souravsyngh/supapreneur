import React from "react";
import { Company } from "../types/types";
import ProductStatusCard from "./CompanyInfo";
import ProductImageGrid from "./ProductImage";

interface CompanyInfoProps {
  company: Company;
  activeTab: "overview" | "team" | "review" | "updates";
  handleTabClick: (tab: "overview" | "team" | "review" | "updates") => void;
}

const productImages = [
  {
    id: "1",
    url: "https://ph-files.imgix.net/f4a677c2-6045-455e-8208-5a506982e075.jpeg",
    alt: "Product 1",
  },
  {
    id: "2",
    url: "https://ph-files.imgix.net/1912e55e-59cf-4913-a7a0-935c43f08929.jpeg",
    alt: "Product 2",
  },
  {
    id: "3",
    url: "https://ph-files.imgix.net/10426b64-8e61-42b7-9233-68e44acbfb02.jpeg",
    alt: "Product 3",
  },
];

const CompanyInfo: React.FC<CompanyInfoProps> = ({
  company,
  activeTab,
  handleTabClick,
}) => {
  return (
    <div className="bg-white rounded-lg">
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
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
              {company.status}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 md:mt-10">
        <div className="flex space-x-6 border-b border-gray-200">
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

        <div className="mt-6 sm:mt-8 md:mt-6 ">
          {activeTab === "overview" && (
            <>
              <div>
                <div className="mt-4 sm:mt-8 md:mt-4 w-full">
                  <ProductStatusCard company={company} />
                </div>
                <h3 className="text-xl font-bold mt-4 sm:mt-8 md:mt-4">
                  About
                </h3>
                <p className="text-gray-700 mt-2">{company.description}</p>
                <ProductImageGrid images={productImages} />
              </div>
            </>
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
    </div>
  );
};

export default CompanyInfo;
