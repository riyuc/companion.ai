import prismadb from "@/lib/prismadb";
import { CompanionForm } from "./components/create-room-form";
import { auth, redirectToSignIn } from "@clerk/nextjs";

interface CompanionIdPageProps {
    params: {
        companionId: string;
    };
};

const CompanionIdPage = async({
    params
}: CompanionIdPageProps) => {
    const { userId } = auth();
    //check subscription

    if(!userId){
        return redirectToSignIn();
    }

    const companion = await prismadb.companion.findMany();

    const categories = await prismadb.category.findMany();
    return ( 
        <CompanionForm 
            initialData = {null}
            categories = {categories}
        />
     );
}
export default CompanionIdPage;