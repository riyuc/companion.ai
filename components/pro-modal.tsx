"use client";

import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, 
         DialogContent, 
         DialogDescription, 
         DialogHeader, 
         DialogTitle} from "./ui/dialog";
import { Wand } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useEffect, useState } from "react";
import axios from "axios";

export const ProModal = () => {
    const proModal = useProModal();
    const { toast } = useToast();

    const [loading,setLoading] = useState(false);
    const [isMounted,setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    },[])

    const onSubscribe = async() => {
        try {
            setLoading(true);

            const response = await axios.get("/api/stripe");

            window.location.href= response.data.url;
        } catch (error) {
            toast({
                variant: "destructive",
                description: "Something went wrong",
            })
            setLoading(false);
        }
    }

    if(!isMounted){
        return null;
    }

    return(
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader className="space-y-4">
                    <DialogTitle className="text-center">
                        Upgrade To Pro!
                    </DialogTitle>
                    <DialogDescription className="flex flex-row justify-center text-center space-y-2">
                        Create <span className="from-indigo-500 via-purple-500 to-pink-500 bg-gradient-to-r bg-clip-text text-transparent mx-1 font-medium">
                            Custom AI
                            </span> Companions!
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <div className="flex justify-between">
                    <p className="text-2xl font-medium">
                        $9
                        <span className="text-sm font-normal">
                            .99/mo
                        </span>
                    </p>
                    <Button disabled={loading} onClick={onSubscribe} variant="premium">
                        Subscribe
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}