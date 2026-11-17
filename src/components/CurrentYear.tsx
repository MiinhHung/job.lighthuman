"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Copyright year: build year during prerender, the visitor's current year on the client. */
export default function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => 2026,
  );
  return <span>{year}</span>;
}
