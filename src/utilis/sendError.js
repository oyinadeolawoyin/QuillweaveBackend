// Sends safe error responses. Messages written on purpose ("Sprint not found")
// go to the user. Unexpected errors (database or code bugs) are logged and
// the user only sees a generic message.
function isUnexpected(err) {
  return (
    !(err instanceof Error) ||
    err instanceof TypeError ||
    err instanceof ReferenceError ||
    err instanceof RangeError ||
    err instanceof SyntaxError ||
    err.name?.startsWith("PrismaClient") ||
    /^P\d{4}$/.test(err.code ?? "")
  );
}

function sendError(res, err, status) {
  if (isUnexpected(err)) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
  const code = status ?? err.status ?? 500;
  if (code >= 500) console.error(err);
  return res.status(code).json({ message: err.message });
}

module.exports = { sendError };
