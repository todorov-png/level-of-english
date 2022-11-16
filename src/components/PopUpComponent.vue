<template>
    <div class="popup-wrap">
      <div class="popup-content" style="max-width: 320px">
        <div class="popup">
          <h3 class="popup__title">{{data.title}}</h3>
          <p class="popup__description">{{data.text}}</p>
          <button class="popup__close" @click="closePopUp">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>  
  export default {
    name: "PopUpComponent",
    emits: ["pop-up"],
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
    methods: {
      closePopUp() {
        document.body.classList.remove("no-scroll-ios");
        this.$emit("pop-up", {});
      },
    },
  };
  </script>
  
  <style scoped lang="scss">
  .popup {
    padding: 26px 14px;
    max-height: 90vh;
    max-height: calc(var(--vh, 1vh) * 90);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    &__title {
      font-weight: 600;
      font-size: 20px;
      line-height: 120%;
      text-align: center;
      margin-top: 0;
      margin-bottom: 16px;
    }
    &__close {
      margin: 0 auto;
      color: #16A4FF;
      background: none;
      border: none;
      cursor: pointer;
      font-weight: 500;
      font-size: 18px;
      line-height: 125%;
      &:hover {
        opacity: 0.8;
      }
    }
    &__description {
      color: #d1d1d6;
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
      text-align: center;
      margin-top: 0;
      margin-bottom: 20px;
    }
    &__pay {
      width: 100%;
      max-width: 100%;
      height: 56px;
    }
    &-wrap {
    position: fixed;
    overflow: hidden;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    inset: 0px;
    width: 100vw;
    min-height: 150vh;
    min-height: calc(var(--vh, 1vh) * 150);
    padding-bottom: 50vh;
    padding-bottom: calc(var(--vh, 1vh) * 50);
    background: rgba(#171717, 0.7);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-content {
    background: #252525;
    box-shadow: 0px 24px 35px rgba(#171717, 0.4);
    border-radius: 12px;
    padding: 6px;
    width: calc(100vw - 40px);
  }
  }
  </style>
  