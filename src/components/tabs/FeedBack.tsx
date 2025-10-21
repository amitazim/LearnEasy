import type { ClassData } from "@/types";


import {  useState } from 'react';
import { MessageSquare, Star } from 'lucide-react';
import { categories, feedbackTypes } from "@/data/mockData";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import axios from "axios";
import Swal from "sweetalert2";
import { useGetAlFeedback } from "@/hooks/useGetAllFeedback";

interface FeedbackSystemProps {
    classData: ClassData;
}

interface Feedback {
  _id: string;
  time: string;          // or number if you prefer timestamp as number
  feedbackType: 'suggestion' | 'compliment' | 'complaint' | 'question';
  category: 'teaching' | 'content' | 'assignments' | 'general';
  rating: number;        // 1 to 5
  message: string;
  classId: string;       // ObjectId as string
}

interface FeedbackFormValues {
    feedbackType: string;
    category: string;
    rating: number;
    message: string;
}

const formSchema = z.object({
    feedbackType: z.string()
        .min(1, { message: "Please select a feedback type." }),

    category: z.string()
        .min(1, { message: "Please select a category." }),

    rating: z.number()
        .min(1, { message: "Rating must be at least 1." })
        .max(5, { message: "Rating cannot exceed 5." }),

    message: z.string()
        .min(1, { message: "Message is required." })
        .max(500, { message: "Message cannot exceed 500 characters." }),
})

const FeedBack = ({ classData }: FeedbackSystemProps) => {
    const [activeTab, setActiveTab] = useState<'submit' | 'view'>('submit');
    const [, setRating] = useState<number>(5);
    // const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const form = useForm<FeedbackFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            feedbackType: "", // empty string is fine, validation will catch if not selected
            category: "",     // same as above
            rating: 0,        // validation requires at least 1
            message: "",      // empty string, required by validation
        },
    });
    const classId = classData._id as string
    const { data: feedbacks, refetch } = useGetAlFeedback({classId})





    const renderStars = (currentRating: number, interactive = false) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => interactive && setRating(star)}
                        className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
                        disabled={!interactive}
                    >
                        <Star
                            className={`w-5 h-5 ${star <= currentRating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                                }`}
                        />
                    </button>
                ))}
            </div>
        );
    };




    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const classId = classData._id
        const feedbackData = { ...data, classId }
        console.log("All Submitted Data:", feedbackData);

        const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/submit-feedback`, feedbackData)
        console.log(result)
        if (result) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });
            form.reset()
            refetch()
        }
        // send to API here
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="border-b border-gray-200 p-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    Anonymous Feedback
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                    Share your thoughts anonymously to help improve the class
                </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('submit')}
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${activeTab === 'submit'
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-800'
                        }`}
                >
                    Submit Feedback
                </button>
                <button
                    onClick={() => setActiveTab('view')}
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${activeTab === 'view'
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-800'
                        }`}
                >
                    View Feedback
                </button>
            </div>

            {/* Content */}
            <div className="p-6">
                {activeTab === 'submit' ? (
                    <div className="space-y-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">



                                {/* Feedback Type */}
                                <FormField
                                    control={form.control}
                                    name="feedbackType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Type of Feedback</FormLabel>
                                            <div className="grid grid-cols-2 gap-3">
                                                {feedbackTypes.map((type) => (
                                                    <button
                                                        key={type.value}
                                                        type="button"
                                                        onClick={() => field.onChange(type.value)}
                                                        className={`p-3 rounded-lg border-2 transition-all ${field.value === type.value
                                                            ? "border-blue-500 bg-blue-50"
                                                            : "border-gray-200 hover:border-gray-300"
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-lg">{type.icon}</span>
                                                            <span className="font-medium text-sm">{type.label}</span>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                {/* Category */}
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <FormControl>
                                                <select
                                                    {...field}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    {categories.map((cat) => (
                                                        <option key={cat.value} value={cat.value}>
                                                            {cat.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </FormControl>

                                        </FormItem>
                                    )}
                                />

                                {/* Rating */}
                                <FormField
                                    control={form.control}
                                    name="rating"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Overall Rating</FormLabel>
                                            <div className="flex items-center gap-3">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span
                                                        key={star}
                                                        className={`cursor-pointer text-xl ${field.value >= star ? "text-yellow-400" : "text-gray-300"}`}
                                                        onClick={() => field.onChange(star)}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                                <span className="text-sm text-gray-600">({field.value}/5)</span>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                {/* Message */}
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Your Feedback</FormLabel>
                                            <FormControl>
                                                <textarea
                                                    {...field}
                                                    placeholder="Share your thoughts, suggestions, or concerns..."
                                                    rows={4}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                                />
                                            </FormControl>
                                            <div className="flex justify-between mt-2 text-xs text-gray-500">
                                                <span>Your feedback is completely anonymous</span>
                                                <span>{field?.value?.length}/500</span>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>

                    </div>
                ) : (
                    <div className="space-y-4">
                        {feedbacks?.length === 0 ? (
                            <div className="text-center py-8">
                                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500">No feedback submitted yet</p>
                            </div>
                        ) : (
                            feedbacks?.map((feedback:Feedback) => {
                                return (
                                    <div key={feedback._id} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                               
                                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                    {feedback.category}
                                                </span>
                                            </div>
                                            {renderStars(feedback.rating)}
                                           <p className="p-2 border-2 rounded-xl text-sm"> {feedback.feedbackType}</p>
                                        </div>
                                        <p className="text-gray-700 mb-2">{feedback.message}</p>
                                        <p className="text-xs text-gray-400">
                                            {new Date(feedback.time).toLocaleDateString()} • Anonymous
                                        </p>
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedBack;