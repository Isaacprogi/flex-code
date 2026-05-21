import type {RefObject} from 'react'
import {TextAttributes} from '@opentui/core'
import { COMMANDS } from './commands'
import { getFilteredCommands } from './filter-commands'


const MAX_VISIBLE_COMMANDS = 8


const COMMAND_COL_WIDTH = Math.max(...COMMANDS.map(cmd => cmd.name.length)) + 4

type CommandsMenuProps = {
    query:string;
    scrollRef:RefObject<any>;
    selectedIndex:number;
    onSelect:(cmdValue:number)=>void;
    containerRef:RefObject<any>
    onExecute:(cmdValue:number)=>void
}

export function CommandsMenu({query, scrollRef, onExecute, selectedIndex,onSelect,containerRef}:CommandsMenuProps){

    const filteredCommands = getFilteredCommands(query)
    const visibleHeight = Math.min(filteredCommands.length,MAX_VISIBLE_COMMANDS)

    if(filteredCommands.length === 0){
        return (
            <box
             paddingX={1}
            >
                <text attributes={TextAttributes.DIM}>No Matching records</text>
            </box>
        )
    }

    return (
        <scrollbox ref={scrollRef} height={visibleHeight} >
            {
                filteredCommands.map((cmd,index)=>{
                    const isSelected = index === selectedIndex
                    return <box
                     key={cmd.value}
                     paddingX={1}
                     height={1}
                     overflow="hidden"
                     backgroundColor={isSelected ? "#89b4fa" : undefined}
                     onMouseMove={()=>onSelect(index)}
                     onMouseDown={()=>onExecute(index)}
                    >
                       <box width={COMMAND_COL_WIDTH} flexShrink={0}>
                          <text selectable={false} fg={isSelected ? "black" : "white"}>
                            /{cmd.name}
                          </text> 
                       </box>
                       <box overflow="hidden" width={COMMAND_COL_WIDTH} flexShrink={1}>
                          <text selectable={false} fg={isSelected ? "black" : "gray"}>
                            /{cmd.description}
                          </text> 
                       </box>

                    </box>
})
            }

        </scrollbox>
    )

}
