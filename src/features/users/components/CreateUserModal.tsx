"use client"

import React, { useEffect, useRef, useState } from "react"
import DownloadIcon from "@mui/icons-material/Download"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import { RegisterFormSchema, RegisterFormValues } from "@/features/users/schema"

type Props = {
  open: boolean
  onClose: () => void
}

export default function UserCreateModal({ open, onClose }: Props) {
  const [loading, setLoading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [formData, setFormData] = useState<RegisterFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    avatar: undefined,
  })

  const [touched, setTouched] = useState<Record<keyof RegisterFormValues, boolean>>({
    firstName: false,
    lastName: false,
    email: false,
    avatar: false,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormValues, string>>>({})

  const debounceRef = useRef<number | null>(null)

  const validateAndSetErrors = (data: RegisterFormValues) => {
    try {
      const result = RegisterFormSchema.safeParse(data)
      if (result.success) {
        setErrors({})
        return true
      } else {
        const errMap: Partial<Record<keyof RegisterFormValues, string>> = {}
        for (const issue of result.error.issues) {
          const key = issue.path?.[0] as keyof RegisterFormValues | undefined
          if (key && !errMap[key]) {
            errMap[key] = issue.message
          }
        }

        const visibleErrors: Partial<Record<keyof RegisterFormValues, string>> = {}
        for (const k in errMap) {
          const key = k as keyof RegisterFormValues
          if (touched && Object.prototype.hasOwnProperty.call(touched, key) && touched[key]) {
            visibleErrors[key] = errMap[key]
          }
        }

        setErrors(visibleErrors)
        return false
      }
    } catch (err) {
      console.error("Validation failed unexpectedly:", err)
      setErrors({})
      return false
    }
  }

  useEffect(() => {
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current)
    }
    debounceRef.current = window.setTimeout(() => {
      validateAndSetErrors(formData)
      debounceRef.current = null
    }, 300)

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current)
    }
  }, [formData.firstName, formData.lastName, formData.email, formData.avatar, touched])

  const handleInputChange = (field: keyof Omit<RegisterFormValues, "avatar">, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setTouched((prev) => ({ ...prev, avatar: true }))
    setFormData((prev) => ({ ...prev, avatar: file }))

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      try {
        const avatarSchema = (RegisterFormSchema as any).shape?.avatar
        if (avatarSchema && typeof avatarSchema.safeParse === "function") {
          const res = avatarSchema.safeParse(file)
          if (!res.success) {
            setErrors((prev) => ({ ...prev, avatar: res.error.issues?.[0]?.message || "Invalid avatar" }))
          } else {
            setErrors((prev) => {
              const { avatar, ...rest } = prev
              return rest
            })
          }
        } else {
          validateAndSetErrors({ ...formData, avatar: file })
        }
      } catch (err) {
        console.warn("Avatar validation fallback", err)
        validateAndSetErrors({ ...formData, avatar: file })
      }
    } else {
      setAvatarPreview(null)
      setErrors((prev) => {
        const { avatar, ...rest } = prev
        return rest
      })
    }
  }

  const removeAvatar = () => {
    setAvatarPreview(null)
    setFormData((prev) => ({ ...prev, avatar: undefined }))
    setTouched((prev) => ({ ...prev, avatar: true }))
    setErrors((prev) => {
      const { avatar, ...rest } = prev
      return rest
    })
  }

  const resetData = () => {
    setFormData({
      avatar: undefined,
      email: "",
      firstName: "",
      lastName: "",
    })
    setAvatarPreview(null)
    setTouched({
      firstName: false,
      lastName: false,
      email: false,
      avatar: false,
    })
    setErrors({})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      avatar: true,
    })

    const ok = validateAndSetErrors(formData)
    if (!ok) return

    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Form submitted:", formData)
      resetData()
      onClose()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!open) resetData()
  }, [open])

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="user-details-title"
      aria-describedby="user-details-description"
      closeAfterTransition
      disableAutoFocus
    >
      <Box
        className="p-4 flex items-center justify-center min-h-screen"
        sx={{
          outline: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <div className="w-full p-4 rounded-lg max-w-md bg-white shadow-xl border-0">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div
                id="user-details-title"
                className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent"
              >
                Create New User
              </div>
              <div className="text-slate-600 text-sm mt-1">
                Fill in the details to create a new user account
              </div>
            </div>
            <IconButton onClick={onClose} size="small" aria-label="close">
              <CloseIcon />
            </IconButton>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <div className="flex items-center justify-center mt-4">
                  <div className="w-24 h-24 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center overflow-hidden">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="avatar preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xl font-semibold text-primary">U</span>
                    )}
                  </div>
                </div>
                {avatarPreview && (
                  <button
                    type="button"
                    onClick={removeAvatar}
                    className="absolute top-4 cursor-pointer w-5 h-5 flex items-center justify-center right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors"
                    aria-label="remove avatar"
                  >
                    <CloseIcon sx={{ fontSize: 12 }} />
                  </button>
                )}
              </div>

              <div className="relative">
                <input type="file" id="avatar" accept="image/*" onChange={handleAvatarChange} className="hidden" />

                <label
                  htmlFor="avatar"
                  className="bg-white flex items-center justify-center gap-2 hover:bg-slate-50 border-2 rounded-lg px-2 py-1 cursor-pointer text-gray-700 font-semibold text-sm border-dashed border-slate-300 hover:border-slate-400 transition-colors"
                >
                  <DownloadIcon sx={{ color: "#ABABAB" }} />
                  <span>Upload Avatar</span>
                </label>

                {errors.avatar && <div className="text-xs text-red-600 mt-1">{errors.avatar}</div>}
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-slate-600">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className={`w-full border rounded-lg p-2 outline-none focus:ring-2 ${errors.firstName ? "border-red-300 focus:ring-red-200" : "border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                      }`}
                    required
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                  />
                  {errors.firstName && <div id="firstName-error" className="text-xs text-red-600">{errors.firstName}</div>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-slate-600">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className={`w-full border rounded-lg p-2 outline-none focus:ring-2 ${errors.lastName ? "border-red-300 focus:ring-red-200" : "border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                      }`}
                    required
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? "lastName-error" : undefined}
                  />
                  {errors.lastName && <div id="lastName-error" className="text-xs text-red-600">{errors.lastName}</div>}
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-600">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`border rounded-lg p-2 outline-none focus:ring-2 ${errors.email ? "border-red-300 focus:ring-red-200" : "border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                    }`}
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <div id="email-error" className="text-xs text-red-600">{errors.email}</div>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full cursor-pointer rounded-lg from-slate-900 bg-primary hover:bg-primary/80 text-white font-medium py-2.5 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}              
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                )}
                {loading ? 'Loading...' : 'Create User'}
              </button>
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  )
}
