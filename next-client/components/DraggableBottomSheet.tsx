'use client';

import { useRef, useState } from 'react';
import { Sheet, SheetContent, SheetTitle } from './index';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

export const DraggableBottomSheet = ({ open, onOpenChange, children }: Props) => {
  const startY = useRef(0);
  const currentY = useRef(0);
  const [dragOffset, setDragOffset] = useState(81);

  function handlePointerDown(event: React.PointerEvent) {
    startY.current = event.clientY;
    currentY.current = event.clientY;

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  }

  function handlePointerMove(event: PointerEvent) {
    currentY.current = event.clientY;
    const diff = currentY.current - startY.current;

    if (diff > 0) {
      setDragOffset(diff);
    }
  }

  function handlePointerUp() {
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);

    if (dragOffset > 80) {
      onOpenChange(false);
    }

    setDragOffset(0);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[70vh] max-h-[800px] rounded-t-main">
        <div
          onPointerDown={handlePointerDown}
          className="mx-auto my-4 h-1.5 w-24 rounded-main bg-text-black cursor-grab active:cursor-grabbing"
        />
        {children}
      </SheetContent>
      <SheetTitle />
    </Sheet>
  );
};
