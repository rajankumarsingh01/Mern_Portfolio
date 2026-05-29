




import React from "react";

import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  Globe,
  User2,
  FileText,
  Sparkles,
  ExternalLink,
} from "lucide-react";

import { useSelector } from "react-redux";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  const socialLinks = [
    {
      label: "Portfolio URL",
      value: user?.portfolioURL,
      icon: Globe,
    },
    {
      label: "Github URL",
      value: user?.githubURL,
      icon: Github,
    },
    {
      label: "LinkedIn URL",
      value: user?.linkedInURL,
      icon: Linkedin,
    },
    {
      label: "Instagram URL",
      value: user?.instagramURL,
      icon: Instagram,
    },
    {
      label: "Twitter(X) URL",
      value: user?.twitterURL,
      icon: Twitter,
    },
    {
      label: "Facebook URL",
      value: user?.facebookURL,
      icon: Facebook,
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        {/* HEADER */}

        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2">
            <Sparkles
              size={16}
              className="text-cyan-400"
            />

            <span className="text-sm text-zinc-300">
              Profile Dashboard
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Profile Overview
          </h1>

          <p className="mt-2 text-zinc-400">
            Manage and preview your personal information.
          </p>
        </div>

        {/* PROFILE CARD */}

        <div className="grid gap-6 lg:grid-cols-[350px_1fr]">
          {/* LEFT SIDE */}

          <div className="space-y-6">
            {/* PROFILE IMAGE */}

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 shadow-2xl">
              <Label className="mb-4 block text-zinc-300">
                Profile Image
              </Label>

              <div className="overflow-hidden rounded-3xl border border-zinc-800">
                <img
                  src={user?.avatar?.url}
                  alt="avatar"
                  className="h-[320px] w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* RESUME */}

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <Label className="text-zinc-300">
                  Resume
                </Label>

                <a
                  href={user?.resume?.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300"
                >
                  Open

                  <ExternalLink size={14} />
                </a>
              </div>

              <a
                href={user?.resume?.url}
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex h-[320px] items-center justify-center rounded-3xl border border-dashed border-zinc-700 bg-zinc-950 transition hover:border-cyan-500">
                  <div className="text-center">
                    <FileText className="mx-auto mb-3 h-16 w-16 text-cyan-400" />

                    <p className="font-medium text-white">
                      View Resume
                    </p>

                    <p className="mt-1 text-sm text-zinc-500">
                      Click to open resume
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl md:p-8">
            <div className="space-y-6">
              {/* NAME */}

              <div>
                <Label className="mb-2 block text-zinc-300">
                  Full Name
                </Label>

                <div className="relative">
                  <User2 className="absolute left-3 top-3.5 h-5 w-5 text-zinc-500" />

                  <Input
                    type="text"
                    value={user?.fullName || ""}
                    disabled
                    className="h-12 border-zinc-700 bg-zinc-800 pl-11 text-white"
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div>
                <Label className="mb-2 block text-zinc-300">
                  Email
                </Label>

                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-zinc-500" />

                  <Input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="h-12 border-zinc-700 bg-zinc-800 pl-11 text-white"
                  />
                </div>
              </div>

              {/* PHONE */}

              <div>
                <Label className="mb-2 block text-zinc-300">
                  Phone
                </Label>

                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 h-5 w-5 text-zinc-500" />

                  <Input
                    type="text"
                    value={user?.phone || ""}
                    disabled
                    className="h-12 border-zinc-700 bg-zinc-800 pl-11 text-white"
                  />
                </div>
              </div>

              {/* ABOUT */}

              <div>
                <Label className="mb-2 block text-zinc-300">
                  About Me
                </Label>

                <Textarea
                  value={user?.aboutMe || ""}
                  disabled
                  className="min-h-[140px] border-zinc-700 bg-zinc-800 text-white"
                />
              </div>

              {/* SOCIAL LINKS */}

              <div className="grid gap-5 md:grid-cols-2">
                {socialLinks.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div key={index}>
                      <Label className="mb-2 block text-zinc-300">
                        {item.label}
                      </Label>

                      <div className="relative">
                        <Icon className="absolute left-3 top-3.5 h-5 w-5 text-zinc-500" />

                        <Input
                          type="text"
                          value={item.value || ""}
                          disabled
                          className="h-12 border-zinc-700 bg-zinc-800 pl-11 text-white"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;