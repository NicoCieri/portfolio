// Short or narrow viewports use the same final scene state as reduced motion.
export const sceneReflowClass = "[&[data-scene-active=false]_*]:[animation-play-state:paused]! [@media(max-height:600px),(max-width:359px)]:h-auto! [@media(max-height:600px),(max-width:359px)]:min-h-0!";
export const viewportReflowClass = "[@media(max-height:600px),(max-width:359px)]:static! [@media(max-height:600px),(max-width:359px)]:h-auto! [@media(max-height:600px),(max-width:359px)]:min-h-0! [@media(max-height:600px),(max-width:359px)]:overflow-visible! [@media(max-height:600px),(max-width:359px)]:py-8!";
