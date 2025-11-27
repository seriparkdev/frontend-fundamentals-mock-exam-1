import { useState } from 'react';

export function useView(initialView: string) {
  const [view, setView] = useState<string>(initialView);

  return [view, setView] as const;
}
