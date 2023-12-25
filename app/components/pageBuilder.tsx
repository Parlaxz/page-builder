import React, { createContext, useContext } from "react";

// Define section type
type Section = {
  width?: string;
  height?: string;
  alignment?: string;
  flow?: "row" | "column" | "row-reverse" | "column-reverse";
  justification?: string;
  children?: Section[];
};
const PageFormatContext = createContext([
  { width: "15px", height: "15px", children: [] },
] as Section[]);

// PageBuilder component
const PageBuilder: React.FC = () => {
  const pageFormat = useContext(PageFormatContext);
  const [showSettings, setShowSettings] = React.useState(false);
  return <div className="text-xl">{JSON.stringify(pageFormat)}</div>;
};

const SectionSettings: React.FC = () => {
  return <div className="text-xl">hello</div>;
};
const Section: React.FC<Section> = ({}) => {
  return <button className="text-xl">hello</button>;
};
export default PageBuilder;
