import { useEffect, useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Toggle } from "@/components/ui/toggle"
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

const MAX_CHARACTERS: number = 136;

interface Prompt {
  id: number;
  header: string;
  content: string;
  votes: number;
  category: string;
  usage: number;
}

interface PromptCardProps {
  prompt: Prompt;
}

interface GridProps {
  prompts: Prompt[]
}

function PromptCard({ prompt }: PromptCardProps) {
  const [votes, setVotes] = useState(prompt.votes);
  const [isPending, setIsPending] = useState(false);
  const delay = () => new Promise<void>((res) => setTimeout(() => res(), 700));
  
  const handleVote = async (up: Boolean) => { 
      setIsPending(true);
      // update data
      const newVotes = up ? votes + 1 : votes - 1;

      await delay()
      setVotes(newVotes);

      // send new data to backend
      fetch(`http://localhost:3000/prompts/${prompt.id}/edit`, {
        method: 'PUT',
        body: JSON.stringify({
          votes: newVotes
        }),
        headers: { 'Content-Type': 'application/json' },
      }).then(() => {
        console.log('Data sent successfully');
        setIsPending(false);
      }).catch((error) => {
        console.error('Error:', error);
        setVotes(votes);
        setIsPending(false);
      });
  }

  return (
    <>
      <Card className="inline-flex flex-col custom-card border-2 rounded-xl border-plum-700 bg-white">
        <CardHeader className="flex flex-row justify-between p-0 items-center custom-card-header w-72">
          <Badge className="bg-plum-100 hover:bg-plum-200 text-plum-600 px-3 py-2 rounded-lg text-sm">{prompt.category}</Badge>
          <Toggle className="text-plum-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path d="M15 2.60396L18.0442 9.92317L18.2788 10.4871L18.8876 10.5359L26.7893 11.1694L20.7691 16.3264L20.3052 16.7238L20.4469 17.3179L22.2862 25.0286L15.5213 20.8966L15 20.5782L14.4787 20.8966L7.71379 25.0286L9.55308 17.3179L9.6948 16.7238L9.23092 16.3264L3.21066 11.1694L11.1124 10.5359L11.7212 10.4871L11.9558 9.92317L15 2.60396Z" stroke="#7D2279" stroke-width="2"/>
            </svg>
          </Toggle>
        </CardHeader>
        <CardContent className="flex flex-col custom-card-content w-72">
          <CardTitle>{prompt.header}</CardTitle>
          <CardDescription className="flex text-left h-24 text-base text-black">{prompt.content}</CardDescription>
        </CardContent>
        <CardFooter className="flex flex-row p-0 custom-card-footer items-center justify-between w-72">
          <div className="flex text-left text-sm text-slate-500">
            Used {prompt.usage} times
          </div>
          <div className="flex flex-row items-center justify-between">
            { !isPending && <Button variant="ghost" size="icon" onClick={() => handleVote(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" viewBox="0 0 25 30" fill="none">
                <path d="M1.4005 14.0582L11.7381 1.8964C12.1374 1.4266 12.8626 1.4266 13.2619 1.8964L23.5995 14.0582C24.1516 14.7077 23.69 15.7059 22.8376 15.7059H18.6471C18.0948 15.7059 17.6471 16.1536 17.6471 16.7059V27.2059C17.6471 27.7582 17.1993 28.2059 16.6471 28.2059H8.35294C7.80066 28.2059 7.35294 27.7582 7.35294 27.2059V16.7059C7.35294 16.1536 6.90523 15.7059 6.35294 15.7059H2.16244C1.31003 15.7059 0.848438 14.7077 1.4005 14.0582Z" stroke="#650360" stroke-width="2"/>
              </svg>
            </Button> }
            { isPending && <Button disabled variant="ghost" size="icon"> Voting... </Button>}
            <div className="px-2 text-plum-700">{votes}</div>
            
            { !isPending && <Button variant="ghost" size="icon" onClick={() => handleVote(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="29" viewBox="0 0 25 29" fill="none">
                <path d="M23.5995 15.1477L13.2619 27.3095C12.8626 27.7793 12.1374 27.7793 11.7381 27.3095L1.4005 15.1477C0.848438 14.4982 1.31003 13.5 2.16244 13.5L6.35294 13.5C6.90523 13.5 7.35294 13.0523 7.35294 12.5V2C7.35294 1.44772 7.80066 1 8.35294 1L16.6471 1C17.1993 1 17.6471 1.44772 17.6471 2L17.6471 12.5C17.6471 13.0523 18.0948 13.5 18.6471 13.5H22.8376C23.69 13.5 24.1516 14.4982 23.5995 15.1477Z" stroke="#650360" stroke-width="2"/>
              </svg>
            </Button> }
            { isPending && <Button disabled variant="ghost" size="icon"> Voting... </Button>}
          </div>
        </CardFooter>
      </Card>
    </>
  )
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
      {data&&<Grid prompts={data}></Grid>}
    </div>
  )
}

export default App
