import {
  type Component,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
} from "solid-js";
import { Icon } from "@iconify-icon/solid";
import dnd from "../utils/dnd";

const Files: Component<{ toggle: (param: string) => void }> = (props) => {
  let files: HTMLDivElement;
  let [filesPos, setFilesPos] = createSignal({
    top: window.innerHeight,
    left: window.innerWidth / 3,
  });
  let [windowMaximized, setWindowMaximized] = createSignal(false);

  onMount(() => {
    if (files) {
      setFilesPos({
        top: Math.random() * (window.innerHeight - files.offsetHeight),
        left: Math.random() * (window.innerWidth - files.offsetWidth),
      });
      files.style.top = `${filesPos().top}px`;
      files.style.left = `${filesPos().left}px`;
    }
    const cleanup = dnd(files);
    onCleanup(() => cleanup);
  });

  const shortcuts = [
    {
      title: "Home",
      icon: "carbon:home",
    },
    {
      title: "Documents",
      icon: "carbon:document",
    },
    {
      title: "Pictures",
      icon: "carbon:image",
    },
    {
      title: "Downloads",
      icon: "carbon:download",
    },
    {
      title: "Videos",
      icon: "carbon:video",
    },
    {
      title: "Projects",
      icon: "carbon:application-web",
    },
  ];

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
    div!.style.top = `${filesPos().top}px`;
    div!.style.left = `${filesPos().left}px`;
  }
  function closeAndMinimize() {
    props.toggle("files");
  }

  return (
    <div
      ref={files!}
      class={`w-[45vw] h-[40vh] flex justify-start absolute shadow `}
    >
      <div class="h-full w-1/4 bg-neutral-100/75 backdrop-blur-md pt-2 rounded-tl-lg rounded-bl-lg">
        <div class="flex justify-start h-8 p-2 items-center text-white active:cursor-move">
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
        </div>
        <For each={shortcuts}>
          {(s: any) => (
            <div class="flex justify-start items-center text-sm w-full text-neutral-800 p-1 hover:bg-neutral-100/25 hover:cursor-default">
              <Icon icon={s.icon} class="mr-2" />
              <span>{s.title}</span>
            </div>
          )}
        </For>
      </div>
      <div class="bg-neutral-100 w-full rounded-tr-lg rounded-br-lg">
        <div class="flex h-10 p-2 items-center rounded-tr-lg text-white border-b border-neutral-300 bg-neutral-200 active:cursor-move">
          <Icon
            icon="carbon:chevron-left"
            class="text-2xl text-neutral-700"
          />
          <Icon
            icon="carbon:chevron-right"
            class="ml-2 text-2xl text-neutral-700"
          />
          <div class="ml-4 text-neutral-700 text-center font-bold">Files</div>
        </div>
      </div>
    </div>
  );
};

export default Files;
