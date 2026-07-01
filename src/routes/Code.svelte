<script>
import { HighlightAuto } from "svelte-highlight";
let { code, ...rest } = $props();
</script>

<div {...rest} class="rounded-2xl bg-gray-600/40 relative {rest.class}">
  <button title='copy' class="absolute right-2 top-2 p-3 text-white/75 hover:bg-gray-500/40 active:scale-110 transition-all duration-200 rounded-xl bg-gray-500/20" onclick={() => navigator.clipboard.writeText(code)}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-icon lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
  </button>
  <HighlightAuto class="select-text bg-none" {code}/>
</div>
