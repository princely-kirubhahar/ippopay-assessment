let baseUrl;

switch (process.env.NODE_ENV) {
    default:
        baseUrl = `http://localhost:3001`
}

export const PASSWORD_CHECKER_LINK = `${baseUrl}/password/checker`