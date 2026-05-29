






import React, { useEffect, useState } from "react";

import {
  LockKeyhole,
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import {
  clearAllUserErrors,
  resetProfile,
  updatePassword,
} from "@/store/slices/userSlice";

import SpecialLoadingButton from "./SpecialLoadingButton";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmNewPassword, setConfirmNewPassword] =
    useState("");

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] = useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const {
    loading,
    error,
    message,
    isUpdated,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    dispatch(
      updatePassword(
        currentPassword,
        newPassword,
        confirmNewPassword
      )
    );
  };

  useEffect(() => {
    if (error) {
      toast.error(error);

      dispatch(clearAllUserErrors());
    }

    if (isUpdated) {
      dispatch(resetProfile());
    }

    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message, isUpdated]);

  const PasswordField = ({
    label,
    value,
    setValue,
    show,
    setShow,
    placeholder,
  }) => (
    <div>
      <Label className="mb-2 block text-zinc-300">
        {label}
      </Label>

      <div className="relative">
        <LockKeyhole className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />

        <Input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) =>
            setValue(e.target.value)
          }
          placeholder={placeholder}
          className="h-12 rounded-2xl border-zinc-700 bg-zinc-800 pl-12 pr-12 text-white placeholder:text-zinc-500 focus:border-cyan-500 focus:ring-cyan-500"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-3 text-zinc-500 transition hover:text-cyan-400"
        >
          {show ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-3xl px-4 py-10">
        {/* HEADER */}

        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2">
            <Sparkles
              size={16}
              className="text-cyan-400"
            />

            <span className="text-sm text-zinc-300">
              Security Settings
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Update Password
          </h1>

          <p className="mt-2 text-zinc-400">
            Secure your account with a stronger
            password.
          </p>
        </div>

        {/* CARD */}

        <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl">
          {/* TOP SECTION */}

          <div className="border-b border-zinc-800 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500 text-white shadow-lg shadow-cyan-500/30">
                <ShieldCheck size={28} />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  Password Security
                </h2>

                <p className="text-sm text-zinc-400">
                  Keep your account safe &
                  protected.
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}

          <form
            onSubmit={handleUpdatePassword}
            className="space-y-6 p-6 md:p-8"
          >
            <PasswordField
              label="Current Password"
              value={currentPassword}
              setValue={setCurrentPassword}
              show={showCurrent}
              setShow={setShowCurrent}
              placeholder="Enter current password"
            />

            <PasswordField
              label="New Password"
              value={newPassword}
              setValue={setNewPassword}
              show={showNew}
              setShow={setShowNew}
              placeholder="Enter new password"
            />

            <PasswordField
              label="Confirm New Password"
              value={confirmNewPassword}
              setValue={setConfirmNewPassword}
              show={showConfirm}
              setShow={setShowConfirm}
              placeholder="Confirm new password"
            />

            {/* PASSWORD RULES */}

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
              <p className="mb-2 text-sm font-semibold text-cyan-400">
                Password Requirements
              </p>

              <ul className="space-y-1 text-sm text-zinc-400">
                <li>
                  • Minimum 8 characters
                </li>

                <li>
                  • Use uppercase & lowercase
                </li>

                <li>
                  • Include numbers & symbols
                </li>

                <li>
                  • Avoid common passwords
                </li>
              </ul>
            </div>

            {/* BUTTON */}

            {!loading ? (
              <Button
                type="submit"
                className="h-12 w-full rounded-2xl bg-cyan-500 text-base font-semibold text-black transition-all duration-300 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30"
              >
                Update Password
              </Button>
            ) : (
              <SpecialLoadingButton
                content={"Updating Password"}
                width={"w-full"}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;