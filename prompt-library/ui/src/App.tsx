import { useEffect, useState } from 'react'
import './App.css'
import { Prompt, PromptCard } from './components/prompt'

const MAX_CHARACTERS: number = 136;

interface GridProps {
  prompts: Prompt[]
}

function Grid({ prompts }: GridProps) {
  const truncateContent = (content: string) => {
    if (content.length > MAX_CHARACTERS) {
      return content.substring(0, MAX_CHARACTERS) + "...";
    }
    return content;
  };
  
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {prompts.map((prompt, index) => (
        <PromptCard
        key={`prompt-${index}`}
        prompt={{ ...prompt, content: truncateContent(prompt.content) }}
        />
      ))}
    </div>
  );
}

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData(); // Initial data fetch
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/prompts");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);
      console.log(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h1>Featured Prompts</h1>
      <button onClick={fetchData}>Fetch Data</button>
      <br></br>
      { data && <Grid prompts={data}></Grid>}
    </div>
  )
}

export default App
