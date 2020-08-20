<template>
  <div class="device-wrapper">
    <slot />
  </div>
</template>

<style>
  .device-wrapper {
    display: contents;
  }

  @media only screen and (min-width: 1200px) {
    body {
      background: linear-gradient(#9dcbe8, #1fa0f2) !important;
    }

    .device-wrapper {
      display: block;
      place-self: center;
      position: relative;
      height: calc(100% - 100px);
      width: 500px;
      margin: 50px auto;
      border: 5px solid #000000;
      border-radius: 5px;
      box-shadow: 2px 2px 10px 2px #000000;
    }
  }
</style>
