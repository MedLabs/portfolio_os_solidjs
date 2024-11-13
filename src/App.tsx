import { type Component, createSignal, Show } from "solid-js";
import Panel from "./components/Panel";
import Terminal from "./components/Terminal";
import Files from "./components/Files";

const apps = [
  {
    title: "Terminal",
    value: "terminal",
    running: false,
    icon: "vscode-icons:file-type-powershell",
  },
  {
    title: "Files",
    value: "files",
    running: false,
    icon: "vscode-icons:default-folder-opened",
  },
  {
    title: "Stacks",
    value: "stacks",
    running: false,
    icon: "vscode-icons:file-type-appscript",
  },
  {
    title: "Blog",
    value: "blog",
    running: false,
    icon: "vscode-icons:file-type-rss",
  },
];

let [visibleApps, setVisibleApps] = createSignal<string[]>([]);

const toggleApp = (app: string): void => {
  if (!isRunning(app)) {
    setVisibleApps([...visibleApps(), app]);
  } else {
    setVisibleApps(visibleApps().filter((i) => i !== app));
  }
  console.log(visibleApps());
};

const isRunning = (app: string) => visibleApps().includes(app);

const App: Component = () => {
  return (
    <div class=" flex justify-center h-screen w-screen bg-gradient-to-br from-10% from-indigo-500 via-sky-500 via-30% to-emerald-500 to-90%">
      <p class="text-white/75 w-full p-2">SolidJS version</p>
      <Panel apps={apps} toggleApp={toggleApp} />
      <Show when={isRunning("files")}>
        <Files toggle={toggleApp("files")} />
      </Show>
      <Show when={isRunning("terminal")}>
        <Terminal toggle={toggleApp("terminal")} runApp={toggleApp("files")} />
      </Show>
    </div>
  );
};

export default App;
