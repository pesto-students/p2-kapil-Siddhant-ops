const decodeToken = (base64Url: string) => {
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const buff = Buffer.from(base64, "base64");
  const payloadinit = buff.toString("ascii");
  const payload: {
    uuid: string;
  } = JSON.parse(payloadinit);
  return payload.uuid;
};

export { decodeToken };
