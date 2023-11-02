import { useEffect, useState } from 'react'
import './App.css'
import { Prompt, PromptCard } from './components/PromptCard'
import { Button } from "@/components/ui/button"
import { Header } from './components/Header'

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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Define state for the new prompt form
  const [showForm, setShowForm] = useState(false);
  const [newPromptData, setNewPromptData] = useState({
    id: '',
    header: '',
    content: '',
    category: '',
  });

  const openForm = () => {
    setShowForm(true);
  };

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/prompts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPromptData),
      });

      if (!response.ok) {
        throw new Error('Failed to create prompt');
      }

      // Optionally, handle a successful response from the backend
      // You can reset the form or provide feedback to the user
      console.log('Prompt created successfully');
      // Reset the form or provide feedback to the user
    } catch (error) {
      console.error('Error creating prompt:', error);
      // Handle the error, show an error message, or take other actions
    }
    setShowForm(false);
  };

  useEffect(() => {
    fetchData(); // Initial data fetch
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/prompts");
      if (!response.ok) {
        throw new Error("Network response not ok");
      }
      const data = await response.json();
      setData(data);
      console.log(data)
    } catch (error) {
      console.error("Error fetching data:", error);
      setError('An error occurred while fetching data: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header></Header>
      <h1 className="text-4xl pt-5">Featured Prompts</h1>
      { loading && <div className="loading-circle"></div>}
      { error && <div>Error: {error}</div>}
      {/* <Button className="bg-plum-800 text-white w-36" onClick={fetchData}>Fetch Data</Button> */}
      <br></br>
      { data && <Grid prompts={data}></Grid>}
      <div className="create-prompt m-10">
        <Button onClick={openForm}>New Prompt</Button>
        
        {/* Render the form when showForm is true */}
        {showForm && (
          <form onSubmit={handleFormSubmit} className="flex flex-col">
            <input
              type="text"
              placeholder="123"
              value={newPromptData.id}
              onChange={(e) => setNewPromptData({ ...newPromptData, id: e.target.value })}
            />
            <input
              type="text"
              placeholder="Title"
              value={newPromptData.header}
              onChange={(e) => setNewPromptData({ ...newPromptData, header: e.target.value })}
            />
            <input
              type="text"
              placeholder="Text"
              value={newPromptData.content}
              onChange={(e) => setNewPromptData({ ...newPromptData, content: e.target.value })}
            />
            <input
              type="text"
              placeholder="Category"
              value={newPromptData.category}
              onChange={(e) => setNewPromptData({ ...newPromptData, category: e.target.value })}
            />
            <Button type="submit">Create Prompt</Button>
          </form>
        )}
      </div>
    </div>
  )
}

export default App
