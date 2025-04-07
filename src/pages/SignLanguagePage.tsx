
import Layout from "@/components/Layout";
import SignLanguageConverter from "@/components/SignLanguageConverter";

const SignLanguagePage = () => {
  return (
    <Layout>
      <div className="content-container py-10">
        <h1 className="font-gloria text-2xl md:text-3xl mb-6 text-center">Text to Sign Language Converter</h1>
        <div className="max-w-3xl mx-auto">
          <SignLanguageConverter />
        </div>
      </div>
    </Layout>
  );
};

export default SignLanguagePage;
