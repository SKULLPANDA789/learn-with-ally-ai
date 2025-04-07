
import Layout from "@/components/Layout";
import SignLanguageConverter from "@/components/SignLanguageConverter";
import SignLanguageRecognition from "@/components/SignLanguageRecognition";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SignLanguagePage = () => {
  return (
    <Layout>
      <div className="content-container py-10">
        <h1 className="font-gloria text-2xl md:text-3xl mb-6 text-center">Sign Language Tools</h1>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="converter" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="converter">Text to Sign Language</TabsTrigger>
              <TabsTrigger value="recognition">Sign Language Recognition</TabsTrigger>
            </TabsList>
            
            <TabsContent value="converter">
              <SignLanguageConverter />
            </TabsContent>
            
            <TabsContent value="recognition">
              <SignLanguageRecognition />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default SignLanguagePage;
