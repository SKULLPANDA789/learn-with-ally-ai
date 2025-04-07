
import Layout from "@/components/Layout";
import AccessibilityTools from "@/components/AccessibilityTools";

const ToolsPage = () => {
  return (
    <Layout>
      <div className="content-container py-10">
        <h1 className="font-gloria text-2xl md:text-3xl mb-6 text-center">Accessibility Tools</h1>
        <AccessibilityTools />
      </div>
    </Layout>
  );
};

export default ToolsPage;
