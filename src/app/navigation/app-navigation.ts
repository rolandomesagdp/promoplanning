import { AppNavigationModel } from "./app-navigation-model";

export const navigation: AppNavigationModel[] = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home'
  },
  {
    text: 'Dashboard',
    icon: 'event',
    items: [
      {
        text: 'Calendar',
        path: '/profile',
      },
      {
        text: 'Promotions',
        path: '/tasks',
      },
      {
        text: 'Campaigns',
        path: '/campaigns',
      }
    ]
  },
  {
    text: 'Analytics',
    icon: 'chart',
    path: '/analytics'
  },
  {
    text: 'Configuration',
    icon: 'preferences',
    items: [
      {
        text: 'Data import',
        items: [
          {
            text: 'Master data',
            icon: 'movetofolder',
            path: ''
          },
          {
            text: 'Promotions',
            icon: 'export',
            path: '/data-import/promotion'
          }
        ],
      },
      {
        text: 'Promotion configuration',
        path: '/promotion-configuration',
      },
      {
        text: 'User & Permissions',
        path: '/user-permissions',
      }
    ]
  }
];
