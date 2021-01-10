module.exports = createPromotionFromDbItem = ({_id: id, name, type, startDate, endDate, userGroupName}) => {
    return {
        id,
        name,
        type,
        startDate,
        endDate,
        userGroupName,            
    }
}