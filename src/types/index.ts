export interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType;
  buttonText: string;
  path: string;
}

export interface Activity {
  title: string;
  description: string;
  image: string;
}

export interface PageProps {
  setPage: (page: string) => void;
}