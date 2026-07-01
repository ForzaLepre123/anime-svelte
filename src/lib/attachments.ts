import { animate as anim, splitText } from "animejs";
import type { AnimationParams, TextSplitterParams, JSAnimation } from 'animejs';
import type { Attachment } from "svelte/attachments";

/** Default animation parameters: fade in over 600ms */
const DEFAULT_PARAMS: AnimationParams = { opacity: [0, 1], duration: 600 }

/**
 * Svelte attachment that applies anime.js animations to elements.
 *
 * @param {AnimationParams} [params] - Anime.js animation parameters (defaults to fade in)
 * @returns {Attachment} Svelte attachment that animates the element
 * @example
 * ```svelte
 * <script>
 *   import { animate } from 'anime-svelte';
 * </script>
 *
 * <div {@attach animate({ rotate: 360, duration: 1000 })}>
 *   Spinning element
 * </div>
 * ```
 */
export function animate(params: AnimationParams = DEFAULT_PARAMS): Attachment {
  return (element: Element) => {
    const animation = anim(element, params);
    return () => {
      animation.pause();
    }
  };
}

/**
 * Splits text and applies anime.js animations to each split element.
 * Supports splitting by characters, words, or lines.
 *
 * @param {TextSplitterParams} [splitParams={ chars: true }] - Text splitting configuration
 * @param {AnimationParams} [params=DEFAULT_PARAMS] - Anime.js animation parameters applied to split elements
 * @returns {Attachment} Svelte attachment that animates split text
 * @example
 * ```svelte
 * <script>
 *   import { split } from 'anime-svelte';
 * </script>
 *
 * <div {@attach animate({ words: true }, {{ opacity: [0, 1], stagger: 50 })>
 *   Animated Text
 * </div>
 * ```
 */
export function split(splitParams: TextSplitterParams = { chars: true }, params: AnimationParams = DEFAULT_PARAMS): Attachment {
  let animation: JSAnimation;
  return (element: Element) => {
    const { chars, words, lines } = splitText(element, splitParams);
    const target = [chars, words, lines].find(array => array.length);
    if (target) animation = anim(target, params);
    return () => {
      animation?.pause();
    }
  };
}
