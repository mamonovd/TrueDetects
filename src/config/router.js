import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Cabinet from '@/components/Cabinet'
import ExternalResource from '@/components/ExternalResource'
import Products from '@/components/Cabinet/Products'
import Billing from '@/components/Cabinet/Billing'
import Support from '@/components/Cabinet/Support'
import Affilate from '@/components/Cabinet/Affilate'
import Account from '@/components/Cabinet/Account'


Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/cabinet',
      name: 'Cabinet',
      component: Cabinet,
      meta: {
        title: 'Cabinet'
      },
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: {
            title: 'Products'
          }
        },
        {
          path: 'billing',
          name: 'Billing',
          component: Billing,
          meta: {
          name: 'Billing',
            title: 'Billing'
          }
        },
        {
          path: 'support',
          name: 'Support',
          component: Support,
          meta: {
            title: 'Support'
          }
        },
        {
          path: 'affilate',
          name: 'Affilate',
          component: Affilate,
          meta: {
            title: 'Affilate'
          }
        },
        {
          path: 'account',
          name: 'Account',
          component: Account,
          meta: {
            title: 'Account'
          }
        }
      ]
    // redirect: { name: 'Products' }
    },
    {
      path: '/blog',
      name: 'Blog',
      component: ExternalResource,
      meta: {
        title: 'Blog'
      },
      props: {
        href: 'http://horizont.spbu.ru/?page_id=8'
      }
     },
  ]
})

export default router;
