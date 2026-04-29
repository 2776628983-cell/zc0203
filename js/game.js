const ELEMENTS = {
    jin: { name: '金', symbol: '⚔️', color: 'element-jin' },
    mu: { name: '木', symbol: '🌳', color: 'element-mu' },
    shui: { name: '水', symbol: '💧', color: 'element-shui' },
    huo: { name: '火', symbol: '🔥', color: 'element-huo' },
    tu: { name: '土', symbol: '🏔️', color: 'element-tu' }
};

const PATTERNS = {
    sanqi: { name: '散炁凡牌', spiritualPower: 1, description: '非其余任何牌型' },
    shuangshu: { name: '双数同辉', spiritualPower: 5, description: '2张同数字' },
    wuling_huishi: { name: '五灵汇世', spiritualPower: 10, description: '5张不同五行' },
    sancai_juqi: { name: '三才聚气', spiritualPower: 15, description: '3张同数字' },
    yiyuan_tongzong: { name: '一元同宗', spiritualPower: 20, description: '5张同五行' },
    sixiang_zhenyuan: { name: '四象镇元', spiritualPower: 36, description: '4张同数字' },
    tianxu_wulian: { name: '天序五连', spiritualPower: 50, description: '5张连续数字' },
    wuxing_guiyi: { name: '五行归一', spiritualPower: 88, description: '5张同五行+连续数字' },
    wuji_tongzun: { name: '五极同尊', spiritualPower: 100, description: '5张相同数字' }
};

const ELEMENT_KEYS = Object.keys(ELEMENTS);
const SAVE_KEY = 'wuxing_auto_save';
const SAVE_VERSION = 1;

const GAME_CONFIG = {
    levels: {
        maxLevel: 36,
        damage: {
            targets: [
                200,
                450,
                900,
                1800,
                3600,
                7200,
                15000,
                32000,
                68000,
                140000,
                280000,
                560000,
                1000000,
                1800000,
                3200000,
                5500000,
                9500000,
                16000000,
                26000000,
                42000000,
                68000000,
                110000000,
                175000000,
                280000000,
                420000000,
                630000000,
                950000000,
                1400000000,
                2100000000,
                3100000000,
                4500000000,
                6500000000,
                9300000000,
                13000000000,
                18000000000,
                25000000000
            ],
            earlyUntilLevel: 12,
            earlyBaseDamage: 200,
            earlyGrowth: 2,
            lateBaseDamage: 409600,
            lateGrowth: 1.5,
            roundTo: 10
        },
        endless: {
            startAfterLevel: 36,
            growthStages: [
                { untilLevel: 45, growth: 1.35 },
                { untilLevel: 54, growth: 1.45 },
                { untilLevel: 63, growth: 1.55 },
                { untilLevel: Infinity, growth: 1.65 }
            ]
        }
    },
    boss: {
        everyLevels: 3,
        debuffPool: [
            'seal_skill',
            'pattern_restriction',
            'damage_double',
            'cost_per_card',
            'forbid_discard',
            'must_play_5',
            'auto_discard',
            'element_hand_seal'
        ]
    },
    shop: {
        slots: 4,
        maxLevel: 9,
        expPerLevelComplete: 2,
        expExchangeCost: 2,
        expExchangeAmount: 2,
        expToNextLevel: {
            1: 4,
            2: 8,
            3: 12,
            4: 18,
            5: 24,
            6: 32,
            7: 40,
            8: 60
        },
        priceProbabilitiesByLevel: {
            1: [{ price: 1, probability: 1.0 }],
            2: [{ price: 1, probability: 0.75 }, { price: 2, probability: 0.25 }],
            3: [{ price: 1, probability: 0.50 }, { price: 2, probability: 0.35 }, { price: 3, probability: 0.15 }],
            4: [{ price: 1, probability: 0.35 }, { price: 2, probability: 0.40 }, { price: 3, probability: 0.20 }, { price: 4, probability: 0.05 }],
            5: [{ price: 1, probability: 0.25 }, { price: 2, probability: 0.30 }, { price: 3, probability: 0.30 }, { price: 4, probability: 0.12 }, { price: 5, probability: 0.03 }],
            6: [{ price: 1, probability: 0.18 }, { price: 2, probability: 0.25 }, { price: 3, probability: 0.32 }, { price: 4, probability: 0.18 }, { price: 5, probability: 0.07 }],
            7: [{ price: 1, probability: 0.12 }, { price: 2, probability: 0.20 }, { price: 3, probability: 0.30 }, { price: 4, probability: 0.25 }, { price: 5, probability: 0.13 }],
            8: [{ price: 1, probability: 0.08 }, { price: 2, probability: 0.15 }, { price: 3, probability: 0.27 }, { price: 4, probability: 0.32 }, { price: 5, probability: 0.18 }],
            9: [{ price: 1, probability: 0.05 }, { price: 2, probability: 0.10 }, { price: 3, probability: 0.25 }, { price: 4, probability: 0.35 }, { price: 5, probability: 0.25 }]
        }
    },
    generalSlots: {
        baseSlots: 3,
        maxSlots: 8,
        purchaseCosts: {
            4: 8,
            5: 12,
            6: 18,
            7: 26,
            8: 36
        },
        unlockLevels: {
            4: 2,
            5: 5,
            6: 9,
            7: 15,
            8: 21
        }
    }
};

let gameState = {
    phase: 'playing',
    round: 1,
    playCount: 0,
    roundPlayCount: 0,
    discardCount: 0,
    totalDamage: 0,
    handCards: [],
    selectedCards: [],
    deck: [],
    copiedCards: [],
    infiniteDeck: false,
    xianyuan: 10,
    patternStats: {},
    totalPlays: 0,
    effectVolume: 70,
    level: 1,
    maxLevel: GAME_CONFIG.levels.maxLevel,
    levelDamage: GAME_CONFIG.levels.damage.earlyBaseDamage,
    endlessTrial: false,
    levelTransitionBonusesAppliedFor: null,
    lastCompleteConvert: 0,
    lastCompleteInterest: 0,
    skippedLevel: false,
    generals: [],
    treasures: [],
    levelTreasures: [],
    generalSlots: GAME_CONFIG.generalSlots.baseSlots,
    purchasedGeneralSlots: 0,
    maxGeneralSlots: GAME_CONFIG.generalSlots.baseSlots,
    freeGeneralSlotPurchaseCount: 0,
    shopGenerals: [],
    shopTreasures: [],
    shopLevel: 1,
    shopExp: 0,
    shopLocked: false,
    refreshCost: 2,
    basePlayCount: 4,
    baseDiscardCount: 4,
    baseHandCardLimit: 8,
    interestRate: 5,
    maxInterest: 5,
    usedPatterns: [],
    bossDebuff: null,
    bossDebuffId: null,
    pendingBossDebuffId: null,
    isBossLevel: false,
    bossLevelUsedPatterns: [],
    currentGeneralIndex: null,
    hasHuoyanShijia: false,
    hasDifuPanguan: false,
    hasBaolianJiumu: false,
    baolianJiumuSingleCardPlayedThisLevel: false,
    difuPanguanDamage: 0,
    activeBonds: {},
    selectedDivineBeast: null,
    divineBeastEffects: {
        freeRefreshCount: 0
    },
    discardSoldiersBonus: 0,
    jiuliSoldiersBonus: 0,
    chixuAnger: 0,
    huangfeihuSoldiers: 0,
    kuafuSpiritualPower: 0,
    wangmuSpiritualPower: 0,
    jigongObservedLevel: null,
    patternLevels: {}
};

let currentGeneralSlotSceneNumber = null;

function formatPower(value) {
    return value % 1 === 0 ? value : value.toFixed(1);
}

function formatNumber(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number.toLocaleString('en-US') : value;
}

function getPatternSpiritualPower(patternKey) {
    if (!patternKey || !PATTERNS[patternKey]) return 1;
    return PATTERNS[patternKey].spiritualPower * Math.pow(2, getPatternLevel(patternKey) - 1);
}

function normalizeLegacyZhuxianBoostCounts(value) {
    if (Array.isArray(value)) {
        return value.reduce((counts, patternKey) => {
            if (PATTERNS[patternKey]) {
                counts[patternKey] = (counts[patternKey] || 0) + 1;
            }
            return counts;
        }, {});
    }

    if (value && typeof value === 'object') {
        return Object.keys(value).reduce((counts, patternKey) => {
            const count = Number(value[patternKey]) || 0;
            if (PATTERNS[patternKey] && count > 0) {
                counts[patternKey] = count;
            }
            return counts;
        }, {});
    }

    return {};
}

function normalizePatternLevels(levelsValue, legacyBoostValue) {
    const levels = {};

    if (levelsValue && typeof levelsValue === 'object' && !Array.isArray(levelsValue)) {
        Object.keys(levelsValue).forEach(patternKey => {
            const level = Number(levelsValue[patternKey]) || 1;
            if (PATTERNS[patternKey] && level > 1) {
                levels[patternKey] = level;
            }
        });
        return levels;
    }

    const legacyCounts = normalizeLegacyZhuxianBoostCounts(legacyBoostValue);
    Object.keys(legacyCounts).forEach(patternKey => {
        levels[patternKey] = legacyCounts[patternKey] + 1;
    });

    return levels;
}

function getPatternLevel(patternKey) {
    const levels = normalizePatternLevels(
        gameState.patternLevels,
        gameState.zhuxianBoostedPatternCounts || gameState.zhuxianBoostedPatterns
    );
    return levels[patternKey] || 1;
}

function applyZhuxianSijianEffect(boostCount) {
    const patternKeys = Object.keys(PATTERNS);
    const shuffledPatternKeys = [...patternKeys];
    for (let i = shuffledPatternKeys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPatternKeys[i], shuffledPatternKeys[j]] = [shuffledPatternKeys[j], shuffledPatternKeys[i]];
    }

    gameState.patternLevels = normalizePatternLevels(
        gameState.patternLevels,
        gameState.zhuxianBoostedPatternCounts || gameState.zhuxianBoostedPatterns
    );
    const boostedPatterns = shuffledPatternKeys.slice(0, Math.min(boostCount, patternKeys.length));
    boostedPatterns.forEach(patternKey => {
        gameState.patternLevels[patternKey] = (gameState.patternLevels[patternKey] || 1) + 1;
    });

    const boostedNames = boostedPatterns.map(patternKey => PATTERNS[patternKey].name).join('、');
    addMessage(`【诛仙四剑】${boostedNames}的牌型等级提升`, 'info');
}

function applyFomenDueBossClearBonus() {
    if (!gameState.activeBonds?.fomen_due) return;

    gameState.patternLevels = normalizePatternLevels(
        gameState.patternLevels,
        gameState.zhuxianBoostedPatternCounts || gameState.zhuxianBoostedPatterns
    );
    Object.keys(PATTERNS).forEach(patternKey => {
        gameState.patternLevels[patternKey] = (gameState.patternLevels[patternKey] || 1) + 1;
    });

    addMessage('【佛门渡厄】通过Boss关卡，所有牌型等级+1', 'special');
}

function clonePlain(value) {
    return JSON.parse(JSON.stringify(value));
}

function serializeCard(card) {
    if (!card) return null;
    return {
        id: card.id,
        element: card.element,
        number: card.number,
        name: card.name
    };
}

function serializeGeneral(general) {
    if (!general || !general.id) return null;
    return {
        id: general.id,
        star: general.star || 1,
        count: general.count || 1,
        instanceId: general.instanceId || null
    };
}

function serializeTreasure(treasure) {
    if (!treasure || !treasure.id) return null;
    return {
        id: treasure.id,
        instanceId: treasure.instanceId || null
    };
}

function serializeShopGeneral(general) {
    if (!general || !general.id) return null;
    return {
        id: general.id,
        star: general.star || 1
    };
}

function hydrateGeneral(data) {
    if (!data || !GENERALS[data.id]) return null;
    return {
        ...GENERALS[data.id],
        star: data.star || 1,
        count: data.count || 1,
        instanceId: data.instanceId || `general-${data.id}`
    };
}

function hydrateTreasure(data) {
    if (!data || !TREASURES[data.id]) return null;
    return {
        ...TREASURES[data.id],
        instanceId: data.instanceId || `treasure-${data.id}`
    };
}

function hydrateShopGeneral(data) {
    if (!data || !GENERALS[data.id]) return null;
    return {
        ...GENERALS[data.id],
        star: data.star || 1
    };
}

function serializeGameState(state) {
    const bossDebuffId = state.bossDebuffId || (state.bossDebuff && state.bossDebuff.id) || null;

    return {
        version: SAVE_VERSION,
        savedAt: Date.now(),
        state: {
            ...state,
            handCards: state.handCards.map(serializeCard).filter(Boolean),
            selectedCards: state.selectedCards.map(serializeCard).filter(Boolean),
            deck: state.deck.map(serializeCard).filter(Boolean),
            generals: state.generals.map(serializeGeneral).filter(Boolean),
            treasures: state.treasures.map(serializeTreasure).filter(Boolean),
            shopGenerals: state.shopGenerals.map(serializeShopGeneral),
            shopTreasures: [],
            levelTreasures: (state.levelTreasures || []).map(serializeTreasure).filter(Boolean),
            bossDebuffId: bossDebuffId,
            bossDebuff: state.bossDebuff ? clonePlain(state.bossDebuff) : null,
            pendingBossDebuffId: state.pendingBossDebuffId || null,
            currentGeneralIndex: null
        }
    };
}

function hydrateGameState(saveData) {
    if (!saveData || saveData.version !== SAVE_VERSION || !saveData.state) {
        throw new Error('存档版本不兼容');
    }

    const saved = saveData.state;
    const hydrated = {
        ...gameState,
        ...saved,
        handCards: (saved.handCards || []).map(serializeCard).filter(Boolean),
        selectedCards: (saved.selectedCards || []).map(serializeCard).filter(Boolean),
        deck: (saved.deck || []).map(serializeCard).filter(Boolean),
        generals: (saved.generals || []).map(hydrateGeneral).filter(Boolean),
        treasures: (saved.treasures || []).map(hydrateTreasure).filter(Boolean),
        shopGenerals: (saved.shopGenerals || []).map(hydrateShopGeneral),
        shopTreasures: [],
        levelTreasures: (saved.levelTreasures || []).map(hydrateTreasure).filter(Boolean),
        patternLevels: normalizePatternLevels(saved.patternLevels, saved.zhuxianBoostedPatternCounts || saved.zhuxianBoostedPatterns),
        zhuxianBoostedPatternCounts: undefined,
        zhuxianBoostedPatterns: undefined,
        divineBeastEffects: {
            freeRefreshCount: 0,
            ...(saved.divineBeastEffects || {})
        },
        currentGeneralIndex: null
    };

    if (saved.purchasedGeneralSlots === undefined) {
        hydrated.purchasedGeneralSlots = Math.max(
            0,
            (Number(saved.maxGeneralSlots) || GAME_CONFIG.generalSlots.baseSlots) - GAME_CONFIG.generalSlots.baseSlots
        );
    }

    hydrated.generalSlots = GAME_CONFIG.generalSlots.baseSlots;
    hydrated.freeGeneralSlotPurchaseCount = Number(hydrated.freeGeneralSlotPurchaseCount) || 0;
    if (saved.shopLevel === undefined) {
        hydrated.shopLevel = Math.min(
            Math.floor(((Number(saved.level) || 1) - 1) / 3) + 1,
            GAME_CONFIG.shop.maxLevel
        );
    }
    hydrated.shopLevel = Math.max(1, Math.min(Number(hydrated.shopLevel) || 1, GAME_CONFIG.shop.maxLevel));
    hydrated.shopExp = Number(hydrated.shopExp) || 0;

    if (hydrated.bossDebuff) {
        const debuffId = hydrated.bossDebuffId || hydrated.bossDebuff.id;
        const sourceDebuff = BOSS_DEBUFFS.find(debuff => debuff.id === debuffId);
        hydrated.bossDebuffId = debuffId || null;
        if (sourceDebuff) {
            hydrated.bossDebuff = {
                ...hydrated.bossDebuff,
                id: sourceDebuff.id,
                name: sourceDebuff.name,
                description: sourceDebuff.description
            };
        }
    } else {
        hydrated.bossDebuffId = null;
    }

    hydrated.selectedCards = hydrated.selectedCards.filter(selectedCard =>
        hydrated.handCards.some(handCard => handCard.id === selectedCard.id)
    );

    return hydrated;
}

function hasSaveGame() {
    try {
        const data = localStorage.getItem(SAVE_KEY);
        if (!data) return false;
        hydrateGameState(JSON.parse(data));
        return true;
    } catch (error) {
        clearSaveGame();
        return false;
    }
}

function saveGame() {
    if (!gameState.selectedDivineBeast) return;

    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(serializeGameState(gameState)));
        refreshContinueButton();
    } catch (error) {
        console.error('保存游戏失败:', error);
    }
}

function loadGame() {
    const data = localStorage.getItem(SAVE_KEY);
    if (!data) return false;

    try {
        gameState = hydrateGameState(JSON.parse(data));
        restoreGameView();
        
        // 确保三圣母效果已初始化（兼容旧存档）
        const sanbaishengma = gameState.generals.find(g => g.id === 'sanbaishengma');
        if (sanbaishengma && !gameState.sanbaishengmaEffects) {
            initSanbaishengmaEffects(sanbaishengma.star);
        }
        
        addMessage('已读取存档', 'info');
        return true;
    } catch (error) {
        console.error('读取存档失败:', error);
        clearSaveGame();
        alert('存档已损坏，已清除。');
        return false;
    }
}

function clearSaveGame() {
    localStorage.removeItem(SAVE_KEY);
    refreshContinueButton();
}

function createDeck(deckMultiplier = 1) {
    const deck = [];
    let cardId = 0;
    for (let set = 0; set < deckMultiplier; set++) {
        for (let element of ELEMENT_KEYS) {
            for (let num = 1; num <= 10; num++) {
                deck.push({
                    id: `card-${cardId++}`,
                    element: element,
                    number: num,
                    name: `${num}兵力`
                });
            }
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function createInfiniteDeckBatch() {
    const stamp = Date.now();
    return shuffleDeck(createDeck(100)).map((card, index) => ({
        ...card,
        id: `card-infinite-${stamp}-${index}-${Math.random().toString(36).slice(2, 8)}`
    }));
}

function ensureUpcomingDeckCards(count) {
    if (!gameState.infiniteDeck) return;

    while (gameState.deck.length < count) {
        gameState.deck.push(...createInfiniteDeckBatch());
    }
}

function peekUpcomingDeckCards(count) {
    ensureUpcomingDeckCards(count);
    return gameState.deck.slice(0, Math.min(count, gameState.deck.length));
}

function drawUpcomingDeckCards(count) {
    ensureUpcomingDeckCards(count);
    return gameState.deck.splice(0, Math.min(count, gameState.deck.length));
}

function dealCards() {
    const handCardLimit = getHandCardLimit();
    const cardsToDeal = gameState.infiniteDeck ? handCardLimit : Math.min(handCardLimit, gameState.deck.length);
    gameState.handCards = drawUpcomingDeckCards(cardsToDeal);
    addMessage(`第${gameState.round}回合发牌：获得${cardsToDeal}张牌`, 'info');
}

function refillHandCards() {
    const handCardLimit = getHandCardLimit();
    const needed = handCardLimit - gameState.handCards.length;
    if (needed > 0) {
        if (gameState.infiniteDeck || gameState.deck.length > 0) {
            const cardsToDraw = gameState.infiniteDeck ? needed : Math.min(needed, gameState.deck.length);
            const newCards = drawUpcomingDeckCards(cardsToDraw);
            gameState.handCards.push(...newCards);
            addMessage(`从${gameState.infiniteDeck ? '无限卡池' : '卡池'}补充${cardsToDraw}张牌到手牌`, 'info');
        }
    }
}

function autoDiscardAndRefill() {
    if (gameState.bossDebuff && gameState.bossDebuff.autoDiscard && gameState.handCards.length > 0) {
        const cardsToDiscard = gameState.handCards;
        gameState.handCards = [];
        addMessage(`自动弃掉${cardsToDiscard}张手牌`, 'info');
    }
    refillHandCards();
}

function renderPatternStats() {
    const statsGrid = document.getElementById('statsGrid');
    statsGrid.innerHTML = '';
    
    for (let patternKey in PATTERNS) {
        const pattern = PATTERNS[patternKey];
        const count = gameState.patternStats[patternKey] || 0;
        const patternLevel = getPatternLevel(patternKey);
        const patternSpiritualPower = getPatternSpiritualPower(patternKey);
        const isLeveled = patternLevel > 1;
        
        const statsItem = document.createElement('div');
        statsItem.className = `stats-item ${isLeveled ? 'pattern-leveled' : ''}`;
        statsItem.innerHTML = `
            <div class="stats-pattern-level">Lv${patternLevel}</div>
            <div class="stats-pattern-name">${pattern.name}</div>
            <div class="stats-pattern-desc">${pattern.description}</div>
            <div class="stats-pattern-mult">灵力 +${formatPower(patternSpiritualPower)}</div>
            <div class="stats-count">${count} 使用次数</div>
        `;
        statsGrid.appendChild(statsItem);
    }
    
    document.getElementById('totalPlays').textContent = gameState.totalPlays;
    document.getElementById('statsModal').classList.add('show');
}

function renderPatternGuide() {
    const guideGrid = document.getElementById('patternsGuideGrid');
    if (!guideGrid) return;
    
    guideGrid.innerHTML = '';
    
    for (let patternKey in PATTERNS) {
        const pattern = PATTERNS[patternKey];
        const guideItem = document.createElement('div');
        guideItem.className = 'pattern-item';
        guideItem.innerHTML = `
            <div class="pattern-item-name">${pattern.name}</div>
            <div class="pattern-item-desc">${pattern.description}</div>
            <div class="pattern-item-mult">灵力 +${formatPower(pattern.spiritualPower)}</div>
        `;
        guideGrid.appendChild(guideItem);
    }
}

function showStats() {
    renderPatternStats();
}

function hideStats() {
    document.getElementById('statsModal').classList.remove('show');
}

function showImmortals() {
    document.getElementById('immortalsModal').classList.add('show');
    renderImmortals('generals');
}

function hideImmortals() {
    document.getElementById('immortalsModal').classList.remove('show');
}

function showOptions() {
    const optionsModal = document.getElementById('optionsModal');
    optionsModal.classList.add('show');
    
    // 同步音量设置到选项模态框
    const bgMusic = document.getElementById('bgMusic');
    const currentVolume = bgMusic ? Math.round(bgMusic.volume * 100) : 70;
    const currentEffectVolume = gameState.effectVolume !== undefined ? gameState.effectVolume : 70;
    
    // 更新背景音乐音量控制
    const optionsVolumeSlider = optionsModal.querySelector('#volumeSlider');
    const optionsVolumeValue = optionsModal.querySelector('#volumeValue');
    const optionsVolumeIcon = optionsModal.querySelector('#volumeIcon');
    
    if (optionsVolumeSlider) {
        optionsVolumeSlider.value = currentVolume;
    }
    if (optionsVolumeValue) {
        optionsVolumeValue.textContent = currentVolume + '%';
    }
    if (optionsVolumeIcon) {
        if (currentVolume === 0) {
            optionsVolumeIcon.textContent = '🔇';
        } else if (currentVolume < 50) {
            optionsVolumeIcon.textContent = '🔉';
        } else {
            optionsVolumeIcon.textContent = '🔊';
        }
    }
    
    // 更新音效音量控制
    const optionsEffectVolumeSlider = optionsModal.querySelector('#effectVolumeSlider');
    const optionsEffectVolumeValue = optionsModal.querySelector('#effectVolumeValue');
    const optionsEffectVolumeIcon = optionsModal.querySelector('#effectVolumeIcon');
    
    if (optionsEffectVolumeSlider) {
        optionsEffectVolumeSlider.value = currentEffectVolume;
    }
    if (optionsEffectVolumeValue) {
        optionsEffectVolumeValue.textContent = currentEffectVolume + '%';
    }
    if (optionsEffectVolumeIcon) {
        if (currentEffectVolume === 0) {
            optionsEffectVolumeIcon.textContent = '🔇';
        } else if (currentEffectVolume < 50) {
            optionsEffectVolumeIcon.textContent = '🔉';
        } else {
            optionsEffectVolumeIcon.textContent = '🔊';
        }
    }
    
    // 更新音乐选择按钮状态
    const savedMusic = localStorage.getItem('wuxing_bg_music');
    const musicIndex = savedMusic ? parseInt(savedMusic) : 1;
    
    const optionsMusicBtn1 = optionsModal.querySelector('#musicBtn1');
    const optionsMusicBtn2 = optionsModal.querySelector('#musicBtn2');
    
    if (optionsMusicBtn1) {
        optionsMusicBtn1.classList.toggle('active', musicIndex === 1);
    }
    if (optionsMusicBtn2) {
        optionsMusicBtn2.classList.toggle('active', musicIndex === 2);
    }
}

function hideOptions() {
    document.getElementById('optionsModal').classList.remove('show');
}

function confirmNewGame() {
    if (hasSaveGame() && !confirm('开始新游戏会覆盖当前存档，确定要继续吗？')) {
        return;
    }
    clearSaveGame();
    hideOptions();
    hideShop();
    hideImmortals();
    hideStats();
    startNewGame();
    addMessage('已开始新游戏！', 'info');
}

function switchImmortalsTab(tab) {
    const tabs = document.querySelectorAll('.immortals-tab');
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    renderImmortals(tab);
}

function renderImmortals(type) {
    const grid = document.getElementById('immortalsGrid');
    grid.innerHTML = '';
    
    if (type === 'generals') {
        const generalKeys = Object.keys(GENERALS);
        if (generalKeys.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #c9a962; padding: 40px;">暂无天将牌</div>';
        } else {
            const sortedKeys = generalKeys.sort((a, b) => GENERALS[a].price - GENERALS[b].price);
            sortedKeys.forEach(key => {
                const general = GENERALS[key];
                const displayGeneral = { ...general, star: 3 };
                const card = createOwnedGeneralCard(displayGeneral);
                const priceTag = document.createElement('div');
                priceTag.className = 'immortal-price';
                priceTag.innerHTML = `<img class="xianyuan-icon" src="assets/images/ui/仙元.png" alt="仙元" style="width: 16px; height: 16px; vertical-align: middle;"> ${general.price}`;
                card.appendChild(priceTag);
                grid.appendChild(card);
            });
        }
    } else if (type === 'treasures') {
        const treasureKeys = Object.keys(TREASURES);
        if (treasureKeys.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #c9a962; padding: 40px;">暂无宝器牌</div>';
        } else {
            treasureKeys.forEach(key => {
                const treasure = TREASURES[key];
                const card = createOwnedTreasureCard(treasure);
                grid.appendChild(card);
            });
        }
    } else if (type === 'bonds') {
        renderImmortalsBonds();
    } else if (type === 'bossdebuffs') {
        renderImmortalsBossDebuffs();
    }
}

function renderImmortalsBonds() {
    const grid = document.getElementById('immortalsGrid');
    grid.innerHTML = '';
    
    if (BONDS.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #c9a962; padding: 40px;">暂无羁绊</div>';
        return;
    }
    
    BONDS.forEach(bond => {
        const card = document.createElement('div');
        card.className = 'immortal-card';
        
        let membersHTML = '';
        bond.members.forEach(memberId => {
            const general = GENERALS[memberId];
            if (general) {
                membersHTML += `
                    <div class="immortals-bond-member">
                        <div class="immortals-bond-member-symbol">${general.symbol}</div>
                        <div class="immortals-bond-member-name">${general.name}</div>
                    </div>
                `;
            }
        });
        
        card.innerHTML = `
            <div class="immortal-header">
                <div class="immortal-symbol">🔗</div>
                <div class="immortal-info">
                    <div class="immortal-name">${bond.name}</div>
                    <div class="immortal-title">羁绊 · ${bond.members.length}人</div>
                </div>
            </div>
            <div class="immortal-description">${bond.description}</div>
            <div class="immortals-bond-members">
                <div class="immortals-bond-members-title">所需天将</div>
                <div class="immortals-bond-members-grid">${membersHTML}</div>
            </div>
        `;
        card.onclick = () => {
            showBondDetail(bond);
        };
        
        grid.appendChild(card);
    });
}

function renderImmortalsBossDebuffs() {
    const grid = document.getElementById('immortalsGrid');
    grid.innerHTML = '';
    const bossDebuffs = getBossDebuffPool();
    
    if (bossDebuffs.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #c9a962; padding: 40px;">暂无Boss战减益</div>';
        return;
    }
    
    bossDebuffs.forEach(debuff => {
        const card = document.createElement('div');
        card.className = 'immortal-card';
        
        let symbol = '💀';
        switch(debuff.id) {
            case 'seal_skill':
                symbol = '<img src="assets/images/boss_images/金.png" alt="技能封印" style="width: 60px; height: 60px; object-fit: contain;">';
                break;
            case 'pattern_restriction':
                symbol = '<img src="assets/images/boss_images/水.png" alt="牌型限制" style="width: 60px; height: 60px; object-fit: contain;">';
                break;
            case 'damage_double':
                symbol = '<img src="assets/images/boss_images/火.png" alt="伤害翻倍" style="width: 60px; height: 60px; object-fit: contain;">';
                break;
            case 'cost_per_card':
                symbol = '<img src="assets/images/boss_images/土.png" alt="仙元消耗" style="width: 60px; height: 60px; object-fit: contain;">';
                break;
            case 'forbid_discard':
                symbol = '<img src="assets/images/boss_images/木.png" alt="禁止弃牌" style="width: 60px; height: 60px; object-fit: contain;">';
                break;
            case 'must_play_5':
                symbol = '<img src="assets/images/boss_images/雷.png" alt="五张出牌" style="width: 60px; height: 60px; object-fit: contain;">';
                break;
            case 'auto_discard':
                symbol = '<img src="assets/images/boss_images/风.png" alt="自动弃牌" style="width: 60px; height: 60px; object-fit: contain;">';
                break;
            case 'element_hand_seal':
                symbol = '<img src="assets/images/boss_images/电.png" alt="五行封印" style="width: 60px; height: 60px; object-fit: contain;">';
                break;
        }
        
        card.innerHTML = `
            <div class="immortal-header">
                <div class="immortal-symbol">${symbol}</div>
                <div class="immortal-info">
                    <div class="immortal-name">${debuff.name}</div>
                    <div class="immortal-title">Boss战减益</div>
                </div>
            </div>
            <div class="immortal-description">${debuff.description}</div>
        `;
        
        grid.appendChild(card);
    });
}

function renderBonds() {
    const grid = document.getElementById('treasuresTopList');
    grid.innerHTML = '';
    let visibleBondCount = 0;
    
    BONDS.forEach(bond => {
        const ownedCount = bond.members.filter(memberId => 
            gameState.generals.some(g => g.id === memberId)
        ).length;
        
        if (ownedCount === 0) {
            return;
        }
        
        const bondItem = document.createElement('div');
        
        const hasAllMembers = ownedCount === bond.members.length;
        const isActive = hasAllMembers;
        const progressPercent = Math.round((ownedCount / bond.members.length) * 100);

        bondItem.className = `bond-item ${isActive ? 'active' : ''}`;
        
        bondItem.innerHTML = `
            <div class="bond-seal">${isActive ? '契成' : '待合'}</div>
            <div class="bond-name ${isActive ? 'active' : ''}">${bond.name}</div>
            <div class="bond-progress-wrap">
                <span class="bond-progress">${ownedCount}/${bond.members.length}</span>
                <div class="bond-progress-track">
                    <div class="bond-progress-fill" style="width: ${progressPercent}%"></div>
                </div>
            </div>
        `;
        
        bondItem.onclick = () => {
            showBondDetail(bond);
        };
        
        grid.appendChild(bondItem);
        visibleBondCount++;
    });

    if (visibleBondCount === 0) {
        grid.innerHTML = '<div class="bond-empty">尚未结成仙契 · 收集同源天将后显现羁绊</div>';
    }
}

function createOwnedGeneralCard(general) {
    const card = document.createElement('div');
    card.className = 'immortal-card';
    const bondHintsHTML = createGeneralBondHintsHTML(general.id, 'immortal');
    const generalDescription = getGeneralDisplayDescription(general);
    
    let skillsHTML = '';
    for (let star = 1; star <= 3; star++) {
        const skill = general.skills[star];
        const isActive = star <= general.star;
        skillsHTML += `
            <div class="immortal-skill" style="opacity: ${isActive ? 1 : 0.4}">
                <div class="immortal-skill-name">${skill.name} ${isActive ? '✓' : ''}</div>
                <div class="immortal-skill-desc">${skill.description}</div>
            </div>
        `;
    }
    
    let starsHTML = '';
    for (let i = 1; i <= 3; i++) {
        starsHTML += `<span class="star ${i <= general.star ? '' : 'empty'}">★</span>`;
    }
    
    card.innerHTML = `
        <div class="immortal-stars">${starsHTML}</div>
        <div class="immortal-header">
            <div class="immortal-symbol">${general.symbol}</div>
            <div class="immortal-info">
                <div class="immortal-name">${general.name}</div>
                <div class="immortal-title">${general.title || ''}</div>
            </div>
        </div>
        ${generalDescription ? `<div class="immortal-description">${generalDescription}</div>` : ''}
        <div class="immortal-bond-hints">
            <div class="immortal-skill-title">羁绊</div>
            ${bondHintsHTML}
        </div>
        <div class="immortal-skills">
            <div class="immortal-skill-title">技能</div>
            ${skillsHTML}
        </div>
    `;
    
    return card;
}

function getGeneralDisplayDescription(general) {
    const description = (general.description || '').trim();
    return /^【[^】]+】$/.test(description) ? '' : description;
}

function createOwnedTreasureCard(treasure) {
    const card = document.createElement('div');
    card.className = 'immortal-card';
    
    const symbolHTML = treasure.image 
        ? `<img src="${treasure.image}" alt="${treasure.name}" style="width: 60px; height: 60px; object-fit: contain;">`
        : treasure.symbol;
    
    card.innerHTML = `
        <div class="immortal-header">
            <div class="immortal-symbol">${symbolHTML}</div>
            <div class="immortal-info">
                <div class="immortal-name">${treasure.name}</div>
                <div class="immortal-title">宝器</div>
            </div>
        </div>
        <div class="immortal-description">${treasure.description}</div>
    `;
    
    return card;
}

document.getElementById('statsModal').addEventListener('click', function(e) {
    if (e.target === this) {
        hideStats();
    }
});

document.getElementById('immortalsModal').addEventListener('click', function(e) {
    if (e.target === this) {
        hideImmortals();
    }
});

document.getElementById('shopModal').addEventListener('click', function(e) {
    // 商店界面不允许点击外部关闭，只能通过"进入下一关"按钮
});

document.getElementById('generalSlotModal').addEventListener('click', function(e) {
    if (e.target === this) {
        hideGeneralSlotScene();
    }
});

document.getElementById('gameFailModal').addEventListener('click', function(e) {
    if (e.target === this) {
        hideGameFail();
    }
});

document.getElementById('generalDetailModal').addEventListener('click', function(e) {
    if (e.target === this) {
        hideGeneralDetail();
    }
});

document.getElementById('sellGeneralModal').addEventListener('click', function(e) {
    if (e.target === this) {
        hideSellGeneralConfirm();
    }
});

document.getElementById('bondDetailModal').addEventListener('click', function(e) {
    if (e.target === this) {
        hideBondDetail();
    }
});

document.getElementById('settingsModal').addEventListener('click', function(e) {
    if (e.target === this) {
        hideSettings();
    }
});

document.getElementById('optionsModal').addEventListener('click', function(e) {
    if (e.target === this) {
        hideOptions();
    }
});

function showShop() {
    document.getElementById('shopModal').classList.add('show');
    updateShopInfo();
    updateShopLockButton();
    if (gameState.shopGenerals.length === 0) {
        generateShopItems();
    }
    sanitizeShopGenerals();
    renderShopItems('generals');
}

function updateShopLockButton() {
    var lockBtn = document.getElementById('lockShopBtn');
    if (gameState.shopLocked) {
        lockBtn.classList.add('locked');
        lockBtn.textContent = '\uD83D\uDD12 已锁定';
    } else {
        lockBtn.classList.remove('locked');
        lockBtn.textContent = '\uD83D\uDD13 未锁定';
    }
}

function updateMaxGeneralSlots() {
    const config = GAME_CONFIG.generalSlots;
    let slots = config.baseSlots + (gameState.purchasedGeneralSlots || 0);

    gameState.treasures.forEach(t => {
        if (!t.effect) return;
        const effect = t.effect();
        if (effect.generalSlotBonus) {
            slots += effect.generalSlotBonus;
        }
    });

    gameState.generalSlots = config.baseSlots;
    gameState.maxGeneralSlots = Math.min(slots, config.maxSlots);
    console.log(`updateMaxGeneralSlots: maxGeneralSlots=${gameState.maxGeneralSlots}, purchasedGeneralSlots=${gameState.purchasedGeneralSlots || 0}`);
    updateGeneralSeats();
}

function getNextGeneralSlotNumber() {
    return Math.min(gameState.maxGeneralSlots + 1, GAME_CONFIG.generalSlots.maxSlots);
}

function getGeneralSlotPurchaseCost(slotNumber = getNextGeneralSlotNumber()) {
    return GAME_CONFIG.generalSlots.purchaseCosts[slotNumber] ?? null;
}

function getGeneralSlotUnlockLevel(slotNumber = getNextGeneralSlotNumber()) {
    return GAME_CONFIG.generalSlots.unlockLevels[slotNumber] ?? 1;
}

function canBuyGeneralSlot(slotNumber = getNextGeneralSlotNumber()) {
    const cost = getGeneralSlotPurchaseCost(slotNumber);
    const unlockLevel = getGeneralSlotUnlockLevel(slotNumber);
    const hasFreePurchase = (gameState.freeGeneralSlotPurchaseCount || 0) > 0;
    const nextSlotNumber = getNextGeneralSlotNumber();

    if (slotNumber <= gameState.maxGeneralSlots) {
        return { ok: false, reason: '该天将席位已经解封', slotNumber, cost, unlockLevel, hasFreePurchase, unlocked: true, nextSlotNumber };
    }

    if (gameState.maxGeneralSlots >= GAME_CONFIG.generalSlots.maxSlots) {
        return { ok: false, reason: '天将席位已全部开放', slotNumber, cost, unlockLevel, hasFreePurchase, nextSlotNumber };
    }

    if (slotNumber !== nextSlotNumber) {
        return { ok: false, reason: `需先解封天将席位${slotNumber - 1}`, slotNumber, cost, unlockLevel, hasFreePurchase, nextSlotNumber };
    }

    if (gameState.level < unlockLevel) {
        return { ok: false, reason: `${unlockLevel}重天后开放购买`, slotNumber, cost, unlockLevel, hasFreePurchase, nextSlotNumber };
    }

    if (!hasFreePurchase && (cost === null || gameState.xianyuan < cost)) {
        return { ok: false, reason: '仙元不足', slotNumber, cost, unlockLevel, hasFreePurchase, nextSlotNumber };
    }

    return { ok: true, slotNumber, cost, unlockLevel, hasFreePurchase, nextSlotNumber };
}

function getGeneralSlotConditionHTML(slotNumber, state) {
    const previousUnlocked = slotNumber <= GAME_CONFIG.generalSlots.baseSlots || slotNumber <= gameState.maxGeneralSlots + 1;
    const levelReady = gameState.level >= state.unlockLevel;
    const costReady = state.hasFreePurchase || state.cost === null || gameState.xianyuan >= state.cost;
    const costText = state.hasFreePurchase ? '造化玉碟：本次免费' : `${state.cost ?? '-'}仙元`;
    const xianyuanText = state.hasFreePurchase ? '免费解封' : `当前${gameState.xianyuan} / 需要${state.cost ?? '-'}`;
    
    return `
        <div class="general-slot-condition ${previousUnlocked ? 'ready' : 'blocked'}">
            <span class="condition-mark">${previousUnlocked ? '✓' : '×'}</span>
            <span>前置席位：${slotNumber <= GAME_CONFIG.generalSlots.baseSlots ? '初始开放' : `天将席位${slotNumber - 1}${previousUnlocked ? '已解封' : '未解封'}`}</span>
        </div>
        <div class="general-slot-condition ${levelReady ? 'ready' : 'blocked'}">
            <span class="condition-mark">${levelReady ? '✓' : '×'}</span>
            <span>关卡要求：当前${gameState.level}重天 / 需要${state.unlockLevel}重天</span>
        </div>
        <div class="general-slot-condition ${costReady ? 'ready' : 'blocked'}">
            <span class="condition-mark">${costReady ? '✓' : '×'}</span>
            <span>仙元消耗：${costText}（${xianyuanText}）</span>
        </div>
    `;
}

function renderGeneralSlotScene(slotNumber) {
    const state = canBuyGeneralSlot(slotNumber);
    const isUnlocked = slotNumber <= gameState.maxGeneralSlots;
    const hasGeneral = slotNumber <= gameState.generals.length;
    const title = document.getElementById('generalSlotTitle');
    const number = document.getElementById('generalSlotNumber');
    const sealText = document.getElementById('generalSlotSealText');
    const summary = document.getElementById('generalSlotSummary');
    const conditions = document.getElementById('generalSlotConditions');
    const buyBtn = document.getElementById('generalSlotBuyBtn');
    
    if (!title || !number || !sealText || !summary || !conditions || !buyBtn) return;
    
    title.textContent = `天将席位 ${slotNumber}`;
    number.textContent = slotNumber;
    
    if (hasGeneral) {
        const general = gameState.generals[slotNumber - 1];
        sealText.textContent = `${general.name}镇守`;
        summary.innerHTML = `此席位已由 <strong>${general.name}</strong> 镇守。点击席位头像可查看天将详情，也可以拖拽调换席位。`;
        conditions.innerHTML = '<div class="general-slot-condition ready"><span class="condition-mark">✓</span><span>该席位已经完全解封</span></div>';
        buyBtn.style.display = 'none';
        return;
    }
    
    if (isUnlocked) {
        sealText.textContent = '已解封';
        summary.textContent = '此席位已经开启，购买新的天将牌后可以入席。';
        conditions.innerHTML = '<div class="general-slot-condition ready"><span class="condition-mark">✓</span><span>席位已开放，暂无天将镇守</span></div>';
        buyBtn.style.display = 'none';
        return;
    }
    
    sealText.textContent = '封印中';
    summary.textContent = state.ok
        ? '封印松动，仙门已开。消耗仙元后即可增加一个天将席位。'
        : state.reason;
    conditions.innerHTML = getGeneralSlotConditionHTML(slotNumber, state);
    buyBtn.style.display = 'block';
    buyBtn.disabled = !state.ok;
    buyBtn.innerHTML = state.hasFreePurchase
        ? `免费解封席位${slotNumber}`
        : `解封席位${slotNumber}（<img class="xianyuan-icon" src="assets/images/ui/仙元.png" alt="仙元" style="width: 16px; height: 16px; vertical-align: middle;">${state.cost ?? '-'}）`;
}

function showGeneralSlotScene(slotNumber) {
    currentGeneralSlotSceneNumber = slotNumber;
    renderGeneralSlotScene(slotNumber);
    document.getElementById('generalSlotModal').classList.add('show');
}

function hideGeneralSlotScene() {
    document.getElementById('generalSlotModal').classList.remove('show');
    currentGeneralSlotSceneNumber = null;
}

function buyGeneralSlotFromScene() {
    if (!currentGeneralSlotSceneNumber) return;
    buyGeneralSlot(currentGeneralSlotSceneNumber);
}

function buyGeneralSlot(slotNumber = getNextGeneralSlotNumber()) {
    const state = canBuyGeneralSlot(slotNumber);
    if (!state.ok) {
        addMessage(state.reason, 'info');
        if (currentGeneralSlotSceneNumber) renderGeneralSlotScene(currentGeneralSlotSceneNumber);
        return;
    }

    if (state.hasFreePurchase) {
        gameState.freeGeneralSlotPurchaseCount -= 1;
        addMessage(`【造化玉碟】效果已触发，免费开启天将席位${state.slotNumber}`, 'info');
    } else {
        gameState.xianyuan -= state.cost;
        addMessage(`消耗${state.cost}仙元，开启天将席位${state.slotNumber}`, 'info');
    }

    gameState.purchasedGeneralSlots = (gameState.purchasedGeneralSlots || 0) + 1;
    updateMaxGeneralSlots();
    renderShopItems('generals');
    updateShopInfo();
    if (currentGeneralSlotSceneNumber) renderGeneralSlotScene(currentGeneralSlotSceneNumber);
    updateGameInfo();
    saveGame();
}

function hideShop() {
    document.getElementById('shopModal').classList.remove('show');
}

function getShopLevel() {
    return Math.max(1, Math.min(gameState.shopLevel || 1, GAME_CONFIG.shop.maxLevel));
}

function getShopExpToNextLevel(level = getShopLevel()) {
    if (level >= GAME_CONFIG.shop.maxLevel) return null;
    return GAME_CONFIG.shop.expToNextLevel[level] || null;
}

function showShopLevelUpFeedback(level) {
    const shopLevel = document.getElementById('shopLevel');
    const expFill = document.getElementById('shopExpFill');
    const probabilityPanel = document.querySelector('.shop-probability-panel');
    const shopContent = document.querySelector('.shop-content');

    [shopLevel, expFill, probabilityPanel].forEach(element => {
        if (!element) return;
        element.classList.remove('shop-level-up-flash');
        void element.offsetWidth;
        element.classList.add('shop-level-up-flash');
    });

    if (shopContent) {
        const existingToast = shopContent.querySelector('.shop-level-up-toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = 'shop-level-up-toast';
        toast.textContent = `仙界商店升至 Lv${level}，天将价格概率提升`;
        shopContent.appendChild(toast);
        setTimeout(() => toast.remove(), 2200);
    }
}

function addShopExp(amount, reasonText = '') {
    if (getShopLevel() >= GAME_CONFIG.shop.maxLevel) return;

    gameState.shopExp = (gameState.shopExp || 0) + amount;
    if (reasonText) {
        addMessage(`${reasonText}，仙界商店经验+${amount}`, 'info');
    }

    while (getShopLevel() < GAME_CONFIG.shop.maxLevel) {
        const expToNext = getShopExpToNextLevel();
        if (!expToNext || gameState.shopExp < expToNext) break;

        gameState.shopExp -= expToNext;
        gameState.shopLevel = getShopLevel() + 1;
        addMessage(`仙界商店提升至Lv${gameState.shopLevel}，天将价格概率提升`, 'special');
        showShopLevelUpFeedback(gameState.shopLevel);
    }

    if (getShopLevel() >= GAME_CONFIG.shop.maxLevel) {
        gameState.shopExp = 0;
    }
}

function applyYaochiXianbanPurchaseBonus() {
    if (!gameState.activeBonds?.yaochi_xianban) return;
    addShopExp(1, '【瑶池仙班】购买天将');
}

function exchangeShopExp() {
    if (getShopLevel() >= GAME_CONFIG.shop.maxLevel) {
        addMessage('仙界商店已满级，无法继续换取经验', 'info');
        return;
    }

    if (gameState.xianyuan < GAME_CONFIG.shop.expExchangeCost) {
        addMessage('仙元不足，无法换取商店经验', 'info');
        return;
    }

    gameState.xianyuan -= GAME_CONFIG.shop.expExchangeCost;
    addShopExp(GAME_CONFIG.shop.expExchangeAmount, `消耗${GAME_CONFIG.shop.expExchangeCost}仙元`);
    sanitizeShopGenerals();
    renderShopItems('generals');
    updateShopInfo();
    updateGameInfo();
    saveGame();
}

function updateShopExpDisplay() {
    const expText = document.getElementById('shopExpText');
    const expFill = document.getElementById('shopExpFill');
    const exchangeBtn = document.getElementById('exchangeShopExpBtn');
    if (!expText || !expFill) return;

    const shopLevel = getShopLevel();
    const expToNext = getShopExpToNextLevel(shopLevel);
    const isMaxLevel = shopLevel >= GAME_CONFIG.shop.maxLevel;

    if (isMaxLevel || !expToNext) {
        expText.textContent = 'MAX';
        expFill.style.width = '100%';
    } else {
        const currentExp = Math.max(0, gameState.shopExp || 0);
        expText.textContent = `${currentExp}/${expToNext}`;
        expFill.style.width = `${Math.max(0, Math.min(100, (currentExp / expToNext) * 100))}%`;
    }

    if (exchangeBtn) {
        exchangeBtn.disabled = isMaxLevel || gameState.xianyuan < GAME_CONFIG.shop.expExchangeCost;
        exchangeBtn.title = isMaxLevel
            ? '仙界商店已满级'
            : `消耗${GAME_CONFIG.shop.expExchangeCost}仙元换取${GAME_CONFIG.shop.expExchangeAmount}点经验`;
    }
}

function getShopPriceProbabilities() {
    const shopLevel = getShopLevel();
    const configuredProbabilities = GAME_CONFIG.shop.priceProbabilitiesByLevel[shopLevel] ||
        GAME_CONFIG.shop.priceProbabilitiesByLevel[GAME_CONFIG.shop.maxLevel] ||
        [];
    
    return configuredProbabilities.map(item => ({ ...item }));
}

function generateRandomPrice() {
    const probabilities = getShopPriceProbabilities();
    const random = Math.random();
    let cumulativeProbability = 0;
    
    for (const item of probabilities) {
        cumulativeProbability += item.probability;
        if (random <= cumulativeProbability) {
            return item.price;
        }
    }
    
    return 1;
}

function getAllowedShopPrices() {
    return new Set(getShopPriceProbabilities().map(item => item.price));
}

function generateRandomGeneralForCurrentShopLevel() {
    const randomPrice = generateRandomPrice();
    const generalsWithPrice = Object.keys(GENERALS).filter(key => GENERALS[key].price === randomPrice);

    if (generalsWithPrice.length > 0) {
        const randomGeneralKey = generalsWithPrice[Math.floor(Math.random() * generalsWithPrice.length)];
        return {
            ...GENERALS[randomGeneralKey],
            star: 1
        };
    }

    return null;
}

function sanitizeShopGenerals() {
    const allowedPrices = getAllowedShopPrices();
    let changed = false;

    gameState.shopGenerals = (gameState.shopGenerals || [])
        .map(general => {
            if (!general) {
                return null;
            }

            const sourceGeneral = general && GENERALS[general.id];
            if (!sourceGeneral || !allowedPrices.has(sourceGeneral.price)) {
                changed = true;
                return generateRandomGeneralForCurrentShopLevel();
            }

            return {
                ...sourceGeneral,
                star: general.star || 1
            };
        });

    while (gameState.shopGenerals.length < GAME_CONFIG.shop.slots) {
        gameState.shopGenerals.push(null);
        changed = true;
    }

    if (gameState.shopGenerals.length > GAME_CONFIG.shop.slots) {
        gameState.shopGenerals = gameState.shopGenerals.slice(0, GAME_CONFIG.shop.slots);
        changed = true;
    }

    return changed;
}

function updateShopInfo() {
    const shopLevel = getShopLevel();
    const probabilities = getShopPriceProbabilities();
    const freeRefreshCount = gameState.divineBeastEffects?.freeRefreshCount || 0;
    const hasFreeRefresh = freeRefreshCount > 0;
    const normalRefreshCost = gameState.refreshCost === 1 ? 1 : 2;
    
    let probabilityText = probabilities.map(p => `<img class="xianyuan-icon" src="assets/images/ui/仙元.png" alt="仙元" style="width: 16px; height: 16px; vertical-align: middle;">${p.price}（${Math.round(p.probability * 100)}%）`).join('、');
    
    document.getElementById('shopLevel').textContent = `Lv${shopLevel}`;
    document.getElementById('shopProbability').innerHTML = `概率：${probabilityText}`;
    document.getElementById('shopXianyuan').textContent = gameState.xianyuan;
    updateShopExpDisplay();

    document.getElementById('refreshCost').textContent = hasFreeRefresh ? 0 : normalRefreshCost;
    const refreshShopBtn = document.getElementById('refreshShopBtn');
    if (refreshShopBtn) {
        refreshShopBtn.classList.toggle('free-refresh', hasFreeRefresh);
    }

    const freeRefreshBadge = document.getElementById('freeRefreshBadge');
    if (freeRefreshBadge) {
        freeRefreshBadge.textContent = freeRefreshCount > 99 ? '99+' : freeRefreshCount;
        freeRefreshBadge.classList.toggle('show', hasFreeRefresh);
    }

}

function renderLevelCompleteState() {
    document.getElementById('completeLevel').textContent = gameState.level;
    document.getElementById('completeDamage').textContent = formatNumber(gameState.totalDamage);
    
    const maxPlayCount = gameState.basePlayCount + getBonusPlayCount();
    const maxDiscardCount = gameState.baseDiscardCount + getBonusDiscardCount();
    const remainingPlayCount = maxPlayCount - gameState.playCount;
    const remainingDiscardCount = maxDiscardCount - gameState.discardCount;
    const bonusXianyuan = gameState.skippedLevel
        ? 0
        : (gameState.lastCompleteConvert ?? (remainingPlayCount + remainingDiscardCount));
    
    document.getElementById('completeConvert').textContent = bonusXianyuan;
    
    const interest = gameState.lastCompleteInterest ?? Math.min(Math.floor(gameState.xianyuan / 10), gameState.maxInterest);
    document.getElementById('completeInterest').textContent = interest;
    renderNextBossPreview();
    
    if (!gameState.levelTreasures || gameState.levelTreasures.length === 0) {
        generateLevelTreasures();
    }
    renderLevelTreasures();
}

function showLevelComplete() {
    gameState.phase = 'level_complete';
    renderLevelCompleteState();
    
    document.getElementById('levelCompleteModal').classList.add('show');
    saveGame();
}

function hideLevelComplete() {
    document.getElementById('levelCompleteModal').classList.remove('show');
}

function skipLevel() {
    if (gameState.phase !== 'playing' || gameState.isBossLevel) {
        return;
    }
    
    gameState.skippedLevel = true;
    gameState.lastCompleteConvert = 0;
    gameState.lastCompleteInterest = calculateInterest();
    gameState.selectedCards = [];
    gameState.levelTreasures = [];
    gameState.phase = 'level_complete';
    
    addMessage(`跳过${gameState.level}重天，未获得剩余操作转化仙元`, 'info');
    renderHandCards();
    updatePatternPreview();
    updateStatsPreview();
    updateGameInfo();
    updateButtons();
    renderLevelCompleteState();
    saveGame();
    
    document.getElementById('levelCompleteModal').classList.add('show');
}

function renderGameFailState() {
    document.getElementById('failLevel').textContent = gameState.level;
    document.getElementById('failDamage').textContent = formatNumber(gameState.totalDamage);
    document.getElementById('failRequired').textContent = formatNumber(gameState.levelDamage);
    document.getElementById('failPlays').textContent = gameState.totalPlays;
    // 计算收获的仙元（当前仙元 - 初始仙元 + 可能的消耗）
    // 由于仙元有消耗，这里简单显示当前仙元
    document.getElementById('failXianyuan').textContent = gameState.xianyuan;
}

function showGameFail() {
    gameState.phase = 'failed';
    renderGameFailState();
    document.getElementById('gameFailModal').classList.add('show');
    saveGame();
}

function hideGameFail() {
    document.getElementById('gameFailModal').classList.remove('show');
}

function renderTaixuChoiceState() {
    const lineup = document.getElementById('taixuLineup');
    if (!lineup) return;

    lineup.innerHTML = '';

    if (!gameState.generals || gameState.generals.length === 0) {
        lineup.innerHTML = '<div class="taixu-empty-lineup">本次没有上阵天将</div>';
        return;
    }

    gameState.generals.forEach(general => {
        const item = document.createElement('div');
        item.className = 'taixu-general-card';
        item.innerHTML = `
            <div class="taixu-general-portrait">${general.symbol}</div>
            <div class="taixu-general-name">${general.name}</div>
            <div class="taixu-general-star">${'★'.repeat(general.star)}${'☆'.repeat(3 - general.star)}</div>
            <div class="taixu-general-skill">${general.skills[general.star].name}</div>
        `;
        lineup.appendChild(item);
    });
}

function showTaixuChoice() {
    gameState.phase = 'taixu_choice';
    renderTaixuChoiceState();
    document.getElementById('taixuModal').classList.add('show');
    saveGame();
}

function hideTaixuChoice() {
    const modal = document.getElementById('taixuModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function finishGameFromTaixuChoice() {
    hideTaixuChoice();
    localStorage.removeItem(SAVE_KEY);
    refreshContinueButton();
    returnToLogin();
}

function enterTaixuTrial() {
    gameState.endlessTrial = true;
    gameState.phase = 'playing';
    applyLevelTransitionGeneralBonuses();
    hideTaixuChoice();
    addMessage('进入太虚试炼，目标伤害将继续增长。', 'info');
    nextLevel();
}

function generateShopItems() {
    gameState.shopGenerals = [];

    for (let i = 0; i < GAME_CONFIG.shop.slots; i++) {
        const newGeneral = generateRandomGeneralForCurrentShopLevel();
        if (newGeneral) {
            gameState.shopGenerals.push(newGeneral);
        }
    }
}

function generateRandomGeneral() {
    return generateRandomGeneralForCurrentShopLevel();
}

function generateLevelTreasures() {
    const availableTreasures = Object.keys(TREASURES).filter(id => 
        id === 'zhuxian_sijian' || !gameState.treasures.some(t => t.id === id)
    );
    
    gameState.levelTreasures = [];
    
    for (let i = 0; i < 3 && availableTreasures.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * availableTreasures.length);
        const randomTreasureKey = availableTreasures[randomIndex];
        gameState.levelTreasures.push({
            ...TREASURES[randomTreasureKey],
            instanceId: `level-treasure-${Date.now()}-${i}`
        });
        availableTreasures.splice(randomIndex, 1);
    }
}

function renderLevelTreasures() {
    const grid = document.getElementById('levelTreasuresGrid');
    grid.innerHTML = '';
    
    gameState.levelTreasures.forEach((treasure, index) => {
        const item = document.createElement('div');
        item.className = 'level-complete-treasure-item';
        item.onclick = () => selectTreasure(index);
        
        const symbol = treasure.image ? `<img src="${treasure.image}" alt="${treasure.name}" style="width: 60px; height: 60px; object-fit: contain;">` : treasure.symbol;
        
        item.innerHTML = `
            <div class="level-complete-treasure-image">${symbol}</div>
            <div class="level-complete-treasure-name">${treasure.name}</div>
            <div class="level-complete-treasure-desc">${treasure.description}</div>
        `;
        
        grid.appendChild(item);
    });
}

function selectTreasure(index) {
    const treasure = gameState.levelTreasures[index];
    
    gameState.treasures.push({
        ...treasure,
        instanceId: `treasure-${Date.now()}-${index}`
    });
    
    applyTreasureEffect(treasure);
    saveUnlockData('treasure', treasure.id);
    
    addMessage(`免费获得宝器：${treasure.name}`, 'info');
    gameState.levelTreasures = [];
    gameState.phase = 'playing';
    saveGame();
    
    selectTreasureAndNextLevel();
}

function applyTreasureEffect(treasure) {
    const effect = treasure.effect();
    
    if (effect.removeBossDebuff) {
        gameState.hasKaitianShenfu = true;
        addMessage('【开天神斧】效果：将在下一场Boss战中解除封印', 'info');
    }
    
    if (effect.nextGeneralCount) {
        gameState.nextGeneralCountBonus = effect.nextGeneralCount;
        addMessage('【创世青莲】效果：下一次购买天将牌直接获得3张', 'info');
    }
    
    if (effect.nextGeneralSlotPurchaseFree) {
        if (gameState.maxGeneralSlots < GAME_CONFIG.generalSlots.maxSlots) {
            gameState.freeGeneralSlotPurchaseCount = (gameState.freeGeneralSlotPurchaseCount || 0) + 1;
            addMessage('【造化玉碟】效果：下次购买天将席位免费', 'info');
        } else {
            addMessage('【造化玉碟】效果：天将席位已全部开放，无法再获得免费购买', 'info');
        }
    }
    
    if (effect.destroyGenerals) {
        const price3Generals = Object.keys(GENERALS).filter(key => GENERALS[key].price === 3);
        let randomGeneral = null;
        
        if (price3Generals.length > 0) {
            const randomGeneralKey = price3Generals[Math.floor(Math.random() * price3Generals.length)];
            randomGeneral = {
                ...GENERALS[randomGeneralKey],
                star: 2,
                count: 3
            };
        } else {
            randomGeneral = generateRandomGeneral();
            randomGeneral.star = 2;
            randomGeneral.count = 3;
        }

        gameState.generals = [randomGeneral];
        
        addMessage(`【混沌珠】效果：摧毁了所有天将牌，召唤了${randomGeneral.name}（2星）`, 'info');
        updateGeneralSeats();
    }
    
    if (effect.xianyuanMultiplier) {
        const currentXianyuan = gameState.xianyuan;
        const maxBonus = effect.xianyuanMaxBonus || 30;
        const bonusXianyuan = Math.min(currentXianyuan, maxBonus);
        gameState.xianyuan = currentXianyuan + bonusXianyuan;
        addMessage(`【盘古幡】效果：仙元翻倍（${currentXianyuan} → ${gameState.xianyuan}），增加了${bonusXianyuan}仙元`, 'info');
    }
    
    if (effect.interestCapBonus) {
        const oldCap = gameState.maxInterest;
        gameState.maxInterest += effect.interestCapBonus;
        addMessage(`【七宝妙树】效果：利息上限从${oldCap}提升到${gameState.maxInterest}`, 'info');
    }

    if (effect.patternLevelUp || effect.doubleRandomPatternMultipliers) {
        applyZhuxianSijianEffect(effect.patternLevelUp || effect.doubleRandomPatternMultipliers);
        updatePatternPreview();
        updateStatsPreview();
    }
    
    updateGameInfo();
}

function applyLevelTransitionGeneralBonuses() {
    if (gameState.levelTransitionBonusesAppliedFor === gameState.level) {
        return;
    }

    // 检查黄飞虎是否上阵，每通过一关增加基础兵力
    const huangfeihuGeneral = gameState.generals.find(g => g.id === 'huangfeihu');
    if (huangfeihuGeneral) {
        const huangfeihuSkill = huangfeihuGeneral.skills[huangfeihuGeneral.star];
        const skillResult = huangfeihuSkill.effect();
        if (skillResult && skillResult.levelBonusSoldiers) {
            gameState.huangfeihuSoldiers = (gameState.huangfeihuSoldiers || 0) + skillResult.levelBonusSoldiers;
            addMessage(`【${huangfeihuSkill.name}】效果已触发！每通过一关，基础兵力永久+${skillResult.levelBonusSoldiers}，当前累计+${gameState.huangfeihuSoldiers}`, 'info');
        }
    }
    
    // 检查夸父是否上阵，每通过一关增加基础灵力
    const kuafuGeneral = gameState.generals.find(g => g.id === 'kuafu');
    if (kuafuGeneral) {
        const kuafuSkill = kuafuGeneral.skills[kuafuGeneral.star];
        const skillResult = kuafuSkill.effect();
        if (skillResult && skillResult.levelBonusSpiritualPower) {
            gameState.kuafuSpiritualPower = (gameState.kuafuSpiritualPower || 0) + skillResult.levelBonusSpiritualPower;
            addMessage(`【${kuafuSkill.name}】效果已触发！每通过一关，基础灵力永久+${skillResult.levelBonusSpiritualPower}，当前累计+${gameState.kuafuSpiritualPower}`, 'info');
        }
    }

    gameState.levelTransitionBonusesAppliedFor = gameState.level;
}

function selectTreasureAndNextLevel() {
    applyLevelTransitionGeneralBonuses();
    
    hideLevelComplete();
    nextLevel();
}

function applyWangmuShopRefreshBonus() {
    const wangmuGeneral = gameState.generals.find(g => g.id === 'wangmu');
    if (!wangmuGeneral) return;

    const wangmuSkill = wangmuGeneral.skills[wangmuGeneral.star];
    const skillResult = wangmuSkill.effect();
    if (skillResult && skillResult.shopRefreshSpiritualPower) {
        gameState.wangmuSpiritualPower = (gameState.wangmuSpiritualPower || 0) + skillResult.shopRefreshSpiritualPower;
        addMessage(`【${wangmuSkill.name}】效果已触发！刷新仙界商店，基础灵力永久+${skillResult.shopRefreshSpiritualPower}，当前累计+${gameState.wangmuSpiritualPower}`, 'info');
    }
}

function grantBaihuFreeRefresh() {
    if (!gameState.divineBeastEffects) {
        gameState.divineBeastEffects = { freeRefreshCount: 0 };
    }

    gameState.divineBeastEffects.freeRefreshCount = (gameState.divineBeastEffects.freeRefreshCount || 0) + 1;
    addMessage(`【白虎之力】获得1次免费刷新机会，当前可免费刷新${gameState.divineBeastEffects.freeRefreshCount}次`, 'info');
    updateShopInfo();
}

function renderShopItems(type) {
    const grid = document.getElementById('shopGrid');
    grid.innerHTML = '';

    sanitizeShopGenerals();
    for (let index = 0; index < 4; index++) {
        const general = gameState.shopGenerals[index] || null;
        const item = createShopGeneralItem(general, index);
        grid.appendChild(item);
    }
}

function getGeneralBondNames(generalId) {
    return getGeneralBonds(generalId).map(bond => bond.name);
}

function getGeneralBonds(generalId) {
    return BONDS.filter(bond => bond.members.includes(generalId));
}

function createGeneralBondHintsHTML(generalId, variant = 'shop') {
    const bonds = getGeneralBonds(generalId);
    if (bonds.length === 0) {
        return '<div class="general-bond-empty">暂无羁绊</div>';
    }

    return bonds.map(bond => `
        <div class="general-bond-hint ${variant === 'shop' ? 'shop-bond-hint' : 'immortal-bond-hint'}">
            <div class="general-bond-hint-name">${bond.name}</div>
        </div>
    `).join('');
}

function createShopGeneralItem(general, index) {
    const item = document.createElement('div');
    if (!general) {
        item.className = 'shop-item shop-item-empty';
        item.innerHTML = '<div class="shop-empty-text">已售出</div>';
        return item;
    }

    item.className = `shop-item price-${general.price}`;
    
    const canAfford = gameState.xianyuan >= general.price;
    const existingGeneral = gameState.generals.find(g => g.id === general.id);
    const canEquip = existingGeneral || gameState.generals.length < gameState.maxGeneralSlots;
    
    console.log(`商店商品 ${general.name}: canAfford=${canAfford}, canEquip=${canEquip}, generals.length=${gameState.generals.length}, maxGeneralSlots=${gameState.maxGeneralSlots}`);
    
    if (!canAfford || !canEquip) {
        item.classList.add('disabled');
    }
    
    item.onclick = () => {
        if (canAfford && canEquip) {
            buyGeneral(index);
        }
    };
    
    const skill = general.skills[1];
    const bondHintsHTML = createGeneralBondHintsHTML(general.id, 'shop');
    
    item.innerHTML = `
        <div class="immortal-price"><img class="xianyuan-icon" src="assets/images/ui/仙元.png" alt="仙元" style="width: 16px; height: 16px; vertical-align: middle;"> ${general.price}</div>
        <div class="shop-card-header">
            <div class="shop-card-symbol">${general.symbol}</div>
            <div class="shop-card-info">
                <div class="shop-card-name">${general.name}</div>
                <div class="shop-card-title">${general.title || ''}</div>
            </div>
        </div>
        <div class="shop-card-panels">
            <div class="shop-card-panel shop-card-bond-panel">
                <div class="shop-card-panel-title">羁绊</div>
                <div class="shop-card-bond-name">${bondHintsHTML}</div>
            </div>
            <div class="shop-card-panel shop-card-skill-panel">
                <div class="shop-card-panel-title">技能</div>
                <div class="immortal-skill">
                    <div class="immortal-skill-name">${skill.name}</div>
                    <div class="immortal-skill-desc">${skill.description}</div>
                </div>
            </div>
        </div>
    `;
    
    return item;
}

function toggleShopLock() {
    gameState.shopLocked = !gameState.shopLocked;
    var lockBtn = document.getElementById('lockShopBtn');

    if (gameState.shopLocked) {
        lockBtn.classList.add('locked');
        lockBtn.textContent = '\uD83D\uDD12 已锁定';
        addMessage('商店已锁定，通关后商店卡池将保留', 'info');
    } else {
        lockBtn.classList.remove('locked');
        lockBtn.textContent = '\uD83D\uDD13 未锁定';
        addMessage('商店已解锁，通关后商店将刷新', 'info');
    }
    saveGame();
}

function buyGeneral(index) {
    const general = gameState.shopGenerals[index];
    if (!general) return;

    const existingGeneral = gameState.generals.find(g => g.id === general.id);
    const canEquip = existingGeneral || gameState.generals.length < gameState.maxGeneralSlots;
    
    console.log(`尝试购买 ${general.name}: canEquip=${canEquip}, generals.length=${gameState.generals.length}, maxGeneralSlots=${gameState.maxGeneralSlots}, xianyuan=${gameState.xianyuan}, price=${general.price}`);
    
    if (gameState.xianyuan >= general.price && canEquip) {
        gameState.xianyuan -= general.price;
        
        let addCount = 1;
        
        if (gameState.nextGeneralCountBonus && gameState.nextGeneralCountBonus > 1) {
            addCount = gameState.nextGeneralCountBonus;
            gameState.nextGeneralCountBonus = null;
            addMessage(`【创世青莲】效果已触发！`, 'info');
        }
        
        // 姜子牙效果：购买天将牌时有概率多获得一张
        const jiangziyaGeneral = gameState.generals.find(g => g.id === 'jiangziya');
        if (jiangziyaGeneral && general.id !== 'jiangziya') {
            const jiangziyaSkill = jiangziyaGeneral.skills[jiangziyaGeneral.star];
            const jiangziyaEffect = jiangziyaSkill.effect();
            if (jiangziyaEffect && jiangziyaEffect.buyChance) {
                const chance = jiangziyaEffect.buyChance;
                const random = Math.random();
                if (random < chance) {
                    addCount += 1;
                    addMessage(`【${jiangziyaSkill.name}】效果已触发！额外获得一张天将牌`, 'info');
                }
            }
        }

        if (existingGeneral) {
            if (!existingGeneral.count) existingGeneral.count = 1;
            existingGeneral.count += addCount;
            
            let newStar = 1;
            if (existingGeneral.count >= 9) newStar = 3;
            else if (existingGeneral.count >= 3) newStar = 2;
            
            if (newStar > existingGeneral.star) {
                existingGeneral.star = newStar;
                addMessage(`天将${general.name}升星至${existingGeneral.star}星！(当前数量: ${existingGeneral.count})`, 'info');
                
                // 如果升星的是三圣母，重新初始化宝莲赐福效果
                if (general.id === 'sanbaishengma') {
                    initSanbaishengmaEffects(newStar);
                }
                
                if (general.id === 'xihe') {
                    if (newStar === 3) {
                        gameState.deck = shuffleDeck(createDeck(100));
                        gameState.infiniteDeck = true;
                        addMessage('【羲和·神】卡池中存在无限套五行牌', 'info');
                    } else if (newStar === 2) {
                        gameState.deck = shuffleDeck(createDeck(3));
                        gameState.infiniteDeck = false;
                        addMessage('【羲和·强】卡池中增加两套五行牌（共150张）', 'info');
                    }
                    updateGameInfo();
                }
            } else {
                addMessage(`购买天将牌：${general.name} (当前数量: ${existingGeneral.count}/3/9)`, 'info');
            }
        } else {
            let startStar = addCount >= 3 ? 2 : 1;
            
            gameState.generals.push({
                ...general,
                count: addCount,
                star: startStar,
                instanceId: `general-${Date.now()}-${index}`
            });
            addMessage(`购买天将牌：${general.name} (初始星级: ${startStar}星)`, 'info');
            
            // 如果购买的是三圣母，初始化宝莲赐福效果
            if (general.id === 'sanbaishengma') {
                initSanbaishengmaEffects(startStar);
            }
            
            console.log(`购买成功，当前generals数组:`, gameState.generals);
        }
        
        saveUnlockData('general', general.id);
        
        gameState.shopGenerals[index] = null;
        renderShopItems('generals');
        updateShopInfo();
        updateGameInfo();
        updateGeneralSeats();
        activateBondEffects();
        applyYaochiXianbanPurchaseBonus();
        renderBonds();

        if (general.id === 'bailongma') {
            const skill = general.skills[existingGeneral ? existingGeneral.star : (addCount >= 3 ? 2 : 1)];
            const skillResult = skill.effect();
            if (skillResult && skillResult.handCardLimitBonus) {
                const cardsToDraw = skillResult.handCardLimitBonus;
                if (cardsToDraw > 0 && gameState.deck.length > 0) {
                    const actualDraw = Math.min(cardsToDraw, gameState.deck.length);
                    const newCards = gameState.deck.splice(0, actualDraw);
                    gameState.handCards.push(...newCards);
                    addMessage(`【龙马精神】效果：立即补充${actualDraw}张牌到手牌`, 'info');
                    renderHandCards();
                    updateGameInfo();
                }
            }
        }
        
        if (general.id === 'xihe') {
            const currentGeneral = gameState.generals.find(g => g.id === 'xihe');
            const currentStar = currentGeneral.star;
            
            if (currentStar === 3) {
                gameState.deck = shuffleDeck(createDeck(100));
                gameState.infiniteDeck = true;
                addMessage('【羲和·神】卡池中存在无限套五行牌', 'info');
            } else if (currentStar === 2) {
                gameState.deck = shuffleDeck(createDeck(3));
                gameState.infiniteDeck = false;
                addMessage('【羲和·强】卡池中增加两套五行牌（共150张）', 'info');
            } else if (currentStar === 1) {
                gameState.deck = shuffleDeck(createDeck(2));
                gameState.infiniteDeck = false;
                addMessage('【羲和】卡池中增加一套五行牌（共100张）', 'info');
            }
            updateGameInfo();
        }
        saveGame();
    }
}

function buyTreasure(index) {
    const treasure = gameState.shopTreasures[index];
    if (gameState.xianyuan >= treasure.price) {
        gameState.xianyuan -= treasure.price;
        gameState.treasures.push({
            ...treasure,
            instanceId: `treasure-${Date.now()}-${index}`
        });
        saveUnlockData('treasure', treasure.id);
        applyTreasureEffect(treasure);
        updateMaxGeneralSlots();
        
        gameState.shopTreasures.splice(index, 1);
        renderShopItems('treasures');
        updateShopInfo();
        updateGameInfo();
        addMessage(`购买宝器牌：${treasure.name} (效果持续至下次进店)`, 'info');
        saveGame();
    }
}

function nextLevel() {
    hideLevelComplete();
    startNewLevel();
}

function isBossLevel(level) {
    return level % GAME_CONFIG.boss.everyLevels === 0;
}

function getNextBossLevelAfter(level) {
    if (gameState.endlessTrial && level >= GAME_CONFIG.levels.endless.startAfterLevel) {
        const remainder = level % GAME_CONFIG.boss.everyLevels;
        return remainder === 0
            ? level + GAME_CONFIG.boss.everyLevels
            : level + (GAME_CONFIG.boss.everyLevels - remainder);
    }

    for (let nextLevel = level + 1; nextLevel <= GAME_CONFIG.levels.maxLevel; nextLevel++) {
        if (isBossLevel(nextLevel)) return nextLevel;
    }
    return null;
}

function calculateLevelDamage(level) {
    const damageConfig = GAME_CONFIG.levels.damage;

    if (Array.isArray(damageConfig.targets) && damageConfig.targets[level - 1] != null) {
        return damageConfig.targets[level - 1];
    }

    if (level > GAME_CONFIG.levels.endless.startAfterLevel) {
        return calculateEndlessLevelDamage(level);
    }
    
    if (level <= damageConfig.earlyUntilLevel) {
        return damageConfig.earlyBaseDamage * Math.pow(damageConfig.earlyGrowth, level - 1);
    }
    
    const levelOffset = level - damageConfig.earlyUntilLevel;
    const rawDamage = damageConfig.lateBaseDamage * Math.pow(damageConfig.lateGrowth, levelOffset);
    return Math.floor(rawDamage / damageConfig.roundTo) * damageConfig.roundTo;
}

function getEndlessDamageGrowth(level) {
    const stage = GAME_CONFIG.levels.endless.growthStages.find(stageConfig => level <= stageConfig.untilLevel);
    return stage ? stage.growth : 1.65;
}

function calculateEndlessLevelDamage(level) {
    const startLevel = GAME_CONFIG.levels.endless.startAfterLevel;
    const targets = GAME_CONFIG.levels.damage.targets || [];
    let damage = targets[startLevel - 1] || calculateLevelDamage(startLevel);

    for (let currentLevel = startLevel + 1; currentLevel <= level; currentLevel++) {
        damage = Math.floor(damage * getEndlessDamageGrowth(currentLevel));
    }

    return damage;
}

function getBossDebuffPool() {
    return GAME_CONFIG.boss.debuffPool
        .map(debuffId => BOSS_DEBUFFS.find(debuff => debuff.id === debuffId))
        .filter(Boolean);
}

function getRandomBossDebuff() {
    const debuffPool = getBossDebuffPool();
    if (debuffPool.length === 0) return null;
    return debuffPool[Math.floor(Math.random() * debuffPool.length)];
}

function getBossDebuffById(debuffId) {
    return BOSS_DEBUFFS.find(debuff => debuff.id === debuffId) || null;
}

function prepareNextBossPreview() {
    const nextBossLevel = getNextBossLevelAfter(gameState.level);
    if (!nextBossLevel) {
        gameState.pendingBossDebuffId = null;
        return null;
    }

    const distance = nextBossLevel - gameState.level;
    
    if (gameState.hasKaitianShenfu) {
        gameState.pendingBossDebuffId = null;
        return {
            level: nextBossLevel,
            distance,
            name: 'Boss战 · 封印解除',
            description: '开天神斧将在这场Boss战中解除封印',
            imagePath: 'assets/images/boss_images/异类神.png'
        };
    }
    
    let debuff = getBossDebuffById(gameState.pendingBossDebuffId);
    if (!debuff) {
        debuff = getRandomBossDebuff();
        gameState.pendingBossDebuffId = debuff ? debuff.id : null;
    }
    
    if (!debuff) return null;
    
    return {
        level: nextBossLevel,
        distance,
        name: `Boss战 · ${debuff.name}`,
        description: debuff.description,
        imagePath: getBossDebuffAvatarPath(debuff)
    };
}

function renderNextBossPreview() {
    const preview = prepareNextBossPreview();
    const previewEl = document.getElementById('nextBossPreview');
    if (!previewEl) return;
    
    if (!preview) {
        previewEl.style.display = 'none';
        return;
    }
    
    document.getElementById('nextBossAvatar').innerHTML = `<img src="${preview.imagePath}" alt="${preview.name}">`;
    document.getElementById('nextBossKicker').textContent = preview.distance === 1
        ? '下一重天遭遇'
        : `将在${preview.distance}重天后遭遇`;
    document.getElementById('nextBossName').textContent = `${preview.level}重天 ${preview.name}`;
    document.getElementById('nextBossDesc').textContent = preview.description;
    previewEl.style.display = 'flex';
}

function startNewLevel() {
    gameState.phase = 'playing';
    gameState.level++;
    gameState.isBossLevel = isBossLevel(gameState.level);
    gameState.skippedLevel = false;
    gameState.lastCompleteConvert = 0;
    gameState.lastCompleteInterest = 0;
    gameState.levelDamage = calculateLevelDamage(gameState.level);
    
    gameState.bossDebuff = null;
    gameState.bossDebuffId = null;
    gameState.levelTreasures = [];
    
    if (gameState.isBossLevel) {
        if (gameState.hasKaitianShenfu) {
            gameState.hasKaitianShenfu = false;
            gameState.pendingBossDebuffId = null;
            addMessage('【开天神斧】效果已触发！本关无Boss封印', 'info');
            hideBossDebuffDisplay();
        } else {
            const randomDebuff = getBossDebuffById(gameState.pendingBossDebuffId) || getRandomBossDebuff();
            gameState.pendingBossDebuffId = null;
            if (randomDebuff) {
                gameState.bossDebuffId = randomDebuff.id;
                gameState.bossDebuff = {
                    ...randomDebuff.effect(gameState),
                    id: randomDebuff.id,
                    name: randomDebuff.name,
                    description: randomDebuff.description
                };
                let bossMessage = `进入${gameState.level}重天（Boss战）：${randomDebuff.name} - ${randomDebuff.description}`;
                if (gameState.bossDebuff.sealedElement) {
                    bossMessage += `（封印：${ELEMENTS[gameState.bossDebuff.sealedElement].name}）`;
                }
                addMessage(bossMessage, 'info');
                if (gameState.bossDebuff.damageMultiplier) {
                    gameState.levelDamage *= gameState.bossDebuff.damageMultiplier;
                    addMessage(`目标伤害被翻倍了！`, 'info');
                }
                updateBossDebuffDisplay(gameState.bossDebuff);
            } else {
                addMessage(`进入${gameState.level}重天（Boss战）：暂无减益`, 'info');
                hideBossDebuffDisplay();
            }
        }
    } else {
        addMessage(`进入${gameState.level}重天`, 'info');
        hideBossDebuffDisplay();
    }
    
    // 三圣母宝莲赐福效果 - 每一关重新随机
    const sanbaishengma = gameState.generals.find(g => g.id === 'sanbaishengma');
    if (sanbaishengma) {
        initSanbaishengmaEffects(sanbaishengma.star);
    }
    
    gameState.round = gameState.level;
    gameState.playCount = 0;
    gameState.roundPlayCount = 0;
    gameState.discardCount = 0;
    gameState.discardSoldiersBonus = 0;
    gameState.baolianJiumuSingleCardPlayedThisLevel = false;
    gameState.totalDamage = 0;
    gameState.handCards = [];
    gameState.selectedCards = [];
    
    gameState.hasHuoyanShijia = false;
    gameState.hasDifuPanguan = false;
    gameState.hasBaolianJiumu = false;
    gameState.difuPanguanDamage = 0;
    
    let deckMultiplier = 1;
    let infiniteDeck = false;
    
    for (let general of gameState.generals) {
        if (general.id === 'xihe') {
            if (general.star === 3) {
                infiniteDeck = true;
            } else if (general.star === 2) {
                deckMultiplier = Math.max(deckMultiplier, 3);
            } else if (general.star === 1) {
                deckMultiplier = Math.max(deckMultiplier, 2);
            }
        }
    }
    
    if (infiniteDeck) {
        gameState.deck = shuffleDeck(createDeck(100));
        gameState.infiniteDeck = true;
        addMessage('【羲和·神】卡池中存在无限套五行牌', 'info');
    } else if (deckMultiplier > 1) {
        gameState.deck = shuffleDeck(createDeck(deckMultiplier));
        gameState.infiniteDeck = false;
        addMessage(`【羲和】卡池中增加${deckMultiplier - 1}套五行牌（共${deckMultiplier * 50}张）`, 'info');
    } else {
        gameState.deck = shuffleDeck(createDeck(deckMultiplier));
        gameState.infiniteDeck = false;
    }
    
    gameState.usedPatterns = [];
    gameState.bossLevelUsedPatterns = [];
    gameState.riyueTongtianTriggered = false;

    if (gameState.selectedDivineBeast === 'baihu') {
        grantBaihuFreeRefresh();
    }

    if (!gameState.shopLocked) {
        gameState.shopGenerals = [];
        generateShopItems();
    }

    gameState.activeBonds = {};

    activateBondEffects();
    renderBonds();
    
    if (gameState.hasDifuPanguan) {
        gameState.difuPanguanDamage = Math.floor(gameState.levelDamage * 0.1);
        gameState.totalDamage += gameState.difuPanguanDamage;
        addMessage(`【地府判官】每关开始造成${formatNumber(gameState.difuPanguanDamage)}点伤害（10%）`, 'info');
    }
    
    dealCards();
    renderHandCards();
    updatePatternPreview();
    updateGameInfo();
    updateButtons();
    updateMaxGeneralSlots();
    updateGeneralSeats();
    
    addMessage(`本关需要造成${formatNumber(gameState.levelDamage)}点伤害`, 'info');
    saveGame();
}

function updateGeneralSeats() {
    console.log(`updateGeneralSeats被调用: generals.length=${gameState.generals.length}, maxGeneralSlots=${gameState.maxGeneralSlots}`);
    
    for (let i = 1; i <= 8; i++) {
        const seat = document.getElementById(`generalSeat${i}`);
        if (!seat) continue;
        
        seat.classList.remove('sealed');
        seat.classList.remove('unlocked-empty');
        seat.onclick = null;
        const slot = seat.querySelector('.seat-slot');
        
        console.log(`检查席位${i}: seat存在=${!!seat}, slot存在=${!!slot}`);
        
        if (i <= gameState.maxGeneralSlots) {
            if (i <= gameState.generals.length) {
                const general = gameState.generals[i - 1];
                const skill = general.skills[general.star];
                const starText = '★'.repeat(Math.max(1, Math.min(general.star || 1, 3)));
                
                console.log(`席位${i}: 显示天将 ${general.name}, symbol=${general.symbol}`);
                
                slot.innerHTML = `
                    <div class="seat-general-card">
                        <div class="seat-general-symbol-only">${general.symbol}</div>
                        <div class="seat-general-stars" aria-label="${general.star}星">${starText}</div>
                    </div>
                `;
                slot.classList.add('occupied');
                slot.style.cursor = 'grab';
                slot.draggable = true;
                slot.dataset.seatIndex = i - 1;
                
                slot.ondragstart = (e) => {
                    e.dataTransfer.setData('text/plain', i - 1);
                    slot.style.cursor = 'grabbing';
                    slot.classList.add('dragging');
                };
                
                slot.ondragend = () => {
                    slot.style.cursor = 'grab';
                    slot.classList.remove('dragging');
                };
                
                slot.ondragover = (e) => {
                    e.preventDefault();
                    slot.classList.add('drag-over');
                };
                
                slot.ondragleave = () => {
                    slot.classList.remove('drag-over');
                };
                
                slot.ondrop = (e) => {
                    e.preventDefault();
                    slot.classList.remove('drag-over');
                    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                    const toIndex = i - 1;
                    
                    if (fromIndex !== toIndex && fromIndex >= 0 && fromIndex < gameState.generals.length) {
                        swapGenerals(fromIndex, toIndex);
                    }
                };
                
                slot.onclick = null;
                seat.onclick = () => showGeneralDetail(i - 1);
            } else {
                console.log(`席位${i}: 空位`);
                slot.innerHTML = '空位';
                slot.classList.remove('occupied');
                seat.classList.add('unlocked-empty');
                slot.style.cursor = 'pointer';
                slot.draggable = false;
                slot.dataset.seatIndex = '';
                slot.ondragstart = null;
                slot.ondragend = null;
                slot.ondragover = null;
                slot.ondragleave = null;
                slot.ondrop = null;
                slot.onclick = null;
                seat.onclick = () => showGeneralSlotScene(i);
            }
        } else {
            console.log(`席位${i}: 封印`);
            seat.classList.add('sealed');
            slot.innerHTML = '封印';
            slot.classList.remove('occupied');
            slot.style.cursor = 'pointer';
            slot.draggable = false;
            slot.dataset.seatIndex = '';
            slot.ondragstart = null;
            slot.ondragend = null;
            slot.ondragover = null;
            slot.ondragleave = null;
            slot.ondrop = null;
            slot.onclick = null;
            seat.onclick = () => showGeneralSlotScene(i);
        }
    }
}

function swapGenerals(fromIndex, toIndex) {
    if (fromIndex < 0 || fromIndex >= gameState.generals.length || 
        toIndex < 0 || toIndex >= gameState.generals.length) {
        return;
    }
    
    const temp = gameState.generals[fromIndex];
    gameState.generals[fromIndex] = gameState.generals[toIndex];
    gameState.generals[toIndex] = temp;
    
    const fromGeneral = gameState.generals[fromIndex];
    const toGeneral = gameState.generals[toIndex];
    
    addMessage(`天将席位已更换：${fromGeneral.name} ↔ ${toGeneral.name}`, 'info');
    
    updateGeneralSeats();
    saveGame();
    
    setTimeout(() => {
        const fromSeat = document.getElementById(`generalSeat${fromIndex + 1}`);
        const toSeat = document.getElementById(`generalSeat${toIndex + 1}`);
        
        if (fromSeat) {
            const fromSlot = fromSeat.querySelector('.seat-slot');
            if (fromSlot) {
                fromSlot.classList.add('swap-highlight');
                setTimeout(() => fromSlot.classList.remove('swap-highlight'), 1000);
            }
        }
        
        if (toSeat) {
            const toSlot = toSeat.querySelector('.seat-slot');
            if (toSlot) {
                toSlot.classList.add('swap-highlight');
                setTimeout(() => toSlot.classList.remove('swap-highlight'), 1000);
            }
        }
    }, 50);
}

function getCardDisplayName(card) {
    if (!card || !ELEMENTS[card.element]) return '未知牌';
    return `${ELEMENTS[card.element].name}${card.number}兵力`;
}

function getJigongObserveCount(general) {
    if (!general || general.id !== 'jigong') return 0;

    const skill = general.skills[general.star];
    const effect = skill.effect();
    return effect && effect.deckObserveCount ? effect.deckObserveCount : 0;
}

function renderJigongObservedCards(cards) {
    const panel = document.getElementById('deckObservePanel');
    if (!panel) return;

    if (!cards.length) {
        panel.innerHTML = '<div class="deck-observe-empty">卡池已空，暂无可观测的牌</div>';
        panel.classList.add('show');
        return;
    }

    const cardsHTML = cards.map((card, index) => `
        <div class="deck-observe-card element-${card.element}">
            <div class="deck-observe-order">${index + 1}</div>
            <div class="deck-observe-element">${ELEMENTS[card.element].name}</div>
            <div class="deck-observe-number">${card.number}</div>
            <div class="deck-observe-name">${getCardDisplayName(card)}</div>
        </div>
    `).join('');

    panel.innerHTML = `
        <div class="deck-observe-title">后续补牌</div>
        <div class="deck-observe-cards">${cardsHTML}</div>
    `;
    panel.classList.add('show');
}

function updateJigongObserveControls(general, keepPanel = false) {
    const observeBtn = document.getElementById('observeDeckBtn');
    const observePanel = document.getElementById('deckObservePanel');
    if (!observeBtn || !observePanel) return;

    if (!keepPanel) {
        observePanel.innerHTML = '';
        observePanel.classList.remove('show');
    }

    if (!general || general.id !== 'jigong') {
        observeBtn.style.display = 'none';
        observeBtn.disabled = true;
        return;
    }

    const observeCount = getJigongObserveCount(general);
    const hasObserved = gameState.jigongObservedLevel === gameState.level;
    const hasDeckCards = gameState.infiniteDeck || gameState.deck.length > 0;

    observeBtn.style.display = 'inline-flex';
    observeBtn.textContent = hasObserved ? '本关已观测' : `观测${observeCount}张`;
    observeBtn.disabled = hasObserved || !hasDeckCards;
}

function useJigongObserve() {
    const general = gameState.generals[gameState.currentGeneralIndex];
    if (!general || general.id !== 'jigong') return;

    if (gameState.jigongObservedLevel === gameState.level) {
        addMessage('【济公】本关已经观测过牌序', 'info');
        updateJigongObserveControls(general);
        return;
    }

    const observeCount = getJigongObserveCount(general);
    const observedCards = peekUpcomingDeckCards(observeCount);
    gameState.jigongObservedLevel = gameState.level;

    renderJigongObservedCards(observedCards);
    updateJigongObserveControls(general, true);
    addMessage(`【${general.skills[general.star].name}】观测了后续${observedCards.length}张补牌`, 'info');
    saveGame();
}

function showGeneralDetail(index) {
    const general = gameState.generals[index];
    gameState.currentGeneralIndex = index;
    
    document.getElementById('detailSymbol').innerHTML = general.symbol;
    document.getElementById('detailName').textContent = general.name;
    document.getElementById('detailTitle').textContent = general.title;
    
    let starsHTML = '';
    for (let i = 1; i <= 3; i++) {
        starsHTML += `<span class="star ${i <= general.star ? '' : 'empty'}">★</span>`;
    }
    document.getElementById('detailStars').innerHTML = starsHTML;
    
    const count = general.count || 1;
    document.getElementById('detailCount').textContent = `当前数量: ${count}`;
    
    let skillsHTML = '';
    for (let star = 1; star <= 3; star++) {
        const skill = general.skills[star];
        const isActive = star <= general.star;
        
        // 蚩尤怒意状态显示在详情中
        let extraStatus = '';
        if (general.id === 'chixu') {
            const chixuEffect = skill.effect();
            const angerThreshold = chixuEffect.angerThreshold || 10;
            const currentAnger = gameState.chixuAnger || 0;
            const isAngry = currentAnger >= angerThreshold;
            extraStatus = `<br><span style="color: ${isAngry ? '#ff4444' : '#ffcc00'}; font-weight: bold;">
                ⚔️ 怒意: ${currentAnger}/${angerThreshold} ${isAngry ? '(已觉醒！)' : ''}
            </span>`;
        }
        // 黄飞虎兵力加成显示在详情中
        else if (general.id === 'huangfeihu') {
            const currentSoldiers = gameState.huangfeihuSoldiers || 0;
            extraStatus = `<br><span style="color: #4CAF50; font-weight: bold;">
                ⚔️ 当前已增加兵力: ${currentSoldiers}
            </span>`;
        }
        // 夸父灵力加成显示在详情中
        else if (general.id === 'kuafu') {
            const currentSpiritualPower = gameState.kuafuSpiritualPower || 0;
            extraStatus = `<br><span style="color: #2196F3; font-weight: bold;">
                ✨ 当前已增加灵力: ${currentSpiritualPower}
            </span>`;
        }
        // 王母娘娘灵力加成显示在详情中
        else if (general.id === 'wangmu') {
            const currentSpiritualPower = gameState.wangmuSpiritualPower || 0;
            extraStatus = `<br><span style="color: #2196F3; font-weight: bold;">
                ✨ 当前已增加灵力: ${currentSpiritualPower}
            </span>`;
        }
        // 托塔天王本局牌型加成显示在详情中
        else if (general.id === 'tuotatianwang') {
            const uniquePatternCount = getUniquePatternCount();
            const effect = skill.effect();
            const currentSpiritualPower = uniquePatternCount * (effect.spiritualPowerPerUniquePattern || 0);
            extraStatus = `<br><span style="color: #2196F3; font-weight: bold;">
                ✨ 已打出${uniquePatternCount}种牌型，当前灵力+${currentSpiritualPower}
            </span>`;
        }
        // 三圣母宝莲赐福效果显示在详情中
        else if (general.id === 'sanbaishengma') {
            const effects = gameState.sanbaishengmaEffects || { soldiersBonus: 0, spiritualPowerBonus: 0, damageMultiplier: 1 };
            const effectParts = [];
            if (effects.soldiersBonus > 0) effectParts.push(`兵力+${effects.soldiersBonus}`);
            if (effects.spiritualPowerBonus > 0) effectParts.push(`灵力+${effects.spiritualPowerBonus}`);
            if (effects.damageMultiplier > 1) effectParts.push(`总伤害×${effects.damageMultiplier}`);
            const effectsText = effectParts.length > 0 ? effectParts.join('、') : '本回合尚未触发';
            extraStatus = `<br><span style="color: #FF69B4; font-weight: bold;">
                🌸 本回合获得效果: ${effectsText}
            </span>`;
        }
        
        skillsHTML += `
            <div class="general-detail-skill ${isActive ? '' : 'inactive'}">
                <div class="general-detail-skill-name">${skill.name} ${isActive ? '✓' : ''}</div>
                <div class="general-detail-skill-desc">${skill.description}${extraStatus}</div>
            </div>
        `;
    }
    document.getElementById('detailSkills').innerHTML = skillsHTML;
    updateJigongObserveControls(general);
    
    document.getElementById('generalDetailModal').classList.add('show');
}

function hideGeneralDetail() {
    document.getElementById('generalDetailModal').classList.remove('show');
    hideSellGeneralConfirm();
    updateJigongObserveControls(null);
    gameState.currentGeneralIndex = null;
}

function showBondDetail(bond) {
    const ownedCount = bond.members.filter(memberId => 
        gameState.generals.some(g => g.id === memberId)
    ).length;
    const currentEffectText = getBondCurrentEffectText(bond);
    
    document.getElementById('bondDetailName').textContent = bond.name;
    document.getElementById('bondDetailDesc').textContent = bond.description;
    document.getElementById('bondDetailProgress').textContent = currentEffectText
        ? `${ownedCount}/${bond.members.length} · ${currentEffectText}`
        : `${ownedCount}/${bond.members.length}`;
    
    const membersGrid = document.getElementById('bondDetailMembersGrid');
    membersGrid.innerHTML = '';
    
    bond.members.forEach(memberId => {
        const general = GENERALS[memberId];
        const hasGeneral = gameState.generals.some(g => g.id === memberId);
        
        const memberItem = document.createElement('div');
        memberItem.className = `bond-detail-member ${hasGeneral ? 'has' : ''}`;
        memberItem.innerHTML = `
            <div class="bond-detail-member-symbol">${general.symbol}</div>
            <div class="bond-detail-member-name">${general.name}</div>
            <div class="bond-detail-member-status">${hasGeneral ? '已拥有' : '未拥有'}</div>
        `;
        
        membersGrid.appendChild(memberItem);
    });
    
    document.getElementById('bondDetailModal').classList.add('show');
}

function getBondCurrentEffectText(bond) {
    if (bond.id === 'jiuli_zhanshen') {
        return `当前增加兵力：+${formatNumber(gameState.jiuliSoldiersBonus || 0)}`;
    }

    return '';
}

function hideBondDetail() {
    document.getElementById('bondDetailModal').classList.remove('show');
}

function getGeneralSellPrice(general) {
    if (!general) return 0;
    const starMultipliers = {
        1: 1,
        2: 2,
        3: 6
    };
    const multiplier = starMultipliers[general.star] || 1;
    return general.price * multiplier;
}

function sellGeneral() {
    if (gameState.currentGeneralIndex === null) return;
    
    const general = gameState.generals[gameState.currentGeneralIndex];
    if (!general) return;

    const sellPrice = getGeneralSellPrice(general);

    document.getElementById('sellGeneralSymbol').innerHTML = general.symbol;
    document.getElementById('sellGeneralName').textContent = general.name;
    document.getElementById('sellGeneralDesc').textContent = `${general.title || '天将'} · ${general.star}星`;
    document.getElementById('sellGeneralPrice').innerHTML = `可获得 <span>${sellPrice}</span> 仙元`;
    document.getElementById('sellGeneralModal').classList.add('show');
}

function hideSellGeneralConfirm() {
    document.getElementById('sellGeneralModal').classList.remove('show');
}

function confirmSellGeneral() {
    if (gameState.currentGeneralIndex === null) {
        hideSellGeneralConfirm();
        return;
    }

    const general = gameState.generals[gameState.currentGeneralIndex];
    if (!general) {
        hideSellGeneralConfirm();
        return;
    }

    const sellPrice = getGeneralSellPrice(general);
    const oldHandCardLimit = getHandCardLimit();
    
    gameState.xianyuan += sellPrice;
    gameState.generals.splice(gameState.currentGeneralIndex, 1);
    
    const newHandCardLimit = getHandCardLimit();
    
    if (newHandCardLimit < oldHandCardLimit && gameState.handCards.length > newHandCardLimit) {
        const cardsToRemove = gameState.handCards.length - newHandCardLimit;
        gameState.handCards.splice(newHandCardLimit, cardsToRemove);
        addMessage(`手牌上限降低，移除了${cardsToRemove}张手牌`, 'info');
    }
    
    addMessage(`出售天将【${general.name}】，获得${sellPrice}仙元`, 'info');
    
    hideSellGeneralConfirm();
    hideGeneralDetail();
    activateBondEffects();
    updateGameInfo();
    renderHandCards();
    updateButtons();
    saveGame();
    
    const maxPlayCount = gameState.basePlayCount + getBonusPlayCount();
    if (gameState.playCount >= maxPlayCount && gameState.totalDamage < gameState.levelDamage) {
        addMessage(`出牌次数已用完，伤害不足，需要${formatNumber(gameState.levelDamage)}点伤害，当前${formatNumber(gameState.totalDamage)}点`, 'info');
        addMessage('消灭异类失败，请大侠重头再来！', 'info');
        
        gameState.generals.forEach(general => {
            const skill = general.skills[general.star];
            const skillResult = skill.effect(0, []);
            if (typeof skillResult === 'object' && skillResult.xianyuanBonusPerRound) {
                gameState.xianyuan += skillResult.xianyuanBonusPerRound;
                addMessage(`【${skill.name}】效果：回合结束+${skillResult.xianyuanBonusPerRound}仙元`, 'info');
            }
        });
        gameState.phase = 'failed';
        renderGameFailState();
        saveGame();
        
        setTimeout(() => {
            document.getElementById('gameFailModal').classList.add('show');
        }, 800);
    }
}

function updateTreasuresDisplay() {
    const treasuresTopList = document.getElementById('treasuresTopList');
    const treasuresList = document.getElementById('treasuresList');
    
    treasuresTopList.innerHTML = '';
    
    if (gameState.treasures.length === 0) {
        treasuresTopList.innerHTML = '<div class="treasure-empty">暂无宝器牌</div>';
        return;
    }
    
    gameState.treasures.forEach(treasure => {
        const treasureTopDiv = document.createElement('div');
        treasureTopDiv.className = 'treasure-top-item';
        treasureTopDiv.innerHTML = `
            <div class="treasure-top-symbol">${treasure.symbol}</div>
            <div class="treasure-top-name">${treasure.name}</div>
        `;
        treasuresTopList.appendChild(treasureTopDiv);
        
        const treasureDiv = document.createElement('div');
        treasureDiv.className = 'treasure-item';
        treasureDiv.innerHTML = `
            <div class="treasure-symbol">${treasure.symbol}</div>
            <div class="treasure-info">
                <div class="treasure-name">${treasure.name}</div>
                <div class="treasure-desc">${treasure.description}</div>
            </div>
        `;
        treasuresList.appendChild(treasureDiv);
    });
}

function updatePatternStats(patternType) {
    if (!gameState.patternStats[patternType]) {
        gameState.patternStats[patternType] = 0;
    }
    gameState.patternStats[patternType]++;
    gameState.totalPlays++;
}

function getUniquePatternCount(extraPatternType = null) {
    const patternTypes = new Set(
        Object.keys(gameState.patternStats || {}).filter(patternType => (gameState.patternStats[patternType] || 0) > 0)
    );

    if (extraPatternType) {
        patternTypes.add(extraPatternType);
    }

    return patternTypes.size;
}

function renderCard(card, isSmall = false) {
    const element = ELEMENTS[card.element];
    const cardDiv = document.createElement('div');
    cardDiv.className = `card ${element.color} ${isSmall ? 'small' : ''}`;
    if (!isSmall && isSealedElementCard(card)) {
        cardDiv.classList.add('sealed-element-card');
    }
    cardDiv.dataset.id = card.id;
    
    cardDiv.innerHTML = `
        <div class="card-content">
            <div class="card-number">${card.number}</div>
            ${!isSmall && isSealedElementCard(card) ? '<div class="card-seal-label">封</div>' : ''}
        </div>
    `;
    
    return cardDiv;
}

function renderHandCards() {
    const container = document.getElementById('handCards');
    container.innerHTML = '';
    
    const maxPlayCount = gameState.basePlayCount + getBonusPlayCount();
    const maxDiscardCount = gameState.baseDiscardCount + getBonusDiscardCount();
    
    const cards = gameState.handCards;
    const totalCards = cards.length;
    
    cards.forEach((card, index) => {
        const cardDiv = renderCard(card);
        cardDiv.onclick = () => toggleCardSelection(card.id);
        
        if (gameState.selectedCards.find(c => c.id === card.id)) {
            cardDiv.classList.add('selected');
        }
        
        if (gameState.playCount >= maxPlayCount && gameState.discardCount >= maxDiscardCount) {
            cardDiv.classList.add('disabled');
        }
        
        const maxAngle = 20;
        const angle = (index - (totalCards - 1) / 2) * (maxAngle * 2 / (totalCards - 1 || 1));
        cardDiv.style.transform = `rotate(${angle}deg) translateY(${Math.abs(angle) * 1.5}px)`;
        
        container.appendChild(cardDiv);
    });
}



function toggleCardSelection(cardId) {
    const maxPlayCount = gameState.basePlayCount + getBonusPlayCount();
    const maxDiscardCount = gameState.baseDiscardCount + getBonusDiscardCount();
    
    if (gameState.playCount >= maxPlayCount && gameState.discardCount >= maxDiscardCount) {
        addMessage('本回合已无法操作', 'info');
        return;
    }

    const index = gameState.selectedCards.findIndex(c => c.id === cardId);
    
    if (index > -1) {
        gameState.selectedCards.splice(index, 1);
    } else {
        if (gameState.selectedCards.length >= 5) {
            addMessage('最多只能选择5张牌', 'info');
            return;
        }
        const card = gameState.handCards.find(c => c.id === cardId);
        if (card) {
            gameState.selectedCards.push(card);
        }
    }
    
    renderHandCards();
    updatePatternPreview();
    updateButtons();
    updateStatsPreview();
    saveGame();
}

function identifyPattern(cards) {
    if (cards.length === 0) return null;
    
    if (gameState.bossDebuff && gameState.bossDebuff.sealedElement) {
        const hasSealedElement = cards.some(c => c.element === gameState.bossDebuff.sealedElement);
        if (hasSealedElement) {
            return { type: 'sanqi', spiritualPower: getPatternSpiritualPower('sanqi') };
        }
    }
    
    const patterns = [];
    const numbers = cards.map(c => c.number).sort((a, b) => a - b);
    const elements = cards.map(c => c.element);
    
    const numberCounts = {};
    numbers.forEach(num => {
        numberCounts[num] = (numberCounts[num] || 0) + 1;
    });
    
    const elementCounts = {};
    elements.forEach(elem => {
        elementCounts[elem] = (elementCounts[elem] || 0) + 1;
    });
    
    const uniqueNumbers = Object.keys(numberCounts).map(Number).sort((a, b) => a - b);
    const uniqueElements = Object.keys(elementCounts);
    
    const isConsecutive = (nums) => {
        if (nums.length < 5) return false;
        for (let i = 1; i < nums.length; i++) {
            if (nums[i] - nums[i-1] !== 1) return false;
        }
        return true;
    };
    
    const maxSameNumber = Math.max(...Object.values(numberCounts));
    const maxSameElement = Math.max(...Object.values(elementCounts));
    
    if (maxSameNumber >= 5) {
        patterns.push({ type: 'wuji_tongzun', spiritualPower: getPatternSpiritualPower('wuji_tongzun') });
    }
    
    if (cards.length >= 5 && maxSameElement >= 5 && isConsecutive(uniqueNumbers)) {
        patterns.push({ type: 'wuxing_guiyi', spiritualPower: getPatternSpiritualPower('wuxing_guiyi') });
    }
    
    if (cards.length >= 5 && isConsecutive(uniqueNumbers)) {
        patterns.push({ type: 'tianxu_wulian', spiritualPower: getPatternSpiritualPower('tianxu_wulian') });
    }
    
    if (maxSameNumber >= 4) {
        patterns.push({ type: 'sixiang_zhenyuan', spiritualPower: getPatternSpiritualPower('sixiang_zhenyuan') });
    }
    
    if (cards.length >= 5 && maxSameElement >= 5) {
        patterns.push({ type: 'yiyuan_tongzong', spiritualPower: getPatternSpiritualPower('yiyuan_tongzong') });
    }
    
    if (maxSameNumber >= 3) {
        patterns.push({ type: 'sancai_juqi', spiritualPower: getPatternSpiritualPower('sancai_juqi') });
    }
    
    if (cards.length >= 5 && uniqueElements.length === 5) {
        patterns.push({ type: 'wuling_huishi', spiritualPower: getPatternSpiritualPower('wuling_huishi') });
    }
    
    if (maxSameNumber >= 2) {
        patterns.push({ type: 'shuangshu', spiritualPower: getPatternSpiritualPower('shuangshu') });
    }
    
    if (cards.length === 1 || (cards.length >= 2 && cards.length <= 4 && uniqueNumbers.length === cards.length)) {
        patterns.push({ type: 'sanqi', spiritualPower: getPatternSpiritualPower('sanqi') });
    }
    
    if (patterns.length === 0) {
        return { type: 'sanqi', spiritualPower: getPatternSpiritualPower('sanqi') };
    }
    
    patterns.sort((a, b) => b.spiritualPower - a.spiritualPower);
    return patterns[0];
}

function isSealedElementCard(card) {
    return !!(gameState.bossDebuff && gameState.bossDebuff.sealedElement && card.element === gameState.bossDebuff.sealedElement);
}

function getCombatEffectiveCards(cards) {
    return cards.filter(card => !isSealedElementCard(card));
}

function getBondSoldiersBonus() {
    return gameState.activeBonds?.qunying_jiangshi ? 888 : 0;
}

function getBondSpiritualPowerBonus() {
    return gameState.activeBonds?.xizheng_dao ? 888 : 0;
}

function getPermanentSoldiersBonus() {
    return gameState.jiuliSoldiersBonus || 0;
}

function calculateDamage() {
    if (gameState.selectedCards.length === 0) return { damage: 0, pattern: null, totalSoldiers: 0, spiritualPower: 1 };
    
    const effectiveCards = getCombatEffectiveCards(gameState.selectedCards);
    let totalSoldiers = effectiveCards.reduce((sum, card) => sum + card.number, 0);
    totalSoldiers += getBondSoldiersBonus();
    totalSoldiers += getPermanentSoldiersBonus();
    // 加上刑天的弃牌兵力加成
    totalSoldiers += gameState.discardSoldiersBonus || 0;
    // 加上黄飞虎的关卡兵力加成
    totalSoldiers += gameState.huangfeihuSoldiers || 0;
    const pattern = identifyPattern(gameState.selectedCards);
    let spiritualPower = pattern.spiritualPower;
    spiritualPower += getBondSpiritualPowerBonus();
    // 加上夸父的关卡灵力加成
    spiritualPower += gameState.kuafuSpiritualPower || 0;
    // 加上王母娘娘的商店刷新灵力加成
    spiritualPower += gameState.wangmuSpiritualPower || 0;
    const damage = Math.floor(totalSoldiers * spiritualPower);
    
    return { damage, pattern, totalSoldiers, spiritualPower };
}

function updateStatsPreview() {
    const totalSoldiersElement = document.getElementById('totalSoldiers');
    const spiritualPowerElement = document.getElementById('spiritualPower');
    
    if (gameState.selectedCards.length === 0) {
        totalSoldiersElement.textContent = '0';
        spiritualPowerElement.textContent = '1';
        return;
    }
    
    const effectiveCards = getCombatEffectiveCards(gameState.selectedCards);
    let totalSoldiers = effectiveCards.reduce((sum, card) => sum + card.number, 0);
    totalSoldiers += getBondSoldiersBonus();
    totalSoldiers += getPermanentSoldiersBonus();
    // 加上刑天的弃牌兵力加成
    totalSoldiers += gameState.discardSoldiersBonus || 0;
    // 加上黄飞虎的关卡兵力加成
    totalSoldiers += gameState.huangfeihuSoldiers || 0;
    const pattern = identifyPattern(gameState.selectedCards);
    let spiritualPower = pattern.spiritualPower;
    spiritualPower += getBondSpiritualPowerBonus();
    
    gameState.generals.forEach((general, index) => {
        if (gameState.bossDebuff && gameState.bossDebuff.sealedGeneralSeat === index + 1) {
            return;
        }
        
        const skill = general.skills[general.star];
        const skillResult = skill.effect(totalSoldiers, effectiveCards);
        
        if (typeof skillResult === 'number') {
            totalSoldiers = skillResult;
        } else if (typeof skillResult === 'object') {
            if (skillResult.spiritualPowerBonus) {
                spiritualPower += skillResult.spiritualPowerBonus;
            }
            if (skillResult.spiritualPowerBonusAfterDiscard) {
                const maxDiscardCount = gameState.baseDiscardCount + getBonusDiscardCount();
                if (gameState.discardCount >= maxDiscardCount) {
                    spiritualPower += skillResult.spiritualPowerBonusAfterDiscard;
                }
            }
            if (skillResult.firstPlaySoldiersBonus && gameState.playCount === 0) {
                totalSoldiers += skillResult.firstPlaySoldiersBonus;
            }
            if (skillResult.soldiersBonus) {
                totalSoldiers += skillResult.soldiersBonus;
            }
            if (skillResult.spiritualPowerPerXianyuan) {
                spiritualPower += gameState.xianyuan * skillResult.spiritualPowerPerXianyuan;
            }
            if (skillResult.spiritualPowerPerUniquePattern) {
                spiritualPower += getUniquePatternCount(pattern.type) * skillResult.spiritualPowerPerUniquePattern;
            }
        }
    });
    // 加上夸父的关卡灵力加成
    spiritualPower += gameState.kuafuSpiritualPower || 0;
    // 加上王母娘娘的商店刷新灵力加成
    spiritualPower += gameState.wangmuSpiritualPower || 0;
    
    totalSoldiersElement.textContent = totalSoldiers;
    spiritualPowerElement.textContent = formatPower(spiritualPower);
}

function updatePatternPreview() {
    const patternName = document.getElementById('patternName');
    const patternHint = document.getElementById('patternHint');
    
    if (gameState.selectedCards.length === 0) {
        patternName.textContent = '选择牌型';
        patternHint.textContent = '请选择1-5张牌';
        return;
    }
    
    const pattern = identifyPattern(gameState.selectedCards);
    
    if (gameState.bossDebuff && gameState.bossDebuff.sealedElement) {
        const hasSealedElement = gameState.selectedCards.some(c => c.element === gameState.bossDebuff.sealedElement);
        if (hasSealedElement) {
            const elementName = ELEMENTS[gameState.bossDebuff.sealedElement].name;
            patternName.textContent = '【五行封印】散炁凡牌';
            patternHint.textContent = `${elementName}手牌被封印，不计兵力 · 灵力 +${formatPower(pattern.spiritualPower)}`;
            return;
        }
    }
    
    if (pattern.type === 'sanqi') {
        const patternInfo = PATTERNS.sanqi;
        patternName.textContent = patternInfo.name;
        patternHint.textContent = `${patternInfo.description} · 灵力 +${formatPower(pattern.spiritualPower)}`;
    } else {
        const patternInfo = PATTERNS[pattern.type];
        patternName.textContent = patternInfo.name;
        patternHint.textContent = `${patternInfo.description} · 灵力 +${formatPower(pattern.spiritualPower)}`;
    }
}

function showDamageAnimation(damage) {
    const animation = document.createElement('div');
    animation.className = 'damage-animation';
    animation.textContent = `-${formatNumber(damage)}`;
    document.body.appendChild(animation);
    
    setTimeout(() => {
        animation.remove();
    }, 2000);
}

const DICE_FACE_SYMBOLS = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

function renderDiceFace(dice, points) {
    dice.textContent = '';
    dice.classList.add('settled');
    dice.setAttribute('aria-label', `${points}点骰子`);
    dice.dataset.points = points;

    for (let i = 1; i <= 9; i++) {
        const pip = document.createElement('span');
        pip.className = `dice-pip dice-pip-${i}`;
        dice.appendChild(pip);
    }
}

function rollDice(diceCount, baseDamage, callback) {
    const diceContainer = document.createElement('div');
    diceContainer.className = 'dice-container';
    document.body.appendChild(diceContainer);
    
    let diceResults = [];
    let totalPoints = 0;
    
    // 为每个骰子创建动画
    for (let i = 0; i < diceCount; i++) {
        const dice = document.createElement('div');
        dice.className = 'dice';
        diceContainer.appendChild(dice);
        
        // 随机生成骰子点数（1-6）
        const points = Math.floor(Math.random() * 6) + 1;
        diceResults.push(points);
        totalPoints += points;
        
        // 骰子动画
        dice.style.animation = 'dice-roll 1s ease-out forwards';
        
        // 动画结束后显示真实骰面
        setTimeout(() => {
            renderDiceFace(dice, points);
        }, 1000);
    }
    
    // 计算额外伤害（本关boss的最初血量的百分比）
    const extraDamage = Math.floor(gameState.levelDamage * (totalPoints / 100));
    
    // 动画结束后显示伤害
    setTimeout(() => {
        // 显示骰子结果
        const diceFaces = diceResults.map(points => DICE_FACE_SYMBOLS[points - 1]).join(' + ');
        addMessage(`张道陵掷出骰子：${diceFaces} = ${totalPoints}点，造成${formatNumber(extraDamage)}点额外伤害`, 'info');
        
        // 造成额外伤害
        gameState.totalDamage += extraDamage;
        showDamageAnimation(extraDamage);
        updateGameInfo();
        
        // 移除骰子容器
        setTimeout(() => {
            diceContainer.remove();
            // 执行回调函数
            if (callback) {
                callback();
            }
        }, 1000);
    }, 1500);
}

function updateButtons() {
    const maxPlayCount = gameState.basePlayCount + getBonusPlayCount();
    const maxDiscardCount = gameState.baseDiscardCount + getBonusDiscardCount();
    
    const canPlay = gameState.selectedCards.length >= 1 && 
                   gameState.selectedCards.length <= 5 && 
                   gameState.playCount < maxPlayCount;
    const canDiscard = gameState.selectedCards.length >= 1 && 
                      gameState.selectedCards.length <= 5 && 
                      gameState.discardCount < maxDiscardCount;
    const canSkip = gameState.phase === 'playing' && !gameState.isBossLevel;
    
    document.getElementById('playBtn').disabled = !canPlay;
    document.getElementById('discardBtn').disabled = !canDiscard;
    const skipBtn = document.getElementById('skipBtn');
    if (skipBtn) {
        skipBtn.disabled = !canSkip;
        skipBtn.title = gameState.isBossLevel ? 'Boss关不可跳过' : '跳过本关，不获得剩余操作转化仙元';
    }
}

function updateGameInfo() {
    document.getElementById('round').textContent = gameState.level;
    document.getElementById('deckCount').textContent = gameState.infiniteDeck ? '∞' : gameState.deck.length;
    document.getElementById('xianyuan').textContent = gameState.xianyuan;
    
    const maxPlayCount = gameState.basePlayCount + getBonusPlayCount();
    const maxDiscardCount = gameState.baseDiscardCount + getBonusDiscardCount();
    const handCardLimit = getHandCardLimit();
    
    document.getElementById('playCount').textContent = `${gameState.playCount}/${maxPlayCount}`;
    document.getElementById('discardCount').textContent = `${gameState.discardCount}/${maxDiscardCount}`;
    document.getElementById('handCardLimit').textContent = handCardLimit;
    
    document.getElementById('controlCurrentDamage').textContent = formatNumber(gameState.totalDamage);
    
    // 更新血条内部的伤害数值显示
    const damageValueDisplay = document.getElementById('damageValueDisplay');
    if (damageValueDisplay) {
        const remainingHealth = Math.max(0, gameState.levelDamage - gameState.totalDamage);
        damageValueDisplay.textContent = `${formatNumber(remainingHealth)}/${formatNumber(gameState.levelDamage)}`;
    }
    
    // 更新血条（初始满血，造成伤害后减少）
    const damageBar = document.getElementById('damageBar');
    if (damageBar) {
        const remainingHealth = Math.max(0, gameState.levelDamage - gameState.totalDamage);
        const percentage = Math.max(0, Math.min(100, (remainingHealth / gameState.levelDamage) * 100));
        damageBar.style.width = `${percentage}%`;
    }
}

function getBossDebuffAvatarPath(debuff) {
    switch(debuff.id) {
        case 'seal_skill':
            return 'assets/images/boss_images/金.png';
        case 'pattern_restriction':
            return 'assets/images/boss_images/水.png';
        case 'damage_double':
            return 'assets/images/boss_images/火.png';
        case 'cost_per_card':
            return 'assets/images/boss_images/土.png';
        case 'forbid_discard':
            return 'assets/images/boss_images/木.png';
        case 'must_play_5':
            return 'assets/images/boss_images/雷.png';
        case 'auto_discard':
            return 'assets/images/boss_images/风.png';
        case 'element_hand_seal':
            return 'assets/images/boss_images/电.png';
        default:
            return 'assets/images/boss_images/金.png';
    }
}

function updateBossAvatar(debuff) {
    const bossAvatarContainer = document.getElementById('bossAvatarContainer');
    if (!bossAvatarContainer) return;
    
    const imagePath = getBossDebuffAvatarPath(debuff);
    bossAvatarContainer.innerHTML = `<img src="${imagePath}" alt="Boss Avatar">`;
}

function updateBossDebuffDisplay(debuff) {
    const bossDebuffDiv = document.getElementById('bossDebuff');
    const bossDebuffContent = document.getElementById('bossDebuffContent');
    
    bossDebuffDiv.style.display = 'block';
    
    let content = `<strong style="color: #000;">${debuff.name}</strong><br><br><span style="color: #000;">${debuff.description}</span>`;
    
    if (debuff.sealedElement) {
        const elementName = ELEMENTS[debuff.sealedElement].name;
        content += `<br><br><span style="color: #000;">被封印五行：${elementName}</span>`;
    }
    
    if (debuff.sealedGeneralId) {
        const general = gameState.generals.find(g => g.id === debuff.sealedGeneralId);
        if (general) {
            content += `<br><br><span style="color: #000;">被封印天将：${general.name}</span>`;
        }
    }
    
    if (debuff.patternRestriction) {
        content += `<br><br><span style="color: #000;">各类牌型至多允许出1次</span>`;
    }
    
    if (debuff.damageMultiplier) {
        content += `<br><br><span style="color: #000;">伤害需求翻倍</span>`;
    }
    
    bossDebuffContent.innerHTML = content;
    updateBossAvatar(debuff);
}

function hideBossDebuffDisplay() {
    const bossDebuffDiv = document.getElementById('bossDebuff');
    const bossDebuffContent = document.getElementById('bossDebuffContent');
    const bossAvatarContainer = document.getElementById('bossAvatarContainer');
    
    bossDebuffDiv.style.display = 'block';
    bossDebuffContent.innerHTML = '<div style="text-align: center; color: #e8d5b7; padding: 10px;">暂无减益</div>';
    
    if (bossAvatarContainer) {
        bossAvatarContainer.innerHTML = '💀';
    }
}

function refreshContinueButton() {
    const continueGameBtn = document.getElementById('continueGameBtn');
    if (!continueGameBtn) return;

    const data = localStorage.getItem(SAVE_KEY);
    continueGameBtn.style.display = data ? '' : 'none';
    continueGameBtn.disabled = !data;
}

function restoreGameView() {
    const loginScreen = document.getElementById('loginScreen');
    const divineBeastScreen = document.getElementById('divineBeastScreen');
    const gameScreen = document.getElementById('gameScreen');

    if (loginScreen) loginScreen.classList.add('hidden');
    if (divineBeastScreen) divineBeastScreen.style.display = 'none';
    if (gameScreen) {
        gameScreen.style.display = 'block';
        gameScreen.classList.add('active');
    }

    hideOptions();
    hideShop();
    hideImmortals();
    hideStats();
    hideSettings();
    hideLevelComplete();
    hideGameFail();
    hideTaixuChoice();
    hideGeneralDetail();

    const gameMessages = document.getElementById('gameMessages');
    if (gameMessages) {
        gameMessages.innerHTML = '';
    }

    if (gameState.bossDebuff) {
        updateBossDebuffDisplay(gameState.bossDebuff);
    } else {
        hideBossDebuffDisplay();
    }

    activateBondEffects({ preserveExistingActivations: true });
    renderHandCards();
    updatePatternPreview();
    updateStatsPreview();
    updateGameInfo();
    updateButtons();
    updateMaxGeneralSlots();
    updateGeneralSeats();
    renderBonds();
    sanitizeShopGenerals();
    updateShopInfo();
    updateShopLockButton();

    if (gameState.phase === 'level_complete') {
        renderLevelCompleteState();
        document.getElementById('levelCompleteModal').classList.add('show');
    } else if (gameState.phase === 'failed') {
        renderGameFailState();
        document.getElementById('gameFailModal').classList.add('show');
    } else if (gameState.phase === 'taixu_choice') {
        renderTaixuChoiceState();
        document.getElementById('taixuModal').classList.add('show');
    }

    playBackgroundMusic();
}

function playCards() {
    const maxPlayCount = gameState.basePlayCount + getBonusPlayCount();
    
    if (gameState.selectedCards.length < 1 || 
        gameState.selectedCards.length > 5 || 
        gameState.playCount >= maxPlayCount) return;
    
    if (gameState.bossDebuff && gameState.bossDebuff.mustPlay5 && gameState.selectedCards.length !== 5) {
        addMessage(`【五张出牌】本回合出牌必须出5张牌`, 'info');
        return;
    }
    
    let result = calculateDamage();
    
    if (gameState.bossDebuff && gameState.bossDebuff.patternRestriction) {
        if (result.pattern && gameState.bossLevelUsedPatterns.includes(result.pattern.type)) {
            addMessage(`【牌型限制】${PATTERNS[result.pattern.type].name}在本次Boss战中已经使用过`, 'info');
            return;
        }
    }
    
    if (result.pattern) {
        updatePatternStats(result.pattern.type);
        gameState.usedPatterns.push(result.pattern.type);
        if (gameState.bossDebuff && gameState.bossDebuff.patternRestriction) {
            gameState.bossLevelUsedPatterns.push(result.pattern.type);
        }
        
        // 播放牌型音效
        let audioPath = '';
        switch(result.pattern.type) {
            case 'sanqi':
                audioPath = 'assets/audio/散炁凡牌.mp3';
                break;
            case 'shuangshu':
                audioPath = 'assets/audio/双数同辉.mp3';
                break;
            case 'wuling_huishi':
                audioPath = 'assets/audio/五灵汇世.mp3';
                break;
            case 'sancai_juqi':
                audioPath = 'assets/audio/三才聚气.mp3';
                break;
            case 'yiyuan_tongzong':
                audioPath = 'assets/audio/一元同宗.mp3';
                break;
            case 'sixiang_zhenyuan':
                audioPath = 'assets/audio/四象镇元.mp3';
                break;
            case 'tianxu_wulian':
                audioPath = 'assets/audio/天序五连.mp3';
                break;
            case 'wuxing_guiyi':
                audioPath = 'assets/audio/五行归一.mp3';
                break;
            case 'wuji_tongzun':
                audioPath = 'assets/audio/五极同尊.mp3';
                break;
        }
        
        if (audioPath && gameState.effectVolume > 0) {
            const audio = new Audio(audioPath);
            audio.volume = gameState.effectVolume / 100;
            audio.play().catch(e => console.log('Audio play failed:', e));
        }
    }
    
    const effectiveSelectedCards = getCombatEffectiveCards(gameState.selectedCards);
    result = applyGeneralSkills(result, effectiveSelectedCards);
    result = applyTreasureEffects(result);
    
    if (result.spiritualPowerBonus) {
        result.spiritualPower += result.spiritualPowerBonus;
    }
    
    if (result.spiritualPowerPerXianyuan) {
        result.spiritualPower += gameState.xianyuan * result.spiritualPowerPerXianyuan;
    }

    if (result.spiritualPowerPerUniquePattern) {
        result.spiritualPower += getUniquePatternCount() * result.spiritualPowerPerUniquePattern;
    }
    
    const maxDiscardCount = gameState.baseDiscardCount + getBonusDiscardCount();
    if (gameState.discardCount >= maxDiscardCount && result.spiritualPowerBonusAfterDiscard) {
        result.spiritualPower += result.spiritualPowerBonusAfterDiscard;
    }
    
    const finalDamage = Math.floor(result.totalSoldiers * result.spiritualPower);
    result.damage = finalDamage;
    
    if (result.damageMultiplier) {
        result.damage = Math.floor(result.damage * result.damageMultiplier);
    }
    
    if (result.damageMultiplierByMin) {
        const minNumber = Math.min(...effectiveSelectedCards.map(c => c.number));
        result.damage = Math.floor(result.damage * minNumber);
    }
    
    if (result.damageMultiplierByMax) {
        const maxNumber = Math.max(...effectiveSelectedCards.map(c => c.number));
        result.damage = Math.floor(result.damage * maxNumber);
    }
    
    if (result.damageMultiplierBySum) {
        const sumNumbers = effectiveSelectedCards.reduce((sum, c) => sum + c.number, 0);
        result.damage = Math.floor(result.damage * sumNumbers);
    }

    if (gameState.selectedCards.length === 1) {
        if (gameState.hasBaolianJiumu && !gameState.baolianJiumuSingleCardPlayedThisLevel) {
            const oldDamage = result.damage;
            result.damage = Math.floor(result.damage * 1.5);
            addMessage(`【宝莲救母】本关首次单张出牌，伤害×1.5（${formatNumber(oldDamage)} → ${formatNumber(result.damage)}）`, 'special');
        }
        gameState.baolianJiumuSingleCardPlayedThisLevel = true;
    }
    
    // 蚩尤效果：怒意满层时触发伤害加成
    const chixuIndex = gameState.generals.findIndex(g => g.id === 'chixu');
    if (chixuIndex > -1) {
        const isSealed = gameState.bossDebuff && gameState.bossDebuff.sealedGeneralSeat === chixuIndex + 1;
        if (!isSealed) {
            const chixuGeneral = gameState.generals[chixuIndex];
            const chixuSkill = chixuGeneral.skills[chixuGeneral.star];
            const chixuEffect = chixuSkill.effect();
            if (chixuEffect && chixuEffect.angerPerDiscard && (gameState.chixuAnger || 0) >= chixuEffect.angerThreshold) {
                const oldDamage = result.damage;
                result.damage = Math.floor(result.damage * chixuEffect.angerMultiplier);
                gameState.chixuAnger = 0; // 觉醒后怒意清零，需要重新攒
                addMessage(`【九黎战神觉醒】怒意满层！伤害×${chixuEffect.angerMultiplier}（${formatNumber(oldDamage)} → ${formatNumber(result.damage)}），怒意已重置`, 'special');
            }
        }
    }
    
    gameState.totalDamage += result.damage;
    gameState.playCount++;
    
    // 立即更新血条显示出牌造成的伤害
    updateGameInfo();
    
    if (gameState.hasHuoyanShijia) {
        const fireCards = gameState.selectedCards.filter(c => c.element === 'huo');
        const xianyuanBonus = fireCards.reduce((sum, c) => sum + c.number, 0);
        if (xianyuanBonus > 0) {
            gameState.xianyuan += xianyuanBonus;
            addMessage(`【火焰世家】获得${xianyuanBonus}仙元（火属性牌点数）`, 'info');
            updateGameInfo();
        }
    }
    
    if (gameState.bossDebuff && gameState.bossDebuff.costPerCard) {
        const cost = gameState.selectedCards.length * gameState.bossDebuff.costPerCard;
        const actualCost = Math.min(gameState.xianyuan, cost);
        gameState.xianyuan = Math.max(0, gameState.xianyuan - cost);
        addMessage(`【仙元消耗】每出一张牌扣除1仙元，共扣除${actualCost}仙元`, 'info');
        updateGameInfo();
    }
    
    const cardNames = gameState.selectedCards.map(c => 
        isSealedElementCard(c) ? `${ELEMENTS[c.element].name}${c.number}（封印）` : `${ELEMENTS[c.element].name}${c.number}兵力`
    ).join('、');
    
    let message = `出牌：${cardNames}`;
    if (result.pattern && result.pattern.type !== 'sanqi') {
        const patternInfo = PATTERNS[result.pattern.type];
        message += `【${patternInfo.name}】`;
    } else if (gameState.bossDebuff && gameState.bossDebuff.sealedElement) {
        const hasSealedElement = gameState.selectedCards.some(c => c.element === gameState.bossDebuff.sealedElement);
        if (hasSealedElement) {
            const elementName = ELEMENTS[gameState.bossDebuff.sealedElement].name;
            message += `【五行封印：${elementName}牌不计兵力，判为散炁凡牌】`;
        }
    }
    message += `，造成${formatNumber(result.damage)}点伤害`;
    addMessage(message, 'play');
    
    showDamageAnimation(result.damage);
    
    gameState.selectedCards.forEach(card => {
        const index = gameState.handCards.findIndex(c => c.id === card.id);
        if (index > -1) {
            gameState.handCards.splice(index, 1);
        }
    });
    
    gameState.selectedCards = [];
    
    // 处理张道陵的骰子效果
    if (result.diceCount) {
        setTimeout(() => {
            rollDice(result.diceCount, finalDamage, () => {
                autoDiscardAndRefill();
                
                renderHandCards();
                updatePatternPreview();
                updateStatsPreview();
                updateGameInfo(); // 骰子伤害结算后再次更新血条
                updateButtons();
                
                checkRoundEnd();
                saveGame();
            });
        }, 1000);
    } else {
        autoDiscardAndRefill();
        
        renderHandCards();
        updatePatternPreview();
        updateStatsPreview();
        updateGameInfo();
        updateButtons();
        
        checkRoundEnd();
        saveGame();
    }
}

function applyGeneralSkills(result, cards) {
    const isFirstPlay = gameState.playCount === 0;
    const previousPlayPattern = gameState.currentPlayPattern;
    gameState.currentPlayPattern = result.pattern ? result.pattern.type : null;
    
    gameState.generals.forEach((general, index) => {
        if (gameState.bossDebuff && gameState.bossDebuff.sealedGeneralSeat === index + 1) {
            return;
        }
        
        const skill = general.skills[general.star];
        const skillResult = skill.effect(result.totalSoldiers, cards);
        
        if (typeof skillResult === 'number') {
            result.totalSoldiers = skillResult;
        } else if (typeof skillResult === 'object') {
            if (skillResult.playCountBonus) {
                result.playCountBonus = (result.playCountBonus || 0) + skillResult.playCountBonus;
            }
            if (skillResult.discardCountBonus) {
                result.discardCountBonus = (result.discardCountBonus || 0) + skillResult.discardCountBonus;
            }
            if (skillResult.handCardLimitBonus) {
                result.handCardLimitBonus = (result.handCardLimitBonus || 0) + skillResult.handCardLimitBonus;
            }
            if (skillResult.spiritualPowerBonus) {
                result.spiritualPowerBonus = (result.spiritualPowerBonus || 0) + skillResult.spiritualPowerBonus;
            }
            if (skillResult.xianyuanBonus) {
                result.xianyuanBonus = (result.xianyuanBonus || 0) + skillResult.xianyuanBonus;
            }
            if (skillResult.firstPlaySoldiersBonus && isFirstPlay) {
                result.totalSoldiers += skillResult.firstPlaySoldiersBonus;
            }
            if (skillResult.spiritualPowerBonusAfterDiscard) {
                result.spiritualPowerBonusAfterDiscard = (result.spiritualPowerBonusAfterDiscard || 0) + skillResult.spiritualPowerBonusAfterDiscard;
            }
            if (skillResult.spiritualPowerPerXianyuan) {
                result.spiritualPowerPerXianyuan = (result.spiritualPowerPerXianyuan || 0) + skillResult.spiritualPowerPerXianyuan;
            }
            if (skillResult.spiritualPowerPerUniquePattern) {
                result.spiritualPowerPerUniquePattern = (result.spiritualPowerPerUniquePattern || 0) + skillResult.spiritualPowerPerUniquePattern;
            }
            if (skillResult.damageMultiplier) {
                result.damageMultiplier = (result.damageMultiplier || 1) * skillResult.damageMultiplier;
            }
            if (Number.isFinite(skillResult.damageMultiplierByMin)) {
                result.damageMultiplierByMin = (result.damageMultiplierByMin || 1) * skillResult.damageMultiplierByMin;
            }
            if (Number.isFinite(skillResult.damageMultiplierByMax)) {
                result.damageMultiplierByMax = (result.damageMultiplierByMax || 1) * skillResult.damageMultiplierByMax;
            }
            if (Number.isFinite(skillResult.damageMultiplierBySum)) {
                result.damageMultiplierBySum = (result.damageMultiplierBySum || 1) * skillResult.damageMultiplierBySum;
            }
            // 三圣母士兵加成
            if (skillResult.soldiersBonus) {
                result.totalSoldiers += skillResult.soldiersBonus;
            }
            if (skillResult.diceCount) {
                result.diceCount = (result.diceCount || 0) + skillResult.diceCount;
            }
        }
    });
    
    gameState.currentPlayPattern = previousPlayPattern;
    return result;
}

function applyTreasureEffects(result) {
    gameState.treasures.forEach(treasure => {
        const effect = treasure.effect();
        if (effect.xianyuanMultiplier) {
            result.xianyuanMultiplier = effect.xianyuanMultiplier;
        }
    });
    
    return result;
}

function discardCards() {
    const maxDiscardCount = gameState.baseDiscardCount + getBonusDiscardCount();
    
    if (gameState.selectedCards.length < 1 || 
        gameState.selectedCards.length > 5 || 
        gameState.discardCount >= maxDiscardCount) return;
    
    if (gameState.bossDebuff && gameState.bossDebuff.forbidDiscard) {
        addMessage(`【禁止弃牌】本回合不能使用弃牌`, 'info');
        return;
    }
    
    const cardNames = gameState.selectedCards.map(c => 
        `${ELEMENTS[c.element].name}${c.number}兵力`
    ).join('、');
    
    addMessage(`弃牌：${cardNames}`, 'discard');
    
    gameState.selectedCards.forEach(card => {
        const index = gameState.handCards.findIndex(c => c.id === card.id);
        if (index > -1) {
            gameState.handCards.splice(index, 1);
        }
    });
    
    // 刑天效果：每弃掉1张手牌，额外+兵力
    const xingtianIndex = gameState.generals.findIndex(g => g.id === 'xingtian');
    if (xingtianIndex > -1) {
        const isSealed = gameState.bossDebuff && gameState.bossDebuff.sealedGeneralSeat === xingtianIndex + 1;
        if (!isSealed) {
            const xingtianGeneral = gameState.generals[xingtianIndex];
            const xingtianSkill = xingtianGeneral.skills[xingtianGeneral.star];
            const xingtianEffect = xingtianSkill.effect();
            if (xingtianEffect && xingtianEffect.discardBonus) {
                const bonusPerCard = xingtianEffect.discardBonus;
                const totalBonus = bonusPerCard * gameState.selectedCards.length;
                gameState.discardSoldiersBonus = (gameState.discardSoldiersBonus || 0) + totalBonus;
                addMessage(`【${xingtianSkill.name}】效果已触发！每弃掉1张手牌，额外+${bonusPerCard}兵力，共获得${totalBonus}兵力`, 'info');
            }
        }
    }
    
    // 蚩尤效果：每弃掉1张手牌积累"怒意"
    const chixuIndex = gameState.generals.findIndex(g => g.id === 'chixu');
    if (chixuIndex > -1) {
        const isSealed = gameState.bossDebuff && gameState.bossDebuff.sealedGeneralSeat === chixuIndex + 1;
        if (!isSealed) {
            const chixuGeneral = gameState.generals[chixuIndex];
            const chixuSkill = chixuGeneral.skills[chixuGeneral.star];
            const chixuEffect = chixuSkill.effect();
            if (chixuEffect && chixuEffect.angerPerDiscard) {
                const angerGain = chixuEffect.angerPerDiscard * gameState.selectedCards.length;
                gameState.chixuAnger = (gameState.chixuAnger || 0) + angerGain;
                addMessage(`【${chixuSkill.name}】怒意+${angerGain}（当前：${gameState.chixuAnger}/${chixuEffect.angerThreshold}）`, 'info');
                if (gameState.chixuAnger >= chixuEffect.angerThreshold) {
                    addMessage(`【九黎战神觉醒】怒意已满，触发总伤害×${chixuEffect.angerMultiplier}效果！`, 'special');
                }
            }
        }
    }

    if (gameState.activeBonds?.jiuli_zhanshen) {
        gameState.jiuliSoldiersBonus = (gameState.jiuliSoldiersBonus || 0) + 100;
        addMessage(`【九黎战神】弃牌1次，永久兵力+100（当前：+${formatNumber(gameState.jiuliSoldiersBonus)}）`, 'special');
    }
    
    gameState.discardCount++;
    gameState.selectedCards = [];
    
    refillHandCards();
    
    renderHandCards();
    updatePatternPreview();
    updateStatsPreview();
    updateGameInfo();
    updateButtons();
    
    checkRoundEnd();
    saveGame();
}

function checkRoundEnd() {
    const maxPlayCount = gameState.basePlayCount + getBonusPlayCount();
    const maxDiscardCount = gameState.baseDiscardCount + getBonusDiscardCount();
    
    if (gameState.totalDamage >= gameState.levelDamage) {
        addMessage(`伤害已达标！总伤害：${formatNumber(gameState.totalDamage)}`, 'info');
        addMessage(`恭喜通关${gameState.level}重天！`, 'info');
        
        const remainingPlayCount = maxPlayCount - gameState.playCount;
        const remainingDiscardCount = maxDiscardCount - gameState.discardCount;
        const bonusXianyuan = remainingPlayCount + remainingDiscardCount;
        
        if (bonusXianyuan > 0) {
            addMessage(`剩余操作转化为${bonusXianyuan}仙元（出牌${remainingPlayCount}+弃牌${remainingDiscardCount}）`, 'info');
            gameState.xianyuan += bonusXianyuan;
        }
        gameState.skippedLevel = false;
        gameState.lastCompleteConvert = bonusXianyuan;
        
        gameState.generals.forEach(general => {
            const skill = general.skills[general.star];
            const skillResult = skill.effect(0, []);
            if (typeof skillResult === 'object' && skillResult.xianyuanBonusPerRound) {
                gameState.xianyuan += skillResult.xianyuanBonusPerRound;
                addMessage(`【${skill.name}】效果：回合结束+${skillResult.xianyuanBonusPerRound}仙元`, 'info');
            }
        });
        
        activateBondEffects();
        if (gameState.isBossLevel) {
            applyFomenDueBossClearBonus();
        }
        addShopExp(GAME_CONFIG.shop.expPerLevelComplete, '通关奖励');
        
        gameState.lastCompleteInterest = calculateInterest();

        if (gameState.level === GAME_CONFIG.levels.endless.startAfterLevel && !gameState.endlessTrial) {
            gameState.levelTreasures = [];
            addMessage('三十六重天已通，可选择结束游戏或进入太虚试炼。', 'info');
            showTaixuChoice();
            updateGameInfo();
            return;
        }

        gameState.phase = 'level_complete';
        renderLevelCompleteState();
        saveGame();
        
        setTimeout(() => {
            document.getElementById('levelCompleteModal').classList.add('show');
        }, 800);
        
        updateGameInfo();
        return;
    }
    
    if (gameState.playCount >= maxPlayCount) {
        addMessage(`第${gameState.round}回合结束，总伤害：${formatNumber(gameState.totalDamage)}`, 'info');
        
        gameState.generals.forEach(general => {
            const skill = general.skills[general.star];
            const skillResult = skill.effect(0, []);
            if (typeof skillResult === 'object' && skillResult.xianyuanBonusPerRound) {
                gameState.xianyuan += skillResult.xianyuanBonusPerRound;
                addMessage(`【${skill.name}】效果：回合结束+${skillResult.xianyuanBonusPerRound}仙元`, 'info');
            }
        });
        
        activateBondEffects();
        
        addMessage(`伤害不足，需要${formatNumber(gameState.levelDamage)}点伤害，当前${formatNumber(gameState.totalDamage)}点`, 'info');
        addMessage('消灭异类失败，请大侠重头再来！', 'info');
        
        updateGameInfo();
        gameState.phase = 'failed';
        renderGameFailState();
        saveGame();
        
        setTimeout(() => {
            document.getElementById('gameFailModal').classList.add('show');
        }, 800);
    }
}

function calculateInterest() {
    const interest = Math.min(Math.floor(gameState.xianyuan / 10), gameState.maxInterest);
    if (interest > 0) {
        gameState.xianyuan += interest;
        addMessage(`获得${interest}点利息（每10仙元获得1点，上限${gameState.maxInterest}点）`, 'info');
    }
    
    return interest;
}

function hasAllBondMembers(bond) {
    return bond.members.every(memberId =>
        gameState.generals.some(general => general.id === memberId)
    );
}

function applyRiyueTongtianBond() {
    if (gameState.riyueTongtianTriggered || gameState.generals.length < 1) return;
    
    const general = gameState.generals[0];
    if (!general.count) general.count = 1;
    general.count += 1;
    
    let newStar = 1;
    if (general.count >= 9) newStar = 3;
    else if (general.count >= 3) newStar = 2;
    
    if (newStar > general.star) {
        general.star = newStar;
        addMessage(`【日月同天】${general.name}升星至${general.star}星！(当前数量: ${general.count})`, 'info');
        if (general.id === 'xihe') {
            if (newStar === 3) {
                gameState.deck = shuffleDeck(createDeck(100));
                gameState.infiniteDeck = true;
                addMessage('【羲和·神】卡池中存在无限套五行牌', 'info');
            } else if (newStar === 2) {
                gameState.deck = shuffleDeck(createDeck(3));
                gameState.infiniteDeck = false;
                addMessage('【羲和·强】卡池中增加两套五行牌（共150张）', 'info');
            }
            updateGameInfo();
        }
    }
    
    addMessage(`【日月同天】天将席位1的${general.name}数量+1（当前: ${general.count}）`, 'info');
    gameState.riyueTongtianTriggered = true;
}

function resetBondDerivedState(nextActiveBonds) {
    if (!nextActiveBonds.difu_panguan && gameState.hasDifuPanguan && gameState.difuPanguanDamage > 0) {
        gameState.totalDamage = Math.max(0, gameState.totalDamage - gameState.difuPanguanDamage);
        addMessage(`【地府判官】羁绊已失效，扣除${gameState.difuPanguanDamage}点伤害`, 'info');
        gameState.difuPanguanDamage = 0;
    }
    
    gameState.refreshCost = 2;
    gameState.hasHuoyanShijia = false;
    gameState.hasDifuPanguan = false;
    gameState.hasBaolianJiumu = false;
}

function applyActiveBond(bond, newlyActivated) {
    switch (bond.id) {
        case 'xizheng_dao':
            if (newlyActivated) {
                addMessage('【西行证道】羁绊已激活，灵力+888', 'info');
            }
            break;
        case 'riyue_tongtian':
            if (newlyActivated) {
                applyRiyueTongtianBond();
            }
            break;
        case 'qunying_jiangshi':
            if (newlyActivated) {
                addMessage('【群英降世】羁绊已激活，兵力+888', 'info');
            }
            break;
        case 'huoyan_shijia':
            gameState.hasHuoyanShijia = true;
            if (newlyActivated) {
                addMessage('【火焰世家】羁绊已激活，出牌时获得火属性牌点数对应仙元', 'info');
            }
            break;
        case 'difu_panguan':
            gameState.hasDifuPanguan = true;
            break;
        case 'baolian_jiumu':
            gameState.hasBaolianJiumu = true;
            if (newlyActivated) {
                addMessage('【宝莲救母】羁绊已激活，每关第一次出1张牌时总伤害×1.5', 'info');
            }
            break;
        case 'fengshen_zhizheng':
            gameState.refreshCost = 1;
            if (newlyActivated) {
                addMessage('【封神之证】羁绊已激活，仙界商店刷新费用降为1仙元', 'info');
            }
            break;
        case 'fomen_due':
            if (newlyActivated) {
                addMessage('【佛门渡厄】羁绊已激活，每通过一个Boss关卡，所有牌型等级+1', 'info');
            }
            break;
        case 'jiuli_zhanshen':
            if (newlyActivated) {
                addMessage('【九黎战神】羁绊已激活，本局游戏每弃牌1次永久兵力+100', 'info');
            }
            break;
    }
}

function activateBondEffects(options = {}) {
    const nextActiveBonds = {};
    
    BONDS.forEach(bond => {
        const isActive = hasAllBondMembers(bond);
        bond.isActive = isActive;
        if (isActive) {
            nextActiveBonds[bond.id] = true;
        }
    });
    
    const previousActiveBonds = options.preserveExistingActivations ? nextActiveBonds : (gameState.activeBonds || {});
    
    resetBondDerivedState(nextActiveBonds);
    
    BONDS.forEach(bond => {
        if (nextActiveBonds[bond.id]) {
            applyActiveBond(bond, !previousActiveBonds[bond.id]);
        }
    });
    
    gameState.activeBonds = nextActiveBonds;
    updateGeneralSeats();
    renderBonds();
}

function getBonusPlayCount() {
    let bonus = 0;
    
    gameState.treasures.forEach(treasure => {
        const effect = treasure.effect();
        if (effect.playCountBonus) {
            bonus += effect.playCountBonus;
        }
    });
    
    gameState.generals.forEach(general => {
        const skill = general.skills[general.star];
        try {
            const effect = skill.effect();
            if (effect && effect.playCountBonus) {
                bonus += effect.playCountBonus;
            }
        } catch (e) {
            // 技能需要参数，跳过
        }
    });
    
    return bonus;
}

function getBonusDiscardCount() {
    let bonus = 0;
    
    gameState.treasures.forEach(treasure => {
        const effect = treasure.effect();
        if (effect.discardCountBonus) {
            bonus += effect.discardCountBonus;
        }
    });
    
    gameState.generals.forEach(general => {
        const skill = general.skills[general.star];
        try {
            const effect = skill.effect();
            if (effect && effect.discardCountBonus) {
                bonus += effect.discardCountBonus;
            }
        } catch (e) {
            // 技能需要参数，跳过
        }
    });
    
    return bonus;
}

function getHandCardLimit() {
    let limit = gameState.baseHandCardLimit;
    
    gameState.treasures.forEach(treasure => {
        const effect = treasure.effect();
        if (effect.handCardLimitBonus) {
            limit += effect.handCardLimitBonus;
        }
    });
    
    gameState.generals.forEach(general => {
        const skill = general.skills[general.star];
        try {
            const effect = skill.effect();
            if (effect && effect.handCardLimitBonus) {
                limit += effect.handCardLimitBonus;
            }
        } catch (e) {
            // 技能需要参数，跳过
        }
    });
    
    return limit;
}

function addMessage(text, type = 'info') {
    const container = document.getElementById('gameMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    container.insertBefore(messageDiv, container.firstChild);
}

function startNewGame() {
    gameState = {
        phase: 'playing',
        round: 1,
        playCount: 0,
        roundPlayCount: 0,
        discardCount: 0,
        discardSoldiersBonus: 0,
        jiuliSoldiersBonus: 0,
        huangfeihuSoldiers: 0,
        kuafuSpiritualPower: 0,
        wangmuSpiritualPower: 0,
        totalDamage: 0,
        handCards: [],
        selectedCards: [],
        deck: shuffleDeck(createDeck()),
        xianyuan: 10,
        patternStats: {},
        totalPlays: 0,
        level: 1,
        maxLevel: GAME_CONFIG.levels.maxLevel,
        levelDamage: GAME_CONFIG.levels.damage.earlyBaseDamage,
        endlessTrial: false,
        levelTransitionBonusesAppliedFor: null,
        lastCompleteConvert: 0,
        lastCompleteInterest: 0,
        skippedLevel: false,
        generals: [],
        treasures: [],
        generalSlots: GAME_CONFIG.generalSlots.baseSlots,
        purchasedGeneralSlots: 0,
        maxGeneralSlots: GAME_CONFIG.generalSlots.baseSlots,
        freeGeneralSlotPurchaseCount: 0,
        shopGenerals: [],
        shopTreasures: [],
        shopLevel: 1,
        shopExp: 0,
        shopLocked: false,
        levelTreasures: [],
        refreshCost: 2,
        basePlayCount: 4,
        baseDiscardCount: 4,
        baseHandCardLimit: 8,
        interestRate: 5,
        maxInterest: 5,
        usedPatterns: [],
        patternLevels: {},
        bossDebuff: null,
        bossDebuffId: null,
        pendingBossDebuffId: null,
        isBossLevel: false,
        bossLevelUsedPatterns: [],
        currentGeneralIndex: null,
        nextGeneralCountBonus: null,
        hasKaitianShenfu: false,
        hasHuoyanShijia: false,
        hasDifuPanguan: false,
        hasBaolianJiumu: false,
        baolianJiumuSingleCardPlayedThisLevel: false,
        difuPanguanDamage: 0,
        activeBonds: {},
        chixuAnger: 0,
        jigongObservedLevel: null,
        effectVolume: gameState.effectVolume !== undefined ? gameState.effectVolume : 70,
        selectedDivineBeast: null,
        divineBeastEffects: {
            freeRefreshCount: 0
        }
    };
    
    // 显示神兽选择界面
    showDivineBeastSelection();
}

// 显示神兽选择界面
function showDivineBeastSelection() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('divineBeastScreen').style.display = 'flex';
    
    // 渲染神兽选择界面
    renderDivineBeasts();
}

// 渲染神兽选择界面
function renderDivineBeasts() {
    const grid = document.getElementById('divineBeastGrid');
    grid.innerHTML = '';
    
    for (let beastId in DIVINE_BEASTS) {
        const beast = DIVINE_BEASTS[beastId];
        const item = document.createElement('div');
        item.className = `divine-beast-item divine-beast-${beastId}`;
        item.onclick = () => selectDivineBeast(beastId);
        
        // 检查是否是图片路径
        let symbolHTML = '';
        if (beast.symbol.includes('.png') || beast.symbol.includes('.jpg') || beast.symbol.includes('.jpeg') || beast.symbol.includes('.gif')) {
            symbolHTML = `<img src="${beast.symbol}" alt="${beast.name}" style="width: 100px; height: 100px; object-fit: contain;">`;
        } else {
            symbolHTML = beast.symbol;
        }
        
        item.innerHTML = `
            <div class="divine-beast-symbol">${symbolHTML}</div>
            <div class="divine-beast-name">${beast.name}</div>
            <div class="divine-beast-description">${beast.description}</div>
        `;
        
        grid.appendChild(item);
    }
}

// 选择神兽
function selectDivineBeast(beastId) {
    gameState.selectedDivineBeast = beastId;
    
    // 应用神兽效果
    applyDivineBeastEffect(beastId);
    
    // 继续游戏初始化
    initializeGameAfterDivineBeastSelection();
}

// 应用神兽效果
function applyDivineBeastEffect(beastId) {
    const beast = DIVINE_BEASTS[beastId];
    
    switch (beastId) {
        case 'qinglong':
            // 青龙之力：开局获得1张一星4费的天将牌
            const price4Generals = Object.keys(GENERALS).filter(key => GENERALS[key].price === 4);
            if (price4Generals.length > 0) {
                const randomGeneralKey = price4Generals[Math.floor(Math.random() * price4Generals.length)];
                const general = {
                    ...GENERALS[randomGeneralKey],
                    star: 1,
                    count: 1,
                    instanceId: `general-${Date.now()}`
                };
                gameState.generals.push(general);
                addMessage(`【青龙之力】获得天将：${general.name}（1星）`, 'info');
            }
            break;
            
        case 'baihu':
            // 白虎之力：每回合免费刷新机会一次（可叠加）
            grantBaihuFreeRefresh();
            break;
            
        case 'xuanwu':
            // 玄武之力：开局获得10仙元
            gameState.xianyuan += 10;
            addMessage(`【玄武之力】获得10仙元`, 'info');
            break;
            
        case 'zhuque':
            // 朱雀之力：出牌次数和弃牌次数都+1
            gameState.basePlayCount += 1;
            gameState.baseDiscardCount += 1;
            addMessage(`【朱雀之力】出牌次数和弃牌次数各+1`, 'info');
            break;
    }
}

// 选择神兽后初始化游戏
function initializeGameAfterDivineBeastSelection() {
    // 隐藏神兽选择界面
    document.getElementById('divineBeastScreen').style.display = 'none';
    
    // 显示游戏界面
    document.getElementById('gameScreen').style.display = 'block';
    document.getElementById('gameScreen').classList.add('active');
    
    // 初始化游戏
    hideBossDebuffDisplay();
    document.getElementById('treasuresTopList').innerHTML = '';
    dealCards();
    renderHandCards();
    updatePatternPreview();
    updateStatsPreview();
    updateGameInfo();
    updateButtons();
    updateMaxGeneralSlots();
    updateGeneralSeats();
    
    // 三圣母宝莲赐福效果 - 游戏开始时初始化
    const sanbaishengma = gameState.generals.find(g => g.id === 'sanbaishengma');
    if (sanbaishengma) {
        initSanbaishengmaEffects(sanbaishengma.star);
    }

    document.getElementById('gameMessages').innerHTML = '';
    addMessage('游戏开始！', 'info');
    addMessage(`选择了神兽：${DIVINE_BEASTS[gameState.selectedDivineBeast].name}`, 'info');
    addMessage('新游戏开始！', 'info');
    addMessage('每次可出1-5张牌，出牌或弃牌后会自动补充手牌', 'info');
    addMessage('初始拥有10仙元', 'info');
    addMessage(`本关需要造成${formatNumber(gameState.levelDamage)}点伤害`, 'info');
    
    // 生成商店物品
    generateShopItems();
    gameState.phase = 'playing';
    saveGame();
    
    // 播放背景音乐
    playBackgroundMusic();
}

// 返回登录界面
function backToLogin() {
    document.getElementById('divineBeastScreen').style.display = 'none';
    document.getElementById('loginScreen').classList.remove('hidden');
}

// 支持白虎之力免费刷新和王母娘娘刷新成长。
function refreshShop() {
    let cost = gameState.refreshCost === 1 ? 1 : 2;
    
    // 检查是否有免费刷新机会
    if (gameState.divineBeastEffects.freeRefreshCount > 0) {
        gameState.divineBeastEffects.freeRefreshCount--;
        addMessage(`【白虎之力】使用免费刷新机会`, 'info');
    } else if (gameState.xianyuan >= cost) {
        gameState.xianyuan -= cost;
        addMessage(`刷新商店，消耗${cost}仙元`, 'info');
    } else {
        addMessage('仙元不足，无法刷新商店', 'info');
        return;
    }
    
    generateShopItems();
    applyWangmuShopRefreshBonus();
    renderShopItems('generals');
    updateShopInfo();
    updateGameInfo();
    saveGame();
}

// 下一回合与下一关是同一套推进流程。
function startNewRound() {
    nextLevel();
}

// 初始化三圣母的随机效果
function initSanbaishengmaEffects(star) {
    // 效果选项
    const effects = [
        { type: 'soldiers', value: 0, text: '兵力' },
        { type: 'spiritual', value: 0, text: '灵力' },
        { type: 'damage', value: 0, text: '总伤害' }
    ];
    
    // 根据星级确定效果
    if (star === 1) {
        // 一星：随机获得1个效果
        const randomIndex = Math.floor(Math.random() * 3);
        if (randomIndex === 0) {
            effects[0].value = 500;
            addMessage(`【三圣母·宝莲赐福】获得效果：兵力+500`, 'special');
        } else if (randomIndex === 1) {
            effects[1].value = 200;
            addMessage(`【三圣母·宝莲赐福】获得效果：灵力+200`, 'special');
        } else {
            effects[2].value = 2;
            addMessage(`【三圣母·宝莲赐福】获得效果：总伤害×2`, 'special');
        }
    } else if (star === 2) {
        // 二星：随机获得2个效果
        const availableIndices = [0, 1, 2];
        const selectedIndices = [];
        for (let i = 0; i < 2; i++) {
            const idx = Math.floor(Math.random() * availableIndices.length);
            selectedIndices.push(availableIndices[idx]);
            availableIndices.splice(idx, 1);
        }
        
        const effectTexts = [];
        selectedIndices.forEach(idx => {
            if (idx === 0) {
                effects[0].value = 1000;
                effectTexts.push('兵力+1000');
            } else if (idx === 1) {
                effects[1].value = 400;
                effectTexts.push('灵力+400');
            } else {
                effects[2].value = 3;
                effectTexts.push('总伤害×3');
            }
        });
        addMessage(`【三圣母·仙·宝莲赐福】获得效果：${effectTexts.join('、')}`, 'special');
    } else if (star === 3) {
        // 三星：获得全部效果
        effects[0].value = 3000;
        effects[1].value = 1000;
        effects[2].value = 5;
        addMessage(`【三圣母·神·宝莲赐福】获得效果：兵力+3000、灵力+1000、总伤害×5`, 'special');
    }
    
    // 存储效果到gameState
    gameState.sanbaishengmaEffects = {
        soldiersBonus: effects[0].value,
        spiritualPowerBonus: effects[1].value,
        damageMultiplier: effects[2].value,
        activeEffects: effects.filter(e => e.value > 0).map(e => e.text)
    };
}

function closeWindow() {
    if (confirm('确定要退出游戏吗？')) {
        window.close();
    }
}

function exitGame() {
    if (confirm('确定要退出当前游戏，返回登录界面吗？')) {
        setTimeout(() => {
            document.getElementById('gameScreen').classList.remove('active');
            document.getElementById('loginScreen').classList.remove('hidden');
            hideShop();
            hideImmortals();
            hideStats();
            hideGameFail();
        }, 500);
    }
}

function returnToLogin() {
    document.getElementById('gameScreen').classList.remove('active');
    document.getElementById('loginScreen').classList.remove('hidden');
    hideOptions();
    hideShop();
    hideImmortals();
    hideStats();
    hideGameFail();
    hideTaixuChoice();
}

function saveUnlockData(type, id) {
    let unlocks = getUnlockData(type);
    if (!unlocks.includes(id)) {
        unlocks.push(id);
        localStorage.setItem(`wuxing_${type}_unlocks`, JSON.stringify(unlocks));
    }
}

function getUnlockData(type) {
    const data = localStorage.getItem(`wuxing_${type}_unlocks`);
    return data ? JSON.parse(data) : [];
}

window.onload = function() {
    console.log('页面加载完成');
    renderPatternGuide();
    
    const continueGameBtn = document.getElementById('continueGameBtn');
    const startGameBtn = document.getElementById('startGameBtn');
    const immortalsBtn = document.getElementById('immortalsBtn');
    const exitGameBtn = document.getElementById('exitGameBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const loginScreen = document.getElementById('loginScreen');
    const gameScreen = document.getElementById('gameScreen');

    console.log('开始游戏按钮:', startGameBtn);
    console.log('登录界面:', loginScreen);
    console.log('游戏界面:', gameScreen);

    if (!startGameBtn) {
        console.error('找不到开始游戏按钮');
        return;
    }

    var bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        var savedVolume = localStorage.getItem('wuxing_bg_volume');
        bgMusic.volume = savedVolume ? parseInt(savedVolume) / 100 : 0.7;

        var savedMusic = localStorage.getItem('wuxing_bg_music');
        var musicIndex = savedMusic ? parseInt(savedMusic) : 1;
        bgMusic.src = bgMusicSources[musicIndex];

        bgMusic.play().catch(function() {});
    }

    // 加载音效音量设置
    var savedEffectVolume = localStorage.getItem('wuxing_effect_volume');
    gameState.effectVolume = savedEffectVolume ? parseInt(savedEffectVolume) : 70;
    
    var effectVolumeSlider = document.getElementById('effectVolumeSlider');
    var effectVolumeValue = document.getElementById('effectVolumeValue');
    var effectVolumeIcon = document.getElementById('effectVolumeIcon');
    
    if (effectVolumeSlider) {
        effectVolumeSlider.value = gameState.effectVolume;
        effectVolumeValue.textContent = gameState.effectVolume + '%';
        
        if (gameState.effectVolume === 0) {
            effectVolumeIcon.textContent = '🔇';
        } else if (gameState.effectVolume < 50) {
            effectVolumeIcon.textContent = '🔉';
        } else {
            effectVolumeIcon.textContent = '🔊';
        }
    }

    if (hasSaveGame()) {
        refreshContinueButton();
    } else {
        clearSaveGame();
    }

    if (continueGameBtn) {
        continueGameBtn.addEventListener('click', function() {
            loadGame();
        });
    }

    startGameBtn.addEventListener('click', function() {
        console.log('点击开始游戏');
        if (hasSaveGame() && !confirm('开始新游戏会覆盖当前存档，确定要继续吗？')) {
            return;
        }
        clearSaveGame();
        loginScreen.classList.add('hidden');
        gameScreen.classList.add('active');
        console.log('界面切换完成');
        startNewGame();
    });

    immortalsBtn.addEventListener('click', function() {
        showImmortals();
    });

    exitGameBtn.addEventListener('click', function() {
        closeWindow();
    });

    settingsBtn.addEventListener('click', function() {
        showSettings();
    });
};

function showSettings() {
    const settingsModal = document.getElementById('settingsModal');
    var bgMusic = document.getElementById('bgMusic');
    
    // 更新背景音乐音量控制
    const volumeSlider = settingsModal.querySelector('#volumeSlider');
    const volumeValue = settingsModal.querySelector('#volumeValue');
    const volumeIcon = settingsModal.querySelector('#volumeIcon');
    
    if (bgMusic && volumeSlider) {
        var currentVolume = Math.round(bgMusic.volume * 100);
        volumeSlider.value = currentVolume;
        if (volumeValue) {
            volumeValue.textContent = currentVolume + '%';
        }
        if (volumeIcon) {
            if (currentVolume === 0) {
                volumeIcon.textContent = '🔇';
            } else if (currentVolume < 50) {
                volumeIcon.textContent = '🔉';
            } else {
                volumeIcon.textContent = '🔊';
            }
        }
    }
    
    // 更新音效音量控制
    const effectVolumeSlider = settingsModal.querySelector('#effectVolumeSlider');
    const effectVolumeValue = settingsModal.querySelector('#effectVolumeValue');
    const effectVolumeIcon = settingsModal.querySelector('#effectVolumeIcon');
    
    var savedEffectVolume = localStorage.getItem('wuxing_effect_volume');
    var currentEffectVolume = savedEffectVolume ? parseInt(savedEffectVolume) : 70;
    
    if (effectVolumeSlider) {
        effectVolumeSlider.value = currentEffectVolume;
        if (effectVolumeValue) {
            effectVolumeValue.textContent = currentEffectVolume + '%';
        }
        if (effectVolumeIcon) {
            if (currentEffectVolume === 0) {
                effectVolumeIcon.textContent = '🔇';
            } else if (currentEffectVolume < 50) {
                effectVolumeIcon.textContent = '🔉';
            } else {
                effectVolumeIcon.textContent = '🔊';
            }
        }
    }

    // 更新音乐选择按钮状态
    const btn1 = settingsModal.querySelector('#musicBtn1');
    const btn2 = settingsModal.querySelector('#musicBtn2');
    
    var savedMusic = localStorage.getItem('wuxing_bg_music');
    var currentMusic = savedMusic ? parseInt(savedMusic) : 1;
    
    if (btn1) btn1.classList.toggle('active', currentMusic === 1);
    if (btn2) btn2.classList.toggle('active', currentMusic === 2);

    settingsModal.classList.add('show');
}

function hideSettings() {
    document.getElementById('settingsModal').classList.remove('show');
}

function changeVolume(value) {
    const bgMusic = document.getElementById('bgMusic');
    const volume = parseInt(value);

    // 更新所有模态框中的音量显示
    const modals = ['settingsModal', 'optionsModal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal) {
            const volumeValue = modal.querySelector('#volumeValue');
            const volumeIcon = modal.querySelector('#volumeIcon');
            
            if (volumeValue) {
                volumeValue.textContent = volume + '%';
            }
            if (volumeIcon) {
                if (volume === 0) {
                    volumeIcon.textContent = '🔇';
                } else if (volume < 50) {
                    volumeIcon.textContent = '🔉';
                } else {
                    volumeIcon.textContent = '🔊';
                }
            }
        }
    });

    if (bgMusic) {
        bgMusic.volume = volume / 100;
    }

    localStorage.setItem('wuxing_bg_volume', volume);
}

function changeEffectVolume(value) {
    const volume = parseInt(value);

    // 更新所有模态框中的音效音量显示
    const modals = ['settingsModal', 'optionsModal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal) {
            const effectVolumeValue = modal.querySelector('#effectVolumeValue');
            const effectVolumeIcon = modal.querySelector('#effectVolumeIcon');
            
            if (effectVolumeValue) {
                effectVolumeValue.textContent = volume + '%';
            }
            if (effectVolumeIcon) {
                if (volume === 0) {
                    effectVolumeIcon.textContent = '🔇';
                } else if (volume < 50) {
                    effectVolumeIcon.textContent = '🔉';
                } else {
                    effectVolumeIcon.textContent = '🔊';
                }
            }
        }
    });

    gameState.effectVolume = volume;
    localStorage.setItem('wuxing_effect_volume', volume);
}

var bgMusicSources = {
    1: 'assets/audio/飞上大罗天主题曲.mp3',
    2: 'assets/audio/飞上大罗天主题曲2.mp3'
};

function playBackgroundMusic() {
    var bgMusic = document.getElementById('bgMusic');
    if (!bgMusic) return;

    bgMusic.play().catch(function() {});
}

function switchBGMusic(musicIndex) {
    var bgMusic = document.getElementById('bgMusic');

    // 更新所有模态框中的音乐选择按钮状态
    const modals = ['settingsModal', 'optionsModal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal) {
            const btn1 = modal.querySelector('#musicBtn1');
            const btn2 = modal.querySelector('#musicBtn2');
            
            if (btn1) btn1.classList.remove('active');
            if (btn2) btn2.classList.remove('active');
            
            if (musicIndex === 1 && btn1) {
                btn1.classList.add('active');
            } else if (btn2) {
                btn2.classList.add('active');
            }
        }
    });

    if (bgMusic) {
        var currentVolume = bgMusic.volume;
        var wasPlaying = !bgMusic.paused;
        var currentTime = bgMusic.currentTime;

        bgMusic.src = bgMusicSources[musicIndex];
        bgMusic.volume = currentVolume;
        bgMusic.load();

        if (wasPlaying || currentTime > 0) {
            bgMusic.play().catch(function() {});
        }
    }

    localStorage.setItem('wuxing_bg_music', musicIndex);
}
