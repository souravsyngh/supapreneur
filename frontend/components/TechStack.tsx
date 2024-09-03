import React from "react";
import { IconType } from "react-icons";
import {
  FaAngular,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
} from "react-icons/fa";
import { SiTypescript, SiJavascript, SiJest } from "react-icons/si";

interface TechTag {
  name: string;
  icon: IconType;
  color: string;
}

const techTags: TechTag[] = [
  { name: "Angular", icon: FaAngular, color: "text-red-600" },
  { name: "ReactJS", icon: FaReact, color: "text-blue-400" },
  { name: "Typescript", icon: SiTypescript, color: "text-blue-600" },
  { name: "Html", icon: FaHtml5, color: "text-orange-500" },
  { name: "Css", icon: FaCss3Alt, color: "text-blue-500" },
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
  { name: "Jest", icon: SiJest, color: "text-red-700" },
  { name: "Git", icon: FaGitAlt, color: "text-orange-600" },
];

const TechTags: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {techTags.map((tag) => (
        <div
          key={tag.name}
          className="flex items-center bg-white rounded-full px-3 py-1 shadow-sm"
        >
          <tag.icon className={`mr-2 ${tag.color}`} />
          <span className="text-sm font-medium text-gray-700">{tag.name}</span>
        </div>
      ))}
    </div>
  );
};

export default TechTags;
