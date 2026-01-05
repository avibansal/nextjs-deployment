// "use client";
// import { useEffect, useState } from "react";

// export default function PopupModal() {
//   const [open, setOpen] = useState(false);

//   // Close on ESC
//   useEffect(() => {
//     const handler = (e) => e.key === "Escape" && setOpen(false);
//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, []);

//   return (
//     <>
//       {/* Trigger */}
//       <button
//         onClick={() => setOpen(true)}
//         className="h-12 w-12 rounded-full bg-zinc-900 text-white text-2xl shadow-lg hover:scale-105 transition"
//       >
//         +
//       </button>

//       {/* Popup */}
//       {open && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
//           onClick={() => setOpen(false)}
//         >
//           <div
//             onClick={(e) => e.stopPropagation()}
//             className="
//               w-[420px] rounded-2xl bg-white p-6 shadow-2xl
//               transition-all duration-200 scale-100
//             "
//           >
//             {/* Header */}
//             <div className="flex justify-between items-center">
//               <h2 className="text-lg font-semibold">Create New</h2>
//               <button
//                 onClick={() => setOpen(false)}
//                 className="text-zinc-500 hover:text-zinc-800"
//               >
//                 ✕
//               </button>
//             </div>

//             {/* Body */}
//             <div className="mt-4">
//               <input
//                 placeholder="Enter something..."
//                 className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
//               />
//             </div>

//             {/* Footer */}
//             <div className="mt-6 flex justify-end gap-3">
//               <button onClick={() => setOpen(false)} className="text-sm">
//                 Cancel
//               </button>
//               <button className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white">
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
