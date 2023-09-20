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
      <Card className="inline-flex flex-col custom-card border-plum-700 bg-white">
        <CardHeader className="flex flex-row custom-card-header w-72">
          <Badge>{prompt.category}</Badge>
          <Toggle>Favorite</Toggle>
        </CardHeader>
        <CardContent className="flex flex-col custom-card-content w-72">
          <CardTitle>{prompt.header}</CardTitle>
          <CardDescription className="flex text-left h-24 text-base text-black">{prompt.content}</CardDescription>
        </CardContent>
        <CardFooter className="flex flex-row p-0 custom-card-footer items-center justify-between w-72">
          <div className="flex text-left text-sm text-slate-700">
            Used {prompt.usage} times
          </div>
          <div className="flex flex-row items-center justify-between">
            <Button>Up</Button>
            <div className="px-2">{prompt.votes}</div>
            <Button>Do</Button>
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
    <div className="flex flex-wrap gap-1">
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
      votes: 0,
      category: "Education",
      usage: 234
    },
    {
      header: "Prompt Header 2",
      content: "Testing 2 Lorem ipsum dolor sit amet...",
      votes: 0,
      category: "Coding",
      usage: 123
    },
    {
      header: "Prompt Header 3",
      content: "Prompt v1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      votes: 0,
      category: "Writing",
      usage: 234
    },
    {
      header: "Prompt Header 4",
      content: "Prompt v1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      votes: 0,
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
      category: "Category 1",
      usage: 234
    },
    {
      header: "Prompt Header 8",
      content: "Prompt v1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      votes: 0,
      category: "Category 2",
      usage: 123
    },
    {
      header: "Prompt Header 9",
      content: "Prompt v1. Lorem ipsum dolor scing elit, sed doore magna aliqua...",
      votes: 0,
      category: "Category 2",
      usage: 123
    },
  ];

  return (
    <div className="page flex flex-col items-center justify-center">
      <h1>Featured Prompts</h1>
      <br></br>
      <Grid prompts={prompts}></Grid>
    </div>
  )
}

export default App
