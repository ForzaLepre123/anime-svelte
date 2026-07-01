# anime-svelte

Svelte + Animejs integration. Small, reactive, and fully typed utilities for beautiful animations.

## Features

### Multiple Animation Approaches 
Components, transitions, and attachments for every use case  
### Reactive 
Animations update reactively when parameters change   
### Type-Safe 
Complete TypeScript support with animejs types  
### Extra Control 
Pause, play, restart animations on demand, and define targets

## Installation

```bash
npm install anime-svelte animejs
# or
pnpm add anime-svelte animejs
```

## Quick Start

### Basic Animation with Component

```svelte
<script>
  import { Animate } from 'anime-svelte';
</script>

<Animate 
  params={{ 
    opacity: [0, 1],
    duration: 600,
    rotate: [180, 0]
  }}
>
  <div class="box">I'm animated!</div>
</Animate>
```

### Text Animation with Split

```svelte
<script>
  import { Split } from 'anime-svelte';
  import { stagger } from 'animejs';
</script>

<Split 
  split={{ chars: true }}
  params={{
    opacity: [0, 1],
    translateY: [-10, 0],
    delay: stagger(30),
    duration: 400
  }}
>
  Amazing text
</Split>
```

### Transition Animation

```svelte
<script>
  import { anime } from 'anime-svelte';

  let visible = $state(true);
</script>

<button onclick={() => visible = !visible}>Show/hide</button>

{#if visible}
  <div
    transition:anime={{
      duration: 600,
      opacity: [0, 1],
      scale: [0.8, 1]
    }}
  >
    Animated in and out!
  </div>
{/if}
```

### Attachment Animation

```svelte
<script>
  import { animate } from 'anime-svelte';
</script>

<div {@attach animate({ rotate: 360, duration: 1000 })}>
  Spinning element
</div>
```

## Components

### `<Animate>`

Wraps elements with anime.js animations. Provides full reactive control with pause/play/restart methods.

**Props:**
- `params` Anime.js animation parameters (duration, easing, targets, etc.)
- `children` Content to render inside the animated element
- `root` Bindable reference to the animated DOM element
- `animation` Bindable reference to the active anime.js instance
- `target` Optional function that returns animation target element or array
- `...rest` Standard HTML attributes passed to the container

**Methods:**
- `getAnimation()` Get the current anime.js animation instance
- `restart()` Restart the animation from the beginning
- `pause()` Pause the animation
- `play()`  Resume the animation

**Example:**
```svelte
<script>
  import { Animate } from 'anime-svelte';
  let animateComponent;
</script>

<Animate
  bind:this={animateComponent}
  params={{ opacity: [0, 1], duration: 600 }}
>
  <h1>Hello</h1>
</Animate>

<button onclick={() => animateComponent.restart()}>
  Restart
</button>
```

### `<Split>`

Splits text into characters, words, or lines and animates each segment independently.

**Props:**
- `split` Text splitting configuration (chars, words, lines)
- `params`  Animation parameters applied to each split element
- `root` Bindable reference to the split container
- `animation`  Bindable reference to the active animation instance
- `...rest`  Standard HTML attributes passed to the container

**Methods:**
- `getAnimation()`  Get the current animation instance for the split text
- `restart()`  Restart the text split animation
- `pause()`  Pause the animation
- `play()` Resume the animation

**Example:**
```svelte
<script>
  import { Split } from 'anime-svelte';
  import { stagger } from 'animejs';
</script>

<Split
  split={{ words: true }}
  params={{
    opacity: [0, 1],
    duration: 400,
    delay: stagger(50)
  }}
>
  Animated text by words
</Split>
```

## Transitions

### `transition:anime`

Apply animejs animations for element enter/exit transitions.

**Parameters:**
- AnimationParams & { easing?: (t: number) => number }

**Example:**
```svelte
<script>
  import { anime } from 'anime-svelte';
  import { expoOut } from 'svelte/easing';
</script>

<div
  transition:anime={{
    duration: 600,
    easing: expoOut,
    opacity: [0, 1],
    scale: [0.8, 1]
  }}
>
  Animated with transitions!
</div>
```

## Attachments

Attachments allow you to apply animations without wrapping elements.

### `{@attach animate(params)}`

**Parameters:**
- `params` Anime.js animation parameters (duration, easing, targets, etc.)

**Example:**
```svelte 
<script>
  import { animate } from 'anime-svelte';
</script>

<div {@attach animate({ rotate: 360, duration: 1000 })}>
  Spinning element
</div>
```

### `{@attach split()}`

Split text and apply animations to each segment using an attachment.

**Parameters:**
- `splitParams` Text splitting configuration (chars, words, lines)
- `params` Animation parameters applied to split elements

**Example:**
```svelte
<script>
  import { split } from 'anime-svelte';
  import { stagger } from 'animejs';
</script>

<p {@attach split({ words: true }, { opacity: [0, 1], stagger: 50, duration: 400 })}>
  Animated text by words
</p>
```

## Select the right Approach

-  **Components** for extra control (target, pause, play, restart)
-  **Transitions** for element enter/exit animations
-  **Attachments** for text animations or simple animations without wrapping

## Examples

### Staggered Animations

```svelte
<script>
  import { Animate } from 'anime-svelte';
  import { stagger } from 'animejs';
</script>

<Animate
  target={(el) => el.children}
  params={{
    opacity: [0, 1],
    translateY: [-20, 0],
    delay: stagger(100),
    duration: 500
  }}
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Animate>
```

### Targeting Multiple Elements

```svelte
<script>
  import { Animate } from 'anime-svelte';
</script>

<Animate
  target={(el) => [el.querySelector('.title'), el.querySelector('.subtitle')]}
  params={{
    opacity: [0, 1],
    delay: [0, 200],
    duration: 600
  }}
>
  <h1 class="title">Title</h1>
  <p class="subtitle">Subtitle</p>
  <p>not animated</p>
</Animate>
```

### Conditional Animations

```svelte
<script>
  import { Animate } from 'anime-svelte';
  let visible = $state(false);
</script>

{#if visible}
  <Animate params={{ opacity: [0, 1], duration: 600 }}>
    <div>Conditionally animated content</div>
  </Animate>
{/if}

<button onclick={() => visible = !visible}>
  Toggle
</button>
```

### Multiple animations on same element

For independent animations on the same element, use attachments:

```svelte
<div
  {@attach animate({ rotate: 45, duration: 1000 })}
  {@attach split({ chars: true }, { opacity: [0, 1], delay: stagger(50) })}
>
  Animated text
</div>
```

## Roadmap

Planned features:

- [ ] **Draggable support**
- [ ] **Layout animations**
- [ ] **Timeline support**

## Contributing

Feedback, issues, and contributions are welcome! 

- [GitHub Repository](https://github.com/Mr1am/anime-svelte)
- [Issues](https://github.com/Mr1am/anime-svelte/issues)
- [Discussions](https://github.com/Mr1am/anime-svelte/discussions)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
