const DIVINE_BEASTS = {
    qinglong: {
        id: 'qinglong',
        name: '青龙之力',
        symbol: './assets/images/divine-beasts-images/青龙.png',
        description: '开局获得1张一星4费的天将牌',
        effect: {
            type: 'startup',
            action: 'give_general'
        }
    },
    baihu: {
        id: 'baihu',
        name: '白虎之力',
        symbol: './assets/images/divine-beasts-images/白虎.png',
        description: '每回合免费刷新机会一次（可叠加）',
        effect: {
            type: 'per_round',
            action: 'free_refresh'
        }
    },
    xuanwu: {
        id: 'xuanwu',
        name: '玄武之力',
        symbol: './assets/images/divine-beasts-images/玄武.png',
        description: '开局获得10仙元',
        effect: {
            type: 'startup',
            action: 'give_xianyuan',
            value: 10
        }
    },
    zhuque: {
        id: 'zhuque',
        name: '朱雀之力',
        symbol: './assets/images/divine-beasts-images/朱雀.png',
        description: '出牌次数和弃牌次数都+1',
        effect: {
            type: 'permanent',
            action: 'bonus_actions'
        }
    }
};