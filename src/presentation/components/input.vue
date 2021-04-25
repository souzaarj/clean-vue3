<template>
  <div class="input-wrap">
    <input
      class="input-wrap__input"
      :name="name"
      :type="type"
      :placeholder="placeHolder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span
      :data-test="type + '-status'"
      :title="getTitle"
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
      name: {
        type: String,
        default: '',
        required: false,
      },
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
      msgError: {
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
    setup(props) {
      const stateLogin = inject('stateLogin')
      const error = stateLogin[`${props.name}Error`]
      const getStatus = computed(() => (error.value ? '🔴' : '🟢'))
      const getTitle = computed(() => error.value || 'Tudo certo!')

      return {
        getStatus,
        getTitle,
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
