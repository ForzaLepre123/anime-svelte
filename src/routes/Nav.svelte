<script lang="ts">
	import { onMount } from 'svelte';
	import { onScroll } from 'animejs';
	import { animate } from '$lib/index.js';
	import { expoOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import { goto } from '$app/navigation';

	const btnSecondary =
		'py-2 text-white/75 hover:bg-gray-500/40 active:scale-110 transition-all duration-200 rounded-xl bg-gray-500/20';
	const option = 'opacity-65 pl-6 pr-4 hover:opacity-100 transition-opacity duration-200';
	const MOBILE_BREAKPOINT = 1140;

	let visible = $state(false);
	let topAnimationOpen: SVGAnimateElement;
	let topAnimationClose: SVGAnimateElement;
	let bottomAnimationOpen: SVGAnimateElement;
	let bottomAnimationClose: SVGAnimateElement;

	function toggleMenu() {
		visible = !visible;

		if (visible) {
			topAnimationOpen?.beginElement();
			bottomAnimationOpen?.beginElement();
		} else {
			topAnimationClose?.beginElement();
			bottomAnimationClose?.beginElement();
		}
	}

	onMount(() => {
		const onResize = () => {
			if (window.innerWidth >= MOBILE_BREAKPOINT) {
				visible = false;
			}
		};

		window.addEventListener('resize', onResize);
		onResize();

		return () => window.removeEventListener('resize', onResize);
	});
</script>

<span class="trigger pointer-events-none absolute top-[calc(100dvh-3rem)] left-0 h-px w-px"></span>
{#if visible}
	<section
		class="fixed inset-0 z-1000 flex h-dvh max-h-dvh w-full origin-top flex-col gap-2 overflow-auto bg-gray-600/20 pt-20 backdrop-blur-2xl"
		transition:slide={{ axis: 'y', easing: expoOut, duration: 800 }}
	>
		<div class="mx-4 flex flex-col rounded-3xl bg-gray-600/20 py-4">
			<button
				onclick={() => {
					void goto('#overview');
					visible = false;
				}}
				class="px-6 text-start text-2xl font-semibold">Overview</button
			>
			<button
				onclick={() => {
					void goto('#overview-install');
					visible = false;
				}}
				class={option + ' text-start'}>Install</button
			>
		</div>
		<div class="mx-4 flex flex-col rounded-3xl bg-gray-600/20 py-4">
			<button
				onclick={() => {
					void goto('#components');
					visible = false;
				}}
				class="px-6 text-start text-2xl font-semibold">Components</button
			>
			<button
				onclick={() => {
					void goto('#components-animate');
					visible = false;
				}}
				class={option + ' text-start'}>Animate</button
			>
			<button
				onclick={() => {
					void goto('#components-split');
					visible = false;
				}}
				class={option + ' text-start'}>Split</button
			>
		</div>
		<div class="mx-4 flex flex-col rounded-3xl bg-gray-600/20 py-4">
			<button
				onclick={() => {
					void goto('#transitions');
					visible = false;
				}}
				class="px-6 text-start text-2xl font-semibold">Transitions</button
			>
		</div>
		<div class=" mx-4 flex flex-col rounded-3xl bg-gray-600/20 py-4">
			<button
				onclick={() => {
					void goto('#attachments');
					visible = false;
				}}
				class="px-6 text-start text-2xl font-semibold">Attachments</button
			>
			<button
				onclick={() => {
					void goto('#attachments-animate');
					visible = false;
				}}
				class={option + ' text-start'}>animate</button
			>
			<button
				onclick={() => {
					void goto('#attachments-split');
					visible = false;
				}}
				class={option + ' text-start'}>split</button
			>
		</div>
		<section class="flex justify-center p-4">
			<div class="flex items-center gap-6 opacity-75">
				<svg width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path
						fill="#fff"
						d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
					/>
				</svg>
				<svg
					class="-mb-1"
					width="36"
					viewBox="0 0 512 165"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="xMidYMid"
				>
					<g>
						<path
							d="M157.538462,164.102564 L223.179487,164.102564 L223.179487,131.282051 L288.820513,131.282051 L288.820513,0 L157.538462,0 L157.538462,164.102564 Z M223.179487,32.8205128 L256,32.8205128 L256,98.4615385 L223.179487,98.4615385 L223.179487,32.8205128 Z M315.076923,0 L315.076923,131.282051 L380.717949,131.282051 L380.717949,32.8205128 L413.538462,32.8205128 L413.538462,131.282051 L446.358974,131.282051 L446.358974,32.8205128 L479.179487,32.8205128 L479.179487,131.282051 L512,131.282051 L512,0 L315.076923,0 Z M0,131.282051 L65.6410256,131.282051 L65.6410256,32.8205128 L98.4615385,32.8205128 L98.4615385,131.282051 L131.282051,131.282051 L131.282051,0 L0,0 L0,131.282051 Z"
							fill="#fff"
						/>
					</g>
				</svg>
			</div>
		</section>
	</section>
{/if}
<nav
	class="fixed top-4 left-4 z-1001 max-h-fit rounded-3xl bg-gray-600/40 p-4 opacity-0 backdrop-blur-lg"
	{@attach animate({
		opacity: [0, 1],
		marginTop: [-64, 0],
		autoplay: onScroll({
			target: '.trigger',
			enter: 'top top',
			leave: 'top bottom',
			sync: 0.5
		})
	})}
>
	<div class="hidden flex-col gap-2 mid:flex">
		<h4 class="pb-1 text-xl font-semibold">Docs</h4>
		<div class="{btnSecondary} flex flex-col">
			<a href="#overview" class="px-4">Overview</a>
			<a href="#overview-install" class={option}>Install</a>
		</div>
		<div class="{btnSecondary} flex flex-col">
			<a href="#components" class="px-4">Components</a>
			<a href="#components-animate" class={option}>Animate</a>
			<a href="#components-split" class={option}>Split</a>
		</div>
		<div class="{btnSecondary} flex flex-col">
			<a href="#transitions" class="px-4">Transitions</a>
		</div>
		<div class="{btnSecondary} flex flex-col">
			<a href="#attachments" class="px-4">Attachments</a>
			<a href="#attachments-animate" class={option}>animate</a>
			<a href="#attachments-split" class={option}>split</a>
		</div>
	</div>

	<button class="-m-4 flex p-4 mid:hidden" title="open/close" onclick={toggleMenu}>
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32">
			<path
				d="M 1 10 L 16 10 L 31 10"
				stroke-width="2"
				stroke="currentColor"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<animate
					bind:this={topAnimationOpen}
					attributeName="d"
					values="M 1 10 L 16 10 L 31 10; M 4 4 L 16 16 L 28 4"
					begin="indefinite"
					dur="0.2s"
					fill="freeze"
					calcMode="spline"
					keySplines="0.5 0 0.175 1"
				/>
				<animate
					bind:this={topAnimationClose}
					attributeName="d"
					values="M 4 4 L 16 16 L 28 4; M 1 10 L 16 10 L 31 10"
					begin="indefinite"
					dur="0.2s"
					fill="freeze"
					calcMode="spline"
					keySplines="0.5 0 0.175 1"
				/>
			</path>
			<path
				d="M 1 22 L 16 22 L 31 22"
				stroke-width="2"
				stroke="currentColor"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<animate
					bind:this={bottomAnimationOpen}
					attributeName="d"
					values="M 1 22 L 16 22 L 31 22; M 4 28 L 16 16 L 28 28"
					begin="indefinite"
					dur="0.2s"
					fill="freeze"
					calcMode="spline"
					keySplines="0.5 0 0.175 1"
				/>
				<animate
					bind:this={bottomAnimationClose}
					attributeName="d"
					values="M 4 28 L 16 16 L 28 28; M 1 22 L 16 22 L 31 22"
					begin="indefinite"
					dur="0.2s"
					fill="freeze"
					calcMode="spline"
					keySplines="0.5 0 0.175 1"
				/>
			</path>
		</svg>
	</button>
</nav>
