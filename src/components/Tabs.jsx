import React from "react";
import Button from "./Button/Button";

export default function Tabs({ active, onChange, jsonData }) {
  const handleClick = (title) => {
    onChange(title);
  };

  return (
    <section
      style={{
        display: "flex",
        overflow: "auto",
        marginBottom: "50px",
        padding: "0 25px",
      }}
    >
      {jsonData.map((item) => (
        <Button
          key={item.title}
          isActive={active === item.title}
          onClick={() => handleClick(item.title)}
        >
          {item.title}
        </Button>
      ))}
    </section>
  );
}
