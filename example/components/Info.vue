<template>
  <div class="info">
    <ul>
      <li v-for="field in displayKeys" :key="field">
        <label>{{ field.toUpperCase() }}</label>
        <div :class="field">
          <input
            type="number" 
            :value="betterDisplay(rect[field])" 
            @change="onValueChange(field, $event)"
            @input="onValueChange(field, $event)"
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    rect: Object
  },

  computed: {
    displayKeys() {
      return Object.keys(this.rect)
    }
  },

  methods: {
    betterDisplay(value) {
      const str = String(value)
      if (str.includes('.')) {
        return value.toFixed(2)
      } else {
        return Number.parseInt(value, 10)
      }
    },
    onValueChange(field, e) {
      let value = Number(e.target.value)
      if (field === 'r') {
        value = value > 180 ? 180 : (value < -180 ? -180 : value)
      } else {
        value = value < 0 ? 0 : value
      }
      this.$emit('transformed', {[field]: value})
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  position: absolute;
  right: 100px;
  top: 100px;
  user-select: none;
  ul {
    list-style: none;
    background: #efefef;
  }
  li {
    display: flex;
    flex-direction: row;
    border-top: 1px solid var(--info-bd-color);
    padding: 10px;
    &:last-child {
      border-bottom: 1px solid var(--info-bd-color);
    }
    label {
      width: 30px;
      text-align: center;
    }
    div {
      padding-left: 10px;
      position: relative;
      &::after {
        content: 'PX';
        display: block;
        position: absolute;
        right: 12px;
        top: 0;
        color: #bbb;
      }
      &.r::after {
        content: 'DEG'
      }
    }
    input {
      width: 80px;
      outline: none;
      border: 0;
      background: transparent;
      font-size: 14px;
    }
  }
}
</style>