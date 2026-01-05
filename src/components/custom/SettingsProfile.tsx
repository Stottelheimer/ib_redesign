'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Sidebar } from './Sidebar'

const profileSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Enter a valid email' }),
  department: z.string().min(1, { message: 'Department is required' }),
  role: z.string().min(1, { message: 'Role is required' }),
  bio: z.string().max(500, { message: 'Max 500 characters' }).optional(),
})

const departments = [
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'operations', label: 'Operations' },
  { value: 'support', label: 'Support' },
  { value: 'it', label: 'IT' },
]

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
]

export function SettingsProfile() {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      department: '',
      role: '',
      bio: '',
    },
  })

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    console.log('Profile saved:', values)
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold tracking-tight">Profil & Einstellungen</h1>
            <div className="flex items-center gap-6">
              <button className="text-slate-600 hover:text-slate-900" aria-label="Notifications">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 1118 14.158V11m-6 4v6m-6-6v6m0-11V9a2 2 0 012-2h6a2 2 0 012 2v2" />
                </svg>
              </button>
              <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center text-white font-bold text-sm">RW</div>
            </div>
          </div>

          <Card className="w-full max-w-2xl">
            <div className="p-6 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-slate-900">Profilinformationen</h2>
                <p className="text-sm text-slate-600">Aktualisieren Sie Ihren Namen, Kontakt und Rolle.</p>
              </div>

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <Field data-invalid={!!form.formState.errors.name}>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input id="name" placeholder="Ihr Name" {...form.register('name')} />
                  <FieldError errors={form.formState.errors.name ? [form.formState.errors.name] : []} />
                </Field>

                <Field data-invalid={!!form.formState.errors.email}>
                  <FieldLabel htmlFor="email">E-Mail-Adresse</FieldLabel>
                  <Input id="email" type="email" placeholder="name@firma.de" {...form.register('email')} />
                  <FieldError errors={form.formState.errors.email ? [form.formState.errors.email] : []} />
                </Field>

                <Field data-invalid={!!form.formState.errors.department}>
                  <FieldLabel htmlFor="department">Abteilung</FieldLabel>
                  <div className="relative">
                    <select
                      id="department"
                      {...form.register('department')}
                      className="w-full h-9 px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm text-slate-900 appearance-none cursor-pointer hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Abteilung wählen</option>
                      {departments.map((dep) => (
                        <option key={dep.value} value={dep.value}>
                          {dep.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-slate-500 pointer-events-none" />
                  </div>
                  <FieldError errors={form.formState.errors.department ? [form.formState.errors.department] : []} />
                </Field>

                <Field data-invalid={!!form.formState.errors.role}>
                  <FieldLabel htmlFor="role">Rolle</FieldLabel>
                  <div className="relative">
                    <select
                      id="role"
                      {...form.register('role')}
                      className="w-full h-9 px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm text-slate-900 appearance-none cursor-pointer hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Rolle wählen</option>
                      {roles.map((role) => (
                        <option key={role.value} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-slate-500 pointer-events-none" />
                  </div>
                  <FieldError errors={form.formState.errors.role ? [form.formState.errors.role] : []} />
                </Field>

                <Field data-invalid={!!form.formState.errors.bio}>
                  <FieldLabel htmlFor="bio">Kurzbeschreibung</FieldLabel>
                  <textarea
                    id="bio"
                    {...form.register('bio')}
                    placeholder="Beschreiben Sie kurz Ihre Rolle oder Verantwortlichkeiten"
                    className="w-full h-24 px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                  <FieldError errors={form.formState.errors.bio ? [form.formState.errors.bio] : []} />
                </Field>

                <div className="pt-4">
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Änderungen speichern
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
