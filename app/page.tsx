"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";
import Image from "next/image";
import { theme } from "./theme";

interface ChatItem {
  query: string;
  response?: string;
  status: "complete" | "loading";
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [chat, setChat] = useState<ChatItem[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const isProcessing =
    chat.length > 0 && chat[chat.length - 1].status === "loading";

  // Scroll to bottom whenever chat updates
  useEffect(() => {
    // if (chatContainerRef.current) {
    //   const scrollContainer = chatContainerRef.current;
    //   scrollContainer.scrollTop = scrollContainer.scrollHeight;
    // }
  }, [chat]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isProcessing) return;

    const currentQuery = query;
    setQuery("");

    // Immediately add user's message with loading state
    setChat((prev) => [...prev, { query: currentQuery, status: "loading" }]);

    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: currentQuery }),
      });

      if (!res.ok)
        throw new Error(`Server responded with status: ${res.status}`);

      const data = await res.json();

      // Update the message with the response
      setChat((prev) =>
        prev.map((item, idx) =>
          idx === prev.length - 1
            ? { ...item, response: data.response, status: "complete" as const }
            : item
        )
      );
    } catch (error) {
      console.error("Error fetching response:", error);
      setChat((prev) =>
        prev.map((item, idx) =>
          idx === prev.length - 1
            ? {
                ...item,
                response: `Error connecting to the server. Please make sure the backend is running.\n\nError: ${
                  error instanceof Error ? error.message : "Unknown error"
                }`,
                status: "complete" as const,
              }
            : item
        )
      );
    }
  };

  return (
    <div className="flex h-screen flex-col chat-background">
      {/* Header */}
      <header className="fixed top-0 z-10 w-full glass-effect shadow-md border-b border-gray-100/20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="">
            {/* Logo Section */}
            <div className="flex items-center">
              <div className="relative h-20 w-[450px]">
                <Image
                  src="/plq.png"
                  alt="PartnerLinQ Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-hidden pt-32 mesh-gradient">
        <div className="mx-auto h-full max-w-6xl p-6">
          <div className="flex h-full flex-col scrollmooth">
            <div
              // ref={chatContainerRef}
              className="flex-1 space-y-5 overflow-y-auto px-6 py-8 "
            >
              {chat.length === 0 && (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center glass-effect p-10 rounded-2xl max-w-2xl w-full">
                    <h4
                      className="mb-3 text-2xl font-semibold"
                      style={{ color: theme.colors.brand.primary }}
                    >
                      Welcome to PartnerLinQ AI Assistant
                    </h4>
                    <p
                      className="text-base text-sm"
                      style={{ color: theme.colors.ui.header.poweredBy }}
                    >
                      Ask anything about PartnerLinQ. Get fast, accurate
                      answers.
                    </p>
                  </div>
                </div>
              )}
              {chat.map((item, idx) => (
                <div key={idx} className="space-y-5">
                  <div className="flex justify-end items-start space-x-3">
                    <div
                      className="message-bubble max-w-[70%] rounded-2xl rounded-tr-sm px-5 py-3 text-white"
                      style={{
                        backgroundColor: theme.colors.message.user.background,
                      }}
                    >
                      <div className="flex items-center space-x-2 mb-1.5">
                        <User className="h-4 w-4" />
                        <span className="text-xs font-medium">You</span>
                      </div>
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">
                        {item.query}
                      </p>
                    </div>
                  </div>
                  {(item.status === "complete" ||
                    item.status === "loading") && (
                    <div className="flex justify-start items-start space-x-3">
                      <div className="message-bubble max-w-[70%] rounded-2xl rounded-tl-sm glass-effect px-5 py-3">
                        <div className="flex items-center space-x-2 mb-1.5">
                          <Bot
                            className="h-4 w-4"
                            style={{ color: theme.colors.brand.primary }}
                          />
                          <span
                            className="text-xs font-medium"
                            style={{ color: theme.colors.brand.primary }}
                          >
                            PartnerLinQ AI
                          </span>
                        </div>
                        {item.status === "loading" ? (
                          <div className="flex items-center space-x-2">
                            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                            <div
                              className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                            <div
                              className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                              style={{ animationDelay: "0.4s" }}
                            ></div>
                          </div>
                        ) : (
                          <p
                            className="whitespace-pre-wrap text-sm leading-relaxed"
                            style={{ color: theme.colors.message.ai.text }}
                          >
                            {item.response}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="glass-effect p-5 rounded-t-xl">
              <form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
                <div className="flex items-end space-x-4">
                  <div className="relative flex-1">
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Type your message here..."
                      className="min-h-[48px] rounded-xl px-5 py-3 pr-12 text-sm"
                      style={{
                        backgroundColor:
                          theme.colors.interactive.input.background,
                        borderColor: theme.colors.interactive.input.border,
                      }}
                      disabled={isProcessing}
                    />
                    <Button
                      type="submit"
                      disabled={isProcessing}
                      className="absolute bottom-2 right-2 rounded-lg p-2 text-white transition-colors hover:opacity-90"
                      style={{
                        backgroundColor:
                          theme.colors.interactive.button.background,
                      }}
                    >
                      {isProcessing ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
