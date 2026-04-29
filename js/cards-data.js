const GENERALS = {
    nezha: {
        id: 'nezha',
        name: '哪吒',
        element: 'huo',
        symbol: '<img src="assets/images/generals/哪吒.jpg" alt="哪吒" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '【群英降世】',
        star: 1,
        price: 1,
        skills: {
            1: { name: '火莲焚世', description: '牌型中的每一张火属性牌，都会额外+20兵力', effect: function(totalSoldiers, cards) { const fireCards = cards.filter(c => c.element === 'huo'); return totalSoldiers + fireCards.length * 20; } },
            2: { name: '仙·火莲焚世', description: '牌型中的每一张火属性牌，都会额外+40兵力', effect: function(totalSoldiers, cards) { const fireCards = cards.filter(c => c.element === 'huo'); return totalSoldiers + fireCards.length * 40; } },
            3: { name: '神·火莲焚世', description: '牌型中的每一张火属性牌，都会额外+100兵力', effect: function(totalSoldiers, cards) { const fireCards = cards.filter(c => c.element === 'huo'); return totalSoldiers + fireCards.length * 100; } }
        }
    },
    muzha: {
        id: 'muzha',
        name: '木吒',
        element: 'mu',
        symbol: '<img src="assets/images/generals/木吒.png" alt="木吒" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '【群英降世】',
        star: 1,
        price: 1,
        skills: {
            1: { name: '木灵镇岳', description: '牌型中的每一张木属性牌，都会额外+20兵力', effect: function(totalSoldiers, cards) { const woodCards = cards.filter(c => c.element === 'mu'); return totalSoldiers + woodCards.length * 20; } },
            2: { name: '仙·木灵镇岳', description: '牌型中的每一张木属性牌，都会额外+40兵力', effect: function(totalSoldiers, cards) { const woodCards = cards.filter(c => c.element === 'mu'); return totalSoldiers + woodCards.length * 40; } },
            3: { name: '神·木灵镇岳', description: '牌型中的每一张木属性牌，都会额外+100兵力', effect: function(totalSoldiers, cards) { const woodCards = cards.filter(c => c.element === 'mu'); return totalSoldiers + woodCards.length * 100; } }
        }
    },
    jinza: {
        id: 'jinza',
        name: '金吒',
        element: 'jin',
        symbol: '<img src="assets/images/generals/金吒.png" alt="金吒" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '【群英降世】',
        star: 1,
        price: 1,
        skills: {
            1: { name: '金光裂穹', description: '牌型中的每一张金属性牌，都会额外+20兵力', effect: function(totalSoldiers, cards) { const goldCards = cards.filter(c => c.element === 'jin'); return totalSoldiers + goldCards.length * 20; } },
            2: { name: '仙·金光裂穹', description: '牌型中的每一张金属性牌，都会额外+40兵力', effect: function(totalSoldiers, cards) { const goldCards = cards.filter(c => c.element === 'jin'); return totalSoldiers + goldCards.length * 40; } },
            3: { name: '神·金光裂穹', description: '牌型中的每一张金属性牌，都会额外+100兵力', effect: function(totalSoldiers, cards) { const goldCards = cards.filter(c => c.element === 'jin'); return totalSoldiers + goldCards.length * 100; } }
        }
    },
    aobing: {
        id: 'aobing',
        name: '敖丙',
        element: 'shui',
        symbol: '<img src="assets/images/generals/敖丙.png" alt="敖丙" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '【群英降世】',
        star: 1,
        price: 1,
        skills: {
            1: { name: '覆海惊涛', description: '牌型中的每一张水属性牌，都额外+20兵力', effect: function(totalSoldiers, cards) { const waterCards = cards.filter(c => c.element === 'shui'); return totalSoldiers + waterCards.length * 20; } },
            2: { name: '仙·覆海惊涛', description: '牌型中的每一张水属性牌，都额外+40兵力', effect: function(totalSoldiers, cards) { const waterCards = cards.filter(c => c.element === 'shui'); return totalSoldiers + waterCards.length * 40; } },
            3: { name: '神·覆海惊涛', description: '牌型中的每一张水属性牌，都额外+100兵力', effect: function(totalSoldiers, cards) { const waterCards = cards.filter(c => c.element === 'shui'); return totalSoldiers + waterCards.length * 100; } }
        }
    },
    tuxingsun: {
        id: 'tuxingsun',
        name: '土行孙',
        element: 'tu',
        symbol: '<img src="assets/images/generals/土行孙.png" alt="土行孙" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '【群英降世】',
        star: 1,
        price: 1,
        skills: {
            1: { name: '遁地穿岩', description: '牌型中的每一张土属性牌，都额外+20兵力', effect: function(totalSoldiers, cards) { const earthCards = cards.filter(c => c.element === 'tu'); return totalSoldiers + earthCards.length * 20; } },
            2: { name: '仙·遁地穿岩', description: '牌型中的每一张土属性牌，都额外+40兵力', effect: function(totalSoldiers, cards) { const earthCards = cards.filter(c => c.element === 'tu'); return totalSoldiers + earthCards.length * 40; } },
            3: { name: '神·遁地穿岩', description: '牌型中的每一张土属性牌，都额外+100兵力', effect: function(totalSoldiers, cards) { const earthCards = cards.filter(c => c.element === 'tu'); return totalSoldiers + earthCards.length * 100; } }
        }
    },
    sanbaishengma: {
        id: 'sanbaishengma',
        name: '三圣母',
        element: 'shui',
        symbol: '<img src="assets/images/generals/三圣母.png" alt="三圣母" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '',
        star: 1,
        price: 3,
        skills: {
            1: { 
                name: '宝莲赐福', 
                description: '每回合随机获得以下一个效果：兵力+500、灵力+200、总伤害×2',
                effect: function(totalSoldiers, cards) {
                    const effects = gameState.sanbaishengmaEffects || { soldiersBonus: 0, spiritualPowerBonus: 0, damageMultiplier: 1 };
                    return { 
                        soldiersBonus: effects.soldiersBonus,
                        spiritualPowerBonus: effects.spiritualPowerBonus,
                        damageMultiplier: effects.damageMultiplier
                    };
                }
            },
            2: { 
                name: '仙·宝莲赐福', 
                description: '每回合随机获得以下二个效果：兵力+1000、灵力+400、总伤害×3',
                effect: function(totalSoldiers, cards) {
                    const effects = gameState.sanbaishengmaEffects || { soldiersBonus: 0, spiritualPowerBonus: 0, damageMultiplier: 1 };
                    return { 
                        soldiersBonus: effects.soldiersBonus,
                        spiritualPowerBonus: effects.spiritualPowerBonus,
                        damageMultiplier: effects.damageMultiplier
                    };
                }
            },
            3: { 
                name: '神·宝莲赐福', 
                description: '每回合获得以下全部效果：兵力+3000、灵力+1000、总伤害×5',
                effect: function(totalSoldiers, cards) {
                    const effects = gameState.sanbaishengmaEffects || { soldiersBonus: 0, spiritualPowerBonus: 0, damageMultiplier: 1 };
                    return { 
                        soldiersBonus: effects.soldiersBonus,
                        spiritualPowerBonus: effects.spiritualPowerBonus,
                        damageMultiplier: effects.damageMultiplier
                    };
                }
            }
        }
    },
    yangjian: {
        id: 'yangjian',
        name: '杨戬',
        element: 'jin',
        symbol: '<img src="assets/images/generals/杨戬.png" alt="杨戬" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '',
        star: 1,
        price: 1,
        skills: {
            1: { name: '天眼破邪', description: '额外+10灵力', effect: function(totalSoldiers, cards) { return { spiritualPowerBonus: 10 }; } },
            2: { name: '仙·天眼破邪', description: '额外+20灵力', effect: function(totalSoldiers, cards) { return { spiritualPowerBonus: 20 }; } },
            3: { name: '神·天眼破邪', description: '额外+50灵力', effect: function(totalSoldiers, cards) { return { spiritualPowerBonus: 50 }; } }
        }
    },
    change: {
        id: 'change',
        name: '嫦娥',
        element: 'jin',
        symbol: '<img src="assets/images/generals/嫦娥.png" alt="嫦娥" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '',
        star: 1,
        price: 3,
        skills: {
            1: { name: '月落寒江', description: '出牌次数+1', effect: function(totalSoldiers, cards) { return { playCountBonus: 1 }; } },
            2: { name: '仙·月落寒江', description: '出牌次数+2', effect: function(totalSoldiers, cards) { return { playCountBonus: 2 }; } },
            3: { name: '神·月落寒江', description: '出牌次数+5', effect: function(totalSoldiers, cards) { return { playCountBonus: 5 }; } }
        }
    },
    houchan: {
        id: 'houchan',
        name: '后羿',
        element: 'jin',
        symbol: '<img src="assets/images/generals/后羿.png" alt="后羿" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '',
        star: 1,
        price: 3,
        skills: {
            1: { name: '落日神箭', description: '弃牌次数+1', effect: function(totalSoldiers, cards) { return { discardCountBonus: 1 }; } },
            2: { name: '仙·落日神箭', description: '弃牌次数+2', effect: function(totalSoldiers, cards) { return { discardCountBonus: 2 }; } },
            3: { name: '神·落日神箭', description: '弃牌次数+3', effect: function(totalSoldiers, cards) { return { discardCountBonus: 3 }; } }
        }
    },
    bailongma: {
        id: 'bailongma',
        name: '白龙马',
        element: 'jin',
        symbol: '<img src="assets/images/generals/白龙马.png" alt="白龙马" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '【西行证道】',
        star: 1,
        price: 1,
        skills: {
            1: { name: '腾云踏浪', description: '手牌上限+1', effect: function(totalSoldiers, cards) { return { handCardLimitBonus: 1 }; } },
            2: { name: '仙·腾云踏浪', description: '手牌上限+2', effect: function(totalSoldiers, cards) { return { handCardLimitBonus: 2 }; } },
            3: { name: '神·腾云踏浪', description: '手牌上限+4', effect: function(totalSoldiers, cards) { return { handCardLimitBonus: 4 }; } }
        }
    },
    biji: {
        id: 'biji',
        name: '妲己',
        element: 'tu',
        symbol: '<img src="assets/images/generals/妲己.png" alt="妲己" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '',
        star: 1,
        price: 3,
        skills: {
            1: { name: '狐媚惑心', description: '天将席位每存在一张天将牌，额外+100兵力', effect: function(totalSoldiers, cards) { const generalCount = gameState.generals.length; return totalSoldiers + generalCount * 100; } },
            2: { name: '仙·狐媚惑心', description: '天将席位每存在一张天将牌，额外+200兵力', effect: function(totalSoldiers, cards) { const generalCount = gameState.generals.length; return totalSoldiers + generalCount * 200; } },
            3: { name: '神·狐媚惑心', description: '天将席位每存在一张天将牌，额外+500兵力', effect: function(totalSoldiers, cards) { const generalCount = gameState.generals.length; return totalSoldiers + generalCount * 500; } }
        }
    },
    julingshen: {
        id: 'julingshen',
        name: '巨灵神',
        element: 'tu',
        symbol: '<img src="assets/images/generals/巨灵神.png" alt="巨灵神" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '',
        star: 1,
        price: 1,
        skills: {
            1: { name: '巨力撼山', description: '额外+100兵力', effect: function(totalSoldiers, cards) { return totalSoldiers + 100; } },
            2: { name: '仙·巨力撼山', description: '额外+200兵力', effect: function(totalSoldiers, cards) { return totalSoldiers + 200; } },
            3: { name: '神·巨力撼山', description: '额外+500兵力', effect: function(totalSoldiers, cards) { return totalSoldiers + 500; } }
        }
    },
    zhubajie: {
        id: 'zhubajie',
        name: '猪八戒',
        element: 'shui',
        symbol: '<img src="assets/images/generals/猪八戒.png" alt="猪八戒" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '【西行证道】',
        star: 1,
        price: 1,
        skills: {
            1: { name: '天蓬镇妖', description: '弃牌次数用完后，额外+20灵力', effect: function(totalSoldiers, cards) { return { spiritualPowerBonusAfterDiscard: 20 }; } },
            2: { name: '仙·天蓬镇妖', description: '弃牌次数用完后，额外+50灵力', effect: function(totalSoldiers, cards) { return { spiritualPowerBonusAfterDiscard: 50 }; } },
            3: { name: '神·天蓬镇妖', description: '弃牌次数用完后，额外+120灵力', effect: function(totalSoldiers, cards) { return { spiritualPowerBonusAfterDiscard: 120 }; } }
        }
    },
    shawujing: {
        id: 'shawujing',
        name: '沙悟净',
        element: 'shui',
        symbol: '<img src="assets/images/generals/沙悟净.png" alt="沙悟净" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '【西行证道】',
        star: 1,
        price: 1,
        skills: {
            1: { name: '流沙河啸', description: '每回合第一次出牌，额外+200兵力', effect: function(totalSoldiers, cards) { return { firstPlaySoldiersBonus: 200 }; } },
            2: { name: '仙·流沙河啸', description: '每回合第一次出牌，额外+500兵力', effect: function(totalSoldiers, cards) { return { firstPlaySoldiersBonus: 500 }; } },
            3: { name: '神·流沙河啸', description: '每回合第一次出牌，额外+1000兵力', effect: function(totalSoldiers, cards) { return { firstPlaySoldiersBonus: 1000 }; } }
        }
    },
    niumowang: {
        id: 'niumowang',
        name: '牛魔王',
        element: 'huo',
        symbol: '<img src="assets/images/generals/牛魔王.png" alt="牛魔王" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '【火焰世家】',
        star: 1,
        price: 2,
        skills: {
            1: { name: '魔牛吞天', description: '出牌牌型中的每一张偶数牌，都会额外+6灵力', effect: function(totalSoldiers, cards) { const evenCards = cards.filter(c => c.number % 2 === 0); return { spiritualPowerBonus: evenCards.length * 6 }; } },
            2: { name: '仙·魔牛吞天', description: '出牌牌型中的每一张偶数牌，都会额外+12灵力', effect: function(totalSoldiers, cards) { const evenCards = cards.filter(c => c.number % 2 === 0); return { spiritualPowerBonus: evenCards.length * 12 }; } },
            3: { name: '神·魔牛吞天', description: '出牌牌型中的每一张偶数牌，都会额外+30灵力', effect: function(totalSoldiers, cards) { const evenCards = cards.filter(c => c.number % 2 === 0); return { spiritualPowerBonus: evenCards.length * 30 }; } }
        }
    },
    tieshangongzhu: {
        id: 'tieshangongzhu',
        name: '铁扇公主',
        element: 'huo',
        symbol: '<img src="assets/images/generals/铁扇公主.png" alt="铁扇公主" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '【火焰世家】',
        star: 1,
        price: 2,
        skills: {
            1: { name: '风卷尘寰', description: '出牌牌型中的每一张奇数牌，都会额外+6灵力', effect: function(totalSoldiers, cards) { const oddCards = cards.filter(c => c.number % 2 === 1); return { spiritualPowerBonus: oddCards.length * 6 }; } },
            2: { name: '仙·风卷尘寰', description: '出牌牌型中的每一张奇数牌，都会额外+12灵力', effect: function(totalSoldiers, cards) { const oddCards = cards.filter(c => c.number % 2 === 1); return { spiritualPowerBonus: oddCards.length * 12 }; } },
            3: { name: '神·风卷尘寰', description: '出牌牌型中的每一张奇数牌，都会额外+30灵力', effect: function(totalSoldiers, cards) { const oddCards = cards.filter(c => c.number % 2 === 1); return { spiritualPowerBonus: oddCards.length * 30 }; } }
        }
    },
    honghaier: {
        id: 'honghaier',
        name: '红孩儿',
        element: 'huo',
        symbol: '<img src="assets/images/generals/红孩儿.png" alt="红孩儿" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '【火焰世家】',
        star: 1,
        price: 2,
        skills: {
            1: { name: '三昧焚天', description: '出牌牌型中的每一张偶数牌，都会额外+20兵力', effect: function(totalSoldiers, cards) { const evenCards = cards.filter(c => c.number % 2 === 0); return totalSoldiers + evenCards.length * 20; } },
            2: { name: '仙·三昧焚天', description: '出牌牌型中的每一张偶数牌，都会额外+40兵力', effect: function(totalSoldiers, cards) { const evenCards = cards.filter(c => c.number % 2 === 0); return totalSoldiers + evenCards.length * 40; } },
            3: { name: '神·三昧焚天', description: '出牌牌型中的每一张偶数牌，都会额外+100兵力', effect: function(totalSoldiers, cards) { const evenCards = cards.filter(c => c.number % 2 === 0); return totalSoldiers + evenCards.length * 100; } }
        }
    },
    leizhenzi_new: {
        id: 'leizhenzi_new',
        name: '雷震子',
        element: 'jin',
        symbol: '<img src="assets/images/generals/雷震子.png" alt="雷震子" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '',
        star: 1,
        price: 2,
        skills: {
            1: { name: '雷霆震宇', description: '出牌牌型中的每一张奇数牌，都会额外+20兵力', effect: function(totalSoldiers, cards) { const oddCards = cards.filter(c => c.number % 2 === 1); return totalSoldiers + oddCards.length * 20; } },
            2: { name: '仙·雷霆震宇', description: '出牌牌型中的每一张奇数牌，都会额外+40兵力', effect: function(totalSoldiers, cards) { const oddCards = cards.filter(c => c.number % 2 === 1); return totalSoldiers + oddCards.length * 40; } },
            3: { name: '神·雷霆震宇', description: '出牌牌型中的每一张奇数牌，都会额外+100兵力', effect: function(totalSoldiers, cards) { const oddCards = cards.filter(c => c.number % 2 === 1); return totalSoldiers + oddCards.length * 100; } }
        }
    },
    tangsanzang: {
        id: 'tangsanzang',
        name: '唐三藏',
        element: 'jin',
        symbol: '<img src="assets/images/generals/唐三藏.png" alt="唐三藏" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '【西行证道】',
        star: 1,
        price: 1,
        skills: {
            1: { name: '禅心渡厄', description: '每回合结束+2仙元', effect: function(totalSoldiers, cards) { return { xianyuanBonusPerRound: 2 }; } },
            2: { name: '仙·禅心渡厄', description: '每回合结束+4仙元', effect: function(totalSoldiers, cards) { return { xianyuanBonusPerRound: 4 }; } },
            3: { name: '神·禅心渡厄', description: '每回合结束+10仙元', effect: function(totalSoldiers, cards) { return { xianyuanBonusPerRound: 10 }; } }
        }
    },
    sunwukong: {
        id: 'sunwukong',
        name: '孙悟空',
        element: 'jin',
        symbol: '<img src="assets/images/generals/孙悟空.png" alt="孙悟空" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '【西行证道】',
        star: 1,
        price: 3,
        skills: {
            1: { name: '齐天棍法', description: '每存在1仙元，额外+2灵力', effect: function(totalSoldiers, cards) { return { spiritualPowerPerXianyuan: 2 }; } },
            2: { name: '仙·齐天棍法', description: '每存在1仙元，额外+4灵力', effect: function(totalSoldiers, cards) { return { spiritualPowerPerXianyuan: 4 }; } },
            3: { name: '神·齐天棍法', description: '每存在1仙元，额外+10灵力', effect: function(totalSoldiers, cards) { return { spiritualPowerPerXianyuan: 10 }; } }
        }
    },
    liuermihou: {
        id: 'liuermihou',
        name: '六耳猕猴',
        element: 'jin',
        symbol: '<img src="assets/images/generals/六耳猕猴.png" alt="六耳猕猴" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '',
        star: 1,
        price: 3,
        skills: {
            1: { name: '六耳听心', description: '当仙元为0时，总伤害×1.5', effect: function() { return gameState.xianyuan === 0 ? { damageMultiplier: 1.5 } : {}; } },
            2: { name: '仙·六耳听心', description: '当仙元为0时，总伤害×3', effect: function() { return gameState.xianyuan === 0 ? { damageMultiplier: 3 } : {}; } },
            3: { name: '神·六耳听心', description: '当仙元为0时，总伤害×5', effect: function() { return gameState.xianyuan === 0 ? { damageMultiplier: 5 } : {}; } }
        }
    },
    tuotatianwang: {
        id: 'tuotatianwang',
        name: '托塔天王',
        element: 'jin',
        symbol: '<img src="assets/images/generals/托塔天王.png" alt="托塔天王" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '',
        star: 1,
        price: 2,
        skills: {
            1: { name: '宝塔镇妖', description: '本局游戏中，每打出一种不同牌型，额外+10灵力', effect: function() { return { spiritualPowerPerUniquePattern: 10 }; } },
            2: { name: '仙·宝塔镇妖', description: '本局游戏中，每打出一种不同牌型，额外+20灵力', effect: function() { return { spiritualPowerPerUniquePattern: 20 }; } },
            3: { name: '神·宝塔镇妖', description: '本局游戏中，每打出一种不同牌型，额外+50灵力', effect: function() { return { spiritualPowerPerUniquePattern: 50 }; } }
        }
    },
    mengpo: {
        id: 'mengpo',
        name: '孟婆',
        element: 'tu',
        symbol: '<img src="assets/images/generals/孟婆.png" alt="孟婆" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '【地府判官】',
        star: 1,
        price: 3,
        skills: {
            1: { name: '忘川汤引', description: '每一个剩余的弃牌次数，额外+100兵力', effect: function(totalSoldiers, cards) { const maxDiscardCount = gameState.baseDiscardCount + getBonusDiscardCount(); const remainingDiscardCount = maxDiscardCount - gameState.discardCount; return totalSoldiers + remainingDiscardCount * 100; } },
            2: { name: '仙·忘川汤引', description: '每一个剩余的弃牌次数，额外+200兵力', effect: function(totalSoldiers, cards) { const maxDiscardCount = gameState.baseDiscardCount + getBonusDiscardCount(); const remainingDiscardCount = maxDiscardCount - gameState.discardCount; return totalSoldiers + remainingDiscardCount * 200; } },
            3: { name: '神·忘川汤引', description: '每一个剩余的弃牌次数，额外+500兵力', effect: function(totalSoldiers, cards) { const maxDiscardCount = gameState.baseDiscardCount + getBonusDiscardCount(); const remainingDiscardCount = maxDiscardCount - gameState.discardCount; return totalSoldiers + remainingDiscardCount * 500; } }
        }
    },
    yanluowang: {
        id: 'yanluowang',
        name: '阎罗王',
        element: 'tu',
        symbol: '<img src="assets/images/generals/阎罗王.png" alt="阎罗王" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '【地府判官】',
        star: 1,
        price: 3,
        skills: {
            1: { name: '判魂断狱', description: '出牌牌型中的每一张4兵力牌，额外+44灵力', effect: function(totalSoldiers, cards) { const fourSoldierCards = cards.filter(c => c.number === 4); return { spiritualPowerBonus: fourSoldierCards.length * 44 }; } },
            2: { name: '仙·判魂断狱', description: '出牌牌型中的每一张4兵力牌，额外+88灵力', effect: function(totalSoldiers, cards) { const fourSoldierCards = cards.filter(c => c.number === 4); return { spiritualPowerBonus: fourSoldierCards.length * 88 }; } },
            3: { name: '神·判魂断狱', description: '出牌牌型中的每一张4兵力牌，额外+250灵力', effect: function(totalSoldiers, cards) { const fourSoldierCards = cards.filter(c => c.number === 4); return { spiritualPowerBonus: fourSoldierCards.length * 250 }; } }
        }
    },
    taibaijinxing: {
        id: 'taibaijinxing',
        name: '太白金星',
        element: 'jin',
        symbol: '<img src="assets/images/generals/太白金星.png" alt="太白金星" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '',
        star: 1,
        price: 3,
        skills: {
            1: { name: '星陨启明', description: '出牌牌型中的每一张8兵力牌，额外+128兵力', effect: function(totalSoldiers, cards) { const eightSoldierCards = cards.filter(c => c.number === 8); return totalSoldiers + eightSoldierCards.length * 128; } },
            2: { name: '仙·星陨启明', description: '出牌牌型中的每一张8兵力牌，额外+256兵力', effect: function(totalSoldiers, cards) { const eightSoldierCards = cards.filter(c => c.number === 8); return totalSoldiers + eightSoldierCards.length * 256; } },
            3: { name: '神·星陨启明', description: '出牌牌型中的每一张8兵力牌，额外+888兵力', effect: function(totalSoldiers, cards) { const eightSoldierCards = cards.filter(c => c.number === 8); return totalSoldiers + eightSoldierCards.length * 888; } }
        }
    },
    jiutianxiannv: {
        id: 'jiutianxiannv',
        name: '九天玄女',
        element: 'jin',
        symbol: '<img src="assets/images/generals/九天玄女.png" alt="九天玄女" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '',
        star: 1,
        price: 4,
        skills: {
            1: { name: '玄兵天降', description: '出牌牌型为双数同辉，总伤害*1.5', effect: function(totalSoldiers, cards) { return gameState.currentPlayPattern === 'shuangshu' ? { damageMultiplier: 1.5 } : {}; } },
            2: { name: '仙·玄兵天降', description: '出牌牌型为双数同辉，总伤害*2.5', effect: function(totalSoldiers, cards) { return gameState.currentPlayPattern === 'shuangshu' ? { damageMultiplier: 2.5 } : {}; } },
            3: { name: '神·玄兵天降', description: '出牌牌型为双数同辉，总伤害*4', effect: function(totalSoldiers, cards) { return gameState.currentPlayPattern === 'shuangshu' ? { damageMultiplier: 4 } : {}; } }
        }
    },
    yunxiaoniangniang: {
        id: 'yunxiaoniangniang',
        name: '云霄娘娘',
        element: 'jin',
        symbol: '<img src="assets/images/generals/云霄娘娘.png" alt="云霄娘娘" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '',
        star: 1,
        price: 4,
        skills: {
            1: { name: '云霄覆海', description: '出牌牌型为三才聚气，总伤害*2', effect: function(totalSoldiers, cards) { return gameState.currentPlayPattern === 'sancai_juqi' ? { damageMultiplier: 2 } : {}; } },
            2: { name: '仙·云霄覆海', description: '出牌牌型为三才聚气，总伤害*3.5', effect: function(totalSoldiers, cards) { return gameState.currentPlayPattern === 'sancai_juqi' ? { damageMultiplier: 3.5 } : {}; } },
            3: { name: '神·云霄覆海', description: '出牌牌型为三才聚气，总伤害*6', effect: function(totalSoldiers, cards) { return gameState.currentPlayPattern === 'sancai_juqi' ? { damageMultiplier: 6 } : {}; } }
        }
    },
    dizangwangpusa: {
        id: 'dizangwangpusa',
        name: '地藏王菩萨',
        element: 'tu',
        symbol: '<img src="assets/images/generals/地藏王菩萨.png" alt="地藏王菩萨" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '',
        star: 1,
        price: 4,
        skills: {
            1: { name: '地狱不空', description: '出牌牌型为四象镇元，总伤害*3', effect: function(totalSoldiers, cards) { return gameState.currentPlayPattern === 'sixiang_zhenyuan' ? { damageMultiplier: 3 } : {}; } },
            2: { name: '仙·地狱不空', description: '出牌牌型为四象镇元，总伤害*5', effect: function(totalSoldiers, cards) { return gameState.currentPlayPattern === 'sixiang_zhenyuan' ? { damageMultiplier: 5 } : {}; } },
            3: { name: '神·地狱不空', description: '出牌牌型为四象镇元，总伤害*8', effect: function(totalSoldiers, cards) { return gameState.currentPlayPattern === 'sixiang_zhenyuan' ? { damageMultiplier: 8 } : {}; } }
        }
    },
    kongquedamingwang: {
        id: 'kongquedamingwang',
        name: '孔雀大明王',
        element: 'jin',
        symbol: '<img src="assets/images/generals/孔雀大明王.png" alt="孔雀大明王" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '',
        star: 1,
        price: 4,
        skills: {
            1: { name: '孔雀开屏', description: '出牌牌型为五极同尊，总伤害*4', effect: function(totalSoldiers, cards) { return gameState.currentPlayPattern === 'wuji_tongzun' ? { damageMultiplier: 4 } : {}; } },
            2: { name: '仙·孔雀开屏', description: '出牌牌型为五极同尊，总伤害*6', effect: function(totalSoldiers, cards) { return gameState.currentPlayPattern === 'wuji_tongzun' ? { damageMultiplier: 6 } : {}; } },
            3: { name: '神·孔雀开屏', description: '出牌牌型为五极同尊，总伤害*12', effect: function(totalSoldiers, cards) { return gameState.currentPlayPattern === 'wuji_tongzun' ? { damageMultiplier: 12 } : {}; } }
        }
    },
    chenxiang: {
        id: 'chenxiang',
        name: '沉香',
        element: 'mu',
        symbol: '<img src="assets/images/generals/沉香.png" alt="沉香" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '',
        star: 1,
        price: 2,
        skills: {
            1: { name: '劈山救母', description: '出且仅出1张牌时，额外+200兵力', effect: function(totalSoldiers, cards) { return cards.length === 1 ? { soldiersBonus: 200 } : {}; } },
            2: { name: '仙·劈山救母', description: '出且仅出1张牌时，额外+400兵力', effect: function(totalSoldiers, cards) { return cards.length === 1 ? { soldiersBonus: 400 } : {}; } },
            3: { name: '神·劈山救母', description: '出且仅出1张牌时，额外+1000兵力', effect: function(totalSoldiers, cards) { return cards.length === 1 ? { soldiersBonus: 1000 } : {}; } }
        }
    },
    dijun: {
        id: 'dijun',
        name: '帝俊',
        element: 'jin',
        symbol: '<img src="assets/images/generals/帝俊.png" alt="帝俊" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '【日月同天】',
        star: 1,
        price: 5,
        skills: {
            1: { name: '帝曜临世', description: '总伤害*（出牌牌型中最小的数字）', effect: function(totalSoldiers, cards) { const minNumber = Math.min(...cards.map(c => c.number)); return { damageMultiplierByMin: minNumber }; } },
            2: { name: '仙·帝曜临世', description: '总伤害*（出牌牌型中最大的数字）', effect: function(totalSoldiers, cards) { const maxNumber = Math.max(...cards.map(c => c.number)); return { damageMultiplierByMax: maxNumber }; } },
            3: { name: '神·帝曜临世', description: '总伤害*（出牌牌型中数字的总和）', effect: function(totalSoldiers, cards) { const sumNumbers = cards.reduce((sum, c) => sum + c.number, 0); return { damageMultiplierBySum: sumNumbers }; } }
        }
    },
    heibaiwuchang: {
        id: 'heibaiwuchang',
        name: '黑白无常',
        element: 'tu',
        symbol: '<img src="assets/images/generals/黑白无常.png" alt="黑白无常" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '【地府判官】',
        star: 1,
        price: 3,
        skills: {
            1: { name: '勾魂索命', description: '每存在1仙元，额外+10兵力', effect: function(totalSoldiers, cards) { return totalSoldiers + gameState.xianyuan * 10; } },
            2: { name: '仙·勾魂索命', description: '每存在1仙元，额外+20兵力', effect: function(totalSoldiers, cards) { return totalSoldiers + gameState.xianyuan * 20; } },
            3: { name: '神·勾魂索命', description: '每存在1仙元，额外+50兵力', effect: function(totalSoldiers, cards) { return totalSoldiers + gameState.xianyuan * 50; } }
        }
    },
    guiwang: {
        id: 'guiwang',
        name: '鬼王',
        element: 'tu',
        symbol: '<img src="assets/images/generals/鬼王.png" alt="鬼王" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '【地府判官】',
        star: 1,
        price: 2,
        skills: {
            1: { name: '万鬼臣服', description: '出且仅出4张牌时，总伤害*1.25', effect: function(totalSoldiers, cards) { if (cards.length === 4) { return { damageMultiplier: 1.25 }; } return {}; } },
            2: { name: '仙·万鬼臣服', description: '出且仅出4张牌时，总伤害*1.5', effect: function(totalSoldiers, cards) { if (cards.length === 4) { return { damageMultiplier: 1.5 }; } return {}; } },
            3: { name: '神·万鬼臣服', description: '出且仅出4张牌时，总伤害*3', effect: function(totalSoldiers, cards) { if (cards.length === 4) { return { damageMultiplier: 3 }; } return {}; } }
        }
    },
    xihe: {
        id: 'xihe',
        name: '羲和',
        element: 'huo',
        symbol: '<img src="assets/images/generals/羲和.png" alt="羲和" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '【日月同天】',
        star: 1,
        price: 5,
        skills: {
            1: { name: '御日驭天', description: '增加一套五行牌（50张）到卡池中', effect: function(totalSoldiers, cards) { return { deckMultiplier: 2 }; } },
            2: { name: '仙·御日驭天', description: '增加两套五行牌（100张）到卡池中', effect: function(totalSoldiers, cards) { return { deckMultiplier: 3 }; } },
            3: { name: '神·御日驭天', description: '卡池中存在无限套五行牌', effect: function(totalSoldiers, cards) { return { infiniteDeck: true }; } }
        }
    },
    zhangdaoling: {
        id: 'zhangdaoling',
        name: '张道陵',
        element: 'jin',
        symbol: '<img src="assets/images/generals/张道陵.png" alt="张道陵" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '',
        star: 1,
        price: 4,
        skills: {
            1: { name: '道法自然', description: '出牌后扔出一个骰子，直接对异类造成（骰子点数）%伤害', effect: function(totalSoldiers, cards) { return { diceCount: 1 }; } },
            2: { name: '仙·道法自然', description: '出牌后扔出两个骰子，直接对异类造成（骰子点数总和）%伤害', effect: function(totalSoldiers, cards) { return { diceCount: 2 }; } },
            3: { name: '神·道法自然', description: '出牌后扔出三个骰子，直接对异类造成（骰子点数总和）%伤害', effect: function(totalSoldiers, cards) { return { diceCount: 3 }; } }
        }
    },
    jiangziya: {
        id: 'jiangziya',
        name: '姜子牙',
        element: 'shui',
        symbol: '<img src="assets/images/generals/姜子牙.png" alt="姜子牙" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '',
        star: 1,
        price: 3,
        skills: {
            1: { name: '代天封神', description: '商店购买天将牌时，有30%概率多获得一张', effect: function() { return { buyChance: 0.3 }; } },
            2: { name: '仙·代天封神', description: '商店购买天将牌时，有50%概率多获得一张', effect: function() { return { buyChance: 0.5 }; } },
            3: { name: '神·代天封神', description: '商店购买天将牌时，必定多获得一张', effect: function() { return { buyChance: 1.0 }; } }
        }
    },
    xingtian: {
        id: 'xingtian',
        name: '刑天',
        element: 'huo',
        symbol: '<img src="assets/images/generals/刑天.png" alt="刑天" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '',
        star: 1,
        price: 3,
        skills: {
            1: { name: '干戚之舞', description: '每弃掉1张手牌，额外+50兵力', effect: function() { return { discardBonus: 50 }; } },
            2: { name: '仙·干戚之舞', description: '每弃掉1张手牌，额外+100兵力', effect: function() { return { discardBonus: 100 }; } },
            3: { name: '神·干戚之舞', description: '每弃掉1张手牌，额外+300兵力', effect: function() { return { discardBonus: 300 }; } }
        }
    },
    chixu: {
        id: 'chixu',
        name: '蚩尤',
        element: 'huo',
        symbol: '<img src="assets/images/generals/蚩尤.png" alt="蚩尤" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '【九黎战神】',
        star: 1,
        price: 4,
        skills: {
            1: { name: '战魂觉醒', description: '每弃掉1张手牌积累1层"怒意"，满10层后，总伤害×2', effect: function() { return { angerPerDiscard: 1, angerThreshold: 10, angerMultiplier: 2 }; } },
            2: { name: '仙·战魂觉醒', description: '每弃掉1张手牌积累1层"怒意"，满8层后，总伤害×3.5', effect: function() { return { angerPerDiscard: 1, angerThreshold: 8, angerMultiplier: 3.5 }; } },
            3: { name: '神·战魂觉醒', description: '每弃掉1张手牌积累1层"怒意"，满5层后，总伤害×6', effect: function() { return { angerPerDiscard: 1, angerThreshold: 5, angerMultiplier: 6 }; } }
        }
    },
    huangfeihu: {
        id: 'huangfeihu',
        name: '黄飞虎',
        element: 'jin',
        symbol: '<img src="assets/images/generals/黄飞虎.png" alt="黄飞虎" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '',
        star: 1,
        price: 2,
        skills: {
            1: { name: '兵强马壮', description: '上阵后，每通过一关，基础兵力永久+30', effect: function() { return { levelBonusSoldiers: 30 }; } },
            2: { name: '仙·兵强马壮', description: '上阵后，每通过一关，基础兵力永久+60', effect: function() { return { levelBonusSoldiers: 60 }; } },
            3: { name: '神·兵强马壮', description: '上阵后，每通过一关，基础兵力永久+200', effect: function() { return { levelBonusSoldiers: 200 }; } }
        }
    },
    kuafu: {
        id: 'kuafu',
        name: '夸父',
        element: 'huo',
        symbol: '<img src="assets/images/generals/夸父.png" alt="夸父" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '',
        star: 1,
        price: 2,
        skills: {
            1: { name: '逐日追光', description: '上阵后，每通过一关，基础灵力永久+5', effect: function() { return { levelBonusSpiritualPower: 5 }; } },
            2: { name: '仙·逐日追光', description: '上阵后，每通过一关，基础灵力永久+10', effect: function() { return { levelBonusSpiritualPower: 10 }; } },
            3: { name: '神·逐日追光', description: '上阵后，每通过一关，基础灵力永久+30', effect: function() { return { levelBonusSpiritualPower: 30 }; } }
        }
    },
    jigong: {
        id: 'jigong',
        name: '济公',
        element: 'mu',
        symbol: '<img src="assets/images/generals/济公.png" alt="济公" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '',
        star: 1,
        price: 1,
        skills: {
            1: { name: '醉眼观缘', description: '每一关可以观测一次后面要补充的1张牌', effect: function() { return { deckObserveCount: 1 }; } },
            2: { name: '仙·醉眼观缘', description: '每一关可以观测一次后面要补充的3张牌', effect: function() { return { deckObserveCount: 3 }; } },
            3: { name: '神·醉眼观缘', description: '每一关可以观测一次后面要补充的5张牌', effect: function() { return { deckObserveCount: 5 }; } }
        }
    },
    wangmu: {
        id: 'wangmu',
        name: '王母娘娘',
        element: 'jin',
        symbol: '<img src="assets/images/generals/王母娘娘.png" alt="王母娘娘" style="width: 80px; height: 80px; object-fit: contain;">',
        description: '',
        star: 1,
        price: 2,
        skills: {
            1: { name: '瑶池赐灵', description: '每刷新一次仙界商店，永久+2灵力', effect: function() { return { shopRefreshSpiritualPower: 2 }; } },
            2: { name: '仙·瑶池赐灵', description: '每刷新一次仙界商店，永久+5灵力', effect: function() { return { shopRefreshSpiritualPower: 5 }; } },
            3: { name: '神·瑶池赐灵', description: '每刷新一次仙界商店，永久+12灵力', effect: function() { return { shopRefreshSpiritualPower: 12 }; } }
        }
    }
};

const TREASURES = {
    kaitian_shenfu: {
        id: 'kaitian_shenfu',
        name: '开天神斧',
        element: 'jin',
        symbol: '🪓',
        image: 'assets/images/treasures/开天神斧.png',
        description: '解除下一次boss战的封印效果',
        price: 2,
        effect: function() { return { removeBossDebuff: true }; }
    },
    chuanshi_qinglian: {
        id: 'chuanshi_qinglian',
        name: '创世青莲',
        element: 'jin',
        symbol: '🪷',
        image: 'assets/images/treasures/创世青莲.png',
        description: '下一次购买天将牌直接获得3张',
        price: 2,
        effect: function() { return { nextGeneralCount: 3 }; }
    },
    zaohua_yudie: {
        id: 'zaohua_yudie',
        name: '造化玉碟',
        element: 'jin',
        symbol: '🪷',
        image: 'assets/images/treasures/造化玉碟.png',
        description: '下次购买天将席位免费',
        price: 2,
        effect: function() { return { nextGeneralSlotPurchaseFree: true }; }
    },
    hundun_zhu: {
        id: 'hundun_zhu',
        name: '混沌珠',
        element: 'jin',
        symbol: '🔮',
        image: 'assets/images/treasures/混沌珠.png',
        description: '摧毁天将席位上所有天将牌，随机出现一个售价为3仙元的二星天将牌',
        price: 2,
        effect: function() { return { destroyGenerals: true }; }
    },
    pangu_fan: {
        id: 'pangu_fan',
        name: '盘古幡',
        element: 'jin',
        symbol: '🪷',
        image: 'assets/images/treasures/盘古幡.png',
        description: '将现有的仙元数量翻倍（增加的仙元上限为30）',
        price: 2,
        effect: function() { return { xianyuanMultiplier: 2, xianyuanMaxBonus: 30 }; }
    },
    zhuxian_sijian: {
        id: 'zhuxian_sijian',
        name: '诛仙四剑',
        element: 'jin',
        symbol: '⚔️',
        image: 'assets/images/treasures/诛仙四剑.png',
        description: '随机升4个牌型的等级',
        price: 2,
        effect: function() { return { patternLevelUp: 4 }; }
    },
    taiji_tu: {
        id: 'taiji_tu',
        name: '太极图',
        element: 'jin',
        symbol: '☯️',
        image: 'assets/images/treasures/太极图.png',
        description: '出牌次数+1',
        price: 2,
        effect: function() { return { playCountBonus: 1 }; }
    },
    donghuang_zhong: {
        id: 'donghuang_zhong',
        name: '东皇钟',
        element: 'jin',
        symbol: '🔔',
        image: 'assets/images/treasures/东皇钟.png',
        description: '弃牌次数+1',
        price: 2,
        effect: function() { return { discardCountBonus: 1 }; }
    },
    fuxi_qin: {
        id: 'fuxi_qin',
        name: '伏羲琴',
        element: 'jin',
        symbol: '🎵',
        image: 'assets/images/treasures/伏羲琴.png',
        description: '手牌上限+1',
        price: 2,
        effect: function() { return { handCardLimitBonus: 1 }; }
    },
    qibao_miaoshu: {
        id: 'qibao_miaoshu',
        name: '七宝妙树',
        element: 'jin',
        symbol: '🌳',
        image: 'assets/images/treasures/七宝妙树.png',
        description: '将利息的上限提升2',
        price: 2,
        effect: function() { return { interestCapBonus: 2 }; }
    }
};

const BONDS = [
    {
        id: 'xizheng_dao',
        name: '西行证道',
        description: '灵力+888',
        members: ['tangsanzang', 'sunwukong', 'zhubajie', 'shawujing', 'bailongma']
    },
    {
        id: 'riyue_tongtian',
        name: '日月同天',
        description: '天将席位1的天将牌每回合增加1张',
        members: ['dijun', 'xihe']
    },
    {
        id: 'qunying_jiangshi',
        name: '群英降世',
        description: '兵力+888',
        members: ['aobing', 'muzha', 'jinza', 'nezha', 'tuxingsun']
    },
    {
        id: 'huoyan_shijia',
        name: '火焰世家',
        description: '出牌时获得火属性牌点数对应仙元',
        members: ['honghaier', 'niumowang', 'tieshangongzhu']
    },
    {
        id: 'difu_panguan',
        name: '地府判官',
        description: '每关开始时造成所需伤害10%的伤害',
        members: ['yanluowang', 'guiwang', 'heibaiwuchang', 'mengpo']
    },
    {
        id: 'yaochi_xianban',
        name: '瑶池仙班',
        description: '购买天将时，额外获得1点商店经验',
        members: ['wangmu', 'jiutianxiannv', 'change', 'taibaijinxing']
    },
    {
        id: 'baolian_jiumu',
        name: '宝莲救母',
        description: '每关第一次出1张牌时，总伤害×1.5',
        members: ['sanbaishengma', 'chenxiang', 'yangjian']
    },
    {
        id: 'fengshen_zhizheng',
        name: '封神之证',
        description: '仙界商店的刷新费用改为1仙元',
        members: ['jiangziya', 'yangjian', 'leizhenzi_new', 'huangfeihu']
    },
    {
        id: 'fomen_due',
        name: '佛门渡厄',
        description: '每通过一个Boss关卡，所有牌型的等级+1',
        members: ['tangsanzang', 'dizangwangpusa', 'jigong', 'kongquedamingwang']
    },
    {
        id: 'jiuli_zhanshen',
        name: '九黎战神',
        description: '本局游戏每弃牌1次，永久兵力+100',
        members: ['chixu', 'xingtian', 'kuafu']
    }
];

const BOSS_DEBUFFS = [
    {
        id: 'seal_skill',
        name: '技能封印',
        description: '封印天将席位1的天将牌技能',
        effect: function(gameState) {
            if (gameState.generals && gameState.generals.length > 0) {
                return { sealedGeneralSeat: 1 };
            }
            return {};
        }
    },
    {
        id: 'pattern_restriction',
        name: '牌型限制',
        description: '本次Boss战中各类牌型至多允许出1次',
        effect: function(gameState) {
            return { patternRestriction: true };
        }
    },
    {
        id: 'damage_double',
        name: '伤害翻倍',
        description: '将回合所需通关造成的伤害翻倍',
        effect: function(gameState) {
            return { damageMultiplier: 2 };
        }
    },
    {
        id: 'cost_per_card',
        name: '仙元消耗',
        description: '每出一张牌会扣除1仙元',
        effect: function(gameState) {
            return { costPerCard: 1 };
        }
    },
    {
        id: 'forbid_discard',
        name: '禁止弃牌',
        description: '本回合不能使用弃牌',
        effect: function(gameState) {
            return { forbidDiscard: true };
        }
    },
    {
        id: 'must_play_5',
        name: '五张出牌',
        description: '本回合出牌必须出5张牌',
        effect: function(gameState) {
            return { mustPlay5: true };
        }
    },
    {
        id: 'auto_discard',
        name: '自动弃牌',
        description: '出牌后自动弃掉剩余手牌',
        effect: function(gameState) {
            return { autoDiscard: true };
        }
    },
    {
        id: 'element_hand_seal',
        name: '五行封印',
        description: '随机封印一种五行手牌',
        effect: function(gameState) {
            const sealedElement = ELEMENT_KEYS[Math.floor(Math.random() * ELEMENT_KEYS.length)];
            return { sealedElement: sealedElement };
        }
    }
];
