<template>
  <ion-item-sliding ref="item">
    <ion-item-options side="start" @ionSwipe="handleOption('start')">
      <ion-item-option
          v-if="startOption"
          @click="handleOption('start')"
          :color="startOption.color"
          expandable
      >
        <ion-icon :name="startOption.icon" size="large" slot="top"></ion-icon>
        <ion-label slot="bottom">{{startOption.text}}</ion-label>
      </ion-item-option>
    </ion-item-options>
    <ion-item class="ion-no-padding" :color="bookmark.read ? 'light' : undefined" :href="bookmark.url">
      <ion-card>
        <ion-card-header>
          <ion-card-title>
            {{bookmark.author}}
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          {{bookmark.content}}
        </ion-card-content>
      </ion-card>
    </ion-item>
    <ion-item-options side="end" @ionSwipe="handleOption('end')">
      <ion-item-option
          v-if="endOption"
          @click="handleOption('end')"
          :color="endOption.color"
          expandable
      >
        <ion-icon :name="endOption.icon" size="large" slot="top"></ion-icon>
        <ion-label slot="bottom">{{endOption.text}}</ion-label>
      </ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</template>

<script>
export default {
  props: [ 'bookmark', 'startOption', 'endOption' ],
  methods: {
    handleOption(side) {
      this.$refs.item.close()
      this.$emit(`click-${side}-option`)
    }
  }
}
</script>
