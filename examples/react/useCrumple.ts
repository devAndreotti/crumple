// React Hook for @devandreotti/crumple
// Usage: const ref = useCrumple({ type: 'notebook', text: '# Secret' });
// <button ref={ref} aria-label="Open note" />
import { useEffect, useRef } from 'react';
import { Scene, type PaperConfig, type AttachOptions } from '@devandreotti/crumple';

export function useCrumple(config: PaperConfig, options?: AttachOptions) {
  // ponytail: single ref target; upgrade to callback ref array if virtualized list needed.
  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    Scene.attach(el, config, options);
    return () => {
      Scene.detach(el);
    };
  }, [config.id, options?.snapshot]);

  return ref;
}
