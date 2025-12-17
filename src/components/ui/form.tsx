"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useForm as useRHF,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form"

import { cn } from "@/lib/utils"

export function useForm<TFieldValues extends FieldValues>(
  props?: Parameters<typeof useRHF<TFieldValues>>[0]
) {
  return useRHF<TFieldValues>(props)
}

export function Form<TFieldValues extends FieldValues>({
  form,
  onSubmit,
  children,
  ...props
}: {
  form: UseFormReturn<TFieldValues>
  onSubmit: (values: TFieldValues) => void | Promise<void>
  children: React.ReactNode
} & React.ComponentProps<"form">) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((values) => onSubmit(values))} {...props}>
        {children}
      </form>
    </FormProvider>
  )
}

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue)

export function FormField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  name,
  control,
  render,
}: ControllerProps<TFieldValues, TName>) {
  const id = React.useId()

  return (
    <FormFieldContext.Provider value={{ name }}>
      <Controller
        name={name}
        control={control}
        render={(props) => <FormItemContext.Provider value={{ id }}>{render(props)}</FormItemContext.Provider>}
      />
    </FormFieldContext.Provider>
  )
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue)

export function useFormField() {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldContext?.name) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!itemContext?.id) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

export function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2", className)} {...props} />
}

export function FormLabel({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  const { formItemId } = useFormField()

  return <label className={cn("text-sm font-medium text-slate-900", className)} htmlFor={formItemId} {...props} />
}

export function FormControl({ className, ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formMessageId, formDescriptionId } = useFormField()

  return (
    <Slot
      className={className}
      aria-invalid={!!error}
      aria-describedby={error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId}
      id={formItemId}
      {...props}
    />
  )
}

export function FormMessage({ className, children }: React.HTMLAttributes<HTMLParagraphElement>) {
  const { error, formMessageId } = useFormField()
  if (!error?.message && !children) return null

  return (
    <p className={cn("text-sm text-destructive", className)} id={formMessageId}>
      {children ?? String(error?.message)}
    </p>
  )
}

export function FormDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const { formDescriptionId } = useFormField()
  return <p className={cn("text-sm text-muted-foreground", className)} id={formDescriptionId} {...props} />
}
