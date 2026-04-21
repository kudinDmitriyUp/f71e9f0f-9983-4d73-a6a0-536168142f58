import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { initVisualEdit } from '@/utils/visual-edit'
import Tag from "@/components/tag/Tag";

initVisualEdit()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      
      <Tag />
      <App />
    </BrowserRouter>
  </StrictMode>,
)
