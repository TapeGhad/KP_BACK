require('dotenv').config()
const CronJob = require('cron').CronJob
const { cronCheckCurrency } = require('./cronJob');

const job = new CronJob({
cronTime: `*/1 * * * *`,
onTick: async () => {
    try {
        await cronCheckCurrency();
    } catch (e) {
        console.error(e)
    }
},
onComplete: () => {
    console.log('Job done')
},
start: true
})

job.start()