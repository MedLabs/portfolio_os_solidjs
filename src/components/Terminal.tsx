import {
  type Component,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
} from "solid-js";
import dnd from "../utils/dnd";
import { shell } from "../utils/shell";
import { Icon } from "@iconify-icon/solid";

const Terminal: Component<
  { toggle: (param: string) => void; runApp: (param: string) => void }
> = (props) => {
  let terminal: HTMLDivElement;
  let [cmd, setCmd] = createSignal("");
  let [terminalPos, setTerminalPos] = createSignal<
    { top: number; left: number }
  >({ top: window.innerHeight, left: window.innerWidth / 2 });
  let [windowMaximized, setWindowMaximized] = createSignal(false);

  let [history, setHistory] = createSignal<string[]>([]);
  onMount(() => {
    if (terminal) {
      setTerminalPos({
        top: Math.random() * (window.innerHeight - terminal.offsetHeight - 50),
        left: Math.random() * (window.innerWidth - terminal.offsetWidth),
      });
      terminal.style.top = `${terminalPos().top}px`;
      terminal.style.left = `${terminalPos().left}px`;
    }
    const cleanup = dnd(terminal);
    onCleanup(() => cleanup);
  });

  function runCmd(e: KeyboardEvent) {
    if (e.key === "Enter") {
      if (shell(cmd()) === "") {
        return;
      }
      if (shell(cmd()) === "C") {
        setHistory([]);
        setCmd("");
        return;
      }
      if (cmd() === "/files") {
        setHistory([
          ...history(),
          `<span class="text-lime-500">medlabs~$</span> ${cmd()}`,
        ]);
        setCmd("");
        props.runApp("files");
        return;
      }
      setHistory([
        ...history(),
        `<span class="text-lime-500">medlabs~$</span> ${cmd()}`,
      ]);
      setHistory([...history(), shell(cmd())]);

      setCmd("");
    }
  }

  function maximize(element: string) {
    setWindowMaximized(true);
    let div = document.getElementById(element);
    div?.classList.add("w-screen");
    div?.classList.add("h-screen");
    div?.classList.remove("w-[50vw]");
    div?.classList.remove("h-[40vh]");
    div!.style.left = "0px";
    div!.style.top = "0px";
  }
  function restore(element: string) {
    setWindowMaximized(false);
    let div = document.getElementById(element);
    div?.classList.remove("w-screen");
    div?.classList.remove("h-screen");
    div?.classList.add("w-[45vw]");
    div?.classList.add("h-[40vh]");
    div!.style.top = `${terminalPos().top}px`;
    div!.style.left = `${terminalPos().left}px`;
  }
  function closeAndMinimize() {
    props.toggle("terminal");
  }

  return (
    <div
      ref={terminal!}
      class={`w-[45vw] h-[40vh] absolute bg-neutral-800 rounded-lg border-2 border-neutral-700 shadow overflow-hidden z-10`}
    >
      <div class="flex justify-start h-8 p-2 items-center text-white border-b border-neutral-600 active:cursor-move">
        <button
          class="flex w-4 h-4 bg-red-400 rounded-full mr-1 justify-center items-center"
          onClick={closeAndMinimize}
        >
          <Icon icon="carbon:close" class="text-xs" />
        </button>
        <button class="flex justify-center items-center w-4 h-4 bg-orange-400 rounded-full mr-1">
          <Icon icon="carbon:subtract" class="text-xs" />
        </button>
        <button
          class="flex justify-center items-center w-4 h-4 bg-green-400 rounded-full mr-1"
          onclick={() => (windowMaximized()
            ? restore("files")
            : maximize("files"))}
        >
          <Show when={windowMaximized()}>
            <Icon icon="carbon:minimize" class="text-xs" />
          </Show>
          <Show when={!windowMaximized()}>
            <Icon icon="carbon:maximize" class="text-xs" />
          </Show>
        </button>
        <div class="ml-4 text-neutral-100 text-center">Terminal</div>
      </div>
      <div class="grid pt-2 px-2 font-mono">
        <p class="text-neutral-500 w-full"># type /help for Help</p>
        <For each={history()}>
          {(h) => <p class="text-white" innerHTML={h}></p>}
        </For>
        <div class="flex justify-start items-center">
          <span class="text-lime-500">medlabs~$</span>
          <input
            id="cmdline"
            class="border-0 bg-transparent w-full p-2 text-white caret-orange-500 outline-none"
            type="text"
            value={cmd()}
            onInput={(e) => setCmd(e.currentTarget.value)}
            onKeyUp={runCmd}
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
