'use client';

//import { useEffect } from 'react';
import exerciseData from '../public/data/exercises.json';
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <nav className="fixed top-0 w-[100%] h-[8svh] flex items-center pl-[3svh]">nav bar
        <Image
          className="dark:invert fixed right-[3svh]"
          src="/nav.svg"
          alt="Three Horizontal Lines"
          width={30}
          height={0}
          priority
        />
      </nav>

      <main className='pt-[8svh] overflow-y-auto'>

        <div className="pt-[10svh] pb-[10svh] m-auto w-[75%] text-center">
          <p className='text-6xl pb-[2svh]'>A Beginner's Guide to Fitness</p>
          <p className='text-base'>learn the basics from eating healthy to finding workouts that fit your goals and your schedule</p>
        </div>
        
        <div className='p-[10svh] w-[100%] gap-[10%] flex'>
          <div className='flex-1'>
            <p className='font-bold'>staying fit starts with eating fit</p>
            <p>Pianoforte solicitude so decisively unpleasing conviction is partiality he. Or particular so diminution entreaties oh do. Real he me fond show gave shot plan. Mirth blush linen small hoped way its along. Resolution frequently apartments off all discretion devonshire. Saw sir fat spirit seeing valley. He looked or valley lively. If learn woody spoil of taken he cause.</p>
            <p>develop a consistent routine before adding supplements</p>
            <p>learn how many calories and macros you need</p>
          </div>
          <div className='flex-1'>
                        <p>Piqued favour stairs it enable exeter as seeing. Remainder met improving but engrossed sincerity age. Better but length gay denied abroad are. Attachment astonished to on appearance imprudence so collecting in excellence. Tiled way blind lived whose new. The for fully had she there leave merit enjoy forth.</p>
            <p className='font-bold'>ready to find a workout that works out for you, here's some popular exercises</p>
          </div>
        </div>

        <div className='p-[10svh] w-[100%] gap-[10%] flex'>
          <div className='flex-1'>
            <p></p>
            <p></p>
          </div>

        </div>
        
        
      

      </main>

    </div>
  );
}
