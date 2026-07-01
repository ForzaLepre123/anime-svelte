/**
 * Svelte transition function for anime.js animations.
 * Apply to elements with `transition:anime={{ ... }}`
 * @see anime from ./transition.ts
 */
export { anime } from './transition.js';

/**
 * Svelte action attachments for anime.js animations.
 * Apply to elements with `use:animate={{ ... }}` or `use:split={{ ... }}`
 * @see animate - Apply direct anime.js animations via action
 * @see split - Split text and apply animations to each segment
 */
export { animate, split } from './attachments.js';

/**
 * Svelte component that wraps elements with anime.js animations.
 * Provides component-based animation with reactive parameters and playback controls.
 * @see Animate component
 */
export { default as Animate } from './Animate.svelte';

/**
 * Svelte component for text-splitting animations.
 * Splits text by characters, words, or lines and applies anime.js animations.
 * @see Split component
 */
export { default as Split } from './Split.svelte';