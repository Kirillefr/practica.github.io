import React, { useEffect, useState } from "react";
import Tabs from "./Tabs";

const MyComponent = () => {
  const [jsonData, setJsonData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch("/instruction.json")
      .then((response) => response.json())
      .then((data) => setJsonData(data))
      .catch((error) => console.error("Ошибка при загрузке данных:", error));
  }, []);

  const handleTabChange = (title) => {
    const selectedItem = jsonData.find((item) => item.title === title);
    setSelectedItem(selectedItem);
  };

  return (
    <section>
      <Tabs
        jsonData={jsonData}
        active={selectedItem ? selectedItem.title : ""}
        onChange={handleTabChange}
      />

      {selectedItem && (
        <div className="instruction">
          <h2>{selectedItem.title}</h2>
          {selectedItem.items.map((subItem) => (
            <>
              {subItem.type === "paragraph" && (
                <p key={subItem.text} style={{ whiteSpace: "pre-line" }}>
                  {subItem.text}
                </p>
              )}
              {subItem.type === "img" && (
                <div className="imgContainer">
                  <img src={subItem.url} alt="" key={subItem.url} />
                </div>
              )}
              {subItem.type === "list" && (
                <ol key={subItem.items} style={{ marginLeft: "40px" }}>
                  {subItem.items.map((listItem, index) => {
                    if (typeof listItem === "string") {
                      return <li key={index}>{listItem}</li>;
                    } else if (listItem.type === "list") {
                      return (
                        <ol key={listItem.items} style={{ marginLeft: "40px" }}>
                          {listItem.items.map((nestedItem, nestedIndex) => (
                            <li key={nestedIndex}>{nestedItem}</li>
                          ))}
                        </ol>
                      );
                    }
                  })}
                </ol>
              )}
              {subItem.type === "table" && subItem.items.length > 0 && (
                <table border={"1px"}>
                  <thead>
                    <tr>
                      {Object.keys(subItem.items[0]).map((key, index) => (
                        <th key={index}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {subItem.items.map((item, index) => (
                      <tr key={index}>
                        {Object.keys(item).map((key) => (
                          <td>{item[key]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyComponent;
