export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'DashBoard',
    icon: 'FundOutlined',
    component: './DashBoard',
  },
  {
    path: '/usermanage',
    name: 'UserManage',
    icon: 'UserOutlined',
    component: './UserManage',
  },
  // {
  //   path: '/goods',
  //   name: 'Goods',
  //   icon: 'ShopOutlined',
  //   component: './Goods',
  // },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
