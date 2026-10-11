// function ConversationCard() {
//   return <button
//               key={c.name}
//               className={cn(
//                 "flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-muted/70",
//                 i === 0 && "bg-[#f0effd]",
//               )}
//             >
//               <div className="relative">
//                 <Avatar
//                   initials={c.initials}
//                   color={c.color}
//                   online={c.online}
//                   size="md"
//                 />
//                 {c.group && (
//                   <span className="absolute -bottom-1 -right-1 rounded bg-card p-0.5">
//                     <Users className="size-3 text-muted-foreground" />
//                   </span>
//                 )}
//               </div>
//               <div className="min-w-0 flex-1">
//                 <div className="flex items-center justify-between gap-2">
//                   <span className="truncate text-sm font-semibold">
//                     {c.name}
//                   </span>
//                   <span className="shrink-0 text-[10px] text-muted-foreground">
//                     {c.time}
//                   </span>
//                 </div>
//                 <div className="mt-1 flex items-center justify-between gap-2">
//                   <span className="truncate text-xs text-muted-foreground">
//                     {c.preview}
//                   </span>
//                   {c.unread > 0 && (
//                     <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#6253d9] text-[10px] font-semibold text-white">
//                       {c.unread}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </button>;
// }

// export default ConversationCard;
