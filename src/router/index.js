import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/static/index'
import ByTitle from '@/components/byTitle'
import ByAuthor from '@/components/byAuthor'
import Upload from '@/components/upload'
import NewAuthor from '@/components/newAuthor'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/byTitle',
      name: 'byTitle',
      component: ByTitle
    },
    {
      path: '/byAuthor',
      name: 'byAuthor',
      component: ByAuthor
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    {
      path: '/register-author',
      name: 'register-author',
      component: NewAuthor
    }
  ]
})
