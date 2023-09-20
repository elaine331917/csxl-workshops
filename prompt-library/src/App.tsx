import { useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Toggle } from "@/components/ui/toggle"
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

function Prompt() {
  return (
    <>
      <Card className="inline-flex flex-col custom-card border-plum-700 bg-white">
        <CardHeader className="flex flex-row custom-card-header w-72">
          <Badge>
            Category
          </Badge>
          <Toggle>
            Favorite
          </Toggle>
        </CardHeader>
        <CardContent className="flex flex-col custom-card-content w-72">
          <CardTitle>
            Prompt Header
          </CardTitle>
          <CardDescription className="flex text-left">
            Prompt v1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
          </CardDescription>
        </CardContent>
        <CardFooter className="flex flex-row p-0 custom-card-footer items-center justify-between w-72">
          <div className="flex text-left">
            Used 345 times
          </div>
          <div className="flex flex-row items-center justify-between">
            <Button>Up</Button>
            <div className="px-2">100</div>
            <Button>Do</Button>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

function Grid() {
  return (
    <div className="flex flex-wrap gap-1">
      <Prompt></Prompt><Prompt></Prompt><Prompt></Prompt>
      <Prompt></Prompt><Prompt></Prompt><Prompt></Prompt>
      <Prompt></Prompt><Prompt></Prompt><Prompt></Prompt>
    </div>
  )
}

function App() {
  // const prompt: {
  //   header: "Header",
  //   content: "description"

  // }

  return (
    <div className="flex flex-col items-center">
      <h1>Featured Prompts</h1>
      <Grid></Grid>
    </div>
  )
}

export default App
