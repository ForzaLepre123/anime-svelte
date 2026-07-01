<script lang="ts" module>
  import type { Props } from "$lib/Animate.svelte";
  /**
   * Props for the Split component.
   * Text-splitting animation component with configuration.
   * @type {SplitProps}
   * @property {TextSplitterParams} [split] - Text splitting configuration (chars, words, lines)
   * @property {AnimationParams} [params] - Animation parameters applied to split text elements
   * @property {HTMLElement} [root] - Bindable reference to the split container
   * @property {Snippet} [children] - Text content to split and animate
   * @property {JSAnimation} [animation] - Bindable reference to the active anime.js animation instance
   * @property {unknown} [...rest] - Standard HTML attributes (styles, classes, id, etc.) passed to the container
   */
  type SplitProps = Props & {
    split?: TextSplitterParams;
  }
</script>

<script lang="ts">
  import { splitText, animate } from 'animejs';
  import type { JSAnimation, TextSplitterParams } from 'animejs';

  let {
    split = { chars: true },
    params = {},
    root = $bindable(),
    children,
    animation = $bindable(),
    ...rest
  }: SplitProps = $props();

  $effect(() => {
    if (!root || !children) return;

    const { chars, words, lines } = splitText(root, split);
    const target = [chars, words, lines].find(array => array.length);
    if (target) animation = animate(target, params);

    return () => {
      animation?.pause();
    }
  });

  /**
   * Get the current anime.js animation instance for the split text.
   * @returns {JSAnimation | null} The active animation or null if not initialized
   */
  export function getAnimation(): JSAnimation | null {
    return animation ?? null;
  }

  /** Restart the text split animation from the beginning. */
  export function restart() {
    animation?.restart();
  }

  /** Pause the current text split animation. */
  export function pause() {
    animation?.pause();
  }

  /** Resume playing the current text split animation. */
  export function play() {
    animation?.play();
  }
</script>

<div bind:this={root} {...rest}>
  {@render children?.()}
</div>