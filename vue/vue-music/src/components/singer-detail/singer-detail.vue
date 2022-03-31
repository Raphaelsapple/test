<template>
    <div class="singer-detail"></div>
</template>
<script type="text/ecmascript-6">
import {mapGetters} from "vuex"
import {getSingerDetail,getSingerMusicList} from "api/singer"

export default {
  data () {
    return {
      singerInfo:{},
      singerMusicList: [],
    }
  },
  computed:{
    ...mapGetters([
        'singer'
    ]),

  },
  created(){
    console.log(this.singer)
  },
  mounted () {
    // getSingerDetail(this.singer.id).then((res)=>{
    //   console.log(res);
    // })
    getSingerMusicList(this.singer.id).then((res)=>{
      console.log(res);
    })
  }
}

</script>
<style scoped lang="stylus" rel='stylesheet/stylus'>
@import "~common/stylus/variable"
.singer-detail
  height :100%
  width : 100%
  position:fixed
  top :0
  left :0
  background-color :$color-background

</style>
