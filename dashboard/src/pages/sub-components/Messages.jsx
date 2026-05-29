





// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// import { Button } from "@/components/ui/button";

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import {
//   clearAllMessageErrors,
//   deleteMessage,
//   getAllMessages,
//   resetMessagesSlice,
// } from "@/store/slices/messageSlice";

// import {
//   Mail,
//   Trash2,
//   ArrowLeft,
//   User,
//   MessageSquare,
//   FileText,
//   Inbox,
// } from "lucide-react";

// import SpecialLoadingButton from "./SpecialLoadingButton";

// const Messages = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { messages, loading, error, message } =
//     useSelector((state) => state.messages);

//   const [messageId, setMessageId] = useState("");

//   const handleDelete = (id) => {
//     setMessageId(id);
//     dispatch(deleteMessage(id));
//   };

//   useEffect(() => {
//     dispatch(getAllMessages());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearAllMessageErrors());
//     }

//     if (message) {
//       toast.success(message);
//       dispatch(resetMessagesSlice());
//       dispatch(getAllMessages());
//     }
//   }, [dispatch, error, message]);

//   return (
//     <div className="min-h-screen bg-zinc-950 text-white">
//       <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
//         {/* Header */}
//         <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <div>
//             <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2">
//               <Mail size={16} className="text-cyan-400" />
//               <span className="text-sm text-zinc-300">
//                 Inbox Management
//               </span>
//             </div>

//             <h1 className="text-4xl font-bold tracking-tight">
//               Messages
//             </h1>

//             <p className="mt-2 text-zinc-400">
//               Manage all received contact messages.
//             </p>
//           </div>

//           <Button
//             onClick={() => navigate("/")}
//             className="h-12 rounded-xl bg-cyan-500 px-6 text-white hover:bg-cyan-600"
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Dashboard
//           </Button>
//         </div>

//         {/* Main Card */}
//         <Card className="border border-zinc-800 bg-zinc-900 shadow-2xl">
//           <CardHeader className="border-b border-zinc-800">
//             <div className="flex items-center justify-between">
//               <div>
//                 <CardTitle className="text-2xl text-white">
//                   Inbox
//                 </CardTitle>

//                 <p className="mt-1 text-sm text-zinc-400">
//                   Total Messages: {messages?.length || 0}
//                 </p>
//               </div>

//               <div className="hidden rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 md:block">
//                 Live Messages
//               </div>
//             </div>
//           </CardHeader>

//           <CardContent className="p-6">
//             {messages && messages.length > 0 ? (
//               <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//                 {messages.map((element) => (
//                   <div
//                     key={element._id}
//                     className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10"
//                   >
//                     {/* Glow Effect */}
//                     <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

//                     {/* User */}
//                     <div className="mb-5 flex items-center gap-3">
//                       <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
//                         <User size={22} />
//                       </div>

//                       <div>
//                         <h3 className="font-semibold text-white">
//                           {element.senderName}
//                         </h3>

//                         <p className="text-xs text-zinc-500">
//                           Message Sender
//                         </p>
//                       </div>
//                     </div>

//                     {/* Subject */}
//                     <div className="mb-4">
//                       <div className="mb-2 flex items-center gap-2 text-cyan-400">
//                         <FileText size={16} />
//                         <span className="text-sm font-medium">
//                           Subject
//                         </span>
//                       </div>

//                       <p className="rounded-xl bg-zinc-900 p-3 text-sm text-zinc-300">
//                         {element.subject}
//                       </p>
//                     </div>

//                     {/* Message */}
//                     <div className="mb-6">
//                       <div className="mb-2 flex items-center gap-2 text-cyan-400">
//                         <MessageSquare size={16} />
//                         <span className="text-sm font-medium">
//                           Message
//                         </span>
//                       </div>

//                       <p className="rounded-xl bg-zinc-900 p-4 text-sm leading-relaxed text-zinc-300">
//                         {element.message}
//                       </p>
//                     </div>

//                     {/* Action */}
//                     <div className="flex justify-end">
//                       {loading &&
//                       messageId === element._id ? (
//                         <SpecialLoadingButton
//                           content={"Deleting"}
//                           width={"w-36"}
//                         />
//                       ) : (
//                         <Button
//                           onClick={() =>
//                             handleDelete(element._id)
//                           }
//                           className="h-11 rounded-xl bg-red-500 px-5 text-white hover:bg-red-600"
//                         >
//                           <Trash2 className="mr-2 h-4 w-4" />
//                           Delete
//                         </Button>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-800 bg-zinc-950">
//                 <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900">
//                   <Inbox size={40} className="text-zinc-600" />
//                 </div>

//                 <h2 className="text-2xl font-bold text-white">
//                   No Messages Found
//                 </h2>

//                 <p className="mt-2 text-zinc-500">
//                   Your inbox is currently empty.
//                 </p>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Messages;




import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  clearAllMessageErrors,
  deleteMessage,
  getAllMessages,
  resetMessagesSlice,
} from "@/store/slices/messageSlice";

import {
  Mail,
  Trash2,
  ArrowLeft,
  User,
  MessageSquare,
  FileText,
  Inbox,
} from "lucide-react";

import SpecialLoadingButton from "./SpecialLoadingButton";

const Messages = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { messages = [], loading, error, message } =
    useSelector((state) => state.messages || {});

  const [messageId, setMessageId] = useState(null);

  const handleDelete = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
  };

  useEffect(() => {
    dispatch(getAllMessages());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessageErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(resetMessagesSlice());
      dispatch(getAllMessages());
    }
  }, [error, message, dispatch]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">

        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2">
              <Mail size={16} className="text-cyan-400" />
              <span className="text-sm text-zinc-300">
                Inbox Management
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-bold text-white">
              Messages
            </h1>

            <p className="mt-2 text-zinc-400">
              Manage all received contact messages in real-time.
            </p>
          </div>

          <Button
            onClick={() => navigate("/")}
            className="h-11 rounded-xl bg-cyan-500 px-6 text-white hover:bg-cyan-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        {/* CARD */}
        <Card className="border border-zinc-800 bg-zinc-900 shadow-xl">
          <CardHeader className="border-b border-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-white">
                  Inbox
                </CardTitle>
                <p className="mt-1 text-sm text-zinc-400">
                  Total Messages: {messages.length}
                </p>
              </div>

              <div className="hidden rounded-full bg-cyan-500/10 px-4 py-2 text-xs text-cyan-300 md:block">
                Live Feed
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {messages.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className="group relative rounded-2xl border border-zinc-800 bg-zinc-950 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40"
                  >
                    {/* USER */}
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                        <User size={20} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-white">
                          {msg.senderName}
                        </h3>
                        <p className="text-xs text-zinc-500">
                          Sender
                        </p>
                      </div>
                    </div>

                    {/* SUBJECT */}
                    <div className="mb-4">
                      <div className="mb-1 flex items-center gap-2 text-cyan-400">
                        <FileText size={14} />
                        <span className="text-xs">Subject</span>
                      </div>

                      <div className="rounded-lg bg-zinc-900 p-3 text-sm text-zinc-300">
                        {msg.subject}
                      </div>
                    </div>

                    {/* MESSAGE */}
                    <div className="mb-5">
                      <div className="mb-1 flex items-center gap-2 text-cyan-400">
                        <MessageSquare size={14} />
                        <span className="text-xs">Message</span>
                      </div>

                      <div className="rounded-lg bg-zinc-900 p-3 text-sm text-zinc-300 leading-relaxed">
                        {msg.message}
                      </div>
                    </div>

                    {/* DELETE */}
                    <div className="flex justify-end">
                      {loading && messageId === msg._id ? (
                        <SpecialLoadingButton
                          content="Deleting..."
                          width="w-32"
                        />
                      ) : (
                        <Button
                          onClick={() => handleDelete(msg._id)}
                          className="h-10 rounded-lg bg-red-500 px-4 text-white hover:bg-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900">
                  <Inbox size={32} className="text-zinc-500" />
                </div>

                <h2 className="text-xl font-semibold text-white">
                  No Messages Found
                </h2>

                <p className="mt-2 text-zinc-500">
                  Inbox is currently empty.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Messages;