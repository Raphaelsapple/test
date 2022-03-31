<template>
  <div class="recommend">
    <div class="scroll-list-wrap">
      <cube-scroll ref="scroll" :data="songList" :options="options">
        <div class="recommend-content">
          <div v-if="recomList.length"  class="slider-wrapper">
            <cube-slide :data="recomList"/>
          </div>
          <div class="recommend-list">
            <h1 class="list-title">热门歌单推荐</h1>

            <ul>
              <li class="item" v-for="item in songList" :key="item.id">
                <div class="icon">
                  <img width="80" height="80" v-lazy="item.pic">
                  <div class="play">
                    <div class="iconplay"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAB+ElEQVRYR82ZsWoUURSGvz/RlHmCoKAIAdPaWFhqr4WFGEkKEUmRwm7zCGKvhdqoIPoMFuITWBhLCaRKkTYmeuVfdsK6u8zcnZmdOaeZYu4599uz9/yce0YEM43zpJQuALeA68AJ8AP4JulvV9znQCmlm8Bb4NrE5j+BPUmfuoAaAqWUNoE3wFLJph+Ap5KOFwmmlNIl4DuwmrHRAfBI0peMtbWWGOg1sDWHdwJeAANJPmetmoH8q9dqRHVWH0jyszUz0BmwXDOiMzRwxiQ5c43NQG0E8pny2XK2G1lbQIZw9bkKXY21rU2gAqKRPCwCyGC15WFRQEO9rSMPiwQq/sK55KELIINly0NXQEW2KuWha6BKeegDqFQe+gSaKQ99AxXysC3JzSERgMzxB7gv6XMUIEP9Aq5EAjLU7WhAu9GAdqIB3Y0EdARcjgLkVuWhpHcRgAzzRNKrCMI41Vn2maGZvXcfQKW3k66BwjRooVrYME1+qGtQqItimKt0qGFDZTnnjkOsQ7+Bi7kOE+uyyzk3voE8i17PdRhbN1c558Y30Evgca5D3alGbnwDXQX2AU/xq6x2OVcFLt4Xg/N7wHtgpcSxUTnPBTS8PqZ0B3gObEw4OyvPJH3MDdpk3X8fX0ZgN0YfX06BQ+CrJI+OO7EpoE52LdnkH3IcFaoLeluWAAAAAElFTkSuQmCC" alt=""></div>
                    <span class="countplay" v-html="formatNum(item.count_play)"></span>
                  </div>
                </div>
                <div class="text">
                  <span class="name">{{item.artist_name}}</span>
                  <span class="desc" >{{item.name}}</span>
                </div>
              </li>
            </ul>

          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getRecommend} from 'api/recommend'
// mport {ERR_OK} from 'api/config'
export default {
  data(){
    return  {
      recomList:[],
      songList:[],

    }
  },
  created () {
  },
  computed: {
    options() {
      return {
        scrollbar: false
      }
    }
  },
  watch :{

    recomList (val) {
      if (val.length) {
        this.$refs.scroll.refresh()
      }
    }
  },
  mounted() {
    getRecommend().then((res)=>{
      if ( res.data.code ==200 ) {
        for ( var i in res.data.data.banner_list ) {
          var tmp = res.data.data.banner_list[i]
          var arr_tmp = {url:"#"+tmp.id,image:tmp.pic }
          this.recomList.push(arr_tmp)
        }
        this.songList = res.data.data.playlist_list
      }
    })
  },
  methods: {
    formatNum(num){
      var num = num / 10000
      num = Math.floor(num * 10) /10
      num = num +"W"
      return num;
    }
  }
}
</script>

<style scode lang="stylus" rel='stylesheet/stylus'>
@import "~common/stylus/variable"
.recommend
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  .recommend-content
    height: 100%
    overflow: hidden
  .scroll-list-wrap
    height: 100%
.slider-wrapper

  position: relative
  width: 100%
  overflow: hidden
  // a
  //   display: block
  //   width: 100%
  //   overflow: hidden
  //   text-decoration: none
  img
    width: 100%
.recommend-list
  .list-title
    height: 65px
    line-height: 65px
    text-align: center
    font-size: $font-size-medium
    color: $color-theme

  .item
    display: flex
    box-sizing: border-box
    padding: 0 20px 20px 20px
    .icon
      position: relative
      padding-right: 20px
      width: 80px
      flex: 0 0 60px
      border-radius: 20px
      .play
        padding: 4px
        border-radius: 0 10px 0 0
        background-color: rgba(0, 0, 0, 0.5)
        position: absolute
        left: 0px
        bottom : 0px
        font-size: 12px
        display: flex
        align-items: center
        .iconplay
          margin-right: 2px
          width: 8px
          height: 10px
          img
            width: 100%
            height: 100%

    .text
      display: flex
      flex-direction: column
      flex: 1
      font-size: 14px
      overflow: hidden
      .name
        margin-bottom: 15px
        color: $color-text
      .desc
        color: $color-text-d


// .item
//     display: flex
//     box-sizing: border-box
//     align-items: center
//     padding: 0 20px 20px 20px
//     .icon
//         flex: 0 0 60px
//         width: 60px
//         padding-right: 20px
//     .text
//         display: flex
//         flex-direction: column
//         justify-content: center
//         flex: 1
//         line-height: 20px
//         overflow: hidden
//         font-size: $font-size-medium
//         .name
//             margin-bottom: 10px
//             color: $color-text
//         .desc
//             color: $color-text-d
.loading-container
  position: absolute
  width: 100%
  top: 50%
  transform: translateY(-50%)
</style>
