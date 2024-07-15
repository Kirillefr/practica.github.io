import MyComponent from "./components/MyComponent";
import { useEffect, useState } from "react";

export default function App() {
  const [jsonData, setJsonData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch("./instruction.json")
      .then((response) => response.json())
      .then((data) => setJsonData(data))
      .catch((error) => console.error("Ошибка при загрузке данных:", error));
  }, []);

  const handleTabChange = (title) => {
    const selectedItem = jsonData.find((item) => item.title === title);
    setSelectedItem(selectedItem);
  };

  return (
    <>
      <main>
        {jsonData.length > 0 && (
          <>
            <MyComponent selectedItem={selectedItem} />
          </>
        )}
      </main>
    </>
  );
}
