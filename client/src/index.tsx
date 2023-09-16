import React from "react";
import { createRoot } from 'react-dom/client';
import { Toaster } from "react-hot-toast";
import { Navigate, Route, RouterProvider, createHashRouter, createRoutesFromElements } from "react-router-dom";
import { PageWrapper } from "./components/CommonComponents";
import { EditExam } from "./pages/EditExam";
import { Exams } from "./pages/Exams";
import { GenerateExam } from "./pages/GenerateExam";
import { TakeExam } from "./pages/TakeExam";

const STRICT = true;

// TODO: make this work on cloud host with a browser router
const router = /*createBrowserRouter(/**/ createHashRouter(
  createRoutesFromElements(
    <Route path='' element={<PageWrapper />}>
      <Route path='/' element={<Navigate to="/Exams" />} />
      <Route path='/Exams' element={<Exams />} />
      <Route path='/Exams/EditExam/:ExamId' element={<EditExam />} />
      <Route path='/Exams/CreateExam' element={<GenerateExam />} />
      <Route path='/Exams/Student/:ExamId' element={<TakeExam />} />
    </Route>
  )
);
const container = document.getElementById('app')!;
const root = createRoot(container);

let tree = (
  <div className="dark:bg-texture-dark bg-texture text-slate-800 dark:text-slate-100 min-h-screen">
    <Toaster />
    <RouterProvider router={router} />
  </div>
);

if (STRICT) {
  tree = <React.StrictMode>{tree}</React.StrictMode>
}

root.render(tree);
