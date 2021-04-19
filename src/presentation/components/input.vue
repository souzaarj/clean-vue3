<template>
  <div class="input-wrap">
    <input
      class="input-wrap__input"
      :type="type"
      :placeholder="placeHolder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span
      :data-testid="type + '-status'"
      :title="title"
      class="input-wrap__status"
      >{{ getStatus }}</span
    >
  </div>
</template>

<script>
  import { defineComponent, computed, inject } from 'vue'

  export default defineComponent({
    name: 'Input',
    props: {
      type: {
        type: String,
        default: '',
        required: true,
      },
      placeHolder: {
        type: String,
        default: '',
        required: false,
      },
      title: {
        type: String,
        default: '',
        required: false,
      },
      modelValue: {
        type: String,
        default: '',
        required: false,
      },
    },
    setup() {
      const getStatus = computed(() => '🔴')
      const stateLogin = inject('stateLogin')

      const handleChange = (event) => {
        console.log(event.target.value)
      }
      return {
        getStatus,
        handleChange,
      }
    },
  })
</script>

<style lang="scss">
  .input-wrap {
    display: flex;
    align-items: center;
    margin-top: 16px;
    position: relative;

    &__input {
      flex-grow: 1;
      border: 1px solid $primaryLight;
      line-height: 40px;
      border-radius: 4px;
      padding: 0 40px 0 8px;

      &:focus {
        outline-color: $primaryLight;
      }
    }

    &__status {
      position: absolute;
      right: 8px;
      font-size: 12px;
      cursor: help;
    }
  }
</style>

},
