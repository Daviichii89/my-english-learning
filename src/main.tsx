import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import { Header } from './components/Header.tsx'
import { HomePage } from './pages/HomePage/HomePage.tsx'
import { BucketList } from './pages/BucketList/BucketList.tsx'
import { Footer } from './components/Footer.tsx'

import './index.css'
import { NotFound } from './pages/NotFound/NotFound.tsx'
import { TravelToJapan } from './pages/TravelToJapan/TravelToJapan.tsx'
import { PlayVideogames } from './pages/PlayVideogames/PlayVideogames.tsx'
import Breadcrumbs from './components/Breadcrumbs.tsx'
import { BeFather } from './pages/BeFather/BeFather.tsx'
import { BuyAHouse } from './pages/BuyAHouse/BuyAHouse.tsx'
import { SeeEndOnePiece } from './pages/SeeEndOnePiece/SeeEndOnePiece.tsx'
import { MovementVerbs } from './pages/MovementVerbs/MovementVerbs.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <main className='min-h-[calc(100vh-10rem)] justify-center p-4 text-center bg-gray-100'>
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bucket-list" element={<BucketList />} />
          <Route path="/bucket-list/travel-to-japan" element={<TravelToJapan />} />
          <Route path="/bucket-list/play-videogames" element={<PlayVideogames />} />
          <Route path="/bucket-list/be-a-father" element={<BeFather />} />
          <Route path="/bucket-list/buy-a-house" element={<BuyAHouse />} />
          <Route path="/bucket-list/see-end-one-piece" element={<SeeEndOnePiece />} />
          <Route path="/movement-verbs" element={<MovementVerbs />} />          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)
