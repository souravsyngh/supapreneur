export interface Company {
   id: string;
  title: string;
   employees: Employee[];
  tagline: string;
  tags: string[];
  date_founded: string;
  stage: string;
  links: {
    website?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  slug: string;
  location: string;
  region: string;
  logo: string;
  sector: string;
    voteCount: number;
  isVoted: boolean;
}

interface Employee {
  id: string;
  name: string;
  role: string;
}

export interface CompanyCardProps {
  companies: Company[];
}

export interface UpvoteButtonProps {
  company: Company;
}

export interface UserProfile {
  id: string;
  name: string;
  headline: string;
  location: string;
  image: string;
  bio: string;
  links: string[];
  role: string;
  interests: string[];
  skills: string[];
  education: string[];
  experience: string[];
  projects: string[];
  isVerified: boolean;
  collaborating: boolean;
  criteria: string[];
}


export interface Profile {
  _id: string;
  name: string;
  headline: string;
  location: string;
  bio: string;
  links: string[];
  role: string;
  interests: string[];
  skills: string[];
  education: string[];
  experience: string[];
  projects: string[];
  isVerified: boolean;
  collaborating: boolean;
  criteria: string[];
  uid: string;
  avatar: string;
  username: string;
}


export interface VoteResponse {
  action: 'added' | 'removed';
  voteCount: number;
  companyId: string;
  message: string;
}
