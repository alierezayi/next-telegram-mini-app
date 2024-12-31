import { startBot } from "@/actions/telegram-bot";
import MiniApp from "@/components/mini-app";

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
          };
        };
        sendData: (data: string) => void;
        ready: () => void;
        close: () => void;
      };
    };
  }
}

export default async function Home() {
  await startBot();

  return <MiniApp />;
}
