import PerfectScrollbar from 'perfect-scrollbar';
export default {
  directives: {
    perfectScroll: {
      inserted(el, binding, vnode) {
        if (binding.arg) {
          setTimeout(() => {
            vnode.context.perfectScroll(vnode.elm)
          }, parseInt(binding.arg))
        } else {
          vnode.context.perfectScroll(vnode.elm)
        }
      }
    }
  },
  methods: {
    perfectScroll(el) {
      let ps = new PerfectScrollbar(el)

      ps.update()
      ps = null
    }
  }
}
// node add .scrollbox(v-perfect-scroll:100)