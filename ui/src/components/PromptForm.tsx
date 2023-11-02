import { zodResolver } from "@hookform/resolvers/zod"
import '../App.css'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

const formSchema = z.object({
  id: z.string().min(1, {
    message: "id cannot be empty",
  }),
  header: z.string().min(1, {
    message: "header cannot be empty",
  }),
  content: z.string().min(1, {
    message: "content cannot be empty",
  }),
  category: z.string().min(1, {
    message: "category cannot be empty",
  }),
})

export function PromptForm() {
  const [showForm, setShowForm] = useState(false);
  const [feedback, setFeedback] = useState('');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      header: "",
      content: "",
      category: "",
    },
  })

  const openForm = () => {
    setShowForm(true);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        const response = await fetch('http://localhost:3000/prompts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
  
        if (!response.ok) {
          throw new Error('Failed to create prompt');
        }
        setFeedback('Prompt created successfully!');
        // Reset the form or provide feedback to the user
      } catch (error) {
        console.error('Error creating prompt:', error);
        setFeedback('An error occurred while creating the prompt');
    }
    setShowForm(false);
  }

  return (
    <div className="create-prompt m-10 flex flex-col">
        <Button onClick={openForm}>New Prompt</Button>
        {showForm ? (
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col justify-start items-start pt-8">
                <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                    <FormItem className="form-input">
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                        <Input placeholder="id" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="header"
                render={({ field }) => (
                    <FormItem className="form-input">
                    <FormLabel>Header</FormLabel>
                    <FormControl>
                        <Input placeholder="Header" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                    <FormItem className="form-input">
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder="Prompt content"
                            className="resize-none"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem className="form-input">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                        <Input placeholder="Category" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Submit</Button>
            </form>
            </Form>
        ): feedback}
    </div>
  )
}
