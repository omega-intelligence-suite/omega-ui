'use client';

import { useRouter } from 'next/navigation'
import { RiDoorOpenLine } from "react-icons/ri";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  const handleRedirect = () => {
    window.location.href = "/app/overview";
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="" style={{display: 'flex', flexDirection: "column", gap: "16rem"}}>
        <div className="" style={{ display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
          <h1 className='font-mono text-slate-500' style={{fontSize: "10rem", lineHeight: "165px"}}>404</h1>
          <p className='font-mono text-md text-slate-100'>There is nothing to see here.</p>
        </div>
        <div className="flex flex-col gap-4">
          <p className='font-mono text-sm text-slate-300'>Nice try, let me show you the way back.</p>
          <Button
            onClick={handleRedirect}
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800 mb-4"
            style={{backgroundColor: "rgba(153, 71, 235, 0.05)", border: "1px solid rgba(153, 71, 235, 0.25)"}}
            >
            <RiDoorOpenLine className="mr-2 h-3 w-3" />
            <p className="text-xs font-mono">Go back</p>
          </Button>
          </div>
      </div>
    </div>
  );
}
