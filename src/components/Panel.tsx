import { For, Component } from 'solid-js'
import { Icon } from '@iconify-icon/solid'
import Tooltip from './Tooltip'

const Panel: Component<{ apps: any[], toggleApp: (app: string) => void }> = (props) => {

  return (
    <div
      class="flex justify-center gap-4 items-center fixed bottom-3 w-1/2 rounded-xl backdrop-blur-sm h-20 bg-white/30 text-center z-max"
    >
      <For each={props.apps}>
        {(app: any) =>
          <Tooltip text={app.title}>
            <Icon
              icon={app.icon}
              class="text-6xl hover:scale-150 hover:-translate-y-6 duration-300"
              onClick={() => props.toggleApp(app.value)}
            />
          </Tooltip>
        }
      </For>
    </div>

  )
}

export default Panel 
