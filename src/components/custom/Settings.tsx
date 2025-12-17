'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Sidebar } from './Sidebar'

const settingsSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Enter a valid email' }),
  category: z.string().optional(),
  message: z.string().optional(),
})

export function Settings() {
  const [activeTab, setActiveTab] = useState('shop-settings')

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: '',
      email: '',
      category: '',
      message: '',
    },
  })

  const tabs = [
    { id: 'shop-settings', label: 'Shopeinstellungen' },
    { id: 'logo', label: 'Logo' },
    { id: 'payment', label: 'Zahlungsinformationen' },
    { id: 'shipping', label: 'Versandinformationen' },
    { id: 'reviews', label: 'Bewertungen' },
  ]

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'technical', label: 'Technical' },
    { value: 'billing', label: 'Billing' },
    { value: 'other', label: 'Other' },
  ]

  const onSubmit = (values: z.infer<typeof settingsSchema>) => {
    console.log('Form submitted:', values)
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold tracking-tight">Shopeinstellungen</h1>
            <div className="flex items-center gap-6">
              <button className="text-slate-600 hover:text-slate-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 1118 14.158V11m-6 4v6m-6-6v6m0-11V9a2 2 0 012-2h6a2 2 0 012 2v2" />
                </svg>
              </button>
              <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center text-white font-bold text-sm">RW</div>
            </div>
          </div>

          <div className="flex gap-2 bg-slate-100 p-1 rounded-xl w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <Card className="w-full max-w-2xl">
            <div className="p-6 space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-slate-900">Shopeinstellungen</h2>
                <p className="text-sm text-slate-600">Text unten drunter welcher alles erklärt</p>
              </div>

              <Form form={form} onSubmit={onSubmit} className="space-y-4">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your e-mail address..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="category"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <select
                            {...field}
                            className="w-full h-9 px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm text-slate-900 appearance-none cursor-pointer hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Choose a category</option>
                            {categories.map((cat) => (
                              <option key={cat.value} value={cat.value}>
                                {cat.label}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-slate-500 pointer-events-none" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="message"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          placeholder="Type your message here."
                          className="w-full h-20 px-3 py-2 border border-slate-300 rounded-lg bg-white text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                  <div className="pt-4">
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Save Changes
                    </Button>
                  </div>
              </Form>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}