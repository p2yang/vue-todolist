<template>
  <div class="todolist">
    <h2>What do you want to do next ?</h2>
    <div class="buttons">
      <span class='new btn' @click='create'>New</span>
      <span class='done btn' @click='done'>Done</span>
      <span class='del btn' @click='del'>Del</span>
    </div>
    <div>Today is <small id='timer'>{{ '' + new Date() }}</small></div>
    <ul class="list">
      <li class='item' v-for='(item, index) in lists' @click='edit' v-bind:data-index='index'>
        <i class='icon'></i>
        <div class='item-input' v-bind:index='index' v-show="item.text">{{ item.text }}</div>
        <input type="text" placeholder='to do ...' v-bind:index='index' @blur='blur' v-on:keyup.enter='submit' v-show="!item.text">
        <time class='time'>{{ item.createAt }}</time>
      </li>
    </ul>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'todolist',
  data () {
    return {
      lists: JSON.parse(this.$get('todolists')),
      newIndex: -1
    }
  },
  methods: {
    create () {
      const now = new Date()
      this.lists.push({ text: '', createAt: this.formateDate(now) })
      this.newIndex = this.lists.length - 1
    },
    done () {
      $('.icon').eq(this.newIndex).removeClass('select').addClass('active')
    },
    del () {
      $('.item input').eq(this.newIndex).remove()
      this.lists.splice(this.newIndex, 1)
      this.$save('todolists', JSON.stringify(this.lists))
    },
    edit (e) {
      $('.icon').removeClass('select')
      this.newIndex = $(e.currentTarget).data().index
      const $itemInput = $(e.currentTarget).find('.item-input').hide()
      $(e.currentTarget).find('input').show().val($itemInput.html() || '').focus()
      $(e.currentTarget).find('.icon').addClass('select')
    },
    blur (e) {
      const input = e.currentTarget
      if (!input.value) return
      $(input).prev('.item-input').show().html(input.value)
      this.lists[ this.newIndex ][ 'text' ] = input.value
      // $(e.currentTarget).hide().val('')
      input.style.display = 'none'
      input.value = ''
      this.$save('todolists', JSON.stringify(this.lists))
    },
    submit (e) {
      $(e.currentTarget).blur()
    }
  },
  mounted () {
    const $timer = $('#timer')
    let now = new Date($timer.html()).getTime()
    setInterval(() => {
      now += 1000
      $timer.innerHTML = new Date(now)
    }, 1000)
    this.$save('todolists', JSON.stringify(this.lists))
  },
  updated () {
    const $itemInput = $('.item-input').eq(this.newIndex)
    if (!$itemInput.html() && this.newIndex < this.lists.length) {
      $('input').eq(this.newIndex).show()
    }
  }
}
</script>

<style lang='less' scoped>
  @import '../less/todolist.less';
</style>
