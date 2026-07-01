<script>
  import Highlight, { HighlightAuto } from "svelte-highlight";
  import { svelte } from "svelte-highlight/languages";
  import { scale } from "svelte/transition";

  let { children, code, show: showControl = false, animated = $bindable() } = $props();

  let visible = $state(true);
  let paused = $state(false);

  function restart() {
    animated?.restart();
    paused = false;
  }

  function play() {
    const animation = animated?.getAnimation();
    if (animation.completed === true) return restart();

    paused = animation.paused;
    paused ? animated.play() : animated.pause();
    paused = animation.paused;
  }
</script>

<section class="example flex flex-col md:flex-row w-full bg-gray-600/40 rounded-2xl">
  <div class="flex-1 p-4 flex justify-center items-center min-h-44 relative">
    {#if visible}
      {@render children?.()}
    {:else}
      <p class="opacity-50 absolute left-1/2 top-1/2 -translate-1/2" in:scale={{ delay: 1000}} out:scale>HIDDEN</p>
    {/if}
  </div>
  <span class="flex-1 flex justify-center mx-2 md:mx-0 md:my-2 items-center min-h-px md:w-px md:min-h-full md:max-w-px bg-gray-600/40 relative"></span>
  <div class="flex-1 p-2 flex flex-col md:max-w-[75%] md:w-[75%] gap-2">
    <Highlight language={svelte} {code} class="flex-1 w-full select-text"></Highlight>
    <nav class="flex items-center gap-2">
      {#if showControl}
        <button onclick={() => visible = !visible} class="bg-blue-600/20 text-blue-600 hover:bg-blue-600/40 flex-1 active:scale-110 transition-[background, scale] duration-200 px-4 py-2 rounded-xl">
          {visible ? 'Hide' : 'Show'}
        </button>
      {:else}
        <button title="restart" onclick={restart} class="w-10 h-10 flex items-center justify-center bg-blue-600/20 hover:bg-blue-600/40 active:scale-110 transition-[background, scale] duration-200 rounded-xl">
          <svg height="14" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.1482 7.42257L21.1318 6.43547C16.6407 2.07422 9.35929 2.07422 4.86827 6.43547C0.377242 10.7967 0.377242 17.8678 4.86827 22.229C9.35929 26.5903 16.6407 26.5903 21.1318 22.229C23.7434 19.6927 24.8363 16.2402 24.4104 12.937M22.1482 1.5V7.42257H16.0494" stroke="#155dfc" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button onclick={play} class="w-10 h-10 flex items-center justify-center bg-blue-600/20 hover:bg-blue-600/40 active:scale-110 transition-[background, scale] duration-200 rounded-xl">
          {#if !paused}
            <svg height="14" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="3" height="24" rx="1.5" fill="#155dfc"/>
              <rect x="12" width="3" height="24" rx="1.5" fill="#155dfc"/>
            </svg>
          {:else}
            <svg height="14" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 3.94501C1.49987 3.51493 1.6158 3.09243 1.83608 2.72017C2.05636 2.34791 2.37319 2.03907 2.75459 1.82483C3.13599 1.6106 3.56844 1.49855 4.00829 1.50001C4.44814 1.50147 4.87981 1.61639 5.25971 1.83315L20.2548 10.3857C20.6332 10.6004 20.9474 10.9085 21.1659 11.2791C21.3844 11.6497 21.4996 12.0699 21.5 12.4977C21.5004 12.9255 21.3859 13.3459 21.1681 13.7169C20.9502 14.0879 20.6366 14.3965 20.2586 14.6119L5.25971 23.1669C4.87981 23.3836 4.44814 23.4985 4.00829 23.5C3.56844 23.5014 3.13599 23.3894 2.75459 23.1752C2.37319 22.9609 2.05636 22.6521 1.83608 22.2798C1.6158 21.9076 1.49987 21.4851 1.5 21.055V3.94501Z" fill="#155dfc" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          {/if}
        </button>
      {/if}
      <button class="flex-1 py-2 px-4 text-white/75 hover:bg-gray-500/40 active:scale-110 transition-all duration-200 rounded-xl bg-gray-500/20" onclick={() => navigator.clipboard.writeText(code)}>
        copy code
      </button>
    </nav>
  </div>
</section>