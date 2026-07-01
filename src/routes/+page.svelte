<script>
  import { Split, split, Animate, animate, anime } from "$lib/index.js";
  import { onScroll, spring, stagger } from "animejs";
  import { browser } from "$app/env";
  import { tokyoNightDark } from "svelte-highlight/styles";
  import Code from "./Code.svelte";
  import Example from "./Example.svelte";
  import { expoOut } from "svelte/easing";
  import Props from "./Props.svelte";
  import Nav from "./Nav.svelte";

  const titleParams = {
    opacity: [0, 1],
    translateX: [-20, 0],
    scale: [0.25, 1],
    delay: stagger(50),
    ease: spring({duration: 800})
  }

  const btnMain = 'bg-blue-600 hover:bg-blue-700 active:scale-110 transition-[background, scale] duration-200 px-4 py-2 rounded-xl';
  let exampleAnimate1 = $state();
  let exampleAnimate2 = $state();
  let exampleAnimateTarget = $state();
  let exampleAnimateScroll = $state();
  let exampleSplit1 = $state();
</script>

<Nav/>
{#if browser}
  <main id="scroll-container" class="scroll-smooth container flex flex-col mx-auto px-3 max-w-200 w-[calc(100vw-0.5rem)] items-center justify-start overflow-y-auto overflow-x-hidden pb-8">
    <Animate class="flex h-dvh min-h-dvh flex-col items-center justify-center transform-3d perspective-normal" params={{
      translateY: [0, 'calc(50% - 6.5rem)'],
      scale: [1, 0.9],
      opacity: [1, 0.5],
      autoplay: onScroll({
        axis: 'y',
        enter: 'top top',
        leave: 'top bottom',
        sync: 0.75,
      }),
      ease: 'outQuad'
    }} animated={exampleAnimate1}>
      <h1
        {@attach split({ chars: true }, titleParams)}
        class="text-5xl font-semibold py-2">
        anime-svelte
      </h1>

      <p {@attach split({ chars: true }, {...titleParams, delay: stagger(10, { from: "center" })})}>
        Animejs wrapper for Svelte
      </p>
      <Animate
        class="flex gap-2 flex-col pt-4 flex-wrap"
        target={(element) => element.getElementsByTagName('a')}
        params={{ opacity: [0, 1], translateY: [-20, 0], ease: spring({ duration: 600 }), delay: stagger(100, {start: 600 })}}
      >
        <a href="#overview" class='{btnMain} w-full flex items-center justify-center gap-2'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-text-icon lucide-book-text"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="M8 11h8"/><path d="M8 7h6"/></svg>
          Docs
        </a>
        <div class="flex gap-2">
          <a href="https://animejs.com/" class='px-4 py-2 text-blue-600 bg-blue-600/20 hover:bg-blue-600/40 active:scale-110 transition-[background, scale] duration-200 rounded-xl'>Animejs</a>
          <a href="https://svelte.dev/" class='px-4 py-2 text-blue-600 bg-blue-600/20 hover:bg-blue-600/40 active:scale-110 transition-[background, scale] duration-200 rounded-xl'>Svelte</a>
        </div>
      </Animate>
    </Animate>

    <section class="w-full flex flex-col">
      <h2 class="text-3xl font-semibold py-2" id="overview">Overview</h2>
      <p>Svelte + Anime.js integration. Small, reactive, and fully typed utilities for beautiful animations.</p>
      <section class="flex flex-col sm:flex-row gap-2 mt-4">
        <div class="p-4 rounded-2xl bg-blue-600 flex-1">
          <h3 class="text-xl font-semibold pb-1">Type-safe</h3>
          <p>Full TypeScript support with anime.js types</p>
        </div>
        <div class="p-4 rounded-2xl bg-blue-600 flex-1">
          <h3 class="text-xl font-semibold pb-1">Reactive</h3>
          <p class="text-pretty">Animations update reactively when parameters change</p>
        </div>
      </section>
      <blockquote class="p-4 my-2 rounded-2xl bg-gray-600/40 text-white/75">
        This project is still under development. Feedback, issues, and contributions are welcome!
      </blockquote>

      <h3 class="text-2xl font-semibold pt-8 pb-1" id="overview-install">Installation</h3>
      <p class="pb-2 pt-2">Install anime-svelte:</p>
      <Code code="npm install anime-svelte"/>
      <p class="pb-2 pt-3">and anime.js:</p>
      <Code code="npm install anime-js"/>
      <span class="h-px w-full bg-gray-600/40 my-8"></span>

      <h2 class="text-3xl font-semibold pb-2" id="components">Components</h2>
      <p class="py-4">Use components when you need full control of animation or interaction.</p>

      <h3 class="text-xl font-semibold" id="components-animate">Animate</h3>
      <p class="pb-4 pt-2">Universal component.</p>
      <Code code={`<script>\n\timport { Animate } from 'anime-svelte';\n<\/script>`}/>
      <Props class="my-4" props={[{ title: 'params', type: ['AnimationParams'], description: 'Anime.js animation parameters (duration, ease, etc.)'}, { title: 'root', type: ['HTMLElement'], description: 'Bindable reference to the animated DOM element'}, { title: 'animation', type: ['JSAnimation'], description: 'Bindable reference to the active anime.js instance'}, { title: 'target', type: ['(HTMLElement)&nbsp;=> TargetSelector | TargetSelector[]'], description: 'Optional function that returns animation target element or array'}, { title: 'getAnimation', type: ['()&nbsp;=>&nbsp;JSAnimation | null'], description: 'Returns the current anime.js animation instance'}, { title: 'restart', type: ['() => void'], description: 'Restart the animation from the beginning'}, { title: 'pause', type: ['() => void'], description: 'Pause the animation'}, { title: 'play', type: ['() => void'], description: 'Resume the animation'}, { title: '...rest', type: ['unknown'], description: 'Attributes passed to the container. Can be used for stylization.'}]}></Props>
      <p class="pb-2">Simple usage:</p>
      <Example code={`<Animate
class="bg-emerald-500 rounded-xl h-36 w-36 content-center"
params={{
    duration: 2000,
    ease: 'inOutExpo',
    rotateZ: [-45, 0],
    scale: [0, 1]}}
>
  <h3 class="text-xl text-center">Animated!</h3>
</Animate>`} animated={exampleAnimate1}>
        <Animate bind:this={exampleAnimate1} class="bg-emerald-500 rounded-xl h-36 w-36 content-center" params={{ duration: 2000, ease: 'inOutExpo', rotateZ: [-45, 0], scale: [0, 1]}}>
          <h3 class="text-xl text-center">Animated!</h3>
        </Animate>
      </Example>
      <p class="py-4">Animation control:</p>
      <Code code={`<script>
    let ref = $state();

    function restart() {
      ref?.restart();
    }

    function play() {
      const animation = ref?.getAnimation();
      if (animation.completed === true) {
        ref?.restart();
        return;
      }

      paused = animation.paused;
      paused ? ref.play() : ref.pause();
      paused = animation.paused;
    }
</script>`}/>
      <p class="py-4">With the "target" prop for children animation:</p>
      <Example code={`<Animate
  bind:this={ref}
  target={(element) => element.querySelectorAll('span')}
  params={{
    opacity: [0, 1],
    translateY: [-50, 0],
    delay: stagger(50),
    duration: 600,
    ease: 'inOutExpo'
  }}
  class="flex flex-col gap-2"
>
  {#each [1, 2, 3, 4, 5] as item}
    <span
      class="rounded-xl p-4 bg-purple-600/20 text-purple-600">
      {item}
    </span>
  {/each}`} animated={exampleAnimateTarget}>
        <Animate
          bind:this={exampleAnimateTarget}
          target={(element) => element.querySelectorAll('span')}
          params={{
            opacity: [0, 1],
            translateY: [-50, 0],
            delay: stagger(50),
            duration: 600,
            ease: 'inOutExpo'
          }}
          class="flex flex-col gap-2"
        >
          {#each [1, 2, 3, 4, 5] as item}
            <span
              class="rounded-xl p-4 bg-purple-600/20 text-purple-600">
              {item}
            </span>
          {/each}
        </Animate>
      </Example>
      <p class="py-4">Scroll-triggered animation:</p>
      <Example code={`<div className="h-80 overflow-y-auto scroll-example">
  <p className="h-40">
  </p>
  <Animate
    params={{
    scale: [0.5, 1],
    autoplay: onScroll({
      axis: 'y',
      container: '.scroll-example',
      enter: 'bottom top+=25vh',
      leave: 'bottom bottom+=75vh',
      sync: 0.5
    })
  }}
    class="rounded-xl bg-pink-600 p-4"
  >
    <h3>Scroll-animated!</h3>
  </Animate>
</div>`} animated={exampleAnimateScroll}>
        <div class="h-80 overflow-y-auto scroll-example">
          <p class="h-40">
          </p>
          <Animate
            bind:this={exampleAnimateScroll}
            params={{
            scale: [0.5, 1],
            autoplay: onScroll({
              axis: 'y',
              container: '.scroll-example',
              enter: 'bottom top+=25vh',
              leave: 'bottom bottom+=75vh',
              sync: 0.5
            })
          }}
            class="rounded-xl bg-pink-600 p-4"
          >
            <h3>Scroll-animated!</h3>
          </Animate>
        </div>
      </Example>
      <blockquote class="p-4 my-2 rounded-2xl bg-gray-600/40 text-white/75">
        Note: it can be useful to create an empty trigger element and pass it to the "element" prop to animate a fixed or sticky-positioned element.
      </blockquote>
      <h3 class="text-xl font-semibold pb-1 pt-6" id="components-split">Split</h3>
      <p class="py-4">Component for text animations.</p>
      <Code code={`<script>\n\timport { Split } from 'anime-svelte';\n<\/script>`}/>
      <Props class="my-4" props={[{ title: 'split', type: ['TextSplitterParams'], description: 'Text splitting configuration (chars, words, lines)'}, { title: 'params', type: ['AnimationParams'], description: 'Animation parameters applied to each split element'}, { title: 'root', type: ['HTMLElement'], description: 'Bindable reference to the split container'}, { title: 'animation', type: ['JSAnimation'], description: 'Bindable reference to the active animation instance'}, { title: 'getAnimation', type: ['() => JSAnimation | null'], description: 'Returns the current split animation instance'}, { title: 'restart', type: ['() => void'], description: 'Restart the split animation'}, { title: 'pause', type: ['() => void'], description: 'Pause the split animation'}, { title: 'play', type: ['() => void'], description: 'Resume the split animation'}, { title: '...rest', type: ['unknown'], description: 'Attributes passed to the container. Can be used for stylization.'}]}></Props>
      <Example code={`<Split
  split={{ chars: true }}
  params={{
    opacity: [0, 1],
    translateY: [-10, 0],
    delay: stagger(30),
    duration: 500,
    ease: spring({ stiffness: 350 })
  }}
>
  Text animation!
</Split>`} animated={exampleSplit1}>
        <Split
          split={{ chars: true }}
          bind:this={exampleSplit1}
          params={{
            opacity: [0, 1],
            translateY: [-10, 0],
            delay: stagger(30),
            duration: 500,
            ease: spring({ stiffness: 350 })
          }}
        >
          Text animation!
        </Split>
      </Example>

      <span class="h-px w-full bg-gray-600/40 my-8"></span>

      <h2 class="text-3xl font-semibold" id="transitions">Transitions</h2>
      <h3 class="text-xl font-semibold pt-4 pb-4">anime</h3>
      <Code code={`<script>\n\timport { anime } from 'anime-svelte';\n<\/script>`}/>
      <Props props={[{ title: 'params', type: ['AnimationParams & (number) => number'], description: 'Animation parameters'}]}></Props>
      <p class=" pb-4">Use anime.js animations as Svelte transitions for entering/exiting elements.</p>
      <Example code={`<div
  class="bg-rose-500 rounded-xl h-36 w-36 content-center"
  transition:anime={{
    duration: 800,
    ease: 'outExpo',
    rotateZ: [135, 0],
    scale: [0, 1]}}
>
  <h3 class="text-xl text-center">
    Animated with transitions!
  </h3>
</div>`} show>
        <div class="bg-rose-500 rounded-xl h-36 w-36 content-center" transition:anime={{ duration: 800, ease: 'outExpo', rotateZ: [135, 0], scale: [0, 1]}}>
          <h3 class="text-xl text-center">Animated with transitions!</h3>
        </div>
      </Example>
      <p class="pt-6 pb-4">
        In the previous example, we used the "ease" param from animejs to set the easing of the animation. It can be unpredictable on the "out" transition. Instead, you can use the "easing" param as in any other Svelte transition:
      </p>
      <Code class='mb-4' code={`<script>\n\timport { expoOut } from "svelte/easing";\n<\/script>`}/>
      <Example code={`<div
  class="bg-rose-500 rounded-xl h-36 w-36 content-center"
  transition:anime={{
    duration: 800,
    easing: expoOut,
    rotateZ: [135, 0],
    scale: [0, 1]}}
>
  <h3 class="text-xl text-center">
    Same transition but with easing
  </h3>
</div>`} show>
        <div class="bg-rose-500 rounded-xl h-36 w-36 content-center" transition:anime={{ duration: 800, easing: expoOut, rotateZ: [135, 0], scale: [0, 1]}}>
          <h3 class="text-xl text-center">Same transition but with easing</h3>
        </div>
      </Example>
      <p class="pt-6 pb-4">
        Using different "in" and "out" transitions:
      </p>
      <Example code={`<div
  class="bg-green-500 rounded-xl h-36 w-36 content-center"
  in:anime={{
    ease: spring({ duration: 500 }),
    scale: [0, 1]
  }}
  out:anime={{
    duration: 500,
    easing: expoOut,
    translateX: [-100, 0],
    opacity: [0, 1]
  }}
>
  <h3 class="text-xl text-center">
    Different transitions!
  </h3>
</div>`} show>
<div
  class="bg-green-500 rounded-xl h-36 w-36 content-center"
  in:anime={{
    ease: spring({ duration: 500 }),
    scale: [0, 1]
  }}
  out:anime={{
    duration: 500,
    easing: expoOut,
    translateX: [-100, 0],
    opacity: [0, 1]
  }}
>
  <h3 class="text-xl text-center">
    Different transitions!
  </h3>
</div>
      </Example>
      <blockquote class="p-4 my-2 rounded-2xl bg-gray-600/40 text-white/75">
        Note: it might be necessary to swap params in the "out" transition
      </blockquote>

      <span class="h-px w-full bg-gray-600/40 my-8"></span>
      <h2 class="text-3xl font-semibold pb-2" id="attachments">Attachments</h2>
      <p class="py-4">Use attachments for animations without wrapping elements, when you don't need the additional control provided by the component-based approach.</p>
      
      <h3 class="text-xl font-semibold" id="attachments-animate">animate</h3>
      <p class="py-4">Applies anime.js animation to an element.</p>
      <Code code={`<script>\n\timport { animate } from 'anime-svelte';\n<\/script>`}/>
      <Props props={[{ title: 'params', type: ['AnimationParams'], description: 'Anime.js animation parameters (duration, targets, easing, etc.)'}]}></Props>
      <Example code={`<div
  class="bg-yellow-500 rounded-xl h-36 w-36 content-center"
  {@attach animate({
    scale: [0.85, 1],
    duration: 1000,
    loop: true,
    ease: 'inOutQuad',
    alternate: true
  })}
>
  <h3 class="text-xl text-center">
    Pulsating element
  </h3>
</div>`} show>
        <div
          {@attach animate({
            scale: [0.85, 1],
            duration: 1000,
            loop: true,
            ease: 'inOutQuad',
            alternate: true
          })}
          class="bg-yellow-500 rounded-xl h-36 w-36 content-center"
        >
          <h3 class="text-xl text-center">
            Pulsating element
          </h3>
        </div>
      </Example>
      
      <h3 class="text-xl font-semibold pt-6" id="attachments-split">split</h3>
      <p class="pt-4 pb-4">Splits text into characters, words, or lines and animates each element. Use for text-based animations without the Split component overhead.</p>
      <Code code={`<script>\n\timport { split } from 'anime-svelte';\n<\/script>`}/>
      <Props props={[{ title: 'splitParams', type: ['TextSplitterParams'], description: 'Text splitting configuration (chars, words, lines, etc.)'}, { title: 'params', type: ['AnimationParams'], description: 'Animation parameters applied to split elements'}]}></Props>
      <Example code={`<p
  {@attach split({ chars: true }, {
    opacity: [0, 1],
    scale: [0, 1],
    delay: stagger(50, {
      from: 'center',
      ease: 'circIn'
    }),
    duration: 400,
  })}
>
  Text animated from the center
</p>`} show>
        <p {@attach split({ chars: true }, {
          opacity: [0, 1],
          scale: [0, 1],
          delay: stagger(50, {
            from: 'center',
            ease: 'circIn'
          }),
          duration: 400,
        })}
        >
          text animated from the center
        </p>
      </Example>

      <p class="py-4">Multiple animations:</p>
      <Example code={`<div
  class="bg-yellow-500 rounded-xl h-36 p-2 content-center"
  {@attach animate({
    scale: [0.85, 1],
    duration: 1000,
    loop: true,
    ease: 'inOutQuad',
    alternate: true
  })}
  {@attach split({ chars: true }, {
    opacity: [0, 1],
    delay: stagger(50, { from: 'random' }),
    duration: 1000,
    loop: true,
    alternate: true
  })}
>
  Pulsating element
</div>`} show>
        <div
          {@attach animate({
            scale: [0.85, 1],
            duration: 1000,
            loop: true,
            ease: 'inOutQuad',
            alternate: true
          })}
          {@attach split({ chars: true }, {
            opacity: [0, 1],
            delay: stagger(50, { from: 'random' }),
            duration: 1000,
            loop: true,
            alternate: true
          })}
          class="bg-yellow-500 rounded-xl h-36 p-2 content-center"
        >
          Pulsating element
        </div>
      </Example>
    </section>
  </main>
  <footer class="footer w-full h-32 bg-gray-600/40 flex justify-end items-end">
    <section
      class="sticky bottom-0 left-0 right-0 mx-auto px-3 max-w-200 w-200 h-16 flex items-center justify-between"
      {@attach animate({
        opacity: [0, 1],
        scale: [0.85, 1],
        autoplay: onScroll({
          axis: 'y',
          enter: 'bottom top-=32px',
          leave: 'bottom bottom',
          sync: true,
        }),
        ease: 'outQuad'})}
    >
      <div class="flex gap-6 items-center">
        <svg class="-mb-1" width="36" viewBox="0 0 512 165"  xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
          <g>
            <path d="M157.538462,164.102564 L223.179487,164.102564 L223.179487,131.282051 L288.820513,131.282051 L288.820513,0 L157.538462,0 L157.538462,164.102564 Z M223.179487,32.8205128 L256,32.8205128 L256,98.4615385 L223.179487,98.4615385 L223.179487,32.8205128 Z M315.076923,0 L315.076923,131.282051 L380.717949,131.282051 L380.717949,32.8205128 L413.538462,32.8205128 L413.538462,131.282051 L446.358974,131.282051 L446.358974,32.8205128 L479.179487,32.8205128 L479.179487,131.282051 L512,131.282051 L512,0 L315.076923,0 Z M0,131.282051 L65.6410256,131.282051 L65.6410256,32.8205128 L98.4615385,32.8205128 L98.4615385,131.282051 L131.282051,131.282051 L131.282051,0 L0,0 L0,131.282051 Z" fill="#fff"/>
          </g>
        </svg>
        <svg width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
         <path fill="#fff" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      </div>
      <div class="flex gap-6">
        <p>MIT license</p>
        <a href="https://animejs.com/">animejs</a>
      </div>
    </section>
  </footer>
{/if}


<svelte:head>
  {@html tokyoNightDark}
  <title>anime-svelte</title>
</svelte:head>
