import { EmptyBorder } from "./border";
import { CommandsMenu } from "./commands-menu";
import StatusBar from "./status-bar";
import { type KeyBinding} from "@opentui/core"

type Props = {
  onSubmit: (input: string) => void;
  disabled?: boolean;
};

export const TEXTAREA_KEY_BINDINGS: KeyBinding[] = [
  // submit only with ctrl/cmd + enter
  { name: "return", ctrl: true, action: "submit" },
  { name: "enter", ctrl: true, action: "submit" },

  // normal enter = newline
  { name: "return", action: "newline" },
  { name: "enter", action: "newline" },
];




const InputBar = ({ onSubmit, disabled = false }: Props) => {
  return (
    <box width="100%" alignItems="stretch">
      <box
        width="100%"
        border={["left"]}
        borderColor="cyan"
        customBorderChars={{
          ...EmptyBorder,
          vertical: "┃",
          bottomLeft: "┗",
        }}
      >
        <box
          width="100%"
          flexDirection="column"
          justifyContent="space-between"
          paddingX={1}
          paddingY={1}
          backgroundColor={disabled ? "gray" : "#1E1E28"}
        >
            {
                true && 
                <box 
                position="absolute"
                bottom="100%"
                left={0}
                width="100%"
                backgroundColor="#1A1A24"
                zIndex={10}
                >
                    <CommandsMenu
                     query=""
                    />
                </box>
            }
          <textarea
            width="100%"
            keyBindings={TEXTAREA_KEY_BINDINGS}
            focused={!disabled}
            placeholder='Ask anything... "Fix a bug in the database"'
          />

          <StatusBar />
        </box>
      </box>
    </box>
  );
};

export default InputBar;