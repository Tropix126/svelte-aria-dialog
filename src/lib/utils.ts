import { createFocusTrap } from "focus-trap";
import type { Options } from "focus-trap";

// Simple wrapper action around the focus-trap package
export function focusTrap(node: HTMLElement, options: Options = { fallbackFocus: node }) {
    const trap = createFocusTrap(node, options);
    trap.activate();

    return {
        destroy() {
            trap.deactivate();
        }
    }
}

// (mostly unique, probably overkill) ID generator for handling WAI-ARIA related attributes
export function uid(prefix) {
	return (
		prefix +
		String.fromCharCode(Math.floor(Math.random() * 26) + 97) +
		Math.random().toString(16).slice(2) +
		performance.now().toString(16).slice(4)
	);
}