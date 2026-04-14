"use client";

import {
  useActionState,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
} from "react";
import { addNote, ActionState } from "@/app/actions/note";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Eye,
} from "lucide-react";

export function NoteForm() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    addNote,
    null
  );

  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [content, setContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (state && !state.error) {
      formRef.current?.reset();
      setTags([]);
      setTagInput("");
      setContent("");
    }
  }, [state]);

  const insertFormatting = (prefix: string, suffix: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const selected = content.substring(start, end);

    const newContent =
      content.substring(0, start) +
      prefix +
      selected +
      suffix +
      content.substring(end);

    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        end + prefix.length
      );
    }, 0);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();

      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }

      setTagInput("");
    }

    if (e.key === "Backspace" && tagInput === "" && tags.length > 0) {
      e.preventDefault();
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <form
      ref={formRef}
      action={formAction}
      className="max-w-3xl mx-auto flex flex-col gap-6"
    >
      {/* Title */}
      <Input
        name="title"
        placeholder="Note title..."
        required
        disabled={isPending}
        className="text-2xl font-semibold border-none shadow-none focus-visible:ring-0"
      />

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="flex gap-1">
            #{tag}
            <button type="button" onClick={() => removeTag(tag)}>
              ×
            </button>
          </Badge>
        ))}

        <input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add tag..."
          className="bg-transparent outline-none text-sm"
        />
      </div>

      <input type="hidden" name="tags" value={tags.join(",")} />

      {/* Editor */}
      <div className="border rounded-2xl overflow-hidden bg-background">
        {/* Toolbar */}
        <div className="flex items-center gap-1 px-3 py-2 border-b bg-muted/40 flex-wrap">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => insertFormatting("**", "**")}
          >
            <Bold className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => insertFormatting("*", "*")}
          >
            <Italic className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => insertFormatting("~~", "~~")}
          >
            <Strikethrough className="w-4 h-4" />
          </Button>

          <Separator orientation="vertical" className="h-5 mx-1" />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => insertFormatting("# ")}
          >
            <Heading1 className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => insertFormatting("## ")}
          >
            <Heading2 className="w-4 h-4" />
          </Button>

          <Separator orientation="vertical" className="h-5 mx-1" />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => insertFormatting("`", "`")}
          >
            <Code className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => insertFormatting("> ")}
          >
            <Quote className="w-4 h-4" />
          </Button>

          <Separator orientation="vertical" className="h-5 mx-1" />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => insertFormatting("- ")}
          >
            <List className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => insertFormatting("1. ")}
          >
            <ListOrdered className="w-4 h-4" />
          </Button>

          <div className="flex-1" />

          <Button
            variant={showPreview ? "default" : "ghost"}
            size="icon"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>

        {/* Editor / Preview */}
        {showPreview ? (
          <div className="p-4 text-sm text-muted-foreground">
            ⚠️ Replace with react-markdown later
            <pre className="whitespace-pre-wrap">{content}</pre>
          </div>
        ) : (
          <Textarea
            ref={textareaRef}
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note..."
            className="h-[400px] resize-none border-none focus-visible:ring-0"
            required
            disabled={isPending}
          />
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <p className="text-sm">
          {state?.message && (
            <span className={state.error ? "text-red-500" : "text-green-500"}>
              {state.message}
            </span>
          )}
        </p>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Note"}
        </Button>
      </div>
    </form>
  );
}