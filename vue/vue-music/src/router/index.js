import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import SingerDetail from 'components/singer-detail/singer-detail'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: Recommend
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/Singer',
      component: Singer,
      children:[
        {
          path: ":id",
          component: SingerDetail
        }
      ]
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
