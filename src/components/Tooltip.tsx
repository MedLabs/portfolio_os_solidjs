import { JSX, createSignal, onMount, onCleanup } from "solid-js";

const Tooltip = (props: { text: string; children: JSX.Element }) => {
  const [visible, setVisible] = createSignal(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  let tooltipRef: HTMLDivElement | null = null;
  let targetRef: HTMLDivElement | null = null;

  // Event listeners for mouse and focus events
  onMount(() => {
    if (targetRef) {
      targetRef.addEventListener("mouseenter", showTooltip);
      targetRef.addEventListener("mouseleave", hideTooltip);
      targetRef.addEventListener("focus", showTooltip);
      targetRef.addEventListener("blur", hideTooltip);
    }
  });

  // Cleanup event listeners when the component is destroyed
  onCleanup(() => {
    if (targetRef) {
      targetRef.removeEventListener("mouseenter", showTooltip);
      targetRef.removeEventListener("mouseleave", hideTooltip);
      targetRef.removeEventListener("focus", showTooltip);
      targetRef.removeEventListener("blur", hideTooltip);
    }
  });

  return (
    <div class="relative inline-block" ref={(el) => targetRef = el}>
      {visible() && (
        <div
          ref={(el) => tooltipRef = el}
          class="absolute left-1/2 transform -translate-x-1/2 mb-8 p-2 bg-gray-700 text-white text-sm rounded"
          style={{ bottom: "100%" }}
        >
          {props.text}
        </div>
      )}
      {props.children}
    </div>
  );
}

export default Tooltip;

