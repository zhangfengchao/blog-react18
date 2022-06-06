export const getDates = async (time: any, type: string) => {
    var myDate = new Date(time);
    const YYYY = myDate.getFullYear(); //获取完整的年份(4位,1970-???)
    const MM = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
    const DD = myDate.getDate(); //获取当前日(1-31)
    const HH = myDate.getHours(); //获取当前小时数(0-23)
    const ii = myDate.getMinutes(); //获取当前分钟数(0-59)
    const dd = myDate.getSeconds(); //获取当前秒数(0-59)
    if (type === 'time') return `${YYYY}/${MM > 9 ? MM : '0' + MM}/${DD > 9 ? DD : '0' + DD} ${HH > 9 ? HH : '0' + HH}:${ii > 9 ? ii : '0' + ii}:${dd ? dd : '0' + dd}`
    else if (type === 'date') return `${YYYY}/${MM > 9 ? MM : '0' + MM}/${DD > 9 ? DD : '0' + DD}`
}