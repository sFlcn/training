'use strict'

const menu = document.querySelector('.menu');
const menuBurgerButton = menu.querySelector('.burger');
const sliderElement = document.querySelector('.slider');
const slides = sliderElement.querySelectorAll('.slider__item');
const sliderBtnNext = sliderElement.querySelector('.slider__btn--next');
const sliderBtnPrev = sliderElement.querySelector('.slider__btn--prev');
const modal = document.querySelector('.modal');
const modalWrapper = modal.querySelector('.modal__wrap');
const modalButton = document.querySelector('.slider__modal-btn');
const modalButtonClose = modal.querySelector('.modal__close-btn');
const tabLinks = document.querySelectorAll('.tabs__link');
const tabs = document.querySelectorAll('.tab-content__item');
const accordion = document.querySelector('.faq__list');
const accordionButtons = accordion.querySelectorAll('.faq__question');

function burgerClickHandler() {
  menu.classList.toggle('menu--open');
  if (menu.classList.contains('menu--open')) {
    document.body.setAttribute('style', 'overflow: hidden');
  } else {
    document.body.style.overflow = null;
  }
}

const maxSlideN = slides.length - 1;
let currentSlideN = 0;
slides[currentSlideN].classList.add('slider__item--current');

function sliderBtnNextClickHandler() {
  slides[currentSlideN].classList.remove('slider__item--current');
  slides[currentSlideN].classList.add('slider__item--noTranslate');
  currentSlideN += 1;
  checkSliderBoundary();
  slides[currentSlideN].classList.add('slider__item--current');
}

function sliderBtnPrevClickHandler() {
  slides[currentSlideN].classList.remove('slider__item--current');
  currentSlideN -= 1;
  checkSliderBoundary();
  slides[currentSlideN].classList.remove('slider__item--noTranslate');
  slides[currentSlideN].classList.add('slider__item--current');
}

function checkSliderBoundary() {
  if (currentSlideN <= 0) {
    sliderBtnPrev.setAttribute('disabled', 'disabled');
  } else {
    sliderBtnPrev.removeAttribute('disabled', 'disabled');
  }
  if (currentSlideN >= maxSlideN) {
    sliderBtnNext.setAttribute('disabled', 'disabled');
  } else {
    sliderBtnNext.removeAttribute('disabled', 'disabled');
  }
}

function animateIn() {
  modalWrapper.removeEventListener('animationend', animateIn);
  modalWrapper.classList.remove('modal-in');
}

function modalOpenHandler() {
  modalWrapper.addEventListener('animationend', animateIn);
  modal.classList.add('modal--open');
  modalWrapper.classList.add('modal-in');
}

function animateOut() {
  modalWrapper.removeEventListener('animationend', animateOut);
  modal.classList.remove('modal--open');
  modalWrapper.classList.remove('modal-out');
}

function modalCloseHandler() {
  modalWrapper.addEventListener('animationend', animateOut);
  modalWrapper.classList.add('modal-out');
}

function openTab(evt) {
  const btnTarget = evt.currentTarget;
  const tabWork = btnTarget.dataset.work;

  tabLinks.forEach((element) => element.classList.remove('tabs__link--active'));
  tabs.forEach((element) => element.classList.remove('tab-content__item--active'));

  btnTarget.classList.add('tabs__link--active');
  document.querySelector(`#${tabWork}`).classList.add('tab-content__item--active');
}

function accordionClickHandler(evt) {
    const clickedItem = evt.currentTarget;
    const clickedItemParent = clickedItem.parentElement;
    const clickedItemDescr = clickedItemParent.querySelector('.faq__answer');
    clickedItemParent.classList.toggle('faq__item--open');

    if (clickedItemParent.classList.contains('faq__item--open')) {
      clickedItemDescr.style.maxHeight = `${clickedItemDescr.scrollHeight}px`;
    } else {
      clickedItemDescr.style.maxHeight = null;
    }
}

menuBurgerButton.addEventListener('click', burgerClickHandler);
sliderBtnNext.addEventListener('click', sliderBtnNextClickHandler);
sliderBtnPrev.addEventListener('click', sliderBtnPrevClickHandler);
modalButton.addEventListener('click', modalOpenHandler);
modalButtonClose.addEventListener('click', modalCloseHandler);
tabLinks.forEach((element) => element.addEventListener('click', openTab));

accordionButtons.forEach(function(button) {
  button.addEventListener('click', accordionClickHandler);
});
