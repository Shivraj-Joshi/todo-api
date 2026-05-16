

export function logger(req, res, next) {
    const start = Date.now();


    next();


    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path} ${res.statusCode} ${duration}ms | reqId: ${req.id}`);
}