import Vue from 'vue'
import Router from 'vue-router'
import beforeEach from './beforeEach'
// import afterEach from './afterEach'
Vue.use(Router)

const router = new Router({
    // mode: 'history',
  saveScrollPosition:true,
    routes: [
      {
        path: '/home',
        name: 'Home',
        component: (resolve)=>require(['../pages/home'],resolve),
        meta: {
          title: '财合税',
          keepAlive: true
        }
      },
      {
        path: '/news',
        name: 'news',
        component: (resolve)=>require(['../pages/home/news'],resolve),
        meta: {
          title: '财合税',
          keepAlive: true
        }
      },
      {
        path: '/cwrjhome',
        name: 'cwrjhome',
        component: (resolve)=>require(['../pages/home/cwrjIndex'],resolve),
        meta: {
          title: '财务管家专区'
        }
      },
      {
        path: '/cwrjpro',
        name: 'cwrjpro',
        component: (resolve)=>require(['../pages/home/cwrjPro'],resolve),
        meta: {
          title: '财务管家介绍'
        }
      },
      {
        path: '/znl',
        name: 'znl',
        component: (resolve)=>require(['../pages/home/shareZnl'],resolve),
        meta: {
          title: '财合税'
        }
      },
      {
        path: '/shai',
        name: 'shai',
        component: (resolve)=>require(['../pages/home/shai'],resolve),
        meta: {
          title: '财合税'
        }
      },
        {
            path: '/',
            name: 'Home',
            component: (resolve)=>require(['../pages/home'],resolve),
            meta: {
                title: '财合税'
            }
        },
        {
            path: '/school',
            name: 'School',
            component: (resolve)=>require(['../pages/course'],resolve),
            meta: {
                title: '学院',
              keepAlive: true
            }
        },
        {
            path: '/service',
            name: 'Service',
            component: (resolve)=>require(['../pages/service'],resolve),
            meta: {
                title: '服务',
              keepAlive: true
            }
        },
        {
            path: '/mine',
            name: 'Mine',
            component: (resolve)=>require(['../pages/mine/mine'],resolve),
            meta: {
                title: '我的'
            }
        },
      {
        path: '/moneyPic',
        name: 'moneyPic',
        component: (resolve)=>require(['../pages/mine/moneyPic'],resolve),
        meta: {
          title: '收钱码'
        }
      },
        {
            path: '/search',
            name: 'Search',
            component: (resolve)=>require(['../pages/search'],resolve),
            meta: {
                title: '搜索'
            }
        },
        {
            path: '/coupon',
            name: 'Coupon',
            component: (resolve)=>require(['../pages/mine/coupon'],resolve),
            meta: {
                title: '优惠券'
            }
        },
        {
            path: '/score',
            name: 'Score',
            component: (resolve)=>require(['../pages/mine/score'],resolve),
            meta: {
                title: '我的积分'
            }
        },
        {
            path: '/wallet',
            name: 'Wallet',
            component: (resolve)=>require(['../pages/mine/wallet'],resolve),
            meta: {
                title: '我的钱包'
            }
        },
      {
        path: '/newcard',
        name: 'newcard',
        component: (resolve)=>require(['../pages/mine/newcard'],resolve),
        meta: {
          title: '会员权益'
        }
      },
        {
            path: '/cash',
            name: 'Cash',
            component: (resolve)=>require(['../pages/mine/cash'],resolve),
            meta: {
                title: '提现'
            }
        },
        {
            path: '/vip',
            name: 'Vip',
            component: (resolve)=>require(['../pages/mine/vip'],resolve),
            meta: {
                title: '会员卡'
            }
        },
        {
            path: '/my-question',
            name: 'MyQuestion',
          component: (resolve)=>require(['../pages/mine/myquestion'],resolve),
            meta: {
                title: '我的问答'
            }
        },
        {
            path: '/my-consulation',
            name: 'MyConsulation',
            component: (resolve)=>require(['../pages/mine/myConsulation'],resolve),
            meta: {
                title: '我的咨询'
            }
        },
        {
            path: '/my-course',
            name: 'MyCourse',
            component: (resolve)=>require(['../pages/mine/myCourse'],resolve),
            meta: {
                title: '我的课程'
            }
        },
      {
        path: '/my-guanzhu',
        name: 'guanzhu',
        component: (resolve)=>require(['../pages/mine/guanzhu'],resolve),
        meta: {
          title: '我的关注'
        }
      },

        {
            path: '/my-knowledge',
            name: 'MyKnowledge',
          component: (resolve)=>require(['../pages/mine/MyKnowledge'],resolve),
            meta: {
                title: '我的知识'
            }
        },
      {
        path: '/my-service',
        name: 'Myservice',
        component: (resolve)=>require(['../pages/mine/Myservice'],resolve),
        meta: {
          title: '我的订单'
        }
      },

        {
            path: '/my-focus',
            name: 'MyFocus',
          component: (resolve)=>require(['../pages/mine/MyFocus'],resolve),
            meta: {
                title: '我的关注'
            }
        },
        {
            path: '/message',
            name: 'Message',
          component: (resolve)=>require(['../pages/mine/message'],resolve),
            meta: {
                title: '我的消息'
            }
        },
        {
            path: '/order',
            name: 'Order',
          component: (resolve)=>require(['../pages/mine/order'],resolve),
            meta: {
                title: '我的订单'
            }
        },
        {
            path: '/member',
            name: 'Member',
          component: (resolve)=>require(['../pages/agent/cards'],resolve),
            meta: {
                title: '我的会员卡'
            }
        },
        {
            path: '/settings',
            name: 'Settings',
          component: (resolve)=>require(['../pages/mine/settings'],resolve),
            meta: {
                title: '设置'
            }
        },
        {
            path: '/advice',
            name: 'Advice',
          component: (resolve)=>require(['../pages/mine/advice'],resolve),
            meta: {
                title: '建议'
            }
        },
        {
            path: '/user-info',
            name: 'UserInfo',
          component: (resolve)=>require(['../pages/mine/userInfo'],resolve),
            meta: {
                title: '个人信息'
            }
        },
        {
            path: '/expert-info',
            name: 'ExpertInfo',
          component: (resolve)=>require(['../pages/mine/expertInfo'],resolve),
            meta: {
                title: '专家个人信息'
            }
        },
      {
        path: '/expert-wd',
        name: 'Wenda',
        component: (resolve)=>require(['../pages/mine/wenda'],resolve),
        meta: {
          title: '问答审核'
        }
      },

        {
            path: '/team',
            name: 'Team',
          component: (resolve)=>require(['../pages/experts/teammanage'],resolve),
            meta: {
                title: '佣金收益'
            }
        },
        {
            path: '/consult',
            name: 'Consult',
          component: (resolve)=>require(['../pages/experts/consultmanage'],resolve),
            meta: {
                title: '咨询管理'
            }
        },
        {
            path: '/agent-info',
            name: 'Agentinfo',
          component: (resolve)=>require(['../pages/agent'],resolve),
            meta: {
                title: '经纪个人信息'
            }
        },
        {
            path: '/broker',
            name: 'Broker',
          component: (resolve)=>require(['../pages/agent/firstbroker'],resolve),
            meta: {
                title: '经纪人团队管理'
            }
        },
        {
            path: '/second-broker',
            name: 'SecondBroker',
          component: (resolve)=>require(['../pages/agent/secondbroker'],resolve),
            meta: {
                title: '二级经纪人团队管理'
            }
        },
        {
            path: '/sales',
            name: 'Sales',
          component: (resolve)=>require(['../pages/agent/salesperson'],resolve),
            meta: {
                title: '销售员审核'
            }
        },
        {
            path: '/invition',
            name: 'Invitationrecord',
          component: (resolve)=>require(['../pages/agent/invitationrecord'],resolve),
            meta: {
                title: '经纪人邀请记录'
            }
        },

        {
            path: '/service-detail',
            name: 'ServiceDetail',
          component: (resolve)=>require(['../pages/service/detail'],resolve),
            meta: {
                title: '服务详情'
            }
        },
        {
            path: '/service-list',
            name: 'ServiceList',
          component: (resolve)=>require(['../pages/service/list'],resolve),
            meta: {
                title: '服务分类'
            }
        },
        {
            path: '/login',
            name: 'Login',
          component: (resolve)=>require(['../pages/login'],resolve),
            meta: {
                title: '完善信息'
            }
        },
        {
            path: '/compelete',
            name: 'Compelete',
          component: (resolve)=>require(['../pages/login/compelete'],resolve),
            meta: {
                title: '完善信息'
            }
        },
        {
            path: '/question',
            name: 'Question',
          component: (resolve)=>require(['../pages/question'],resolve),
            meta: {
                title: '问答',
              keepAlive: true
            }
        },
      {
        path: '/ptax',
        name: 'ptax',
        component: (resolve)=>require(['../pages/question/ptax'],resolve),
        meta: {
          title: '问答',
          keepAlive: true
        }
      },
      {
        path: '/noanswer',
        name: 'noanswer',
        component: (resolve)=>require(['../pages/question/noanswer'],resolve),
        meta: {
          title: '问答',
          keepAlive: true
        }
      },
        {
            path: '/question-list',
            name: 'questionList',
          component: (resolve)=>require(['../pages/question/list'],resolve),
          meta: {
                title: '问答列表'
            }
        },
        {
            path: '/question-detail',
            name: 'questionDetail',
          component: (resolve)=>require(['../pages/question/detail'],resolve),
            prop:true,
            meta: {
                title: '问答详情'
            }
        },
        {
            path: '/my-question-detail',
            name: 'MyQuestionDetail',
          component: (resolve)=>require(['../pages/question/myDetail'],resolve),
            meta: {
                title: '问答详情'
            }
        },
        {
            path: '/ask-question',
            name: 'AskQuestion',
          component: (resolve)=>require(['../pages/question/ask'],resolve),
            meta: {
                title: '我要提问'
            }
        },
        {
            path: '/ask-more',
            name: 'AskMore',
          component: (resolve)=>require(['../pages/question/askMore'],resolve),
            meta: {
                title: '追问'
            }
        },
        {
            path: '/answer-question',
            name: 'AnswerQuestion',
          component: (resolve)=>require(['../pages/question/answer'],resolve),
          meta: {
                title: '我要回答'
            }
        },
        {
            path: '/experts',
            name: 'Experts',
          component: (resolve)=>require(['../pages/experts'],resolve),
            meta: {
                title: '分类专家',
              keepAlive: true
            }
        },
      {
        path: '/areaExperts',
        name: 'areaExperts',
        component: (resolve)=>require(['../pages/experts/areaIndex'],resolve),
        meta: {
          title: '区域专家'

        }
      },
      {
        path: '/areaIndexList',
        name: 'areaIndexList',
        component: (resolve)=>require(['../pages/experts/areaIndexList'],resolve),
        meta: {
          title: '区域专家'

        }
      },
        {
            path: '/expert-detail',
            name: 'ExpertsDetail',
          component: (resolve)=>require(['../pages/experts/detail'],resolve),
            meta: {
                title: '专家详情'
            }
        },
        {
            path: '/chat',
            name: 'chat',
          component: (resolve)=>require(['../pages/chat/chat'],resolve),
            meta: {
                title: '聊天'
            }
        },

        {
            path: '/knowledge',
            name: 'Knowledge',
          component: (resolve)=>require(['../pages/knowledge'],resolve),
            meta: {
                title: '知识',
                keepAlive: true
            }
        },
      {
        path: '/knowledge-list',
        name: 'KnowledgeList',
        component: (resolve)=>require(['../pages/knowledge/list'],resolve),
        meta: {
          title: '知识列表'
        }
      },
      {
        path: '/knowledgeCard',
        name: 'knowledgeCard',
        component: (resolve)=>require(['../pages/knowledge/knowledgeCard'],resolve),
        meta: {
          title: '卡'
        }
      },
      {
        path: '/cardpro',
        name: 'cardpro',
        component: (resolve)=>require(['../pages/knowledge/cardPro'],resolve),
        meta: {
          title: ''
        }
      },
      {
        path: '/law-list',
        name: 'LawList',
        component: (resolve)=>require(['../pages/knowledge/lawlist'],resolve),
        meta: {
          title: ''
        }
      },
        {
            path: '/knowledge-detail',
            name: 'KnowledgeDetail',
          component: (resolve)=>require(['../pages/knowledge/detail'],resolve),
            meta: {
                title: '知识详情'
            }
        },

      // coursepic.vue
        {
            path: '/course-list',
            name: 'CourseList',
          component: (resolve)=>require(['../pages/course/list'],resolve),
            prop:true,
            meta: {
                title: '课程列表'
            }
        },
      {
        path: '/courseActive',
        name: 'courseActive',
        component: (resolve)=>require(['../pages/course/courseActive'],resolve),
        prop:true,
        meta: {
          title: '激活'
        }
      },

        {
            path: '/course-detail',
            name: 'CourseDetail',
          component: (resolve)=>require(['../pages/course/detail'],resolve),
            prop:true,
            meta: {
                title: '课程详情'


            }
        },
      {
        path: '/coursepic',
        name: 'coursepic',
        component: (resolve)=>require(['../pages/course/coursepic'],resolve),
        meta: {
          title: '海报'
        }
      },
      {
        path: '/commcoursepic',
        name: 'commcoursepic',
        component: (resolve)=>require(['../pages/course/commcoursepic'],resolve),
        meta: {
          title: '海报'
        }
      },
      {
        path: '/scourse-list',
        name: 'sCourseList',
        component: (resolve)=>require(['../pages/course/slist'],resolve),
        prop:true,
        meta: {
          title: '财税私塾'
        }
      },
      {
        path: '/scourse-detail',
        name: 'sCourseDetail',
        component: (resolve)=>require(['../pages/course/sishudetail'],resolve),
        prop:true,
        meta: {
          title: '课程详情'


        }
      },

        {
          path: '/tcourse-detail',
          name: 'TestCourseDetail',
          component: (resolve)=>require(['../pages/course/testdetail'],resolve),
          prop:true,
          meta: {
            title: '课程试看'


          }
        },
        {
            path: '/live-detail',
            name: 'LiveDetail',
          component: (resolve)=>require(['../pages/course/liveDetail'],resolve),
            prop:true,
            meta: {
                title: '直播详情'
            }
        },


        {
            path: '/auth',
            name: 'Auth',
          component: (resolve)=>require(['../pages/auth'],resolve),
            meta: {
                title: '微信授权'
            }
        },
        {
            path: '*',
            name: 'NotFound',
          component: (resolve)=>require(['../components/404'],resolve),
            meta: {
                title: '404'
            },
        },
      {
        path: '/agentMoney',
        name: 'agentMoney',
        component: (resolve)=>require(['../pages/experts/agentMoney'],resolve),
            meta: {
              title: '佣金'
            }
      },
      {
        path: '/courseCode',
        name: 'courseCode',
        component: (resolve)=>require(['../pages/agent/courseCode'],resolve),
        meta: {
          title: '课程码'
        }
      },
      {
        path: '/browserlist',
        name: 'browserlist',
        component: (resolve)=>require(['../pages/agent/browserlist'],resolve),
        meta: {
          title: '浏览记录'
        }
      },
      {
        path: '/mycustomer',
        name: 'mycustomer',
        component: (resolve)=>require(['../pages/agent/mycustomer'],resolve),
        meta: {
          title: '我的客户'
        }
      },
      {
        path: '/courseSales',
        name: 'courseSales',
        component: (resolve)=>require(['../pages/agent/courseSales'],resolve),
        meta: {
          title: '销售统计'
        }
      },

       {
        path: '/collection',
        name: 'collection',
         component: (resolve)=>require(['../pages/collection'],resolve),
          meta: {
            title: '专家团'
          }
        },
      {
        path: '/collectionExpert',
        name: 'collectionExpert',
        component: (resolve)=>require(['../pages/collection/collectionExpert'],resolve),
        meta: {
          title: '授课信息采集'
        }
      },
        {
          path: '/apply',
            name: 'apply',
          component: (resolve)=>require(['../pages/apply/apply'],resolve),
          meta: {
          title: '申请'
        }
        },
        {
          path: '/invitation',
            name: 'invitation',
          component: (resolve)=>require(['../pages/invitation/invitation'],resolve),
            meta: {
            title: '邀请'
          }
        },
      {
        path: '/invitationCard',
        name: 'invitationCard',
        component: (resolve)=>require(['../pages/home/invitationCard'],resolve),
        meta: {
          title: '邀请'
        }
      },
      {
        path: '/noresource',
        name: 'noresource',
        component: (resolve)=>require(['../pages/components/noResource'],resolve),
        meta: {
          title: '提示'
        }
      },
      {
        path: '/shuang11',
        name: 'shuang11',
        component: (resolve)=>require(['../pages/home/shuang11'],resolve),
        meta: {
          title: '活动'
        }
      },
      {
        path: '/zjlist',
        name: 'zjlist',
        component: (resolve)=>require(['../pages/home/zjList'],resolve),
        meta: {
          title: '中奖纪录'
        }
      }
    ]
})

router.beforeEach(beforeEach);
router.afterEach((to, from)=>{
  if(to.meta.keepAlive){
    if(sessionStorage.getItem('srheight')){
      setTimeout(()=>{
        $(document).scrollTop(localStorage.getItem('srheight'));
      },200)
    }
  }


});

export default router
