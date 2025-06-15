
import React, { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

type Note = {
  id: number;
  author: string;
  message: string;
  time: string;
};

const DUMMY_NAMES = [
  "Maria Gomez",
  "James Lee",
  "Lina Patel",
  "Oscar Wu",
  "Priya Desai",
  "Elle Tran",
];

function getFormattedTime() {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const TeamMessageBoard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      author: "Maria Gomez",
      message: "Please restock bottled water in aisle 5.",
      time: "09:05 AM"
    },
    {
      id: 2,
      author: "James Lee",
      message: "Customer reported spill by bakery section.",
      time: "09:10 AM"
    },
  ]);
  const [msg, setMsg] = useState("");
  const [author, setAuthor] = useState(DUMMY_NAMES[0]);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!msg.trim()) return;
    setNotes([
      ...notes,
      {
        id: Date.now(),
        author,
        message: msg.trim(),
        time: getFormattedTime()
      }
    ]);
    setMsg("");
  }

  return (
    <section className="w-full max-w-4xl mx-auto mb-4 animate-fade-in">
      <Card className="bg-white/90 rounded-2xl border-blue-100 shadow-lg border">
        <CardContent className="py-5">
          <div className="flex items-center gap-2 mb-2">
            <Users size={20} className="text-[#0071ce]" />
            <CardTitle className="text-base font-bold text-[#0071ce] font-playfair">
              Team Message Board
            </CardTitle>
          </div>
          <form
            className="flex flex-col md:flex-row gap-2 items-stretch mb-3"
            onSubmit={handleSend}
          >
            <select
              value={author}
              onChange={e => setAuthor(e.target.value)}
              className="border rounded px-2 py-1 text-sm outline-[#0071ce]/60"
            >
              {DUMMY_NAMES.map(name =>
                <option key={name} value={name}>{name}</option>
              )}
            </select>
            <input
              type="text"
              value={msg}
              onChange={e => setMsg(e.target.value)}
              placeholder="Leave a note for your team..."
              className="flex-1 border px-3 py-1 rounded text-sm outline-[#0071ce]/60"
              maxLength={120}
              required
            />
            <Button type="submit" className="bg-[#ffc220] text-[#0071ce] px-3 py-1 rounded-lg shadow">
              Post
            </Button>
          </form>
          <ul className="flex flex-col gap-2 max-h-40 overflow-y-auto text-sm">
            {notes.slice().reverse().map(n => (
              <li
                key={n.id}
                className="flex items-start gap-2 bg-[#f6fafd] border-l-4 border-[#ffc220] shadow-sm rounded-lg px-3 py-2"
              >
                <span className="font-semibold text-[#0071ce]">{n.author}</span>
                <span className="text-gray-700">{n.message}</span>
                <span className="ml-auto text-xs text-gray-400">{n.time}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
};

export default TeamMessageBoard;
