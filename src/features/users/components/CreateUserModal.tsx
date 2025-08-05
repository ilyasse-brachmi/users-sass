"use client"

import React, { useState } from "react"
import DownloadIcon from '@mui/icons-material/Download'
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"

type Props = {
  open: boolean
  onClose: () => void
}

export default function UserCreateModal({ open, onClose }: Props) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatar: null as File | null,
  })

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: file }))
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeAvatar = () => {
    setAvatarPreview(null)
    setFormData((prev) => ({ ...prev, avatar: null }))
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

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

          <form onSubmit={handleSubmit} className="space-y-6">
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
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />

                <label
                  htmlFor="avatar"
                  className="bg-white flex items-center justify-center gap-2 hover:bg-slate-50 border-2 rounded-lg px-2 py-1 cursor-pointer text-gray-700 font-semibold text-sm border-dashed border-slate-300 hover:border-slate-400 transition-colors"
                >
                  <DownloadIcon sx={{ color: "#ABABAB" }} />
                  <span>Upload Avatar</span>
                </label>

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
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="w-full border-slate-300 border rounded-lg p-2 outline-none focus:border-slate-500 focus:ring-slate-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-slate-600">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="w-full border-slate-300 border rounded-lg p-2 outline-none focus:border-slate-500 focus:ring-slate-500"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-600">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="border-slate-300 border w-full outline-none rounded-lg p-2 focus:border-slate-500 focus:ring-slate-500"
                  required
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full cursor-pointer rounded-lg from-slate-900 bg-primary hover:bg-primary/80 text-white font-medium py-2.5 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Create User
              </button>
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  )
}
