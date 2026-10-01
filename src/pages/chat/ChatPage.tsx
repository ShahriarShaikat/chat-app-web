import { logout } from "@/auth/auth-api";
import Logo from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import {
  Archive,
  ArrowLeft,
  Bell,
  Check,
  CheckCheck,
  ChevronDown,
  FileText,
  Image as ImageIcon,
  Info,
  LogOut,
  MoreHorizontal,
  Paperclip,
  Phone,
  Plus,
  Search,
  Send,
  Settings,
  Smile,
  Users,
  Video,
  X,
} from "lucide-react";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

const people = [
  {
    name: "John Doe",
    email: "john@example.com",
    initials: "JD",
    color: "bg-amber-100 text-amber-800",
    online: true,
  },
  {
    name: "Sarah Ahmed",
    email: "sarah@example.com",
    initials: "SA",
    color: "bg-violet-100 text-violet-700",
    online: true,
  },
  {
    name: "Michael Smith",
    email: "michael@example.com",
    initials: "MS",
    color: "bg-sky-100 text-sky-700",
    online: false,
  },
  {
    name: "Emily Chen",
    email: "emily@example.com",
    initials: "EC",
    color: "bg-rose-100 text-rose-700",
    online: true,
  },
];

const conversations = [
  {
    name: "John Doe",
    preview: "Hey, are you available?",
    time: "10:32 AM",
    initials: "JD",
    color: "bg-amber-100 text-amber-800",
    unread: 2,
    online: true,
  },
  {
    name: "Design Team",
    preview: "Sarah shared a file",
    time: "9:45 AM",
    initials: "DT",
    color: "bg-violet-100 text-violet-700",
    unread: 0,
    group: true,
  },
  {
    name: "Sarah Ahmed",
    preview: "That sounds perfect!",
    time: "Yesterday",
    initials: "SA",
    color: "bg-rose-100 text-rose-700",
    unread: 0,
    online: true,
  },
  {
    name: "Project Alpha",
    preview: "You: Let’s ship it",
    time: "Tuesday",
    initials: "PA",
    color: "bg-sky-100 text-sky-700",
    unread: 0,
    group: true,
  },
  {
    name: "Michael Smith",
    preview: "Thanks for the update",
    time: "Monday",
    initials: "MS",
    color: "bg-emerald-100 text-emerald-700",
    unread: 0,
  },
];

function Avatar({
  initials,
  color,
  online,
  size = "md",
}: {
  initials: string;
  color: string;
  online?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full font-semibold",
        size === "sm"
          ? "size-8 text-[10px]"
          : size === "lg"
            ? "size-16 text-lg"
            : "size-10 text-xs",
        color,
      )}
    >
      {initials}
      <span
        className={cn(
          "absolute bottom-0 right-0 rounded-full border-2 border-card bg-emerald-500",
          size === "sm" ? "size-2" : "size-2.5",
          online ? "block" : "hidden",
        )}
      />
    </div>
  );
}

function ConversationList({ onNew }: { onNew: () => void }) {
  const [search, setSearch] = useState("");
  const { invokeLogout } = useAuth();
  const handleLogOut = async () => {
    try {
      const logoOutRes = await logout();
      if (logoOutRes?.success && logoOutRes.payload) {
        invokeLogout();
        enqueueSnackbar(
          logoOutRes.payload.message || "Logged out successfully",
          {
            anchorOrigin: { horizontal: "center", vertical: "bottom" },
            autoHideDuration: 3000,
            variant: "success",
          },
        );

        // navigate("/chat");
      } else {
        enqueueSnackbar(logoOutRes.payload.message || "Failed to log out", {
          anchorOrigin: { horizontal: "center", vertical: "bottom" },
          autoHideDuration: 3000,
          variant: "error",
        });
      }
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
      enqueueSnackbar("Failed to log out", {
        anchorOrigin: { horizontal: "center", vertical: "bottom" },
        autoHideDuration: 3000,
        variant: "error",
      });
    }
  };
  return (
    <aside className="flex w-full shrink-0 flex-col border-r border-border bg-card md:w-[300px] xl:w-[330px]">
      <div className="flex items-center justify-between p-5 pb-4">
        <Logo />
        <button className="icon-button" aria-label="Settings">
          <Settings />
        </button>
      </div>
      <div className="px-4">
        <div className="flex items-center gap-2 rounded-xl bg-muted/70 px-3 py-2.5">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden rounded border border-border bg-card px-1.5 py-0.5 text-[10px] text-muted-foreground lg:block">
            ⌘ K
          </kbd>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1">
            <button className="rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background">
              All
            </button>
            <button className="rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted">
              Unread
            </button>
            <button className="rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted">
              Groups
            </button>
          </div>
          <button
            onClick={onNew}
            className="icon-button text-[#6253d9]"
            aria-label="New conversation"
          >
            <Plus />
          </button>
        </div>
      </div>
      <div className="mt-4 flex-1 overflow-y-auto px-2">
        {conversations
          .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
          .map((c, i) => (
            <button
              key={c.name}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-muted/70",
                i === 0 && "bg-[#f0effd]",
              )}
            >
              <div className="relative">
                <Avatar
                  initials={c.initials}
                  color={c.color}
                  online={c.online}
                  size="md"
                />
                {c.group && (
                  <span className="absolute -bottom-1 -right-1 rounded bg-card p-0.5">
                    <Users className="size-3 text-muted-foreground" />
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold">
                    {c.name}
                  </span>
                  <span className="shrink-0 text-[10px] text-muted-foreground">
                    {c.time}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="truncate text-xs text-muted-foreground">
                    {c.preview}
                  </span>
                  {c.unread > 0 && (
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#6253d9] text-[10px] font-semibold text-white">
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
      </div>
      <div className="border-t border-border p-3">
        <div className="flex w-full items-center gap-3 p-2 text-left">
          <Avatar initials="AM" color="bg-[#e5e2fb] text-[#6253d9]" size="sm" />
          <span className="flex-1 text-sm font-medium">Alex Morgan</span>
          <button
            onClick={handleLogOut}
            className="hover:bg-muted rounded-xl p-2 cursor-pointer"
          >
            <LogOut className="size-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </aside>
  );
}

function MessageArea() {
  return (
    <section className="flex min-w-0 flex-1 flex-col bg-[#fbfbfd]">
      <header className="flex h-[73px] items-center justify-between border-b border-border bg-card px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button className="icon-button md:hidden">
            <ArrowLeft />
          </button>
          <Avatar initials="JD" color="bg-amber-100 text-amber-800" online />
          <div>
            <h2 className="text-sm font-semibold">John Doe</h2>
            <p className="text-xs text-emerald-600">Active now</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="icon-button hidden sm:flex">
            <Phone />
          </button>
          <button className="icon-button hidden sm:flex">
            <Video />
          </button>
          <button className="icon-button">
            <Search />
          </button>
          <button className="icon-button">
            <MoreHorizontal />
          </button>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-5">
          <div className="flex justify-center">
            <span className="rounded-full bg-muted px-3 py-1 text-[10px] font-medium text-muted-foreground">
              Today
            </span>
          </div>
          <div className="flex items-end gap-2">
            <Avatar
              initials="JD"
              color="bg-amber-100 text-amber-800"
              size="sm"
            />
            <div>
              <p className="mb-1 text-[11px] text-muted-foreground">
                John Doe · 10:30 AM
              </p>
              <div className="max-w-md rounded-2xl rounded-bl-md bg-card px-4 py-3 text-sm leading-6 shadow-sm ring-1 ring-border/70">
                Hey Alex, how are you doing? Are we still on for the design
                review later?
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="max-w-md rounded-2xl rounded-br-md bg-[#6253d9] px-4 py-3 text-sm leading-6 text-white">
              Hey! I&apos;m doing great, thanks. Absolutely, I&apos;ve got the
              latest screens ready to walk through.
            </div>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              10:31 AM <CheckCheck className="size-3 text-[#6253d9]" />
            </span>
          </div>
          <div className="flex items-end gap-2">
            <Avatar
              initials="JD"
              color="bg-amber-100 text-amber-800"
              size="sm"
            />
            <div>
              <p className="mb-1 text-[11px] text-muted-foreground">
                John Doe · 10:32 AM
              </p>
              <div className="max-w-md rounded-2xl rounded-bl-md bg-card px-4 py-3 text-sm leading-6 shadow-sm ring-1 ring-border/70">
                Perfect. I&apos;ll send over the notes beforehand. See you then!
              </div>
            </div>
          </div>
          <div className="my-2 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#d9d6f6]" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6253d9]">
              Unread
            </span>
            <div className="h-px flex-1 bg-[#d9d6f6]" />
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="max-w-md rounded-2xl rounded-br-md bg-[#6253d9] px-4 py-3 text-sm leading-6 text-white">
              Sounds good. Looking forward to it.
            </div>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              Just now <Check className="size-3" />
            </span>
          </div>
          <div className="flex items-center gap-2 px-12 text-xs text-muted-foreground">
            <span className="flex gap-1">
              <i className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
              <i className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:120ms]" />
              <i className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:240ms]" />
            </span>{" "}
            John is typing
          </div>
        </div>
      </div>
      <div className="border-t border-border bg-card p-4 sm:px-6">
        <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-border bg-muted/50 p-2">
          <button className="icon-button">
            <Paperclip />
          </button>
          <textarea
            rows={1}
            placeholder="Write a message..."
            className="max-h-24 min-h-9 flex-1 resize-none bg-transparent px-1 py-2 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button className="icon-button hidden sm:flex">
            <Smile />
          </button>
          <button
            className="flex size-9 items-center justify-center rounded-xl bg-[#6253d9] text-white transition hover:bg-[#5143c8]"
            aria-label="Send message"
          >
            <Send className="size-4" />
          </button>
        </div>
        <p className="mx-auto mt-2 max-w-3xl text-[10px] text-muted-foreground">
          Press Enter to send · Shift + Enter for a new line
        </p>
      </div>
    </section>
  );
}

function DetailsPanel() {
  return (
    <aside className="hidden w-[280px] shrink-0 border-l border-border bg-card xl:flex xl:flex-col">
      <div className="flex h-[73px] items-center justify-between border-b border-border px-5">
        <h3 className="text-sm font-semibold">Conversation details</h3>
        <button className="icon-button">
          <X />
        </button>
      </div>
      <div className="flex flex-col items-center border-b border-border px-5 py-7">
        <Avatar
          initials="JD"
          color="bg-amber-100 text-amber-800"
          online
          size="lg"
        />
        <h2 className="mt-3 text-base font-semibold">John Doe</h2>
        <p className="mt-1 text-xs text-emerald-600">Online</p>
        <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
          Product designer based in New York. Usually replies in a few minutes.
        </p>
        <div className="mt-5 flex gap-2">
          <button className="detail-action">
            <Search />
          </button>
          <button className="detail-action">
            <Bell />
          </button>
          <button className="detail-action">
            <MoreHorizontal />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-5">
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Shared content
        </h4>
        <button className="detail-row">
          <ImageIcon />
          <span>Shared media</span>
          <span className="ml-auto text-xs text-muted-foreground">12</span>
          <ChevronDown />
        </button>
        <button className="detail-row">
          <FileText />
          <span>Files</span>
          <span className="ml-auto text-xs text-muted-foreground">4</span>
          <ChevronDown />
        </button>
        <button className="detail-row">
          <Info />
          <span>Links</span>
          <span className="ml-auto text-xs text-muted-foreground">8</span>
          <ChevronDown />
        </button>
      </div>
      <div className="mt-auto p-5">
        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/30 py-2.5 text-xs font-medium text-destructive hover:bg-destructive/5">
          <Archive className="size-4" /> Archive conversation
        </button>
      </div>
    </aside>
  );
}

function NewConversation({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const visible = people.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="absolute inset-0 z-20 flex items-end justify-center bg-foreground/20 p-0 backdrop-blur-[2px] sm:items-center sm:p-6">
      <div className="flex h-full w-full max-w-lg flex-col bg-card shadow-2xl sm:h-auto sm:max-h-[720px] sm:rounded-2xl sm:border sm:border-border">
        <header className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h2 className="font-semibold">New conversation</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Start a direct message or group chat
            </p>
          </div>
          <button onClick={onClose} className="icon-button">
            <X />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex items-center gap-2 rounded-xl bg-muted/70 px-3 py-2.5">
            <Search className="size-4 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search people by name or email"
              className="flex-1 bg-transparent text-sm outline-none"
            />
          </div>
          {selected.length > 0 && (
            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold text-muted-foreground">
                Selected people
              </p>
              <div className="flex flex-wrap gap-2">
                {selected.map((name) => (
                  <span
                    key={name}
                    className="flex items-center gap-1.5 rounded-full bg-[#efedff] px-2.5 py-1 text-xs font-medium text-[#6253d9]"
                  >
                    {name}
                    <button
                      onClick={() =>
                        setSelected(selected.filter((s) => s !== name))
                      }
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold text-muted-foreground">
              Suggested people
            </p>
            {visible.length ? (
              <div className="flex flex-col gap-1">
                {visible.map((person) => {
                  const isSelected = selected.includes(person.name);
                  return (
                    <button
                      key={person.name}
                      onClick={() =>
                        setSelected(
                          isSelected
                            ? selected.filter((s) => s !== person.name)
                            : [...selected, person.name],
                        )
                      }
                      className={cn(
                        "flex items-center gap-3 rounded-xl p-3 text-left hover:bg-muted",
                        isSelected && "bg-[#f5f4ff]",
                      )}
                    >
                      <Avatar
                        initials={person.initials}
                        color={person.color}
                        online={person.online}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{person.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {person.email}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "flex size-8 items-center justify-center rounded-full border",
                          isSelected
                            ? "border-[#6253d9] bg-[#6253d9] text-white"
                            : "border-border text-muted-foreground",
                        )}
                      >
                        {isSelected ? (
                          <Check className="size-4" />
                        ) : (
                          <Plus className="size-4" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center">
                <Search className="mx-auto size-8 text-muted-foreground/40" />
                <p className="mt-3 text-sm font-medium">No people found</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Try a different name or email.
                </p>
              </div>
            )}
          </div>
          {selected.length > 1 && (
            <div className="mt-6 rounded-xl border border-border p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-[#efedff] text-[#6253d9]">
                  <Users className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Group conversation</p>
                  <p className="text-xs text-muted-foreground">
                    {selected.length} members selected
                  </p>
                </div>
              </div>
              <input
                className="field mt-4"
                placeholder="Group name (optional)"
              />
            </div>
          )}
        </div>
        <footer className="border-t border-border p-5">
          <button
            disabled={!selected.length}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#6253d9] text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {selected.length > 1 ? (
              <>
                <Users className="size-4" /> Create group
              </>
            ) : (
              <>
                <Send className="size-4" /> Start conversation
              </>
            )}
          </button>
        </footer>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const [newOpen, setNewOpen] = useState(false);
  return (
    <main className="relative flex h-screen overflow-hidden bg-card">
      <ConversationList onNew={() => setNewOpen(true)} />
      <MessageArea />
      <DetailsPanel />
      {newOpen && <NewConversation onClose={() => setNewOpen(false)} />}
    </main>
  );
}
