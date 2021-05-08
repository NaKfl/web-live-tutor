export const MenuBarListItem = [
  {
    id: 'item-1',
    title: 'Menu.contentManagement',
    name: 'content',
    contents: [
      {
        title: 'Menu.homeSetting',
        name: 'settingHome',
        route: '/video-configuration',
      },
      {
        title: 'Menu.liveStreamsManagement',
        name: 'liveStreamManagement',
        route: '/live-stream-list',
      },
      {
        title: 'Menu.liveStreamsReport',
        name: 'liveStreamReport',
        route: '/live-stream-report',
      },
      {
        title: 'Menu.notificationManagement',
        name: 'notificationManagement',
        route: '/notification-list',
      },
      {
        title: 'Menu.uploadEmoticon',
        name: 'uploadEmoticon',
        route: '/upload-emoticon',
      },
    ],
  },
  {
    id: 'item-2',
    title: 'Menu.dailymotionManagement',
    name: 'dailymotion',
    contents: [
      {
        title: 'Menu.dailymotionAccountManagement',
        name: 'dailymotionManagement',
        route: '/account',
      },
      {
        title: 'Menu.dailymotionVideosManagement',
        name: 'videosManagement',
        route: '/dailymotion-video-list',
      },
    ],
  },
  {
    id: 'item-3',
    title: 'Menu.userManagement',
    name: 'users',
    contents: [
      {
        title: 'Menu.CMSManagement',
        name: 'userCMS',
        route: '/cms-user-management',
      },
      {
        title: 'Menu.NetLoveManagement',
        name: 'userNetLove',
        route: '/netlove-user-management',
      },
    ],
  },
];
