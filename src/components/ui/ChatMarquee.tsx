import type { LucideIcon } from "lucide-react";
import { Send } from "lucide-react";
import { cls } from "@/lib/utils";
import { resolveIcon } from "@/utils/resolve-icon";

type Exchange = { userMessage: string; aiResponse: string };

const ChatMarquee = ({ aiIcon, userIcon, exchanges, placeholder }: { aiIcon: string | LucideIcon; userIcon: string | LucideIcon; exchanges: Exchange[]; placeholder: string }) => {
  const AiIcon = resolveIcon(aiIcon);
  const UserIcon = resolveIcon(userIcon);
  const messages = exchanges.flatMap((e) => [{ content: e.userMessage, isUser: true }, { content: e.aiResponse, isUser: false }]);
  const duplicated = [...messages, ...messages];

  return (
    <div className="relative flex flex-col h-full w-full overflow-hidden">
      <div className="flex-1 overflow-hidden mask-fade-y">
        <div className="flex flex-col px-4 animate-marquee-vertical">
          {duplicated.map((msg, i) => (
            <div key={i} className={cls("flex items-end gap-2 mb-4 shrink-0", msg.isUser ? "flex-row-reverse" : "flex-row")}>
              {msg.isUser ? (
                <div className="flex items-center justify-center h-8 w-8 primary-button rounded shrink-0">
                  <UserIcon className="h-3 w-3 text-primary-cta-text" />
                </div>
              ) : (
                <div className="flex items-center justify-center h-8 w-8 card rounded shrink-0">
                  <AiIcon className="h-3 w-3" />
                </div>
              )}
              <div className={cls("max-w-3/4 px-4 py-3 text-sm leading-tight", msg.isUser ? "primary-button rounded-2xl rounded-br-none text-primary-cta-text" : "card rounded-2xl rounded-bl-none")}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 p-2 pl-4 card rounded">
        <p className="flex-1 text-sm text-foreground/75 truncate">{placeholder}</p>
        <div className="flex items-center justify-center h-7 w-7 primary-button rounded">
          <Send className="h-3 w-3 text-primary-cta-text" strokeWidth={1.75} />
        </div>
      </div>
    </div>
  );
};

export default ChatMarquee;
