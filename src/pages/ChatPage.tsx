
import Layout from "@/components/Layout";
import AIChatbot from "@/components/AIChatbot";

const ChatPage = () => {
  return (
    <Layout>
      <div className="content-container py-10">
        <h1 className="font-gloria text-2xl md:text-3xl mb-6 text-center">AI Learning Assistant</h1>
        <div className="max-w-3xl mx-auto">
          <AIChatbot />
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
