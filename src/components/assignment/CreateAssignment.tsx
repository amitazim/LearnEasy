import { useForm, type SubmitHandler } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import type { ClassData } from "@/types";
import { queryClient } from "@/main";

interface AssignmentFormInputs {
  title: string;
  description: string;
  dueDate: string;
}


interface ClassworkTabProps {
  classData: ClassData;
}

export function CreateAssignment({classData}:ClassworkTabProps) {
// console.log(classData._id)
const classId = classData._id  as string
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AssignmentFormInputs>();
  const [open, setOpen] = useState(false);

  const onSubmit: SubmitHandler<AssignmentFormInputs> = async (data) => {
    console.log(isSubmitting)
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/assignments`, {...data, classId});

      if (!res) throw new Error("Failed to create assignment");
      console.log(res.data)

      if (res.data.insertedId) {
        setOpen(false);
        await queryClient.invalidateQueries({
          queryKey: ['assignments', classId]

        })
        Swal.fire({
          icon: "success",
          title: "Assignment is created"
        });
      }

      reset();
    } catch (error) {
      console.log(isSubmitting)
     
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">➕ Create Assignment</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Create New Assignment</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Fill in the details below to create a new assignment.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* Title */}
          <div className="space-y-1">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter assignment title"
              {...register("title", { required: "Title is required" })}
              aria-invalid={!!errors.title}
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="text-red-600 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Write a brief description..."
              {...register("description")}
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          {/* Due Date */}
          <div className="space-y-1">
            <Label htmlFor="dueDate">Due Date *</Label>
            <Input
              id="dueDate"
              type="date"
              {...register("dueDate", { required: "Due date is required" })}
              aria-invalid={!!errors.dueDate}
              disabled={isSubmitting}
            />
            {errors.dueDate && (
              <p className="text-red-600 text-sm">{errors.dueDate.message}</p>
            )}
          </div>


          {/* Actions */}
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="secondary" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
