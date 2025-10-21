import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useState } from "react";
import useAuthContext from "@/hooks/useAuthContext";
import axios, { type AxiosResponse } from "axios";
import { queryClient } from "@/main";
import Swal from "sweetalert2";


interface JoinClass {
    joinCode: string
}
const JoinClassModal = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const context = useAuthContext()
    if (!context) {
        throw new Error("error")
    }

    const { user } = context

    // Type the form with ClassData interface
    const form = useForm<JoinClass>({
        defaultValues: {
            joinCode: "",
        }
    });

    const onSubmit: SubmitHandler<JoinClass> = async (values: JoinClass): Promise<void> => {
        try {
            setIsSubmitting(true);
            // console.log(values)
            const data = {
                joinCode: values.joinCode,
                email: user?.email
            }
            console.log(`${import.meta.env.VITE_BACKEND_URL}/join-class`)

            const res: AxiosResponse<any> = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/join-class`, data);
            console.log(res)

            if (res.data) {
                console.log(res.data);

                // Reset form after successful submission
                form.reset();
                const email = user?.email
                queryClient.invalidateQueries({
                    queryKey: ['classes', email]
                })

                // Close dialog
                setDialogOpen(false);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your have successfully joined the class",
                    showConfirmButton: false,
                    timer: 1500
                });
                // You could add success toast here
                // toast.success("Class created successfully!");
            }
        } catch (error: any) {
            console.error("Error Joining class:", error.message);

            // You could add error toast here
            // toast.error("Failed to create class");
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild >
                    <Button variant={"outline"} >Join Class</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Join A Class</DialogTitle>
                        <DialogDescription>
                            Fill in the details to join a new class. Click JOIN when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-4 mb-4">
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="joinCode"
                                        rules={{
                                            required: "Join Code is required",
                                            minLength: {
                                                value: 6,
                                                message: "Class title must be at least 6 characters"
                                            }
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Class Code</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="a123sd"
                                                        {...field}
                                                        disabled={isSubmitting}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button
                                        variant="outline"
                                        type="button"
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-orange-600"
                                >
                                    {isSubmitting ? "Joining..." : "Join Class"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default JoinClassModal
