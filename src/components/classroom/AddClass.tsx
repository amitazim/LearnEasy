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
import axios, { type AxiosResponse } from 'axios';
import { useState } from "react";
import { getRandomDarkColor } from "@/lib/utils";
import type { ClassData } from "@/types";
import useAuthContext from "@/hooks/useAuthContext";
import { queryClient } from "@/main";

const AddClass: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);


    const context = useAuthContext()
    if (!context || !context.user) {
        return "error"
    }
    const { user } = context
    // console.log(user)
    // Type the form with ClassData interface
    const form = useForm<ClassData>({
        defaultValues: {
            name: "",
            teacher: "",
            description: "",
            code: "",
            students: []
        }
    });

    const onSubmit: SubmitHandler<ClassData> = async (values: ClassData): Promise<void> => {
        try {
            setIsSubmitting(true);

            const joinCode = getRandomDarkColor().slice(1, 7)
            // console.log(joinCode)
            const email = user?.email as string
            const data = { ...values, joinCode }
            data.students?.push(email)
            // console.log(data)
            const res: AxiosResponse<any> = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/create-class`, data);

            if (res.data) {
                // console.log(res.data);
                await queryClient.invalidateQueries({
                    queryKey: ['classes', email]
                });

                // Reset form after successful submission
                form.reset();

                // Close dialog
                setDialogOpen(false);

                // You could add success toast here
                // toast.success("Class created successfully!");
            }
        } catch (error) {
            console.error("Error creating class:", error);

            // You could add error toast here
            // toast.error("Failed to create class");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" >Create Class</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create New Class</DialogTitle>
                        <DialogDescription>
                            Fill in the details to create a new class. Click create when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-4 mb-4">
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        rules={{
                                            required: "Class title is required",
                                            minLength: {
                                                value: 2,
                                                message: "Class title must be at least 2 characters"
                                            }
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Class Title</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter class title"
                                                        {...field}
                                                        disabled={isSubmitting}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="teacher"
                                        rules={{
                                            required: "Teacher name is required",
                                            minLength: {
                                                value: 2,
                                                message: "Teacher name must be at least 2 characters"
                                            }
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Teacher Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter teacher name"
                                                        {...field}
                                                        disabled={isSubmitting}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        rules={{
                                            required: "Description is required",
                                            minLength: {
                                                value: 10,
                                                message: "Description must be at least 10 characters"
                                            }
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter class description"
                                                        {...field}
                                                        disabled={isSubmitting}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="code"
                                        rules={{
                                            required: "Course code is required",
                                        }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Course Code</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="e.g., CS101"
                                                        {...field}
                                                        disabled={isSubmitting}
                                                        style={{ textTransform: 'uppercase' }}
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
                                    {isSubmitting ? "Creating..." : "Create Class"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddClass;