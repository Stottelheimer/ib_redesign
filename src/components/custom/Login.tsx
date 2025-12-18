'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

const bgImage = '/36e215215297baf56b28a632dceb399ed20e4528.png'
const logoImage = '/ee7803bdce1fac320f359215c1cab9d7ea0d079e.png'

const loginSchema = z.object({
  email: z.string().email({ message: 'Bitte eine gültige E-Mail eingeben' }),
  password: z.string().min(6, { message: 'Passwort muss mindestens 6 Zeichen haben' }),
  remember: z.boolean().optional(),
})

export function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true)
    try {
      console.log('Login attempt:', values)
      // TODO: replace with real auth call
      await new Promise((resolve) => setTimeout(resolve, 800))
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
              <p>&ldquo;Everything we need to run</p>
              <p>our business&rdquo;</p>
            </blockquote>
            <div className="text-white/90">
              <p className="font-medium">Sabine Musterfrau</p>
              <p className="text-sm">Head of sales at idealo-store.de</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-12">
        <div className="max-w-sm mx-auto w-full space-y-8">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold text-slate-900">Welcome back to idealo business</h1>
            <p className="text-base text-slate-600">Bitte geben Sie Ihre Anmeldedaten ein</p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Field data-invalid={!!form.formState.errors.email}>
              <FieldLabel htmlFor="email">E-Mail</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="E-Mail"
                {...form.register('email')}
              />
              <FieldError errors={form.formState.errors.email ? [form.formState.errors.email] : []} />
            </Field>

            <Field data-invalid={!!form.formState.errors.password}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  {...form.register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <FieldError errors={form.formState.errors.password ? [form.formState.errors.password] : []} />
            </Field>

            

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-full transition-colors"
            >
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </Button>
          </form>

          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-slate-600">Don&apos;t have an account?</span>
            <Link
              href="#"
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
