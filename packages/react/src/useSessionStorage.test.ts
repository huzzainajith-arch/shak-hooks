import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSessionStorage } from "./useSessionStorage";

describe("React: useSessionStorage", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("should return initial value", () => {
    const { result } = renderHook(() => useSessionStorage("key", "initial"));
    expect(result.current[0]).toBe("initial");
  });

  it("should update session storage", () => {
    const { result } = renderHook(() => useSessionStorage("key", "initial"));
    
    act(() => {
      result.current[1]("new");
    });

    expect(result.current[0]).toBe("new");
    expect(window.sessionStorage.getItem("key")).toBe(JSON.stringify("new"));
  });

  it("should initialize from session storage", () => {
    window.sessionStorage.setItem("key", JSON.stringify("existing"));
    const { result } = renderHook(() => useSessionStorage("key", "initial"));
    expect(result.current[0]).toBe("existing");
  });
});
