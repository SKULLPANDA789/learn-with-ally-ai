
import Layout from "@/components/Layout";
import Subjects from "@/components/Subjects";

const SubjectsPage = () => {
  return (
    <Layout>
      <div className="content-container py-10">
        <h1 className="font-gloria text-2xl md:text-3xl mb-6 text-center">Subject Library</h1>
        <Subjects />
      </div>
    </Layout>
  );
};

export default SubjectsPage;
