<script lang="ts">
  type Prop = {
    title: string;
    type: string[];
    description: string;
    [key: string]: unknown;
  }

  let { props = [], ...rest }: { props: Prop[], [key: string]: unknown } = $props();
</script>

<section {...rest} class="bg-gray-600/40 rounded-2xl px-4 py-3 flex flex-col my-4 select-text {rest.class}">
  {#each props as prop, index}
    <article class="flex gap-1 md:gap-4 flex-col md:flex-row">
      <div class="md:flex-1 flex flex-row gap-2 items-baseline justify-between">
        <p class="md:flex-1">{prop.title}</p>
        <div class="flex flex-col gap-2 md:flex-1 md:max-w-fit">
          {#each prop.type as type}
            <div class="py-1 px-2 bg-blue-600/20 text-blue-600 rounded-xl text-sm">
              {@html type}
            </div>
          {/each}
        </div>
      </div>
      <p class="opacity-75 flex-1 md:flex-2">{prop.description}</p>
    </article>
    {#if index !== props.length - 1}
      <span class="h-px w-full bg-gray-600/40 my-2"></span>
    {/if}
  {/each}
</section>