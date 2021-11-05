'use strict';

const SettingType = {
  ATTRIBUTE: 'attribute',
};

const jsSettingsButtons = document.querySelectorAll('[data-setting-name]');
const jsSettingsButtonsContainers = document.querySelectorAll('.js-buttons-container');

const setDataAttribute = (target, buttonParameters) => {
  const targetElement = document.querySelector(target);

  for (const [key, value] of Object.entries(buttonParameters)) {
    targetElement.dataset[key] = value;
  }
};

const applySettings = (targetDescription, buttonParameters) => {
  if (targetDescription.settingType === SettingType.ATTRIBUTE) {
    setDataAttribute(targetDescription.settingTarget, buttonParameters);
  }
  setButtonActive(buttonParameters);
};

const processClickOnSettingButton = (evt, targetDescription) => {
  const button = evt.target.closest('button');
  if (!button) {
    return;
  }

  const buttonParameters = {[button.dataset.settingName]: button.dataset.settingValue};
  applySettings(targetDescription, buttonParameters);
};

const setButtonActive = (buttonParameters) => {
  for (const [key, value] of Object.entries(buttonParameters)) {
    const buttons = Array.from(jsSettingsButtons);

    buttons.find((element) =>
      element.dataset['settingName'] === key && element.classList.contains('active')).
    classList.remove('active');

    buttons.find((element) =>
      element.dataset['settingName'] === key && element.dataset['settingValue'] === value).
    classList.add('active');
  }
};

const startPage = () => {
  jsSettingsButtonsContainers.forEach((container) => {
    const targetDescription = container.dataset;

    container.addEventListener('click', (evt) => {
      processClickOnSettingButton(evt, targetDescription);
    });
  });
};

startPage();
