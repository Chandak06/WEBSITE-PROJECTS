import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";

export default function Home() {
  return (
    <div className="flex h-screen">
      <ChatList />
      <ChatWindow />
    </div>
  );
}