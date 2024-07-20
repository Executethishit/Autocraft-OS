(function() {
  'use strict';

  // Load Font Awesome CSS
  let fontAwesomeLink = document.createElement('link');
  fontAwesomeLink.rel = 'stylesheet';
  fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
  document.head.appendChild(fontAwesomeLink);

  // Create a draggable dashboard
  let dashboard = document.createElement('div');
  dashboard.id = 'autocraft-dashboard';
  dashboard.style.position = 'fixed';
  dashboard.style.top = '10px';
  dashboard.style.left = '10px';
  dashboard.style.zIndex = '1000';
  dashboard.style.padding = '10px';
  dashboard.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  dashboard.style.width = '300px';
  dashboard.style.height = '450px'; // Increased height to accommodate dropdown
  dashboard.style.color = 'white';
  dashboard.style.textAlign = 'center';
  dashboard.style.border = '1px solid #ccc';
  dashboard.style.borderRadius = '10px';
  dashboard.style.display = 'flex';
  dashboard.style.flexDirection = 'column';
  dashboard.style.justifyContent = 'space-between';
  dashboard.style.alignItems = 'center';
  dashboard.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

  // Add title
  let title = document.createElement('h1');
  title.innerText = 'AUTO CRAFT';
  title.style.marginTop = '10px';
  title.style.fontSize = '20px';
  title.style.fontFamily = 'Arial, sans-serif';

  // Add subtitle (credits)
  let subtitle = document.createElement('p');
  subtitle.innerText = 'BY TROJAN10';
  subtitle.style.fontSize = '10px';
  subtitle.style.margin = '0';

  // Status line
  let statusLine = document.createElement('p');
  statusLine.id = 'status-line';
  statusLine.style.fontSize = '14px';
  statusLine.style.margin = '10px 0';

  // Add start/stop button
  let startStopButton = document.createElement('button');
  startStopButton.innerText = 'START/STOP';
  startStopButton.style.margin = '20px 0';
  startStopButton.style.padding = '10px 20px';
  startStopButton.style.border = 'none';
  startStopButton.style.borderRadius = '5px';
  startStopButton.style.backgroundColor = '#4CAF50';
  startStopButton.style.color = 'white';
  startStopButton.style.cursor = 'pointer';
  startStopButton.style.fontSize = '16px';
  startStopButton.onclick = () => {
    chrome.runtime.sendMessage({ action: 'toggle' });
  };

  // Add dropdown menu for recipes
  let recipeDropdownContainer = document.createElement('div');
  recipeDropdownContainer.style.position = 'relative';
  recipeDropdownContainer.style.width = '90%';  // Set a fixed width to fit within the dashboard

  let recipeDropdownButton = document.createElement('button');
  recipeDropdownButton.innerText = 'Select Recipe';
  recipeDropdownButton.style.margin = '10px 0';
  recipeDropdownButton.style.padding = '5px';
  recipeDropdownButton.style.border = 'none';
  recipeDropdownButton.style.borderRadius = '5px';
  recipeDropdownButton.style.backgroundColor = '#ffffff';
  recipeDropdownButton.style.color = 'black';
  recipeDropdownButton.style.cursor = 'pointer';
  recipeDropdownButton.style.fontSize = '14px';  // Adjusted font size
  recipeDropdownButton.style.width = '100%';  // Full width within the container

  let recipeDropdown = document.createElement('div');
  recipeDropdown.style.position = 'absolute';
  recipeDropdown.style.top = '40px';  // Adjust to fit below the button
  recipeDropdown.style.width = '100%';
  recipeDropdown.style.border = '1px solid #ccc';
  recipeDropdown.style.borderRadius = '5px';
  recipeDropdown.style.backgroundColor = '#fff';
  recipeDropdown.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  recipeDropdown.style.display = 'none';
  recipeDropdown.style.maxHeight = '200px';  // Optional: limit the dropdown height
  recipeDropdown.style.overflowY = 'auto';  // Optional: add scroll if content overflows
  recipeDropdown.style.zIndex = '1000';  // Ensure dropdown is on top

  let searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search recipes...';
  searchInput.style.width = '100%';
  searchInput.style.padding = '5px';
  searchInput.style.boxSizing = 'border-box';
  searchInput.style.marginBottom = '10px';

  recipeDropdown.appendChild(searchInput);

  // Recipe options
  let recipes = [
    "Grainbow Flour",
    "Popberry Jam",
    "Popberry Pie",
    "Barrel of Popberry Jam",
    "Barrel of Syrup",
    "Barrel of Vinegar",
    "Basic Stove Kit",
    "Blue Grumpkin Pie",
    "Blue Grumpkin Puree",
    "Grainbow Tart",
    "Grumpkin Loaf",
    "Improved Stove Kit",
    "Orange Grumpkin Puree",
    "Popberry Loaf",
    "Sack of Grainbow Flour",
    "Syrup",
    "Vinegar"
  ];

  recipes.forEach(recipe => {
    let option = document.createElement('div');
    option.textContent = recipe;
    option.style.padding = '5px';
    option.style.cursor = 'pointer';
    option.onclick = () => {
      recipeDropdownButton.innerText = recipe;
      recipeDropdown.style.display = 'none';
    };
    recipeDropdown.appendChild(option);
  });

  recipeDropdownButton.onclick = () => {
    recipeDropdown.style.display = recipeDropdown.style.display === 'none' ? 'block' : 'none';
    searchInput.focus();  // Focus on the search input when the dropdown opens
  };

  searchInput.onkeyup = () => {
    let filter = searchInput.value.toLowerCase();
    let options = recipeDropdown.getElementsByTagName('div');
    for (let i = 1; i < options.length; i++) {  // Skip the search input
      let txtValue = options[i].textContent || options[i].innerText;
      options[i].style.display = txtValue.toLowerCase().includes(filter) ? '' : 'none';
    }
  };

  recipeDropdownContainer.appendChild(recipeDropdownButton);
  recipeDropdownContainer.appendChild(recipeDropdown);
  dashboard.appendChild(recipeDropdownContainer); // Add dropdown to the dashboard


  // Delay input and submit button
  let delayContainer = document.createElement('div');
  delayContainer.style.display = 'flex';
  delayContainer.style.alignItems = 'center';

  let delayLabel = document.createElement('label');
  delayLabel.innerText = 'Set Delay (ms):';
  delayLabel.style.fontSize = '14px';
  delayLabel.style.marginRight = '10px';

  let delayInput = document.createElement('input');
  delayInput.type = 'number';
  delayInput.style.marginRight = '10px';
  delayInput.style.padding = '5px';
  delayInput.style.fontSize = '14px';
  delayInput.style.width = '80px';

  let submitDelayButton = document.createElement('button');
  submitDelayButton.innerText = 'Set Delay';
  submitDelayButton.style.padding = '5px 10px';
  submitDelayButton.style.border = 'none';
  submitDelayButton.style.borderRadius = '5px';
  submitDelayButton.style.backgroundColor = '#2196F3';
  submitDelayButton.style.color = 'white';
  submitDelayButton.style.cursor = 'pointer';
  submitDelayButton.style.fontSize = '14px';
  submitDelayButton.onclick = () => {
    let delay = parseInt(delayInput.value);
    if (!isNaN(delay) && delay > 0) {
      chrome.storage.local.set({ delay: delay });
      setStatus(`Delay set to ${delay} ms`);
    } else {
      setStatus('Invalid delay');
    }
  };

  delayContainer.appendChild(delayLabel);
  delayContainer.appendChild(delayInput);
  delayContainer.appendChild(submitDelayButton);

  // Social media links
  let socialLinks = document.createElement('div');
  socialLinks.style.display = 'flex';
  socialLinks.style.justifyContent = 'center';
  socialLinks.style.gap = '25px';
  socialLinks.innerHTML = `
    <a href="https://discord.gg/KN4vv9RD5W" target="_blank"><i class="fab fa-discord" style="font-size:32px; color:white;"></i></a>
    <a href="https://twitter.com/" target="_blank"><i class="fab fa-twitter" style="font-size:32px; color:white;"></i></a>
    <a href="https://www.youtube.com/" target="_blank"><i class="fab fa-youtube" style="font-size:32px; color:white;"></i></a>
    <a href="https://chromewebstore.google.com/detail/npkofkehllhmmfhkfkenmackpcefbmge/reviews?showReviewDialog=true" target="_blank"><i class="fas fa-globe" style="font-size:32px; color:white;"></i></a>
  `;

  dashboard.appendChild(title);
  dashboard.appendChild(subtitle);
  dashboard.appendChild(statusLine);
  dashboard.appendChild(startStopButton);
  dashboard.appendChild(recipeDropdown); // Added dropdown to the dashboard
  dashboard.appendChild(delayContainer);
  dashboard.appendChild(socialLinks);
  document.body.appendChild(dashboard);

   // Create toggle button
  let toggleButton = document.createElement('button');
  toggleButton.id = 'toggle-dashboard-button';
  toggleButton.innerText = 'Hide Dashboard';
  toggleButton.style.position = 'fixed';
  toggleButton.style.bottom = '10px';
  toggleButton.style.left = '10px';
  toggleButton.style.zIndex = '1000';
  toggleButton.style.padding = '10px 20px';
  toggleButton.style.backgroundColor = '#622aff';
  toggleButton.style.color = 'white';
  toggleButton.style.border = 'none';
  toggleButton.style.borderRadius = '5px';
  toggleButton.style.cursor = 'pointer';
  toggleButton.style.fontSize = '16px';
  document.body.appendChild(toggleButton);

  // Add event listener to toggle button
  toggleButton.addEventListener('click', () => {
    if (dashboard.style.display === 'none') {
      dashboard.style.display = 'flex';
      toggleButton.innerText = 'Hide Dashboard';
      toggleButton.style.backgroundColor = '#622aff';
    } else {
      dashboard.style.display = 'none';
      toggleButton.innerText = 'Show Dashboard';
      toggleButton.style.backgroundColor = '#4CAF50';
    }
  });

  // Make the dashboard draggable
  dashboard.onmousedown = function(event) {
    let shiftX = event.clientX - dashboard.getBoundingClientRect().left;
    let shiftY = event.clientY - dashboard.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      dashboard.style.left = pageX - shiftX + 'px';
      dashboard.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    dashboard.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      dashboard.onmouseup = null;
    };
  };

  dashboard.ondragstart = function() {
    return false;
  };

  // Restore the position of the dashboard
  chrome.storage.local.get(['dashboardPosition', 'delay'], function(result) {
    if (result.dashboardPosition) {
      dashboard.style.top = result.dashboardPosition.top;
      dashboard.style.left = result.dashboardPosition.left;
    }
    if (result.delay) {
      delayInput.value = result.delay;
    }
  });

  // Save the position of the dashboard
  window.addEventListener('beforeunload', function() {
    chrome.storage.local.set({
      dashboardPosition: {
        top: dashboard.style.top,
        left: dashboard.style.left
      }
    });
  });

  // Update button color and status line based on script state
  chrome.storage.local.get(['isScriptRunning'], function(result) {
    updateButton(result.isScriptRunning);
  });

  function updateButton(isRunning) {
    startStopButton.style.backgroundColor = isRunning ? '#f44336' : '#4CAF50';
    statusLine.innerText = isRunning ? 'Script is running...' : 'Script is stopped.';
  }

  // Listen for messages to update the button and status line
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'updateButton') {
      updateButton(message.isRunning);
    }
  });
  //                add on start
// Inside the function `addCustomButtons`

  function addCustomButtons() {
      // Create a container for the buttons
      var buttonContainer = document.createElement('div');
      buttonContainer.style.position = 'absolute';
      buttonContainer.style.top = '10px';
      buttonContainer.style.left = '10px';
      buttonContainer.style.display = 'flex';
      buttonContainer.style.flexDirection = 'column';
      buttonContainer.style.gap = '10px';

      // Create button 1 with the specified icon and hover text
      var button1 = document.createElement('button');
      button1.textContent = '🏠';
      button1.title = 'Go to Terra Villa';
      button1.style.padding = '5px 10px';
      button1.style.border = 'none';
      button1.style.borderRadius = '5px';
      button1.style.backgroundColor = '#4CAF50';
      button1.style.color = 'white';
      button1.style.cursor = 'pointer';
      button1.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)'; // Example of adding a shadow
      button1.addEventListener('click', function() {
          clickGoToTerraVillaButton();
      });

      // Create button 2 with the specified icon and hover text
      var button2 = document.createElement('button');
      button2.textContent = '🏝️';
      button2.title = 'Go to Speck';
      button2.style.padding = '5px 10px';
      button2.style.border = 'none';
      button2.style.borderRadius = '5px';
      button2.style.backgroundColor = '#4CAF50';
      button2.style.color = 'white';
      button2.style.cursor = 'pointer';
      button2.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)'; // Example of adding a shadow
      button2.addEventListener('click', function() {
          clickGoToSpeckButton();
      });

      // Append buttons to the container
      buttonContainer.appendChild(button1);
      buttonContainer.appendChild(button2);

      // Append the container to the dashboard
      dashboard.appendChild(buttonContainer);
  }

  // Function to handle the clicking for 'Go to Terra Villa'
  function clickGoToTerraVillaButton() {
      var firstButton = document.querySelector('button.Hud_outside__zzIGQ');
      if (firstButton) {
          firstButton.click();
          setStatus('Clicking first button for Terra Villa...');

          setTimeout(() => {
              var goToTerraVillaDiv = document.querySelector('.LandAndTravel_customHeader__goUPo');
              if (goToTerraVillaDiv) {
                  var goToTerraVillaButton = goToTerraVillaDiv.querySelector('button');
                  if (goToTerraVillaButton) {
                      goToTerraVillaButton.click();
                      setStatus('Clicking Go to Terra Villa button...');
                  } else {
                      setStatus('Go to Terra Villa button not found inside the div');
                  }
              } else {
                  setStatus('Go to Terra Villa div not found');
              }
          }, 1000); // Delay of 1 second (1000 ms)
      } else {
          setStatus('First button for Terra Villa not found or not clickable');
      }
  }

    // Function to handle the clicking for 'Go to Speck'
  function clickGoToSpeckButton() {
      var firstButton = document.querySelector('button.Hud_outside__zzIGQ');
      if (firstButton) {
          firstButton.click();
          setStatus('Clicking first button for Speck...');

          setTimeout(() => {
              var goButton = document.querySelector('button.LandAndTravel_buttonTeleport__Z6fS4');
              if (goButton) {
                  goButton.click();
                  setStatus('Clicking Go button for Speck...');
              } else {
                  setStatus('Go button for Speck not found or not clickable');
              }
          }, 1000); // Delay of 1 second before clicking the Go button
      } else {
          setStatus('First button for Speck not found or not clickable');
      }
  }



  //                add on end
  // Automation script
  function isCreateButtonClickable() {
    var createButton = document.querySelector('button.Crafting_craftingButton__Qd6Ke:not([disabled]) span');
    return createButton !== null && createButton.textContent === "Create";
  }

  function isCollectButtonClickable() {
    var collectButton = document.querySelector('button.Crafting_craftingButton__Qd6Ke:not([disabled]) span');
    return collectButton !== null && collectButton.textContent === "Collect";
  }

  function clickCreateButton() {
    var createButton = document.querySelector('button.Crafting_craftingButton__Qd6Ke span');
    if (createButton) {
      createButton.click();
      setStatus('Clicking Create Button...');
      setTimeout(checkEnergyPopup, 1000); // Wait for 1 second before checking for energy popup
    }
  }

  function checkEnergyPopup() {
    var energyPopup = document.querySelector('.Notifications_text__ak1FH');
    if (energyPopup && energyPopup.textContent === "Not enough energy") {
      var closeButton = document.querySelector('button.Crafting_craftingCloseButton__ZbHQF');
      if (closeButton) {
        closeButton.click();
        setStatus('Energy popup closed.');
      }
    }
  }

  function clickCollectButton() {
    var collectButton = document.querySelector('button.Crafting_craftingButton__Qd6Ke span');
    if (collectButton) {
      collectButton.click();
      setStatus('Clicking Collect Button...');
    }
  }

  function isStartGameButtonClickable() {
    var startGameButton = document.querySelector('button.commons_pushbutton__7Tpa3.commons_yellow__oPrrR.Intro_startbutton__QtxEz');
    return startGameButton !== null;
  }

  function clickStartGameButton() {
    var startGameButton = document.querySelector('button.commons_pushbutton__7Tpa3.commons_yellow__oPrrR.Intro_startbutton__QtxEz');
    if (startGameButton) {
      startGameButton.click();
      setStatus('Clicking Start Game Button...');
    }
  }

  function performActions() {
    setStatus('Checking for crafts...');
    
    if (selectedRecipe) {
      clickRecipeButton(selectedRecipe);
    }

    if (isCreateButtonClickable()) {
      clickCreateButton();
    } else if (isCollectButtonClickable()) {
      clickCollectButton();
    } else if (isStartGameButtonClickable()) {
      clickStartGameButton();
    }
  }

  function setStatus(message) {
    statusLine.innerText = message;
  }

  chrome.storage.local.get(['delay'], function(result) {
    let delay = result.delay || 200; // Default delay is 200ms if not set
    setInterval(() => {
      chrome.storage.local.get(['isScriptRunning'], function(result) {
        if (result.isScriptRunning) {
          performActions();
        }
      });
    }, delay);
  });

  function clickRecipeButton(recipe) {
    var recipeButton = Array.from(document.querySelectorAll('span.Crafting_craftingFontText__EeNSQ')).find(
      el => el.textContent.trim() === recipe
    );
    if (recipeButton) {
      recipeButton.click();
    }
  }

  function createDiscordPopup() {
    let popup = createPopupTemplate(
      'https://www.trojangains.xyz/images/assets/icon.png', // Replace with your logo URL
      'Join our official Discord!',
      'https://discord.gg/xkp7zgXZAw',
      'Click here to join'
    );
    document.body.appendChild(popup);
  }

  // Function to create the rate extension popup
  function createRatePopup() {
    let popup = createPopupTemplate(
      'https://www.trojangains.xyz/images/assets/icon.png', // Replace with your logo URL
      'Rate our extension!',
      'https://chromewebstore.google.com/detail/npkofkehllhmmfhkfkenmackpcefbmge/reviews?showReviewDialog=true', // Replace with your extension URL
      'Rate now'
    );
    document.body.appendChild(popup);
  }

  // Function to create the follow on X (Twitter) popup
  function createFollowPopup() {
    let popup = createPopupTemplate(
      'https://www.trojangains.xyz/images/assets/icon.png', // Replace with your logo URL
      'Follow us on X!',
      'https://twitter.com/intent/follow?screen_name=KExecute58474', // Replace with your X (Twitter) URL
      'Follow us'
    );
    document.body.appendChild(popup);
  }

  // Helper function to create a popup template
  function createPopupTemplate(logoUrl, message, linkUrl, linkText) {
    let popup = document.createElement('div');
    popup.className = 'custom-popup';
    popup.style.position = 'fixed';
    popup.style.top = '20px';
    popup.style.right = '20px';
    popup.style.width = '320px';
    popup.style.padding = '15px';
    popup.style.backgroundColor = '#7289da';
    popup.style.color = 'white';
    popup.style.borderRadius = '10px';
    popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    popup.style.zIndex = '1001';
    popup.style.textAlign = 'center';
    popup.style.fontFamily = 'Arial, sans-serif';
    popup.style.display = 'flex';
    popup.style.alignItems = 'center';

    // Logo
    let logo = document.createElement('img');
    logo.src = logoUrl;
    logo.alt = 'Logo';
    logo.style.width = '50px';
    logo.style.height = '50px';
    logo.style.marginRight = '10px';
    logo.style.borderRadius = '50%';

    // Content
    let content = document.createElement('div');
    content.style.flex = '1';
    content.innerHTML = `
      <p style="margin: 0; font-size: 16px;">${message}</p>
      <a href="${linkUrl}" target="_blank" style="color: white; font-size: 14px; text-decoration: underline;">${linkText}</a>
    `;

    // Close button
    let closeButton = document.createElement('button');
    closeButton.className = 'close-popup';
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontSize = '20px';
    closeButton.style.marginLeft = '10px';
    closeButton.innerHTML = '<i class="fas fa-times"></i>';

    closeButton.onclick = function() {
      popup.style.display = 'none';
    };

    popup.appendChild(logo);
    popup.appendChild(content);
    popup.appendChild(closeButton);

    return popup;
  }

  // Function to cycle through popups
  function cyclePopups() {
    const popups = [createDiscordPopup, createRatePopup, createFollowPopup];
    let currentIndex = 0;

    function showPopup() {
      // Remove any existing popup
      const existingPopup = document.querySelector('.custom-popup');
      if (existingPopup) {
        existingPopup.remove();
      }

      // Show the next popup
      popups[currentIndex]();
      currentIndex = (currentIndex + 1) % popups.length;
    }

    // Show the first popup immediately
    showPopup();

    // Set an interval to show a popup every hour (3600000 milliseconds)
    setInterval(showPopup, 3600000);
  }
  console.log("Script loaded! For support, join our Discord: https://discord.gg/KN4vv9RD5W");
  setTimeout(cyclePopups, 5000);
  addCustomButtons();
})();
