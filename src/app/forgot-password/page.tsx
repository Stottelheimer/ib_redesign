"use client"

import Link from "next/link"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const bgImage = "/36e215215297baf56b28a632dceb399ed20e4528.png"
const logoImage = "/ee7803bdce1fac320f359215c1cab9d7ea0d079e.png"

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Bitte eine gültige E-Mail eingeben" }),
})

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  })

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    setIsSubmitting(true)
    try {
      console.log("Password reset requested for:", values.email)
      // TODO: call password reset API
      await new Promise((r) => setTimeout(r, 800))
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Section - Image and Text (Hidden on Mobile) */}
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute top-8 left-8 z-10">
          <div className="w-24 h-16 bg-blue-900 rounded flex items-center justify-center">
            <img src={logoImage} alt="idealo business" className="w-full h-full object-contain p-2" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end p-8 h-1/3">
          <div className="space-y-4">
            <blockquote className="text-2xl font-semibold text-white leading-tight">
              <p>&ldquo;Passwort zurücksetzen&rdquo;</p>
            </blockquote>
            <div className="text-white/90">
              <p className="font-medium">Sicherer Zugang</p>
              <p className="text-sm">Wir helfen Ihnen, wieder Zugriff auf Ihr Konto zu bekommen</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Password Reset Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-12">
        <div className="max-w-sm mx-auto w-full space-y-8">
          {!submitted ? (
            <>
              <div className="space-y-3">
                <h1 className="text-3xl font-semibold text-slate-900">Passwort zurücksetzen</h1>
                <p className="text-base text-slate-600">
                  Geben Sie Ihre E-Mail-Adresse ein, und wir senden Ihnen einen Link zum Zurücksetzen Ihres Passworts.
                </p>
              </div>

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Field data-invalid={!!form.formState.errors.email}>
                  <FieldLabel htmlFor="email">E-Mail</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="E-Mail"
                    {...form.register("email")}
                  />
                  <FieldError errors={form.formState.errors.email ? [form.formState.errors.email] : []} />
                </Field>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-full transition-colors"
                >
                  {isSubmitting ? "Wird gesendet..." : "Zurücksetzen-Link senden"}
                </Button>

                <div className="text-center text-sm space-y-2">
                  <p className="text-slate-600">Erinnern Sie sich an Ihr Passwort?</p>
                  <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                    Zurück zur Anmeldung
                  </Link>
                </div>
              </form>
            </>
          ) : (
            <div className="space-y-6 text-center">
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-slate-900">E-Mail gesendet</h2>
                <p className="text-base text-slate-600">
                  Wir haben einen Link zum Zurücksetzen des Passworts an <strong>{form.getValues("email")}</strong> gesendet.
                  Bitte überprüfen Sie Ihren Posteingang.
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <p className="text-sm text-slate-600">Haben Sie die E-Mail nicht erhalten?</p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    form.reset()
                  }}
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  Erneut versuchen
                </button>
              </div>

              <div className="pt-4">
                <Link href="/login" className="text-slate-600 hover:text-slate-900 underline underline-offset-4">
                  Zurück zur Anmeldung
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
