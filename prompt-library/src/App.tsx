import { useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Toggle } from "@/components/ui/toggle"
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

const MAX_CHARACTERS: number = 136;

interface Prompt {
  header: string;
  content: string;
  votes: number;
  category: string;
  usage: number;
}

// unsure if this is the right syntax
interface PromptCardProps {
  prompt: Prompt;
}

interface GridProps {
  prompts: Prompt[]
}

function PromptCard({ prompt }: PromptCardProps) {
  return (
    <>
      <Card className="inline-flex flex-col custom-card border-2 rounded-xl border-plum-700 bg-white">
        <CardHeader className="flex flex-row justify-between p-0 items-center custom-card-header w-72">
          <Badge className="bg-plum-100 hover:bg-plum-200 text-plum-600 px-3 py-2 rounded-lg text-sm">{prompt.category}</Badge>
          <Toggle className="text-plum-700">Favorite</Toggle>
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
            <Button className="bg-plum-700 hover:bg-plum-600">Up</Button>
            <div className="px-2 text-plum-700">{prompt.votes}</div>
            <Button className="bg-plum-700 hover:bg-plum-600">Down</Button>
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
  const prompts: Prompt[] = [
    {
      header: "Prompt Header 1",
      content: "Prompt v1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      votes: 101,
      category: "Education",
      usage: 234
    },
    {
      header: "Prompt Header 2",
      content: "Testing 2 Lorem ipsum dolor sit amet...",
      votes: 76,
      category: "Coding",
      usage: 123
    },
    {
      header: "Prompt Header 3",
      content: "Prompt v1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      votes: 34,
      category: "Writing",
      usage: 234
    },
    {
      header: "Prompt Header 4",
      content: "Prompt v1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      votes: 2,
      category: "Art",
      usage: 123
    },
    {
      header: "Prompt Header 5",
      content: "Prompt v1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      votes: 0,
      category: "Worldbuilding",
      usage: 234
    },
    {
      header: "Prompt Header 6",
      content: "Prompt v1. adipiscing e...",
      votes: 0,
      category: "Technology",
      usage: 123
    },
    {
      header: "Prompt Header 7",
      content: "Prompt v1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      votes: 0,
      category: "Coding",
      usage: 234
    },
    {
      header: "Prompt Header 8",
      content: "Prompt v1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      votes: 0,
      category: "Homework",
      usage: 123
    },
    {
      header: "Prompt Header 9",
      content: "Prompt v1. Lorem ipsum dolor scing elit, sed doore magna aliqua...",
      votes: -2,
      category: "Education",
      usage: 123
    },
  ];

  return (
    <div>
      <h1>Featured Prompts</h1>
      <br></br>
      <Grid prompts={prompts}></Grid>
    </div>
  )
}

export default App
