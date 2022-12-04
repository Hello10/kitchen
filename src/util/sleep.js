export function sleep (time_ms) {
  return new Promise((resolve)=> {
    setTimeout(resolve, time_ms);
  });
}

export default sleep