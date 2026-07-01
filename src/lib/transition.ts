import { animate, type AnimationParams } from 'animejs';
import type { TransitionConfig } from 'svelte/transition';

/**
 * Svelte transition function that applies anime.js animations to elements.
 * Use with the `transition:` directive to animate elements entering/leaving the DOM.
 *
 * @param {HTMLElement} node - The element to animate
 * @param {AnimationParams} [params] - Anime.js animation parameters
 * @returns {TransitionConfig} Svelte transition configuration
 * @example
 * ```svelte
 * <script>
 *   import { anime } from 'anime-svelte';
 *
 *   let show = $state(true);
 * </script>
 *
 * {#if show}
 *   <div transition:anime={{ opacity: [0, 1], duration: 1000 }}>
 *     Fading in and out
 *   </div>
 *   <div in:anime={{ opacity: [0, 1], duration: 1000 }}>
 *     Fading in
 *   </div>
 *   <div out:anime={{ opacity: [0, 1], duration: 1000 }}>
 *     Fading out
 *   </div>
 * {/if}
 *
 * <button onclick={() => show = !show}>Toggle</button>
 * ```
 */
export function anime(
  node: HTMLElement,
  params: AnimationParams & { easing?: (t: number) => number } = {}
): TransitionConfig {
  const duration = params.duration ?? 800;
  const easing = params.easing ?? ((t) => t);
  const anim = animate(node, params);

  return {
    duration,
    easing,
    tick(t) {
      anim.seek(t * duration);
    }
  };
}