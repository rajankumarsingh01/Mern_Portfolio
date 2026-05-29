



import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, FileText, MessageSquare, CheckCircle } from "lucide-react";

const fields = [
  {
    id: "senderName",
    label: "Your Name",
    type: "text",
    placeholder: "Rajan Kumar Singh",
    icon: User,
  },
  {
    id: "subject",
    label: "Subject",
    type: "text",
    placeholder: "Let's work together",
    icon: FileText,
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    senderName: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://mern-portfolio-backend-ke5j.onrender.com/api/v1/message/send",
        formData,
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      toast.success(data.message);
      setSent(true);
      setFormData({ senderName: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 3500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-24 relative overflow-hidden">

      {/* ── ambient bg ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(74,222,128,0.03) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
        }}
      />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "500px", height: "300px",
          background: "radial-gradient(ellipse, rgba(74,222,128,0.05) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* ── heading ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-px w-8 bg-green-500 opacity-60" />
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(74,222,128,0.7)",
            }}
          >
            Get In Touch
          </span>
          <div className="h-px w-8 bg-green-500 opacity-60" />
        </div>
        <h2
          className="text-4xl md:text-6xl font-black tracking-tight leading-none"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          <span className="text-white">Contact </span>
          <span
            style={{
              WebkitTextStroke: "1.5px rgba(74,222,128,0.85)",
              WebkitTextFillColor: "transparent",
            }}
          >
            Me
          </span>
        </h2>
      </motion.div>

      {/* ── form card ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl mx-auto relative"
      >
        {/* card glow border */}
        <div
          className="absolute -inset-px rounded-2xl pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(74,222,128,0.15) 0%, transparent 50%, rgba(74,222,128,0.08) 100%)",
            borderRadius: "18px",
          }}
        />

        <div
          className="relative rounded-2xl p-8 md:p-10"
          style={{
            background: "rgba(10,10,16,0.92)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(24px)",
          }}
        >
          <form onSubmit={handleMessage} className="flex flex-col gap-7">

            {/* name + subject */}
            {fields.map(({ id, label, type, placeholder, icon: Icon }, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.08 }}
                className="flex flex-col gap-2"
              >
                <label
                  htmlFor={id}
                  className="flex items-center gap-2 text-xs font-medium"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    color: focused === id ? "rgb(134,239,172)" : "rgb(107,114,128)",
                    transition: "color 0.2s",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  <Icon size={13} strokeWidth={1.8} />
                  {label}
                </label>
                <div className="relative">
                  <input
                    id={id}
                    type={type}
                    name={id}
                    value={formData[id]}
                    onChange={handleChange}
                    onFocus={() => setFocused(id)}
                    onBlur={() => setFocused(null)}
                    placeholder={placeholder}
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: focused === id
                        ? "1px solid rgba(74,222,128,0.5)"
                        : "1px solid rgba(255,255,255,0.07)",
                      color: "rgb(229,231,235)",
                      fontFamily: "'DM Mono', monospace",
                      boxShadow: focused === id
                        ? "0 0 0 3px rgba(74,222,128,0.07)"
                        : "none",
                    }}
                  />
                  {/* char fill indicator */}
                  {formData[id] && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      className="absolute bottom-0 left-0 h-[2px] rounded-b-xl"
                      style={{
                        width: "100%",
                        background:
                          "linear-gradient(90deg, #4ade80, transparent)",
                        transformOrigin: "left",
                      }}
                    />
                  )}
                </div>
              </motion.div>
            ))}

            {/* message */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.31 }}
              className="flex flex-col gap-2"
            >
              <label
                htmlFor="message"
                className="flex items-center gap-2 text-xs font-medium"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  color: focused === "message" ? "rgb(134,239,172)" : "rgb(107,114,128)",
                  transition: "color 0.2s",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                <MessageSquare size={13} strokeWidth={1.8} />
                Message
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  rows="5"
                  placeholder="Tell me about your project or opportunity..."
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: focused === "message"
                      ? "1px solid rgba(74,222,128,0.5)"
                      : "1px solid rgba(255,255,255,0.07)",
                    color: "rgb(229,231,235)",
                    fontFamily: "'DM Mono', monospace",
                    boxShadow: focused === "message"
                      ? "0 0 0 3px rgba(74,222,128,0.07)"
                      : "none",
                  }}
                />
                {/* char count */}
                <span
                  className="absolute bottom-3 right-3 text-[10px]"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    color: "rgba(74,222,128,0.35)",
                  }}
                >
                  {formData.message.length}
                </span>
                {formData.message && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className="absolute bottom-0 left-0 h-[2px] rounded-b-xl"
                    style={{
                      width: "100%",
                      background: "linear-gradient(90deg, #4ade80, transparent)",
                      transformOrigin: "left",
                    }}
                  />
                )}
              </div>
            </motion.div>

            {/* submit */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.38 }}
              className="flex justify-end pt-1"
            >
              <motion.button
                type="submit"
                disabled={loading || sent}
                whileHover={!loading && !sent ? { scale: 1.03 } : {}}
                whileTap={!loading && !sent ? { scale: 0.97 } : {}}
                className="relative flex items-center gap-2.5 px-7 py-3 rounded-xl text-sm font-semibold overflow-hidden cursor-pointer"
                style={{
                  background: sent
                    ? "rgba(74,222,128,0.15)"
                    : "rgba(74,222,128,0.12)",
                  border: sent
                    ? "1px solid rgba(74,222,128,0.6)"
                    : "1px solid rgba(74,222,128,0.35)",
                  color: "rgb(134,239,172)",
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: "0.05em",
                  minWidth: "160px",
                  justifyContent: "center",
                }}
              >
                {/* shimmer sweep on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.55, ease: "easeInOut" }}
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(74,222,128,0.12), transparent)",
                  }}
                />

                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle size={15} strokeWidth={2} />
                      Sent!
                    </motion.span>
                  ) : loading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-3.5 h-3.5 border-2 rounded-full"
                        style={{
                          borderColor: "rgba(134,239,172,0.3)",
                          borderTopColor: "rgb(134,239,172)",
                        }}
                      />
                      Sending...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Send size={14} strokeWidth={1.8} />
                      Send Message
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>

          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;