/**
 * perms // permissions 权限设置
 * menuId //不可重复
 * orderNum //和数组下标相同  （注意：list中的数组，orderNum为 数组下标+1）
 * type --> 0-list为null   1-list不为null
 * url  null->list为null
 * 
 * /xx/ ->命名规则见中英文对照.pdf
 * 
 * 
 */

//↓ 存放页面左侧菜单栏的菜单信息 ↓

export default [{
        menuId: 100,
        parentId: 0,
        parentName: null,
        name: "首页",
        url: "/home",
        perms: null, // permissions 权限设置
        type: 1,
        icon: 'home',
        orderNum: 0,
        open: null,
        list: null
    },
    {
        menuId: 110,
        parentId: 0,
        parentName: null,
        name: "企业服务",
        url: "/cs/companyService",
        perms: null, // permissions 权限设置
        type: 1,
        icon: "companyService",
        orderNum: 1,
        open: null,
        list: null
    },
    {
        menuId: 120,
        parentId: 0,
        parentName: null,
        name: "报文处理",
        url: null,
        perms: null, // permissions 权限设置
        type: 0,
        icon: "messageProcessing",
        orderNum: 2,
        open: null,
        list: [{
                icon: null,
                list: null,
                menuId: 121,
                name: "报文发送",
                open: null,
                orderNum: 1,
                parentId: 120,
                parentName: "报文处理",
                perms: null, // permissions 权限设置
                type: 1,
                url: "/mp/messageSend"
            }, {
                icon: null,
                list: null,
                menuId: 122,
                name: "报文接收",
                open: null,
                orderNum: 2,
                parentId: 120,
                parentName: "报文处理",
                perms: null, // permissions 权限设置
                type: 1,
                url: "/mp/messageReceives"
            }, {
                icon: null,
                list: null,
                menuId: 123,
                name: "报文处理",
                open: null,
                orderNum: 3,
                parentId: 120,
                parentName: "报文处理",
                perms: null, // permissions 权限设置
                type: 1,
                url: "/mp/messageProcess"
            }

        ]
    },
    {
        menuId: 130,
        parentId: 0,
        parentName: null,
        name: "车辆管理",
        url: null,
        perms: null, // permissions 权限设置
        type: 0,
        icon: "vehiclesManagement",
        orderNum: 3,
        open: null,
        list: [{
                icon: null,
                list: null,
                menuId: 131,
                name: "车辆备案",
                open: null,
                orderNum: 1,
                parentId: 130,
                parentName: "车辆管理",
                perms: null, // permissions 权限设置
                type: 1,
                url: "/vm/vehiclesRecord"
            }, {
                icon: null,
                list: null,
                menuId: 132,
                name: "车辆变更",
                open: null,
                orderNum: 2,
                parentId: 130,
                parentName: "车辆管理",
                perms: null, // permissions 权限设置
                type: 1,
                url: "/vm/vehiclesChanges"
            }, {
                icon: null,
                list: null,
                menuId: 133,
                name: "车辆撤销",
                open: null,
                orderNum: 3,
                parentId: 130,
                parentName: "车辆管理",
                perms: null, // permissions 权限设置
                type: 1,
                url: "/vm/vehiclesCancel"
            }

        ]
    },
    {
        menuId: 140,
        parentId: 0,
        parentName: null,
        name: "核放单管理",
        url: null,
        perms: null, // permissions 权限设置
        type: 0,
        icon: "checklistManagement",
        orderNum: 4,
        open: null,
        list: [{
                icon: null,
                list: null,
                menuId: 141,
                name: "一票多车",
                open: null,
                orderNum: 1,
                parentId: 140,
                parentName: "核放单管理",
                perms: null, // permissions 权限设置
                type: 1,
                url: "/cm/oneTicketManyVehicles"
            }, {
                icon: null,
                list: null,
                menuId: 142,
                name: "一车多票",
                open: null,
                orderNum: 2,
                parentId: 140,
                parentName: "核放单管理",
                perms: null, // permissions 权限设置
                type: 1,
                url: "/cm/manyTicketsOneVehicle"
            }, {
                icon: null,
                list: null,
                menuId: 143,
                name: "大宗散货",
                open: null,
                orderNum: 3,
                parentId: 140,
                parentName: "核放单管理",
                perms: null, // permissions 权限设置
                type: 1,
                url: "/cm/majorBulks"
            }, {
                icon: null,
                list: null,
                menuId: 144,
                name: "核放单变更",
                open: null,
                orderNum: 4,
                parentId: 140,
                parentName: "核放单管理",
                perms: null, // permissions 权限设置
                type: 1,
                url: "/cm/checklistChanges"
            }, {
                icon: null,
                list: null,
                menuId: 145,
                name: "出入库确认",
                open: null,
                orderNum: 5,
                parentId: 140,
                parentName: "核放单管理",
                perms: null, // permissions 权限设置
                type: 1,
                url: "/cm/warehouseConfirm"
            }, {
                icon: null,
                list: null,
                menuId: 146,
                name: "运抵报告",
                open: null,
                orderNum: 6,
                parentId: 140,
                parentName: "核放单管理",
                perms: null, // permissions 权限设置
                type: 1,
                url: "/cm/arriveReport"
            }

        ]
    }


]