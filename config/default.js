module.exports = {
    pg: {
        logging: process.env.PG__LOGGING ? JSON.parse(process.env.PG__LOGGING) : false,
        uri: process.env.DATABASE_URL,
    },
    app: {
        port: process.env.PORT || 3001,
        uploadDir: process.cwd() + '/uploads',
        autoJobs: process.env.AUTO_JOBS === 'TRUE',
        skipJobs: process.env.SKIP_JOBS ? process.env.SKIP_JOBS.split(', ') : [],
    },
    jobs: {
        exampleJob: {
            name: 'example_job',
            cron: '0 30 */1 * * *',
        },
        leadsGetSold: {
            name: 'leads_get_sold',
            cron: '0 5 */1 * * *',
        },
        leadsFromXlsx: {
            name: 'leads_from_xlsx',
            cron: '30 15 */1 * * *',
        },
        fetchEmails: {
            name: 'fetch_emails',
            cron: '0 0 */1 * * *',
        },
        parseXlsxJob: {
            name: 'parse_xlsx_files',
            cron: '0 16 * * * *',
        }
    },
};
