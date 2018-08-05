module.exports = {
    db: {
        uri: process.env.DATABASE_URL,
    },
    app: {
        port: process.env.PORT || 3000,
    },
};
