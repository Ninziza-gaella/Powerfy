exports.requestToken = async (meterNumber, amount) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const token = "MTN-" + Math.floor(100000000 + Math.random() * 900000000);

  return {
    token,
    provider: "MTN",
    amount
  };
};