export const adminMenu = [
    { //hệ thống khai bao menu de phan quyen
        name: 'menu.admin.manage-user',//ten cua menu cha-quan li nguoi dung
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage',//ten cua menu con

            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux',//ten cua menu con

            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor',//ten cua menu con
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },//link den trang user-manage
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },//link den trang user-redux
                // ]
            },
            {
                name: 'menu.doctor.schedule', link: '/doctor/manage-schedule',//ten cua menu con

            },
            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin',//ten cua menu con

            // },

            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
    { //Quan li phong kham
        name: 'menu.admin.clinic',//ten cua menu cha
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic',//ten cua menu con

            },

            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
    { //Quan li chuyen khoa
        name: 'menu.admin.specialty',//ten cua menu cha
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty',//ten cua menu con

            },

        ]
    },
    { //Quan li cam nang
        name: 'menu.admin.handbook',//ten cua menu cha
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook',//ten cua menu con

            },
        ]
    },

];

export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            { //hệ thống khai bao menu de phan quyen
                name: 'menu.doctor.manage-schedule',//ten cua menu cha-quan li nguoi dung
                link: '/doctor/manage-schedule',
            }
        ]
    }
];