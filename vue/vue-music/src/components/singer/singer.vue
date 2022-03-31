<template>
  <div class="sgl">
    <div class="singerlist">
      <div class="index-list-wrapper custom">
        <cube-index-list
            ref="indexList"
            :data="singerData"
            :title="title"
            :options="options"

            @pulling-down="onPullingDown">
          <cube-index-list-group v-for="(group, index) in singerData" :key="index" :group="group">
            <cube-index-list-item v-for="(item, index) in group.items"
                                  :key="index"
                                  :item="item"
                                  @title-click="clickTitle"
                                  @select="selectItem(item)">
              <div class="custom-item">
                <img class="avatar" v-lazy="item.pic70" >
                <span class="name">{{item.name}}</span>
              </div>
            </cube-index-list-item>
          </cube-index-list-group>
          <span class="custom-nav-item" @click="checkNav(props)" slot="nav-item"  slot-scope="props">{{props.item}}</span>
        </cube-index-list>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
import {getSingerList} from "api/singer"
import pinyin from "js-pinyin"
import {mapMutations} from "vuex"

export default {

  data (){
    return {
      singerData:[],
      title: '',
      options: {
        pullDownRefresh: {
          stop: 55
        }
      }
    }
  },
  computed :{

  },
  watch :{

  },
  mounted () {
    var fieldIndex = {};
    this.singerData.push({name:"热门",items:[]});
    for ( let i = 0;i <= 25; i++ ) {
      let sfcc = String.fromCharCode(65+i);
      this.singerData.push({name:sfcc,items:[]});
      fieldIndex[sfcc] = i + 1;
    }
    var res = getSingerList()
    if (this._utils.isObject(res)){
      if ( res.code == 200 && Array.isArray(res.data.artistList) ) {
        this.singerData[0].items =  res.data.artistList ;
        for ( let i in res.data.artistList ) {
          let tmp = res.data.artistList[i]
          let pychars = pinyin.getFullChars(tmp.name);
          let firstC = pychars[0].toUpperCase()
          let curIndex = fieldIndex[firstC];
          this.singerData[curIndex].items.push(tmp) ;
        }
      }
    }
  },
  methods : {
    selectItem(item) {
      this.$router.push({
        path : `/singer/${item.id}`
      })
      this.setSinger(item)
    },
    clickTitle() {
      console.log(2222)
    },
    checkNav(item) {
      // console.log(3333)
      this.$Lazyload.lazyLoadHandler()
    },
    onPullingDown() {
      // Mock async load.
      setTimeout(() => {
        // Update data.
        this.singerData[1].items.push(...this.singerData[1].items)
        // Call forceUpdate after finishing data load.
        this.$refs.indexList.forceUpdate(true)
      }, 1000)
    },
    ...mapMutations({
      setSinger:"SET_SINGER"
    })
  }
}


</script>

<style scoped lang="stylus" rel='stylesheet/stylus'>
@import "~common/stylus/variable"
.sgl
  height :100%
  .singerlist
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    left: 0
  /deep/ .index-list-wrapper
      height: 100%
      margin: 0 auto
      overflow: hidden
      &.custom
        .cube-index-list-content
          background-color: #222
          color: #909090
        .cube-index-list-group
          padding-bottom: 30px
        .cube-index-list-anchor
          background-color: #333
          height: 30px
          line-height: 30px
          padding: 0 0 0 20px
        .custom-item
          display: flex
          align-items: center
          padding: 20px 0 0 30px
          .avatar
            width: 50px
            height: 50px
            border-radius: 50%
          .name
            margin-left: 20px
            color: $color-text-l
            font-size: $font-size-medium
        .cube-index-list-nav
          padding: 20px 0
          border-radius: 10px
          background: rgba(0,0,0,.3)
          >ul
            >li
              padding: 3px
              &.active
                .custom-nav-item
                  color: #ffcd32
        .custom-nav-item
          font-size: 12px
          color: #909090
</style>
