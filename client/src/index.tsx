import React from "react";
import { createRoot } from 'react-dom/client';
import { Toaster } from "react-hot-toast";
import { Navigate, Route, RouterProvider, createHashRouter, createRoutesFromElements } from "react-router-dom";
import { ContextProvider } from "./components/ContextProvider";
import { Auth } from "./pages/Auth";
import { EditExam } from "./pages/EditExam";
import { Exams } from "./pages/Exams";
import { GenerateExam } from "./pages/GenerateExam";
import { TakeExam } from "./pages/TakeExam";
import { Landing } from "./pages/Landing";

const STRICT = true;

const router = createHashRouter(
  createRoutesFromElements(
    <Route path='' element={<ContextProvider />}>
      <Route path='/' element={<Landing/>} />
      <Route path='/Auth' element={<Auth />} />
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
  <div className="bg-tertiary text-darkGray min-h-screen flex flex-col">
    <Toaster />
    <RouterProvider router={router} />
  </div>
);

if (STRICT) {
  tree = <React.StrictMode>{tree}</React.StrictMode>
}

root.render(tree);
