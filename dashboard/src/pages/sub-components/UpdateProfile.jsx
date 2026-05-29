





import React, { useEffect, useState } from "react";

import {
  UserRound,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  Upload,
  FileText,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  clearAllUserErrors,
  getUser,
  resetProfile,
  updateProfile,
} from "@/store/slices/userSlice";

import SpecialLoadingButton from "./SpecialLoadingButton";

import { Link } from "react-router-dom";

const UpdateProfile = () => {
  const { user, loading, error, isUpdated, message } =
    useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [portfolioURL, setPortfolioURL] = useState("");

  const [linkedInURL, setLinkedInURL] = useState("");
  const [githubURL, setGithubURL] = useState("");
  const [instagramURL, setInstagramURL] = useState("");
  const [twitterURL, setTwitterURL] = useState("");
  const [facebookURL, setFacebookURL] = useState("");

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] =
    useState("");

  /* SET USER DATA */
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAboutMe(user.aboutMe || "");
      setPortfolioURL(user.portfolioURL || "");
      setLinkedInURL(user.linkedInURL || "");
      setGithubURL(user.githubURL || "");
      setInstagramURL(user.instagramURL || "");
      setTwitterURL(user.twitterURL || "");
      setFacebookURL(user.facebookURL || "");

      setAvatarPreview(user?.avatar?.url || "");
      setResumePreview(user?.resume?.url || "");
    }
  }, [user]);

  /* FILE HANDLERS */

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("aboutMe", aboutMe);
    formData.append("portfolioURL", portfolioURL);
    formData.append("linkedInURL", linkedInURL);
    formData.append("githubURL", githubURL);
    formData.append("instagramURL", instagramURL);
    formData.append("twitterURL", twitterURL);
    formData.append("facebookURL", facebookURL);

    if (avatar) formData.append("avatar", avatar);
    if (resume) formData.append("resume", resume);

    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }

    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }

    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message, isUpdated]);

  const InputField = ({
    label,
    icon: Icon,
    value,
    onChange,
    type = "text",
    placeholder,
  }) => (
    <div>
      <Label className="mb-2 block text-zinc-300">
        {label}
      </Label>

      <div className="relative">
        <Icon className="absolute left-3 top-3.5 h-5 w-5 text-zinc-500" />

        <Input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-12 border-zinc-700 bg-zinc-800 pl-11 text-white placeholder:text-zinc-500"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* HEADER */}

        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2">
            <Sparkles
              size={16}
              className="text-cyan-400"
            />

            <span className="text-sm text-zinc-300">
              Profile Management
            </span>
          </div>

          <h1 className="text-4xl font-bold">
            Update Profile
          </h1>

          <p className="mt-2 text-zinc-400">
            Edit your personal details and social links
          </p>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleUpdateProfile}
          className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl md:p-8"
        >
          {/* AVATAR + RESUME */}

          <div className="grid gap-6 md:grid-cols-2">
            {/* AVATAR */}

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <Label className="mb-3 block">
                Profile Image
              </Label>

              <img
                src={
                  avatarPreview ||
                  "/avatarHolder.jpg"
                }
                className="h-64 w-full rounded-2xl object-cover"
              />

              <input
                type="file"
                onChange={avatarHandler}
                className="mt-4 w-full text-sm text-zinc-400"
              />
            </div>

            {/* RESUME */}

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
              <Label className="mb-3 block">
                Resume
              </Label>

              <Link
                to={resumePreview}
                target="_blank"
              >
                <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-zinc-700">
                  <FileText className="h-10 w-10 text-cyan-400" />
                </div>
              </Link>

              <input
                type="file"
                onChange={resumeHandler}
                className="mt-4 w-full text-sm text-zinc-400"
              />
            </div>
          </div>

          {/* INPUTS */}

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <InputField
              label="Full Name"
              icon={UserRound}
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
            />

            <InputField
              label="Email"
              icon={Mail}
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              type="email"
            />

            <InputField
              label="Phone"
              icon={Phone}
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />

            <InputField
              label="Portfolio"
              icon={Globe}
              value={portfolioURL}
              onChange={(e) =>
                setPortfolioURL(e.target.value)
              }
            />

            <InputField
              label="LinkedIn"
              icon={Linkedin}
              value={linkedInURL}
              onChange={(e) =>
                setLinkedInURL(e.target.value)
              }
            />

            <InputField
              label="Github"
              icon={Github}
              value={githubURL}
              onChange={(e) =>
                setGithubURL(e.target.value)
              }
            />

            <InputField
              label="Instagram"
              icon={Instagram}
              value={instagramURL}
              onChange={(e) =>
                setInstagramURL(e.target.value)
              }
            />

            <InputField
              label="Twitter"
              icon={Twitter}
              value={twitterURL}
              onChange={(e) =>
                setTwitterURL(e.target.value)
              }
            />

            <InputField
              label="Facebook"
              icon={Facebook}
              value={facebookURL}
              onChange={(e) =>
                setFacebookURL(e.target.value)
              }
            />
          </div>

          {/* ABOUT */}

          <div className="mt-5">
            <Label className="mb-2 block text-zinc-300">
              About Me
            </Label>

            <Textarea
              value={aboutMe}
              onChange={(e) =>
                setAboutMe(e.target.value)
              }
              className="min-h-[140px] border-zinc-700 bg-zinc-800 text-white"
            />
          </div>

          {/* BUTTON */}

          <div className="mt-8">
            {!loading ? (
              <Button
                type="submit"
                className="h-12 w-full rounded-2xl bg-cyan-500 text-black"
              >
                Update Profile
              </Button>
            ) : (
              <SpecialLoadingButton
                content="Updating Profile"
                width="w-full"
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;