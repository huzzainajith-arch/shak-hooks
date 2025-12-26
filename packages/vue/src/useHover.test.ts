import { describe, it, expect, vi } from "vitest";
import { useHover } from "./useHover";
import { ref } from "vue";

describe("Vue: useHover", () => {
  it("should detect hover", () => {
    const target = ref(document.createElement("div"));
    const isHovered = useHover(target);

    expect(isHovered.value).toBe(false);

    const enterEvent = new MouseEvent("mouseenter");
    target.value.dispatchEvent(enterEvent);
    
    expect(isHovered.value).toBe(true);

    const leaveEvent = new MouseEvent("mouseleave");
    target.value.dispatchEvent(leaveEvent);

    expect(isHovered.value).toBe(false);
  });
});
