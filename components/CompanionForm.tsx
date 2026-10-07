"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { subjects, voices } from "@/constants";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createCompanion } from "@/lib/actions/companion.actions";
import { redirect } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, "Companion is required."),
  subject: z.string().min(1, "Subject is required."),
  topic: z.string().min(1, "Topic is required."),
  voice: z.string().min(1, "Voice is required."),
  style: z.string().min(1, "Style is required."),
  duration: z
    .string()
    .min(1, "Duration is required.")
    .transform(Number)
    .pipe(z.number().min(1, "Duration must be at least 1 minute.")),
});

const CompanionForm = () => {
  const form = useForm<
    z.input<typeof formSchema>,
    undefined,
    z.output<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: "15",
    },
  });

  const onSubmit = async (data: z.output<typeof formSchema>) => {
    const companion = await createCompanion(data);
    if (companion) {
      redirect(`/companions/${companion.id}`);
    } else {
      console.log("Failed to create a companion");
      redirect("/");
    }
  };

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Create a Companion</CardTitle>
        <CardDescription>
          Customize a companion for your learning session.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="companion-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="companion-name">
                    Companion Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="companion-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="The Brainy Explorer"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="subject"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="companion-subject">Subject</FieldLabel>
                  <select
                    {...field}
                    id="companion-subject"
                    aria-invalid={fieldState.invalid}
                    className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                  >
                    <option value="">Choose a subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="topic"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="companion-topic">Topic</FieldLabel>
                  <Input
                    {...field}
                    id="companion-topic"
                    aria-invalid={fieldState.invalid}
                    placeholder="Neural networks of the brain"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="voice"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="companion-voice">Voice</FieldLabel>
                  <select
                    {...field}
                    id="companion-voice"
                    aria-invalid={fieldState.invalid}
                    className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                  >
                    <option value="">Choose a voice</option>
                    {Object.keys(voices).map((voice) => (
                      <option key={voice} value={voice}>
                        {voice}
                      </option>
                    ))}
                  </select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="style"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="companion-style">Style</FieldLabel>
                  <select
                    {...field}
                    id="companion-style"
                    aria-invalid={fieldState.invalid}
                    className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
                  >
                    <option value="">Choose a style</option>
                    {Object.keys(voices.male).map((style) => (
                      <option key={style} value={style}>
                        {style}
                      </option>
                    ))}
                  </select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="duration"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="companion-duration">
                    Duration (minutes)
                  </FieldLabel>
                  <Input
                    {...field}
                    id="companion-duration"
                    type="number"
                    min="1"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="companion-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default CompanionForm;
