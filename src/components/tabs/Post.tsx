import type { ClassData } from "@/types";
import { useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { PostList } from "../posts/PostList";
import { queryClient } from "@/main";
import Swal from "sweetalert2";

interface FeedbackSystemProps {
    classData: ClassData;
}


const Post = ({ classData }: FeedbackSystemProps) => {
    const [message, setMessage] = useState("");
    const classId = classData._id
    const handlePost = async () => {
        if (!message.trim()) return;
        // Replace with API call or state update
        const data = {
            message,
            classId: classData._id
        }
        console.log("Posted message:", message, "for class:", classData._id);
        const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/posts`, data)
        if (result) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });
            queryClient.invalidateQueries({
                queryKey: ['posts', classId],
            })
            setMessage(""); // clear input after posting
        }
    };

    return (
        <div>
            <div className="p-4 border rounded-lg shadow-sm w-full flex items-end gap-2 mb-4">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write something..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    rows={2}
                />
                <div className="flex justify-end mt-2">
                    <Button onClick={handlePost} disabled={!message.trim()} variant={"outline"} className="bg-orange-600 text-white">
                        Post
                    </Button>
                </div>

            </div>
            <PostList classData={classData} />
        </div>
    )
}

export default Post
