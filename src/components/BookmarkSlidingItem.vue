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
        <ion-label slot="bottom" style="padding: 0 1rem">{{startOption.text}}</ion-label>
      </ion-item-option>
    </ion-item-options>
    <ion-item
        class="ion-no-padding tweet"
        :color="bookmark.read ? 'light' : undefined"
        :href="bookmark.url"
        target="_blank"
    >
      <div class="tweet-like">
        <ion-icon name="like" :style="{ opacity: bookmark.like ? 1 : 0 }"></ion-icon>
      </div>
      <ion-card class="tweet-main">
        <ion-card-content class="tweet-content">
          <p class="tweet-meta">
            <strong>
              @{{bookmark.author}}
            </strong>
            <span>
              {{bookmark.date}}
            </span>
          </p>
          <p class="ion-padding-top">
            {{bookmark.content}}
          </p>
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
        <ion-label slot="bottom" style="padding: 0 1rem">{{endOption.text}}</ion-label>
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

<style>
.tweet {
}

.tweet .tweet-main {
  box-shadow: none;
  width: 100%;
}

.tweet .tweet-content {
  padding-top: 0;
  padding-right: 0;
}

.tweet .tweet-meta {
  display: flex;
  justify-content: space-between;
}

.tweet .tweet-like {
  position: absolute;
  top: auto;
  bottom: 0;
  right: 0;
  padding: 0 26px .5rem;
  color: #eb445a;
  display: flex;
  align-items: center;
}

.tweet .tweet-like * {
  transition: opacity .75s ease;
}
</style>
