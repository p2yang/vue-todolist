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
        <div class='item-input' v-bind:index='index'>{{ item.text }}</div>
        <input type="text" placeholder='to do ...' v-bind:index='index' @blur='blur' v-on:keyup.enter='submit'>
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

<style lang='less'>
  * {
    border: 0;
    padding: 0;
  }
  li {
    list-style: none;
    text-align: left;
  }
  input {
    outline: none;
  }
  .centerY() {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .item {
    width: 80%;
    max-width: 600px;
    border-bottom: 1px solid #efefef;
    margin: 0 auto;
    transition: color 0.3s;
    padding: 10px 80px 10px 40px;
    position: relative;

    &:hover {
      color: #41b883;
    }
    input {
      display: none;
      width: 100%;
      border: 0;
      height: 23px;
      line-height: 22px;
      font-size: 16px;
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      color: #2c3e50;

      &.active {
        display: block;
      }
    }
  }
  .buttons {
    margin: 10px 0;
    .btn {
      display: inline-block;
      padding: 6px 22px;
      border: 1px solid #efefef;
      border-radius: 6px;
      margin: 0 6px;
      transition: all 0.3s;
    }
    .btn:hover {
      color: #41b883;
      border-color: #41b883;
      cursor: pointer;
    }
  }
  .icon {
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #efefef;
    .centerY();
    left: 10px;


    &:before {
      content: '';
      display: block;
      box-sizing: border-box;
      background: transparent;
      width: 70%;
      height: 70%;
      margin: 15% auto;
      border-radius: 50%;
      border: 2px solid #fff;
    }
    &.select {
      background: #35495e;
    }
    &.active {
      background: #41b883;
      opacity: 0.7;
    }
  }
  .time {
    .centerY();
    right: 10px;
    font-size: 12px;
    color: #ccc;
    font-style: italic;
  }
</style>
