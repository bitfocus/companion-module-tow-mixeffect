## MixEffect Companion Module

This module will allow you to control a MixEffect instance running on iOS devices such as an iPhone, iPad, iPod Touch, etc.

### Configuration
The MixEffect Companion Module requires that your MixEffect app is configured for OSC. This
configuration includes:

1. Enabling OSC support within MixEffect Automation Settings,
2. Enabling the OSC server for the particular switcher you want to control, and
3. Setting a port number to the switcher's OSC server.

For more information see the [Getting Started with OSC in MixEffect](https://mixeffect.app/docs/osc) guide.

Once OSC is enabled on the MixEffect app you can proceed to configure this module. You will need:

1. the Target IP address (which is the IP of the iOS device running MixEffect), and
2. the Target Port (which is the port of the switcher's OSC server described above).

### Actions
We have included a number of actions to help you control MixEffect. There are actions in each of these categories:

- Connectivity Actions
  - Connect
- Transition Actions
  - Auto
  - Cut
- Media Player Actions
  - Select Media Player
  - Media Player Clip
  - Media Player Clip Cycle
  - Media Player Clip Cycle Reverse
  - Media Player Still
  - Media Player Still Cycle
  - Media Player Still Cycle Reverse
- Macro Actions
  - Run Macro
- Shortcut Actions
  - Run Shortcut
  - Run Shortcut and Return
- Switcher Actions
  - Switcher Section
  - Switcher Page
  - Switcher Page Previous
  - Switcher Page Next
- SuperSource Actions
  - SuperSource Preset
  - SuperSource Previous Preset
  - SuperSource Next Preset
  - SuperSource Highlight
  - SuperSource Box Crop
  - SuperSource Box Position
  - SuperSource Box Size
  - SuperSource Box Source
  - SuperSource Transition Speed
  - SuperSource Cycle Transition Speed
  - SuperSource Transition Style
  - SuperSource Cycle Transition Style
  - SuperSource Grow Highlighted Box
  - SuperSource Grow Highlighted Box By
  - SuperSource Shrink Other Boxes
  - SuperSource Shrink Other Boxes By
  - SuperSource Swap
  - SuperSource Swap Boxes
  - SuperSource Auto
  - SuperSource Cut
  - SuperSource Cascade
  - SuperSource Cascade Presets
- Other Actions
  - Video Follows Audio
  - View Only Mode
  - Remote Webview


### Variables
- `media_player` - This variable is set using the **Select Media Player** Action and used by other Media Player Actions when the **Selected Media Player** option from the dropdown is used.


### Feedbacks
- Set color based on selected Media Player
