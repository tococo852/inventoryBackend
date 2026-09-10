function checkId(value) {
    const id = Number(value);

    if (!Number.isInteger(id)) {
        const error = new Error("Invalid ID");
        error.status = 400;
        throw error;
    }

    return id;
}

module.exports= {checkId}