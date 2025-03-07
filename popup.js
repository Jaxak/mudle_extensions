document.getElementById('changeColor').addEventListener('click', async () => {
    chrome.scripting.executeScript({
      target: { tabId: (await chrome.tabs.query({active: true}))[0].id },
      func: () => {
        document.body.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
      }
    });
  });