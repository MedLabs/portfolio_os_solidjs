import { createSignal } from 'solid-js'

export default function dnd(win: HTMLDivElement) {

  let [offsetX, setOffsetX] = createSignal<number>(0)
  let [offsetY, setOffsetY] = createSignal<number>(10)
  let [newLeft, setNewLeft] = createSignal<number>(0)
  let [newTop, setNewTop] = createSignal<number>(0)
  const WIDTH = win.offsetWidth
  const HEIGHT = win.offsetHeight

  function handleMouseDown(event: MouseEvent) {
    const rect = win.getBoundingClientRect();
    setOffsetX(event.clientX - rect.left);
    setOffsetY(event.clientY - rect.top);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  function handleMouseMove(event: MouseEvent) {
    setNewLeft(event.pageX - offsetX());
    setNewTop(event.pageY - offsetY());

    if (newLeft() < 0)
      setNewLeft(0)
    if (newTop() < 0)
      setNewTop(0)
    else if (Number(newLeft() + WIDTH) > window.innerWidth)
      setNewLeft(window.innerWidth - WIDTH)
    else if (Number(newTop() + HEIGHT) > window.innerHeight)
      setNewTop(window.innerHeight - HEIGHT)
    win.style.left = `${newLeft()}px`;
    win.style.top = `${newTop()}px`;
  }

  function handleMouseUp() {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

  win?.addEventListener("mousedown", handleMouseDown)

  return () => {
    win.removeEventListener("mousedown", handleMouseDown)
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }
}

