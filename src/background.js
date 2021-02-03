console.log("background");

const data = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "performance:metric") {
    const tab = sender.tab.url.toString();
    if (data[tab] === undefined) data[tab] = {};
    const { name, value } = message;
    if (data[tab][name] === undefined)
      data[tab][name] = { values: [], average: 0 };
    data[tab][name].values.push(value);
    data[tab][name].average =
      data[tab][name].values.reduce((a, v) => a + v, 0) /
      data[tab][name].values.length;
    sendResponse({});
  }
  if (message.type === "performance:metric:request") {
    sendResponse(data);
  }
});
