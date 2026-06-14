// FroG Plugin — code.js (Plugin backend)
// Opens the UI panel when the plugin runs

figma.showUI(__html__, {
  width: 320,
  height: 360,
  title: 'FroG 🐸',
  themeColors: true,
});

// Handle messages from UI
figma.ui.onmessage = async function(msg) {
  if (msg.type === 'get-onboarding-status') {
    const completed = await figma.clientStorage.getAsync('hasCompletedStep1');
    figma.ui.postMessage({ type: 'onboarding-status', completed: !!completed });
  } else if (msg.type === 'set-onboarding-completed') {
    await figma.clientStorage.setAsync('hasCompletedStep1', true);
  } else if (msg.type === 'close') {
    figma.closePlugin();
  }
};
