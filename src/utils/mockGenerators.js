const { PromotionType } = require('../enums/promotion-type')

module.exports = generateFakePromotions = () => {
    const prom = []
    const randomMap = {
        0: PromotionType.BASIC,
        1: PromotionType.COMMON,
        2: PromotionType.EPIC,
    }
    const getRandomPromotionType = () => {
        return randomMap[Math.floor(Math.random() * 3) + 0]
    }
    for(let i = 0 ; i < 10000 ; i++) {
        prom.push({name: `Promotion ${i.toString()}`, startDate: new Date(), endDate: new Date(), userGroupName: "Group Name", type: getRandomPromotionType()})
    }
    return prom
}

