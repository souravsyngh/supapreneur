import TechTags from "./TechStack";
import { Company } from "../types/types";

const Pitch = ({ company }: { company: Company }) => {
  return (
    <div className="space-y-6 md:space-y-8">
      <div className="bg-white shadow-md rounded-lg">
        <div className="border-b p-4">
          <h2 className="text-2xl font-bold">Elevator Pitch</h2>
        </div>
        <div className="p-4">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={`https://www.youtube.com/embed/${company.pitch_video.split("v=")[1]}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="bg-white  rounded-lg">
        <div className="border-b">
          <h2 className="text-2xl font-bold">About</h2>
        </div>
        <div className="">
          <p className="text-gray-700">{company.description}</p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg">
        <div className="border-b p-4">
          <h2 className="text-2xl font-bold">Tech Stack</h2>
        </div>
        <div className="p-4">
          <TechTags />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg">
        <div className="border-b p-4">
          <h2 className="text-2xl font-bold">Our Approach</h2>
        </div>
        <div className="p-4 space-y-4">
          <div>
            <h4 className="text-lg font-semibold">What We Do</h4>
            <p className="text-gray-700">{company.what}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Why We Do It</h4>
            <p className="text-gray-700">{company.why}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold">How We Do It</h4>
            <p className="text-gray-700">{company.how}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pitch;
