import { createBrowserRouter } from "react-router";

import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import ClassInterface from "@/components/classroom/ClassInterface";
import ClassList from "@/components/classroom/ClassList";
import PrivateRoutes from "@/components/layout/PrivateRoutes";
import Login from "@/pages/Login";
import { Calender } from "@/components/calender/Calender";
import Review from "@/components/review/Review";

export const router = createBrowserRouter([
    {
        path: "/",
        element: React.createElement(PrivateRoutes, null, React.createElement(MainLayout)),
        children: [
            {
                path: "/",
                element: React.createElement(ClassList)
                // loader: ({params}) => fetch(`import.meta.env.VITE_BACKEND_URL/all-classes?email=${params.email}`)
            },
            {
                path: "/calender",
                element: React.createElement(Calender)
                // loader: ({params}) => fetch(`import.meta.env.VITE_BACKEND_URL/all-classes?email=${params.email}`)
            },
            {
                path: "/review",
                element: React.createElement(Review)
                // loader: ({params}) => fetch(`import.meta.env.VITE_BACKEND_URL/all-classes?email=${params.email}`)
            },
            {
                path: "class/:id",
                element: React.createElement(ClassInterface),
                loader: ({ params }) => fetch(`${import.meta.env.VITE_BACKEND_URL}/class/${params.id}`)
            }
        ]
    },
    {
        path: "/login",
        element: React.createElement(Login),
    }
])