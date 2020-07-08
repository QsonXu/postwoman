import Vue from 'vue';

export default Vue.directive("textareaAutoHeight", {
  update({ scrollHeight, clientHeight, style }) {
    if (scrollHeight !== clientHeight) {
      style.minHeight = `${scrollHeight}px`
    }
<<<<<<< HEAD:directives/textareaAutoHeight.js
  },
}
=======
  }
});
>>>>>>> 4a7f7851c98d310eebb95cbad4e9d1a4ab31a86e:directives/textareaAutoHeight.ts
