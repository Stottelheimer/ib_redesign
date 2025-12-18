"use client"

import Link from "next/link"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"

const bgImage = "/36e215215297baf56b28a632dceb399ed20e4528.png"
const logoImage = "/ee7803bdce1fac320f359215c1cab9d7ea0d079e.png"

const otpSchema = z.object({
  code: z
    .string()
    .min(6, { message: "Code must be 6 digits" })
    .max(6, { message: "Code must be 6 digits" })
    .regex(/^\d{6}$/, { message: "Only digits are allowed" }),
  remember: z.boolean().optional(),
})

export default function TwoFactorPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: "", remember: false },
    mode: "onSubmit",
  })

  const onSubmit = async (values: z.infer<typeof otpSchema>) => {
    setIsSubmitting(true)
    try {
      console.log("Verify 2FA:", values)
      await new Promise((r) => setTimeout(r, 800))
      // TODO: navigate to dashboard after verification
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
              <p>&ldquo;Secure your account&rdquo;</p>
            </blockquote>
            <div className="text-white/90">
              <p className="font-medium">2-Faktor-Authentifizierung</p>
              <p className="text-sm">Bitte geben Sie Ihren Sicherheitscode ein</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - 2FA Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-12">
        <div className="max-w-sm mx-auto w-full space-y-8">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold text-slate-900">Bestätigen Sie Ihre Anmeldung</h1>
            <p className="text-base text-slate-600">
              Wir haben einen 6-stelligen Code an Ihre E-Mail gesendet.
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Field data-invalid={!!form.formState.errors.code}>
              <FieldLabel htmlFor="code">Sicherheitscode</FieldLabel>
              <InputOTP
                maxLength={6}
                value={form.watch("code")}
                onChange={(val) => form.setValue("code", val, { shouldValidate: true })}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <FieldError errors={form.formState.errors.code ? [form.formState.errors.code] : []} />
            </Field>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <Checkbox
                  checked={!!form.watch("remember")}
                  onCheckedChange={(checked) => form.setValue("remember", !!checked)}
                />
                <span>Dieses Gerät vertrauen</span>
              </label>

              <Link href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                Code erneut senden
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || (form.watch("code")?.length ?? 0) !== 6}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-full transition-colors"
            >
              {isSubmitting ? "Überprüfen…" : "Bestätigen"}
            </Button>

            <div className="text-center text-sm">
              <Link href="/login" className="text-slate-600 hover:text-slate-900 underline underline-offset-4">
                Zurück zur Anmeldung
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
