<script lang="ts" module>
  import type { AnimationParams, TargetSelector } from "animejs";

  export interface Props {
    params?: AnimationParams;
    children?: import('svelte').Snippet;
    root?: HTMLElement;
    animation?: JSAnimation;
    [key: string]: unknown;
  }

  /**
   * Props for the Animate component.
   * @interface AnimateProps
   * @property {AnimationParams} [params] - Anime.js animation parameters (duration, easing, targets, etc.)
   * @property {import('svelte').Snippet} [children] - Content to render inside the animated element
   * @property {HTMLElement} [root] - Bindable reference to the animated DOM element
   * @property {HTMLElement} [target] - Function that returns animation target (or targets)
   * @property {JSAnimation} [animation] - Bindable reference to the active anime.js animation instance
   * @property {unknown} [...rest] - Standard HTML attributes (styles, classes, id, etc.) passed to the container
   * @example
   * ```svelte
   * <Animate params={{ opacity: [0, 1], duration: 600 }} bind:root={element}>
   *   <div>Animated content</div>
   * </Animate>
   * ```
   */
  export type AnimateProps = Props & {
    target?: (element: HTMLElement) => Array<TargetSelector> | TargetSelector;
  }
</script>

<script lang="ts">
  import { animate, type JSAnimation } from 'animejs';

  let {
    params = {},
    children,
    root = $bindable(),
    animation = $bindable(),
    target = (element) => element,
    ...rest
  }: AnimateProps = $props();

  $effect(() => {
    if (!root) return;

    animation = animate(target(root), params);

    return () => {
      animation?.pause();
    }
  });

  /**
   * Get the current anime.js animation instance.
   * @returns {JSAnimation | null} The active animation or null if not initialized
   */
  export function getAnimation(): JSAnimation | null {
    return animation ?? null;
  }

  /** Restart the animation from the beginning. */
  export function restart() {
    animation?.restart();
  }

  /**  Pause the current animation. */
  export function pause() {
    animation?.pause();
  }

  /** Resume playing the current animation.*/
  export function play() {
    animation?.play();
  }
</script>

<div bind:this={root} {...rest}>
  {@render children?.()}
</div>